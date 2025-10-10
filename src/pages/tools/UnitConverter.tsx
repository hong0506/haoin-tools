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
import { Ruler, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
            <div className="ml-auto">
              <FavoriteButton
                toolId="unit-converter"
                toolName="Unit Converter"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Tabs defaultValue="length">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="length">Length</TabsTrigger>
          </TabsList>
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

        <ToolDescription
          title="Unit Converter"
          description="Convert between different units of measurement for length and weight. This tool helps you quickly convert measurements for international travel, cooking, construction, and various professional applications."
          features={[
            "Convert length units (meters, feet, inches, etc.)",
            "Convert weight units (kilograms, pounds, ounces, etc.)",
            "Real-time conversion as you type",
            "Support for metric and imperial systems",
            "Load example conversions for testing",
            "Simple and intuitive interface",
          ]}
          useCases={[
            "International travel",
            "Cooking and baking",
            "Construction projects",
            "Scientific calculations",
            "Fitness tracking",
            "Shipping and logistics",
            "Education and learning",
            "Engineering applications",
          ]}
          tips={[
            "Metric system is used in most countries worldwide",
            "1 kilogram = 2.20462 pounds",
            "1 meter = 3.28084 feet",
            "Double-check units when following recipes from other countries",
          ]}
        />
      </div>
    </div>
  );
};

export default UnitConverter;
