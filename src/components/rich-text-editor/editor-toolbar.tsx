"use client";

import { type Editor } from "@tiptap/react";
import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HexColorPicker } from "react-colorful";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Table as TableIcon,
  Highlighter,
  Palette,
  Type,
  Quote,
  Undo,
  Redo,
  Check,
  X,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [isEditingLink, setIsEditingLink] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleLinkSubmit = useCallback(() => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsEditingLink(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const handleImageSubmit = useCallback(() => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  }, [editor, imageUrl]);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            editor.chain().focus().setImage({ src: reader.result }).run();
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [editor],
  );

  const insertTable = useCallback(() => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const setFontFamily = useCallback(
    (fontFamily: string) => {
      editor.chain().focus().setFontFamily(fontFamily).run();
      document.documentElement.style.setProperty("--font-family", fontFamily);
    },
    [editor],
  );

  const setTextColor = useCallback(
    (color: string) => {
      editor.chain().focus().setColor(color).run();
      document.documentElement.style.setProperty("--text-color", color);
    },
    [editor],
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 mb-2 flex flex-wrap items-center gap-1 rounded-md border bg-background p-1">
      {/* Basic Formatting */}
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

      <Separator orientation="vertical" className="h-6" />

      {/* Headings */}
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        aria-label="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        aria-label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        aria-label="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      {/* Lists */}
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      {/* Text Alignment */}
      <ToggleGroup
        type="single"
        size="sm"
        value={
          editor.isActive({ textAlign: "center" })
            ? "center"
            : editor.isActive({ textAlign: "right" })
              ? "right"
              : editor.isActive({ textAlign: "justify" })
                ? "justify"
                : "left"
        }
      >
        <ToggleGroupItem
          value="left"
          aria-label="Align Left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          aria-label="Align Center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          aria-label="Align Right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="justify"
          aria-label="Align Justify"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator orientation="vertical" className="h-6" />

      {/* Link */}
      <Popover open={isEditingLink} onOpenChange={setIsEditingLink}>
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
                onClick={() => setIsEditingLink(false)}
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
                  setIsEditingLink(false);
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

      {/* Image */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle size="sm" aria-label="Insert Image">
            <ImageIcon className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3">
          <div className="flex flex-col gap-2">
            <Tabs defaultValue="url">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="url" className="mt-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={handleImageSubmit}
                    disabled={!imageUrl}
                    className="px-2"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="upload" className="mt-2">
                <Input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </TabsContent>
            </Tabs>
          </div>
        </PopoverContent>
      </Popover>

      {/* Table */}
      <Toggle size="sm" onClick={insertTable} aria-label="Insert Table">
        <TableIcon className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      {/* Blockquote */}
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      {/* Code Block */}
      <Toggle
        size="sm"
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Code Block"
      >
        <Code className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      {/* Text Color */}
      <Popover>
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

      {/* Highlight */}
      <Toggle
        size="sm"
        pressed={editor.isActive("highlight")}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        aria-label="Highlight"
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>

      {/* Font Family */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle size="sm" aria-label="Font Family">
            <Type className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <div className="flex flex-col gap-1">
            {[
              { label: "Default", value: "Inter" },
              { label: "Serif", value: "serif" },
              { label: "Monospace", value: "monospace" },
              { label: "Comic Sans", value: "Comic Sans MS, cursive" },
              { label: "Georgia", value: "Georgia, serif" },
              { label: "Times New Roman", value: "Times New Roman, serif" },
              { label: "Arial", value: "Arial, sans-serif" },
            ].map((font) => (
              <Button
                key={font.value}
                variant="ghost"
                className="justify-start"
                onClick={() => setFontFamily(font.value)}
              >
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="ml-auto flex items-center gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          aria-label="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          aria-label="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
