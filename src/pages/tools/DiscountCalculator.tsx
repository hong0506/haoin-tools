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
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  BadgePercent,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const navigate = useNavigate();

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (!price || price <= 0) return { saved: 0, final: 0 };
    if (!discount || discount < 0) return { saved: 0, final: price };

    const saved = (price * discount) / 100;
    const final = price - saved;

    return {
      saved: saved.toFixed(2),
      final: final.toFixed(2),
    };
  };

  const result = calculate();

  const clearAll = () => {
    setOriginalPrice("");
    setDiscountPercent("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setOriginalPrice("199.99");
    setDiscountPercent("25");
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
          <h1 className="text-xl font-semibold">Discount Calculator</h1>
          <div className="ml-auto">
            <FavoriteButton
              toolId="discount-calculator"
              toolName="Discount Calculator"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Discounts</CardTitle>
            <CardDescription>
              Calculate discount amount and final price
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
              <Label>Original Price ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="mt-2 text-lg"
              />
            </div>

            <div>
              <Label>Discount (%)</Label>
              <Input
                type="number"
                placeholder="0"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="mt-2 text-lg"
                min="0"
                max="100"
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-6 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">You Save:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${result.saved}
                </span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm font-medium">Final Price:</span>
                <span className="text-3xl font-bold text-primary">
                  ${result.final}
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
                  <strong>Shopping:</strong> Compare discounts across stores
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Quick Math:</strong> Instantly see your savings
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiscountCalculator;
