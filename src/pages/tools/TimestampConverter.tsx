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
  Clock,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Database,
  Code2,
  Calendar,
  Server,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

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

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Timestamp Converter?
              </strong>{" "}
              This tool converts between Unix timestamps and human-readable dates.
              Perfect for database queries, API development, and debugging! ⏰
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
                    Database Queries
                  </div>
                  <p className="text-sm text-blue-700">
                    Convert timestamps for{" "}
                    <Badge variant="secondary" className="mx-1">
                      SQL
                    </Badge>
                    queries and date filters
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    API Development
                  </div>
                  <p className="text-sm text-purple-700">
                    Work with timestamp-based APIs and endpoints
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Server className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Log Analysis
                  </div>
                  <p className="text-sm text-green-700">
                    Parse and understand timestamps in server logs
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Calendar className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Data Processing
                  </div>
                  <p className="text-sm text-pink-700">
                    Convert dates for data migration and ETL processes
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
                  <strong>Start Date:</strong> Unix epoch starts at Jan 1, 1970 UTC
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Units:</strong> Unix uses seconds, JavaScript uses
                  milliseconds
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>UTC:</strong> Timestamps are always in UTC (timezone-free)
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Precision:</strong> Use timestamps for accurate date math
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
                onClick={() => navigate("/tools/date-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Date Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate date differences
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/age-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Age Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">Calculate age</div>
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

export default TimestampConverter;
