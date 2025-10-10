import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
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
  Hash,
  Copy,
  RefreshCw,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Fingerprint,
  Zap,
  Info,
  Database,
  Key,
  Cloud,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const UuidGenerator = () => {
  const [uuid, setUuid] = useState("");
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateUuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generate = () => {
    if (count === 1) {
      const newUuid = generateUuid();
      setUuid(newUuid);
      setUuids([]);
    } else {
      const newUuids = Array.from({ length: count }, () => generateUuid());
      setUuids(newUuids);
      setUuid("");
    }
    toast.success(`Generated ${count} UUID${count > 1 ? "s" : ""}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setUuid("");
    setUuids([]);
    setCount(1);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setCount(5);
    setUuid("");
    setUuids([]);
    toast.success("Example settings loaded");
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
            <Hash className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">UUID Generator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generate UUIDs</CardTitle>
                <CardDescription>
                  Create unique identifiers (UUID v4)
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="uuid-generator"
                toolName="UUID Generator"
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
                Number of UUIDs
              </label>
              <Input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) =>
                  setCount(
                    Math.max(1, Math.min(100, parseInt(e.target.value) || 1))
                  )
                }
              />
            </div>

            <Button onClick={generate} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate
            </Button>

            {uuid && (
              <div className="flex gap-2">
                <Input value={uuid} readOnly className="font-mono" />
                <Button
                  onClick={() => copyToClipboard(uuid)}
                  size="icon"
                  variant="outline"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}

            {uuids.length > 0 && (
              <div className="space-y-2">
                {uuids.map((id, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={id} readOnly className="font-mono" />
                    <Button
                      onClick={() => copyToClipboard(id)}
                      size="icon"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is UUID Generator?</strong>{" "}
              This tool generates RFC 4122 compliant UUIDs (Universally Unique
              Identifiers). Perfect for database keys, API identifiers, and
              distributed systems! 🎯
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
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Database Primary Keys
                  </div>
                  <p className="text-sm text-blue-700">
                    Generate unique{" "}
                    <Badge variant="secondary" className="mx-1">
                      IDs
                    </Badge>
                    for database records and tables
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Key className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    API Identifiers
                  </div>
                  <p className="text-sm text-purple-700">
                    Create unique identifiers for API endpoints and resources
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Cloud className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Distributed Systems
                  </div>
                  <p className="text-sm text-green-700">
                    Generate unique IDs across multiple servers and services
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Fingerprint className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Session Tokens
                  </div>
                  <p className="text-sm text-pink-700">
                    Create unique session IDs for user authentication
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
                  <strong>Length:</strong> UUIDs are 36 characters including hyphens
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Uniqueness:</strong> Guaranteed unique across time and
                  space
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Version 4:</strong> Most commonly used for random UUIDs
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Privacy:</strong> No creation time or location information
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
                onClick={() => navigate("/tools/random-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Random Picker
                </div>
                <div className="text-sm text-gray-600 mt-1">Pick random items</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UuidGenerator;
