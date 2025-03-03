import { renderContentToHtml } from "@/lib/server-content-renderer";
import { JSONContent } from "@tiptap/react";
import { cn } from "@/lib/utils";

interface ServerRichTextProps {
  content: JSONContent;
  className?: string;
}

export function ServerRichText({ content, className }: ServerRichTextProps) {
  const classes = cn(
    // Base typography styles
    "prose prose-stone dark:prose-invert max-w-none",

    // Heading styles
    "prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",

    // Paragraph and text styles
    "prose-p:my-4",

    // List styles
    "prose-ul:list-disc prose-ol:list-decimal prose-li:my-1",

    // Blockquote styles
    "prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground",

    // Code styles
    "prose-code:bg-muted prose-code:p-1 prose-code:rounded prose-code:text-sm prose-code:font-mono",
    "prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-md",

    // Image styles
    "prose-img:rounded-md prose-img:my-8",

    // Link styles
    "prose-a:text-primary prose-a:underline prose-a:underline-offset-2",

    // Table styles
    "prose-table:border-collapse prose-table:w-full",
    "prose-th:bg-muted prose-th:p-2 prose-th:border prose-th:border-border",
    "prose-td:p-2 prose-td:border prose-td:border-border",

    // Custom image container styles
    "[&_.image-container]:relative [&_.image-container]:my-8 [&_.image-container]:flex [&_.image-container]:flex-col",
    "[&_.image-container.align-left]:ml-0 [&_.image-container.align-left]:mr-auto",
    "[&_.image-container.align-center]:mx-auto",
    "[&_.image-container.align-right]:ml-auto [&_.image-container.align-right]:mr-0",
    "[&_.image-container_img]:h-auto [&_.image-container_img]:max-w-full [&_.image-container_img]:rounded-md",
    "[&_.image-container_figcaption]:mt-2 [&_.image-container_figcaption]:text-center [&_.image-container_figcaption]:text-sm [&_.image-container_figcaption]:text-muted-foreground",

    // Text alignment classes
    "[&_.text-center]:text-center [&_.text-justify]:text-justify [&_.text-left]:text-left [&_.text-right]:text-right",

    // Additional custom classes
    className,
  );
  // Convert the JSON content to HTML
  const htmlContent = renderContentToHtml(content, classes);

  return (
    <div
      className={classes}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
