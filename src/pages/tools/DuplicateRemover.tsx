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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  ListFilter,
  Zap,
  Info,
  Copy,
  FileText,
  Database,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const DuplicateRemover = () => {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [stats, setStats] = useState({ original: 0, removed: 0, final: 0 });
  const navigate = useNavigate();

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text");
      return;
    }

    const lines = inputText.split("\n");
    const originalCount = lines.length;
    
    let processedLines = lines;
    
    if (removeEmpty) {
      processedLines = processedLines.filter(line => line.trim() !== "");
    }
    
    const seen = new Set<string>();
    const uniqueLines = [];
    
    for (const line of processedLines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    }
    
    const finalCount = uniqueLines.length;
    const removedCount = originalCount - finalCount;
    
    setResultText(uniqueLines.join("\n"));
    setStats({
      original: originalCount,
      removed: removedCount,
      final: finalCount,
    });
    
    toast.success(\`Removed \${removedCount} duplicate/empty line(s)\`);
  };

  const copyResult = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      toast.success("Copied to clipboard!");
    }
  };

  const clearAll = () => {
    setInputText("");
    setResultText("");
    setStats({ original: 0, removed: 0, final: 0 });
    setRemoveEmpty(true);
    setCaseSensitive(false);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setInputText(\`Apple
Banana
apple
Cherry
Banana

Date
Apple
\`);
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
          <h1 className="text-xl font-semibold">Duplicate Line Remover</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Remove Duplicate Lines</CardTitle>
                <CardDescription>
                  Remove duplicate and empty lines from your text
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="duplicate-remover"
                toolName="Duplicate Line Remover"
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
              <Textarea
                placeholder="Enter your text (one item per line)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remove-empty"
                  checked={removeEmpty}
                  onCheckedChange={(checked) => setRemoveEmpty(checked as boolean)}
                />
                <label
                  htmlFor="remove-empty"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remove empty lines
                </label>
              </div>
              
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
                  Case sensitive comparison
                </label>
              </div>
            </div>

            <Button onClick={removeDuplicates} className="w-full">
              <ListFilter className="h-4 w-4 mr-2" />
              Remove Duplicates
            </Button>

            {resultText && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Result</div>
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <Textarea value={resultText} readOnly rows={8} />
                
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    Original: {stats.original} lines
                  </Badge>
                  <Badge variant="destructive">
                    Removed: {stats.removed}
                  </Badge>
                  <Badge variant="default">
                    Final: {stats.final} lines
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Duplicate Line Remover?
              </strong>{" "}
              This tool helps you clean up text by removing duplicate lines and empty lines. Perfect for cleaning lists, processing data, and organizing content! 🧹
            </p>
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
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Clean Lists</div>
                  <p className="text-sm text-blue-700">
                    Remove duplicates from email lists, contact lists, or any text lists
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Data Processing
                  </div>
                  <p className="text-sm text-purple-700">
                    Clean and deduplicate data before importing into databases
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Email Lists
                  </div>
                  <p className="text-sm text-green-700">
                    Ensure unique email addresses for mail campaigns
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <ListFilter className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Log Cleaning
                  </div>
                  <p className="text-sm text-pink-700">
                    Remove duplicate entries from log files
                  </p>
                </div>
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
                  <strong>Case Sensitive:</strong> "Apple" and "apple" treated differently
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Clean Lists:</strong> Perfect for cleaning up data
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Empty Lines:</strong> Option to keep or remove blank lines
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Stats Display:</strong> See how many lines were removed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  Sort lines alphabetically
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
              <button
                onClick={() => navigate("/tools/word-counter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Word Counter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Count words and lines
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DuplicateRemover;
