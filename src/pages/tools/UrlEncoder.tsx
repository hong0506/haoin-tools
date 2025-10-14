import { useState, useEffect } from "react";
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
  Link,
  Copy,
  ArrowRightLeft,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Link2,
  Zap,
  Info,
  Globe,
  Share2,
  Database,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const UrlEncoder = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
      toast.success(t("tools.url-encoder.encodeSuccess"));
    } catch (error) {
      toast.error(t("tools.url-encoder.encodeError"));
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
      toast.success(t("tools.url-encoder.decodeSuccess"));
    } catch (error) {
      toast.error(t("tools.url-encoder.decodeError"));
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success(t("tools.url-encoder.copied"));
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.success(t("tools.url-encoder.cleared"));
  };

  const loadExample = (type: "encode" | "decode") => {
    if (type === "encode") {
      setInput(t("tools.url-encoder.exampleText"));
      setOutput("");
    } else {
      setInput(t("tools.url-encoder.exampleEncoded"));
      setOutput("");
    }
    toast.success(t("tools.url-encoder.exampleLoaded"));
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
            <h1 className="text-xl font-semibold">
              {t("tools.url-encoder.title")}
            </h1>
            <div className="ml-auto"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.url-encoder.title")}</CardTitle>
                <CardDescription>
                  {t("tools.url-encoder.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="url-encoder"
                toolName={t("tools.url-encoder.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button
                onClick={() => loadExample("encode")}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("tools.url-encoder.encodeExample")}
              </Button>
              <Button
                onClick={() => loadExample("decode")}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("tools.url-encoder.decodeExample")}
              </Button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("tools.url-encoder.input")}
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("tools.url-encoder.placeholder")}
                className="min-h-[150px]"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1">
                {t("tools.url-encoder.encode")}
              </Button>
              <Button onClick={swap} variant="outline" size="icon">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <Button onClick={decode} className="flex-1">
                {t("tools.url-encoder.decode")}
              </Button>
            </div>

            {output && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("tools.url-encoder.output")}
                  </label>
                  <Button onClick={copyOutput} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea value={output} readOnly className="min-h-[150px]" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.url-encoder.whatIs")}
              </strong>{" "}
              {t("tools.url-encoder.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.url-encoder.useCases.webDevelopment.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.url-encoder.useCases.webDevelopment.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Link2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.url-encoder.useCases.apiIntegration.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.url-encoder.useCases.apiIntegration.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Share2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.url-encoder.useCases.socialSharing.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.url-encoder.useCases.socialSharing.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.url-encoder.useCases.dataStorage.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t("tools.url-encoder.useCases.dataStorage.description")}
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
                    __html: t("tools.url-encoder.proTips.spaces"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.url-encoder.proTips.specialChars"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.url-encoder.proTips.alwaysEncode"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.url-encoder.proTips.decodeFirst"),
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                onClick={() => navigate("/tools/hash-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.hash-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.hash-generator.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrlEncoder;
