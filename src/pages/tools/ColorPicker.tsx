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
import { Palette, Copy, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
      </div>

      <ToolDescription
        title="Color Picker"
        description="Color picking and conversion is essential for designers, developers, and anyone working with digital media. This tool helps you pick colors, convert between different color formats (HEX, RGB, HSL), and provides color codes for use in web development, graphic design, and other applications."
        features={[
          "Interactive color picker with visual preview",
          "Convert between HEX, RGB, and HSL formats",
          "Copy color codes to clipboard with one click",
          "Real-time color format conversion",
          "Support for all web-safe colors",
          "Visual color preview with different formats",
        ]}
        useCases={[
          "Web development",
          "Graphic design",
          "UI/UX design",
          "CSS styling",
          "Brand color selection",
          "Accessibility compliance",
          "Print design",
          "Mobile app development",
        ]}
        tips={[
          "HEX codes are most common in web development",
          "RGB values range from 0-255 for each color channel",
          "HSL is useful for creating color variations",
          "Use color contrast tools to ensure accessibility",
        ]}
      />
    </div>
  );
};

export default ColorPicker;
