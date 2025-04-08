import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getContactSubmissionById,
  updateContactReadStatus,
} from "../_actions/contact-actions";
import { auth } from "@/auth";
import { headers } from "next/headers";
import {
  ChevronLeft,
  Mail,
  MailOpen,
  Trash,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
  deleteContactSubmission,
  updateContactArchiveStatus,
} from "../_actions/contact-actions";

interface ContactDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ContactDetailPageProps): Promise<Metadata> {
  return {
    title: "Contact Message Details",
    description: "View contact message details",
  };
}

// Create server action for marking as read
async function markAsReadIfUnread(id: string, isRead: boolean) {
  "use server";
  if (!isRead) {
    await updateContactReadStatus(id, true);
  }
}

// Create a server action for delete with redirect
async function deleteAndRedirect(id: string) {
  "use server";
  await deleteContactSubmission(id);
  redirect("/admin/contacts");
}

// Server action for toggling read status
async function markAsRead(id: string, isRead: boolean) {
  "use server";
  await updateContactReadStatus(id, !isRead);
}

// Server action for toggling archive status
async function toggleArchiveStatus(id: string, isArchived: boolean) {
  "use server";
  await updateContactArchiveStatus(id, !isArchived);
}

export default async function ContactDetailPage({
  params,
}: ContactDetailPageProps) {
  // Verify authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-2">
        <div className="text-center text-lg font-medium">
          You need to be logged in to access this page.
        </div>
      </div>
    );
  }

  // Get the contact submission
  const { contactSubmission: submission, error } =
    await getContactSubmissionById(params.id);

  if (error || !submission) {
    notFound();
  }

  // Instead of updating during render, we'll use a client-side effect
  // This will be triggered after the page loads via a form
  const needsToBeMarkedAsRead = !submission.isRead;

  return (
    <div className="space-y-6">
      {needsToBeMarkedAsRead && (
        <form
          action={() => markAsReadIfUnread(submission.id, submission.isRead)}
        >
          <input type="hidden" name="autoSubmit" value="true" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  document.currentScript.parentElement.requestSubmit();
                })();
              `,
            }}
          />
        </form>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/contacts">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Messages
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <form
            action={markAsRead.bind(null, submission.id, submission.isRead)}
          >
            <Button variant="outline" size="sm" type="submit">
              {submission.isRead ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Mark as Unread
                </>
              ) : (
                <>
                  <MailOpen className="mr-2 h-4 w-4" />
                  Mark as Read
                </>
              )}
            </Button>
          </form>
          <form
            action={toggleArchiveStatus.bind(
              null,
              submission.id,
              submission.isArchived,
            )}
          >
            <Button variant="outline" size="sm" type="submit">
              {submission.isArchived ? (
                <>
                  <ArchiveRestore className="mr-2 h-4 w-4" />
                  Unarchive
                </>
              ) : (
                <>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </>
              )}
            </Button>
          </form>
          <form action={deleteAndRedirect.bind(null, submission.id)}>
            <Button variant="destructive" size="sm" type="submit">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </form>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{submission.subject}</CardTitle>
              <CardDescription>
                From {submission.name} ({submission.email}) •{" "}
                {formatDate(new Date(submission.createdAt))}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {!submission.isRead && (
                <div className="rounded-full bg-primary px-2 py-1 text-xs text-white">
                  Unread
                </div>
              )}
              {submission.isArchived && (
                <div className="rounded-full border border-muted px-2 py-1 text-xs">
                  Archived
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-[500px] overflow-y-auto whitespace-pre-line break-words break-all rounded-md bg-muted/50 p-4">
            {submission.message}
          </div>

          <div className="rounded-md border p-4">
            <h3 className="mb-2 font-medium">Contact Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Name:</div>
              <div>{submission.name}</div>

              <div className="text-muted-foreground">Email:</div>
              <div>
                <a
                  href={`mailto:${submission.email}`}
                  className="text-primary hover:underline"
                >
                  {submission.email}
                </a>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/admin/contacts">Back to All Messages</Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reply via Email
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
