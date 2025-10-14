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
import { toast } from "sonner";
import {
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Code,
  FileText,
  Link as LinkIcon,
  Database,
  Zap,
  Info,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const CaseConverter = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [currentFormat, setCurrentFormat] = useState<string>("");
  const navigate = useNavigate();

  // Get the text to use for conversion (always use inputText as source)
  const getSourceText = () => inputText || convertedText;
  const displayText = convertedText || inputText;

  const convertCase = (type: string) => {
    const sourceText = inputText.trim() || convertedText.trim();
    if (!sourceText) {
      toast.error(t("toolPage.messages.enterText"));
      return;
    }

    let result = "";
    switch (type) {
      case "upper":
        result = sourceText.toUpperCase();
        break;
      case "lower":
        result = sourceText.toLowerCase();
        break;
      case "title":
        result = sourceText
          .toLowerCase()
          .split(/\s+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "sentence":
        result =
          sourceText.charAt(0).toUpperCase() +
          sourceText.slice(1).toLowerCase();
        break;
      case "camel":
        result = sourceText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case "snake":
        result = sourceText
          .replace(/[_-]/g, " ") // Replace existing underscores and hyphens with spaces
          .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
          .replace(/\W+/g, " ") // Replace any other non-word characters with spaces
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0)
          .join("_")
          .toLowerCase();
        break;
      case "kebab":
        result = sourceText
          .replace(/[_-]/g, " ") // Replace existing underscores and hyphens with spaces
          .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
          .replace(/\W+/g, " ") // Replace any other non-word characters with spaces
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0)
          .join("-")
          .toLowerCase();
        break;
      default:
        result = sourceText;
    }
    setConvertedText(result);
    setCurrentFormat(type);
    toast.success(t("toolPage.messages.textConverted"));
  };

  const handleTextChange = (value: string) => {
    setInputText(value);
    // Reset converted text when user types
    if (convertedText) {
      setConvertedText("");
      setCurrentFormat("");
    }
  };

  const copyToClipboard = () => {
    const textToCopy = displayText;
    navigator.clipboard.writeText(textToCopy);
    toast.success(t("toolPage.messages.copied"));
  };

  const clearText = () => {
    setInputText("");
    setConvertedText("");
    setCurrentFormat("");
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    setInputText(t("tools.case-converter.exampleText"));
    setConvertedText("");
    setCurrentFormat("");
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
          <h1 className="text-xl font-semibold flex-1">{t("tools.case-converter.title")}</h1>
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
            <CardTitle>{t("tools.case-converter.title")}</CardTitle>
            <CardDescription>
                  {t("tools.case-converter.description")}
            </CardDescription>
              </div>
              <FavoriteButton
                toolId="case-converter"
                toolName={t("tools.case-converter.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearText} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
            </div>

            <Textarea
              placeholder={t("toolPage.placeholder")}
              value={displayText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="min-h-[200px] font-mono"
            />

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => convertCase("upper")}
                variant={currentFormat === "upper" ? "default" : "secondary"}
              >
                UPPERCASE
              </Button>
              <Button
                onClick={() => convertCase("lower")}
                variant={currentFormat === "lower" ? "default" : "secondary"}
              >
                lowercase
              </Button>
              <Button
                onClick={() => convertCase("title")}
                variant={currentFormat === "title" ? "default" : "secondary"}
              >
                Title Case
              </Button>
              <Button
                onClick={() => convertCase("sentence")}
                variant={currentFormat === "sentence" ? "default" : "secondary"}
              >
                Sentence case
              </Button>
              <Button
                onClick={() => convertCase("camel")}
                variant={currentFormat === "camel" ? "default" : "secondary"}
              >
                camelCase
              </Button>
              <Button
                onClick={() => convertCase("snake")}
                variant={currentFormat === "snake" ? "default" : "secondary"}
              >
                snake_case
              </Button>
              <Button
                onClick={() => convertCase("kebab")}
                variant={currentFormat === "kebab" ? "default" : "secondary"}
              >
                kebab-case
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="ml-auto"
              >
                <Copy className="h-4 w-4" />
                {t("toolPage.buttons.copy")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Compact Stats - Only show when there's text */}
        {displayText && (
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-600">
                {displayText.length}
              </span>
              <span>{t("toolPage.stats.characters")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-purple-600">
                {
                  displayText
                    .trim()
                    .split(/\s+/)
                    .filter((w) => w).length
                }
              </span>
              <span>{t("toolPage.stats.words")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-green-600">
                {displayText.split("\n").length}
              </span>
              <span>{t("toolPage.stats.lines")}</span>
            </div>
          </div>
        )}

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("toolPage.sections.whatIs")} {t("tools.case-converter.title")}?
              </strong>{" "}
              {t("tools.case-converter.intro")}
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
                  <Code className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.case-converter.useCases.programming.title")}
                  </div>
                  <p
                    className="text-sm text-purple-700"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        "tools.case-converter.useCases.programming.description"
                      ),
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <LinkIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.case-converter.useCases.urlsCss.title")}
                  </div>
                  <p
                    className="text-sm text-blue-700"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        "tools.case-converter.useCases.urlsCss.description"
                      ),
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.case-converter.useCases.database.title")}
                  </div>
                  <p
                    className="text-sm text-green-700"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        "tools.case-converter.useCases.database.description"
                      ),
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.case-converter.useCases.content.title")}
                  </div>
                  <p
                    className="text-sm text-pink-700"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        "tools.case-converter.useCases.content.description"
                      ),
                    }}
                  />
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
                <p className="text-sm text-amber-900" dangerouslySetInnerHTML={{ __html: t("tools.case-converter.proTips.javascript") }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900" dangerouslySetInnerHTML={{ __html: t("tools.case-converter.proTips.python") }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900" dangerouslySetInnerHTML={{ __html: t("tools.case-converter.proTips.urls") }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900" dangerouslySetInnerHTML={{ __html: t("tools.case-converter.proTips.headings") }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-muted-foreground" />
              Related Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/word-counter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.word-counter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.word-counter.description")}
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
              <button
                onClick={() => navigate("/tools/text-diff")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.text-diff.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.text-diff.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseConverter;
