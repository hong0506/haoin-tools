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
import {
  Search,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Code2,
  Zap,
  Info,
  CheckCircle,
  FileSearch,
  Terminal,
} from "lucide-react";
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

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Regex Tester?</strong>{" "}
              This tool tests and debugs regular expressions in real-time. Perfect
              for text validation, data extraction, and pattern matching! 🔍
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
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Form Validation
                  </div>
                  <p className="text-sm text-purple-700">
                    Validate{" "}
                    <Badge variant="secondary" className="mx-1">
                      email
                    </Badge>
                    addresses, phone numbers, and user input
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileSearch className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Data Extraction
                  </div>
                  <p className="text-sm text-blue-700">
                    Extract specific patterns from text and log files
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Search & Replace
                  </div>
                  <p className="text-sm text-green-700">
                    Find and replace text patterns in code and documents
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Terminal className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Programming
                  </div>
                  <p className="text-sm text-pink-700">
                    Test regex patterns before using in code
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
                  <strong>Anchors:</strong> Use ^ for start and $ for end of string
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Shortcuts:</strong> \d (digits), \w (word chars), \s
                  (spaces)
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Groups:</strong> Use () for capturing and grouping
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Testing:</strong> Test with various inputs to ensure
                  accuracy
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

export default RegexTester;
