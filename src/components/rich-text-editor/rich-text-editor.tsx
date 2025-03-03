"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { EditorToolbar } from "./editor-toolbar";
import { EditorBubbleMenu } from "./editor-bubble-menu";
import { cn } from "@/lib/utils";
import { editorExtensions } from "./extensions";
import "./editor.css";

export interface RichTextEditorProps {
  content?: JSONContent | string;
  onChange?: (content: JSONContent) => void;
  onBlur?: () => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
  autofocus?: boolean;
}

export function RichTextEditor({
  content = "",
  onChange,
  onBlur,
  placeholder = "Write something amazing...",
  editable = true,
  className,
  autofocus = false,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isInternalUpdate = useRef(false);
  const previousContentRef = useRef<JSONContent | string>(content);

  const editor = useEditor({
    extensions: editorExtensions(placeholder),
    content,
    editable,
    autofocus,
    editorProps: {
      attributes: {
        class: cn(editable ? "editable" : "readonly"),
      },
    },
    onUpdate: ({ editor }) => {
      isInternalUpdate.current = true;
      onChange?.(editor.getJSON());
      // Reset the flag after a short delay to allow React to process the update
      setTimeout(() => {
        isInternalUpdate.current = false;
      }, 10);
    },
    onBlur: () => {
      onBlur?.();
    },
  });

  // Handle content updates from parent
  useEffect(() => {
    // Skip if the update is coming from the editor itself
    if (isInternalUpdate.current) return;

    // Skip if content hasn't changed
    const contentChanged =
      JSON.stringify(content) !== JSON.stringify(previousContentRef.current);
    if (!contentChanged) return;

    // Update the content if the editor exists and content has changed
    if (editor && content) {
      // Only update if editor is not focused to prevent cursor jumping
      if (!editor.isFocused) {
        if (typeof content === "string") {
          editor.commands.setContent(content);
        } else {
          editor.commands.setContent(content);
        }
      }
    }

    // Update the previous content reference
    previousContentRef.current = content;
  }, [editor, content]);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={cn("min-h-[200px] rounded-md border", className)}>
        <div className="p-3 opacity-70">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={cn("rich-text-editor")}>
      {editor && editable && <EditorToolbar editor={editor} />}
      <div className={cn("rounded-md border", !editable && "bg-muted/50")}>
        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-stone dark:prose-invert max-w-none",
            "min-h-[200px] p-4 focus:outline-none",
            className,
          )}
        />
      </div>
    </div>
  );
}
