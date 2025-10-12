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
  Database,
  Copy,
  Zap,
  Info,
  Code2,
  FileText,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const SqlFormatter = () => {
  const { t } = useTranslation();
  const [sqlInput, setSqlInput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const navigate = useNavigate();

  const formatSql = () => {
    if (!sqlInput.trim()) {
      toast.error(t("tools.sql-formatter.pleaseEnterSql"));
      return;
    }
    try {
      let formatted = sqlInput
        .replace(
          /\b(SELECT|FROM|WHERE|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|ORDER BY|GROUP BY|HAVING|LIMIT|UNION)\b/gi,
          "\n$1"
        )
        .replace(/\b(AND|OR)\b/gi, "\n  $1")
        .replace(/\(/g, "\n  (")
        .replace(/\)/g, ")\n")
        .replace(/\s+/g, " ")
        .replace(/\n\s*\n/g, "\n")
        .trim();
      const keywords = [
        "SELECT",
        "FROM",
        "WHERE",
        "JOIN",
        "INNER",
        "LEFT",
        "RIGHT",
        "OUTER",
        "ON",
        "AND",
        "OR",
        "ORDER BY",
        "GROUP BY",
        "HAVING",
        "LIMIT",
        "INSERT",
        "UPDATE",
        "DELETE",
        "CREATE",
        "DROP",
        "ALTER",
        "TABLE",
        "AS",
        "IN",
        "NOT",
        "NULL",
        "IS",
        "LIKE",
        "BETWEEN",
        "DISTINCT",
        "COUNT",
        "SUM",
        "AVG",
        "MAX",
        "MIN",
        "UNION",
        "ALL",
      ];
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        formatted = formatted.replace(regex, keyword.toUpperCase());
      });
      setSqlOutput(formatted);
      toast.success(t("tools.sql-formatter.formattedSuccessfully"));
    } catch (error) {
      toast.error(t("tools.sql-formatter.errorFormatting"));
    }
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
          <h1 className="text-xl font-semibold flex-1">
            {t("tools.sql-formatter.title")}
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
                  {t("tools.sql-formatter.formatSqlQueries")}
                </CardTitle>
                <CardDescription>
                  {t("tools.sql-formatter.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="sql-formatter"
                toolName={t("tools.sql-formatter.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => {
                  setSqlInput("");
                  setSqlOutput("");
                  toast.success(t("toolPage.messages.cleared"));
                }}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button
                onClick={() => {
                  setSqlInput(t("tools.sql-formatter.exampleSql"));
                  toast.success(t("toolPage.messages.exampleLoaded"));
                }}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">
                {t("tools.sql-formatter.sqlInput")}
              </div>
              <Textarea
                placeholder={t("tools.sql-formatter.placeholder")}
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>
            <Button onClick={formatSql} className="w-full">
              <Database className="h-4 w-4 mr-2" />
              {t("tools.sql-formatter.formatSql")}
            </Button>
            {sqlOutput && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    {t("tools.sql-formatter.formattedSql")}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(sqlOutput);
                      toast.success(t("toolPage.messages.copied"));
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={sqlOutput}
                  readOnly
                  rows={10}
                  className="font-mono text-sm bg-green-50 dark:bg-green-950/20"
                />
              </>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.sql-formatter.whatIs")}
              </strong>{" "}
              {t("tools.sql-formatter.whatIsContent")}
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
                  <Code2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.sql-formatter.useCases.codeReview.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.sql-formatter.useCases.codeReview.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.sql-formatter.useCases.documentation.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t(
                      "tools.sql-formatter.useCases.documentation.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Settings className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.sql-formatter.useCases.debugging.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.sql-formatter.useCases.debugging.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.sql-formatter.useCases.learning.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t("tools.sql-formatter.useCases.learning.description")}
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
                    __html: t("tools.sql-formatter.proTips.keywords"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.sql-formatter.proTips.indentation"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.sql-formatter.proTips.lineBreaks"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.sql-formatter.proTips.consistency"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("tools.sql-formatter.relatedTools")}</CardTitle>
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
                onClick={() => navigate("/tools/csv-to-json")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.csv-to-json.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.csv-to-json.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/code-minifier")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.code-minifier.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.code-minifier.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SqlFormatter;
