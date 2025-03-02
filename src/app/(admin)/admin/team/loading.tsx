import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Loading() {
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

        {/* Skeleton for search and filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-[250px]" />
            <Skeleton className="h-9 w-9" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-[100px]" />
          </div>
        </div>

        {/* Skeleton for table header */}
        <div className="rounded-md border">
          <div className="border-b">
            <div className="flex h-10 items-center gap-4 px-4">
              <Skeleton className="h-4 w-4" /> {/* Checkbox */}
              <Skeleton className="h-4 w-[150px]" /> {/* Title */}
              <Skeleton className="h-4 w-[100px]" /> {/* Author */}
              <Skeleton className="h-4 w-[80px]" /> {/* Status */}
              <Skeleton className="h-4 w-[100px]" /> {/* Categories */}
              <Skeleton className="h-4 w-[80px]" /> {/* Read Time */}
              <Skeleton className="h-4 w-[100px]" /> {/* Published */}
              <Skeleton className="h-4 w-[50px]" /> {/* Actions */}
            </div>
          </div>

          {/* Skeleton for table rows */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="border-b">
              <div className="flex h-16 items-center gap-4 px-4">
                <Skeleton className="h-4 w-4" /> {/* Checkbox */}
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-[150px]" /> {/* Title */}
                  <Skeleton className="h-3 w-[100px]" /> {/* Slug */}
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
                  <Skeleton className="h-4 w-[80px]" /> {/* Author name */}
                </div>
                <Skeleton className="h-6 w-[80px] rounded-full" />{" "}
                {/* Status badge */}
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-[60px] rounded-full" />{" "}
                  {/* Category */}
                  <Skeleton className="h-6 w-[60px] rounded-full" />{" "}
                  {/* Category */}
                </div>
                <Skeleton className="h-4 w-[80px]" /> {/* Read time */}
                <Skeleton className="h-4 w-[100px]" /> {/* Published date */}
                <Skeleton className="h-8 w-8" /> {/* Actions */}
              </div>
            </div>
          ))}
        </div>

        {/* Skeleton for pagination */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[100px]" /> {/* Page size selector */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" /> {/* First page */}
            <Skeleton className="h-8 w-8" /> {/* Previous page */}
            <Skeleton className="h-8 w-[100px]" /> {/* Page indicator */}
            <Skeleton className="h-8 w-8" /> {/* Next page */}
            <Skeleton className="h-8 w-8" /> {/* Last page */}
          </div>
        </div>
      </div>
    </div>
  );
}
