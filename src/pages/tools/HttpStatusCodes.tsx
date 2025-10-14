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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  Globe,
  Info,
  Zap,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCcw,
  Lightbulb,

} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { toast } from "sonner";

const HttpStatusCodes = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const clearSearch = () => {
    setSearchTerm("");
    toast.success(t("tools.http-status-codes.searchCleared"));
  };

  const loadExample = () => {
    setSearchTerm("404");
    toast.success(t("tools.http-status-codes.exampleLoaded"));
  };

  const getStatusCode = (code: number, category: string) => ({
    code,
    name: t(`tools.http-status-codes.codes.${code}.name`),
    description: t(`tools.http-status-codes.codes.${code}.description`),
    category,
  });

  const statusCodes = [
    // 1xx Informational
    getStatusCode(100, "1xx"),
    getStatusCode(101, "1xx"),

    // 2xx Success
    getStatusCode(200, "2xx"),
    getStatusCode(201, "2xx"),
    getStatusCode(202, "2xx"),
    getStatusCode(204, "2xx"),

    // 3xx Redirection
    getStatusCode(301, "3xx"),
    getStatusCode(302, "3xx"),
    getStatusCode(304, "3xx"),
    getStatusCode(307, "3xx"),
    getStatusCode(308, "3xx"),

    // 4xx Client Errors
    getStatusCode(400, "4xx"),
    getStatusCode(401, "4xx"),
    getStatusCode(403, "4xx"),
    getStatusCode(404, "4xx"),
    getStatusCode(405, "4xx"),
    getStatusCode(408, "4xx"),
    getStatusCode(409, "4xx"),
    getStatusCode(410, "4xx"),
    getStatusCode(413, "4xx"),
    getStatusCode(415, "4xx"),
    getStatusCode(429, "4xx"),

    // 5xx Server Errors
    getStatusCode(500, "5xx"),
    getStatusCode(501, "5xx"),
    getStatusCode(502, "5xx"),
    getStatusCode(503, "5xx"),
    getStatusCode(504, "5xx"),
  ];

  const filteredCodes = statusCodes.filter(
    (status) =>
      status.code.toString().includes(searchTerm) ||
      status.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "1xx":
        return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300";
      case "2xx":
        return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-300";
      case "3xx":
        return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-300";
      case "4xx":
        return "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-300";
      case "5xx":
        return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-300";
      default:
        return "bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-300";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "2xx":
        return (
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        );
      case "4xx":
        return (
          <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        );
      case "5xx":
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
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
          <h1 className="text-xl font-semibold flex-1">
            {t("tools.http-status-codes.title")}
          </h1>
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
                <CardTitle>
                  {t("tools.http-status-codes.httpStatusCodeReference")}
                </CardTitle>
                <CardDescription>
                  {t("tools.http-status-codes.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="http-status-codes"
                toolName={t("tools.http-status-codes.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearSearch} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("tools.http-status-codes.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="bg-blue-50">
                {t("tools.http-status-codes.categories.1xx")}
              </Badge>
              <Badge variant="outline" className="bg-green-50">
                {t("tools.http-status-codes.categories.2xx")}
              </Badge>
              <Badge variant="outline" className="bg-yellow-50">
                {t("tools.http-status-codes.categories.3xx")}
              </Badge>
              <Badge variant="outline" className="bg-orange-50">
                {t("tools.http-status-codes.categories.4xx")}
              </Badge>
              <Badge variant="outline" className="bg-red-50">
                {t("tools.http-status-codes.categories.5xx")}
              </Badge>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredCodes.map((status) => (
                <div
                  key={status.code}
                  className={`p-4 rounded-lg border ${getCategoryColor(
                    status.category
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    {getCategoryIcon(status.category)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-lg font-bold font-mono">
                          {status.code}
                        </code>
                        <span className="font-semibold">{status.name}</span>
                      </div>
                      <p className="text-sm opacity-90">{status.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCodes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {t("tools.http-status-codes.noResults", { term: searchTerm })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.http-status-codes.whatIs")}
              </strong>{" "}
              {t("tools.http-status-codes.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("tools.http-status-codes.quickCategoryGuide")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <div className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  {t("tools.http-status-codes.categoryGuide.2xx.title")}
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">
                  {t("tools.http-status-codes.categoryGuide.2xx.description")}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800">
                <div className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                  {t("tools.http-status-codes.categoryGuide.3xx.title")}
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  {t("tools.http-status-codes.categoryGuide.3xx.description")}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                <div className="font-semibold text-orange-900 dark:text-orange-300 mb-2">
                  {t("tools.http-status-codes.categoryGuide.4xx.title")}
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  {t("tools.http-status-codes.categoryGuide.4xx.description")}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                <div className="font-semibold text-red-900 dark:text-red-300 mb-2">
                  {t("tools.http-status-codes.categoryGuide.5xx.title")}
                </div>
                <p className="text-sm text-red-700 dark:text-red-400">
                  {t("tools.http-status-codes.categoryGuide.5xx.description")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              {t("tools.http-status-codes.mostCommonCodes")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.http-status-codes.commonCodes.200"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.http-status-codes.commonCodes.404"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.http-status-codes.commonCodes.500"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.http-status-codes.commonCodes.401"),
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
                onClick={() => navigate("/tools/api-tester")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.api-tester.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.api-tester.description")}
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
                onClick={() => navigate("/tools/regex-tester")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.regex-tester.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.regex-tester.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HttpStatusCodes;
