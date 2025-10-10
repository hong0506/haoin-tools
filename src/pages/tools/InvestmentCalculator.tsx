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
  PiggyBank,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  TrendingUp,
  GraduationCap,
  Wallet,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    totalEarnings: number;
  } | null>(null);
  const navigate = useNavigate();

  const calculateInvestment = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) / 100 / 12;
    const months = parseFloat(years) * 12;
    if ((initial > 0 || monthly > 0) && rate >= 0 && months > 0) {
      const fvInitial = initial * Math.pow(1 + rate, months);
      const fvMonthly = monthly * ((Math.pow(1 + rate, months) - 1) / rate);
      const futureValue = fvInitial + fvMonthly;
      const totalContributions = initial + monthly * months;
      const totalEarnings = futureValue - totalContributions;
      setResult({
        futureValue: parseFloat(futureValue.toFixed(2)),
        totalContributions: parseFloat(totalContributions.toFixed(2)),
        totalEarnings: parseFloat(totalEarnings.toFixed(2)),
      });
      toast.success("Investment calculated!");
    }
  };

  const clearAll = () => {
    setInitialInvestment("");
    setMonthlyContribution("");
    setAnnualReturn("");
    setYears("");
    setResult(null);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setInitialInvestment("10000");
    setMonthlyContribution("500");
    setAnnualReturn("8");
    setYears("20");
    setResult(null);
    toast.success("Example loaded");
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
            <h1 className="text-xl font-semibold">Investment Calculator</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Calculate Investment Growth</CardTitle>
                <CardDescription>
                  Estimate your investment returns over time
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="investment-calculator"
                toolName="Investment Calculator"
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
                Initial Investment ($)
              </label>
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="10000"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Monthly Contribution ($)
              </label>
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Expected Annual Return (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                placeholder="8"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Investment Period (years)
              </label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="20"
              />
            </div>
            <Button onClick={calculateInvestment} className="w-full">
              Calculate Investment
            </Button>
            {result && (
              <div className="space-y-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                <div className="text-center border-b pb-4">
                  <p className="text-sm text-muted-foreground">Future Value</p>
                  <p className="text-5xl font-bold text-primary">
                    ${result.futureValue.toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Total Contributions
                    </p>
                    <p className="text-xl font-semibold">
                      ${result.totalContributions.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Total Earnings
                    </p>
                    <p className="text-xl font-semibold text-green-500">
                      ${result.totalEarnings.toLocaleString()}
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
                What is Investment Calculator?
              </strong>{" "}
              This tool calculates future investment value with monthly
              contributions. Perfect for retirement planning, education savings,
              and wealth building! 📈
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
                  <Wallet className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Retirement Planning
                  </div>
                  <p className="text-sm text-blue-700">
                    Calculate{" "}
                    <Badge variant="secondary" className="mx-1">
                      retirement
                    </Badge>
                    savings growth over decades
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Education Savings
                  </div>
                  <p className="text-sm text-purple-700">
                    Plan for college funds and education expenses
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Wealth Building
                  </div>
                  <p className="text-sm text-green-700">
                    Track long-term portfolio growth and investment returns
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Target className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Financial Goals
                  </div>
                  <p className="text-sm text-pink-700">
                    Set and achieve specific financial milestones
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
                  <strong>Start Early:</strong> Time maximizes compound growth
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Regular Contributions:</strong> Monthly savings add up
                  significantly
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Returns:</strong> Stock market averages 8-10% annually
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Risk:</strong> Consider tolerance when estimating
                  returns
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

export default InvestmentCalculator;
