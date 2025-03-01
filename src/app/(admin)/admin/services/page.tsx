import { Suspense } from "react";
import { Metadata } from "next";
import { DataTable } from "@/components/data-table/table";
import { columns } from "./columns";
import { getServices } from "./_actions/service-actions";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { TableQueryParams } from "@/types/table";
import { Service } from "@/lib/db/schema/service";

export const metadata: Metadata = {
  title: "Services Management",
  description: "Manage your services",
};

interface ServicesPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    sort?: string;
    filters?: string;
  }>;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
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
  const queryParams: TableQueryParams<any> = {
    limit: size,
    offset: page * size,
    sort,
    filters: filters ? JSON.parse(filters) : [],
  };

  // Get services data
  const { data, error } = await getServices(queryParams);

  if (error) {
    return (
      <div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Services</h1>
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
          <h1 className="text-2xl font-bold">Services</h1>
          <Button asChild>
            <Link href="/admin/services/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Service
            </Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading services...</div>}>
          <DataTable
            data={data?.records || []}
            columns={columns}
            pageCount={data?.pageCount || 0}
            searchColumn="title"
            searchPlaceholder="Search services..."
          />
        </Suspense>
      </div>
    </div>
  );
}
