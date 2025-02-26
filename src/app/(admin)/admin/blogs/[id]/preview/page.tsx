import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { BlogPreviewActions } from "../../_components/blog-preview-actions";
import { BlogPreviewContent } from "../../_components/blog-preview-content";
import { getBlogPostById } from "../../_actions/blog-actions";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BlogPreviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Blog Post Preview",
  description: "Preview your blog post before publishing",
};

export default async function BlogPreviewPage({
  params,
}: BlogPreviewPageProps) {
  const { id } = await params;

  // Verify user is authenticated
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/blogs");
  }

  // Fetch the blog post
  const { post, error } = await getBlogPostById(id);

  // Handle errors
  if (error || !post) {
    if (error === "Blog post not found.") {
      notFound();
    }

    return (
      <div className="container mx-auto py-6">
        <div className="rounded-md bg-destructive/15 p-4 text-destructive">
          Error: {error || "Failed to load blog post"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto py-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/admin/blogs"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Blog Posts
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Blog Post Preview</h1>
          <p className="text-muted-foreground">
            Preview how your blog post will appear to readers
          </p>
        </div>

        {/* Preview Actions */}
        <BlogPreviewActions blogId={post.id} isPublished={post.isPublished} />
        <Separator className="mb-8" />

        {/* Blog Content */}
        <BlogPreviewContent blog={post} />
      </div>
    </div>
  );
}
