import { getBlogPosts } from "@/lib/actions/blog";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostById } from "../../_actions/blog-actions";
import { EditBlogForm } from "../../_components/edit-blog-form";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Edit Blog Post",
  description: "Edit an existing blog post",
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;

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

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">
          Update your blog post content and settings
        </p>
      </div>

      <EditBlogForm blog={post} />
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogPosts({
    limit: 100,
    offset: 0,
  });

  if (blogs.error || !blogs.data) {
    return [];
  }

  return blogs.data.records.map((blog) => ({
    id: blog.id,
  }));
}

export const dynamicParams = true;
