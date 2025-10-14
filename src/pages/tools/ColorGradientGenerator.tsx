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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Copy,
  Palette,
  Info,
  Zap,
  Sparkles,
  Paintbrush,
  Link
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const ColorGradientGenerator = () => {
  const { t } = useTranslation();
  const [color1, setColor1] = useState("#FF6B9D");
  const [color2, setColor2] = useState("#C371F5");
  const [direction, setDirection] = useState("to right");
  const [angle, setAngle] = useState(90);
  const navigate = useNavigate();

  const generateCSS = () => {
    if (direction === "custom") {
      return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    }
    return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast.success(t("tools.color-gradient-generator.cssCopied"));
  };

  const presets = [
    {
      name: t("tools.color-gradient-generator.presets.sunset"),
      color1: "#FF512F",
      color2: "#F09819",
    },
    {
      name: t("tools.color-gradient-generator.presets.ocean"),
      color1: "#2E3192",
      color2: "#1BFFFF",
    },
    {
      name: t("tools.color-gradient-generator.presets.forest"),
      color1: "#11998e",
      color2: "#38ef7d",
    },
    {
      name: t("tools.color-gradient-generator.presets.purpleDream"),
      color1: "#C471F5",
      color2: "#FA71CD",
    },
    {
      name: t("tools.color-gradient-generator.presets.fire"),
      color1: "#f12711",
      color2: "#f5af19",
    },
    {
      name: t("tools.color-gradient-generator.presets.sky"),
      color1: "#0575E6",
      color2: "#00F260",
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
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
            {t("tools.color-gradient-generator.title")}
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
                  {t("tools.color-gradient-generator.cssGradientGenerator")}
                </CardTitle>
                <CardDescription>
                  {t("tools.color-gradient-generator.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="color-gradient-generator"
                toolName={t("tools.color-gradient-generator.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Live Preview */}
            <div
              className="h-48 rounded-xl shadow-lg"
              style={{
                background: `linear-gradient(${
                  direction === "custom" ? angle + "deg" : direction
                }, ${color1}, ${color2})`,
              }}
            ></div>

            {/* Color Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("tools.color-gradient-generator.startColor")}</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label>{t("tools.color-gradient-generator.endColor")}</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Direction */}
            <div>
              <Label>{t("tools.color-gradient-generator.direction")}</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to right">
                    {t("tools.color-gradient-generator.directions.leftToRight")}
                  </SelectItem>
                  <SelectItem value="to left">
                    {t("tools.color-gradient-generator.directions.rightToLeft")}
                  </SelectItem>
                  <SelectItem value="to bottom">
                    {t("tools.color-gradient-generator.directions.topToBottom")}
                  </SelectItem>
                  <SelectItem value="to top">
                    {t("tools.color-gradient-generator.directions.bottomToTop")}
                  </SelectItem>
                  <SelectItem value="to bottom right">
                    {t("tools.color-gradient-generator.directions.diagonal")}
                  </SelectItem>
                  <SelectItem value="custom">
                    {t("tools.color-gradient-generator.directions.customAngle")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {direction === "custom" && (
              <div>
                <Label>
                  {t("tools.color-gradient-generator.angle", { angle })}
                </Label>
                <Slider
                  value={[angle]}
                  onValueChange={(v) => setAngle(v[0])}
                  min={0}
                  max={360}
                  step={1}
                  className="mt-2"
                />
              </div>
            )}

            {/* CSS Output */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>{t("tools.color-gradient-generator.cssCode")}</Label>
                <Button variant="outline" size="sm" onClick={copyCSS}>
                  <Copy className="h-4 w-4 mr-2" />
                  {t("tools.color-gradient-generator.copyCss")}
                </Button>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm break-all">
                {generateCSS()}
              </div>
            </div>

            {/* Presets */}
            <div>
              <Label className="mb-3 block">
                {t("tools.color-gradient-generator.gradientPresets")}
              </Label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setColor1(preset.color1);
                      setColor2(preset.color2);
                      toast.success(`${preset.name} loaded!`);
                    }}
                    className="h-16 rounded-lg shadow-md hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(to right, ${preset.color1}, ${preset.color2})`,
                    }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.color-gradient-generator.whatIs")}
              </strong>{" "}
              {t("tools.color-gradient-generator.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Paintbrush className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t(
                      "tools.color-gradient-generator.useCases.websiteBackgrounds.title"
                    )}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t(
                      "tools.color-gradient-generator.useCases.websiteBackgrounds.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t(
                      "tools.color-gradient-generator.useCases.uiComponents.title"
                    )}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t(
                      "tools.color-gradient-generator.useCases.uiComponents.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Palette className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t(
                      "tools.color-gradient-generator.useCases.brandColors.title"
                    )}
                  </div>
                  <p className="text-sm text-green-700">
                    {t(
                      "tools.color-gradient-generator.useCases.brandColors.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Info className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t(
                      "tools.color-gradient-generator.useCases.socialMedia.title"
                    )}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t(
                      "tools.color-gradient-generator.useCases.socialMedia.description"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                    __html: t(
                      "tools.color-gradient-generator.proTips.livePreview"
                    ),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.color-gradient-generator.proTips.presets"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.color-gradient-generator.proTips.copyCss"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      "tools.color-gradient-generator.proTips.customAngles"
                    ),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              {t('toolPage.sections.relatedTools')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/color-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.color-picker.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.color-picker.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/image-compressor")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.image-compressor.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.image-compressor.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/qr-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.qr-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.qr-generator.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorGradientGenerator;
