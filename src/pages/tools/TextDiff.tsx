import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  GitCompare,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Code2,
  Zap,
  Info,
  FileCheck,
  GitBranch,
  ScrollText,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const TextDiff = () => {
  const { t, i18n } = useTranslation();
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const navigate = useNavigate();

  const getDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLines = Math.max(lines1.length, lines2.length);
    const diff = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";
      if (line1 !== line2) {
        diff.push({ line: i + 1, text1: line1, text2: line2 });
      }
    }

    return diff;
  };

  const differences = getDiff();

  const clearAll = () => {
    setText1("");
    setText2("");
    toast.success(t("tools.text-diff.allFieldsCleared"));
  };

  const loadExample = () => {
    if (i18n.language === "zh") {
      setText1("你好世界！\n这是文本的第一个版本。\n这里有一些内容。");
      setText2(
        "你好宇宙！\n这是文本的第二个版本。\n这里有一些不同的内容。\n还有额外的一行。"
      );
    } else if (i18n.language === "es") {
      setText1(
        "¡Hola Mundo!\nEsta es la primera versión del texto.\nTiene algo de contenido aquí."
      );
      setText2(
        "¡Hola Universo!\nEsta es la segunda versión del texto.\nTiene contenido diferente aquí.\nY una línea adicional."
      );
    } else {
      setText1(
        "Hello World!\nThis is the first version of the text.\nIt has some content here."
      );
      setText2(
        "Hello Universe!\nThis is the second version of the text.\nIt has some different content here.\nAnd an extra line."
      );
    }
    toast.success(t("tools.text-diff.exampleLoaded"));
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
            <GitCompare className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.text-diff.title")}
            </h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.text-diff.compareText")}</CardTitle>
                <CardDescription>
                  {t("tools.text-diff.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="text-diff"
                toolName={t("tools.text-diff.title")}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t("tools.text-diff.text1")}
                </label>
                <Textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  rows={10}
                  placeholder={t("tools.text-diff.text1Placeholder")}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t("tools.text-diff.text2")}
                </label>
                <Textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  rows={10}
                  placeholder={t("tools.text-diff.text2Placeholder")}
                />
              </div>
            </div>
            {differences.length > 0 && (
              <div className="rounded-lg bg-secondary/50 p-4">
                <h3 className="font-semibold mb-2">
                  {t("tools.text-diff.differencesFound", {
                    count: differences.length,
                  })}
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {differences.map((diff, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-orange-500 pl-3 py-2 bg-background"
                    >
                      <p className="text-xs text-muted-foreground">
                        {t("tools.text-diff.line", { line: diff.line })}
                      </p>
                      <p className="text-sm bg-red-500/10 p-1 rounded">
                        - {diff.text1}
                      </p>
                      <p className="text-sm bg-green-500/10 p-1 rounded">
                        + {diff.text2}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {differences.length === 0 && text1 && text2 && (
              <div className="text-center text-green-500 font-semibold">
                {t("tools.text-diff.noDifferencesFound")}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.text-diff.whatIs")}
              </strong>{" "}
              {t("tools.text-diff.whatIsContent")}
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
                    {t("tools.text-diff.useCases.codeReview.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.text-diff.useCases.codeReview.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <GitBranch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.text-diff.useCases.versionControl.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.text-diff.useCases.versionControl.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <FileCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.text-diff.useCases.contentEditing.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.text-diff.useCases.contentEditing.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <ScrollText className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.text-diff.useCases.legalReview.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.text-diff.useCases.legalReview.description")}
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
                    __html: t("tools.text-diff.proTips.colorCoding"),
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
                    __html: t("tools.text-diff.proTips.lineByLine"),
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
                    __html: t("tools.text-diff.proTips.configFiles"),
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
                    __html: t("tools.text-diff.proTips.copyPaste"),
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextDiff;
