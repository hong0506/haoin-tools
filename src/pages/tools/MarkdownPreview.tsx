import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileCode,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Copy,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState(
    "# Hello Markdown\n\nStart typing to see the preview..."
  );
  const navigate = useNavigate();

  const renderMarkdown = (text: string) => {
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Strikethrough
      .replace(/~~(.*?)~~/gim, "<del>$1</del>")
      // Links
      .replace(
        /\[(.*?)\]\((.*?)\)/gim,
        "<a href='$2' target='_blank' rel='noopener noreferrer'>$1</a>"
      )
      // Inline code
      .replace(/`(.*?)`/gim, "<code>$1</code>")
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
      // Blockquotes
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      // Unordered lists
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      // Line breaks
      .replace(/\n/gim, "<br />");

    // Wrap list items in ul/ol tags
    html = html.replace(/(<li>.*<\/li>)/gims, (match) => {
      const listItems = match.match(/<li>.*?<\/li>/gims);
      if (listItems) {
        return `<ul>${listItems.join("")}</ul>`;
      }
      return match;
    });

    return html;
  };

  const clearText = () => {
    setMarkdown("");
    toast.success("Text cleared");
  };

  const loadExample = () => {
    const exampleMarkdown = `# Markdown Example

This is a **bold text** and this is *italic text*.

## Features

- Real-time preview
- Syntax highlighting
- Export functionality
- ~~Old feature~~ (strikethrough)

### Code Example

Here's some \`inline code\` and a code block:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Links and References

Check out [GitHub](https://github.com) for more examples.

> This is a blockquote with important information.

### Ordered List

1. First item
2. Second item
3. Third item`;

    setMarkdown(exampleMarkdown);
    toast.success("Example loaded");
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard");
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.md";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Markdown file downloaded");
  };

  const downloadHtml = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ul, ol { padding-left: 20px; }
    </style>
</head>
<body>
    ${renderMarkdown(markdown)}
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.html";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Markdown Preview</h1>
            <div className="ml-auto">
              <FavoriteButton
                toolId="markdown-preview"
                toolName="Markdown Preview"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-6 py-8">
        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <Button onClick={clearText} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button onClick={loadExample} variant="ghost" size="sm">
            <Lightbulb className="h-4 w-4 mr-1" />
            Load Example
          </Button>
          <Button onClick={copyMarkdown} variant="ghost" size="sm">
            <Copy className="h-4 w-4 mr-1" />
            Copy Markdown
          </Button>
          <Button onClick={downloadMarkdown} variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download .md
          </Button>
          <Button onClick={downloadHtml} variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download .html
          </Button>
        </div>

        {/* Word Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Words:{" "}
          {
            markdown
              .trim()
              .split(/\s+/)
              .filter((word) => word.length > 0).length
          }{" "}
          | Characters: {markdown.length} | Lines: {markdown.split("\n").length}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Editor</CardTitle>
              <CardDescription>Write your markdown here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[500px] font-mono"
                placeholder="# Start writing your Markdown here..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Live markdown preview</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-slate dark:prose-invert min-h-[500px] max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
              />
            </CardContent>
          </Card>
        </div>

        <ToolDescription
          title="Markdown Preview"
          description="Markdown is a lightweight markup language that allows you to format text using simple syntax. This tool provides a real-time preview of your Markdown text, making it easy to write and format documents, README files, blog posts, and other content without needing to know HTML."
          features={[
            "Real-time Markdown preview as you type",
            "Support for headers, bold, italic, strikethrough, and links",
            "Code blocks and inline code syntax highlighting",
            "Lists (ordered and unordered) and blockquotes",
            "Side-by-side editor and preview layout",
            "Word, character, and line count statistics",
            "Export to Markdown (.md) and HTML (.html) files",
            "Copy Markdown to clipboard functionality",
            "Load example content to get started quickly",
            "Perfect for documentation and content creation",
          ]}
          useCases={[
            "README files",
            "Blog posts",
            "Documentation",
            "GitHub repositories",
            "Technical writing",
            "Content management",
            "Email formatting",
            "Note taking",
          ]}
          tips={[
            "Use # for headers (one # for H1, two ## for H2, etc.)",
            "Wrap text in ** for bold and * for italic",
            "Use ~~text~~ for strikethrough and `code` for inline code",
            "Create links with [text](url) syntax",
            "Use ``` for code blocks and > for blockquotes",
            "Use * or - for unordered lists and 1. for ordered lists",
            "Export your work as .md or .html files for sharing",
            "Markdown is widely supported on GitHub, GitLab, and many platforms",
          ]}
        />
      </div>
    </div>
  );
};

export default MarkdownPreview;
