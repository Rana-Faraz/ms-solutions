"use client";

import { BubbleMenu, type BubbleMenuProps, type Editor } from "@tiptap/react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Unlink,
  Highlighter,
  Palette,
  Check,
  X,
} from "lucide-react";

interface EditorBubbleMenuProps {
  editor: Editor;
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [color, setColor] = useState("#000000");

  const handleLinkSubmit = useCallback(() => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }
    setIsLinkMenuOpen(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const setTextColor = useCallback(
    (color: string) => {
      editor.chain().focus().setColor(color).run();
      document.documentElement.style.setProperty("--text-color", color);
      setIsColorMenuOpen(false);
    },
    [editor],
  );

  // Don't show the bubble menu for code blocks
  const shouldShow = useCallback(({ editor }: { editor: Editor }) => {
    return !editor.isActive("codeBlock");
  }, []);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{ duration: 150 }}
      className="flex items-center rounded-md border bg-background p-1 shadow-md"
    >
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Inline Code"
      >
        <Code className="h-4 w-4" />
      </Toggle>

      {/* Link */}
      <Popover open={isLinkMenuOpen} onOpenChange={setIsLinkMenuOpen}>
        <PopoverTrigger asChild>
          <Toggle size="sm" pressed={editor.isActive("link")} aria-label="Link">
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={handleLinkSubmit}
                disabled={!linkUrl}
                className="px-2"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsLinkMenuOpen(false)}
                className="px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {editor.isActive("link") && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setIsLinkMenuOpen(false);
                }}
                className="mt-2"
              >
                <Unlink className="mr-2 h-4 w-4" />
                Remove Link
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Highlight */}
      <Toggle
        size="sm"
        pressed={editor.isActive("highlight")}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        aria-label="Highlight"
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>

      {/* Text Color */}
      <Popover open={isColorMenuOpen} onOpenChange={setIsColorMenuOpen}>
        <PopoverTrigger asChild>
          <Toggle size="sm" aria-label="Text Color">
            <Palette className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <HexColorPicker color={color} onChange={setColor} />
            <div className="mt-2 flex items-center gap-2">
              <div
                className="h-8 w-8 rounded border"
                style={{ backgroundColor: color }}
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={() => setTextColor(color)}
                className="px-2"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </BubbleMenu>
  );
}
