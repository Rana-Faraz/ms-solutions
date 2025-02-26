import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NewBlogForm } from "../(admin)/admin/blogs/_components/new-blog-form";

export const metadata = {
  title: "Blog Form Test",
  description: "Test page for the improved blog form",
};

export default async function BlogFormTestPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/blog-form-test");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Blog Form Test</h1>
        <p className="text-muted-foreground">
          Testing the improved blog form with fixed slug and excerpt generation
        </p>
      </div>

      <NewBlogForm userId={session.user.id} />
    </div>
  );
}
