import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Wallet,
  Info,
  Zap,
  Users,
  Receipt,
  DollarSign,
  Calculator,
  Link
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const TipCalculator = () => {
  const { t } = useTranslation();
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState([15]);
  const [numPeople, setNumPeople] = useState("1");
  const navigate = useNavigate();

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const people = parseInt(numPeople);
    if (!bill || bill <= 0) return { tip: 0, total: 0, perPerson: 0 };
    if (!people || people <= 0) return { tip: 0, total: 0, perPerson: 0 };
    const tip = (bill * tipPercent[0]) / 100;
    const total = bill + tip;
    const perPerson = total / people;
    return {
      tip: tip.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
    };
  };

  const result = calculateTip();

  const clearAll = () => {
    setBillAmount("");
    setTipPercent([15]);
    setNumPeople("1");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setBillAmount("125.50");
    setTipPercent([18]);
    setNumPeople("4");
    toast.success("Example loaded");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold flex-1">Tip Calculator</h1>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Calculate Tips & Split Bills</CardTitle>
                <CardDescription>
                  Calculate tips and divide bills among multiple people
                </CardDescription>
              </div>
              <FavoriteButton toolId="tip-calculator" toolName="Tip Calculator" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Label>Bill Amount ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="mt-2 text-lg"
              />
            </div>

            <div>
              <Label>Tip Percentage: {tipPercent[0]}%</Label>
              <Slider
                value={tipPercent}
                onValueChange={setTipPercent}
                min={0}
                max={30}
                step={1}
                className="mt-4"
              />
              <div className="flex gap-2 mt-2">
                {[10, 15, 18, 20].map((percent) => (
                  <Button
                    key={percent}
                    variant={tipPercent[0] === percent ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipPercent([percent])}
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Number of People</Label>
              <Input
                type="number"
                placeholder="1"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
                className="mt-2"
                min="1"
              />
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tip Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${result.tip}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Amount:</span>
                <span className="text-2xl font-bold">${result.total}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm font-medium">Per Person:</span>
                <span className="text-3xl font-bold text-primary">
                  ${result.perPerson}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Tip Calculator?
              </strong>{" "}
              This tool helps you calculate tips and split bills among multiple people. Perfect for dining out, group meals, and service payments! 🍽️
            </p>
          </CardContent>
        </Card>

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
                  <Receipt className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Restaurant Bills
                  </div>
                  <p className="text-sm text-blue-700">
                    Calculate appropriate tips for dining out
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Group Dinners
                  </div>
                  <p className="text-sm text-purple-700">
                    Split bills fairly among friends
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Service Tips
                  </div>
                  <p className="text-sm text-green-700">
                    Calculate tips for delivery and services
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Calculator className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Quick Math
                  </div>
                  <p className="text-sm text-pink-700">
                    Avoid mental math with instant calculations
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <strong>Standard Tip:</strong> 15-20% is standard in most countries
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Quick Buttons:</strong> Use preset percentages for speed
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Split Evenly:</strong> Perfect for group meals
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Adjustable:</strong> Slider for custom tip percentages
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              Related Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/discount-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Discount Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate discounts
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
              <button
                onClick={() => navigate("/tools/currency-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Currency Converter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert currencies
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TipCalculator;
