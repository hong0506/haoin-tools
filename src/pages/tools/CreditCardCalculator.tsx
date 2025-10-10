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
import { CreditCard, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
            <CardTitle>Calculate Credit Card Payoff</CardTitle>
            <CardDescription>Estimate when you'll be debt-free</CardDescription>
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

        <ToolDescription
          title="Credit Card Payoff Calculator"
          description="Understanding how long it will take to pay off credit card debt is crucial for financial planning. This calculator helps you determine the payoff timeline, total interest paid, and total amount you'll pay based on your current balance, APR, and monthly payment amount."
          features={[
            "Calculate credit card payoff time",
            "Compute total interest paid over time",
            "Show total amount to be paid",
            "Support for different APR rates",
            "Handle various monthly payment amounts",
            "Clear all fields with a single button",
          ]}
          useCases={[
            "Debt management",
            "Financial planning",
            "Budget optimization",
            "Payment strategy comparison",
            "Interest cost analysis",
            "Debt reduction planning",
            "Credit counseling",
            "Personal finance management",
          ]}
          tips={[
            "Higher monthly payments reduce total interest significantly",
            "Making minimum payments can take years to pay off debt",
            "Consider paying more than the minimum when possible",
            "Lower APR credit cards can save thousands in interest",
          ]}
        />
      </div>
    </div>
  );
};

export default CreditCardCalculator;
