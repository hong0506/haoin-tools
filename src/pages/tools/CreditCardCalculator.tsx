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
          payoffTime: "Never (payment too low)",
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
      const payoffTime =
        years > 0
          ? `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${
              remainingMonths > 1 ? "s" : ""
            }`
          : `${Math.ceil(months)} month${Math.ceil(months) > 1 ? "s" : ""}`;
      setResult({
        payoffTime,
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        totalPaid: parseFloat(totalPaid.toFixed(2)),
      });
      toast.success("Calculation completed!");
    }
  };

  const clearAll = () => {
    setBalance("");
    setApr("");
    setMonthlyPayment("");
    setResult(null);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setBalance("5000");
    setApr("18.99");
    setMonthlyPayment("200");
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
            <CreditCard className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Credit Card Calculator</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Calculate Credit Card Payoff</CardTitle>
                <CardDescription>
                  Estimate when you'll be debt-free
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="credit-card-calculator"
                toolName="Credit Card Calculator"
              />
            </div>
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
              <label className="mb-2 block text-sm font-medium">
                Current Balance ($)
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
                Annual Percentage Rate (APR %)
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
                Monthly Payment ($)
              </label>
              <Input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                placeholder="200"
              />
            </div>
            <Button onClick={calculatePayoff} className="w-full">
              Calculate
            </Button>
            {result && (
              <div className="space-y-4 rounded-lg bg-secondary/50 p-6">
                <div className="text-center border-b pb-4">
                  <p className="text-sm text-muted-foreground">
                    Time to Pay Off
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {result.payoffTime}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Total Paid</p>
                    <p className="text-lg font-semibold">
                      ${result.totalPaid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Total Interest
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
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Credit Card Payoff Calculator?
              </strong>{" "}
              This tool calculates payoff time, total interest, and payments for
              credit card debt. Perfect for debt management and financial
              planning! 💳
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Common Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <TrendingDown className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Debt Management
                  </div>
                  <p className="text-sm text-blue-700">
                    Plan{" "}
                    <Badge variant="secondary" className="mx-1">
                      debt payoff
                    </Badge>
                    strategies and timelines
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Interest Analysis
                  </div>
                  <p className="text-sm text-purple-700">
                    Calculate total interest costs over the payoff period
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Budget Planning
                  </div>
                  <p className="text-sm text-green-700">
                    Optimize monthly payments within your budget
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <AlertTriangle className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Payment Strategy
                  </div>
                  <p className="text-sm text-pink-700">
                    Compare different payment amounts and timelines
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
              💡 Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Higher Payments:</strong> Reduce total interest
                  significantly
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Minimum Payments:</strong> Can take years to pay off
                  debt
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Pay More:</strong> Always pay more than minimum when
                  possible
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Lower APR:</strong> Can save thousands in interest
                  costs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🔗 Related Tools You Might Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/loan-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Loan Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate loan payments
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/interest-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Interest Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate interest
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/percentage-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Percentage Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate percentages
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
