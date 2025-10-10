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
  FileJson,
  Copy,
  Info,
  Zap,
  Code,
  FileCode,
  Database,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const XmlToJson = () => {
  const [xmlInput, setXmlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const navigate = useNavigate();

  const parseXml = (xmlString: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      throw new Error("Invalid XML");
    }

    const xmlToObject = (node: Element): any => {
      const obj: any = {};
      
      if (node.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj["@attributes"][attr.name] = attr.value;
        }
      }
      
      if (node.children.length === 0) {
        return node.textContent || "";
      }
      
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const childData = xmlToObject(child);
        
        if (obj[child.tagName]) {
          if (!Array.isArray(obj[child.tagName])) {
            obj[child.tagName] = [obj[child.tagName]];
          }
          obj[child.tagName].push(childData);
        } else {
          obj[child.tagName] = childData;
        }
      }
      
      return obj;
    };

    return { [xmlDoc.documentElement.tagName]: xmlToObject(xmlDoc.documentElement) };
  };

  const convertToJson = () => {
    if (!xmlInput.trim()) {
      toast.error("Please enter XML data");
      return;
    }

    try {
      const jsonObj = parseXml(xmlInput);
      const formatted = JSON.stringify(jsonObj, null, 2);
      setJsonOutput(formatted);
      toast.success("Converted to JSON successfully!");
    } catch (error) {
      toast.error("Invalid XML format");
    }
  };

  const copyToClipboard = () => {
    if (jsonOutput) {
      navigator.clipboard.writeText(jsonOutput);
      toast.success("Copied to clipboard!");
    }
  };

  const clearAll = () => {
    setXmlInput("");
    setJsonOutput("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    const exampleXML = `<?xml version="1.0"?>
<library>
  <book id="1">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
  </book>
  <book id="2">
    <title>1984</title>
    <author>George Orwell</author>
  </book>
</library>`;
    setXmlInput(exampleXML);
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
          <h1 className="text-xl font-semibold">XML to JSON</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Convert XML to JSON</CardTitle>
                <CardDescription>
                  Convert XML data to JSON format
                </CardDescription>
              </div>
              <FavoriteButton toolId="xml-to-json" toolName="XML to JSON" />
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
              <div className="text-sm font-medium mb-2">XML Input</div>
              <Textarea
                placeholder='<?xml version="1.0"?><root>...</root>'
                value={xmlInput}
                onChange={(e) => setXmlInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={convertToJson} className="w-full">
              <FileJson className="h-4 w-4 mr-2" />
              Convert to JSON
            </Button>

            {jsonOutput && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">JSON Output</div>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={jsonOutput}
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
                What is XML to JSON Converter?
              </strong>{" "}
              This tool converts XML data to JSON format, making it easier to work with in modern web applications and APIs. Perfect for data transformation! 🔄
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
                  <Code className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">API Migration</div>
                  <p className="text-sm text-blue-700">
                    Convert legacy XML APIs to modern JSON format
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Data Processing
                  </div>
                  <p className="text-sm text-purple-700">
                    Process XML data in JavaScript applications
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Settings className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Config Files
                  </div>
                  <p className="text-sm text-green-700">
                    Convert XML config files to JSON format
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileCode className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Web Development
                  </div>
                  <p className="text-sm text-pink-700">
                    Work with XML data in modern frameworks
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
                  <strong>Attributes:</strong> XML attributes become @attributes in JSON
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Arrays:</strong> Multiple elements with same name become arrays
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Structure:</strong> Preserves XML hierarchy in JSON
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Validation:</strong> Checks for valid XML before conversion
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
                onClick={() => navigate("/tools/json-to-csv")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  JSON to CSV
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert JSON to CSV
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Base64 Encoder
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

export default XmlToJson;
