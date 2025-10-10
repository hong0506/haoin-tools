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
import { ArrowDownAZ, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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

        <ToolDescription
          title="Text Sorter"
          description="Text sorting is a common task when organizing lists, data, or any text content. This tool helps you sort lines of text alphabetically in ascending or descending order, making it easy to organize and structure your content for better readability and management."
          features={[
            "Sort text lines alphabetically",
            "Choose between ascending (A-Z) or descending (Z-A) order",
            "Handle multiple lines of text",
            "Preserve original formatting and spacing",
            "Clear all fields with a single button",
            "Load example text for testing",
          ]}
          useCases={[
            "List organization",
            "Data sorting",
            "Name lists",
            "Inventory management",
            "Contact lists",
            "Product catalogs",
            "Academic references",
            "Content organization",
          ]}
          tips={[
            "Each line is treated as a separate item for sorting",
            "Use ascending order for alphabetical lists",
            "Use descending order for reverse alphabetical order",
            "Perfect for organizing contact lists and directories",
          ]}
        />
      </div>
    </div>
  );
};

export default TextSorter;
