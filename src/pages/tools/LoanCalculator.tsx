import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import { DollarSign, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [termUnit, setTermUnit] = useState("years");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateLoan = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = termUnit === "years" ? parseFloat(term) * 12 : parseFloat(term);
    if (p > 0 && r >= 0 && n > 0) {
      const monthlyPayment =
        r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - p;
      setResult({
        monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
        totalPayment: parseFloat(totalPayment.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
      });
      toast.success("Loan calculated successfully!");
    } else {
      toast.error("Please enter valid values for all fields");
    }
  };

  const clearAll = () => {
    setPrincipal("");
    setInterestRate("");
    setTerm("");
    setTermUnit("years");
    setResult(null);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setPrincipal("250000");
    setInterestRate("5.5");
    setTerm("30");
    setTermUnit("years");
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
            <h1 className="text-xl font-semibold">Loan Calculator</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Calculate Your Loan</CardTitle>
                <CardDescription>
                  Calculate monthly payments, total cost, and interest
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="loan-calculator"
                toolName="Loan Calculator"
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
                Loan Amount ($)
              </label>
              <Input
                type="number"
                step="0.01"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="250000"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Interest Rate (%)
              </label>
              <Input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="5.5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Loan Term
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="30"
                  className="flex-1"
                />
                <Select value={termUnit} onValueChange={setTermUnit}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={calculateLoan} className="w-full">
              Calculate
            </Button>
            {result && (
              <div className="space-y-4 rounded-lg bg-secondary/50 p-6">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-sm text-muted-foreground">
                    Monthly Payment
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ${result.monthlyPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-sm text-muted-foreground">
                    Total Payment
                  </span>
                  <span className="text-lg font-semibold">
                    ${result.totalPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Interest
                  </span>
                  <span className="text-lg font-semibold text-orange-500">
                    ${result.totalInterest.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="Loan Calculator"
          description="Loan calculations are essential for understanding the financial implications of borrowing money. This tool helps you calculate monthly payments, total interest, and total amount paid for loans, making it easier to plan your finances and compare different loan options."
          features={[
            "Calculate monthly loan payments",
            "Compute total interest over loan term",
            "Calculate total amount paid",
            "Support for different loan terms (years/months)",
            "Clear all fields with a single button",
            "Load example values for testing",
          ]}
          useCases={[
            "Mortgage planning",
            "Auto loan comparison",
            "Personal loan evaluation",
            "Business loan analysis",
            "Financial planning",
            "Investment decisions",
            "Budget planning",
            "Loan refinancing",
          ]}
          tips={[
            "Lower interest rates significantly reduce total cost",
            "Shorter loan terms mean higher monthly payments but less total interest",
            "Consider your monthly budget when choosing loan terms",
            "Always compare multiple loan offers before deciding",
          ]}
        />
      </div>
    </div>
  );
};

export default LoanCalculator;
