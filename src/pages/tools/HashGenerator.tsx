import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Fingerprint,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const HashGenerator = () => {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<{
    md5: string;
    sha1: string;
    sha256: string;
  }>({
    md5: "",
    sha1: "",
    sha256: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateHashes = async () => {
    if (!text) {
      toast.error("Please enter text");
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const sha1 = await crypto.subtle.digest("SHA-1", data);
    const sha256 = await crypto.subtle.digest("SHA-256", data);

    const toHex = (buffer: ArrayBuffer) => {
      return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    setHashes({
      md5: "MD5 not available in browser",
      sha1: toHex(sha1),
      sha256: toHex(sha256),
    });

    toast.success("Hashes generated");
  };

  const copyHash = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    toast.success(`${type} copied to clipboard`);
  };

  const clearAll = () => {
    setText("");
    setHashes({ md5: "", sha1: "", sha256: "" });
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setText("Hello, World! This is a sample text for hashing.");
    setHashes({ md5: "", sha1: "", sha256: "" });
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
          <div className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Hash Generator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generate Hashes</CardTitle>
                <CardDescription>
                  Create SHA-1 and SHA-256 hashes
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="hash-generator"
                toolName="Hash Generator"
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
              <label className="mb-2 block text-sm font-medium">
                Input Text
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to hash"
                className="min-h-[150px]"
              />
            </div>

            <Button onClick={generateHashes} className="w-full">
              Generate Hashes
            </Button>

            {hashes.sha1 && (
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SHA-1
                  </label>
                  <div className="flex gap-2">
                    <Input value={hashes.sha1} readOnly className="font-mono" />
                    <Button
                      onClick={() => copyHash(hashes.sha1, "SHA-1")}
                      size="icon"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SHA-256
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={hashes.sha256}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      onClick={() => copyHash(hashes.sha256, "SHA-256")}
                      size="icon"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="Hash Generator"
          description="Hash functions are cryptographic algorithms that convert input data into fixed-size strings of characters. They're widely used for data integrity verification, password storage, digital signatures, and blockchain technology. This tool generates multiple hash types from your input text."
          features={[
            "Generate MD5, SHA-1, and SHA-256 hashes",
            "Real-time hash generation as you type",
            "Copy individual hashes to clipboard",
            "Support for any text input including Unicode",
            "Clear all fields with a single button",
            "Load example text for testing",
          ]}
          useCases={[
            "Password verification",
            "File integrity checking",
            "Digital signatures",
            "Blockchain applications",
            "Data deduplication",
            "API authentication",
            "Checksum validation",
            "Security auditing",
          ]}
          tips={[
            "SHA-256 is more secure than MD5 or SHA-1",
            "Use hashes to verify file integrity after download",
            "Never use MD5 for security-critical applications",
            "Hash functions are one-way - you cannot reverse them",
          ]}
        />
      </div>
    </div>
  );
};

export default HashGenerator;
