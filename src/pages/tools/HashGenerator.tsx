import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Fingerprint,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Shield,
  Zap,
  Info,
  Lock,
  FileCheck,
  Key,
  Link
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const HashGenerator = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<{
    md5: string;
    sha1: string;
    sha256: string;
  }>({
    md5: "",
    sha1: "",
    sha256: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateHashes = async () => {
    if (!text) {
      toast.error(t("tools.hash-generator.pleaseEnterText"));
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const sha1 = await crypto.subtle.digest("SHA-1", data);
    const sha256 = await crypto.subtle.digest("SHA-256", data);

    const toHex = (buffer: ArrayBuffer) => {
      return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    setHashes({
      md5: t("tools.hash-generator.md5NotAvailable"),
      sha1: toHex(sha1),
      sha256: toHex(sha256),
    });

    toast.success(t("tools.hash-generator.hashesGenerated"));
  };

  const copyHash = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    toast.success(t("tools.hash-generator.copiedToClipboard", { type }));
  };

  const clearAll = () => {
    setText("");
    setHashes({ md5: "", sha1: "", sha256: "" });
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    setText(t("tools.hash-generator.exampleText"));
    setHashes({ md5: "", sha1: "", sha256: "" });
    toast.success(t("toolPage.messages.exampleLoaded"));
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
          <div className="flex items-center gap-2 flex-1">
            <Fingerprint className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.hash-generator.title")}
            </h1>
          </div>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {t("tools.hash-generator.generateHashes")}
                </CardTitle>
                <CardDescription>
                  {t("tools.hash-generator.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="hash-generator"
                toolName={t("tools.hash-generator.title")}
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
              <label className="mb-2 block text-sm font-medium">
                {t("tools.hash-generator.inputText")}
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("tools.hash-generator.placeholder")}
                className="min-h-[150px]"
              />
            </div>

            <Button onClick={generateHashes} className="w-full">
              {t("tools.hash-generator.generateHashes")}
            </Button>

            {hashes.sha1 && (
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SHA-1
                  </label>
                  <div className="flex gap-2">
                    <Input value={hashes.sha1} readOnly className="font-mono" />
                    <Button
                      onClick={() => copyHash(hashes.sha1, "SHA-1")}
                      size="icon"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SHA-256
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={hashes.sha256}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      onClick={() => copyHash(hashes.sha256, "SHA-256")}
                      size="icon"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.hash-generator.whatIs")}
              </strong>{" "}
              {t("tools.hash-generator.whatIsContent")}
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
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.hash-generator.useCases.passwordSecurity.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t(
                      "tools.hash-generator.useCases.passwordSecurity.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileCheck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.hash-generator.useCases.fileIntegrity.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t(
                      "tools.hash-generator.useCases.fileIntegrity.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Key className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.hash-generator.useCases.apiAuthentication.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t(
                      "tools.hash-generator.useCases.apiAuthentication.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Shield className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.hash-generator.useCases.dataSecurity.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t(
                      "tools.hash-generator.useCases.dataSecurity.description"
                    )}
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
                    __html: t("tools.hash-generator.proTips.sha256"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.hash-generator.proTips.oneWay"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.hash-generator.proTips.avoidMd5"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.hash-generator.proTips.verification"),
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
                onClick={() => navigate("/tools/password-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.password-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.password-generator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.uuid-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.uuid-generator.description")}
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

export default HashGenerator;
