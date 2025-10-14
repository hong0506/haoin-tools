import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Percent,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Zap,
  Info,
  TrendingUp,
  Calculator,
  Receipt,
  PiggyBank,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const PercentageCalculator = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");
  const [percentage, setPercentage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculatePercentage = () => {
    const v = parseFloat(value);
    const t = parseFloat(total);
    if (!isNaN(v) && !isNaN(t) && t !== 0) {
      setPercentage(((v / t) * 100).toFixed(2));
    }
  };

  const calculateValue = () => {
    const p = parseFloat(percentage);
    const t = parseFloat(total);
    if (!isNaN(p) && !isNaN(t)) {
      setValue(((p * t) / 100).toFixed(2));
    }
  };

  const clearAll = () => {
    setValue("");
    setTotal("");
    setPercentage("");
  };

  const loadExample = () => {
    setValue("25");
    setTotal("100");
    setPercentage("25");
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
            <h1 className="text-xl font-semibold">{t('tools.percentage-calculator.title')}</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('tools.percentage-calculator.title')}</CardTitle>
                <CardDescription>
                  {t('tools.percentage-calculator.description')}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="percentage-calculator"
                toolName="Percentage Calculator"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button onClick={clearAll} variant="outline" size="sm">
                {t('toolPage.buttons.clear')}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t('toolPage.buttons.loadExample')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('tools.percentage-calculator.whatPercentOf')}</CardTitle>
              <CardDescription>{t('tools.percentage-calculator.calculatePercentage')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">{t('tools.percentage-calculator.value')}</label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    calculatePercentage();
                  }}
                  placeholder="25"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Total</label>
                <Input
                  type="number"
                  value={total}
                  onChange={(e) => {
                    setTotal(e.target.value);
                    calculatePercentage();
                  }}
                  placeholder="100"
                />
              </div>

              {percentage && (
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {percentage}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('tools.percentage-calculator.percentOfWhat')}</CardTitle>
              <CardDescription>{t('tools.percentage-calculator.calculateValue')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t('tools.percentage-calculator.percentage')}
                </label>
                <Input
                  type="number"
                  value={percentage}
                  onChange={(e) => {
                    setPercentage(e.target.value);
                    calculateValue();
                  }}
                  placeholder="25"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">{t('tools.percentage-calculator.total')}</label>
                <Input
                  type="number"
                  value={total}
                  onChange={(e) => {
                    setTotal(e.target.value);
                    calculateValue();
                  }}
                  placeholder="100"
                />
              </div>

              {value && (
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{value}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t('tools.percentage-calculator.whatIs')}
              </strong>{" "}
              {t('tools.percentage-calculator.whatIsContent')}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t('tools.percentage-calculator.useCases.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Receipt className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">{t('tools.percentage-calculator.useCases.discount.title')}</div>
                  <p className="text-sm text-blue-700">
                    {t('tools.percentage-calculator.useCases.discount.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Calculator className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">{t('tools.percentage-calculator.useCases.tax.title')}</div>
                  <p className="text-sm text-purple-700">
                    {t('tools.percentage-calculator.useCases.tax.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">{t('tools.percentage-calculator.useCases.metrics.title')}</div>
                  <p className="text-sm text-green-700">
                    {t('tools.percentage-calculator.useCases.metrics.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <PiggyBank className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">{t('tools.percentage-calculator.useCases.budget.title')}</div>
                  <p className="text-sm text-pink-700">
                    {t('tools.percentage-calculator.useCases.budget.description')}
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
              {t('tools.percentage-calculator.proTips.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  {t('tools.percentage-calculator.proTips.definition')}
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  {t('tools.percentage-calculator.proTips.tips')}
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  {t('tools.percentage-calculator.proTips.comparison')}
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  {t('tools.percentage-calculator.proTips.decimals')}
                </p>
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
                onClick={() => navigate("/tools/interest-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.interest-calculator.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.interest-calculator.description')}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/loan-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.loan-calculator.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.loan-calculator.description')}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/bmi-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.bmi-calculator.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">{t('tools.bmi-calculator.description')}</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PercentageCalculator;
