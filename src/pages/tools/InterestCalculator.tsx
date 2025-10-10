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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  PiggyBank,
  TrendingDown,
  Wallet,
  LineChart,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const InterestCalculator = () => {
  const [simpleInputs, setSimpleInputs] = useState({
    principal: "",
    rate: "",
    time: "",
  });
  const [compoundInputs, setCompoundInputs] = useState({
    principal: "",
    rate: "",
    time: "",
    frequency: "12",
  });
  const [simpleResult, setSimpleResult] = useState<number | null>(null);
  const [compoundResult, setCompoundResult] = useState<{
    total: number;
    interest: number;
  } | null>(null);
  const navigate = useNavigate();

  const calculateSimple = () => {
    const p = parseFloat(simpleInputs.principal);
    const r = parseFloat(simpleInputs.rate) / 100;
    const t = parseFloat(simpleInputs.time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      toast.error("Please enter valid numbers");
      return;
    }

    if (p <= 0 || r <= 0 || t <= 0) {
      toast.error("All values must be greater than 0");
      return;
    }

    const interest = p * r * t;
    setSimpleResult(parseFloat(interest.toFixed(2)));
    toast.success("Simple interest calculated!");
  };

  const clearSimple = () => {
    setSimpleInputs({ principal: "", rate: "", time: "" });
    setSimpleResult(null);
    toast.success("Fields cleared");
  };

  const loadSimpleExample = () => {
    setSimpleInputs({ principal: "10000", rate: "5", time: "3" });
    setSimpleResult(null);
    toast.success("Example loaded");
  };

  const calculateCompound = () => {
    const p = parseFloat(compoundInputs.principal);
    const r = parseFloat(compoundInputs.rate) / 100;
    const t = parseFloat(compoundInputs.time);
    const n = parseFloat(compoundInputs.frequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
      toast.error("Please enter valid numbers");
      return;
    }

    if (p <= 0 || r <= 0 || t <= 0 || n <= 0) {
      toast.error("All values must be greater than 0");
      return;
    }

    const total = p * Math.pow(1 + r / n, n * t);
    const interest = total - p;
    setCompoundResult({
      total: parseFloat(total.toFixed(2)),
      interest: parseFloat(interest.toFixed(2)),
    });
    toast.success("Compound interest calculated!");
  };

  const clearCompound = () => {
    setCompoundInputs({ principal: "", rate: "", time: "", frequency: "12" });
    setCompoundResult(null);
    toast.success("Fields cleared");
  };

  const loadCompoundExample = () => {
    setCompoundInputs({
      principal: "10000",
      rate: "5",
      time: "3",
      frequency: "12",
    });
    setCompoundResult(null);
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
            <h1 className="text-xl font-semibold">Interest Calculator</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Tabs defaultValue="simple" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid grid-cols-2 max-w-lg">
              <TabsTrigger value="simple">Simple Interest</TabsTrigger>
              <TabsTrigger value="compound">Compound Interest</TabsTrigger>
            </TabsList>
            <FavoriteButton
              toolId="interest-calculator"
              toolName="Interest Calculator"
            />
          </div>
          <TabsContent value="simple">
            <Card>
              <CardHeader>
                <CardTitle>Simple Interest</CardTitle>
                <CardDescription>I = P × R × T</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={clearSimple} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button onClick={loadSimpleExample} variant="ghost" size="sm">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Load Example
                  </Button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Principal Amount ($)
                  </label>
                  <Input
                    type="number"
                    value={simpleInputs.principal}
                    onChange={(e) =>
                      setSimpleInputs({
                        ...simpleInputs,
                        principal: e.target.value,
                      })
                    }
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Annual Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={simpleInputs.rate}
                    onChange={(e) =>
                      setSimpleInputs({ ...simpleInputs, rate: e.target.value })
                    }
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Time Period (years)
                  </label>
                  <Input
                    type="number"
                    value={simpleInputs.time}
                    onChange={(e) =>
                      setSimpleInputs({ ...simpleInputs, time: e.target.value })
                    }
                    placeholder="5"
                  />
                </div>
                <Button onClick={calculateSimple} className="w-full">
                  Calculate Simple Interest
                </Button>
                {simpleResult !== null && (
                  <div className="space-y-3 rounded-lg bg-primary/10 p-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Interest Earned
                      </p>
                      <p className="text-4xl font-bold text-primary">
                        ${simpleResult.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center border-t pt-3">
                      <p className="text-sm text-muted-foreground">
                        Total Amount
                      </p>
                      <p className="text-2xl font-semibold text-green-500">
                        $
                        {(
                          parseFloat(simpleInputs.principal) + simpleResult
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="compound">
            <Card>
              <CardHeader>
                <CardTitle>Compound Interest</CardTitle>
                <CardDescription>A = P(1 + r/n)^(nt)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={clearCompound} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    onClick={loadCompoundExample}
                    variant="ghost"
                    size="sm"
                  >
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Load Example
                  </Button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Principal Amount ($)
                  </label>
                  <Input
                    type="number"
                    value={compoundInputs.principal}
                    onChange={(e) =>
                      setCompoundInputs({
                        ...compoundInputs,
                        principal: e.target.value,
                      })
                    }
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Annual Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={compoundInputs.rate}
                    onChange={(e) =>
                      setCompoundInputs({
                        ...compoundInputs,
                        rate: e.target.value,
                      })
                    }
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Time Period (years)
                  </label>
                  <Input
                    type="number"
                    value={compoundInputs.time}
                    onChange={(e) =>
                      setCompoundInputs({
                        ...compoundInputs,
                        time: e.target.value,
                      })
                    }
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Compound Frequency (times/year)
                  </label>
                  <Input
                    type="number"
                    value={compoundInputs.frequency}
                    onChange={(e) =>
                      setCompoundInputs({
                        ...compoundInputs,
                        frequency: e.target.value,
                      })
                    }
                    placeholder="12"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    1=Annually, 4=Quarterly, 12=Monthly, 365=Daily
                  </p>
                </div>
                <Button onClick={calculateCompound} className="w-full">
                  Calculate Compound Interest
                </Button>
                {compoundResult && (
                  <div className="space-y-3 rounded-lg bg-primary/10 p-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Final Amount
                      </p>
                      <p className="text-4xl font-bold text-primary">
                        ${compoundResult.total.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center border-t pt-3">
                      <p className="text-sm text-muted-foreground">
                        Interest Earned
                      </p>
                      <p className="text-2xl font-semibold text-green-500">
                        ${compoundResult.interest.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Interest Calculator?
              </strong>{" "}
              This tool calculates simple and compound interest for savings and
              investments. Perfect for financial planning and understanding
              money growth! 💰
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
                  <PiggyBank className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Savings Accounts
                  </div>
                  <p className="text-sm text-blue-700">
                    Calculate{" "}
                    <Badge variant="secondary" className="mx-1">
                      interest earned
                    </Badge>
                    on savings over time
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <LineChart className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Investment Planning
                  </div>
                  <p className="text-sm text-purple-700">
                    Forecast investment returns with compound interest
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Retirement Planning
                  </div>
                  <p className="text-sm text-green-700">
                    Calculate long-term savings growth for retirement
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <TrendingDown className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Loan Interest
                  </div>
                  <p className="text-sm text-pink-700">
                    Calculate interest costs on loans and debts
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
                  <strong>Compound Interest:</strong> Grows faster than simple
                  interest
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Frequency:</strong> More frequent compounding = more
                  growth
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Long-term:</strong> Use compound for investments over
                  years
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Impact:</strong> Higher rates significantly boost
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

export default InterestCalculator;
