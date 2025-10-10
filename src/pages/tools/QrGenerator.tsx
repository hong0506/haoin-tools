import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  QrCode,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Download,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Info,
  Store,
  Wifi,
  Share2,
  Smartphone,
} from "lucide-react";

const QrGenerator = () => {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const navigate = useNavigate();

  const generateQr = () => {
    if (!text.trim()) {
      toast.error("Please enter text or URL");
      return;
    }
    const encodedText = encodeURIComponent(text);
    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`
    );
    toast.success("QR code generated");
  };

  const downloadQr = async (format: "png" | "jpg" = "png") => {
    if (!qrUrl) return;

    try {
      // Fetch the image data
      const response = await fetch(qrUrl);
      const blob = await response.blob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode.${format}`;

      // For JPG format, we need to convert PNG to JPG
      if (format === "jpg") {
        await convertToJpg(blob, link);
      } else {
        // PNG format - direct download
        link.click();
        toast.success("QR code downloaded as PNG");
      }

      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download QR code");
    }
  };

  const convertToJpg = async (blob: Blob, link: HTMLAnchorElement) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Fill with white background for JPG
        ctx!.fillStyle = "#ffffff";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the QR code
        ctx!.drawImage(img, 0, 0);

        // Convert to JPG
        canvas.toBlob(
          (jpgBlob) => {
            if (jpgBlob) {
              const url = URL.createObjectURL(jpgBlob);
              link.href = url;
              link.download = "qrcode.jpg";
              link.click();
              URL.revokeObjectURL(url);
              toast.success("QR code downloaded as JPG");
            }
          },
          "image/jpeg",
          0.9
        );
      };

      const url = URL.createObjectURL(blob);
      img.src = url;
    } catch (error) {
      toast.error("Failed to convert to JPG");
    }
  };

  const clearText = () => {
    setText("");
    setQrUrl("");
    toast.success("Text cleared");
  };

  const loadExample = () => {
    setText("https://www.example.com");
    setQrUrl("");
    toast.success("Example loaded");
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
            <h1 className="text-xl font-semibold">QR Code Generator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>QR Code Generator</CardTitle>
                <CardDescription>
                  Create QR codes from text or URLs
                </CardDescription>
              </div>
              <FavoriteButton toolId="qr-generator" toolName="QR Generator" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearText} variant="outline" size="sm">
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
                Enter text or URL
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="min-h-[100px]"
              />
            </div>

            <Button onClick={generateQr} className="w-full">
              Generate QR Code
            </Button>

            {qrUrl && (
              <div className="flex flex-col items-center gap-4">
                <img src={qrUrl} alt="QR Code" className="rounded-lg border" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download QR Code
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem onClick={() => downloadQr("png")}>
                      <span className="mr-2">📄</span>
                      Download as PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadQr("jpg")}>
                      <span className="mr-2">🖼️</span>
                      Download as JPG
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is QR Code Generator?
              </strong>{" "}
              This tool generates QR codes from text or URLs. Perfect for business
              cards, event promotion, WiFi sharing, and marketing campaigns! 📱
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
                  <Store className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Business Cards
                  </div>
                  <p className="text-sm text-blue-700">
                    Add QR codes to{" "}
                    <Badge variant="secondary" className="mx-1">
                      business cards
                    </Badge>
                    for quick contact sharing
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Wifi className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">WiFi Sharing</div>
                  <p className="text-sm text-purple-700">
                    Share WiFi credentials without typing passwords
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Share2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Event Promotion
                  </div>
                  <p className="text-sm text-green-700">
                    Create QR codes for event registrations and ticket sales
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Smartphone className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Contact Info
                  </div>
                  <p className="text-sm text-pink-700">
                    Share social media profiles and contact details instantly
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
                  <strong>Keep it Short:</strong> QR codes work best with shorter text
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Test First:</strong> Scan with your phone before printing
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Contrast:</strong> Use high contrast for better scanning
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Instructions:</strong> Add "Scan to" text near QR codes
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
                onClick={() => navigate("/tools/url-encoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  URL Encoder
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Encode/decode URLs
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Base64 Tool
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Encode/decode Base64
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/hash-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Hash Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Create secure hashes
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QrGenerator;
