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
import { FileCode, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";
import { toast } from "sonner";

const HtmlToText = () => {
  const [html, setHtml] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const convert = () => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const plainText = div.textContent || div.innerText || "";
    setText(plainText);
    toast.success("Converted successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const clearAll = () => {
    setHtml("");
    setText("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setHtml(`<div>
  <h1>Welcome to Our Website</h1>
  <p>This is a <strong>sample HTML</strong> with <em>various tags</em>.</p>
  <ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ul>
  <a href="https://example.com">Visit our site</a>
</div>`);
    setText("");
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
          <div className="flex items-center gap-2"></div>
          <h1 className="text-xl font-semibold">HTML to Text</h1>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Convert HTML to Plain Text</CardTitle>
                <CardDescription>
                  Convert HTML markup to plain text
                </CardDescription>
              </div>
              <FavoriteButton toolId="html-to-text" toolName="HTML to Text" />
            </div>
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
              <label className="mb-2 block text-sm font-medium">
                HTML Input
              </label>
              <Textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                rows={8}
                placeholder="<p>Hello World</p>"
              />
            </div>
            <Button onClick={convert} className="w-full">
              Convert to Text
            </Button>
            {text && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">
                    Plain Text Output
                  </label>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    Copy
                  </Button>
                </div>
                <Textarea value={text} readOnly rows={8} />
              </div>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="HTML to Text Converter"
          description="HTML to text conversion is essential for extracting readable content from web pages, emails, and HTML documents. This tool strips away all HTML tags and formatting, leaving you with clean, plain text that's perfect for reading, processing, or further analysis."
          features={[
            "Convert HTML markup to plain text",
            "Remove all HTML tags and attributes",
            "Preserve text content and structure",
            "Handle complex HTML documents",
            "Clear all fields with a single button",
            "Load example HTML for testing",
          ]}
          useCases={[
            "Email content extraction",
            "Web scraping",
            "Content analysis",
            "Text processing",
            "Document conversion",
            "Data cleaning",
            "SEO analysis",
            "Content migration",
          ]}
          tips={[
            "Useful for extracting text from web pages",
            "Perfect for cleaning HTML content for analysis",
            "Helps with email content processing",
            "Great for preparing content for text analysis tools",
          ]}
        />
      </div>
    </div>
  );
};

export default HtmlToText;
