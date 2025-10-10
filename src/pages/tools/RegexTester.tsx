import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Search, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const result = testString.match(regex);
      setMatches(result);
    } catch (error) {
      setMatches(null);
    }
  };

  const clearAll = () => {
    setPattern("");
    setFlags("g");
    setTestString("");
    setMatches(null);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setPattern("\\b\\w+@\\w+\\.\\w+\\b");
    setFlags("g");
    setTestString(
      "Contact us at john@example.com or support@company.org for assistance."
    );
    setMatches(null);
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
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Regex Tester</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Regex Tester</CardTitle>
                <CardDescription>Test and debug regex patterns</CardDescription>
              </div>
              <FavoriteButton toolId="regex-tester" toolName="Regex Tester" />
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
                Regex Pattern
              </label>
              <Input
                value={pattern}
                onChange={(e) => {
                  setPattern(e.target.value);
                  testRegex();
                }}
                placeholder="\d+"
                className="font-mono"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Flags</label>
              <Input
                value={flags}
                onChange={(e) => {
                  setFlags(e.target.value);
                  testRegex();
                }}
                placeholder="g, i, m"
                className="font-mono"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Test String
              </label>
              <Textarea
                value={testString}
                onChange={(e) => {
                  setTestString(e.target.value);
                  testRegex();
                }}
                placeholder="Enter text to test"
                className="min-h-[150px]"
              />
            </div>

            {matches && matches.length > 0 && (
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Matches ({matches.length})
                </label>
                <div className="space-y-2">
                  {matches.map((match, index) => (
                    <Badge key={index} variant="blue">
                      {match}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {pattern && testString && (!matches || matches.length === 0) && (
              <p className="text-sm text-muted-foreground">No matches found</p>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="Regex Tester"
          description="Regular expressions (regex) are powerful patterns used to match and manipulate text. This tool helps you test and debug regular expressions in real-time, making it easier to create, validate, and understand regex patterns for text processing, validation, and search operations."
          features={[
            "Test regular expressions against sample text",
            "Real-time pattern matching and highlighting",
            "Support for common regex flags (g, i, m, s)",
            "Visual highlighting of matched text",
            "Clear all fields with a single button",
            "Load example patterns for learning",
          ]}
          useCases={[
            "Text validation",
            "Data extraction",
            "Search and replace operations",
            "Form input validation",
            "Log file parsing",
            "Data cleaning",
            "Programming and scripting",
            "Text processing automation",
          ]}
          tips={[
            "Use ^ for start of string and $ for end of string",
            "\\d matches digits, \\w matches word characters",
            "Use parentheses () for grouping and capturing",
            "Test with various inputs to ensure your pattern works correctly",
          ]}
        />
      </div>
    </div>
  );
};

export default RegexTester;
