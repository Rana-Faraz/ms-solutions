import { JSONContent } from "@tiptap/react";

/**
 * Server-side utility to convert Tiptap JSON content to HTML
 */
export function renderContentToHtml(
  content: JSONContent,
  className?: string,
): string {
  if (!content || !content.content) {
    return "";
  }

  return renderNodes(content.content, className);
}

function renderNodes(nodes: JSONContent[] = [], className?: string): string {
  if (!nodes || !nodes.length) return "";

  return nodes.map((node) => renderNode(node, className)).join("");
}

function renderNode(node: JSONContent, className?: string): string {
  if (!node || !node.type) return "";

  switch (node.type) {
    case "doc":
      return renderNodes(node.content, className);

    case "paragraph":
      let paragraphClass = "";
      if (node.attrs?.textAlign) {
        paragraphClass = `text-${node.attrs.textAlign}`;
      }
      return `<p class="${paragraphClass}">${renderNodes(node.content, className)}</p>`;

    case "text":
      let text = node.text || "";

      // Apply marks if they exist
      if (node.marks && node.marks.length > 0) {
        for (const mark of node.marks) {
          switch (mark.type) {
            case "bold":
              text = `<strong>${text}</strong>`;
              break;
            case "italic":
              text = `<em>${text}</em>`;
              break;
            case "underline":
              text = `<u>${text}</u>`;
              break;
            case "strike":
              text = `<s>${text}</s>`;
              break;
            case "code":
              text = `<code>${text}</code>`;
              break;
            case "link":
              const href = mark.attrs?.href || "#";
              text = `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
              break;
            case "highlight":
              const color = mark.attrs?.color || "yellow";
              text = `<mark style="background-color: ${color};">${text}</mark>`;
              break;
            case "textStyle":
              if (mark.attrs?.color) {
                text = `<span style="color: ${mark.attrs.color};">${text}</span>`;
              }
              break;
            case "fontFamily":
              if (mark.attrs?.fontFamily) {
                text = `<span style="font-family: ${mark.attrs.fontFamily};">${text}</span>`;
              }
              break;
          }
        }
      }

      return text;

    case "heading":
      const level = node.attrs?.level || 1;
      let headingClass = "";
      if (node.attrs?.textAlign) {
        headingClass = `text-${node.attrs.textAlign}`;
      }
      return `<h${level} class="${headingClass}">${renderNodes(node.content, className)}</h${level}>`;

    case "bulletList":
      return `<ul>${renderNodes(node.content, className)}</ul>`;

    case "orderedList":
      return `<ol>${renderNodes(node.content, className)}</ol>`;

    case "listItem":
      return `<li>${renderNodes(node.content, className)}</li>`;

    case "blockquote":
      return `<blockquote>${renderNodes(node.content, className)}</blockquote>`;

    case "codeBlock":
      const language = node.attrs?.language || "";
      return `<pre><code class="language-${language}">${renderNodes(node.content, className)}</code></pre>`;

    case "image":
      const attrs = node.attrs || {};
      const src = attrs.src || "";
      const alt = attrs.alt || "";
      const title = attrs.title || "";
      const caption = attrs.caption || "";
      const width = attrs.width || null;
      const alignment = attrs.alignment || "center";

      let imgStyle = "";
      if (width) {
        imgStyle = `width: ${width};`;
      }

      let figureClass = `image-container align-${alignment}`;

      let html = `<figure class="${figureClass}">`;
      html += `<img src="${src}" alt="${alt}" title="${title}" style="${imgStyle}" />`;

      if (caption) {
        html += `<figcaption>${caption}</figcaption>`;
      }

      html += "</figure>";
      return html;

    case "hardBreak":
      return "<br>";

    case "horizontalRule":
      return "<hr>";

    case "table":
      return `<table>${renderNodes(node.content, className)}</table>`;

    case "tableRow":
      return `<tr>${renderNodes(node.content, className)}</tr>`;

    case "tableCell":
      return `<td>${renderNodes(node.content, className)}</td>`;

    case "tableHeader":
      return `<th>${renderNodes(node.content, className)}</th>`;

    default:
      // For unknown node types, try to render their content if available
      return node.content ? renderNodes(node.content, className) : "";
  }
}
