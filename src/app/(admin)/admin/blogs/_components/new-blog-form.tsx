"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RichTextEditor } from "@/components/rich-text-editor";
import { JSONContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  createBlogPost,
  getCategories,
  getTags,
} from "../_actions/blog-actions";
import {
  isContentEmpty,
  calculateReadingTime,
  extractTextFromContent,
  processContent,
} from "@/components/rich-text-editor/utils";
import { Separator } from "@/components/ui/separator";
import { Combobox, ComboboxItem } from "@/components/ui/combobox";
import { SelectPills } from "@/components/ui/autocomplete";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  categories: z.array(z.string()).min(1, {
    message: "At least one category is required.",
  }),
  tags: z.array(z.string()),
  metaTitle: z.string().optional(),
  metaDescription: z
    .string()
    .max(160, {
      message: "Meta description should be 160 characters or less for SEO.",
    })
    .optional(),
  canonicalUrl: z
    .string()
    .url({ message: "Must be a valid URL" })
    .optional()
    .or(z.literal("")),
  featuredImage: z
    .string()
    .url({ message: "Must be a valid URL" })
    .optional()
    .or(z.literal("")),
  content: z.custom<JSONContent>(
    (val) => {
      // Custom validation for the editor content
      return !isContentEmpty(val as JSONContent);
    },
    {
      message: "Content cannot be empty.",
    },
  ),
  excerpt: z
    .string()
    .max(300, {
      message: "Excerpt should be 300 characters or less.",
    })
    .optional(),
  isPublished: z.boolean().default(true),
  allowIndexing: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export interface NewBlogFormProps {
  defaultValues?: {
    title: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    featuredImage: string;
    content: JSONContent;
    excerpt: string;
    isPublished: boolean;
    allowIndexing: boolean;
    categories: string[];
    tags: string[];
  };
  onSubmit?: (values: any) => Promise<void>;
  submitLabel?: string;
}

export function NewBlogForm({
  defaultValues,
  onSubmit: customSubmit,
  submitLabel = "Create Post",
}: NewBlogFormProps) {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState<JSONContent>(
    defaultValues?.content || {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "" }],
        },
      ],
    },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      slug: "",
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      featuredImage: "",
      content: editorContent,
      excerpt: "",
      isPublished: true,
      allowIndexing: true,
      categories: [],
      tags: [],
    },
  });

  // Handle content change
  const handleContentChange = (content: JSONContent) => {
    setEditorContent(content);
    form.setValue("content", content, { shouldValidate: true });
  };

  // Handle form submission
  async function onSubmit(values: FormValues) {
    try {
      if (customSubmit) {
        await customSubmit(values);
        return;
      }

      // Process the content to ensure image attributes are preserved
      const processedContent = processContent(values.content);

      // Convert to string for server action
      const contentString = JSON.stringify(processedContent);

      console.log("Processed content:", contentString);

      const result = await createBlogPost({
        ...values,
        content: contentString,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Blog post created successfully!");
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Failed to create blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      if (result.data) {
        setCategories(result.data);
      }
    };

    const fetchTags = async () => {
      const result = await getTags();
      if (result.data) {
        setTags(result.data);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {/* Publication Status */}
        <div className="flex items-center justify-between gap-8">
          <div>
            <h3 className="text-lg font-medium">Publication Status</h3>
            <p className="text-sm text-muted-foreground">
              Control whether this post is publicly visible
            </p>
          </div>
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{field.value ? "Published" : "Draft"}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Main Content Section */}
        <div className="space-y-8">
          <div className="grid gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog post title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title of your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        /blog/
                      </span>
                      <Input placeholder="url-friendly-title" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The URL-friendly version of the title. Use lowercase
                    letters, numbers, and hyphens only.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={editorContent}
                      onChange={handleContentChange}
                      placeholder="Write your blog post content here..."
                      className="min-h-[400px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of your post"
                        className="h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short excerpt to display in blog listings (max 300
                      characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featuredImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL for the featured image of your blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Categories and Tags Section */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium">Categories and Tags</h3>
            <p className="text-sm text-muted-foreground">
              Organize your blog post with categories and tags
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <SelectPills
                      data={categories.map((cat) => ({
                        id: cat.id,
                        name: cat.name,
                      }))}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Search or select categories..."
                      allowNewValues={true}
                    />
                  </FormControl>
                  <FormDescription>
                    Add at least one category to help organize your content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <SelectPills
                      data={tags.map((tag) => ({
                        id: tag.id,
                        name: tag.name,
                      }))}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Search or select tags..."
                      allowNewValues={true}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional tags to help users find related content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* SEO Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">SEO Settings</h3>
              <p className="text-sm text-muted-foreground">
                Optimize your post for search engines
              </p>
            </div>
            <FormField
              control={form.control}
              name="allowIndexing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <div className="space-y-1 leading-none">
                    <FormLabel>Allow Indexing</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="grid gap-8">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO-optimized title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title that appears in search engine results.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description for search engines"
                      className="h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short description that appears in search results (max 160
                    characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="canonicalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/original-post"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The original URL if this content is republished from
                    elsewhere.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-4 border-t bg-background p-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blogs")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
