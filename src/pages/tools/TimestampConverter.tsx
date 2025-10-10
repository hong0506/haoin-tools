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
import { Clock, Copy, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(
    Math.floor(Date.now() / 1000).toString()
  );
  const [humanDate, setHumanDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timestampToDate = () => {
    try {
      const date = new Date(parseInt(timestamp) * 1000);
      setHumanDate(date.toISOString().slice(0, 16));
      toast.success("Converted to date");
    } catch (error) {
      toast.error("Invalid timestamp");
    }
  };

  const dateToTimestamp = () => {
    try {
      const date = new Date(humanDate);
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
      toast.success("Converted to timestamp");
    } catch (error) {
      toast.error("Invalid date");
    }
  };

  const getCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
    toast.success("Current timestamp set");
  };

  const getCurrentDate = () => {
    setHumanDate(new Date().toISOString().slice(0, 16));
    toast.success("Current date set");
  };

  const copyTimestamp = () => {
    navigator.clipboard.writeText(timestamp);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setTimestamp("");
    setHumanDate("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setTimestamp("1609459200"); // 2021-01-01 00:00:00 UTC
    setHumanDate("2021-01-01T00:00");
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
            <h1 className="text-xl font-semibold">Timestamp Converter</h1>
            <div className="ml-auto">
              <FavoriteButton
                toolId="timestamp-converter"
                toolName="Timestamp Converter"
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
                <CardTitle>Timestamp Converter</CardTitle>
                <CardDescription>
                  Convert between Unix timestamps and dates
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="timestamp-converter"
                toolName="Timestamp Converter"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Unix Timestamp
                </label>
                <div className="flex gap-2">
                  <Input
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    placeholder="1234567890"
                    className="font-mono"
                  />
                  <Button onClick={copyTimestamp} size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={timestampToDate} className="flex-1">
                  Convert to Date
                </Button>
                <Button onClick={getCurrentTimestamp} variant="outline">
                  Current Time
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Human Readable Date
                </label>
                <Input
                  type="datetime-local"
                  value={humanDate}
                  onChange={(e) => setHumanDate(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={dateToTimestamp} className="flex-1">
                  Convert to Timestamp
                </Button>
                <Button onClick={getCurrentDate} variant="outline">
                  Current Time
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <ToolDescription
          title="Timestamp Converter"
          description="Unix timestamps are a way to represent dates and times as a single number - the number of seconds since January 1, 1970 UTC. This tool helps you convert between Unix timestamps and human-readable date formats, making it easy to work with dates in programming, databases, and APIs."
          features={[
            "Convert Unix timestamps to human-readable dates",
            "Convert human-readable dates to Unix timestamps",
            "Support for both seconds and milliseconds timestamps",
            "Real-time conversion as you type",
            "Copy converted values to clipboard",
            "Clear all fields with a single button",
          ]}
          useCases={[
            "Database queries",
            "API development",
            "Log file analysis",
            "Data processing",
            "Web development",
            "System administration",
            "Debugging applications",
            "Data migration",
          ]}
          tips={[
            "Unix timestamps count seconds since January 1, 1970 UTC",
            "JavaScript uses milliseconds, Unix uses seconds",
            "Timestamps are timezone-independent (always UTC)",
            "Use timestamps for precise date/time calculations",
          ]}
        />
      </div>
    </div>
  );
};

export default TimestampConverter;
