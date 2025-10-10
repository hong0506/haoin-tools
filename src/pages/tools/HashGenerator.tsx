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
  Shield,
  Zap,
  Info,
  Lock,
  FileCheck,
  Key,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

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

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Hash Generator?</strong>{" "}
              This tool generates cryptographic hashes (MD5, SHA-1, SHA-256) for data
              integrity verification and security. Perfect for password hashing, file
              verification, and API authentication! 🔒
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
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Password Security
                  </div>
                  <p className="text-sm text-blue-700">
                    Hash passwords for secure{" "}
                    <Badge variant="secondary" className="mx-1">
                      storage
                    </Badge>
                    in databases
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileCheck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    File Integrity
                  </div>
                  <p className="text-sm text-purple-700">
                    Verify file integrity with checksum validation
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Key className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    API Authentication
                  </div>
                  <p className="text-sm text-green-700">
                    Generate hash-based authentication tokens
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Shield className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Data Security
                  </div>
                  <p className="text-sm text-pink-700">
                    Create digital signatures and verify data authenticity
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
                  <strong>SHA-256:</strong> Most secure option for modern
                  applications
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>One-Way:</strong> Hash functions cannot be reversed
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Avoid MD5:</strong> Not secure for critical applications
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Verification:</strong> Compare hashes to check file
                  integrity
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
                onClick={() => navigate("/tools/password-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Password Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate secure passwords
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  UUID Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate unique IDs
                </div>
              </button>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HashGenerator;
