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
  Maximize2,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Instagram,
  Monitor,
  Smartphone,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const ImageResizer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
    null
  );
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size should be less than 10MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const img = new Image();
          img.onload = () => {
            setWidth(img.width.toString());
            setHeight(img.height.toString());
            setImage(result);
            toast.success(`Image loaded: ${img.width}x${img.height}px`);
          };
          img.onerror = () => {
            toast.error("Failed to load image");
            setImage(null);
          };
          img.src = result;
        }
      };
      reader.onerror = () => {
        toast.error("Failed to read file");
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `resized-${width}x${height}.png`;
          a.click();
          toast.success("Image resized and downloaded!");
        }
      });
    };
    img.src = image;
  };

  const clearAll = () => {
    setImage(null);
    setWidth("");
    setHeight("");
    // Clear the file input value
    if (fileInputRef) {
      fileInputRef.value = "";
    }
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    // Create a sample image for demonstration
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    // Create a gradient background
    const gradient = ctx!.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, "#ff9a9e");
    gradient.addColorStop(0.5, "#fecfef");
    gradient.addColorStop(1, "#fecfef");

    ctx!.fillStyle = gradient;
    ctx!.fillRect(0, 0, 800, 600);

    // Add some decorative elements
    ctx!.fillStyle = "rgba(255, 255, 255, 0.3)";
    for (let i = 0; i < 5; i++) {
      ctx!.beginPath();
      ctx!.arc(100 + i * 150, 100 + Math.sin(i) * 50, 30, 0, Math.PI * 2);
      ctx!.fill();
    }

    // Add text
    ctx!.fillStyle = "#333";
    ctx!.font = "bold 32px Arial";
    ctx!.textAlign = "center";
    ctx!.fillText("Sample Image", 400, 300);
    ctx!.font = "20px Arial";
    ctx!.fillText("800 x 600 pixels", 400, 340);
    ctx!.font = "16px Arial";
    ctx!.fillText("For Testing Resize Function", 400, 370);

    // Convert to data URL
    const dataURL = canvas.toDataURL("image/png");
    setImage(dataURL);
    setWidth("800");
    setHeight("600");
    toast.success("Example image loaded");
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
            <h1 className="text-xl font-semibold">Image Resizer</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Resize Images</CardTitle>
                <CardDescription>
                  Change image dimensions to any size
                </CardDescription>
              </div>
              <FavoriteButton toolId="image-resizer" toolName="Image Resizer" />
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
                Upload Image
              </label>
              <input
                ref={setFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>
            {image && (
              <>
                <div className="border rounded-lg p-4">
                  <img
                    src={image}
                    alt="Preview"
                    className="max-w-full h-auto"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Width (px)
                    </label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Height (px)
                    </label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={resizeImage} className="w-full">
                  Resize & Download
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Image Resizer?</strong>{" "}
              This tool resizes images to custom dimensions for web, social media,
              and print. Perfect for optimizing graphics for any platform! 🖼️
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
                  <Instagram className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Social Media</div>
                  <p className="text-sm text-blue-700">
                    Resize for{" "}
                    <Badge variant="secondary" className="mx-1">
                      Instagram/Twitter
                    </Badge>
                    post dimensions
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Monitor className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Web Graphics</div>
                  <p className="text-sm text-purple-700">
                    Optimize images for website performance
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">Mobile Apps</div>
                  <p className="text-sm text-green-700">
                    Create icons and assets for app development
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <ImageIcon className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Thumbnails</div>
                  <p className="text-sm text-pink-700">
                    Generate preview images for galleries
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
                  <strong>Platform Sizes:</strong> Check required dimensions first
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Aspect Ratio:</strong> Maintain to avoid distortion
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Workflow:</strong> Resize before compressing images
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Devices:</strong> Use appropriate sizes for screens
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
                onClick={() => navigate("/tools/color-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Color Picker
                </div>
                <div className="text-sm text-gray-600 mt-1">Pick colors</div>
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

export default ImageResizer;
