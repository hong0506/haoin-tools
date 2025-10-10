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

      const count = (inputText.match(new RegExp(findText, caseSensitive ? "g" : "gi"))?.length || 0);
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

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Text Replacer</h1>
          <div className="ml-auto">
            <FavoriteButton
              toolId="text-replacer"
              toolName="Text Replacer"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Find and Replace Text</CardTitle>
            <CardDescription>
              Find and replace text with support for regular expressions
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
                  onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
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
                <Label>Result</Label>
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
                <div className="font-semibold text-blue-900">Batch Editing</div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="font-semibold text-purple-900">Code Refactoring</div>
              </div>
            </div>
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
                  <strong>Regex:</strong> Use \d for digits, \w for word characters
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Global:</strong> All occurrences are replaced automatically
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextReplacer;
