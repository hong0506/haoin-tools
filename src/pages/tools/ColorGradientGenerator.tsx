import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Copy, Palette, Info, Zap, Sparkles, Paintbrush } from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const ColorGradientGenerator = () => {
  const [color1, setColor1] = useState("#FF6B9D");
  const [color2, setColor2] = useState("#C371F5");
  const [direction, setDirection] = useState("to right");
  const [angle, setAngle] = useState(90);
  const navigate = useNavigate();

  const generateCSS = () => {
    if (direction === "custom") {
      return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    }
    return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast.success("CSS copied to clipboard!");
  };

  const presets = [
    { name: "Sunset", color1: "#FF512F", color2: "#F09819" },
    { name: "Ocean", color1: "#2E3192", color2: "#1BFFFF" },
    { name: "Forest", color1: "#11998e", color2: "#38ef7d" },
    { name: "Purple Dream", color1: "#C471F5", color2: "#FA71CD" },
    { name: "Fire", color1: "#f12711", color2: "#f5af19" },
    { name: "Sky", color1: "#0575E6", color2: "#00F260" },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Color Gradient Generator</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>CSS Gradient Generator</CardTitle>
                <CardDescription>Create beautiful gradients with live preview</CardDescription>
              </div>
              <FavoriteButton toolId="color-gradient-generator" toolName="Color Gradient Generator" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Live Preview */}
            <div className="h-48 rounded-xl shadow-lg" style={{ background: `linear-gradient(${direction === "custom" ? angle + "deg" : direction}, ${color1}, ${color2})` }}></div>

            {/* Color Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-16 h-10 p-1" />
                  <Input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-1" />
                </div>
              </div>
              <div>
                <Label>End Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-16 h-10 p-1" />
                  <Input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>

            {/* Direction */}
            <div>
              <Label>Direction</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to right">Left to Right →</SelectItem>
                  <SelectItem value="to left">Right to Left ←</SelectItem>
                  <SelectItem value="to bottom">Top to Bottom ↓</SelectItem>
                  <SelectItem value="to top">Bottom to Top ↑</SelectItem>
                  <SelectItem value="to bottom right">Diagonal ↘</SelectItem>
                  <SelectItem value="custom">Custom Angle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {direction === "custom" && (
              <div>
                <Label>Angle: {angle}°</Label>
                <Slider value={[angle]} onValueChange={(v) => setAngle(v[0])} min={0} max={360} step={1} className="mt-2" />
              </div>
            )}

            {/* CSS Output */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>CSS Code</Label>
                <Button variant="outline" size="sm" onClick={copyCSS}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy CSS
                </Button>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm break-all">
                {generateCSS()}
              </div>
            </div>

            {/* Presets */}
            <div>
              <Label className="mb-3 block">Gradient Presets</Label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setColor1(preset.color1);
                      setColor2(preset.color2);
                      toast.success(`${preset.name} loaded!`);
                    }}
                    className="h-16 rounded-lg shadow-md hover:scale-105 transition-transform"
                    style={{ background: `linear-gradient(to right, ${preset.color1}, ${preset.color2})` }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Color Gradient Generator?</strong> Create stunning CSS gradients with live preview. Choose colors, direction, and copy ready-to-use CSS code! 🎨
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
                  <Paintbrush className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Website Backgrounds</div>
                  <p className="text-sm text-blue-700">Beautiful hero section gradients</p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">UI Components</div>
                  <p className="text-sm text-purple-700">Buttons, cards, and badges</p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Palette className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">Brand Colors</div>
                  <p className="text-sm text-green-700">Create brand identity gradients</p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Info className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Social Media</div>
                  <p className="text-sm text-pink-700">Eye-catching post backgrounds</p>
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
                  <strong>Live Preview:</strong> See changes in real-time
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Presets:</strong> Start with beautiful combinations
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Copy CSS:</strong> One-click ready-to-use code
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Custom Angles:</strong> Fine-tune gradient direction
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🔗 Related Tools You Might Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button onClick={() => navigate("/tools/color-picker")} className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="font-semibold text-gray-900 group-hover:text-primary">Color Picker</div>
                <div className="text-sm text-gray-600 mt-1">Pick and convert colors</div>
              </button>
              <button onClick={() => navigate("/tools/image-compressor")} className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="font-semibold text-gray-900 group-hover:text-primary">Image Compressor</div>
                <div className="text-sm text-gray-600 mt-1">Optimize images</div>
              </button>
              <button onClick={() => navigate("/tools/qr-generator")} className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="font-semibold text-gray-900 group-hover:text-primary">QR Code Generator</div>
                <div className="text-sm text-gray-600 mt-1">Create QR codes</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorGradientGenerator;
