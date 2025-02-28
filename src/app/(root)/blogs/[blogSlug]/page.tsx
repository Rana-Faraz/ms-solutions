import {
  getBlogPostBySlug,
  getBlogSlugs,
} from "@/app/(admin)/admin/blogs/_actions/blog-actions";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { RichTextContent } from "@/components/rich-text-editor";
import { CalendarIcon, Clock, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{ blogSlug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { blogSlug } = await params;

  if (!blogSlug) {
    notFound();
  }

  const { post, error } = await getBlogPostBySlug(blogSlug);

  if (!post || error) {
    notFound();
  }

  // Only show published posts to the public
  if (!post.isPublished) {
    notFound();
  }

  // Parse the JSON content with error handling
  let contentJson;
  try {
    contentJson =
      typeof post.content === "string"
        ? JSON.parse(post.content)
        : post.content;
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
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-lg sm:h-[400px] md:h-[500px]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        {/* Title and Meta */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author?.name && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
            )}

            {post.publishedAt && (
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                </time>
              </div>
            )}

            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Categories and Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {post.categories?.map((category) => (
            <Badge key={category.id} variant="secondary">
              {category.name}
            </Badge>
          ))}

          {post.tags?.map((tag) => (
            <Badge key={tag.id} variant="outline">
              {tag.name}
            </Badge>
          ))}
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="mb-8 rounded-lg border bg-muted/40 p-4 italic">
            {post.excerpt}
          </div>
        )}

        {/* Content */}
        <div className="prose-container">
          <RichTextContent
            content={contentJson}
            className="prose-lg prose dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-img:rounded-md md:prose-xl max-w-none"
          />
        </div>

        {/* Share buttons or related posts could go here */}
        <div className="mt-12 border-t pt-8">
          <h2 className="mb-4 text-xl font-semibold">Share this post</h2>
          <div className="flex gap-4">
            {/* Placeholder for share buttons */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80">
              <span className="sr-only">Share on Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80">
              <span className="sr-only">Share on Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80">
              <span className="sr-only">Share on LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ blogSlug: slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}): Promise<Metadata> {
  const { blogSlug } = await params;

  if (!blogSlug) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const { post, error } = await getBlogPostBySlug(blogSlug);

  if (!post || error) {
    return {
      title: "Blog Post Not Found",
    };
  }

  // Only show published posts to the public
  if (!post.isPublished) {
    return {
      title: "Blog Post Not Found",
    };
  }

  // Create structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || "",
    image: post.featuredImage || "",
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : new Date(post.createdAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || "Anonymous",
    },
  };

  return {
    title: post.metaTitle || post.title,
    description:
      post.metaDescription || post.excerpt || `Read ${post.title} on our blog.`,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || "",
      type: "article",
      url: `/blogs/${post.slug}`,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      publishedTime: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined,
      modifiedTime: new Date(post.updatedAt).toISOString(),
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags?.map((tag) => tag.name) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || "",
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    robots: {
      index: post.allowIndexing,
      follow: post.allowIndexing,
    },
    other: {
      "article:published_time": post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : new Date(post.createdAt).toISOString(),
      "article:modified_time": new Date(post.updatedAt).toISOString(),
    },
    // Add structured data and canonical URL in a single alternates object
    alternates: {
      canonical: post.canonicalUrl || `/blogs/${post.slug}`,
      types: {
        "application/ld+json": JSON.stringify(jsonLd),
      },
    },
  };
}
