# Rich Text Editor Component

A feature-rich text editor built with Tiptap and shadcn components, optimized for blog writing and content creation.

## Features

- **Comprehensive Formatting Options**: Bold, italic, underline, strikethrough, headings, lists, and more
- **Advanced Capabilities**: Links, images, tables, code blocks, and syntax highlighting
- **Typography Controls**: Text alignment, font family, text color, and highlighting
- **Bubble Menu**: Context-sensitive formatting options that appear when text is selected
- **Image Handling**: Upload images or embed them via URL
- **Keyboard Shortcuts**: Support for common keyboard shortcuts for faster editing
- **Responsive Design**: Works well on different screen sizes
- **Utility Functions**: Extract text, calculate reading time, generate slugs, etc.

## Installation

The component uses the following dependencies:

```bash
pnpm add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @tiptap/extension-placeholder @tiptap/extension-typography @tiptap/extension-underline @tiptap/extension-text-align @tiptap/extension-highlight @tiptap/extension-code-block-lowlight @tiptap/extension-color @tiptap/extension-font-family @tiptap/extension-heading @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header lowlight react-colorful
```

## Usage

```tsx
import { useState } from "react";
import {
  RichTextEditor,
  type JSONContent,
} from "@/components/rich-text-editor";

export default function BlogEditor() {
  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "Start writing your blog post..." }],
      },
    ],
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-bold">Create New Blog Post</h1>
      <RichTextEditor
        content={content}
        onChange={setContent}
        placeholder="Write something amazing..."
      />
      <div className="mt-4">
        <button
          className="bg-primary rounded px-4 py-2 text-white"
          onClick={() => console.log(content)}
        >
          Save Post
        </button>
      </div>
    </div>
  );
}
```

## Component API

### RichTextEditor

The main component that renders the editor.

#### Props

| Prop          | Type                             | Default                        | Description                               |
| ------------- | -------------------------------- | ------------------------------ | ----------------------------------------- |
| `content`     | `JSONContent \| string`          | `""`                           | The initial content of the editor         |
| `onChange`    | `(content: JSONContent) => void` | -                              | Callback function when content changes    |
| `onBlur`      | `() => void`                     | -                              | Callback function when editor loses focus |
| `placeholder` | `string`                         | `"Write something amazing..."` | Placeholder text when editor is empty     |
| `editable`    | `boolean`                        | `true`                         | Whether the editor is editable            |
| `className`   | `string`                         | -                              | Additional CSS classes                    |
| `autofocus`   | `boolean`                        | `false`                        | Whether to focus the editor on mount      |

## Utility Functions

The component exports several utility functions:

- `htmlToContent`: Converts HTML string to Tiptap JSON content
- `extractTextFromContent`: Extracts plain text from Tiptap JSON content
- `calculateReadingTime`: Calculates the estimated reading time for content
- `generateSlug`: Generates a URL-friendly slug from a title
- `isContentEmpty`: Checks if the editor content is empty

## Performance Considerations

- The editor uses client-side rendering with proper mounting checks
- Content updates are optimized to prevent cursor jumping
- Heavy operations like color picking are debounced
- The editor avoids unnecessary re-renders

## Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation is fully supported
- Color contrast meets WCAG standards
- Focus states are clearly visible
