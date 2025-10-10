import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
} from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "INR", name: "Indian Rupee" },
    { code: "KRW", name: "South Korean Won" },
  ];

  const convertCurrency = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid amount");
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
        toast.success("Conversion successful!");
      } else {
        toast.error("Currency conversion failed");
      }
    } catch (error) {
      toast.error("Failed to fetch exchange rates");
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
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setAmount("100");
    setFromCurrency("USD");
    setToCurrency("EUR");
    setResult(null);
    toast.success("Example loaded");
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
            <h1 className="text-xl font-semibold">Currency Converter</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Convert Currency</CardTitle>
            <CardDescription>Real-time currency exchange rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">From</label>
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
              <label className="mb-2 block text-sm font-medium">To</label>
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
              {loading ? "Converting..." : "Convert"}
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

        <ToolDescription
          title="Currency Converter"
          description="Convert between different currencies using real-time exchange rates. This tool helps you quickly calculate currency conversions for travel, international business, shopping, and financial planning."
          features={[
            "Real-time currency exchange rates",
            "Support for major world currencies",
            "Swap currencies with one click",
            "Clear and intuitive interface",
            "Accurate conversion calculations",
            "Load example conversions for testing",
          ]}
          useCases={[
            "International travel",
            "Online shopping",
            "Business transactions",
            "Financial planning",
            "Investment analysis",
            "Price comparisons",
            "Expense tracking",
            "Currency trading",
          ]}
          tips={[
            "Exchange rates update in real-time",
            "Consider fees when exchanging actual currency",
            "Rates may vary between different exchange services",
            "Use for quick estimates and comparisons",
          ]}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
