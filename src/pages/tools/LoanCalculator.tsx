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
import {
  DollarSign,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Home,
  Car,
  Briefcase,
  TrendingDown,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

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

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Loan Calculator?</strong>{" "}
              This tool calculates monthly payments, total interest, and repayment
              amounts for loans. Perfect for mortgage, auto, and personal loan
              planning! 🏦
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
                  <Home className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Mortgage Planning</div>
                  <p className="text-sm text-blue-700">
                    Calculate{" "}
                    <Badge variant="secondary" className="mx-1">
                      home loan
                    </Badge>
                    payments and affordability
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Car className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Auto Loans</div>
                  <p className="text-sm text-purple-700">
                    Compare car financing options and monthly payments
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">Business Loans</div>
                  <p className="text-sm text-green-700">
                    Evaluate business financing and repayment schedules
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <TrendingDown className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Refinancing</div>
                  <p className="text-sm text-pink-700">
                    Compare refinancing options to save on interest
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
                  <strong>Interest Rate:</strong> Lower rates reduce total cost
                  significantly
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Loan Term:</strong> Shorter terms = higher payments, less
                  interest
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Budget:</strong> Ensure monthly payments fit your budget
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Compare:</strong> Always shop around for the best rates
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
                onClick={() => navigate("/tools/investment-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Investment Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate returns
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

export default LoanCalculator;
