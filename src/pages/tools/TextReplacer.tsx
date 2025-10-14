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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Replace,
  Zap,
  Info,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const TextReplacer = () => {
  const { t, i18n } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [resultText, setResultText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const navigate = useNavigate();

  const handleReplace = () => {
    if (!inputText) {
      toast.error(t("tools.text-replacer.pleaseEnterText"));
      return;
    }
    if (!findText) {
      toast.error(t("tools.text-replacer.pleaseEnterFind"));
      return;
    }

    try {
      let result = inputText;
      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(findText, flags);
        result = inputText.replace(regex, replaceText);
      } else {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(
          findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          flags
        );
        result = inputText.replace(regex, replaceText);
      }

      const count =
        inputText.match(new RegExp(findText, caseSensitive ? "g" : "gi"))
          ?.length || 0;
      setResultText(result);
      toast.success(t("tools.text-replacer.replacedCount", { count }));
    } catch (error) {
      toast.error(t("tools.text-replacer.invalidRegex"));
    }
  };

  const clearAll = () => {
    setInputText("");
    setFindText("");
    setReplaceText("");
    setResultText("");
    setCaseSensitive(false);
    setUseRegex(false);
    toast.success(t("tools.text-replacer.allFieldsCleared"));
  };

  const loadExample = () => {
    if (i18n.language === "zh") {
      setInputText("你好世界！欢迎来到编程的世界。");
      setFindText("世界");
      setReplaceText("宇宙");
    } else if (i18n.language === "es") {
      setInputText("¡Hola Mundo! Bienvenido al Mundo de la programación.");
      setFindText("Mundo");
      setReplaceText("Universo");
    } else {
      setInputText("Hello World! Welcome to the World of programming.");
      setFindText("World");
      setReplaceText("Universe");
    }
    toast.success(t("tools.text-replacer.exampleLoaded"));
  };

  const copyToClipboard = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      toast.success(t("tools.text-replacer.copiedToClipboard"));
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
            {t("tools.text-replacer.title")}
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
                <CardTitle>{t("tools.text-replacer.findAndReplace")}</CardTitle>
                <CardDescription>
                  {t("tools.text-replacer.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="text-replacer"
                toolName={t("tools.text-replacer.title")}
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
              <Label>{t("tools.text-replacer.inputText")}</Label>
              <Textarea
                placeholder={t("tools.text-replacer.inputPlaceholder")}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("tools.text-replacer.find")}</Label>
                <Input
                  placeholder={t("tools.text-replacer.findPlaceholder")}
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>{t("tools.text-replacer.replaceWith")}</Label>
                <Input
                  placeholder={t("tools.text-replacer.replacePlaceholder")}
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case-sensitive"
                  checked={caseSensitive}
                  onCheckedChange={(checked) =>
                    setCaseSensitive(checked as boolean)
                  }
                />
                <label
                  htmlFor="case-sensitive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("tools.text-replacer.caseSensitive")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="use-regex"
                  checked={useRegex}
                  onCheckedChange={(checked) => setUseRegex(checked as boolean)}
                />
                <label
                  htmlFor="use-regex"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("tools.text-replacer.useRegex")}
                </label>
              </div>
            </div>

            <Button onClick={handleReplace} className="w-full">
              <Replace className="h-4 w-4 mr-2" />
              {t("tools.text-replacer.replace")}
            </Button>

            {resultText && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>{t("tools.text-replacer.result")}</Label>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={resultText}
                  readOnly
                  rows={6}
                  className="mt-2"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.text-replacer.whatIs")}
              </strong>{" "}
              {t("tools.text-replacer.whatIsContent")}
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
                  <Replace className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.text-replacer.useCases.batch.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.text-replacer.useCases.batch.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.text-replacer.useCases.refactoring.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.text-replacer.useCases.refactoring.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.text-replacer.useCases.cleaning.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.text-replacer.useCases.cleaning.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Lightbulb className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.text-replacer.useCases.urls.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.text-replacer.useCases.urls.description")}
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
                    __html: t("tools.text-replacer.proTips.regex"),
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
                    __html: t("tools.text-replacer.proTips.global"),
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
                    __html: t("tools.text-replacer.proTips.caseMatch"),
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
                    __html: t("tools.text-replacer.proTips.testFirst"),
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
              <button
                onClick={() => navigate("/tools/case-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.case-converter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.case-converter.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-sorter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.text-sorter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.text-sorter.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextReplacer;
