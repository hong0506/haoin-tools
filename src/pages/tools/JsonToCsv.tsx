import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  FileSpreadsheet,
  Download,
  Copy,
  Zap,
  Info,
  Database,
  Table,
  BarChart,
  FileJson,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const JsonToCsv = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const navigate = useNavigate();

  const convertToCSV = () => {
    if (!jsonInput.trim()) {
      toast.error("Please enter JSON data");
      return;
    }

    try {
      const data = JSON.parse(jsonInput);
      
      if (!Array.isArray(data)) {
        toast.error("JSON must be an array of objects");
        return;
      }
      
      if (data.length === 0) {
        toast.error("Array is empty");
        return;
      }

      const keys = Array.from(
        new Set(data.flatMap(obj => Object.keys(obj)))
      );

      const header = keys.join(",");

      const rows = data.map(obj => {
        return keys.map(key => {
          const value = obj[key];
          if (value === null || value === undefined) return "";
          const stringValue = String(value);
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(",");
      });

      const csv = [header, ...rows].join("\n");
      setCsvOutput(csv);
      toast.success("Converted to CSV successfully!");
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  const downloadCSV = () => {
    if (!csvOutput) {
      toast.error("No CSV to download");
      return;
    }

    const blob = new Blob([csvOutput], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded!");
  };

  const copyToClipboard = () => {
    if (csvOutput) {
      navigator.clipboard.writeText(csvOutput);
      toast.success("Copied to clipboard!");
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setCsvOutput("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    const exampleJSON = JSON.stringify([
      { name: "John", age: 30, city: "New York" },
      { name: "Jane", age: 25, city: "Paris" },
      { name: "Bob", age: 35, city: "London" }
    ], null, 2);
    setJsonInput(exampleJSON);
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
          <h1 className="text-xl font-semibold">JSON to CSV</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Convert JSON to CSV</CardTitle>
                <CardDescription>
                  Convert JSON array to CSV format for spreadsheet applications
                </CardDescription>
              </div>
              <FavoriteButton toolId="json-to-csv" toolName="JSON to CSV" />
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
              <div className="text-sm font-medium mb-2">JSON Input</div>
              <Textarea
                placeholder='[{"name": "John", "age": 30}, ...]'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={convertToCSV} className="w-full">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Convert to CSV
            </Button>

            {csvOutput && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">CSV Output</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadCSV}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={csvOutput}
                  readOnly
                  rows={8}
                  className="font-mono text-sm"
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is JSON to CSV Converter?
              </strong>{" "}
              This tool converts JSON arrays into CSV format, perfect for importing into Excel, Google Sheets, or any spreadsheet application. Export your data seamlessly! 📊
            </p>
          </CardContent>
        </Card>

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
                  <Table className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Excel Export</div>
                  <p className="text-sm text-blue-700">
                    Export API data to Excel spreadsheets for analysis
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
                    Convert JSON data for database imports
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <BarChart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Data Analysis
                  </div>
                  <p className="text-sm text-green-700">
                    Prepare data for statistical analysis tools
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileJson className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    API Responses
                  </div>
                  <p className="text-sm text-pink-700">
                    Convert API responses to spreadsheet format
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <strong>Array Required:</strong> JSON must be an array of objects
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Excel Compatible:</strong> Can be opened directly in Excel
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Auto Headers:</strong> Column headers extracted automatically
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Download:</strong> Save as .csv file for offline use
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🔗 Related Tools You Might Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/csv-to-json")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  CSV to JSON
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert CSV to JSON
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
              <button
                onClick={() => navigate("/tools/xml-to-json")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  XML to JSON
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert XML to JSON
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JsonToCsv;
