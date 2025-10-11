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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Replace,
  Zap,
  Info,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const TextReplacer = () => {
  const [inputText, setInputText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [resultText, setResultText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const navigate = useNavigate();

  const handleReplace = () => {
    if (!inputText) {
      toast.error("Please enter some text");
      return;
    }
    if (!findText) {
      toast.error("Please enter text to find");
      return;
    }

    try {
      let result = inputText;
      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(findText, flags);
        result = inputText.replace(regex, replaceText);
      } else {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(
          findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          flags
        );
        result = inputText.replace(regex, replaceText);
      }

      const count =
        inputText.match(new RegExp(findText, caseSensitive ? "g" : "gi"))
          ?.length || 0;
      setResultText(result);
      toast.success(`Replaced ${count} occurrence(s)`);
    } catch (error) {
      toast.error("Invalid regex pattern");
    }
  };

  const clearAll = () => {
    setInputText("");
    setFindText("");
    setReplaceText("");
    setResultText("");
    setCaseSensitive(false);
    setUseRegex(false);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setInputText("Hello World! Welcome to the World of programming.");
    setFindText("World");
    setReplaceText("Universe");
    toast.success("Example loaded");
  };

  const copyToClipboard = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      toast.success("Copied to clipboard!");
    }
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
          <h1 className="text-xl font-semibold">Text Replacer</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Find and Replace Text</CardTitle>
                <CardDescription>
                  Find and replace text with support for regular expressions
                </CardDescription>
              </div>
              <FavoriteButton toolId="text-replacer" toolName="Text Replacer" />
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
              <Label>Input Text</Label>
              <Textarea
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Find</Label>
                <Input
                  placeholder="Text to find"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Replace With</Label>
                <Input
                  placeholder="Replacement text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case-sensitive"
                  checked={caseSensitive}
                  onCheckedChange={(checked) =>
                    setCaseSensitive(checked as boolean)
                  }
                />
                <label
                  htmlFor="case-sensitive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Case Sensitive
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="use-regex"
                  checked={useRegex}
                  onCheckedChange={(checked) => setUseRegex(checked as boolean)}
                />
                <label
                  htmlFor="use-regex"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use Regular Expression
                </label>
              </div>
            </div>

            <Button onClick={handleReplace} className="w-full">
              <Replace className="h-4 w-4 mr-2" />
              Replace
            </Button>

            {resultText && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Result</Label>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={resultText}
                  readOnly
                  rows={6}
                  className="mt-2"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Text Replacer?</strong>{" "}
              This powerful tool allows you to find and replace text with
              support for regular expressions, case sensitivity, and batch
              processing. Perfect for developers, writers, and data processors
              who need quick text transformations! 🔍
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
                  <Replace className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Batch Editing
                  </div>
                  <p className="text-sm text-blue-700">
                    Replace multiple instances of text across large documents
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Code Refactoring
                  </div>
                  <p className="text-sm text-purple-700">
                    Rename variables, functions, or classes quickly
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Info className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Data Cleaning
                  </div>
                  <p className="text-sm text-green-700">
                    Clean and normalize data by replacing patterns
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Lightbulb className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">URL Updates</div>
                  <p className="text-sm text-pink-700">
                    Update links or paths across multiple files
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
                  <strong>Regex:</strong> Use \d for digits, \w for word
                  characters
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Global:</strong> All occurrences are replaced
                  automatically
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Case Match:</strong> Enable case sensitive for exact
                  matches
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Test First:</strong> Try on a small sample before bulk
                  replace
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
                onClick={() => navigate("/tools/regex-tester")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Regex Tester
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Test regular expressions
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
                  Change text case
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

export default TextReplacer;
