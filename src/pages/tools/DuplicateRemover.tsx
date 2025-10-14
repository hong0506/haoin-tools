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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  ListFilter,
  Zap,
  Info,
  Copy,
  FileText,
  Database,
  Mail,

} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const DuplicateRemover = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [stats, setStats] = useState({ original: 0, removed: 0, final: 0 });
  const navigate = useNavigate();

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      toast.error(t("tools.duplicate-remover.pleaseEnterText"));
      return;
    }

    const lines = inputText.split("\n");
    const originalCount = lines.length;
    
    let processedLines = lines;
    
    if (removeEmpty) {
      processedLines = processedLines.filter(line => line.trim() !== "");
    }
    
    const seen = new Set<string>();
    const uniqueLines = [];
    
    for (const line of processedLines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    }
    
    const finalCount = uniqueLines.length;
    const removedCount = originalCount - finalCount;
    
    setResultText(uniqueLines.join("\n"));
    setStats({
      original: originalCount,
      removed: removedCount,
      final: finalCount,
    });
    
    toast.success(t("tools.duplicate-remover.removedCount", { count: removedCount }));
  };

  const copyResult = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      toast.success(t("tools.duplicate-remover.copiedToClipboard"));
    }
  };

  const clearAll = () => {
    setInputText("");
    setResultText("");
    setStats({ original: 0, removed: 0, final: 0 });
    setRemoveEmpty(true);
    setCaseSensitive(false);
    toast.success(t("tools.duplicate-remover.allFieldsCleared"));
  };

  const loadExample = () => {
    setInputText(`Apple
Banana
apple
Cherry
Banana

Date
Apple
`);
    toast.success(t("tools.duplicate-remover.exampleLoaded"));
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
          <h1 className="text-xl font-semibold flex-1">{t("tools.duplicate-remover.title")}</h1>
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
                <CardTitle>{t("tools.duplicate-remover.removeDuplicateLines")}</CardTitle>
                <CardDescription>
                  {t("tools.duplicate-remover.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="duplicate-remover"
                toolName={t("tools.duplicate-remover.title")}
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
              <Textarea
                placeholder={t("tools.duplicate-remover.inputPlaceholder")}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remove-empty"
                  checked={removeEmpty}
                  onCheckedChange={(checked) => setRemoveEmpty(checked as boolean)}
                />
                <label
                  htmlFor="remove-empty"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("tools.duplicate-remover.removeEmptyLines")}
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case-sensitive"
                  checked={caseSensitive}
                  onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                />
                <label
                  htmlFor="case-sensitive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("tools.duplicate-remover.caseSensitiveComparison")}
                </label>
              </div>
            </div>

            <Button onClick={removeDuplicates} className="w-full">
              <ListFilter className="h-4 w-4 mr-2" />
              {t("tools.duplicate-remover.removeDuplicates")}
            </Button>

            {resultText && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{t("tools.duplicate-remover.result")}</div>
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                
                <Textarea value={resultText} readOnly rows={8} />
                
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {t("tools.duplicate-remover.original")}: {stats.original} {t("tools.duplicate-remover.lines")}
                  </Badge>
                  <Badge variant="destructive">
                    {t("tools.duplicate-remover.removed")}: {stats.removed}
                  </Badge>
                  <Badge variant="default">
                    {t("tools.duplicate-remover.final")}: {stats.final} {t("tools.duplicate-remover.lines")}
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.duplicate-remover.whatIs")}
              </strong>{" "}
              {t("tools.duplicate-remover.whatIsContent")}
            </p>
          </CardContent>
        </Card>

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
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">{t("tools.duplicate-remover.useCases.cleanLists.title")}</div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.duplicate-remover.useCases.cleanLists.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.duplicate-remover.useCases.dataProcessing.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.duplicate-remover.useCases.dataProcessing.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.duplicate-remover.useCases.emailLists.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.duplicate-remover.useCases.emailLists.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <ListFilter className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.duplicate-remover.useCases.logCleaning.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.duplicate-remover.useCases.logCleaning.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.duplicate-remover.proTips.caseSensitive")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.duplicate-remover.proTips.cleanLists")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.duplicate-remover.proTips.emptyLines")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.duplicate-remover.proTips.statsDisplay")
                }} />
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DuplicateRemover;
