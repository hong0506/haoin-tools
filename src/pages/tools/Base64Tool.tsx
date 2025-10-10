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
} from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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

        <ToolDescription
          title="Base64 Encoder & Decoder"
          description="Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to encode data for transmission over text-based protocols like email, HTTP, and XML. This tool allows you to easily encode text to Base64 format or decode Base64 strings back to their original text."
          features={[
            "Encode any text string to Base64 format",
            "Decode Base64 strings back to original text",
            "Support for Unicode characters and special symbols",
            "Real-time encoding and decoding",
            "Copy results to clipboard with one click",
            "Clear all fields with a single button",
          ]}
          useCases={[
            "Email attachments",
            "Data transmission",
            "API authentication",
            "Web development",
            "Configuration files",
            "Binary data storage",
          ]}
          tips={[
            "Base64 encoding increases data size by approximately 33%",
            "Useful for embedding binary data in JSON or XML",
            "Commonly used in HTTP Basic Authentication",
            "Perfect for storing images in databases as text",
          ]}
        />
      </div>
    </div>
  );
};

export default Base64Tool;
