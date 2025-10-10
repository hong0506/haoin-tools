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
import {
  Cake,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Calendar,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

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

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Age Calculator?</strong>{" "}
              This tool calculates your exact age in years, months, and days from
              your birthdate. Perfect for documentation, milestones, and birthday
              planning! 🎂
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
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Birthday Planning
                  </div>
                  <p className="text-sm text-blue-700">
                    Calculate{" "}
                    <Badge variant="secondary" className="mx-1">
                      milestones
                    </Badge>
                    and plan special celebrations
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Documentation
                  </div>
                  <p className="text-sm text-purple-700">
                    Get exact age for official documents and applications
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    School Enrollment
                  </div>
                  <p className="text-sm text-green-700">
                    Verify age requirements for educational admissions
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Users className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Age Verification
                  </div>
                  <p className="text-sm text-pink-700">
                    Check eligibility for age-restricted activities
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
                  <strong>Exact Age:</strong> Shows years, months, and days
                  precisely
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Milestones:</strong> Perfect for planning special
                  birthdays
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Documents:</strong> Use for official age verification
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Eligibility:</strong> Check age requirements easily
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
                onClick={() => navigate("/tools/date-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Date Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate date differences
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/bmi-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  BMI Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">Calculate BMI</div>
              </button>
              <button
                onClick={() => navigate("/tools/timestamp-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Timestamp Converter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert timestamps
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgeCalculator;
