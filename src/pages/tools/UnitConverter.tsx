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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ruler,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Globe,
  Utensils,
  Hammer,
  Scale,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const UnitConverter = () => {
  const [lengthValue, setLengthValue] = useState("");
  const [lengthFrom, setLengthFrom] = useState("meters");
  const [lengthTo, setLengthTo] = useState("feet");
  const [weightValue, setWeightValue] = useState("");
  const [weightFrom, setWeightFrom] = useState("kilograms");
  const [weightTo, setWeightTo] = useState("pounds");
  const navigate = useNavigate();

  const lengthUnits: Record<string, number> = {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    miles: 0.000621371,
    yards: 1.09361,
    feet: 3.28084,
    inches: 39.3701,
  };

  const weightUnits: Record<string, number> = {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274,
    tons: 0.001,
  };

  const convertLength = () => {
    const val = parseFloat(lengthValue);
    if (!isNaN(val)) {
      const meters = val / lengthUnits[lengthFrom];
      return (meters * lengthUnits[lengthTo]).toFixed(4);
    }
    return "";
  };

  const convertWeight = () => {
    const val = parseFloat(weightValue);
    if (!isNaN(val)) {
      const kg = val / weightUnits[weightFrom];
      return (kg * weightUnits[weightTo]).toFixed(4);
    }
    return "";
  };

  const clearLength = () => {
    setLengthValue("");
    toast.success("Cleared");
  };

  const clearWeight = () => {
    setWeightValue("");
    toast.success("Cleared");
  };

  const loadLengthExample = () => {
    setLengthValue("100");
    setLengthFrom("meters");
    setLengthTo("feet");
    toast.success("Example loaded");
  };

  const loadWeightExample = () => {
    setWeightValue("100");
    setWeightFrom("kilograms");
    setWeightTo("pounds");
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
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Unit Converter</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Tabs defaultValue="length">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="length">Length</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
            </TabsList>
            <FavoriteButton toolId="unit-converter" toolName="Unit Converter" />
          </div>
          <TabsContent value="length">
            <Card>
              <CardHeader>
                <CardTitle>Length Converter</CardTitle>
                <CardDescription>
                  Convert between different length units
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={clearLength} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button onClick={loadLengthExample} variant="ghost" size="sm">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Load Example
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={lengthValue}
                    onChange={(e) => setLengthValue(e.target.value)}
                    placeholder="100"
                    className="flex-1"
                  />
                  <Select value={lengthFrom} onValueChange={setLengthFrom}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(lengthUnits).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 items-center">
                  <Input value={convertLength()} readOnly className="flex-1" />
                  <Select value={lengthTo} onValueChange={setLengthTo}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(lengthUnits).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="weight">
            <Card>
              <CardHeader>
                <CardTitle>Weight Converter</CardTitle>
                <CardDescription>
                  Convert between different weight units
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={clearWeight} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button onClick={loadWeightExample} variant="ghost" size="sm">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Load Example
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                    placeholder="100"
                    className="flex-1"
                  />
                  <Select value={weightFrom} onValueChange={setWeightFrom}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(weightUnits).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 items-center">
                  <Input value={convertWeight()} readOnly className="flex-1" />
                  <Select value={weightTo} onValueChange={setWeightTo}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(weightUnits).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Unit Converter?</strong>{" "}
              This tool converts between metric and imperial units for length and
              weight. Perfect for travel, cooking, and construction! 📏
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
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    International Travel
                  </div>
                  <p className="text-sm text-blue-700">
                    Convert{" "}
                    <Badge variant="secondary" className="mx-1">
                      metric/imperial
                    </Badge>
                    units across countries
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Utensils className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Cooking & Baking
                  </div>
                  <p className="text-sm text-purple-700">
                    Convert recipe measurements from different regions
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Hammer className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Construction
                  </div>
                  <p className="text-sm text-green-700">
                    Convert measurements for building projects
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Scale className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Fitness Tracking</div>
                  <p className="text-sm text-pink-700">
                    Track weight and measurements in preferred units
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
                  <strong>Metric:</strong> Used in most countries worldwide
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Weight:</strong> 1 kg = 2.20462 lbs
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Length:</strong> 1 m = 3.28084 ft
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Recipes:</strong> Double-check units from other countries
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
                onClick={() => navigate("/tools/currency-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Currency Converter
                </div>
                <div className="text-sm text-gray-600 mt-1">Convert currencies</div>
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
                onClick={() => navigate("/tools/bmi-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  BMI Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">Calculate BMI</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnitConverter;
