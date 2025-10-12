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
  KeyRound,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Shield,
  Zap,
  Info,
  Lock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const JwtDecoder = () => {
  const { t } = useTranslation();
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const decodeJwt = () => {
    try {
      if (!token.trim()) {
        toast.error(t("tools.jwt-decoder.pleaseEnterToken"));
        return;
      }

      const parts = token.split(".");
      if (parts.length !== 3) {
        toast.error(t("tools.jwt-decoder.invalidJwtFormat"));
        setIsValid(false);
        return;
      }

      // Decode header
      const decodedHeader = JSON.parse(
        atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))
      );
      setHeader(JSON.stringify(decodedHeader, null, 2));

      // Decode payload
      const decodedPayload = JSON.parse(
        atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      setPayload(JSON.stringify(decodedPayload, null, 2));

      // Signature (can't decode without secret)
      setSignature(parts[2]);

      setIsValid(true);
      toast.success(t("tools.jwt-decoder.decodedSuccessfully"));
    } catch (error) {
      toast.error(t("tools.jwt-decoder.invalidJwtToken"));
      setIsValid(false);
      setHeader("");
      setPayload("");
      setSignature("");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("tools.jwt-decoder.copiedToClipboard", { label }));
  };

  const clearAll = () => {
    setToken("");
    setHeader("");
    setPayload("");
    setSignature("");
    setIsValid(null);
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    const exampleToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    setToken(exampleToken);
    setHeader("");
    setPayload("");
    setSignature("");
    setIsValid(null);
    toast.success(t("toolPage.messages.exampleLoaded"));
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
            <KeyRound className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.jwt-decoder.title")}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.jwt-decoder.decodeJwtToken")}</CardTitle>
                <CardDescription>
                  {t("tools.jwt-decoder.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="jwt-decoder"
                toolName={t("tools.jwt-decoder.title")}
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
                {t("tools.jwt-decoder.jwtToken")}
              </label>
              <Textarea
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder={t("tools.jwt-decoder.placeholder")}
                className="min-h-[120px] font-mono text-sm"
              />
            </div>

            <Button onClick={decodeJwt} className="w-full">
              <KeyRound className="h-4 w-4 mr-2" />
              {t("tools.jwt-decoder.decodeJwt")}
            </Button>

            {isValid !== null && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  isValid
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {isValid ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      {t("tools.jwt-decoder.validJwtFormat")}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium text-red-900">
                      {t("tools.jwt-decoder.invalidJwtFormat")}
                    </span>
                  </>
                )}
              </div>
            )}

            {header && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("tools.jwt-decoder.header")}
                  </label>
                  <Button
                    onClick={() =>
                      copyToClipboard(header, t("tools.jwt-decoder.header"))
                    }
                    size="sm"
                    variant="ghost"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={header}
                  readOnly
                  className="min-h-[100px] font-mono text-sm bg-blue-50/50"
                />
              </div>
            )}

            {payload && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("tools.jwt-decoder.payload")}
                  </label>
                  <Button
                    onClick={() =>
                      copyToClipboard(payload, t("tools.jwt-decoder.payload"))
                    }
                    size="sm"
                    variant="ghost"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={payload}
                  readOnly
                  className="min-h-[150px] font-mono text-sm bg-purple-50/50"
                />
              </div>
            )}

            {signature && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("tools.jwt-decoder.signatureBase64")}
                  </label>
                  <Button
                    onClick={() =>
                      copyToClipboard(
                        signature,
                        t("tools.jwt-decoder.signature")
                      )
                    }
                    size="sm"
                    variant="ghost"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={signature}
                  readOnly
                  className="min-h-[80px] font-mono text-sm bg-amber-50/50"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  ⚠️ {t("tools.jwt-decoder.signatureWarning")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.jwt-decoder.whatIs")}
              </strong>{" "}
              {t("tools.jwt-decoder.whatIsContent")}
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
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.jwt-decoder.useCases.authentication.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.jwt-decoder.useCases.authentication.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.jwt-decoder.useCases.debugging.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.jwt-decoder.useCases.debugging.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Lock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.jwt-decoder.useCases.tokenAnalysis.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.jwt-decoder.useCases.tokenAnalysis.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <KeyRound className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.jwt-decoder.useCases.apiTesting.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t("tools.jwt-decoder.useCases.apiTesting.description")}
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
                    __html: t("tools.jwt-decoder.proTips.security"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.jwt-decoder.proTips.expiration"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.jwt-decoder.proTips.claims"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.jwt-decoder.proTips.verification"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("tools.jwt-decoder.relatedTools")}</CardTitle>
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

export default JwtDecoder;
