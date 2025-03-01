import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { EditTeamForm } from "../../_components/edit-team-form";
import { getTeamMemberById } from "../../_actions/team-actions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface EditTeamPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Edit Team Member",
  description: "Edit an existing team member",
};

export default async function EditTeamPage({ params }: EditTeamPageProps) {
  const { id } = await params;

  // Verify user is authenticated
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/team");
  }

  // Fetch the team member
  const { member, error } = await getTeamMemberById(id);

  // Handle errors
  if (error || !member) {
    if (error === "Team member not found.") {
      notFound();
    }

    return (
      <div className="container mx-auto py-6">
        <div className="rounded-md bg-destructive/15 p-4 text-destructive">
          Error: {error || "Failed to load team member"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/admin/team"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Team Members
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Team Member</h1>
        <p className="text-muted-foreground">Update team member information</p>
      </div>

      <EditTeamForm member={member} />
    </div>
  );
}
