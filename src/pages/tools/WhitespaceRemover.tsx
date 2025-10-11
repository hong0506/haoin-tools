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
import { toast } from "sonner";
import {
  Space,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Code2,
  FileText,
  AlignLeft,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const WhitespaceRemover = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeLineBreaks, setRemoveLineBreaks] = useState(false);
  const [removeTabs, setRemoveTabs] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const navigate = useNavigate();

  const processText = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    let result = inputText;

    // Remove tabs
    if (removeTabs) {
      result = result.replace(/\t/g, " ");
    }

    // Remove extra spaces (multiple spaces to single space)
    if (removeExtraSpaces) {
      result = result.replace(/ +/g, " ");
    }

    // Trim each line
    if (trimLines) {
      result = result
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }

    // Remove line breaks
    if (removeLineBreaks) {
      result = result.replace(/\n+/g, " ");
    } else {
      // Remove empty lines
      result = result.replace(/\n\s*\n/g, "\n");
    }

    setOutputText(result.trim());
    toast.success("Whitespace removed!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setInputText(`This    text    has    extra    spaces.

    
And     some     empty     lines.

	It also	has	tabs.
  
  And spaces at the   beginning   and   end.  `);
    setOutputText("");
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
            <Space className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Whitespace Remover</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Remove Extra Whitespace</CardTitle>
                <CardDescription>
                  Clean up spaces, tabs, and line breaks from text
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="whitespace-remover"
                toolName="Whitespace Remover"
              />
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
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text with extra spaces, tabs, or line breaks..."
                className="min-h-[200px] font-mono text-sm"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Characters: {inputText.length}
              </div>
            </div>

            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-sm font-medium mb-2">Options:</div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extra-spaces"
                  checked={removeExtraSpaces}
                  onCheckedChange={(checked) =>
                    setRemoveExtraSpaces(checked as boolean)
                  }
                />
                <label
                  htmlFor="extra-spaces"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remove extra spaces (multiple spaces → single space)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tabs"
                  checked={removeTabs}
                  onCheckedChange={(checked) =>
                    setRemoveTabs(checked as boolean)
                  }
                />
                <label
                  htmlFor="tabs"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remove tabs (convert to spaces)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="trim-lines"
                  checked={trimLines}
                  onCheckedChange={(checked) =>
                    setTrimLines(checked as boolean)
                  }
                />
                <label
                  htmlFor="trim-lines"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Trim spaces from beginning/end of each line
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="line-breaks"
                  checked={removeLineBreaks}
                  onCheckedChange={(checked) =>
                    setRemoveLineBreaks(checked as boolean)
                  }
                />
                <label
                  htmlFor="line-breaks"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remove all line breaks (make single line)
                </label>
              </div>
            </div>

            <Button onClick={processText} className="w-full">
              <Space className="h-4 w-4 mr-2" />
              Remove Whitespace
            </Button>

            {outputText && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">Output</label>
                  <Button onClick={copyToClipboard} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[200px] font-mono text-sm bg-green-50 dark:bg-green-950/20"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Characters: {outputText.length} (Reduced by{" "}
                  {(
                    ((inputText.length - outputText.length) /
                      inputText.length) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Whitespace Remover?
              </strong>{" "}
              This tool removes extra spaces, tabs, and line breaks from text.
              Perfect for cleaning up copied text, code formatting, or data
              preparation! 🧹
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
                    Code Cleanup
                  </div>
                  <p className="text-sm text-purple-700">
                    Remove{" "}
                    <Badge variant="secondary" className="mx-1">
                      extra spaces
                    </Badge>{" "}
                    from code snippets
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Text Processing
                  </div>
                  <p className="text-sm text-blue-700">
                    Clean up copied text from PDFs or websites
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <AlignLeft className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Data Preparation
                  </div>
                  <p className="text-sm text-green-700">
                    Format data for CSV or database import
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Space className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Content Writing
                  </div>
                  <p className="text-sm text-pink-700">
                    Remove formatting issues from documents
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
                  <strong>Options:</strong> Customize what to remove with
                  checkboxes
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Line Breaks:</strong> Keep for multi-line, remove for
                  single line
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Trim Lines:</strong> Removes leading/trailing spaces
                  per line
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Preview:</strong> See reduction percentage after
                  processing
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
              <button
                onClick={() => navigate("/tools/duplicate-remover")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Duplicate Remover
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Remove duplicate lines
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-replacer")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Text Replacer
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Find and replace text
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhitespaceRemover;
