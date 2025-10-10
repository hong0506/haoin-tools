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
import { Braces, Copy, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      toast.success("JSON formatted successfully");
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      toast.success("JSON minified successfully");
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.success("Cleared all fields");
  };

  const loadExample = () => {
    const exampleJson = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "swimming", "coding"],
  "isActive": true
}`;
    setInput(exampleJson);
    setOutput("");
    toast.success("Example loaded");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <Braces className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">JSON Formatter</h1>
            <div className="ml-auto">
              <FavoriteButton
                toolId="json-formatter"
                toolTitle="JSON Formatter"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Format & Validate JSON</CardTitle>
                <CardDescription>
                  Format, minify, and validate JSON data
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="json-formatter"
                toolName="JSON Formatter"
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
              <label className="text-sm font-medium mb-2 block">
                Input JSON
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value"}'
                className="min-h-[200px] font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={formatJson}>Format</Button>
              <Button onClick={minifyJson} variant="outline">
                Minify
              </Button>
            </div>

            {output && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">Output</label>
                  <Button onClick={copyOutput} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[200px] font-mono"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="JSON Formatter"
          description="JSON (JavaScript Object Notation) is a lightweight data interchange format that's easy for humans to read and write, and easy for machines to parse and generate. This tool helps you format, validate, and minify JSON data with syntax highlighting and error detection."
          features={[
            "Format JSON with proper indentation and line breaks",
            "Minify JSON by removing unnecessary whitespace",
            "Validate JSON syntax and highlight errors",
            "Syntax highlighting for better readability",
            "Copy formatted or minified JSON to clipboard",
            "Clear all fields with a single button",
          ]}
          useCases={[
            "API development",
            "Configuration files",
            "Data validation",
            "Web development",
            "Database exports",
            "Debugging JSON data",
          ]}
          tips={[
            "Use formatting for development and debugging",
            "Use minification for production to reduce file size",
            "Always validate JSON before using in applications",
            "JSON keys must be enclosed in double quotes",
          ]}
        />
      </div>
    </div>
  );
};

export default JsonFormatter;
