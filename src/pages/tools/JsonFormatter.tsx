import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Braces,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Code2,
  Zap,
  Info,
  FileJson,
  Database,
  Settings,
  Link,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const JsonFormatter = () => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      toast.success(t("tools.json-formatter.formatSuccess"));
    } catch (error) {
      toast.error(t("tools.json-formatter.invalidJson"));
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      toast.success(t("tools.json-formatter.minifySuccess"));
    } catch (error) {
      toast.error(t("tools.json-formatter.invalidJson"));
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success(t("common.copied"));
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    let exampleJson;
    if (i18n.language === "zh") {
      exampleJson = `{
  "姓名": "张三",
  "年龄": 30,
  "邮箱": "zhangsan@example.com",
  "地址": {
    "街道": "中山路123号",
    "城市": "北京",
    "国家": "中国"
  },
  "爱好": ["阅读", "游泳", "编程"],
  "激活状态": true
}`;
    } else if (i18n.language === "es") {
      exampleJson = `{
  "nombre": "Juan Pérez",
  "edad": 30,
  "correo": "juan@ejemplo.com",
  "direccion": {
    "calle": "Calle Mayor 123",
    "ciudad": "Madrid",
    "pais": "España"
  },
  "pasatiempos": ["lectura", "natación", "programación"],
  "activo": true
}`;
    } else {
      exampleJson = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "swimming", "coding"],
  "isActive": true
}`;
    }
    setInput(exampleJson);
    setOutput("");
    toast.success(t("toolPage.messages.exampleLoaded"));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <Braces className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.json-formatter.title")}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.json-formatter.title")}</CardTitle>
                <CardDescription>
                  {t("tools.json-formatter.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="json-formatter"
                toolName={t("tools.json-formatter.title")}
              />
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
              <label className="text-sm font-medium mb-2 block">
                {t("tools.json-formatter.inputLabel")}
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value"}'
                className="min-h-[200px] font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={formatJson}>
                {t("tools.json-formatter.format")}
              </Button>
              <Button onClick={minifyJson} variant="outline">
                {t("tools.json-formatter.minify")}
              </Button>
            </div>

            {output && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("tools.json-formatter.outputLabel")}
                  </label>
                  <Button onClick={copyOutput} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[200px] font-mono"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.json-formatter.whatIs")}
              </strong>{" "}
              {t("tools.json-formatter.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("tools.json-formatter.useCases.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.json-formatter.useCases.api.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.json-formatter.useCases.api.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Settings className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.json-formatter.useCases.config.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.json-formatter.useCases.config.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.json-formatter.useCases.database.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.json-formatter.useCases.database.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileJson className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.json-formatter.useCases.debugging.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t("tools.json-formatter.useCases.debugging.description")}
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
              {t("tools.json-formatter.proTips.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.json-formatter.proTips.format"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.json-formatter.proTips.minify"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.json-formatter.proTips.validation"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.json-formatter.proTips.quotes"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              {t('toolPage.sections.relatedTools')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all bg-white"
              >
                <div className="font-semibold text-gray-900 mb-2">
                  {t("tools.base64-encoder.title")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("tools.base64-encoder.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/csv-to-json")}
                className="p-4 text-left rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all bg-white"
              >
                <div className="font-semibold text-gray-900 mb-2">
                  {t("tools.csv-to-json.title")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("tools.csv-to-json.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/url-encoder")}
                className="p-4 text-left rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all bg-white"
              >
                <div className="font-semibold text-gray-900 mb-2">
                  {t("tools.url-encoder.title")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("tools.url-encoder.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JsonFormatter;
