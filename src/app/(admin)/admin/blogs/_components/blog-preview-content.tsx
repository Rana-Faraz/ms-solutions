import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { RichTextContent } from "@/components/rich-text-editor";
import { CalendarIcon, Clock, User } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogPreviewContentProps {
  blog: BlogPost;
}

export function BlogPreviewContent({ blog }: BlogPreviewContentProps) {
  // Parse the JSON content with error handling
  let contentJson;
  try {
    contentJson =
      typeof blog.content === "string"
        ? JSON.parse(blog.content)
        : blog.content;
  } catch (error) {
    console.error("Error parsing blog content:", error);
    contentJson = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Error displaying content. The content format may be invalid.",
            },
          ],
        },
      ],
    };
  }

  return (
    <article className="mx-auto max-w-4xl">
      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title and Meta */}
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{blog.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {blog.author?.name && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>
          )}

          {blog.publishedAt && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={blog.publishedAt.toISOString()}>
                {format(new Date(blog.publishedAt), "MMMM d, yyyy")}
              </time>
            </div>
          )}

          {blog.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} min read</span>
            </div>
          )}
        </div>
      </div>

      {/* Categories and Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        {blog.categories?.map((category) => (
          <Badge key={category.id} variant="secondary">
            {category.name}
          </Badge>
        ))}

        {blog.tags?.map((tag) => (
          <Badge key={tag.id} variant="outline">
            {tag.name}
          </Badge>
        ))}
      </div>

      {/* Excerpt */}
      {blog.excerpt && (
        <div className="mb-8 rounded-lg border bg-muted/40 p-4 italic">
          {blog.excerpt}
        </div>
      )}

      {/* Content */}
      <div className="prose-container">
        <RichTextContent
          content={contentJson}
          className="prose-lg dark:prose-invert max-w-none"
        />
      </div>

      {/* SEO Info */}
      <div className="mt-12 rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-semibold">SEO Information</h2>
        <div className="space-y-2">
          <div>
            <span className="font-medium">URL: </span>
            <span className="text-muted-foreground">/blog/{blog.slug}</span>
          </div>

          {blog.metaTitle && (
            <div>
              <span className="font-medium">Meta Title: </span>
              <span className="text-muted-foreground">{blog.metaTitle}</span>
            </div>
          )}

          {blog.metaDescription && (
            <div>
              <span className="font-medium">Meta Description: </span>
              <span className="text-muted-foreground">
                {blog.metaDescription}
              </span>
            </div>
          )}

          {blog.canonicalUrl && (
            <div>
              <span className="font-medium">Canonical URL: </span>
              <span className="text-muted-foreground">{blog.canonicalUrl}</span>
            </div>
          )}

          <div>
            <span className="font-medium">Indexing: </span>
            <span className="text-muted-foreground">
              {blog.allowIndexing ? "Allowed" : "Disallowed"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
