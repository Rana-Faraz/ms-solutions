import { getCategories } from "@/app/(admin)/admin/blogs/_actions/blog-actions";
import { BlogCard } from "@/components/BlogCard";
import { NoBlogsFound } from "@/components/NoBlogsFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getBlogPosts } from "@/lib/actions/blog";
import { TableQueryParams } from "@/types/table";
import { format } from "date-fns";
import { ArrowRight, CalendarIcon, Search } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaFileMedical,
  FaHeartbeat,
  FaStethoscope,
  FaUserMd,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Healthcare Blog",
  description:
    "Read our latest articles on healthcare technology, medical practice management, and clinical innovations to help your healthcare organization thrive.",
  openGraph: {
    title: "Healthcare Blog",
    description:
      "Read our latest articles on healthcare technology, medical practice management, and clinical innovations to help your healthcare organization thrive.",
    type: "website",
    url: "/blogs",
  },
};

interface BlogsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const awaitedSearchParams = await searchParams;
  const page = Number(awaitedSearchParams.page) || 1;
  const search = awaitedSearchParams.search || "";
  const category = awaitedSearchParams.category || "";

  const pageSize = 9; // Show 9 posts per page
  const offset = (page - 1) * pageSize;

  // Build filters array
  const filters: TableQueryParams<any>["filters"] = [
    {
      id: "isPublished",
      value: "true",
      operator: "equals",
    },
  ];

  // Add search filter if provided
  if (search) {
    filters.push({
      id: "title",
      value: search,
      operator: "contains",
    });
  }

  // Filter posts by category if provided
  if (category && category !== "all") {
    filters.push({
      id: "category",
      value: category,
      operator: "equals",
    });
  }

  // Note: Category filtering is now handled in the getBlogPosts function

  // Fetch published blog posts with pagination and search
  const { data, error } = await getBlogPosts({
    filters,
    limit: pageSize,
    offset,
    sort: JSON.stringify([{ id: "publishedAt", desc: true }]), // Sort by publish date
  });

  const { data: allCategoriesData, error: allCategoriesError } =
    await getCategories();

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-md bg-destructive/15 p-4 text-destructive">
          Error: {error || "Failed to load blog posts"}
        </div>
      </div>
    );
  }

  if (allCategoriesError || !allCategoriesData) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-md bg-destructive/15 p-4 text-destructive">
          Error: {allCategoriesError || "Failed to load categories"}
        </div>
      </div>
    );
  }

  // Create pagination URLs
  const createPageURL = (
    pageNum: number,
    searchValue?: string,
    categoryValue?: string,
  ) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set("page", pageNum.toString());
    if (searchValue) params.set("search", searchValue);
    if (categoryValue) params.set("category", categoryValue);

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      {/* Hero Section */}
      <section className="mb-16 rounded-xl bg-gradient-to-r from-primary to-secondary p-8 text-white md:p-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center">
            <FaStethoscope className="mr-3 h-8 w-8" />
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Healthcare Insights
            </h1>
          </div>
          <div className="mx-auto mb-8 h-1 w-24 bg-white"></div>
          <p className="mx-auto mb-8 max-w-3xl text-lg">
            Evidence-based articles, clinical best practices, and technology
            insights to help your healthcare organization deliver exceptional
            patient care.
          </p>

          {/* Search Bar */}
          <form className="mx-auto mt-8 flex max-w-md flex-col items-center space-y-4 sm:flex-row sm:space-x-3 sm:space-y-0">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <Input
                type="text"
                name="search"
                placeholder="Search healthcare articles..."
                className="w-full border-white bg-white pl-10 text-foreground focus:border-accent focus:ring-accent"
                defaultValue={search}
              />
              {/* Hidden input to preserve category when searching */}
              {category && (
                <input type="hidden" name="category" value={category} />
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-primary hover:bg-accent hover:text-primary sm:w-auto"
            >
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Article - Only show if there are posts and we're on the first page with no search */}
      {data.records.length > 0 &&
        page === 1 &&
        !search &&
        (!category || category === "all") && (
          <section className="mb-16">
            <div className="mb-6 flex items-center gap-2">
              <FaHeartbeat className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            <Card className="overflow-hidden border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 overflow-hidden bg-muted md:h-full">
                  {data.records[0].featuredImage ? (
                    <Image
                      src={data.records[0].featuredImage}
                      alt={data.records[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-primary/10">
                      <FaFileMedical className="h-16 w-16 text-primary/40" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between p-6">
                  {data.records[0].categories &&
                    data.records[0].categories.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {data.records[0].categories.map((category) => (
                          <Badge
                            key={category.id}
                            variant="secondary"
                            className="font-normal"
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  <div>
                    <h3 className="mb-4 text-2xl font-bold leading-tight">
                      <Link
                        href={`/blogs/${data.records[0].slug}`}
                        className="hover:text-primary"
                      >
                        {data.records[0].title}
                      </Link>
                    </h3>
                    <p className="mb-6 text-muted-foreground">
                      {data.records[0].excerpt ||
                        "Discover the latest insights in healthcare technology and clinical best practices in this featured article."}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {data.records[0].author?.image ? (
                          <div className="relative h-8 w-8 overflow-hidden rounded-full">
                            <Image
                              src={data.records[0].author.image}
                              alt={data.records[0].author.name || "Author"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <FaUserMd className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <span>
                          {data.records[0].author?.name || "Medical Editor"}
                        </span>
                      </div>
                      {data.records[0].publishedAt && (
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <time
                            dateTime={data.records[0].publishedAt.toISOString()}
                          >
                            {format(
                              new Date(data.records[0].publishedAt),
                              "MMM d, yyyy",
                            )}
                          </time>
                        </div>
                      )}
                    </div>
                    <Button asChild>
                      <Link href={`/blogs/${data.records[0].slug}`}>
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

      {/* Categories */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <FaFileMedical className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          {search && (
            <span className="ml-2 text-sm text-muted-foreground">
              Search results for:{" "}
              <span className="font-medium">"{search}"</span>
            </span>
          )}
        </div>
        <div className="mb-8 flex flex-wrap gap-3">
          <Button
            variant={category === "all" || !category ? "secondary" : "outline"}
            className="rounded-full"
            asChild
          >
            <Link href={createPageURL(1, "", "all")}>All Topics</Link>
          </Button>
          {allCategoriesData.map((cat) => (
            <Button
              key={cat.id}
              variant={category === cat.slug ? "secondary" : "outline"}
              className="rounded-full"
              asChild
            >
              <Link href={createPageURL(1, search, cat.slug)}>{cat.name}</Link>
            </Button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        {data.records.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Skip the first post if it's featured and we're on page 1 with no search */}
            {data.records.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <NoBlogsFound
            searchQuery={
              search || (category ? `Category: ${category}` : undefined)
            }
            resetSearch={async () => {
              "use server";
              redirect("/blogs");
            }}
          />
        )}
      </section>

      {/* Pagination */}
      {data.pageCount > 1 && (
        <section className="mb-16">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <Link
                href={
                  page > 1 ? createPageURL(page - 1, search, category) : "#"
                }
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  className="gap-1"
                >
                  Previous
                </Button>
              </Link>

              {/* Show limited page numbers if there are many pages */}
              {Array.from({ length: Math.min(data.pageCount, 5) }).map(
                (_, i) => {
                  // Calculate page number to display based on current page
                  let pageNum = i + 1;
                  if (data.pageCount > 5) {
                    if (page > 3) {
                      pageNum = page - 3 + i;
                      // Adjust if we're near the end
                      if (pageNum > data.pageCount) {
                        pageNum = data.pageCount - (4 - i);
                      }
                    }
                  }

                  // Ensure page number is valid
                  if (pageNum <= 0 || pageNum > data.pageCount) return null;

                  return (
                    <Link
                      key={i}
                      href={createPageURL(pageNum, search, category)}
                    >
                      <Button
                        variant={pageNum === page ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    </Link>
                  );
                },
              )}

              <Link
                href={
                  page < data.pageCount
                    ? createPageURL(page + 1, search, category)
                    : "#"
                }
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.pageCount}
                  className="gap-1"
                >
                  Next
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
