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
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Zap, Info, FileText, Code2, BookOpen, Github } from "lucide-react";

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
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Markdown Preview</CardTitle>
                <CardDescription>
                  Write and preview Markdown in real-time
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="markdown-preview"
                toolName="Markdown Preview"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Action Buttons */}
            <div className="flex gap-2">
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
            <div className="text-sm text-muted-foreground">
              Words:{" "}
              {
                markdown
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length
              }{" "}
              | Characters: {markdown.length} | Lines:{" "}
              {markdown.split("\n").length}
            </div>

            {/* Responsive layout: vertical on mobile, horizontal on desktop */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Editor</CardTitle>
                  <CardDescription>Write your markdown here</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="min-h-[400px] md:min-h-[500px] font-mono resize-none"
                    placeholder="# Start writing your Markdown here..."
                  />
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>Live markdown preview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="min-h-[400px] md:min-h-[500px] overflow-auto prose prose-slate dark:prose-invert max-w-none border rounded-md p-4 bg-muted/20"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(markdown),
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Markdown Preview?
              </strong>{" "}
              This tool provides real-time preview of Markdown text with
              formatting. Perfect for README files, documentation, and blog
              posts! 📝
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Common Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Github className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    README Files
                  </div>
                  <p className="text-sm text-blue-700">
                    Create{" "}
                    <Badge variant="secondary" className="mx-1">
                      GitHub
                    </Badge>
                    README and project documentation
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Blog Posts
                  </div>
                  <p className="text-sm text-purple-700">
                    Write and format blog content with Markdown syntax
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Documentation
                  </div>
                  <p className="text-sm text-green-700">
                    Create technical docs and user guides
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Code Docs</div>
                  <p className="text-sm text-pink-700">
                    Document code with syntax highlighting
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Info className="h-5 w-5 text-amber-600" />
              💡 Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Headers:</strong> Use # for H1, ## for H2, etc.
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Formatting:</strong> **bold**, *italic*,
                  ~~strikethrough~~
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Code:</strong> Use ``` for blocks, ` for inline code
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Links:</strong> Create with [text](url) syntax
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🔗 Related Tools You Might Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/html-to-text")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  HTML to Text
                </div>
                <div className="text-sm text-gray-600 mt-1">Convert HTML</div>
              </button>
              <button
                onClick={() => navigate("/tools/word-counter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Word Counter
                </div>
                <div className="text-sm text-gray-600 mt-1">Count words</div>
              </button>
              <button
                onClick={() => navigate("/tools/text-sorter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Text Sorter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Sort text lines
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarkdownPreview;
