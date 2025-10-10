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
import { toast } from "sonner";
import {
  Palette,
  Copy,
  ArrowLeft,
  Zap,
  Info,
  Paintbrush,
  Code,
  Monitor,
  Smartphone,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const ColorPicker = () => {
  const [color, setColor] = useState("#3b82f6");
  const navigate = useNavigate();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${format} copied to clipboard`);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Color Picker</h1>
            <div className="ml-auto"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pick & Convert Colors</CardTitle>
                <CardDescription>
                  Choose colors and convert between formats
                </CardDescription>
              </div>
              <FavoriteButton toolId="color-picker" toolName="Color Picker" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div
                className="h-48 w-full rounded-lg border-4 border-border"
                style={{ backgroundColor: color }}
              />
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-16 w-full cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  value={color.toUpperCase()}
                  readOnly
                  className="font-mono"
                />
                <Button
                  onClick={() => copyToClipboard(color.toUpperCase(), "HEX")}
                  size="icon"
                  variant="outline"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              {rgb && (
                <div className="flex items-center gap-2">
                  <Input
                    value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    onClick={() =>
                      copyToClipboard(
                        `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                        "RGB"
                      )
                    }
                    size="icon"
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {hsl && (
                <div className="flex items-center gap-2">
                  <Input
                    value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    onClick={() =>
                      copyToClipboard(
                        `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                        "HSL"
                      )
                    }
                    size="icon"
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Color Picker?</strong>{" "}
              This tool helps you pick colors and convert between HEX, RGB, and HSL
              formats. Perfect for web development, design, and branding! 🎨
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
                  <Monitor className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Web Development</div>
                  <p className="text-sm text-blue-700">
                    Get{" "}
                    <Badge variant="secondary" className="mx-1">
                      HEX/RGB
                    </Badge>
                    codes for CSS and styling
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Paintbrush className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">UI/UX Design</div>
                  <p className="text-sm text-purple-700">
                    Pick and match colors for interface design
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">CSS Styling</div>
                  <p className="text-sm text-green-700">
                    Convert colors for web styling and themes
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Smartphone className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">App Development</div>
                  <p className="text-sm text-pink-700">
                    Choose colors for mobile and desktop apps
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
                  <strong>HEX:</strong> Most common format in web development
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>RGB:</strong> Values range from 0-255 per channel
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>HSL:</strong> Great for creating color variations
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Accessibility:</strong> Check color contrast ratios
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
                onClick={() => navigate("/tools/image-compressor")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Image Compressor
                </div>
                <div className="text-sm text-gray-600 mt-1">Compress images</div>
              </button>
              <button
                onClick={() => navigate("/tools/image-resizer")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Image Resizer
                </div>
                <div className="text-sm text-gray-600 mt-1">Resize images</div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Base64 Tool
                </div>
                <div className="text-sm text-gray-600 mt-1">Encode/decode</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorPicker;
