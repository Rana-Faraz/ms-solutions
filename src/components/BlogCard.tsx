import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, Clock, User } from "lucide-react";
import { FaUserMd, FaFileMedical } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  variant?: "primary" | "secondary";
}

export function BlogCard({ post, variant = "primary" }: BlogCardProps) {
  return (
    <Card className="h-full max-w-96 overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-muted">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary/10">
            <FaFileMedical className="h-12 w-12 text-primary/40" />
          </div>
        )}
      </div>
      <CardHeader
        className={cn("p-4 pb-2", variant === "secondary" && "bg-secondary/10")}
      >
        {post.categories && post.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((category) => (
              <Badge
                key={category.id}
                variant="secondary"
                className="font-normal"
              >
                {category.name}
              </Badge>
            ))}
            {post.categories.length > 2 && (
              <Badge variant="outline" className="font-normal">
                +{post.categories.length - 2}
              </Badge>
            )}
          </div>
        )}
        <h3 className="line-clamp-2 text-lg font-bold leading-tight">
          <Link href={`/blogs/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent
        className={cn("p-4 pt-0", variant === "secondary" && "bg-secondary/10")}
      >
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {post.excerpt ||
            "Discover insights in healthcare technology and clinical best practices."}
        </p>
      </CardContent>
      <CardFooter
        className={cn(
          "flex flex-col items-start gap-3 border-t p-4 text-xs text-muted-foreground",
          variant === "secondary" && "bg-secondary/10",
        )}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {post.author?.image ? (
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={post.author.image}
                  alt={post.author.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <FaUserMd className="h-3 w-3 text-primary" />
              </div>
            )}
            <span>{post.author?.name || "Medical Editor"}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime} min read</span>
            </div>
          )}
        </div>
        {post.publishedAt && (
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            <time dateTime={post.publishedAt.toISOString()}>
              {format(new Date(post.publishedAt), "MMM d, yyyy")}
            </time>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
