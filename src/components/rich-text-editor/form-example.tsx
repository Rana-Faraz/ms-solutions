"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RichTextEditor } from "./rich-text-editor";
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
import { isContentEmpty } from "./utils";

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  content: z.custom<JSONContent>(
    (val) => {
      // Custom validation for the editor content
      return !isContentEmpty(val as JSONContent);
    },
    {
      message: "Content cannot be empty.",
    },
  ),
  excerpt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function BlogPostForm() {
  const [editorContent, setEditorContent] = useState<JSONContent>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "" }],
      },
    ],
  });

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: editorContent,
      excerpt: "",
    },
  });

  // Handle form submission
  function onSubmit(values: FormValues) {
    console.log("Form submitted:", values);
    // Here you would typically send the data to your API
    alert("Blog post submitted successfully!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog post title" {...field} />
              </FormControl>
              <FormDescription>The title of your blog post.</FormDescription>
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
                  onChange={(content) => {
                    setEditorContent(content);
                    field.onChange(content);
                  }}
                  placeholder="Write your blog post content here..."
                  className="min-h-[300px]"
                />
              </FormControl>
              <FormDescription>
                The main content of your blog post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Brief summary of your post" {...field} />
              </FormControl>
              <FormDescription>
                A short excerpt to display in blog listings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Publish Post</Button>
        </div>
      </form>
    </Form>
  );
}
