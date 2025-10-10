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
} from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">UUID Generator</h1>
            <div className="ml-auto">
              <FavoriteButton toolId="uuid-generator" toolTitle="UUID Generator" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate UUIDs</CardTitle>
            <CardDescription>
              Create unique identifiers (UUID v4)
            </CardDescription>
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

        <ToolDescription
          title="UUID Generator"
          description="UUID (Universally Unique Identifier) is a 128-bit identifier that's guaranteed to be unique across time and space. UUIDs are widely used in software development for creating unique identifiers for database records, API endpoints, session tokens, and distributed systems."
          features={[
            "Generate RFC 4122 compliant UUIDs",
            "Generate single or multiple UUIDs at once",
            "Copy individual UUIDs to clipboard",
            "Copy all generated UUIDs at once",
            "Clear all fields with a single button",
            "Load example settings for testing",
          ]}
          useCases={[
            "Database primary keys",
            "API endpoint identifiers",
            "Session tokens",
            "File naming",
            "Distributed systems",
            "Microservices architecture",
            "Event tracking",
            "User identification",
          ]}
          tips={[
            "UUIDs are 36 characters long including hyphens",
            "Use UUIDs when you need globally unique identifiers",
            "UUIDs don't reveal information about creation time or location",
            "Consider using UUID v4 for most applications",
          ]}
        />
      </div>
    </div>
  );
};

export default UuidGenerator;
