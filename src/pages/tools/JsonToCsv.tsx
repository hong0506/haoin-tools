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

      // Get all unique keys from all objects
      const keys = Array.from(
        new Set(data.flatMap(obj => Object.keys(obj)))
      );

      // Create CSV header
      const header = keys.join(",");

      // Create CSV rows
      const rows = data.map(obj => {
        return keys.map(key => {
          const value = obj[key];
          if (value === null || value === undefined) return "";
          const stringValue = String(value);
          // Escape values containing commas, quotes, or newlines
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
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">JSON to CSV</h1>
          <div className="ml-auto">
            <FavoriteButton
              toolId="json-to-csv"
              toolName="JSON to CSV"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Convert JSON to CSV</CardTitle>
            <CardDescription>
              Convert JSON array to CSV format for spreadsheet applications
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadCSV}
                    >
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JsonToCsv;
