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
} from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
            <CardDescription>Convert URLs and query parameters</CardDescription>
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

        <ToolDescription
          title="URL Encoder & Decoder"
          description="URL encoding (also known as percent encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI). It's used to represent characters that have special meaning in URLs or cannot be represented in ASCII. This tool helps you encode and decode URLs safely."
          features={[
            "Encode URLs and query parameters",
            "Decode encoded URLs back to readable text",
            "Handle special characters and Unicode",
            "Real-time encoding and decoding",
            "Copy results to clipboard with one click",
            "Clear all fields with a single button",
          ]}
          useCases={[
            "Web development",
            "API integration",
            "Form data handling",
            "Query parameter encoding",
            "Email links",
            "Social media sharing",
            "Database storage",
            "Security applications",
          ]}
          tips={[
            "Spaces are encoded as %20 or +",
            "Special characters like &, ?, # need encoding",
            "Use encoding when passing data in URLs",
            "Always decode received URL parameters",
          ]}
        />
      </div>
    </div>
  );
};

export default UrlEncoder;
