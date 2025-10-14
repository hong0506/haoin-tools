import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import {
  Text,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Palette,
  Zap,
  Info,
  Layout,
  FileText,
  Presentation,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const LoremIpsum = () => {
  const { t } = useTranslation();
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loremText = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
  ];

  const generate = () => {
    const text = Array.from(
      { length: paragraphs },
      (_, i) => loremText[i % loremText.length]
    ).join("\n\n");
    setOutput(text);
    toast.success(t("tools.lorem-ipsum.generated", { count: paragraphs }));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success(t("toolPage.messages.copied"));
  };

  const clearAll = () => {
    setOutput("");
    setParagraphs(3);
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    setParagraphs(3);
    setOutput("");
    toast.success(t("toolPage.messages.exampleLoaded"));
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
              {t("tools.lorem-ipsum.title")}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.lorem-ipsum.title")}</CardTitle>
                <CardDescription>
                  {t("tools.lorem-ipsum.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="lorem-ipsum"
                toolName={t("tools.lorem-ipsum.title")}
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
                {t("tools.lorem-ipsum.numberOfParagraphs")}
              </label>
              <Input
                type="number"
                min={1}
                max={20}
                value={paragraphs}
                onChange={(e) =>
                  setParagraphs(
                    Math.max(1, Math.min(20, parseInt(e.target.value) || 1))
                  )
                }
              />
            </div>

            <Button onClick={generate} className="w-full">
              {t("tools.lorem-ipsum.generate")}
            </Button>

            {output && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("tools.lorem-ipsum.generatedText")}
                  </label>
                  <Button onClick={copyOutput} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea value={output} readOnly className="min-h-[300px]" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.lorem-ipsum.whatIs")}
              </strong>{" "}
              {t("tools.lorem-ipsum.whatIsContent")}
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
                  <Palette className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.lorem-ipsum.useCases.webDesign.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.lorem-ipsum.useCases.webDesign.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Layout className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.lorem-ipsum.useCases.uiUxDesign.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.lorem-ipsum.useCases.uiUxDesign.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.lorem-ipsum.useCases.typographyTesting.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t(
                      "tools.lorem-ipsum.useCases.typographyTesting.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Presentation className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.lorem-ipsum.useCases.clientPresentations.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t(
                      "tools.lorem-ipsum.useCases.clientPresentations.description"
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
                    __html: t("tools.lorem-ipsum.proTips.history"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.lorem-ipsum.proTips.focus"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.lorem-ipsum.proTips.mockups"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.lorem-ipsum.proTips.consistency"),
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
                onClick={() => navigate("/tools/random-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.random-picker.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.random-picker.description")}
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

export default LoremIpsum;
