"use server";

import { db } from "@/lib/db";
import {
  blogPost,
  blogCategory,
  blogTag,
  blogPostCategory,
  blogPostTag,
} from "@/lib/db/schema/blog";
import { user } from "@/lib/db/schema/auth";
import { TableQueryParams, TableQueryResult } from "@/types/table";
import { BlogPost } from "@/types/blog";
import {
  and,
  asc,
  desc,
  eq,
  ilike,
  inArray,
  isNull,
  or,
  sql,
} from "drizzle-orm";

export async function getBlogPosts<T>(
  params?: TableQueryParams<T>,
): Promise<TableQueryResult<BlogPost>> {
  try {
    // Initialize base queries
    const baseQueryBuilder = db
      .select({
        id: blogPost.id,
        title: blogPost.title,
        slug: blogPost.slug,
        metaTitle: blogPost.metaTitle,
        metaDescription: blogPost.metaDescription,
        canonicalUrl: blogPost.canonicalUrl,
        featuredImage: blogPost.featuredImage,
        content: blogPost.content,
        excerpt: blogPost.excerpt,
        wordCount: blogPost.wordCount,
        readTime: blogPost.readTime,
        isPublished: blogPost.isPublished,
        allowIndexing: blogPost.allowIndexing,
        publishedAt: blogPost.publishedAt,
        createdAt: blogPost.createdAt,
        updatedAt: blogPost.updatedAt,
        authorId: blogPost.authorId,
        author: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(blogPost)
      .leftJoin(user, eq(blogPost.authorId, user.id));

    const countQueryBuilder = db
      .select({ count: sql<number>`count(*)` })
      .from(blogPost);

    // Build filter conditions
    let conditions = undefined;
    if (params?.filters?.length) {
      const filterConditions = params.filters
        .map((filter) => {
          const column = blogPost[filter.id as keyof typeof blogPost];
          if (!column) return undefined;

          switch (filter.operator) {
            case "contains":
              return ilike(column as any, `%${filter.value}%`);
            case "equals":
              return eq(column as any, filter.value);
            case "startsWith":
              return ilike(column as any, `${filter.value}%`);
            case "endsWith":
              return ilike(column as any, `%${filter.value}`);
            case "empty":
              return or(isNull(column as any), eq(column as any, ""));
            default:
              return undefined;
          }
        })
        .filter(Boolean);

      if (filterConditions.length) {
        conditions = and(...filterConditions);
      }
    }

    // Get total count with filters
    const filteredCountQuery = conditions
      ? countQueryBuilder.where(conditions)
      : countQueryBuilder;

    // Apply sorting
    const sortConfig = params?.sort ? JSON.parse(params.sort as string) : [];
    const defaultSort = { id: "createdAt", desc: true };
    const { id: sortField, desc: isDesc } = sortConfig[0] || defaultSort;

    // Build the order by clause
    let orderBy;
    switch (sortField) {
      case "title":
        orderBy = isDesc ? desc(blogPost.title) : asc(blogPost.title);
        break;
      case "publishedAt":
        orderBy = isDesc
          ? desc(blogPost.publishedAt)
          : asc(blogPost.publishedAt);
        break;
      case "isPublished":
        orderBy = isDesc
          ? desc(blogPost.isPublished)
          : asc(blogPost.isPublished);
        break;
      case "author":
        orderBy = isDesc ? desc(user.name) : asc(user.name);
        break;
      case "readTime":
        orderBy = isDesc ? desc(blogPost.readTime) : asc(blogPost.readTime);
        break;
      case "createdAt":
      default:
        orderBy = isDesc ? desc(blogPost.createdAt) : asc(blogPost.createdAt);
        break;
    }

    // Get the count first
    const [totalCount] = await filteredCountQuery;

    // Final query with pagination and sorting
    const limit = params?.limit || 10;
    const offset = params?.offset || 0;

    const posts = await baseQueryBuilder
      .where(conditions || undefined)
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);

    // Fetch categories and tags for each post
    const postIds = posts.map((post) => post.id);

    // Get categories for these posts
    const postCategories =
      postIds.length > 0
        ? await db
            .select({
              blogPostId: blogPostCategory.blogPostId,
              categoryId: blogCategory.id,
              name: blogCategory.name,
              slug: blogCategory.slug,
            })
            .from(blogPostCategory)
            .innerJoin(
              blogCategory,
              eq(blogPostCategory.categoryId, blogCategory.id),
            )
            .where(inArray(blogPostCategory.blogPostId, postIds))
        : [];

    // Get tags for these posts
    const postTags =
      postIds.length > 0
        ? await db
            .select({
              blogPostId: blogPostTag.blogPostId,
              tagId: blogTag.id,
              name: blogTag.name,
              slug: blogTag.slug,
            })
            .from(blogPostTag)
            .innerJoin(blogTag, eq(blogPostTag.tagId, blogTag.id))
            .where(inArray(blogPostTag.blogPostId, postIds))
        : [];

    // Combine the data
    const enrichedPosts = posts.map((post) => {
      const categories = postCategories
        .filter((pc) => pc.blogPostId === post.id)
        .map((pc) => ({
          id: pc.categoryId,
          name: pc.name,
          slug: pc.slug,
        }));

      const tags = postTags
        .filter((pt) => pt.blogPostId === post.id)
        .map((pt) => ({
          id: pt.tagId,
          name: pt.name,
          slug: pt.slug,
        }));

      return {
        ...post,
        categories,
        tags,
      };
    });

    return {
      data: {
        records: enrichedPosts,
        total: Number(totalCount.count),
        pageCount: Math.ceil(Number(totalCount.count) / limit),
        pageSize: limit,
        pageIndex: Math.floor(offset / limit),
      },
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to fetch blog posts",
    };
  }
}
