import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">Blog Post Not Found</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        The blog post you're looking for doesn't exist or may have been removed.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild variant="default">
          <Link href="/blogs">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </main>
  );
}
