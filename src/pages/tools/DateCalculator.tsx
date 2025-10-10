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
import { Calendar, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const DateCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<string>("");
  const navigate = useNavigate();

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);

    setResult(
      `${days} days (${weeks} weeks, ${months} months, or ${years} years)`
    );
    toast.success("Date difference calculated!");
  };

  const clearAll = () => {
    setStartDate("");
    setEndDate("");
    setResult("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    setStartDate(oneYearAgo.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
    setResult("");
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
          <div className="flex items-center gap-2"></div>
          <h1 className="text-xl font-semibold">Date Calculator</h1>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Date Difference</CardTitle>
            <CardDescription>
              Find the difference between two dates
            </CardDescription>
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
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button onClick={calculateDifference} className="w-full">
              Calculate Difference
            </Button>
            {result && (
              <div className="rounded-lg bg-primary/10 p-6 text-center">
                <p className="text-sm text-muted-foreground">Difference</p>
                <p className="text-2xl font-bold text-primary">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="Date Calculator"
          description="Calculate the difference between two dates with precision. This tool helps you find the exact time span between dates in days, weeks, months, and years, perfect for planning events, tracking milestones, and managing deadlines."
          features={[
            "Calculate difference between two dates",
            "Show results in multiple units (days, weeks, months, years)",
            "Easy date selection with calendar picker",
            "Accurate calculations accounting for leap years",
            "Clear all fields with a single button",
            "Load example dates for testing",
          ]}
          useCases={[
            "Event planning",
            "Project management",
            "Age calculation",
            "Anniversary tracking",
            "Deadline management",
            "Vacation planning",
            "Historical date analysis",
            "Contract duration calculation",
          ]}
          tips={[
            "Use this to plan events and milestones",
            "Calculate how many days until important dates",
            "Perfect for tracking project timelines",
            "Useful for legal and business date calculations",
          ]}
        />
      </div>
    </div>
  );
};

export default DateCalculator;
