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
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Mail,
  Globe,
  Database,
  FileText,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
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

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is HTML to Text?</strong>{" "}
              This tool converts HTML markup to plain text by stripping tags. Perfect
              for web scraping, email extraction, and content analysis! 🌍
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
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Email Extraction
                  </div>
                  <p className="text-sm text-blue-700">
                    Extract{" "}
                    <Badge variant="secondary" className="mx-1">
                      text
                    </Badge>
                    from HTML emails for processing
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Web Scraping</div>
                  <p className="text-sm text-purple-700">
                    Extract content from web pages for analysis
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">Data Cleaning</div>
                  <p className="text-sm text-green-700">
                    Clean HTML content for data processing
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Content Analysis
                  </div>
                  <p className="text-sm text-pink-700">
                    Prepare text for analysis tools and processing
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
                  <strong>Clean Text:</strong> Removes all HTML tags and attributes
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Web Pages:</strong> Extract readable content from websites
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Email:</strong> Perfect for processing HTML email content
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Analysis:</strong> Prepare content for text analysis tools
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
                onClick={() => navigate("/tools/markdown-preview")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Markdown Preview
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Preview Markdown
                </div>
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
                <div className="text-sm text-gray-600 mt-1">Sort text lines</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HtmlToText;
