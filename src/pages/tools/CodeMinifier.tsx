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
  Minimize2,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Code2,
  Zap,
  Info,
  FileCode,
  Gauge,
  Rocket,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CodeMinifier = () => {
  const { t } = useTranslation();
  const [htmlInput, setHtmlInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [cssInput, setCssInput] = useState("");
  const [cssOutput, setCssOutput] = useState("");
  const [jsInput, setJsInput] = useState("");
  const [jsOutput, setJsOutput] = useState("");
  const [activeTab, setActiveTab] = useState("html");
  const navigate = useNavigate();

  const minifyHtml = () => {
    if (!htmlInput.trim()) {
      toast.error(t("tools.code-minifier.pleaseEnterHtml"));
      return;
    }
    try {
      let minified = htmlInput
        .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/>\s+</g, "><") // Remove spaces between tags
        .replace(/\s+(\/?>)/g, "$1") // Remove spaces before closing brackets
        .trim();
      setHtmlOutput(minified);
      const reduction = (
        ((htmlInput.length - minified.length) / htmlInput.length) *
        100
      ).toFixed(1);
      toast.success(t("tools.code-minifier.htmlMinified", { reduction }));
    } catch (error) {
      toast.error(t("tools.code-minifier.errorMinifyingHtml"));
    }
  };

  const minifyCss = () => {
    if (!cssInput.trim()) {
      toast.error(t("tools.code-minifier.pleaseEnterCss"));
      return;
    }
    try {
      let minified = cssInput
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\s*{\s*/g, "{") // Remove spaces around {
        .replace(/\s*}\s*/g, "}") // Remove spaces around }
        .replace(/\s*;\s*/g, ";") // Remove spaces around ;
        .replace(/\s*:\s*/g, ":") // Remove spaces around :
        .replace(/;\s*}/g, "}") // Remove last semicolon
        .trim();
      setCssOutput(minified);
      const reduction = (
        ((cssInput.length - minified.length) / cssInput.length) *
        100
      ).toFixed(1);
      toast.success(t("tools.code-minifier.cssMinified", { reduction }));
    } catch (error) {
      toast.error(t("tools.code-minifier.errorMinifyingCss"));
    }
  };

  const minifyJs = () => {
    if (!jsInput.trim()) {
      toast.error(t("tools.code-minifier.pleaseEnterJs"));
      return;
    }
    try {
      let minified = jsInput
        .replace(/\/\/.*$/gm, "") // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\s*([=+\-*/<>!&|,;:{}()\[\]])\s*/g, "$1") // Remove spaces around operators
        .trim();
      setJsOutput(minified);
      const reduction = (
        ((jsInput.length - minified.length) / jsInput.length) *
        100
      ).toFixed(1);
      toast.success(t("tools.code-minifier.jsMinified", { reduction }));
    } catch (error) {
      toast.error(t("tools.code-minifier.errorMinifyingJs"));
    }
  };

  const copyOutput = (output: string, type: string) => {
    navigator.clipboard.writeText(output);
    toast.success(t("tools.code-minifier.copiedToClipboard", { type }));
  };

  const clearAll = () => {
    setHtmlInput("");
    setHtmlOutput("");
    setCssInput("");
    setCssOutput("");
    setJsInput("");
    setJsOutput("");
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    if (activeTab === "html") {
      setHtmlInput(t("tools.code-minifier.exampleHtml"));
      toast.success(t("toolPage.messages.exampleLoaded"));
    } else if (activeTab === "css") {
      setCssInput(t("tools.code-minifier.exampleCss"));
      toast.success(t("toolPage.messages.exampleLoaded"));
    } else if (activeTab === "javascript") {
      setJsInput(t("tools.code-minifier.exampleJs"));
      toast.success(t("toolPage.messages.exampleLoaded"));
    }
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
          <div className="flex items-center gap-2">
            <Minimize2 className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.code-minifier.title")}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.code-minifier.minifyCode")}</CardTitle>
                <CardDescription>
                  {t("tools.code-minifier.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="code-minifier"
                toolName={t("tools.code-minifier.title")}
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

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.code-minifier.htmlInput")}
                  </label>
                  <Textarea
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    placeholder={t("tools.code-minifier.htmlPlaceholder")}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {t("tools.code-minifier.size")}: {htmlInput.length} {t("tools.code-minifier.bytes")}
                  </div>
                </div>

                <Button onClick={minifyHtml} className="w-full">
                  <Minimize2 className="h-4 w-4 mr-2" />
                  {t("tools.code-minifier.minifyHtml")}
                </Button>

                {htmlOutput && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {t("tools.code-minifier.minifiedOutput")}
                      </label>
                      <Button
                        onClick={() => copyOutput(htmlOutput, "HTML")}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        {t("toolPage.buttons.copy")}
                      </Button>
                    </div>
                    <Textarea
                      value={htmlOutput}
                      readOnly
                      className="min-h-[150px] font-mono text-sm bg-green-50/50"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {t("tools.code-minifier.size")}: {htmlOutput.length} {t("tools.code-minifier.bytes")} (
                      {(
                        ((htmlInput.length - htmlOutput.length) /
                          htmlInput.length) *
                        100
                      ).toFixed(1)}
                      % {t("tools.code-minifier.reduction")})
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="css" className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.code-minifier.cssInput")}
                  </label>
                  <Textarea
                    value={cssInput}
                    onChange={(e) => setCssInput(e.target.value)}
                    placeholder={t("tools.code-minifier.cssPlaceholder")}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {t("tools.code-minifier.size")}: {cssInput.length} {t("tools.code-minifier.bytes")}
                  </div>
                </div>

                <Button onClick={minifyCss} className="w-full">
                  <Minimize2 className="h-4 w-4 mr-2" />
                  {t("tools.code-minifier.minifyCss")}
                </Button>

                {cssOutput && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {t("tools.code-minifier.minifiedOutput")}
                      </label>
                      <Button
                        onClick={() => copyOutput(cssOutput, "CSS")}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        {t("toolPage.buttons.copy")}
                      </Button>
                    </div>
                    <Textarea
                      value={cssOutput}
                      readOnly
                      className="min-h-[150px] font-mono text-sm bg-blue-50/50"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {t("tools.code-minifier.size")}: {cssOutput.length} {t("tools.code-minifier.bytes")} (
                      {(
                        ((cssInput.length - cssOutput.length) /
                          cssInput.length) *
                        100
                      ).toFixed(1)}
                      % {t("tools.code-minifier.reduction")})
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="javascript" className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.code-minifier.jsInput")}
                  </label>
                  <Textarea
                    value={jsInput}
                    onChange={(e) => setJsInput(e.target.value)}
                    placeholder={t("tools.code-minifier.jsPlaceholder")}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {t("tools.code-minifier.size")}: {jsInput.length} {t("tools.code-minifier.bytes")}
                  </div>
                </div>

                <Button onClick={minifyJs} className="w-full">
                  <Minimize2 className="h-4 w-4 mr-2" />
                  {t("tools.code-minifier.minifyJs")}
                </Button>

                {jsOutput && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {t("tools.code-minifier.minifiedOutput")}
                      </label>
                      <Button
                        onClick={() => copyOutput(jsOutput, "JavaScript")}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        {t("toolPage.buttons.copy")}
                      </Button>
                    </div>
                    <Textarea
                      value={jsOutput}
                      readOnly
                      className="min-h-[150px] font-mono text-sm bg-purple-50/50"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {t("tools.code-minifier.size")}: {jsOutput.length} {t("tools.code-minifier.bytes")} (
                      {(
                        ((jsInput.length - jsOutput.length) / jsInput.length) *
                        100
                      ).toFixed(1)}
                      % {t("tools.code-minifier.reduction")})
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.code-minifier.whatIs")}
              </strong>{" "}
              {t("tools.code-minifier.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("toolPage.sections.commonUseCases")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Rocket className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.code-minifier.useCases.performance.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.code-minifier.useCases.performance.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Gauge className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.code-minifier.useCases.bandwidth.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.code-minifier.useCases.bandwidth.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.code-minifier.useCases.production.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.code-minifier.useCases.production.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileCode className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.code-minifier.useCases.seo.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t("tools.code-minifier.useCases.seo.description")}
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
              💡 {t("toolPage.sections.proTips")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.code-minifier.proTips.development"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.code-minifier.proTips.production"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.code-minifier.proTips.testing"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.code-minifier.proTips.backup"),
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
                onClick={() => navigate("/tools/html-to-text")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.html-to-text.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.html-to-text.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.base64-encoder.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.base64-encoder.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeMinifier;
