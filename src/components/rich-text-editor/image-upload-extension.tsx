"use client";

import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { UploadImageNode } from "./upload-image-node";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageUpload: {
      /**
       * Insert an image upload node
       */
      insertImageUpload: () => ReturnType;
    };
  }
}

export const ImageUploadExtension = Node.create({
  name: "imageUpload",

  group: "block",

  content: "",

  draggable: true,

  selectable: true,

  atom: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-upload"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "image-upload" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(UploadImageNode);
  },

  addCommands() {
    return {
      insertImageUpload:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },
});
