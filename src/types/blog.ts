export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  featuredImage: string | null;
  content: string;
  excerpt: string | null;
  wordCount: number | null;
  readTime: number | null;
  isPublished: boolean;
  allowIndexing: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    name: string;
    email: string;
    image: string | null;
  } | null;
  categories?: {
    id: string;
    name: string;
    slug: string;
  }[];
  tags?: {
    id: string;
    name: string;
    slug: string;
  }[];
}
