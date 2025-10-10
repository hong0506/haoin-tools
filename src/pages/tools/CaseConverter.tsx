import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const CaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [currentFormat, setCurrentFormat] = useState<string>("");
  const navigate = useNavigate();

  // Get the text to use for conversion (always use inputText as source)
  const getSourceText = () => inputText || convertedText;
  const displayText = convertedText || inputText;

  const convertCase = (type: string) => {
    const sourceText = inputText.trim() || convertedText.trim();
    if (!sourceText) {
      toast.error("Please enter some text first");
      return;
    }

    let result = "";
    switch (type) {
      case "upper":
        result = sourceText.toUpperCase();
        break;
      case "lower":
        result = sourceText.toLowerCase();
        break;
      case "title":
        result = sourceText
          .toLowerCase()
          .split(/\s+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "sentence":
        result =
          sourceText.charAt(0).toUpperCase() +
          sourceText.slice(1).toLowerCase();
        break;
      case "camel":
        result = sourceText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case "snake":
        result = sourceText
          .replace(/[_-]/g, " ") // Replace existing underscores and hyphens with spaces
          .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
          .replace(/\W+/g, " ") // Replace any other non-word characters with spaces
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0)
          .join("_")
          .toLowerCase();
        break;
      case "kebab":
        result = sourceText
          .replace(/[_-]/g, " ") // Replace existing underscores and hyphens with spaces
          .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
          .replace(/\W+/g, " ") // Replace any other non-word characters with spaces
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0)
          .join("-")
          .toLowerCase();
        break;
      default:
        result = sourceText;
    }
    setConvertedText(result);
    setCurrentFormat(type);
    toast.success("Text converted!");
  };

  const handleTextChange = (value: string) => {
    setInputText(value);
    // Reset converted text when user types
    if (convertedText) {
      setConvertedText("");
      setCurrentFormat("");
    }
  };

  const copyToClipboard = () => {
    const textToCopy = displayText;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Copied to clipboard!");
  };

  const clearText = () => {
    setInputText("");
    setConvertedText("");
    setCurrentFormat("");
    toast.success("Text cleared");
  };

  const loadExample = () => {
    setInputText("Hello World! This is a sample text for case conversion.");
    setConvertedText("");
    setCurrentFormat("");
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
          <h1 className="text-xl font-semibold">Case Converter</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Text Case Converter</CardTitle>
                <CardDescription>
                  Convert text between different cases: uppercase, lowercase,
                  title case, and more
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="case-converter"
                toolName="Text Case Converter"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearText} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>

            <Textarea
              placeholder="Enter your text here..."
              value={displayText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="min-h-[200px] font-mono"
            />

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => convertCase("upper")}
                variant={currentFormat === "upper" ? "default" : "secondary"}
              >
                UPPERCASE
              </Button>
              <Button
                onClick={() => convertCase("lower")}
                variant={currentFormat === "lower" ? "default" : "secondary"}
              >
                lowercase
              </Button>
              <Button
                onClick={() => convertCase("title")}
                variant={currentFormat === "title" ? "default" : "secondary"}
              >
                Title Case
              </Button>
              <Button
                onClick={() => convertCase("sentence")}
                variant={currentFormat === "sentence" ? "default" : "secondary"}
              >
                Sentence case
              </Button>
              <Button
                onClick={() => convertCase("camel")}
                variant={currentFormat === "camel" ? "default" : "secondary"}
              >
                camelCase
              </Button>
              <Button
                onClick={() => convertCase("snake")}
                variant={currentFormat === "snake" ? "default" : "secondary"}
              >
                snake_case
              </Button>
              <Button
                onClick={() => convertCase("kebab")}
                variant={currentFormat === "kebab" ? "default" : "secondary"}
              >
                kebab-case
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="ml-auto"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        <ToolDescription
          title="Text Case Converter"
          description="Text case conversion is essential for formatting text according to different writing standards and conventions. This tool provides multiple case conversion options to help you format text for various purposes, from academic writing to programming and content creation."
          features={[
            "Convert to UPPERCASE for emphasis or headers",
            "Convert to lowercase for consistent formatting",
            "Convert to Title Case for proper nouns and titles",
            "Convert to camelCase for programming variables",
            "Convert to PascalCase for class names and constants",
            "Convert to snake_case for database fields and file names",
            "Convert to kebab-case for URLs and CSS classes",
            "Copy converted text to clipboard with one click",
          ]}
          useCases={[
            "Programming",
            "Content writing",
            "Academic papers",
            "Database design",
            "URL formatting",
            "CSS class naming",
            "API documentation",
            "Code refactoring",
          ]}
          tips={[
            "Use Title Case for headings and proper nouns",
            "camelCase is standard for JavaScript variables",
            "snake_case is common in Python and databases",
            "kebab-case is preferred for URLs and CSS classes",
          ]}
        />
      </div>
    </div>
  );
};

export default CaseConverter;
