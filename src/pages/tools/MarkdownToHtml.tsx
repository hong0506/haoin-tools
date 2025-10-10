import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  FileCode,
  Copy,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const MarkdownToHtml = () => {
  const [markdownInput, setMarkdownInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const navigate = useNavigate();

  const convertToHtml = () => {
    if (!markdownInput.trim()) {
      toast.error("Please enter Markdown");
      return;
    }

    let html = markdownInput
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.+?)__/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/_(.+?)_/g, "<em>$1</em>")
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
      // Code inline
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Lists
      .replace(/^\* (.+)/gim, "<li>$1</li>")
      .replace(/^- (.+)/gim, "<li>$1</li>")
      // Line breaks
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");

    // Wrap paragraphs
    html = "<p>" + html + "</p>";

    // Fix lists
    html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

    setHtmlOutput(html);
    toast.success("Converted to HTML successfully!");
  };

  const copyToClipboard = () => {
    if (htmlOutput) {
      navigator.clipboard.writeText(htmlOutput);
      toast.success("Copied to clipboard!");
    }
  };

  const clearAll = () => {
    setMarkdownInput("");
    setHtmlOutput("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    const exampleMd = `# Hello World

This is **bold** and this is *italic*.

## Features
- Easy to use
- Fast conversion
- Clean output

[Visit Website](https://example.com)`;
    setMarkdownInput(exampleMd);
    toast.success("Example loaded");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Markdown to HTML</h1>
          <div className="ml-auto">
            <FavoriteButton
              toolId="markdown-to-html"
              toolName="Markdown to HTML"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Convert Markdown to HTML</CardTitle>
            <CardDescription>
              Convert Markdown syntax to HTML markup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Markdown Input</div>
              <Textarea
                placeholder="# Hello World"
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={convertToHtml} className="w-full">
              <FileCode className="h-4 w-4 mr-2" />
              Convert to HTML
            </Button>

            {htmlOutput && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">HTML Output</div>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={htmlOutput}
                  readOnly
                  rows={8}
                  className="font-mono text-sm"
                />
              </>
            )}
          </CardContent>
        </Card>

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
                  <strong>Headings:</strong> Use # for h1, ## for h2, etc.
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Links:</strong> [text](url) format
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarkdownToHtml;
