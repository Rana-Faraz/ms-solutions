"use client";

import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, ImageIcon } from "lucide-react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function UploadImageNode({ editor, node, getPos }: NodeViewProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { useUploadThing } = generateReactHelpers<OurFileRouter>();

  const { startUpload, isUploading: isUploadingUT } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res[0]) {
          // Get the exact position of this node
          const position =
            typeof getPos === "function"
              ? getPos()
              : editor.view.state.selection.from;

          // Create a transaction to replace this node with an image
          const tr = editor.view.state.tr;

          // Delete this node
          if (typeof getPos === "function") {
            tr.delete(position, position + node.nodeSize);
          }

          // Insert the image at the same position
          tr.insert(
            position,
            editor.schema.nodes.image.create({
              src: res[0].ufsUrl,
              caption: "",
              alignment: "center",
            }),
          );

          // Apply the transaction
          editor.view.dispatch(tr);
        }
        setIsUploading(false);
      },
      onUploadError: (error) => {
        console.error("Upload error:", error);
        setIsUploading(false);
      },
    },
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      startUpload([file]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setIsUploading(true);
      startUpload([file]);
    }
  };

  return (
    <NodeViewWrapper>
      <div
        className={`image-upload-placeholder my-4 ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        contentEditable={false}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Add an image to your content</p>
            <p className="text-xs text-muted-foreground">
              Drag and drop an image, or click to browse
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isUploading || isUploadingUT}
            onClick={() =>
              document.getElementById("inline-image-upload")?.click()
            }
          >
            {isUploading || isUploadingUT ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload an image
              </>
            )}
          </Button>
          <input
            id="inline-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading || isUploadingUT}
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}
