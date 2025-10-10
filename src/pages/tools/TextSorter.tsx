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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ArrowDownAZ,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  ListOrdered,
  Zap,
  Info,
  FileSpreadsheet,
  Database,
  Users,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const TextSorter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const sortText = () => {
    const lines = input.split("\n").filter((line) => line.trim() !== "");
    const sorted =
      sortOrder === "asc"
        ? lines.sort((a, b) => a.localeCompare(b))
        : lines.sort((a, b) => b.localeCompare(a));
    setOutput(sorted.join("\n"));
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setSortOrder("asc");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setInput("Zebra\nApple\nBanana\nCherry\nDate");
    setOutput("");
    setSortOrder("asc");
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
            <ArrowDownAZ className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Text Sorter</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sort Text Lines</CardTitle>
                <CardDescription>Sort lines alphabetically</CardDescription>
              </div>
              <FavoriteButton toolId="text-sorter" toolName="Text Sorter" />
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
                Input Text
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={8}
                placeholder="Enter text (one line per item)..."
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">A → Z</SelectItem>
                  <SelectItem value="desc">Z → A</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={sortText} className="flex-1">
                Sort Lines
              </Button>
            </div>
            {output && (
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Sorted Output
                </label>
                <Textarea value={output} readOnly rows={8} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compact Stats */}
        {output && (
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-600">
                {output.split("\n").filter((line) => line.trim()).length}
              </span>
              <span>lines sorted</span>
            </div>
          </div>
        )}

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Text Sorter?</strong>{" "}
              This tool helps you sort lines of text alphabetically in ascending
              (A→Z) or descending (Z→A) order. Perfect for organizing lists,
              names, data, and any text content quickly! 📋
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
                  <ListOrdered className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    List Organization
                  </div>
                  <p className="text-sm text-blue-700">
                    Sort names, items, or any list alphabetically for easy
                    reference
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileSpreadsheet className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Data Preparation
                  </div>
                  <p className="text-sm text-purple-700">
                    Organize data before importing to{" "}
                    <Badge variant="secondary" className="mx-1">
                      spreadsheets
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Contact Lists
                  </div>
                  <p className="text-sm text-green-700">
                    Sort names, emails, or phone numbers alphabetically
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Inventory Management
                  </div>
                  <p className="text-sm text-pink-700">
                    Organize product names or SKU codes for catalogs
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
                  <strong>One per line:</strong> Each line is treated as a
                  separate item
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>A→Z:</strong> Use ascending order for standard
                  alphabetical sorting
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Z→A:</strong> Use descending order for reverse sorting
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Case-sensitive:</strong> Uppercase letters come before
                  lowercase
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
                onClick={() => navigate("/tools/text-diff")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Text Diff
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Compare two texts
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

export default TextSorter;
