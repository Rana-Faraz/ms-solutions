"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { editorExtensions } from "./extensions";
import { cn } from "@/lib/utils";
import "./editor.css";
import "./content-view.css";

interface RichTextContentProps {
  content: JSONContent;
  className?: string;
}

export function RichTextContent({ content, className }: RichTextContentProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: editorExtensions(""),
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: "readonly",
      },
    },
  });

  // Update content when it changes
  useEffect(() => {
    if (editor && content && !editor.isDestroyed) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);

    return () => {
      if (editor && !editor.isDestroyed) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!isMounted) {
    return <div className="opacity-70">Loading content...</div>;
  }

  return (
    <div className={cn("rich-text-editor rich-text-content")}>
      <EditorContent
        editor={editor}
        className={cn(
          "prose prose-stone dark:prose-invert max-w-none",
          "prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
          "prose-p:my-4 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic",
          "prose-ul:list-disc prose-ol:list-decimal prose-li:my-1",
          "prose-img:rounded-md prose-img:my-8",
          "prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-md",
          className,
        )}
      />
    </div>
  );
}
