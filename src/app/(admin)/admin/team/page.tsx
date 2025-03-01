import { Suspense } from "react";
import { DataTable } from "@/components/data-table/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { TeamColumns } from "./columns";
import { TableQueryParams } from "@/types/table";
import { getTeamMembers } from "./_actions/team-actions";

interface TeamPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    sort?: string;
    filters?: string;
  }>;
}

export default async function TeamPage({ searchParams }: TeamPageProps) {
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
  const queryParams: TableQueryParams<any> = {
    limit: size,
    offset: page * size,
    sort,
    filters: filters ? JSON.parse(filters) : [],
  };

  // Fetch team members
  const { data, error } = await getTeamMembers(queryParams);

  if (error) {
    return (
      <div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Team Members</h1>
          <div className="rounded-md bg-destructive/15 p-4 text-destructive">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Team Members</h1>
          <Button asChild>
            <Link href="/admin/team/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Team Member
            </Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading team members...</div>}>
          <DataTable
            data={data?.records || []}
            columns={TeamColumns}
            pageCount={data?.pageCount || 0}
            searchColumn="name"
            searchPlaceholder="Search team members..."
          />
        </Suspense>
      </div>
    </div>
  );
}
