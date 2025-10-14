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
import {
  CreditCard,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Wallet,
  TrendingDown,
  DollarSign,
  AlertTriangle,

} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const CreditCardCalculator = () => {
  const { t } = useTranslation();
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [result, setResult] = useState<{
    payoffTime: string;
    totalInterest: number;
    totalPaid: number;
  } | null>(null);
  const navigate = useNavigate();

  const calculatePayoff = () => {
    const b = parseFloat(balance);
    const rate = parseFloat(apr) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    if (b > 0 && rate >= 0 && payment > 0) {
      if (payment <= b * rate) {
        setResult({
          payoffTime: t("tools.credit-card-calculator.never"),
          totalInterest: 0,
          totalPaid: 0,
        });
        return;
      }
      const months =
        Math.log(payment / (payment - b * rate)) / Math.log(1 + rate);
      const totalPaid = payment * months;
      const totalInterest = totalPaid - b;
      const years = Math.floor(months / 12);
      const remainingMonths = Math.ceil(months % 12);
      const yearText = years > 1 ? t("tools.credit-card-calculator.years") : t("tools.credit-card-calculator.year");
      const monthText = remainingMonths > 1 ? t("tools.credit-card-calculator.months") : t("tools.credit-card-calculator.month");
      const payoffTime =
        years > 0
          ? `${years} ${yearText} ${remainingMonths} ${monthText}`
          : `${Math.ceil(months)} ${Math.ceil(months) > 1 ? t("tools.credit-card-calculator.months") : t("tools.credit-card-calculator.month")}`;
      setResult({
        payoffTime,
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        totalPaid: parseFloat(totalPaid.toFixed(2)),
      });
      toast.success(t("tools.credit-card-calculator.calculationCompleted"));
    }
  };

  const clearAll = () => {
    setBalance("");
    setApr("");
    setMonthlyPayment("");
    setResult(null);
    toast.success(t("tools.credit-card-calculator.allFieldsCleared"));
  };

  const loadExample = () => {
    setBalance("5000");
    setApr("18.99");
    setMonthlyPayment("200");
    setResult(null);
    toast.success(t("tools.credit-card-calculator.exampleLoaded"));
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
            <CreditCard className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">{t("tools.credit-card-calculator.title")}</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.credit-card-calculator.calculatePayoff")}</CardTitle>
                <CardDescription>
                  {t("tools.credit-card-calculator.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="credit-card-calculator"
                toolName={t("tools.credit-card-calculator.title")}
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
                {t("tools.credit-card-calculator.currentBalance")}
              </label>
              <Input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="5000"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("tools.credit-card-calculator.annualRate")}
              </label>
              <Input
                type="number"
                step="0.01"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
                placeholder="18.99"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("tools.credit-card-calculator.monthlyPayment")}
              </label>
              <Input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                placeholder="200"
              />
            </div>
            <Button onClick={calculatePayoff} className="w-full">
              {t("tools.credit-card-calculator.calculate")}
            </Button>
            {result && (
              <div className="space-y-4 rounded-lg bg-secondary/50 p-6">
                <div className="text-center border-b pb-4">
                  <p className="text-sm text-muted-foreground">
                    {t("tools.credit-card-calculator.timeToPayOff")}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {result.payoffTime}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">{t("tools.credit-card-calculator.totalPaid")}</p>
                    <p className="text-lg font-semibold">
                      ${result.totalPaid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      {t("tools.credit-card-calculator.totalInterest")}
                    </p>
                    <p className="text-lg font-semibold text-orange-500">
                      ${result.totalInterest.toLocaleString()}
                    </p>
                  </div>
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
                {t("tools.credit-card-calculator.whatIs")}
              </strong>{" "}
              {t("tools.credit-card-calculator.whatIsContent")}
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
                  <TrendingDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.credit-card-calculator.useCases.debt.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.credit-card-calculator.useCases.debt.description")}{" "}
                    <Badge variant="secondary" className="mx-1">
                      debt payoff
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.credit-card-calculator.useCases.interest.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.credit-card-calculator.useCases.interest.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.credit-card-calculator.useCases.budget.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.credit-card-calculator.useCases.budget.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <AlertTriangle className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.credit-card-calculator.useCases.strategy.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.credit-card-calculator.useCases.strategy.description")}
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
                  __html: t("tools.credit-card-calculator.proTips.higherPayments")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.credit-card-calculator.proTips.minimumPayments")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.credit-card-calculator.proTips.payMore")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.credit-card-calculator.proTips.lowerAPR")
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
                onClick={() => navigate("/tools/interest-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.interest-calculator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.interest-calculator.description")}
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

export default CreditCardCalculator;
