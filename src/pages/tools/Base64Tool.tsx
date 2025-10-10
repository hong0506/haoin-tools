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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Copy,
  ArrowDownUp,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  FileCode,
  Zap,
  Info,
  Mail,
  Key,
  Image,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("encode");
  const navigate = useNavigate();

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      toast.success("Text encoded to Base64!");
    } catch (error) {
      toast.error("Error encoding text");
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      toast.success("Base64 decoded!");
    } catch (error) {
      toast.error("Invalid Base64 string");
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error("No output to copy");
      return;
    }
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.success("Cleared all fields");
  };

  const loadExample = (type: "encode" | "decode") => {
    if (type === "encode") {
      setInput("Hello, World! This is a sample text for Base64 encoding.");
      setOutput("");
    } else {
      setInput(
        "SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4="
      );
      setOutput("");
    }
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
          <h1 className="text-xl font-semibold">Base64 Encoder/Decoder</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Base64 Encoder & Decoder</CardTitle>
                <CardDescription>
                  Encode text to Base64 or decode Base64 back to text
                </CardDescription>
              </div>
              <FavoriteButton toolId="base64-encoder" toolName="Base64 Tool" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={() => loadExample(activeTab as "encode" | "decode")}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>

            <Tabs
              defaultValue="encode"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="encode">Encode</TabsTrigger>
                <TabsTrigger value="decode">Decode</TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">
                    Text to encode:
                  </label>
                  <Textarea
                    placeholder="Enter text to encode..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                </div>

                <Button onClick={encode} className="w-full">
                  Encode to Base64
                </Button>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Base64 output:
                    </label>
                    <div className="flex gap-2">
                      <Button onClick={swap} size="sm" variant="outline">
                        <ArrowDownUp className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={copyToClipboard}
                        size="sm"
                        variant="outline"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    placeholder="Encoded result will appear here..."
                    className="min-h-[150px] font-mono"
                  />
                </div>
              </TabsContent>

              <TabsContent value="decode" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">
                    Base64 to decode:
                  </label>
                  <Textarea
                    placeholder="Enter Base64 string to decode..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                </div>

                <Button onClick={decode} className="w-full">
                  Decode from Base64
                </Button>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Decoded output:
                    </label>
                    <div className="flex gap-2">
                      <Button onClick={swap} size="sm" variant="outline">
                        <ArrowDownUp className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={copyToClipboard}
                        size="sm"
                        variant="outline"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    placeholder="Decoded result will appear here..."
                    className="min-h-[150px] font-mono"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Base64 Encoder/Decoder?
              </strong>{" "}
              This tool encodes text to Base64 format or decodes Base64 strings
              back to original text. Base64 is essential for data transmission,
              API authentication, and embedding binary data! 🔐
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
                  <Key className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    API Authentication
                  </div>
                  <p className="text-sm text-blue-700">
                    Encode credentials for{" "}
                    <Badge variant="secondary" className="mx-1">
                      Basic Auth
                    </Badge>
                    headers
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Image className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Image Embedding
                  </div>
                  <p className="text-sm text-purple-700">
                    Convert images to Base64 for embedding in HTML/CSS
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Email Attachments
                  </div>
                  <p className="text-sm text-green-700">
                    Encode files for email transmission using MIME
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileCode className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Data URLs
                  </div>
                  <p className="text-sm text-pink-700">
                    Create data URLs for embedding resources inline
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
                  <strong>Size Increase:</strong> Base64 encoding increases data
                  size by ~33%
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>HTTP Auth:</strong> Format is "username:password" then
                  encode
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>JSON Safe:</strong> Perfect for embedding binary data in
                  JSON
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>URL Safe:</strong> Replace + with - and / with _ for URLs
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
                onClick={() => navigate("/tools/url-encoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  URL Encoder
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Encode/decode URLs
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Base64Tool;
