"use server";

import { db } from "@/lib/db";
import {
  blogPost,
  blogCategory,
  blogTag,
  blogPostCategory,
  blogPostTag,
} from "@/lib/db/schema/blog";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { headers } from "next/headers";
import {
  calculateReadingTime,
  extractTextFromContent,
  generateSlug,
} from "@/components/rich-text-editor/utils";
import { eq, ExtractTablesWithRelations } from "drizzle-orm";
import { asc } from "drizzle-orm";
import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres/session";
import { PgTransaction } from "drizzle-orm/pg-core";
import * as schema from "@/lib/db/schema";
import { JSONContent } from "@tiptap/react";
interface CreateBlogPostParams {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  featuredImage?: string;
  content: string;
  excerpt?: string;
  wordCount?: number;
  readTime?: number;
  isPublished: boolean;
  allowIndexing: boolean;
  authorId: string;
  categories: string[];
  tags: string[];
}

/**
 * Verifies user authentication and returns the session
 */
async function verifyAuthentication(errorMessage = "Unauthorized") {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error(errorMessage);
  }

  return session;
}

/**
 * Processes categories, creating them if they don't exist
 * @param tx Transaction object
 * @param categoryNames Array of category names or IDs
 * @returns Array of category IDs
 */
async function processCategories(
  tx: PgTransaction<
    NodePgQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
  >,
  categoryNames: string[],
) {
  return Promise.all(
    categoryNames.map(async (category) => {
      // Check if the input is already a UUID (ID)
      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          category,
        );

      if (isUuid) {
        // Verify the category exists
        const existingCategory = await tx.query.blogCategory.findFirst({
          where: (cat, { eq }) => eq(cat.id, category),
        });

        if (existingCategory) {
          return category; // Return the ID directly
        }
      }

      // If not a UUID or UUID not found, treat as a name
      // Try to find existing category by name
      const existingCategory = await tx.query.blogCategory.findFirst({
        where: (cat, { eq }) => eq(cat.name, category),
      });

      if (existingCategory) {
        return existingCategory.id;
      }

      // Create new category
      const [newCategory] = await tx
        .insert(blogCategory)
        .values({
          name: category,
          slug: generateSlug(category),
        })
        .returning();

      return newCategory.id;
    }),
  );
}

/**
 * Processes tags, creating them if they don't exist
 * @param tx Transaction object
 * @param tagNames Array of tag names or IDs
 * @returns Array of tag IDs
 */
async function processTags(
  tx: PgTransaction<
    NodePgQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
  >,
  tagNames: string[],
) {
  return Promise.all(
    tagNames.map(async (tag) => {
      // Check if the input is already a UUID (ID)
      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          tag,
        );

      if (isUuid) {
        // Verify the tag exists
        const existingTag = await tx.query.blogTag.findFirst({
          where: (t, { eq }) => eq(t.id, tag),
        });

        if (existingTag) {
          return tag; // Return the ID directly
        }
      }

      // If not a UUID or UUID not found, treat as a name
      // Try to find existing tag by name
      const existingTag = await tx.query.blogTag.findFirst({
        where: (t, { eq }) => eq(t.name, tag),
      });

      if (existingTag) {
        return existingTag.id;
      }

      // Create new tag
      const [newTag] = await tx
        .insert(blogTag)
        .values({
          name: tag,
          slug: generateSlug(tag),
        })
        .returning();

      return newTag.id;
    }),
  );
}

/**
 * Creates category relationships for a blog post
 */
async function createCategoryRelationships(
  tx: PgTransaction<
    NodePgQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
  >,
  blogPostId: string,
  categoryIds: string[],
) {
  if (categoryIds.length === 0) return;

  await tx.insert(blogPostCategory).values(
    categoryIds.map((categoryId) => ({
      blogPostId,
      categoryId,
    })),
  );
}

/**
 * Creates tag relationships for a blog post
 */
async function createTagRelationships(
  tx: PgTransaction<
    NodePgQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
  >,
  blogPostId: string,
  tagIds: string[],
) {
  if (tagIds.length === 0) return;

  await tx.insert(blogPostTag).values(
    tagIds.map((tagId) => ({
      blogPostId,
      tagId,
    })),
  );
}

/**
 * Revalidates all relevant paths for a blog post
 */
function revalidateBlogPaths(blogId?: string, slug?: string) {
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");

  if (blogId) {
    revalidatePath(`/admin/blogs/${blogId}`);
    revalidatePath(`/admin/blogs/${blogId}/preview`);
    revalidatePath(`/admin/blogs/${blogId}/edit`);
  }

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function createBlogPost(params: CreateBlogPostParams) {
  try {
    // Verify user is authenticated
    const session = await verifyAuthentication(
      "Unauthorized. Please log in to create a blog post.",
    );

    // Check if the user is the same as the authorId
    if (session.user.id !== params.authorId) {
      return { error: "You can only create posts as yourself." };
    }

    // Check if slug already exists
    const existingPost = await db.query.blogPost.findFirst({
      where: (post, { eq }) => eq(post.slug, params.slug),
    });

    if (existingPost) {
      return { error: "A blog post with this slug already exists." };
    }

    // Start a transaction
    return await db.transaction(async (tx) => {
      // Process categories and tags
      const categoryIds = await processCategories(tx, params.categories);
      const tagIds = await processTags(tx, params.tags);

      const text = extractTextFromContent(
        params.content as unknown as JSONContent,
      );
      const wordCount = text.trim().split(/\s+/).length;
      const readTime = calculateReadingTime(
        params.content as unknown as JSONContent,
      );

      // Create the blog post
      const now = new Date();
      const [post] = await tx
        .insert(blogPost)
        .values({
          title: params.title,
          slug: params.slug,
          metaTitle: params.metaTitle || null,
          metaDescription: params.metaDescription || null,
          canonicalUrl: params.canonicalUrl || null,
          featuredImage: params.featuredImage || null,
          content: params.content,
          excerpt: params.excerpt || null,
          wordCount: wordCount,
          readTime: readTime,
          isPublished: params.isPublished,
          allowIndexing: params.allowIndexing,
          publishedAt: params.isPublished ? now : null,
          createdAt: now,
          updatedAt: now,
          authorId: params.authorId,
        })
        .returning();

      // Create relationships
      await createCategoryRelationships(tx, post.id, categoryIds);
      await createTagRelationships(tx, post.id, tagIds);

      // Revalidate paths
      revalidateBlogPaths(post.id, post.slug);

      return { success: true, post, error: null };
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create blog post",
    };
  }
}

export async function getCategories(search?: string) {
  try {
    const categories = await db.query.blogCategory.findMany({
      where: search
        ? (category, { ilike }) => ilike(category.name, `%${search}%`)
        : undefined,
      orderBy: (category, { asc }) => [asc(category.name)],
    });

    return { data: categories, error: null };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to fetch categories",
    };
  }
}

export async function getTags(search?: string) {
  try {
    const tags = await db.query.blogTag.findMany({
      where: search
        ? (tag, { ilike }) => ilike(tag.name, `%${search}%`)
        : undefined,
      orderBy: (tag, { asc }) => [asc(tag.name)],
    });

    return { data: tags, error: null };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to fetch tags",
    };
  }
}

/**
 * Fetches categories and tags for a blog post
 */
async function fetchCategoriesAndTags(blogPostId: string) {
  // Get categories for this post
  const postCategories = await db
    .select({
      categoryId: blogCategory.id,
      name: blogCategory.name,
      slug: blogCategory.slug,
    })
    .from(blogPostCategory)
    .innerJoin(blogCategory, eq(blogPostCategory.categoryId, blogCategory.id))
    .where(eq(blogPostCategory.blogPostId, blogPostId));

  // Get tags for this post
  const postTags = await db
    .select({
      tagId: blogTag.id,
      name: blogTag.name,
      slug: blogTag.slug,
    })
    .from(blogPostTag)
    .innerJoin(blogTag, eq(blogPostTag.tagId, blogTag.id))
    .where(eq(blogPostTag.blogPostId, blogPostId));

  // Format the data
  const categories = postCategories.map((pc) => ({
    id: pc.categoryId,
    name: pc.name,
    slug: pc.slug,
  }));

  const tags = postTags.map((pt) => ({
    id: pt.tagId,
    name: pt.name,
    slug: pt.slug,
  }));

  return { categories, tags };
}

export async function getBlogPostById(id: string) {
  try {
    // Verify user is authenticated
    const session = await verifyAuthentication(
      "Unauthorized. Please log in to view blog posts.",
    );

    // Get the blog post
    const post = await db.query.blogPost.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) {
      return { error: "Blog post not found." };
    }

    // Get the author
    const author = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, post.authorId),
      columns: {
        name: true,
        email: true,
        image: true,
      },
    });

    // Get categories and tags
    const { categories, tags } = await fetchCategoriesAndTags(post.id);

    // Combine the data
    const enrichedPost = {
      ...post,
      author,
      categories,
      tags,
    };

    return { success: true, post: enrichedPost, error: null };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch blog post",
    };
  }
}

export async function updateBlogPublishStatus(
  id: string,
  isPublished: boolean,
) {
  try {
    // Verify user is authenticated
    const session = await verifyAuthentication(
      "Unauthorized. Please log in to update blog posts.",
    );

    // Get the blog post to check ownership
    const existingPost = await db.query.blogPost.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!existingPost) {
      return { error: "Blog post not found." };
    }

    // Check if the user is the author
    if (existingPost.authorId !== session.user.id) {
      return { error: "You can only update your own posts." };
    }

    // Update the blog post
    const now = new Date();
    const [updatedPost] = await db
      .update(blogPost)
      .set({
        isPublished,
        publishedAt: isPublished ? now : null,
        updatedAt: now,
      })
      .where(eq(blogPost.id, id))
      .returning();

    // Revalidate paths
    revalidateBlogPaths(id, updatedPost.slug);

    return { success: true, post: updatedPost, error: null };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update blog post",
    };
  }
}

export interface UpdateBlogPostParams {
  id: string;
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  featuredImage?: string;
  content: string;
  excerpt?: string;
  wordCount?: number;
  readTime?: number;
  isPublished: boolean;
  allowIndexing: boolean;
  categories: string[];
  tags: string[];
}

export async function updateBlogPost(params: UpdateBlogPostParams) {
  try {
    // Verify user is authenticated
    const session = await verifyAuthentication(
      "Unauthorized. Please log in to update blog posts.",
    );

    // Get the blog post to check ownership
    const existingPost = await db.query.blogPost.findFirst({
      where: (post, { eq }) => eq(post.id, params.id),
    });

    if (!existingPost) {
      return { error: "Blog post not found." };
    }

    // Check if the user is the author
    if (existingPost.authorId !== session.user.id) {
      return { error: "You can only update your own posts." };
    }

    // Check if the new slug already exists (if changed)
    if (params.slug !== existingPost.slug) {
      const slugExists = await db.query.blogPost.findFirst({
        where: (post, { eq, and, ne }) =>
          and(eq(post.slug, params.slug), ne(post.id, params.id)),
      });

      if (slugExists) {
        return { error: "A blog post with this slug already exists." };
      }
    }

    // Start a transaction
    const result = await db.transaction(async (tx) => {
      // Process categories and tags
      const categoryIds = await processCategories(tx, params.categories);
      const tagIds = await processTags(tx, params.tags);

      const text = extractTextFromContent(
        params.content as unknown as JSONContent,
      );
      const wordCount = text.trim().split(/\s+/).length;
      const readTime = calculateReadingTime(
        params.content as unknown as JSONContent,
      );

      // Update the blog post
      const [updatedPost] = await tx
        .update(blogPost)
        .set({
          title: params.title,
          slug: params.slug,
          metaTitle: params.metaTitle || null,
          metaDescription: params.metaDescription || null,
          canonicalUrl: params.canonicalUrl || null,
          featuredImage: params.featuredImage || null,
          content: params.content,
          excerpt: params.excerpt || null,
          wordCount: wordCount,
          readTime: readTime,
          isPublished: params.isPublished,
          allowIndexing: params.allowIndexing,
          updatedAt: new Date(),
        })
        .where(eq(blogPost.id, params.id))
        .returning();

      // Delete existing category relationships
      await tx
        .delete(blogPostCategory)
        .where(eq(blogPostCategory.blogPostId, params.id));

      // Create new category relationships
      await createCategoryRelationships(tx, params.id, categoryIds);

      // Delete existing tag relationships
      await tx.delete(blogPostTag).where(eq(blogPostTag.blogPostId, params.id));

      // Create new tag relationships
      await createTagRelationships(tx, params.id, tagIds);

      return updatedPost;
    });

    // Revalidate paths
    revalidateBlogPaths(params.id, result.slug);

    return { post: result, error: null };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to update blog post",
    };
  }
}
