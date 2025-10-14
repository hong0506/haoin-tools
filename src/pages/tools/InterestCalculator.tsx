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
  TrendingUp,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  PiggyBank,
  TrendingDown,
  Wallet,
  LineChart,

} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const InterestCalculator = () => {
  const { t } = useTranslation();
  const [simpleInputs, setSimpleInputs] = useState({
    principal: "",
    rate: "",
    time: "",
  });
  const [compoundInputs, setCompoundInputs] = useState({
    principal: "",
    rate: "",
    time: "",
    frequency: "12",
  });
  const [simpleResult, setSimpleResult] = useState<number | null>(null);
  const [compoundResult, setCompoundResult] = useState<{
    total: number;
    interest: number;
  } | null>(null);
  const navigate = useNavigate();

  const calculateSimple = () => {
    const p = parseFloat(simpleInputs.principal);
    const r = parseFloat(simpleInputs.rate) / 100;
    const t = parseFloat(simpleInputs.time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      toast.error(t("tools.interest-calculator.invalidNumbers"));
      return;
    }

    if (p <= 0 || r <= 0 || t <= 0) {
      toast.error(t("tools.interest-calculator.mustBePositive"));
      return;
    }

    const interest = p * r * t;
    setSimpleResult(parseFloat(interest.toFixed(2)));
    toast.success(t("tools.interest-calculator.simpleCalculated"));
  };

  const clearSimple = () => {
    setSimpleInputs({ principal: "", rate: "", time: "" });
    setSimpleResult(null);
    toast.success(t("tools.interest-calculator.fieldsCleared"));
  };

  const loadSimpleExample = () => {
    setSimpleInputs({ principal: "10000", rate: "5", time: "3" });
    setSimpleResult(null);
    toast.success(t("tools.interest-calculator.exampleLoaded"));
  };

  const calculateCompound = () => {
    const p = parseFloat(compoundInputs.principal);
    const r = parseFloat(compoundInputs.rate) / 100;
    const t = parseFloat(compoundInputs.time);
    const n = parseFloat(compoundInputs.frequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
      toast.error(t("tools.interest-calculator.invalidNumbers"));
      return;
    }

    if (p <= 0 || r <= 0 || t <= 0 || n <= 0) {
      toast.error(t("tools.interest-calculator.mustBePositive"));
      return;
    }

    const total = p * Math.pow(1 + r / n, n * t);
    const interest = total - p;
    setCompoundResult({
      total: parseFloat(total.toFixed(2)),
      interest: parseFloat(interest.toFixed(2)),
    });
    toast.success(t("tools.interest-calculator.compoundCalculated"));
  };

  const clearCompound = () => {
    setCompoundInputs({ principal: "", rate: "", time: "", frequency: "12" });
    setCompoundResult(null);
    toast.success(t("tools.interest-calculator.fieldsCleared"));
  };

  const loadCompoundExample = () => {
    setCompoundInputs({
      principal: "10000",
      rate: "5",
      time: "3",
      frequency: "12",
    });
    setCompoundResult(null);
    toast.success(t("tools.interest-calculator.exampleLoaded"));
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
            <h1 className="text-xl font-semibold">{t("tools.interest-calculator.title")}</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Tabs defaultValue="simple" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid grid-cols-2 max-w-lg">
              <TabsTrigger value="simple">{t("tools.interest-calculator.simpleInterest")}</TabsTrigger>
              <TabsTrigger value="compound">{t("tools.interest-calculator.compoundInterest")}</TabsTrigger>
            </TabsList>
            <FavoriteButton
              toolId="interest-calculator"
              toolName={t("tools.interest-calculator.title")}
            />
          </div>
          <TabsContent value="simple">
            <Card>
              <CardHeader>
                <CardTitle>{t("tools.interest-calculator.simpleInterest")}</CardTitle>
                <CardDescription>{t("tools.interest-calculator.simpleFormula")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={clearSimple} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t("toolPage.buttons.clear")}
                  </Button>
                  <Button onClick={loadSimpleExample} variant="ghost" size="sm">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    {t("toolPage.buttons.loadExample")}
                  </Button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.interest-calculator.principalAmount")}
                  </label>
                  <Input
                    type="number"
                    value={simpleInputs.principal}
                    onChange={(e) =>
                      setSimpleInputs({
                        ...simpleInputs,
                        principal: e.target.value,
                      })
                    }
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.interest-calculator.annualRate")}
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={simpleInputs.rate}
                    onChange={(e) =>
                      setSimpleInputs({ ...simpleInputs, rate: e.target.value })
                    }
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.interest-calculator.timePeriod")}
                  </label>
                  <Input
                    type="number"
                    value={simpleInputs.time}
                    onChange={(e) =>
                      setSimpleInputs({ ...simpleInputs, time: e.target.value })
                    }
                    placeholder="5"
                  />
                </div>
                <Button onClick={calculateSimple} className="w-full">
                  {t("tools.interest-calculator.calculateSimple")}
                </Button>
                {simpleResult !== null && (
                  <div className="space-y-3 rounded-lg bg-primary/10 p-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {t("tools.interest-calculator.interestEarned")}
                      </p>
                      <p className="text-4xl font-bold text-primary">
                        ${simpleResult.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center border-t pt-3">
                      <p className="text-sm text-muted-foreground">
                        {t("tools.interest-calculator.totalAmount")}
                      </p>
                      <p className="text-2xl font-semibold text-green-500">
                        $
                        {(
                          parseFloat(simpleInputs.principal) + simpleResult
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="compound">
            <Card>
              <CardHeader>
                <CardTitle>{t("tools.interest-calculator.compoundInterest")}</CardTitle>
                <CardDescription>{t("tools.interest-calculator.compoundFormula")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={clearCompound} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t("toolPage.buttons.clear")}
                  </Button>
                  <Button
                    onClick={loadCompoundExample}
                    variant="ghost"
                    size="sm"
                  >
                    <Lightbulb className="h-4 w-4 mr-1" />
                    {t("toolPage.buttons.loadExample")}
                  </Button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.interest-calculator.principalAmount")}
                  </label>
                  <Input
                    type="number"
                    value={compoundInputs.principal}
                    onChange={(e) =>
                      setCompoundInputs({
                        ...compoundInputs,
                        principal: e.target.value,
                      })
                    }
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.interest-calculator.annualRate")}
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={compoundInputs.rate}
                    onChange={(e) =>
                      setCompoundInputs({
                        ...compoundInputs,
                        rate: e.target.value,
                      })
                    }
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.interest-calculator.timePeriod")}
                  </label>
                  <Input
                    type="number"
                    value={compoundInputs.time}
                    onChange={(e) =>
                      setCompoundInputs({
                        ...compoundInputs,
                        time: e.target.value,
                      })
                    }
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("tools.interest-calculator.compoundFrequency")}
                  </label>
                  <Input
                    type="number"
                    value={compoundInputs.frequency}
                    onChange={(e) =>
                      setCompoundInputs({
                        ...compoundInputs,
                        frequency: e.target.value,
                      })
                    }
                    placeholder="12"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("tools.interest-calculator.frequencyHint")}
                  </p>
                </div>
                <Button onClick={calculateCompound} className="w-full">
                  {t("tools.interest-calculator.calculateCompound")}
                </Button>
                {compoundResult && (
                  <div className="space-y-3 rounded-lg bg-primary/10 p-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {t("tools.interest-calculator.finalAmount")}
                      </p>
                      <p className="text-4xl font-bold text-primary">
                        ${compoundResult.total.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center border-t pt-3">
                      <p className="text-sm text-muted-foreground">
                        {t("tools.interest-calculator.interestEarned")}
                      </p>
                      <p className="text-2xl font-semibold text-green-500">
                        ${compoundResult.interest.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.interest-calculator.whatIs")}
              </strong>{" "}
              {t("tools.interest-calculator.whatIsContent")}
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
                  <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.interest-calculator.useCases.savings.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.interest-calculator.useCases.savings.description")}{" "}
                    <Badge variant="secondary" className="mx-1">
                      interest earned
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <LineChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.interest-calculator.useCases.investment.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.interest-calculator.useCases.investment.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.interest-calculator.useCases.retirement.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.interest-calculator.useCases.retirement.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <TrendingDown className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.interest-calculator.useCases.loan.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.interest-calculator.useCases.loan.description")}
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
                  __html: t("tools.interest-calculator.proTips.compound")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.interest-calculator.proTips.frequency")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.interest-calculator.proTips.longTerm")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.interest-calculator.proTips.impact")
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
              Related Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/investment-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.investment-calculator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.investment-calculator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/loan-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.loan-calculator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.loan-calculator.description")}
                </div>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterestCalculator;
