import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
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
  Clock,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Database,
  Code2,
  Calendar,
  Server,
  Link,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const TimestampConverter = () => {
  const { t } = useTranslation();
  const [timestamp, setTimestamp] = useState(
    Math.floor(Date.now() / 1000).toString()
  );
  const [humanDate, setHumanDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timestampToDate = () => {
    try {
      const date = new Date(parseInt(timestamp) * 1000);
      setHumanDate(date.toISOString().slice(0, 16));
      toast.success(t("tools.timestamp-converter.convertedToDate"));
    } catch (error) {
      toast.error(t("tools.timestamp-converter.invalidTimestamp"));
    }
  };

  const dateToTimestamp = () => {
    try {
      const date = new Date(humanDate);
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
      toast.success(t("tools.timestamp-converter.convertedToTimestamp"));
    } catch (error) {
      toast.error(t("tools.timestamp-converter.invalidDate"));
    }
  };

  const getCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
    toast.success(t("tools.timestamp-converter.currentTimestampSet"));
  };

  const getCurrentDate = () => {
    setHumanDate(new Date().toISOString().slice(0, 16));
    toast.success(t("tools.timestamp-converter.currentDateSet"));
  };

  const copyTimestamp = () => {
    navigator.clipboard.writeText(timestamp);
    toast.success(t("toolPage.messages.copied"));
  };

  const clearAll = () => {
    setTimestamp("");
    setHumanDate("");
    toast.success(t("tools.timestamp-converter.allFieldsCleared"));
  };

  const loadExample = () => {
    setTimestamp("1609459200"); // 2021-01-01 00:00:00 UTC
    setHumanDate("2021-01-01T00:00");
    toast.success(t("tools.timestamp-converter.exampleLoaded"));
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
              {t("tools.timestamp-converter.title")}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.timestamp-converter.title")}</CardTitle>
                <CardDescription>
                  {t("tools.timestamp-converter.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="timestamp-converter"
                toolName={t("tools.timestamp-converter.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t("tools.timestamp-converter.unixTimestamp")}
                </label>
                <div className="flex gap-2">
                  <Input
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    placeholder="1234567890"
                    className="font-mono"
                  />
                  <Button onClick={copyTimestamp} size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={timestampToDate} className="flex-1">
                  {t("tools.timestamp-converter.convertToDate")}
                </Button>
                <Button onClick={getCurrentTimestamp} variant="outline">
                  {t("tools.timestamp-converter.currentTime")}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t("tools.timestamp-converter.humanDate")}
                </label>
                <Input
                  type="datetime-local"
                  value={humanDate}
                  onChange={(e) => setHumanDate(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={dateToTimestamp} className="flex-1">
                  {t("tools.timestamp-converter.convertToTimestamp")}
                </Button>
                <Button onClick={getCurrentDate} variant="outline">
                  {t("tools.timestamp-converter.currentTime")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.timestamp-converter.whatIs")}
              </strong>{" "}
              {t("tools.timestamp-converter.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.timestamp-converter.useCases.database.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t(
                      "tools.timestamp-converter.useCases.database.description"
                    )}{" "}
                    <Badge variant="secondary" className="mx-1">
                      SQL
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.timestamp-converter.useCases.api.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.timestamp-converter.useCases.api.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Server className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.timestamp-converter.useCases.logs.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.timestamp-converter.useCases.logs.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Calendar className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.timestamp-converter.useCases.data.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.timestamp-converter.useCases.data.description")}
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
              💡 {t("toolPage.sections.proTips")}
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
                    __html: t("tools.timestamp-converter.proTips.startDate"),
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
                    __html: t("tools.timestamp-converter.proTips.units"),
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
                    __html: t("tools.timestamp-converter.proTips.utc"),
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
                    __html: t("tools.timestamp-converter.proTips.precision"),
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
              {t("toolPage.sections.relatedTools")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/date-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.date-calculator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.date-calculator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/age-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.age-calculator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.age-calculator.description")}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimestampConverter;
