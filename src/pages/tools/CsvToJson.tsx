import { useState } from "react";
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
import {
  FileJson,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Database,
  Code,
  Table,
  FileSpreadsheet,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CsvToJson = () => {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const navigate = useNavigate();

  const convert = () => {
    try {
      const lines = csv.split("\n").filter((line) => line.trim() !== "");
      if (lines.length < 2) {
        toast.error("CSV must have at least a header and one data row");
        return;
      }
      const headers = lines[0].split(",").map((h) => h.trim());
      const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = values[i] || "";
        });
        return obj;
      });
      setJson(JSON.stringify(data, null, 2));
      toast.success("Converted successfully!");
    } catch (error) {
      toast.error("Conversion failed");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
    toast.success("Copied to clipboard!");
  };

  const clearAll = () => {
    setCsv("");
    setJson("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setCsv(`name,age,city,occupation
John Doe,30,New York,Engineer
Jane Smith,25,Los Angeles,Designer
Bob Johnson,35,Chicago,Manager
Alice Brown,28,Seattle,Developer`);
    setJson("");
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
            <h1 className="text-xl font-semibold">CSV to JSON</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Convert CSV to JSON</CardTitle>
                <CardDescription>
                  Transform CSV data into JSON format
                </CardDescription>
              </div>
              <FavoriteButton toolId="csv-to-json" toolName="CSV to JSON" />
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
                CSV Input
              </label>
              <Textarea
                value={csv}
                onChange={(e) => setCsv(e.target.value)}
                rows={8}
                placeholder="name,age,city&#10;John,30,NYC&#10;Jane,25,LA"
              />
            </div>
            <Button onClick={convert} className="w-full">
              Convert to JSON
            </Button>
            {json && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">JSON Output</label>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={json}
                  readOnly
                  rows={8}
                  className="font-mono"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is CSV to JSON?</strong>{" "}
              This tool converts CSV (tabular) data to JSON format. Perfect for
              API integration, data migration, and web development! 📊
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
                  <Code className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    API Integration
                  </div>
                  <p className="text-sm text-blue-700">
                    Convert{" "}
                    <Badge variant="secondary" className="mx-1">
                      CSV
                    </Badge>
                    to JSON for API requests
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Data Migration
                  </div>
                  <p className="text-sm text-purple-700">
                    Import CSV data into databases and applications
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Table className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Data Analysis
                  </div>
                  <p className="text-sm text-green-700">
                    Convert spreadsheet data for analysis tools
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileSpreadsheet className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Web Development
                  </div>
                  <p className="text-sm text-pink-700">
                    Use CSV data in web apps and visualizations
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
                  <strong>Headers:</strong> First row becomes JSON keys
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Format:</strong> Each row becomes a JSON object
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Spreadsheets:</strong> Perfect for Excel/Sheets
                  exports
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>APIs:</strong> Prepare data for REST API calls
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
                onClick={() => navigate("/tools/json-formatter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  JSON Formatter
                </div>
                <div className="text-sm text-gray-600 mt-1">Format JSON</div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Base64 Tool
                </div>
                <div className="text-sm text-gray-600 mt-1">Encode/decode</div>
              </button>
              <button
                onClick={() => navigate("/tools/html-to-text")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  HTML to Text
                </div>
                <div className="text-sm text-gray-600 mt-1">Convert HTML</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CsvToJson;
