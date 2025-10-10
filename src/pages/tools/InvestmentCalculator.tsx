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
import { PiggyBank, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
            <CardTitle>Calculate Investment Growth</CardTitle>
            <CardDescription>
              Estimate your investment returns over time
            </CardDescription>
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

        <ToolDescription
          title="Investment Calculator"
          description="Calculate the future value of your investments with regular monthly contributions. This tool helps you plan for retirement, education, or other long-term financial goals by showing how your investments can grow over time."
          features={[
            "Calculate future investment value",
            "Include initial investment and monthly contributions",
            "Customize annual return rate",
            "Show total contributions and earnings separately",
            "Plan for various investment periods",
            "Clear visualization of growth potential",
          ]}
          useCases={[
            "Retirement planning",
            "Education savings",
            "Wealth building",
            "Financial goal setting",
            "Investment strategy comparison",
            "Savings plan evaluation",
            "Portfolio growth projection",
            "Long-term financial planning",
          ]}
          tips={[
            "Start investing early to maximize compound growth",
            "Regular monthly contributions add up significantly",
            "Historical stock market returns average 8-10% annually",
            "Consider your risk tolerance when estimating returns",
          ]}
        />
      </div>
    </div>
  );
};

export default InvestmentCalculator;
