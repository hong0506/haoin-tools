import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  GitCompare,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Code2,
  Zap,
  Info,
  FileCheck,
  GitBranch,
  ScrollText,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const TextDiff = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const navigate = useNavigate();

  const getDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLines = Math.max(lines1.length, lines2.length);
    const diff = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";
      if (line1 !== line2) {
        diff.push({ line: i + 1, text1: line1, text2: line2 });
      }
    }

    return diff;
  };

  const differences = getDiff();

  const clearAll = () => {
    setText1("");
    setText2("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setText1(
      "Hello World!\nThis is the first version of the text.\nIt has some content here."
    );
    setText2(
      "Hello Universe!\nThis is the second version of the text.\nIt has some different content here.\nAnd an extra line."
    );
    toast.success("Example loaded");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Text Diff Checker</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Compare Text</CardTitle>
                <CardDescription>
                  Find differences between two texts
                </CardDescription>
              </div>
              <FavoriteButton toolId="text-diff" toolName="Text Diff" />
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Text 1</label>
                <Textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  rows={10}
                  placeholder="Enter first text..."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Text 2</label>
                <Textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  rows={10}
                  placeholder="Enter second text..."
                />
              </div>
            </div>
            {differences.length > 0 && (
              <div className="rounded-lg bg-secondary/50 p-4">
                <h3 className="font-semibold mb-2">
                  Differences Found: {differences.length}
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {differences.map((diff, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-orange-500 pl-3 py-2 bg-background"
                    >
                      <p className="text-xs text-muted-foreground">
                        Line {diff.line}
                      </p>
                      <p className="text-sm bg-red-500/10 p-1 rounded">
                        - {diff.text1}
                      </p>
                      <p className="text-sm bg-green-500/10 p-1 rounded">
                        + {diff.text2}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {differences.length === 0 && text1 && text2 && (
              <div className="text-center text-green-500 font-semibold">
                No differences found!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Text Diff?</strong> This
              tool compares two texts line by line and highlights the
              differences with color coding. Perfect for code review, document
              comparison, and tracking changes! 🔍
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Code Review
                  </div>
                  <p className="text-sm text-purple-700">
                    Compare code versions to track{" "}
                    <Badge variant="secondary" className="mx-1">
                      changes
                    </Badge>
                    and updates
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <GitBranch className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Version Control
                  </div>
                  <p className="text-sm text-blue-700">
                    Compare different versions of documents and files
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Content Editing
                  </div>
                  <p className="text-sm text-green-700">
                    Review edits and modifications in articles or documents
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <ScrollText className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Legal Review
                  </div>
                  <p className="text-sm text-pink-700">
                    Compare contract versions to identify clause changes
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
                  <strong>Color Coding:</strong> Red = removed, Green = added,
                  Orange = modified
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Line by Line:</strong> Each line is compared
                  separately for precision
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Config Files:</strong> Perfect for comparing .env,
                  .config files
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Copy-Paste:</strong> Works great with clipboard
                  content
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
                onClick={() => navigate("/tools/word-counter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Word Counter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Count words and characters
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-sorter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Text Sorter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Sort text lines alphabetically
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/case-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Case Converter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert text case formats
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextDiff;
