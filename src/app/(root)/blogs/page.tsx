import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata = {
  title: "Blogs | Your Business Name",
  description:
    "Read our latest articles, tips, and insights to help your small business grow.",
};

// Sample blog data - in a real application, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "10 Digital Marketing Strategies for Small Businesses in 2023",
    excerpt:
      "Discover the most effective digital marketing strategies that can help your small business thrive in the competitive online landscape of 2023.",
    author: "Jane Doe",
    date: "June 15, 2023",
    category: "Digital Marketing",
    readTime: "8 min read",
    slug: "digital-marketing-strategies-2023",
  },
  {
    id: 2,
    title: "How to Build a Strong Brand Identity for Your Small Business",
    excerpt:
      "Learn the essential elements of creating a memorable brand identity that resonates with your target audience and sets you apart from competitors.",
    author: "John Smith",
    date: "May 28, 2023",
    category: "Branding",
    readTime: "6 min read",
    slug: "build-strong-brand-identity",
  },
  {
    id: 3,
    title: "The Ultimate Guide to E-commerce Success for Small Retailers",
    excerpt:
      "Everything you need to know about setting up and optimizing an e-commerce store that drives sales and provides an excellent customer experience.",
    author: "Emily Johnson",
    date: "May 12, 2023",
    category: "E-commerce",
    readTime: "10 min read",
    slug: "ecommerce-success-guide",
  },
  {
    id: 4,
    title: "5 Ways to Improve Your Small Business Website Conversion Rate",
    excerpt:
      "Practical tips and strategies to optimize your website and turn more visitors into customers, clients, or leads.",
    author: "Michael Brown",
    date: "April 30, 2023",
    category: "Web Development",
    readTime: "7 min read",
    slug: "improve-website-conversion-rate",
  },
  {
    id: 5,
    title: "Small Business Financing: Options and Strategies for Growth",
    excerpt:
      "Explore various financing options available to small businesses and learn how to choose the right one for your specific growth needs.",
    author: "Sarah Williams",
    date: "April 15, 2023",
    category: "Finance",
    readTime: "9 min read",
    slug: "small-business-financing-options",
  },
  {
    id: 6,
    title: "How to Use Social Media to Grow Your Small Business in 2023",
    excerpt:
      "A comprehensive guide to leveraging different social media platforms effectively to increase brand awareness and drive customer engagement.",
    author: "David Clark",
    date: "March 28, 2023",
    category: "Social Media",
    readTime: "8 min read",
    slug: "social-media-growth-guide",
  },
];

export default function BlogsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-center text-4xl font-bold">Our Blog</h1>

      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-lg text-gray-700">
          Insights, strategies, and tips to help your small business grow and
          succeed in today's competitive marketplace.
        </p>
      </div>

      {/* Categories */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
          All
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200">
          Digital Marketing
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200">
          Branding
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200">
          E-commerce
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200">
          Web Development
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200">
          Finance
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200">
          Social Media
        </button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="flex h-48 items-center justify-center bg-gray-200">
              {/* Replace with actual blog post image */}
              <span className="text-gray-500">Blog Image Placeholder</span>
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center gap-4">
                <span className="text-sm font-medium text-blue-600">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="mb-3 text-xl font-semibold">
                <Link
                  href={`${ROUTES.BLOGS}/${post.slug}`}
                  className="transition-colors hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mb-4 text-gray-700">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <span className="text-sm font-medium">{post.author}</span>
                </div>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <a
            href="#"
            className="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="inline-flex items-center border-b border-t border-gray-300 bg-white px-4 py-2 text-sm font-medium text-blue-600"
          >
            1
          </a>
          <a
            href="#"
            className="inline-flex items-center border-b border-t border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="inline-flex items-center border-b border-t border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            3
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </nav>
      </div>
    </main>
  );
}
