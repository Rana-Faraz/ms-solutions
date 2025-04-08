import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogsNotFound() {
  return (
    <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Button asChild variant="default">
        <Link href="/">Go to Homepage</Link>
      </Button>
    </main>
  );
}
