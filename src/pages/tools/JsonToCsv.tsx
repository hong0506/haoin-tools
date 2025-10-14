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
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const navigate = useNavigate();

  const convertToCSV = () => {
    if (!jsonInput.trim()) {
      toast.error(t('tools.json-to-csv.errors.enterJson'));
      return;
    }

    try {
      const data = JSON.parse(jsonInput);
      
      if (!Array.isArray(data)) {
        toast.error(t('tools.json-to-csv.errors.mustBeArray'));
        return;
      }
      
      if (data.length === 0) {
        toast.error(t('tools.json-to-csv.errors.arrayEmpty'));
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
      toast.success(t('tools.json-to-csv.convertSuccess'));
    } catch (error) {
      toast.error(t('tools.json-to-csv.errors.invalidJson'));
    }
  };

  const downloadCSV = () => {
    if (!csvOutput) {
      toast.error(t('tools.json-to-csv.errors.noCsvToDownload'));
      return;
    }

    const blob = new Blob([csvOutput], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t('tools.json-to-csv.downloaded'));
  };

  const copyToClipboard = () => {
    if (csvOutput) {
      navigator.clipboard.writeText(csvOutput);
      toast.success(t('common.copied'));
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setCsvOutput("");
    toast.success(t('toolPage.messages.cleared'));
  };

  const loadExample = () => {
    const exampleJSON = t('tools.json-to-csv.exampleJson');
    setJsonInput(exampleJSON);
    toast.success(t('toolPage.messages.exampleLoaded'));
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
          <h1 className="text-xl font-semibold flex-1">{t('tools.json-to-csv.title')}</h1>
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
                <CardTitle>{t('tools.json-to-csv.title')}</CardTitle>
                <CardDescription>
                  {t('tools.json-to-csv.description')}
                </CardDescription>
              </div>
              <FavoriteButton toolId="json-to-csv" toolName={t('tools.json-to-csv.title')} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('toolPage.buttons.clear')}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t('toolPage.buttons.loadExample')}
              </Button>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">{t('tools.json-to-csv.jsonInput')}</div>
              <Textarea
                placeholder={t('tools.json-to-csv.placeholder')}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={convertToCSV} className="w-full">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              {t('tools.json-to-csv.convert')}
            </Button>

            {csvOutput && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{t('tools.json-to-csv.csvOutput')}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      {t('toolPage.buttons.copy')}
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadCSV}>
                      <Download className="h-4 w-4 mr-2" />
                      {t('toolPage.buttons.download')}
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
                {t('tools.json-to-csv.whatIs')}
              </strong>{" "}
              {t('tools.json-to-csv.whatIsContent')}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t('toolPage.sections.commonUseCases')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Table className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t('tools.json-to-csv.useCases.excelExport.title')}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t('tools.json-to-csv.useCases.excelExport.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t('tools.json-to-csv.useCases.dataMigration.title')}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t('tools.json-to-csv.useCases.dataMigration.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <BarChart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t('tools.json-to-csv.useCases.dataAnalysis.title')}
                  </div>
                  <p className="text-sm text-green-700">
                    {t('tools.json-to-csv.useCases.dataAnalysis.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileJson className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t('tools.json-to-csv.useCases.apiResponses.title')}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t('tools.json-to-csv.useCases.apiResponses.description')}
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
              💡 {t('toolPage.sections.proTips')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.json-to-csv.proTips.arrayRequired'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.json-to-csv.proTips.excelCompatible'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.json-to-csv.proTips.autoHeaders'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.json-to-csv.proTips.download'),
                  }}
                />
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
                onClick={() => navigate("/tools/csv-to-json")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.csv-to-json.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.csv-to-json.description')}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/json-formatter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.json-formatter.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.json-formatter.description')}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/xml-to-json")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.xml-to-json.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.xml-to-json.description')}
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
