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
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
            <div className="ml-auto">
              <FavoriteButton
                toolId="qr-generator"
                toolTitle="QR Code Generator"
              />
            </div>
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

        <ToolDescription
          title="QR Code Generator"
          description="QR (Quick Response) codes are two-dimensional barcodes that can store various types of data including URLs, text, contact information, and more. This tool generates QR codes from your input text or URLs, making it easy to share information quickly and efficiently."
          features={[
            "Generate QR codes from text or URLs",
            "High-quality 300x300 pixel QR codes",
            "Support for any text content including Unicode",
            "Instant QR code generation",
            "Download QR codes in multiple formats (PNG, JPG)",
            "Automatic PNG to JPG conversion with quality optimization",
            "Clear and load example functionality",
            "Copy QR code URLs for sharing",
          ]}
          useCases={[
            "Business cards",
            "Event promotion",
            "WiFi sharing",
            "Contact information",
            "Website links",
            "Social media profiles",
            "Product information",
            "Marketing campaigns",
          ]}
          tips={[
            "QR codes work best with shorter text",
            "Test QR codes with your phone before printing",
            "Use high contrast colors for better scanning",
            "Include instructions for users on how to scan",
          ]}
        />
      </div>
    </div>
  );
};

export default QrGenerator;
