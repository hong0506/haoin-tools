import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Copy,
  ArrowDownUp,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  FileCode,
  Zap,
  Info,
  Mail,
  Key,
  Image,

} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const Base64Tool = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("encode");
  const navigate = useNavigate();

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      toast.success(t('tools.base64-encoder.encodeSuccess'));
    } catch (error) {
      toast.error(t('tools.base64-encoder.encodeError'));
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      toast.success(t('tools.base64-encoder.decodeSuccess'));
    } catch (error) {
      toast.error(t('tools.base64-encoder.decodeError'));
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error(t('toolPage.messages.noOutputToCopy'));
      return;
    }
    navigator.clipboard.writeText(output);
    toast.success(t('common.copied'));
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.success(t('toolPage.messages.cleared'));
  };

  const loadExample = (type: "encode" | "decode") => {
    if (type === "encode") {
      setInput(t('tools.base64-encoder.exampleText'));
      setOutput("");
    } else {
      setInput(t('tools.base64-encoder.exampleBase64'));
      setOutput("");
    }
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
          <h1 className="text-xl font-semibold flex-1">{t('tools.base64-encoder.title')}</h1>
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
                <CardTitle>{t('tools.base64-encoder.title')}</CardTitle>
                <CardDescription>
                  {t('tools.base64-encoder.description')}
                </CardDescription>
              </div>
              <FavoriteButton toolId="base64-encoder" toolName={t('tools.base64-encoder.title')} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('toolPage.buttons.clear')}
              </Button>
              <Button
                onClick={() => loadExample(activeTab as "encode" | "decode")}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {t('toolPage.buttons.loadExample')}
              </Button>
            </div>

            <Tabs
              defaultValue="encode"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="encode">{t('tools.base64-encoder.encode')}</TabsTrigger>
                <TabsTrigger value="decode">{t('tools.base64-encoder.decode')}</TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">
                    {t('tools.base64-encoder.inputLabel')}:
                  </label>
                  <Textarea
                    placeholder={t('tools.base64-encoder.placeholder')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                </div>

                <Button onClick={encode} className="w-full">
                  {t('tools.base64-encoder.encode')}
                </Button>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      {t('tools.base64-encoder.outputLabel')}:
                    </label>
                    <div className="flex gap-2">
                      <Button onClick={swap} size="sm" variant="outline">
                        <ArrowDownUp className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={copyToClipboard}
                        size="sm"
                        variant="outline"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    placeholder={t('tools.base64-encoder.encodedPlaceholder')}
                    className="min-h-[150px] font-mono"
                  />
                </div>
              </TabsContent>

              <TabsContent value="decode" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">
                    {t('tools.base64-encoder.base64Label')}:
                  </label>
                  <Textarea
                    placeholder={t('tools.base64-encoder.base64Placeholder')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                </div>

                <Button onClick={decode} className="w-full">
                  {t('tools.base64-encoder.decode')}
                </Button>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      {t('tools.base64-encoder.outputLabel')}:
                    </label>
                    <div className="flex gap-2">
                      <Button onClick={swap} size="sm" variant="outline">
                        <ArrowDownUp className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={copyToClipboard}
                        size="sm"
                        variant="outline"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    placeholder={t('tools.base64-encoder.decodedPlaceholder')}
                    className="min-h-[150px] font-mono"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t('tools.base64-encoder.whatIs')}
              </strong>{" "}
              {t('tools.base64-encoder.whatIsContent')}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
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
                  <Key className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t('tools.base64-encoder.useCases.api.title')}
                  </div>
                  <p
                    className="text-sm text-blue-700"
                    dangerouslySetInnerHTML={{
                      __html: t('tools.base64-encoder.useCases.api.description'),
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Image className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t('tools.base64-encoder.useCases.image.title')}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t('tools.base64-encoder.useCases.image.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t('tools.base64-encoder.useCases.email.title')}
                  </div>
                  <p className="text-sm text-green-700">
                    {t('tools.base64-encoder.useCases.email.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileCode className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t('tools.base64-encoder.useCases.dataUrl.title')}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t('tools.base64-encoder.useCases.dataUrl.description')}
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
                    __html: t('tools.base64-encoder.proTips.encoding'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.base64-encoder.proTips.security'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.base64-encoder.proTips.urls'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.base64-encoder.proTips.utf8'),
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
                onClick={() => navigate("/tools/url-encoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.url-encoder.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.url-encoder.description')}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/hash-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.hash-generator.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.hash-generator.description')}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Base64Tool;
