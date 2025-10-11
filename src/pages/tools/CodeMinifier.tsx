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
  Minimize2,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Code2,
  Zap,
  Info,
  FileCode,
  Gauge,
  Rocket,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CodeMinifier = () => {
  const [htmlInput, setHtmlInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [cssInput, setCssInput] = useState("");
  const [cssOutput, setCssOutput] = useState("");
  const [jsInput, setJsInput] = useState("");
  const [jsOutput, setJsOutput] = useState("");
  const [activeTab, setActiveTab] = useState("html");
  const navigate = useNavigate();

  const minifyHtml = () => {
    if (!htmlInput.trim()) {
      toast.error("Please enter HTML code");
      return;
    }
    try {
      let minified = htmlInput
        .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/>\s+</g, "><") // Remove spaces between tags
        .replace(/\s+(\/?>)/g, "$1") // Remove spaces before closing brackets
        .trim();
      setHtmlOutput(minified);
      const reduction = (
        ((htmlInput.length - minified.length) / htmlInput.length) *
        100
      ).toFixed(1);
      toast.success(`HTML minified! ${reduction}% size reduction`);
    } catch (error) {
      toast.error("Error minifying HTML");
    }
  };

  const minifyCss = () => {
    if (!cssInput.trim()) {
      toast.error("Please enter CSS code");
      return;
    }
    try {
      let minified = cssInput
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\s*{\s*/g, "{") // Remove spaces around {
        .replace(/\s*}\s*/g, "}") // Remove spaces around }
        .replace(/\s*;\s*/g, ";") // Remove spaces around ;
        .replace(/\s*:\s*/g, ":") // Remove spaces around :
        .replace(/;\s*}/g, "}") // Remove last semicolon
        .trim();
      setCssOutput(minified);
      const reduction = (
        ((cssInput.length - minified.length) / cssInput.length) *
        100
      ).toFixed(1);
      toast.success(`CSS minified! ${reduction}% size reduction`);
    } catch (error) {
      toast.error("Error minifying CSS");
    }
  };

  const minifyJs = () => {
    if (!jsInput.trim()) {
      toast.error("Please enter JavaScript code");
      return;
    }
    try {
      let minified = jsInput
        .replace(/\/\/.*$/gm, "") // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\s*([=+\-*/<>!&|,;:{}()\[\]])\s*/g, "$1") // Remove spaces around operators
        .trim();
      setJsOutput(minified);
      const reduction = (
        ((jsInput.length - minified.length) / jsInput.length) *
        100
      ).toFixed(1);
      toast.success(`JavaScript minified! ${reduction}% size reduction`);
    } catch (error) {
      toast.error("Error minifying JavaScript");
    }
  };

  const copyOutput = (output: string, type: string) => {
    navigator.clipboard.writeText(output);
    toast.success(`Minified ${type} copied to clipboard!`);
  };

  const clearAll = () => {
    setHtmlInput("");
    setHtmlOutput("");
    setCssInput("");
    setCssOutput("");
    setJsInput("");
    setJsOutput("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    if (activeTab === "html") {
      setHtmlInput(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Page</title>
  </head>
  <body>
    <!-- Main content -->
    <div class="container">
      <h1>Welcome to My Website</h1>
      <p>This is a sample paragraph with some content.</p>
    </div>
  </body>
</html>`);
      toast.success("HTML example loaded");
    } else if (activeTab === "css") {
      setCssInput(`/* Main styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  line-height: 1.6;
  color: #666;
}`);
      toast.success("CSS example loaded");
    } else if (activeTab === "javascript") {
      setJsInput(`// Function to greet user
function greetUser(name) {
  const greeting = "Hello, " + name + "!";
  console.log(greeting);
  return greeting;
}

// Calculate sum
function calculateSum(a, b) {
  return a + b;
}

greetUser("World");`);
      toast.success("JavaScript example loaded");
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
          <div className="flex items-center gap-2">
            <Minimize2 className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Code Minifier</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Minify Code</CardTitle>
                <CardDescription>
                  Compress HTML, CSS, and JavaScript to reduce file size
                </CardDescription>
              </div>
              <FavoriteButton toolId="code-minifier" toolName="Code Minifier" />
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

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    HTML Input
                  </label>
                  <Textarea
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    placeholder="<html>...</html>"
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Size: {htmlInput.length} bytes
                  </div>
                </div>

                <Button onClick={minifyHtml} className="w-full">
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Minify HTML
                </Button>

                {htmlOutput && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Minified Output
                      </label>
                      <Button
                        onClick={() => copyOutput(htmlOutput, "HTML")}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <Textarea
                      value={htmlOutput}
                      readOnly
                      className="min-h-[150px] font-mono text-sm bg-green-50/50"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Size: {htmlOutput.length} bytes (
                      {(
                        ((htmlInput.length - htmlOutput.length) /
                          htmlInput.length) *
                        100
                      ).toFixed(1)}
                      % reduction)
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="css" className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    CSS Input
                  </label>
                  <Textarea
                    value={cssInput}
                    onChange={(e) => setCssInput(e.target.value)}
                    placeholder=".class { property: value; }"
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Size: {cssInput.length} bytes
                  </div>
                </div>

                <Button onClick={minifyCss} className="w-full">
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Minify CSS
                </Button>

                {cssOutput && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Minified Output
                      </label>
                      <Button
                        onClick={() => copyOutput(cssOutput, "CSS")}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <Textarea
                      value={cssOutput}
                      readOnly
                      className="min-h-[150px] font-mono text-sm bg-blue-50/50"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Size: {cssOutput.length} bytes (
                      {(
                        ((cssInput.length - cssOutput.length) /
                          cssInput.length) *
                        100
                      ).toFixed(1)}
                      % reduction)
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="javascript" className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    JavaScript Input
                  </label>
                  <Textarea
                    value={jsInput}
                    onChange={(e) => setJsInput(e.target.value)}
                    placeholder="function myFunc() { ... }"
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Size: {jsInput.length} bytes
                  </div>
                </div>

                <Button onClick={minifyJs} className="w-full">
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Minify JavaScript
                </Button>

                {jsOutput && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Minified Output
                      </label>
                      <Button
                        onClick={() => copyOutput(jsOutput, "JavaScript")}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <Textarea
                      value={jsOutput}
                      readOnly
                      className="min-h-[150px] font-mono text-sm bg-purple-50/50"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Size: {jsOutput.length} bytes (
                      {(
                        ((jsInput.length - jsOutput.length) / jsInput.length) *
                        100
                      ).toFixed(1)}
                      % reduction)
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Code Minifier?</strong>{" "}
              This tool compresses HTML, CSS, and JavaScript code by removing
              comments, whitespace, and unnecessary characters. Perfect for
              optimizing website performance and reducing bandwidth! ⚡
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
                  <Rocket className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Performance
                  </div>
                  <p className="text-sm text-purple-700">
                    Reduce{" "}
                    <Badge variant="secondary" className="mx-1">
                      file size
                    </Badge>{" "}
                    to improve page load speed
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Gauge className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Bandwidth</div>
                  <p className="text-sm text-blue-700">
                    Save bandwidth costs with smaller file transfers
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">Production</div>
                  <p className="text-sm text-green-700">
                    Prepare code for production deployment
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileCode className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">SEO</div>
                  <p className="text-sm text-pink-700">
                    Improve SEO rankings with faster page loads
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
                  <strong>Development:</strong> Use original code for
                  development
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Production:</strong> Deploy minified code to
                  production
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Testing:</strong> Always test minified code before
                  deployment
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Backup:</strong> Keep original source files for
                  updates
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
                onClick={() => navigate("/tools/json-formatter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  JSON Formatter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Format JSON data
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/html-to-text")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  HTML to Text
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert HTML to plain text
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Base64 Encoder
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Encode/decode Base64
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeMinifier;
