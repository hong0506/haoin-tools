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
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">XML to JSON</h1>
          <div className="ml-auto">
            <FavoriteButton toolId="xml-to-json" toolName="XML to JSON" />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Convert XML to JSON</CardTitle>
            <CardDescription>
              Convert XML data to JSON format
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
                  <strong>Attributes:</strong> XML attributes become @attributes
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Arrays:</strong> Multiple elements become arrays
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default XmlToJson;
