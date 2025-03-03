"use client";

import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { AlignLeft, AlignCenter, AlignRight, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ImageNode({ editor, node, getPos }: NodeViewProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [caption, setCaption] = useState(node.attrs.caption || "");
  const [showToolbar, setShowToolbar] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState<number | null>(
    node.attrs.width ? parseInt(node.attrs.width) : null,
  );
  const [startWidth, setStartWidth] = useState(0);
  const [startX, setStartX] = useState(0);

  // Update caption in the editor when it changes
  useEffect(() => {
    if (caption !== node.attrs.caption) {
      editor.commands.updateAttributes("image", { caption });
    }
  }, [caption, editor, node.attrs.caption]);

  // Handle image selection
  const select = useCallback(() => {
    if (typeof getPos === "function") {
      editor.commands.setNodeSelection(getPos());
    }
  }, [editor, getPos]);

  // Handle image click
  const handleClick = useCallback(() => {
    // Only allow selection and toolbar in editable mode
    if (editor.isEditable) {
      select();
      setShowToolbar(true);
    }
  }, [select, editor]);

  // Handle document click to hide toolbar when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (imageRef.current && !imageRef.current.contains(e.target as Node)) {
        setShowToolbar(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // Handle alignment change
  const handleAlignmentChange = (alignment: "left" | "center" | "right") => {
    editor.commands.updateAttributes("image", { alignment });
  };

  // Handle image deletion
  const handleDelete = () => {
    if (typeof getPos === "function") {
      editor.commands.deleteNode("image");
    }
  };

  // Handle resize start
  const handleResizeStart = (
    e: React.MouseEvent,
    direction: "left" | "right",
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!imageRef.current) return;

    setIsResizing(true);
    setStartWidth(imageRef.current.offsetWidth);
    setStartX(e.clientX);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const currentX = e.clientX;
      const diffX =
        direction === "right" ? currentX - startX : startX - currentX;
      const newWidth = startWidth + diffX;

      // Limit minimum width to 100px
      if (newWidth >= 100) {
        setWidth(newWidth);
        editor.commands.updateAttributes("image", { width: `${newWidth}px` });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <NodeViewWrapper className="image-wrapper">
      <figure
        className={`image-container align-${node.attrs.alignment || "center"}`}
        data-alignment={node.attrs.alignment || "center"}
        onClick={handleClick}
        ref={imageRef}
      >
        {showToolbar && editor.isEditable && (
          <div className="image-toolbar">
            <button
              type="button"
              className={node.attrs.alignment === "left" ? "active" : ""}
              onClick={() => handleAlignmentChange("left")}
              title="Align left"
            >
              <AlignLeft size={16} />
            </button>
            <button
              type="button"
              className={node.attrs.alignment === "center" ? "active" : ""}
              onClick={() => handleAlignmentChange("center")}
              title="Align center"
            >
              <AlignCenter size={16} />
            </button>
            <button
              type="button"
              className={node.attrs.alignment === "right" ? "active" : ""}
              onClick={() => handleAlignmentChange("right")}
              title="Align right"
            >
              <AlignRight size={16} />
            </button>
            <button type="button" onClick={handleDelete} title="Delete image">
              <Trash2 size={16} />
            </button>
          </div>
        )}

        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          title={node.attrs.title || ""}
          style={{ width: width ? `${width}px` : "auto" }}
        />

        {showToolbar && editor.isEditable && (
          <>
            <div
              className="resize-handle left"
              onMouseDown={(e) => handleResizeStart(e, "left")}
            />
            <div
              className="resize-handle right"
              onMouseDown={(e) => handleResizeStart(e, "right")}
            />
          </>
        )}

        {editor.isEditable ? (
          <Input
            type="text"
            placeholder="Add a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-2 border-none bg-transparent text-center text-sm text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        ) : (
          caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )
        )}
      </figure>
    </NodeViewWrapper>
  );
}
