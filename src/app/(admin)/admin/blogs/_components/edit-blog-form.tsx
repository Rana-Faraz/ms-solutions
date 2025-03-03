"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BlogPost } from "@/types/blog";
import { NewBlogForm } from "./new-blog-form";
import { updateBlogPost } from "../_actions/blog-actions";
import { processContent } from "@/components/rich-text-editor";
import { JSONContent } from "@tiptap/react";

interface EditBlogFormProps {
  blog: BlogPost;
}

export function EditBlogForm({ blog }: EditBlogFormProps) {
  const router = useRouter();

  const defaultValues = {
    title: blog.title,
    slug: blog.slug,
    metaTitle: blog.metaTitle || "",
    metaDescription: blog.metaDescription || "",
    canonicalUrl: blog.canonicalUrl || "",
    featuredImage: blog.featuredImage || "",
    content:
      typeof blog.content === "string"
        ? JSON.parse(blog.content)
        : blog.content,
    excerpt: blog.excerpt || "",
    isPublished: blog.isPublished,
    allowIndexing: blog.allowIndexing,
    categories: blog.categories?.map((cat) => cat.id) || [],
    tags: blog.tags?.map((tag) => tag.id) || [],
  };

  const handleSubmit = async (values: any) => {
    try {
      // Process the content to ensure image attributes are preserved
      const processedContent = processContent(values.content as JSONContent);

      // Convert to string for server action
      const contentString = JSON.stringify(processedContent);

      console.log("Processed content:", contentString);

      const result = await updateBlogPost({
        id: blog.id,
        ...values,
        content: contentString,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Blog post updated successfully!");
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast.error("Failed to update blog post. Please try again.");
    }
  };

  return (
    <NewBlogForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitLabel="Update Post"
    />
  );
}
