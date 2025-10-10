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
import { Cake, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);
  const navigate = useNavigate();

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );

    setResult({ years, months, days, totalDays });
    toast.success("Age calculated!");
  };

  const clearAll = () => {
    setBirthDate("");
    setResult(null);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    const exampleDate = new Date();
    exampleDate.setFullYear(exampleDate.getFullYear() - 25);
    setBirthDate(exampleDate.toISOString().split("T")[0]);
    setResult(null);
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
          <h1 className="text-xl font-semibold">Age Calculator</h1>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Calculate Your Age</CardTitle>
                <CardDescription>
                  Find your exact age in years, months, and days
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="age-calculator"
                toolName="Age Calculator"
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
                Date of Birth
              </label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <Button onClick={calculateAge} className="w-full">
              Calculate Age
            </Button>
            {result && (
              <div className="space-y-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                <div className="text-center border-b pb-4">
                  <p className="text-sm text-muted-foreground">Your Age</p>
                  <p className="text-4xl font-bold text-primary">
                    {result.years} years {result.months} months {result.days}{" "}
                    days
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Days</p>
                  <p className="text-2xl font-semibold">
                    {result.totalDays.toLocaleString()} days
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="Age Calculator"
          description="Calculate your exact age in years, months, and days based on your date of birth. This tool helps you find your precise age, total days lived, and provides detailed age breakdown for various purposes like documentation, birthday planning, and milestone tracking."
          features={[
            "Calculate exact age in years, months, and days",
            "Show total days lived since birth",
            "Real-time calculation from date of birth",
            "Support for any valid date",
            "Clear all fields with a single button",
            "Load example date for testing",
          ]}
          useCases={[
            "Birthday planning",
            "Age verification",
            "Milestone tracking",
            "Documentation requirements",
            "School enrollment",
            "Insurance applications",
            "Legal age verification",
            "Personal records",
          ]}
          tips={[
            "Use this to calculate exact age for official documents",
            "Perfect for planning milestone birthdays",
            "Calculate age at any specific date by adjusting your device date",
            "Useful for determining eligibility for age-restricted activities",
          ]}
        />
      </div>
    </div>
  );
};

export default AgeCalculator;
