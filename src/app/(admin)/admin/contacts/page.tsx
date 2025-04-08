import { Suspense } from "react";
import { Metadata } from "next";
import { DataTable } from "@/components/data-table/table";
import { columns } from "./columns";
import { getContactSubmissions } from "./_actions/contact-actions";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { TableQueryParams } from "@/types/table";
import { ContactSubmission } from "@/lib/db/schema/contact";

export const metadata: Metadata = {
  title: "Contact Submissions",
  description: "Manage contact form submissions",
};

interface ContactsPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    sort?: string;
    filters?: string;
  }>;
}

export default async function ContactsPage({
  searchParams,
}: ContactsPageProps) {
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

  const awaitedSearchParams = await searchParams;
  // Parse search params
  const page = awaitedSearchParams.page
    ? parseInt(awaitedSearchParams.page)
    : 0;
  const size = awaitedSearchParams.size
    ? parseInt(awaitedSearchParams.size)
    : 10;
  const sort = awaitedSearchParams.sort;
  const filters = awaitedSearchParams.filters;

  // Prepare query params
  const queryParams: TableQueryParams<ContactSubmission> = {
    limit: size,
    offset: page * size,
    sort,
    filters: filters ? JSON.parse(filters) : [],
  };

  // Get contact submissions data
  const { data, error } = await getContactSubmissions(queryParams);

  if (error) {
    return (
      <div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Contact Submissions</h1>
          <div className="rounded-md bg-destructive/15 p-4 text-destructive">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  // Count unread messages
  const unreadCount =
    data?.records.filter((submission) => !submission.isRead).length || 0;

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contact Submissions</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                You have {unreadCount} unread message
                {unreadCount > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        <Suspense fallback={<div>Loading contact submissions...</div>}>
          <DataTable
            data={data?.records || []}
            columns={columns}
            pageCount={data?.pageCount || 0}
            searchColumn="subject"
            searchPlaceholder="Search by subject..."
          />
        </Suspense>
      </div>
    </div>
  );
}
