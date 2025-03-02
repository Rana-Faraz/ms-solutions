import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NewBlogForm } from "../_components/new-blog-form";

export const metadata = {
  title: "Create New Blog Post",
  description: "Create a new blog post for your website",
};

export default async function NewBlogPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/blogs/new");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <p className="text-muted-foreground">
          Create a new blog post with rich content and SEO settings
        </p>
      </div>

      <NewBlogForm />
    </div>
  );
}
