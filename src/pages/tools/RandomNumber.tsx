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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Dices,
  Info,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const RandomNumber = () => {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const navigate = useNavigate();

  const generateNumbers = () => {
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const countVal = parseInt(count);

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) {
      toast.error("Please enter valid numbers");
      return;
    }

    if (minVal >= maxVal) {
      toast.error("Min must be less than Max");
      return;
    }

    if (countVal <= 0) {
      toast.error("Count must be greater than 0");
      return;
    }

    if (!allowDuplicates && countVal > maxVal - minVal + 1) {
      toast.error("Count exceeds available unique numbers");
      return;
    }

    const numbers: number[] = [];
    const available = new Set<number>();

    if (!allowDuplicates) {
      for (let i = minVal; i <= maxVal; i++) {
        available.add(i);
      }
    }

    for (let i = 0; i < countVal; i++) {
      if (!allowDuplicates && available.size === 0) break;

      let num: number;
      if (allowDuplicates) {
        num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      } else {
        const availableArray = Array.from(available);
        const randomIndex = Math.floor(Math.random() * availableArray.length);
        num = availableArray[randomIndex];
        available.delete(num);
      }
      numbers.push(num);
    }

    setResults(numbers);
    toast.success(`Generated ${numbers.length} number(s)`);
  };

  const copyResults = () => {
    if (results.length > 0) {
      navigator.clipboard.writeText(results.join(", "));
      toast.success("Copied to clipboard!");
    }
  };

  const clearAll = () => {
    setMin("1");
    setMax("100");
    setCount("1");
    setAllowDuplicates(true);
    setResults([]);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setMin("1");
    setMax("50");
    setCount("10");
    setAllowDuplicates(false);
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
          <h1 className="text-xl font-semibold">Random Number Generator</h1>
          <div className="ml-auto">
            <FavoriteButton
              toolId="random-number"
              toolName="Random Number Generator"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Random Numbers</CardTitle>
            <CardDescription>
              Generate random numbers within a specified range
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum</Label>
                <Input
                  type="number"
                  placeholder="1"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Maximum</Label>
                <Input
                  type="number"
                  placeholder="100"
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
                placeholder="1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="mt-2"
                min="1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="allow-duplicates"
                checked={allowDuplicates}
                onCheckedChange={(checked) =>
                  setAllowDuplicates(checked as boolean)
                }
              />
              <label
                htmlFor="allow-duplicates"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow duplicate numbers
              </label>
            </div>

            <Button onClick={generateNumbers} className="w-full">
              <Dices className="h-4 w-4 mr-2" />
              Generate
            </Button>

            {results.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Results</Label>
                  <Button variant="outline" size="sm" onClick={copyResults}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {results.map((num, index) => (
                      <Badge
                        key={index}
                        variant="default"
                        className="text-lg px-4 py-2"
                      >
                        {num}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
                  <strong>Lottery:</strong> Generate lucky numbers
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Unique:</strong> Uncheck duplicates for unique numbers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RandomNumber;
