import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const TipCalculator = () => {
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
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Tip Calculator</h1>
          <div className="ml-auto">
            <FavoriteButton toolId="tip-calculator" toolName="Tip Calculator" />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Tips & Split Bills</CardTitle>
            <CardDescription>
              Calculate tips and divide bills among multiple people
            </CardDescription>
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
                  <strong>Standard Tip:</strong> 15-20% for good service
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Split Evenly:</strong> Easy bill splitting with friends
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TipCalculator;
