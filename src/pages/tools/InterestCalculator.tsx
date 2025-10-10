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
import { TrendingUp, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
            <div className="ml-auto">
              <FavoriteButton
                toolId="interest-calculator"
                toolName="Interest Calculator"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">SimpleInterest</TabsTrigger>
            <TabsTrigger value="compound">Compound Interest</TabsTrigger>
          </TabsList>
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

        <ToolDescription
          title="Interest Calculator"
          description="Calculate simple and compound interest for investments, loans, and savings. This tool helps you understand how your money grows over time with different interest rates and compounding frequencies."
          features={[
            "Calculate simple interest (I = P × R × T)",
            "Calculate compound interest with custom frequency",
            "Support for various compounding periods",
            "Clear results showing principal, interest, and total",
            "Load example calculations for testing",
            "Compare simple vs compound interest",
          ]}
          useCases={[
            "Savings accounts",
            "Investment planning",
            "Loan calculations",
            "Financial forecasting",
            "Retirement planning",
            "Education funding",
            "Certificate of deposit (CD)",
            "Money market accounts",
          ]}
          tips={[
            "Compound interest grows faster than simple interest",
            "More frequent compounding = more interest earned",
            "Use compound calculator for long-term investments",
            "Higher interest rates significantly impact long-term growth",
          ]}
        />
      </div>
    </div>
  );
};

export default InterestCalculator;
