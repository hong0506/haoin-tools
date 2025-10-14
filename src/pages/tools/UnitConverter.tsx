import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ruler,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Globe,
  Utensils,
  Hammer,
  Scale,
  Link
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const UnitConverter = () => {
  const { t } = useTranslation();
  const [lengthValue, setLengthValue] = useState("");
  const [lengthFrom, setLengthFrom] = useState("meters");
  const [lengthTo, setLengthTo] = useState("feet");
  const [weightValue, setWeightValue] = useState("");
  const [weightFrom, setWeightFrom] = useState("kilograms");
  const [weightTo, setWeightTo] = useState("pounds");
  const navigate = useNavigate();

  const lengthUnits: Record<string, number> = {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    miles: 0.000621371,
    yards: 1.09361,
    feet: 3.28084,
    inches: 39.3701,
  };

  const weightUnits: Record<string, number> = {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274,
    tons: 0.001,
  };

  const convertLength = () => {
    const val = parseFloat(lengthValue);
    if (!isNaN(val)) {
      const meters = val / lengthUnits[lengthFrom];
      return (meters * lengthUnits[lengthTo]).toFixed(4);
    }
    return "";
  };

  const convertWeight = () => {
    const val = parseFloat(weightValue);
    if (!isNaN(val)) {
      const kg = val / weightUnits[weightFrom];
      return (kg * weightUnits[weightTo]).toFixed(4);
    }
    return "";
  };

  const clearLength = () => {
    setLengthValue("");
    toast.success(t("tools.unit-converter.cleared"));
  };

  const clearWeight = () => {
    setWeightValue("");
    toast.success(t("tools.unit-converter.cleared"));
  };

  const loadLengthExample = () => {
    setLengthValue("100");
    setLengthFrom("meters");
    setLengthTo("feet");
    toast.success(t("tools.unit-converter.exampleLoaded"));
  };

  const loadWeightExample = () => {
    setWeightValue("100");
    setWeightFrom("kilograms");
    setWeightTo("pounds");
    toast.success(t("tools.unit-converter.exampleLoaded"));
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
            <h1 className="text-xl font-semibold">{t("tools.unit-converter.title")}</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Tabs defaultValue="length">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="length">{t("tools.unit-converter.length")}</TabsTrigger>
              <TabsTrigger value="weight">{t("tools.unit-converter.weight")}</TabsTrigger>
            </TabsList>
            <FavoriteButton toolId="unit-converter" toolName={t("tools.unit-converter.title")} />
          </div>
          <TabsContent value="length">
            <Card>
              <CardHeader>
                <CardTitle>{t("tools.unit-converter.lengthConverter")}</CardTitle>
                <CardDescription>
                  {t("tools.unit-converter.lengthDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={clearLength} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t("toolPage.buttons.clear")}
                  </Button>
                  <Button onClick={loadLengthExample} variant="ghost" size="sm">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    {t("toolPage.buttons.loadExample")}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={lengthValue}
                    onChange={(e) => setLengthValue(e.target.value)}
                    placeholder="100"
                    className="flex-1"
                  />
                  <Select value={lengthFrom} onValueChange={setLengthFrom}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(lengthUnits).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {t(`tools.unit-converter.units.${unit}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 items-center">
                  <Input value={convertLength()} readOnly className="flex-1" />
                  <Select value={lengthTo} onValueChange={setLengthTo}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(lengthUnits).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {t(`tools.unit-converter.units.${unit}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="weight">
            <Card>
              <CardHeader>
                <CardTitle>{t("tools.unit-converter.weightConverter")}</CardTitle>
                <CardDescription>
                  {t("tools.unit-converter.weightDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={clearWeight} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t("toolPage.buttons.clear")}
                  </Button>
                  <Button onClick={loadWeightExample} variant="ghost" size="sm">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    {t("toolPage.buttons.loadExample")}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                    placeholder="100"
                    className="flex-1"
                  />
                  <Select value={weightFrom} onValueChange={setWeightFrom}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(weightUnits).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {t(`tools.unit-converter.units.${unit}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 items-center">
                  <Input value={convertWeight()} readOnly className="flex-1" />
                  <Select value={weightTo} onValueChange={setWeightTo}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(weightUnits).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {t(`tools.unit-converter.units.${unit}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">{t("tools.unit-converter.whatIs")}</strong>{" "}
              {t("tools.unit-converter.whatIsContent")}
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
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.unit-converter.useCases.travel.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.unit-converter.useCases.travel.description")}{" "}
                    <Badge variant="secondary" className="mx-1">
                      metric/imperial
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Utensils className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.unit-converter.useCases.cooking.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.unit-converter.useCases.cooking.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Hammer className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.unit-converter.useCases.construction.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.unit-converter.useCases.construction.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Scale className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">{t("tools.unit-converter.useCases.fitness.title")}</div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.unit-converter.useCases.fitness.description")}
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
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.unit-converter.proTips.metric")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.unit-converter.proTips.weight")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.unit-converter.proTips.length")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.unit-converter.proTips.recipes")
                }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
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
                onClick={() => navigate("/tools/currency-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.currency-converter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">{t("tools.currency-converter.description")}</div>
              </button>
              <button
                onClick={() => navigate("/tools/percentage-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.percentage-calculator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.percentage-calculator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/bmi-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.bmi-calculator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">{t("tools.bmi-calculator.description")}</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnitConverter;
