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
import { Activity, ArrowLeft, RotateCcw, Lightbulb } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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

        <ToolDescription
          title="BMI Calculator"
          description="Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. This tool helps you calculate your BMI quickly and categorize it according to standard health classifications."
          features={[
            "Calculate BMI from height and weight",
            "Categorize BMI into health classifications",
            "Support for metric units (cm and kg)",
            "Color-coded results for easy interpretation",
            "Health category indicators",
            "Real-time calculation",
          ]}
          useCases={[
            "Health assessment",
            "Weight management",
            "Fitness tracking",
            "Medical consultations",
            "Diet planning",
            "Wellness programs",
            "Personal health monitoring",
            "Nutrition counseling",
          ]}
          tips={[
            "BMI is a screening tool, not a diagnostic measure",
            "Normal BMI range is 18.5-24.9",
            "Consult healthcare professionals for personalized advice",
            "BMI may not be accurate for athletes or elderly individuals",
          ]}
        />
      </div>
    </div>
  );
};

export default BmiCalculator;
