import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Send,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Globe,
  Zap,
  Info,
  CheckCircle,
  XCircle,
  Loader2,
  Code2,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiTester = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const navigate = useNavigate();

  const sendRequest = async () => {
    if (!url.trim()) {
      toast.error(t("tools.api-tester.pleaseEnterUrl"));
      return;
    }

    setLoading(true);
    const startTime = performance.now();

    try {
      let parsedHeaders: Record<string, string> = {};
      try {
        parsedHeaders = JSON.parse(headers);
      } catch {
        toast.error(t("tools.api-tester.invalidJsonHeaders"));
        setLoading(false);
        return;
      }

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaders,
        },
      };

      if (method !== "GET" && method !== "HEAD" && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));

      setStatusCode(res.status);

      const contentType = res.headers.get("content-type");
      let responseData;

      if (contentType?.includes("application/json")) {
        responseData = await res.json();
        setResponse(JSON.stringify(responseData, null, 2));
      } else {
        responseData = await res.text();
        setResponse(responseData);
      }

      toast.success(t("tools.api-tester.requestCompleted", { status: res.status }));
    } catch (error) {
      setStatusCode(null);
      setResponse(
        `Error: ${error instanceof Error ? error.message : "Request failed"}`
      );
      toast.error(t("tools.api-tester.requestFailed"));
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    toast.success(t("tools.api-tester.responseCopied"));
  };

  const clearAll = () => {
    setUrl("");
    setMethod("GET");
    setHeaders("{}");
    setBody("");
    setResponse("");
    setStatusCode(null);
    setResponseTime(null);
    toast.success(t("tools.api-tester.allFieldsCleared"));
  };

  const loadExample = () => {
    setUrl("https://jsonplaceholder.typicode.com/posts/1");
    setMethod("GET");
    setHeaders("{}");
    setBody("");
    setResponse("");
    setStatusCode(null);
    setResponseTime(null);
    toast.success(t("tools.api-tester.exampleLoaded"));
  };

  const loadPostExample = () => {
    setUrl("https://jsonplaceholder.typicode.com/posts");
    setMethod("POST");
    setHeaders("{}");
    setBody(
      JSON.stringify(
        {
          title: "Test Post",
          body: "This is a test post",
          userId: 1,
        },
        null,
        2
      )
    );
    setResponse("");
    setStatusCode(null);
    setResponseTime(null);
    toast.success(t("tools.api-tester.postExampleLoaded"));
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
            <Globe className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">{t("tools.api-tester.title")}</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.api-tester.testApiEndpoints")}</CardTitle>
                <CardDescription>
                  {t("tools.api-tester.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton toolId="api-tester" toolName={t("tools.api-tester.title")} />
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
                {t("tools.api-tester.getExample")}
              </Button>
              <Button onClick={loadPostExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("tools.api-tester.postExample")}
              </Button>
            </div>

            <div className="flex gap-2">
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                  <SelectItem value="HEAD">HEAD</SelectItem>
                  <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                </SelectContent>
              </Select>

              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("tools.api-tester.urlPlaceholder")}
                className="flex-1"
              />

              <Button onClick={sendRequest} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t("tools.api-tester.sending")}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {t("tools.api-tester.send")}
                  </>
                )}
              </Button>
            </div>

            <Tabs defaultValue="headers" className="w-full">
              <TabsList>
                <TabsTrigger value="headers">{t("tools.api-tester.tabs.headers")}</TabsTrigger>
                <TabsTrigger value="body">{t("tools.api-tester.tabs.body")}</TabsTrigger>
              </TabsList>

              <TabsContent value="headers" className="space-y-2">
                <label className="text-sm font-medium">
                  {t("tools.api-tester.requestHeaders")}
                </label>
                <Textarea
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  placeholder={t("tools.api-tester.requestHeadersPlaceholder")}
                  className="min-h-[100px] font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="body" className="space-y-2">
                <label className="text-sm font-medium">{t("tools.api-tester.requestBody")}</label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={t("tools.api-tester.requestBodyPlaceholder")}
                  className="min-h-[150px] font-mono text-sm"
                  disabled={method === "GET" || method === "HEAD"}
                />
                {(method === "GET" || method === "HEAD") && (
                  <p className="text-xs text-muted-foreground">
                    {t("tools.api-tester.bodyNotAvailable", { method })}
                  </p>
                )}
              </TabsContent>
            </Tabs>

            {statusCode !== null && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  statusCode >= 200 && statusCode < 300
                    ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                    : statusCode >= 400
                    ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                    : "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                }`}
              >
                {statusCode >= 200 && statusCode < 300 ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <div className="flex-1">
                  <div className="font-semibold dark:text-gray-200">
                    {t("tools.api-tester.status")}: {statusCode}{" "}
                    {statusCode >= 200 && statusCode < 300
                      ? t("tools.api-tester.success")
                      : statusCode >= 400
                      ? t("tools.api-tester.error")
                      : t("tools.api-tester.info")}
                  </div>
                  {responseTime && (
                    <div className="text-sm text-muted-foreground">
                      {t("tools.api-tester.responseTime", { time: responseTime })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {response && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">{t("tools.api-tester.response")}</label>
                  <Button onClick={copyResponse} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={response}
                  readOnly
                  className="min-h-[250px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">{t("tools.api-tester.whatIs")}</strong>{" "}
              {t("tools.api-tester.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.api-tester.useCases.apiDevelopment.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.api-tester.useCases.apiDevelopment.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">{t("tools.api-tester.useCases.debugging.title")}</div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.api-tester.useCases.debugging.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.api-tester.useCases.integration.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.api-tester.useCases.integration.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Send className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">{t("tools.api-tester.useCases.quickTests.title")}</div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.api-tester.useCases.quickTests.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              {t("toolPage.sections.proTips")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.api-tester.proTips.cors")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.api-tester.proTips.authentication")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.api-tester.proTips.json")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.api-tester.proTips.statusCodes")
                }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HTTP Methods */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("tools.api-tester.httpMethods")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Badge>GET</Badge>
                <span className="text-sm dark:text-gray-300">{t("tools.api-tester.methods.get")}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Badge>POST</Badge>
                <span className="text-sm dark:text-gray-300">{t("tools.api-tester.methods.post")}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Badge>PUT</Badge>
                <span className="text-sm dark:text-gray-300">{t("tools.api-tester.methods.put")}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Badge>PATCH</Badge>
                <span className="text-sm dark:text-gray-300">{t("tools.api-tester.methods.patch")}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Badge>DELETE</Badge>
                <span className="text-sm dark:text-gray-300">{t("tools.api-tester.methods.delete")}</span>
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
                onClick={() => navigate("/tools/jwt-decoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.jwt-decoder.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.jwt-decoder.description")}
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

export default ApiTester;
