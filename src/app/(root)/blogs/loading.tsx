import { Skeleton } from "@/components/ui/skeleton";

export default function BlogsLoading() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      <div className="mb-12 text-center">
        <Skeleton className="mx-auto mb-4 h-12 w-48 md:w-64" />
        <Skeleton className="mx-auto h-6 w-full max-w-3xl" />
      </div>

      {/* Categories Skeleton */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        <Skeleton className="h-9 w-16 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
      </div>

      {/* Blog Posts Grid Skeleton */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm"
          >
            {/* Featured Image Skeleton */}
            <Skeleton className="h-48 w-full" />

            {/* Content Skeleton */}
            <div className="flex flex-1 flex-col p-6">
              {/* Categories Skeleton */}
              <div className="mb-3 flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Title Skeleton */}
              <Skeleton className="mb-3 h-6 w-full" />
              <Skeleton className="mb-3 h-6 w-5/6" />

              {/* Excerpt Skeleton */}
              <Skeleton className="mb-4 h-4 w-full" />
              <Skeleton className="mb-4 h-4 w-4/5" />

              {/* Meta Skeleton */}
              <div className="mt-auto flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="mx-auto mt-20 max-w-3xl rounded-lg border bg-card p-8 text-center">
        <Skeleton className="mx-auto mb-4 h-8 w-64" />
        <Skeleton className="mx-auto mb-6 h-4 w-full max-w-lg" />
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Skeleton className="h-10 w-full sm:w-64" />
          <Skeleton className="h-10 w-full sm:w-32" />
        </div>
      </div>
    </main>
  );
}
