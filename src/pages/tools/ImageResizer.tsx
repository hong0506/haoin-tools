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
import { Maximize2, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setWidth(img.width.toString());
          setHeight(img.height.toString());
        };
        img.src = event.target?.result as string;
        setImage(event.target?.result as string);
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
            <div className="ml-auto">
              <FavoriteButton toolId="image-resizer" toolName="Image Resizer" />
            </div>
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

        <ToolDescription
          title="Image Resizer"
          description="Resize images to any dimensions you need. This tool allows you to change image width and height for various purposes like web optimization, social media posts, printing, or device-specific requirements."
          features={[
            "Resize images to custom dimensions",
            "Specify width and height in pixels",
            "Support for common image formats",
            "Preview images before resizing",
            "Download resized images instantly",
            "Maintain aspect ratio option",
          ]}
          useCases={[
            "Social media posts",
            "Profile pictures",
            "Web graphics",
            "Email signatures",
            "Print materials",
            "Thumbnails",
            "Mobile app icons",
            "Banner ads",
          ]}
          tips={[
            "Know the required dimensions for your platform",
            "Consider maintaining aspect ratio to avoid distortion",
            "Resize before compressing for best results",
            "Use appropriate dimensions for different devices",
          ]}
        />
      </div>
    </div>
  );
};

export default ImageResizer;
