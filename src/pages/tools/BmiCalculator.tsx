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
  Activity,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Zap,
  Info,
  Heart,
  TrendingUp,
  Apple,
  Scale,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const BmiCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateBmi = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));

      if (bmiValue < 18.5) setCategory("Underweight");
      else if (bmiValue < 25) setCategory("Normal weight");
      else if (bmiValue < 30) setCategory("Overweight");
      else setCategory("Obese");
    }
  };

  const clearAll = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  const loadExample = () => {
    setHeight("170");
    setWeight("70");
    setTimeout(() => calculateBmi(), 0);
  };

  const getBmiColor = () => {
    if (!bmi) return "text-muted-foreground";
    if (bmi < 18.5) return "text-blue-500";
    if (bmi < 25) return "text-green-500";
    if (bmi < 30) return "text-yellow-500";
    return "text-red-500";
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
            <h1 className="text-xl font-semibold">BMI Calculator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>BMI Calculator</CardTitle>
                <CardDescription>Body Mass Index Calculator</CardDescription>
              </div>
              <FavoriteButton
                toolId="bmi-calculator"
                toolName="BMI Calculator"
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
                Height (cm)
              </label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="170"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Weight (kg)
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
              />
            </div>

            <Button onClick={calculateBmi} className="w-full">
              Calculate BMI
            </Button>

            {bmi !== null && (
              <div className="space-y-4 rounded-lg bg-secondary/50 p-6 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Your BMI</p>
                  <p className={`text-5xl font-bold ${getBmiColor()}`}>{bmi}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className={`text-2xl font-semibold ${getBmiColor()}`}>
                    {category}
                  </p>
                </div>

                <div className="mt-6 space-y-2 text-left text-sm">
                  <p className="text-blue-500">• Underweight: BMI &lt; 18.5</p>
                  <p className="text-green-500">
                    • Normal weight: BMI 18.5 - 24.9
                  </p>
                  <p className="text-yellow-500">• Overweight: BMI 25 - 29.9</p>
                  <p className="text-red-500">• Obese: BMI ≥ 30</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is BMI Calculator?</strong>{" "}
              This tool calculates your Body Mass Index (BMI) based on height and
              weight. Perfect for health assessment, fitness tracking, and weight
              management! 💪
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
                  <Heart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Health Assessment
                  </div>
                  <p className="text-sm text-blue-700">
                    Monitor your{" "}
                    <Badge variant="secondary" className="mx-1">
                      BMI
                    </Badge>
                    for overall health evaluation
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Scale className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Weight Management
                  </div>
                  <p className="text-sm text-purple-700">
                    Track progress during weight loss or gain journeys
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Fitness Tracking
                  </div>
                  <p className="text-sm text-green-700">
                    Monitor BMI changes as part of fitness goals
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Apple className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Diet Planning
                  </div>
                  <p className="text-sm text-pink-700">
                    Use BMI as a reference for nutrition goals
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
                  <strong>Screening Tool:</strong> BMI is not a diagnostic measure
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Normal Range:</strong> 18.5-24.9 is considered healthy
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Consult Experts:</strong> Get personalized health advice
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Limitations:</strong> May not suit athletes or elderly
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
                onClick={() => navigate("/tools/age-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Age Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">Calculate age</div>
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
                onClick={() => navigate("/tools/unit-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Unit Converter
                </div>
                <div className="text-sm text-gray-600 mt-1">Convert units</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BmiCalculator;
