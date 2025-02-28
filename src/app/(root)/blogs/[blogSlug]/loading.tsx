import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BlogLoading() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      {/* Back to blogs link */}
      <div className="mb-8">
        <Link
          href="/blogs"
          className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Blogs
        </Link>
      </div>

      <article className="mx-auto max-w-4xl">
        {/* Featured Image Skeleton */}
        <Skeleton className="mb-8 h-[300px] w-full sm:h-[400px] md:h-[500px]" />

        {/* Title and Meta Skeleton */}
        <div className="mb-8">
          <Skeleton className="mb-4 h-12 w-3/4" />
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        {/* Categories Skeleton */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Excerpt Skeleton */}
        <Skeleton className="mb-8 h-24 w-full" />

        {/* Content Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-11/12" />
          <Skeleton className="h-6 w-10/12" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-9/12" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-10/12" />
          <Skeleton className="h-6 w-11/12" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-8/12" />
        </div>

        {/* Share buttons Skeleton */}
        <div className="mt-12 border-t pt-8">
          <Skeleton className="mb-4 h-8 w-40" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </article>
    </main>
  );
}
