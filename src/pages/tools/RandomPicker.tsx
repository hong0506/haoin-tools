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
  Shuffle,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Gift,
  Zap,
  Info,
  Users,
  Trophy,
  Dice5,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const RandomPicker = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState("");
  const [winner, setWinner] = useState("");
  const navigate = useNavigate();

  const pickRandom = () => {
    const list = items.split("\n").filter((item) => item.trim() !== "");
    if (list.length === 0) {
      toast.error(t("tools.random-picker.pleaseEnterItem"));
      return;
    }
    const randomItem = list[Math.floor(Math.random() * list.length)];
    setWinner(randomItem);
    toast.success(t("tools.random-picker.winnerSelected"));
  };

  const clearAll = () => {
    setItems("");
    setWinner("");
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    setItems(t("tools.random-picker.exampleNames"));
    setWinner("");
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
            <Shuffle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.random-picker.title")}
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
                  {t("tools.random-picker.randomNameItemPicker")}
                </CardTitle>
                <CardDescription>
                  {t("tools.random-picker.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="random-picker"
                toolName={t("tools.random-picker.title")}
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

            <Textarea
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder={t("tools.random-picker.placeholder")}
              rows={10}
            />
            <Button onClick={pickRandom} className="w-full">
              <Shuffle className="mr-2 h-4 w-4" />
              {t("tools.random-picker.pickRandomWinner")}
            </Button>
            {winner && (
              <div className="rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 p-8 text-center animate-in fade-in zoom-in">
                <p className="text-sm text-muted-foreground mb-2">
                  {t("tools.random-picker.winner")}
                </p>
                <p className="text-5xl font-bold text-primary">{winner}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.random-picker.whatIs")}
              </strong>{" "}
              {t("tools.random-picker.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Gift className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.random-picker.useCases.contestGiveaways.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t("tools.random-picker.useCases.contestGiveaways.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Trophy className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.random-picker.useCases.raffleDrawings.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.random-picker.useCases.raffleDrawings.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.random-picker.useCases.teamAssignments.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.random-picker.useCases.teamAssignments.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Dice5 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.random-picker.useCases.decisionMaking.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.random-picker.useCases.decisionMaking.description")}
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
                    __html: t("tools.random-picker.proTips.onePerLine"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.random-picker.proTips.fairSelection"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.random-picker.proTips.screenshot"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.random-picker.proTips.socialMedia"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("tools.random-picker.relatedTools")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.uuid-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.uuid-generator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/password-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.password-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.password-generator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/lorem-ipsum")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.lorem-ipsum.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.lorem-ipsum.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RandomPicker;
