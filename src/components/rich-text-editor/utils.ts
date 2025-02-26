import { type JSONContent } from "@tiptap/react";

/**
 * Converts HTML string to Tiptap JSON content
 * This is a simple implementation and might need adjustments for complex HTML
 */
export function htmlToContent(html: string): JSONContent {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: html,
          },
        ],
      },
    ],
  };
}

/**
 * Extracts plain text from Tiptap JSON content
 * Handles different node types and maintains proper spacing
 */
export function extractTextFromContent(content: JSONContent): string {
  let text = "";
  let lastNodeType: string | undefined;

  // Helper function to recursively extract text
  function traverse(node: JSONContent) {
    // Add spacing between block-level elements
    if (lastNodeType && isBlockNode(node.type) && isBlockNode(lastNodeType)) {
      text += "\n\n";
    }

    // Handle different node types
    if (node.type === "hardBreak") {
      text += "\n";
    } else if (node.text) {
      text += node.text;
    }

    // Special handling for certain node types
    if (node.type === "heading") {
      text += "\n";
    }

    if (node.content) {
      lastNodeType = node.type;
      node.content.forEach(traverse);
    }
  }

  traverse(content);
  return text.trim().replace(/\n{3,}/g, "\n\n"); // Normalize multiple line breaks
}

// Helper function to identify block-level nodes
function isBlockNode(type: string | undefined): boolean {
  return [
    "paragraph",
    "heading",
    "blockquote",
    "codeBlock",
    "bulletList",
    "orderedList",
    "listItem",
  ].includes(type || "");
}

/**
 * Calculates the estimated reading time for content
 * @param content The JSON content from the editor
 * @param wordsPerMinute Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(
  content: JSONContent,
  wordsPerMinute = 200,
): number {
  const text = extractTextFromContent(content);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Generates a URL-friendly slug from the title text
 * Handles special characters, diacritics, and edge cases
 * @param title The title text
 * @returns A URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .normalize("NFD") // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Checks if the content is empty
 * More thorough check for various types of empty content
 */
export function isContentEmpty(content: JSONContent): boolean {
  if (!content || !content.content || content.content.length === 0) {
    return true;
  }

  // Check if there's only empty paragraphs or whitespace
  const text = extractTextFromContent(content).trim();
  if (!text) {
    return true;
  }

  // Check if there's only a single empty paragraph
  if (
    content.content.length === 1 &&
    content.content[0].type === "paragraph" &&
    (!content.content[0].content ||
      content.content[0].content.length === 0 ||
      (content.content[0].content.length === 1 &&
        content.content[0].content[0].text?.trim() === ""))
  ) {
    return true;
  }

  return false;
}
