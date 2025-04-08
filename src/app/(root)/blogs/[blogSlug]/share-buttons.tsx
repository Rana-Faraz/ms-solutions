"use client";

import { BlogPost } from "@/types/blog";
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from "next-share";

interface ShareButtonsProps {
  post: BlogPost;
}

export default function ShareButtons({ post }: ShareButtonsProps) {
  return (
    <div className="mb-8 flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <div className="flex gap-2">
        <TwitterShareButton
          url={`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || ""}/blogs/${post.slug}`}
          title={post.title}
          blankTarget
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <FacebookShareButton
          url={`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || ""}/blogs/${post.slug}`}
          quote={post.title}
          blankTarget
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <LinkedinShareButton
          url={`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || ""}/blogs/${post.slug}`}
          title={post.title}
          summary={post.excerpt || ""}
          blankTarget
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
}
