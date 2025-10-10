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
import { GitCompare, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
            <CardTitle>Compare Text</CardTitle>
            <CardDescription>
              Find differences between two texts
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

        <ToolDescription
          title="Text Diff Checker"
          description="Text comparison is essential for tracking changes, reviewing edits, and identifying differences between versions of documents, code, or any text content. This tool helps you compare two text inputs and highlights the differences, making it easy to see what has changed."
          features={[
            "Compare two text inputs line by line",
            "Highlight added, removed, and modified lines",
            "Visual color coding for easy identification",
            "Support for multi-line text comparison",
            "Clear all fields with a single button",
            "Load example texts for testing",
          ]}
          useCases={[
            "Code review",
            "Document version control",
            "Content editing",
            "Translation comparison",
            "Configuration file changes",
            "Data validation",
            "Academic writing",
            "Legal document review",
          ]}
          tips={[
            "Use this tool to track changes between document versions",
            "Perfect for reviewing edits and modifications",
            "Compare configuration files before and after changes",
            "Useful for identifying typos and inconsistencies",
          ]}
        />
      </div>
    </div>
  );
};

export default TextDiff;
