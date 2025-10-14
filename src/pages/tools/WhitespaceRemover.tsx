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
  Space,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Code2,
  FileText,
  AlignLeft,

} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const WhitespaceRemover = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeLineBreaks, setRemoveLineBreaks] = useState(false);
  const [removeTabs, setRemoveTabs] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const navigate = useNavigate();

  const processText = () => {
    if (!inputText.trim()) {
      toast.error(t("tools.whitespace-remover.enterTextFirst"));
      return;
    }

    let result = inputText;

    // Remove tabs
    if (removeTabs) {
      result = result.replace(/\t/g, " ");
    }

    // Remove extra spaces (multiple spaces to single space)
    if (removeExtraSpaces) {
      result = result.replace(/ +/g, " ");
    }

    // Trim each line
    if (trimLines) {
      result = result
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }

    // Remove line breaks
    if (removeLineBreaks) {
      result = result.replace(/\n+/g, " ");
    } else {
      // Remove empty lines
      result = result.replace(/\n\s*\n/g, "\n");
    }

    setOutputText(result.trim());
    toast.success(t("tools.whitespace-remover.whitespaceRemoved"));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast.success(t("tools.whitespace-remover.copiedToClipboard"));
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    toast.success(t("tools.whitespace-remover.allFieldsCleared"));
  };

  const loadExample = () => {
    setInputText(t("tools.whitespace-remover.exampleText"));
    setOutputText("");
    toast.success(t("tools.whitespace-remover.exampleLoaded"));
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
            <Space className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.whitespace-remover.title")}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {t("tools.whitespace-remover.removeWhitespace")}
                </CardTitle>
                <CardDescription>
                  {t("tools.whitespace-remover.cleanupText")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="whitespace-remover"
                toolName={t("tools.whitespace-remover.title")}
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
                {t("tools.whitespace-remover.inputText")}
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t("tools.whitespace-remover.inputPlaceholder")}
                className="min-h-[200px] font-mono text-sm"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {t("tools.whitespace-remover.characters")}: {inputText.length}
              </div>
            </div>

            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-sm font-medium mb-2">
                {t("tools.whitespace-remover.options")}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extra-spaces"
                  checked={removeExtraSpaces}
                  onCheckedChange={(checked) =>
                    setRemoveExtraSpaces(checked as boolean)
                  }
                />
                <label
                  htmlFor="extra-spaces"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("tools.whitespace-remover.removeExtraSpaces")}
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tabs"
                  checked={removeTabs}
                  onCheckedChange={(checked) =>
                    setRemoveTabs(checked as boolean)
                  }
                />
                <label
                  htmlFor="tabs"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("tools.whitespace-remover.removeTabs")}
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="trim-lines"
                  checked={trimLines}
                  onCheckedChange={(checked) =>
                    setTrimLines(checked as boolean)
                  }
                />
                <label
                  htmlFor="trim-lines"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("tools.whitespace-remover.trimLines")}
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="line-breaks"
                  checked={removeLineBreaks}
                  onCheckedChange={(checked) =>
                    setRemoveLineBreaks(checked as boolean)
                  }
                />
                <label
                  htmlFor="line-breaks"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("tools.whitespace-remover.removeLineBreaks")}
                </label>
              </div>
            </div>

            <Button onClick={processText} className="w-full">
              <Space className="h-4 w-4 mr-2" />
              {t("tools.whitespace-remover.removeWhitespace")}
            </Button>

            {outputText && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("tools.whitespace-remover.output")}
                  </label>
                  <Button onClick={copyToClipboard} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[200px] font-mono text-sm bg-green-50 dark:bg-green-950/20"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {t("tools.whitespace-remover.characters")}:{" "}
                  {outputText.length} ({t("tools.whitespace-remover.reducedBy")}{" "}
                  {(
                    ((inputText.length - outputText.length) /
                      inputText.length) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.whitespace-remover.whatIs")}
              </strong>{" "}
              {t("tools.whitespace-remover.whatIsContent")}
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
                    {t("tools.whitespace-remover.useCases.code.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.whitespace-remover.useCases.code.description")}{" "}
                    <Badge variant="secondary" className="mx-1">
                      extra spaces
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.whitespace-remover.useCases.text.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.whitespace-remover.useCases.text.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <AlignLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.whitespace-remover.useCases.data.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.whitespace-remover.useCases.data.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Space className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.whitespace-remover.useCases.content.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.whitespace-remover.useCases.content.description")}
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
                    __html: t("tools.whitespace-remover.proTips.options"),
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
                    __html: t("tools.whitespace-remover.proTips.lineBreaks"),
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
                    __html: t("tools.whitespace-remover.proTips.trimLines"),
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
                    __html: t("tools.whitespace-remover.proTips.preview"),
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
                onClick={() => navigate("/tools/duplicate-remover")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.duplicate-remover.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.duplicate-remover.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-replacer")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.text-replacer.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.text-replacer.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhitespaceRemover;
