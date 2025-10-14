import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
  const { t } = useTranslation();
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
      toast.error(t("tools.xml-to-json.pleaseEnterXml"));
      return;
    }

    try {
      const jsonObj = parseXml(xmlInput);
      const formatted = JSON.stringify(jsonObj, null, 2);
      setJsonOutput(formatted);
      toast.success(t("tools.xml-to-json.convertedSuccess"));
    } catch (error) {
      toast.error(t("tools.xml-to-json.invalidXmlFormat"));
    }
  };

  const copyToClipboard = () => {
    if (jsonOutput) {
      navigator.clipboard.writeText(jsonOutput);
      toast.success(t("tools.xml-to-json.copiedToClipboard"));
    }
  };

  const clearAll = () => {
    setXmlInput("");
    setJsonOutput("");
    toast.success(t("tools.xml-to-json.allFieldsCleared"));
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
    toast.success(t("tools.xml-to-json.exampleLoaded"));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold flex-1">{t("tools.xml-to-json.title")}</h1>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.xml-to-json.convertXmlToJson")}</CardTitle>
                <CardDescription>
                  {t("tools.xml-to-json.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton toolId="xml-to-json" toolName={t("tools.xml-to-json.title")} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">{t("tools.xml-to-json.xmlInput")}</div>
              <Textarea
                placeholder={t("tools.xml-to-json.xmlPlaceholder")}
                value={xmlInput}
                onChange={(e) => setXmlInput(e.target.value)}
                rows={16}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={convertToJson} className="w-full">
              <FileJson className="h-4 w-4 mr-2" />
              {t("tools.xml-to-json.convertButton")}
            </Button>

            {jsonOutput && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{t("tools.xml-to-json.jsonOutput")}</div>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={jsonOutput}
                  readOnly
                  rows={16}
                  className="font-mono text-sm"
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.xml-to-json.whatIs")}
              </strong>{" "}
              {t("tools.xml-to-json.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("toolPage.sections.commonUseCases")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">{t("tools.xml-to-json.useCases.apiMigration.title")}</div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.xml-to-json.useCases.apiMigration.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.xml-to-json.useCases.dataProcessing.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.xml-to-json.useCases.dataProcessing.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Settings className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.xml-to-json.useCases.configFiles.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.xml-to-json.useCases.configFiles.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <FileCode className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.xml-to-json.useCases.webDevelopment.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.xml-to-json.useCases.webDevelopment.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              💡 {t("toolPage.sections.proTips")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.xml-to-json.proTips.attributes")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.xml-to-json.proTips.arrays")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.xml-to-json.proTips.structure")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.xml-to-json.proTips.validation")
                }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              Related Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/json-formatter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.json-formatter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.json-formatter.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/json-to-csv")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.json-to-csv.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.json-to-csv.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.base64.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.base64.description")}
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
