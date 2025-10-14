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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftRight,
  RefreshCw,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Link
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Info,
  Plane,
  ShoppingBag,
  TrendingUp,
  Globe2,
} from "lucide-react";

const CurrencyConverter = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currencies = [
    { code: "USD", name: t("tools.currency-converter.currencies.usd") },
    { code: "EUR", name: t("tools.currency-converter.currencies.eur") },
    { code: "GBP", name: t("tools.currency-converter.currencies.gbp") },
    { code: "JPY", name: t("tools.currency-converter.currencies.jpy") },
    { code: "CNY", name: t("tools.currency-converter.currencies.cny") },
    { code: "CAD", name: t("tools.currency-converter.currencies.cad") },
    { code: "AUD", name: t("tools.currency-converter.currencies.aud") },
    { code: "CHF", name: t("tools.currency-converter.currencies.chf") },
    { code: "INR", name: t("tools.currency-converter.currencies.inr") },
    { code: "KRW", name: t("tools.currency-converter.currencies.krw") },
  ];

  const convertCurrency = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      toast.error(t("tools.currency-converter.pleaseEnterValidAmount"));
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      if (data.rates && data.rates[toCurrency]) {
        const converted = amt * data.rates[toCurrency];
        setResult(parseFloat(converted.toFixed(2)));
        toast.success(t("tools.currency-converter.conversionSuccessful"));
      } else {
        toast.error(t("tools.currency-converter.conversionFailed"));
      }
    } catch (error) {
      toast.error(t("tools.currency-converter.fetchFailed"));
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const clearAll = () => {
    setAmount("");
    setResult(null);
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    setAmount("100");
    setFromCurrency("USD");
    setToCurrency("EUR");
    setResult(null);
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
            <ArrowLeftRight className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.currency-converter.title")}
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
                  {t("tools.currency-converter.convertCurrency")}
                </CardTitle>
                <CardDescription>
                  {t("tools.currency-converter.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="currency-converter"
                toolName={t("tools.currency-converter.title")}
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
                {t("tools.currency-converter.amount")}
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("tools.currency-converter.from")}
              </label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="icon" onClick={swapCurrencies}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("tools.currency-converter.to")}
              </label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={convertCurrency}
              className="w-full"
              disabled={loading}
            >
              {loading
                ? t("tools.currency-converter.converting")
                : t("tools.currency-converter.convert")}
            </Button>
            {result !== null && (
              <div className="rounded-lg bg-primary/10 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {amount} {fromCurrency} =
                </p>
                <p className="text-4xl font-bold text-primary">
                  {result.toLocaleString()} {toCurrency}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.currency-converter.whatIs")}
              </strong>{" "}
              {t("tools.currency-converter.whatIsContent")}
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
                  <Plane className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.currency-converter.useCases.travel.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.currency-converter.useCases.travel.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <ShoppingBag className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.currency-converter.useCases.shopping.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t(
                      "tools.currency-converter.useCases.shopping.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Globe2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.currency-converter.useCases.business.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t(
                      "tools.currency-converter.useCases.business.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <TrendingUp className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.currency-converter.useCases.investment.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t(
                      "tools.currency-converter.useCases.investment.description"
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
                    __html: t("tools.currency-converter.proTips.realTime"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.currency-converter.proTips.fees"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.currency-converter.proTips.variations"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.currency-converter.proTips.estimates"),
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
              {t('toolPage.sections.relatedTools')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/unit-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.unit-converter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.unit-converter.description")}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CurrencyConverter;
