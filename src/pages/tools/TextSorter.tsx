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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ArrowDownAZ,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  ListOrdered,
  Zap,
  Info,
  FileSpreadsheet,
  Database,
  Users,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const TextSorter = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const sortText = () => {
    const lines = input.split("\n").filter((line) => line.trim() !== "");
    const sorted =
      sortOrder === "asc"
        ? lines.sort((a, b) => a.localeCompare(b))
        : lines.sort((a, b) => b.localeCompare(a));
    setOutput(sorted.join("\n"));
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setSortOrder("asc");
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    setInput(t("tools.text-sorter.exampleText"));
    setOutput("");
    setSortOrder("asc");
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
            <ArrowDownAZ className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.text-sorter.title")}
            </h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.text-sorter.sortTextLines")}</CardTitle>
                <CardDescription>
                  {t("tools.text-sorter.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="text-sorter"
                toolName={t("tools.text-sorter.title")}
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
                {t("tools.text-sorter.inputText")}
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={8}
                placeholder={t("tools.text-sorter.placeholder")}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">
                    {t("tools.text-sorter.ascOrder")}
                  </SelectItem>
                  <SelectItem value="desc">
                    {t("tools.text-sorter.descOrder")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={sortText} className="flex-1">
                {t("tools.text-sorter.sortLines")}
              </Button>
            </div>
            {output && (
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t("tools.text-sorter.sortedOutput")}
                </label>
                <Textarea value={output} readOnly rows={8} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compact Stats */}
        {output && (
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-600">
                {output.split("\n").filter((line) => line.trim()).length}
              </span>
              <span>{t("tools.text-sorter.linesSorted")}</span>
            </div>
          </div>
        )}

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.text-sorter.whatIs")}
              </strong>{" "}
              {t("tools.text-sorter.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <ListOrdered className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.text-sorter.useCases.listOrganization.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t(
                      "tools.text-sorter.useCases.listOrganization.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileSpreadsheet className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.text-sorter.useCases.dataPreparation.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t(
                      "tools.text-sorter.useCases.dataPreparation.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.text-sorter.useCases.contactLists.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.text-sorter.useCases.contactLists.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.text-sorter.useCases.inventoryManagement.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t(
                      "tools.text-sorter.useCases.inventoryManagement.description"
                    )}
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
                    __html: t("tools.text-sorter.proTips.onePerLine"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.text-sorter.proTips.ascOrder"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.text-sorter.proTips.descOrder"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.text-sorter.proTips.caseSensitive"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("tools.text-sorter.relatedTools")}</CardTitle>
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

export default TextSorter;
