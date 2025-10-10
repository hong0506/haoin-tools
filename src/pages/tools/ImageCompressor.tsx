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
import {
  ImageDown,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Zap,
  Info,
  Globe,
  Mail,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const ImageCompressor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [originalFormat, setOriginalFormat] = useState<string>('');
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
      
      setOriginalSize(file.size);
      setOriginalFormat(file.type.split('/')[1]);
      setCompressedImage(null);
      setCompressedSize(0);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImage(result);
          toast.success(`Image loaded: ${(file.size / 1024).toFixed(2)} KB`);
        }
      };
      reader.onerror = () => {
        toast.error("Failed to read file");
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    const canvas = document.createElement("canvas");
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      
      const mimeType = `image/${format}`;
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedImage(url);
            setCompressedSize(blob.size);
            
            const reduction = ((originalSize - blob.size) / originalSize * 100).toFixed(1);
            toast.success(
              `Compressed! ${(blob.size / 1024).toFixed(2)} KB (${reduction}% reduction)`
            );
          }
        },
        mimeType,
        quality[0] / 100
      );
    };
    img.onerror = () => {
      toast.error("Failed to load image");
    };
    img.src = image;
  };
  
  const downloadCompressed = () => {
    if (!compressedImage) {
      toast.error("Please compress the image first");
      return;
    }
    const a = document.createElement("a");
    a.href = compressedImage;
    a.download = `compressed-${Date.now()}.${format}`;
    a.click();
    toast.success("Image downloaded!");
  };

  const clearAll = () => {
    setImage(null);
    setCompressedImage(null);
    setQuality([80]);
    setOriginalSize(0);
    setCompressedSize(0);
    setFormat('jpeg');
    setOriginalFormat('');
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Original</label>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <img
                        src={image}
                        alt="Original"
                        className="max-w-full h-auto"
                      />
                    </div>
                    <div className="mt-2 text-sm text-center">
                      <Badge variant="secondary">
                        {(originalSize / 1024).toFixed(2)} KB
                      </Badge>
                      {originalFormat && (
                        <Badge variant="outline" className="ml-2">
                          {originalFormat.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {compressedImage && (
                    <div>
                      <label className="mb-2 block text-sm font-medium">Compressed</label>
                      <div className="border rounded-lg p-4 bg-green-50">
                        <img
                          src={compressedImage}
                          alt="Compressed"
                          className="max-w-full h-auto"
                        />
                      </div>
                      <div className="mt-2 text-sm text-center">
                        <Badge variant="default" className="bg-green-600">
                          {(compressedSize / 1024).toFixed(2)} KB
                        </Badge>
                        <Badge variant="outline" className="ml-2">
                          {format.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary" className="ml-2">
                          -{((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Output Format
                    </label>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setFormat('jpeg')}
                        variant={format === 'jpeg' ? 'default' : 'outline'}
                        size="sm"
                      >
                        JPEG
                      </Button>
                      <Button
                        onClick={() => setFormat('png')}
                        variant={format === 'png' ? 'default' : 'outline'}
                        size="sm"
                      >
                        PNG
                      </Button>
                      <Button
                        onClick={() => setFormat('webp')}
                        variant={format === 'webp' ? 'default' : 'outline'}
                        size="sm"
                      >
                        WebP
                      </Button>
                    </div>
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
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Low (Smaller file)</span>
                      <span>High (Better quality)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={compressImage} className="flex-1">
                    <ImageDown className="h-4 w-4 mr-2" />
                    Compress Image
                  </Button>
                  {compressedImage && (
                    <Button onClick={downloadCompressed} variant="default" className="flex-1">
                      Download
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Image Compressor?</strong>{" "}
              This tool reduces image file sizes while maintaining quality. Perfect
              for web optimization, email, and storage management! 🗜️
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
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Web Optimization</div>
                  <p className="text-sm text-blue-700">
                    Compress for{" "}
                    <Badge variant="secondary" className="mx-1">
                      faster
                    </Badge>
                    website loading speeds
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Email Attachments</div>
                  <p className="text-sm text-purple-700">
                    Reduce file sizes for email sending limits
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">E-commerce</div>
                  <p className="text-sm text-green-700">
                    Optimize product photos for online stores
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Smartphone className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Mobile Apps</div>
                  <p className="text-sm text-pink-700">
                    Reduce app asset sizes for better performance
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
                  <strong>Web Use:</strong> 80% quality is often sufficient
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Trade-off:</strong> Higher compression = smaller size, lower
                  quality
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Testing:</strong> Try different levels for best balance
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Performance:</strong> Smaller files load faster
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
                onClick={() => navigate("/tools/image-resizer")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Image Resizer
                </div>
                <div className="text-sm text-gray-600 mt-1">Resize images</div>
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

export default ImageCompressor;
