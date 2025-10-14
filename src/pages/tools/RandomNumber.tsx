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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Shuffle,
  Info,
  Zap,
  Dices,
  Hash,
  Lock,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const RandomNumber = () => {
  const { t } = useTranslation();
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const navigate = useNavigate();

  const generateNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) {
      toast.error("Please enter valid numbers");
      return;
    }

    if (minNum >= maxNum) {
      toast.error("Min must be less than Max");
      return;
    }

    if (countNum < 1) {
      toast.error("Count must be at least 1");
      return;
    }

    if (!allowDuplicates && countNum > maxNum - minNum + 1) {
      toast.error("Not enough unique numbers in range");
      return;
    }

    const numbers: number[] = [];
    const used = new Set<number>();

    for (let i = 0; i < countNum; i++) {
      let num;
      if (allowDuplicates) {
        num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      } else {
        do {
          num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        } while (used.has(num));
        used.add(num);
      }
      numbers.push(num);
    }

    setResults(numbers);
    toast.success(`Generated ${countNum} random number(s)!`);
  };

  const clearAll = () => {
    setMin("1");
    setMax("100");
    setCount("1");
    setResults([]);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setMin("1");
    setMax("50");
    setCount("6");
    setAllowDuplicates(false);
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
          <h1 className="text-xl font-semibold flex-1">Random Number Generator</h1>
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
                <CardTitle>Generate Random Numbers</CardTitle>
                <CardDescription>
                  Generate random numbers with custom range and options
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="random-number"
                toolName="Random Number Generator"
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum</Label>
                <Input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Maximum</Label>
                <Input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>How many numbers?</Label>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="mt-2"
                min="1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="duplicates"
                checked={allowDuplicates}
                onCheckedChange={(checked) =>
                  setAllowDuplicates(checked as boolean)
                }
              />
              <label
                htmlFor="duplicates"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow duplicate numbers
              </label>
            </div>

            <Button onClick={generateNumbers} className="w-full">
              <Shuffle className="h-4 w-4 mr-2" />
              Generate Random Numbers
            </Button>

            {results.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-lg">
                <div className="text-sm font-medium mb-3">
                  Generated Numbers:
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.map((num, idx) => (
                    <Badge
                      key={idx}
                      variant="default"
                      className="text-lg px-4 py-2"
                    >
                      {num}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Random Number Generator?
              </strong>{" "}
              This tool generates random numbers within your specified range. Perfect for games, raffles, statistical sampling, and random selections! 🎲
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
                  <Dices className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Games & Raffles
                  </div>
                  <p className="text-sm text-blue-700">
                    Pick random winners or generate dice rolls
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Hash className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Lottery Numbers
                  </div>
                  <p className="text-sm text-purple-700">
                    Generate lottery or bingo numbers
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Statistical Sampling
                  </div>
                  <p className="text-sm text-green-700">
                    Random selection for research and surveys
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Lock className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Testing & Simulation
                  </div>
                  <p className="text-sm text-pink-700">
                    Generate test data for development
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
                  <strong>Unique Numbers:</strong> Uncheck duplicates for lottery-style picks
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Custom Range:</strong> Set any min/max values you need
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Multiple Numbers:</strong> Generate up to hundreds at once
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Instant Results:</strong> Numbers appear immediately
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t('tools.random-number.relatedTools')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/password-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Password Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate secure passwords
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  UUID Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate unique IDs
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/color-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Color Picker
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Pick and convert colors
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RandomNumber;
