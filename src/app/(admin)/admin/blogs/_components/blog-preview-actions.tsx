"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Eye, EyeOff } from "lucide-react";
import { updateBlogPublishStatus } from "../_actions/blog-actions";
import { toast } from "sonner";
import Link from "next/link";
interface BlogPreviewActionsProps {
  blogId: string;
  isPublished: boolean;
}

export function BlogPreviewActions({
  blogId,
  isPublished,
}: BlogPreviewActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePublishStatusChange = async () => {
    try {
      setIsUpdating(true);
      const newStatus = !isPublished;
      const result = await updateBlogPublishStatus(blogId, newStatus);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        newStatus
          ? "Blog post published successfully!"
          : "Blog post moved to draft.",
      );
      router.refresh();
    } catch (error) {
      console.error("Error updating blog post status:", error);
      toast.error("Failed to update blog post status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${
            isPublished ? "bg-green-500" : "bg-amber-500"
          }`}
        />
        <span className="text-sm font-medium">
          {isPublished ? "Published" : "Draft"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePublishStatusChange}
          disabled={isUpdating}
        >
          {isUpdating ? (
            "Updating..."
          ) : isPublished ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Move to Draft
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Publish
            </>
          )}
        </Button>
        <Button size="sm" asChild>
          <Link href={`/admin/blogs/${blogId}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>
    </div>
  );
}
