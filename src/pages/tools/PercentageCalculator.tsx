import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Percent, ArrowLeft, RotateCcw, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");
  const [percentage, setPercentage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculatePercentage = () => {
    const v = parseFloat(value);
    const t = parseFloat(total);
    if (!isNaN(v) && !isNaN(t) && t !== 0) {
      setPercentage(((v / t) * 100).toFixed(2));
    }
  };

  const calculateValue = () => {
    const p = parseFloat(percentage);
    const t = parseFloat(total);
    if (!isNaN(p) && !isNaN(t)) {
      setValue(((p * t) / 100).toFixed(2));
    }
  };

  const clearAll = () => {
    setValue("");
    setTotal("");
    setPercentage("");
  };

  const loadExample = () => {
    setValue("25");
    setTotal("100");
    setPercentage("25");
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
            <h1 className="text-xl font-semibold">Percentage Calculator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Percentage Calculator</CardTitle>
                <CardDescription>
                  Calculate percentages and percentage changes
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="percentage-calculator"
                toolName="Percentage Calculator"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button onClick={clearAll} variant="outline" size="sm">
                Clear
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What % of</CardTitle>
              <CardDescription>Calculate percentage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Value</label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    calculatePercentage();
                  }}
                  placeholder="25"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Total</label>
                <Input
                  type="number"
                  value={total}
                  onChange={(e) => {
                    setTotal(e.target.value);
                    calculatePercentage();
                  }}
                  placeholder="100"
                />
              </div>

              {percentage && (
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {percentage}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>% of what</CardTitle>
              <CardDescription>Calculate value from percentage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Percentage
                </label>
                <Input
                  type="number"
                  value={percentage}
                  onChange={(e) => {
                    setPercentage(e.target.value);
                    calculateValue();
                  }}
                  placeholder="25"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Total</label>
                <Input
                  type="number"
                  value={total}
                  onChange={(e) => {
                    setTotal(e.target.value);
                    calculateValue();
                  }}
                  placeholder="100"
                />
              </div>

              {value && (
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{value}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <ToolDescription
          title="Percentage Calculator"
          description="Percentage calculations are essential in finance, statistics, business, and everyday life. This tool helps you quickly calculate percentages, find what percentage one number is of another, and calculate values from percentages."
          features={[
            "Calculate what percentage one number is of another",
            "Calculate value from percentage and total",
            "Real-time calculation as you type",
            "Support for decimal numbers",
            "Simple and intuitive interface",
            "Two-way percentage calculations",
          ]}
          useCases={[
            "Financial calculations",
            "Sales discounts",
            "Tax calculations",
            "Grade calculations",
            "Statistical analysis",
            "Business metrics",
            "Budget planning",
            "Commission calculations",
          ]}
          tips={[
            "Percentage means 'per hundred' - 50% = 50/100 = 0.5",
            "Use for calculating tips, discounts, and taxes",
            "Perfect for comparing values and ratios",
            "Helpful for understanding data and statistics",
          ]}
        />
      </div>
    </div>
  );
};

export default PercentageCalculator;
