import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  primaryKey,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { user } from "./auth"; // Import user schema for relation

export const blogPost = pgTable(
  "blog_post",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(), // Main blog title
    slug: text("slug").notNull().unique(), // SEO-friendly URL
    metaTitle: text("meta_title"), // SEO meta title
    metaDescription: text("meta_description"), // SEO meta description
    canonicalUrl: text("canonical_url"), // Canonical URL for SEO
    featuredImage: text("featured_image"), // OpenGraph & social sharing image
    content: text("content").notNull(), // Full blog content
    excerpt: text("excerpt"), // Short summary for SEO & previews
    wordCount: integer("word_count"), // Helps estimate reading time
    readTime: integer("read_time"), // Estimated reading time in minutes
    isPublished: boolean("is_published").default(false).notNull(), // Publish status
    allowIndexing: boolean("allow_indexing").default(true).notNull(), // Control SEO indexing
    publishedAt: timestamp("published_at", { mode: "date" }), // When it was published
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(), // Creation time
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(), // Last update time
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // Reference to User table
  },
  (table) => {
    return {
      slugIdx: index("blog_post_slug_idx").on(table.slug),
      authorIdx: index("blog_post_author_idx").on(table.authorId),
      publishedIdx: index("blog_post_published_idx").on(
        table.isPublished,
        table.publishedAt,
      ),
    };
  },
);

export const blogCategory = pgTable(
  "blog_category",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => {
    return [
      {
        slugIdx: index("blog_category_slug_idx").on(table.slug),
      },
    ];
  },
);

export const blogTag = pgTable(
  "blog_tag",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => {
    return [
      {
        slugIdx: index("blog_tag_slug_idx").on(table.slug),
      },
    ];
  },
);

export const blogPostCategory = pgTable(
  "blog_post_category",
  {
    blogPostId: uuid("blog_post_id")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => blogCategory.id, { onDelete: "cascade" }),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.blogPostId, table.categoryId] }),
        blogPostIdx: index("blog_post_category_post_idx").on(table.blogPostId),
        categoryIdx: index("blog_post_category_category_idx").on(
          table.categoryId,
        ),
      },
    ];
  },
);

export const blogPostTag = pgTable(
  "blog_post_tag",
  {
    blogPostId: uuid("blog_post_id")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => blogTag.id, { onDelete: "cascade" }),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.blogPostId, table.tagId] }),
        blogPostIdx: index("blog_post_tag_post_idx").on(table.blogPostId),
        tagIdx: index("blog_post_tag_tag_idx").on(table.tagId),
      },
    ];
  },
);
