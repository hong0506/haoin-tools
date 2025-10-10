import { useState, useEffect } from "react";
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
  Link,
  Copy,
  ArrowRightLeft,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Link2,
  Zap,
  Info,
  Globe,
  Share2,
  Database,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const UrlEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
      toast.success("URL encoded");
    } catch (error) {
      toast.error("Encoding failed");
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
      toast.success("URL decoded");
    } catch (error) {
      toast.error("Decoding failed");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.success("All fields cleared");
  };

  const loadExample = (type: "encode" | "decode") => {
    if (type === "encode") {
      setInput(
        "Hello World! This is a test URL with spaces & special characters."
      );
      setOutput("");
    } else {
      setInput(
        "Hello%20World%21%20This%20is%20a%20test%20URL%20with%20spaces%20%26%20special%20characters."
      );
      setOutput("");
    }
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
            <h1 className="text-xl font-semibold">URL Encoder/Decoder</h1>
            <div className="ml-auto"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>URL Encoder/Decoder</CardTitle>
                <CardDescription>
                  Convert URLs and query parameters
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="url-encoder"
                toolName="URL Encoder/Decoder"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={() => loadExample("encode")}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                Encode Example
              </Button>
              <Button
                onClick={() => loadExample("decode")}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                Decode Example
              </Button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text or URL"
                className="min-h-[150px]"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1">
                Encode
              </Button>
              <Button onClick={swap} variant="outline" size="icon">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <Button onClick={decode} className="flex-1">
                Decode
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
                <Textarea value={output} readOnly className="min-h-[150px]" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is URL Encoder/Decoder?
              </strong>{" "}
              This tool encodes and decodes URLs (percent encoding). Perfect for
              handling special characters, query parameters, and safe URL
              transmission! 🔗
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
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Web Development
                  </div>
                  <p className="text-sm text-blue-700">
                    Encode{" "}
                    <Badge variant="secondary" className="mx-1">
                      query params
                    </Badge>
                    for safe URL transmission
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Link2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    API Integration
                  </div>
                  <p className="text-sm text-purple-700">
                    Handle special characters in API requests and responses
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Share2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Social Sharing
                  </div>
                  <p className="text-sm text-green-700">
                    Encode URLs for social media share links and email
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Data Storage
                  </div>
                  <p className="text-sm text-pink-700">
                    Safely store URLs with special characters in databases
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
                  <strong>Spaces:</strong> Encoded as %20 (or + in query
                  strings)
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Special Chars:</strong> &, ?, #, = need encoding in
                  URLs
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Always Encode:</strong> User input before adding to
                  URLs
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Decode First:</strong> Decode received URL parameters
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
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Base64 Tool
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Encode/decode Base64
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/json-formatter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  JSON Formatter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Format and validate JSON
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/hash-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Hash Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Create secure hashes
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrlEncoder;
