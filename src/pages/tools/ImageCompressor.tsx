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
import { Slider } from "@/components/ui/slider";
import { ImageDown, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const ImageCompressor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
    null
  );
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `compressed-${Date.now()}.jpg`;
            a.click();
            toast.success(
              `Image compressed! Size: ${(blob.size / 1024).toFixed(2)} KB`
            );
          }
        },
        "image/jpeg",
        quality[0] / 100
      );
    };
    img.src = image;
  };

  const clearAll = () => {
    setImage(null);
    setQuality([80]);
    setOriginalSize(0);
    // Clear the file input value
    if (fileInputRef) {
      fileInputRef.value = "";
    }
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    // Create a sample image for demonstration
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    // Create a gradient background
    const gradient = ctx!.createLinearGradient(0, 0, 400, 300);
    gradient.addColorStop(0, "#ff6b6b");
    gradient.addColorStop(0.5, "#4ecdc4");
    gradient.addColorStop(1, "#45b7d1");

    ctx!.fillStyle = gradient;
    ctx!.fillRect(0, 0, 400, 300);

    // Add some text
    ctx!.fillStyle = "white";
    ctx!.font = "bold 24px Arial";
    ctx!.textAlign = "center";
    ctx!.fillText("Sample Image", 200, 150);
    ctx!.font = "16px Arial";
    ctx!.fillText("For Testing Compression", 200, 180);

    // Convert to data URL
    const dataURL = canvas.toDataURL("image/jpeg", 0.9);
    setImage(dataURL);
    setOriginalSize(45000); // Simulate file size
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
          <h1 className="text-xl font-semibold">Image Compressor</h1>
          <div className="ml-auto">
            <FavoriteButton
              toolId="image-compressor"
              toolName="Image Compressor"
            />
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Compress Images</CardTitle>
                <CardDescription>
                  Reduce image file size while maintaining quality
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="image-compressor"
                toolName="Image Compressor"
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
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Quality: {quality[0]}%
                  </label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    min={1}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Original size: {(originalSize / 1024).toFixed(2)} KB
                </div>
                <Button onClick={compressImage} className="w-full">
                  Compress & Download
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="Image Compressor"
          description="Reduce image file sizes while maintaining visual quality. This tool helps you compress images for faster web loading, email attachments, and storage optimization. Adjust the quality slider to find the perfect balance between file size and image quality."
          features={[
            "Compress images while maintaining quality",
            "Adjustable quality slider (1-100%)",
            "Support for common image formats",
            "Show original file size for comparison",
            "Download compressed images instantly",
            "Preview images before compression",
          ]}
          useCases={[
            "Web optimization",
            "Email attachments",
            "Social media uploads",
            "Storage management",
            "Blog images",
            "Mobile app assets",
            "Portfolio websites",
            "E-commerce product photos",
          ]}
          tips={[
            "80% quality is often sufficient for web use",
            "Higher compression = smaller file size but lower quality",
            "Test different quality levels to find the right balance",
            "Compressed images load faster on websites",
          ]}
        />
      </div>
    </div>
  );
};

export default ImageCompressor;
