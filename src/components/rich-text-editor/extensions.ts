import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { common, createLowlight } from "lowlight";
import { ImageUploadExtension } from "./image-upload-extension";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageNode } from "./image-node";

const lowlight = createLowlight(common);

// Extend the default Image extension to support captions and resizing
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      caption: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-caption"),
        renderHTML: (attributes) => {
          if (!attributes.caption) {
            return {};
          }
          return {
            "data-caption": attributes.caption,
          };
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width,
          };
        },
      },
      alignment: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-alignment"),
        renderHTML: (attributes) => {
          if (!attributes.alignment) {
            return {};
          }
          return {
            "data-alignment": attributes.alignment,
          };
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
  parseHTML() {
    return [
      {
        tag: "figure.image-container",
        getAttrs: (element) => {
          const img = element.querySelector("img");
          const figcaption = element.querySelector("figcaption");

          if (!img) {
            return false;
          }

          const caption = figcaption ? figcaption.textContent : null;
          const className = element.getAttribute("class") || "";
          const alignmentMatch = className.match(/align-(left|center|right)/);
          const alignment = alignmentMatch ? alignmentMatch[1] : "center";

          return {
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt"),
            title: img.getAttribute("title"),
            width: img.getAttribute("width"),
            caption,
            alignment,
          };
        },
      },
      {
        tag: "img",
      },
    ];
  },
});

export const editorExtensions = (placeholder: string) => [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
    codeBlock: false, // We'll use CodeBlockLowlight instead
  }),
  Underline,
  TextStyle,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-primary underline underline-offset-2",
      rel: "noopener noreferrer",
      target: "_blank",
    },
  }),
  CustomImage.configure({
    allowBase64: false,
    HTMLAttributes: {
      class: "rounded-md max-w-full",
    },
  }),
  ImageUploadExtension,
  Placeholder.configure({
    placeholder,
    emptyEditorClass:
      "before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:pointer-events-none",
  }),
  Typography,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight.configure({
    multicolor: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class: "rounded-md bg-muted p-4 my-2",
    },
  }),
  Color,
  FontFamily,
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: "border-collapse table-auto w-full",
    },
  }),
  TableRow,
  TableCell.configure({
    HTMLAttributes: {
      class: "border p-2",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: "border p-2 bg-muted font-bold",
    },
  }),
];
