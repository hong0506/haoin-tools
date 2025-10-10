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
import { FileJson, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";
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
            <div className="ml-auto">
              <FavoriteButton toolId="csv-to-json" toolName="CSV to JSON" />
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Convert CSV to JSON</CardTitle>
            <CardDescription>
              Transform CSV data into JSON format
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

        <ToolDescription
          title="CSV to JSON Converter"
          description="CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are two popular data formats used in web development, data analysis, and API integration. This tool converts CSV data to JSON format, making it easy to work with tabular data in web applications and APIs."
          features={[
            "Convert CSV data to JSON format",
            "Handle comma-separated values automatically",
            "Preserve data structure and relationships",
            "Support for headers and data rows",
            "Clear all fields with a single button",
            "Load example CSV data for testing",
          ]}
          useCases={[
            "Data migration",
            "API integration",
            "Web development",
            "Data analysis",
            "Database import",
            "Configuration files",
            "Report generation",
            "Data visualization",
          ]}
          tips={[
            "First row is treated as headers/keys",
            "Each subsequent row becomes a JSON object",
            "Perfect for converting spreadsheet data to JSON",
            "Useful for API data preparation",
          ]}
        />
      </div>
    </div>
  );
};

export default CsvToJson;
