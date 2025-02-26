"use client";

import { useState } from "react";
import { RichTextEditor } from "./rich-text-editor";
import { JSONContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateReadingTime, extractTextFromContent } from "./utils";

export function RichTextEditorDemo() {
  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 1 },
        content: [{ type: "text", text: "Welcome to the Rich Text Editor" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is a feature-rich text editor built with Tiptap and shadcn components. It's perfect for blog writing and content creation.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Features" }],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Rich formatting options" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Image uploads and embedding" },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Tables and code blocks" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Text alignment and typography" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Try it out by editing this content!",
          },
        ],
      },
    ],
  });

  const readingTime = calculateReadingTime(content);
  const excerpt = extractTextFromContent(content).slice(0, 150) + "...";

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Rich Text Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            content={content}
            onChange={setContent}
            className="min-h-[400px]"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Reading time: {readingTime} min
          </div>
          <Button>Save Content</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Excerpt:</h3>
            <p className="text-muted-foreground">{excerpt}</p>
          </div>
          <h3 className="mb-2 text-lg font-medium">JSON Content:</h3>
          <pre className="max-h-[300px] overflow-auto rounded-md bg-muted p-4 text-xs">
            {JSON.stringify(content, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
