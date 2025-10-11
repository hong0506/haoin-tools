import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Download,
  Info,
  Zap,
  Package,
  ShoppingCart,
  Barcode as BarcodeIcon,
  ChevronDown,
  FileImage,
  File,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const BarcodeGenerator = () => {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("CODE128");
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const [downloadFormat, setDownloadFormat] = useState("png");
  const navigate = useNavigate();

  const generateBarcode = () => {
    if (!text.trim()) {
      toast.error("Please enter text to encode");
      return;
    }

    // Using a free barcode API
    const url = `https://barcodeapi.org/api/${format}/${encodeURIComponent(
      text
    )}`;
    setBarcodeUrl(url);
    toast.success("Barcode generated!");
  };

  const downloadBarcode = async (format: string) => {
    if (!barcodeUrl) return;

    try {
      // Fetch the image
      const response = await fetch(barcodeUrl);
      const blob = await response.blob();

      let finalBlob = blob;

      // Convert to JPG if requested
      if (format === "jpg") {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        // Set CORS to avoid issues
        img.crossOrigin = "anonymous";

        await new Promise((resolve, reject) => {
          img.onload = () => {
            try {
              canvas.width = img.width;
              canvas.height = img.height;

              // Fill with white background for JPG
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              // Draw the barcode
              ctx.drawImage(img, 0, 0);

              // Convert to JPG
              canvas.toBlob(
                (jpgBlob) => {
                  if (jpgBlob) {
                    finalBlob = jpgBlob;
                    resolve(jpgBlob);
                  } else {
                    reject(new Error("Failed to convert to JPG"));
                  }
                },
                "image/jpeg",
                0.95
              );
            } catch (error) {
              reject(error);
            }
          };
          img.onerror = (error) => {
            console.error("Image load error:", error);
            reject(error);
          };
          img.src = barcodeUrl;
        });
      }

      // Create download link
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(finalBlob);
      link.href = url;
      link.download = `barcode-${text}.${format}`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      window.URL.revokeObjectURL(url);

      toast.success(`Barcode downloaded as ${format.toUpperCase()}!`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error(`Failed to download barcode as ${format.toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Barcode Generator</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generate Barcodes</CardTitle>
                <CardDescription>
                  Create Code128, EAN, UPC barcodes
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="barcode-generator"
                toolName="Barcode Generator"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setText("");
                  setBarcodeUrl("");
                  toast.success("Cleared");
                }}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={() => {
                  setText("123456789012");
                  setFormat("CODE128");
                  toast.success("Example loaded");
                }}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                Example
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Barcode Text/Number</Label>
                <Input
                  type="text"
                  placeholder="Enter text or numbers..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Barcode Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CODE128">
                      Code 128 (alphanumeric)
                    </SelectItem>
                    <SelectItem value="EAN13">EAN-13 (products)</SelectItem>
                    <SelectItem value="UPCA">UPC-A (retail)</SelectItem>
                    <SelectItem value="CODE39">Code 39 (industry)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={generateBarcode} className="w-full">
              <BarcodeIcon className="h-4 w-4 mr-2" />
              Generate Barcode
            </Button>

            {barcodeUrl && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Generated Barcode</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Barcode
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => downloadBarcode("png")}>
                        <FileImage className="h-4 w-4 mr-2" />
                        Download as PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => downloadBarcode("jpg")}>
                        <File className="h-4 w-4 mr-2" />
                        Download as JPG
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="bg-white p-8 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                  <img
                    src={barcodeUrl}
                    alt="Generated Barcode"
                    className="max-w-full"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Barcode Generator?
              </strong>{" "}
              Create professional barcodes for products, inventory, and asset
              tracking. Supports multiple formats including Code128, EAN-13, and
              UPC! 📦
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
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Retail Products
                  </div>
                  <p className="text-sm text-blue-700">
                    Generate UPC/EAN for store items
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Inventory</div>
                  <p className="text-sm text-purple-700">
                    Track warehouse stock levels
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <BarcodeIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Asset Tracking
                  </div>
                  <p className="text-sm text-green-700">
                    Label equipment and tools
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Info className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Shipping Labels
                  </div>
                  <p className="text-sm text-pink-700">
                    Create package tracking codes
                  </p>
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
                  <strong>Code128:</strong> Best for alphanumeric data
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>EAN-13:</strong> Required 13 digits for products
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>High Quality:</strong> Download PNG for printing
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Test Scan:</strong> Verify with scanner before
                  printing
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
              <button
                onClick={() => navigate("/tools/qr-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  QR Code Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Create QR codes
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  UUID Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate unique IDs
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/random-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Random Picker
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate random items
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
