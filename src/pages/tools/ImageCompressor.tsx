import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [originalFormat, setOriginalFormat] = useState<string>("");
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
    null
  );
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(t("tools.image-compressor.pleaseUploadImage"));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(t("tools.image-compressor.imageTooLarge"));
        return;
      }

      setOriginalSize(file.size);
      setOriginalFormat(file.type.split("/")[1]);
      setCompressedImage(null);
      setCompressedSize(0);

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImage(result);
          toast.success(
            t("tools.image-compressor.imageLoaded", {
              size: (file.size / 1024).toFixed(2),
            })
          );
        }
      };
      reader.onerror = () => {
        toast.error(t("tools.image-compressor.failedToRead"));
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!image) {
      toast.error(t("tools.image-compressor.uploadImageFirst"));
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

            const reduction = (
              ((originalSize - blob.size) / originalSize) *
              100
            ).toFixed(1);
            toast.success(
              t("tools.image-compressor.compressedSuccess", {
                size: (blob.size / 1024).toFixed(2),
                reduction,
              })
            );
          }
        },
        mimeType,
        quality[0] / 100
      );
    };
    img.onerror = () => {
      toast.error(t("tools.image-compressor.failedToLoad"));
    };
    img.src = image;
  };

  const downloadCompressed = () => {
    if (!compressedImage) {
      toast.error(t("tools.image-compressor.compressFirst"));
      return;
    }
    const a = document.createElement("a");
    a.href = compressedImage;
    a.download = `compressed-${Date.now()}.${format}`;
    a.click();
    toast.success(t("tools.image-compressor.imageDownloaded"));
  };

  const clearAll = () => {
    setImage(null);
    setCompressedImage(null);
    setQuality([80]);
    setOriginalSize(0);
    setCompressedSize(0);
    setFormat("jpeg");
    setOriginalFormat("");
    // Clear the file input value
    if (fileInputRef) {
      fileInputRef.value = "";
    }
    toast.success(t("tools.image-compressor.allFieldsCleared"));
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
    toast.success(t("tools.image-compressor.exampleImageLoaded"));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">
            {t("tools.image-compressor.title")}
          </h1>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {t("tools.image-compressor.compressImages")}
                </CardTitle>
                <CardDescription>
                  {t("tools.image-compressor.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="image-compressor"
                toolName={t("tools.image-compressor.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("tools.image-compressor.uploadImage")}
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
                    <label className="mb-2 block text-sm font-medium">
                      {t("tools.image-compressor.original")}
                    </label>
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
                      <label className="mb-2 block text-sm font-medium">
                        {t("tools.image-compressor.compressed")}
                      </label>
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
                          -
                          {(
                            ((originalSize - compressedSize) / originalSize) *
                            100
                          ).toFixed(1)}
                          %
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mt-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t("tools.image-compressor.outputFormat")}
                    </label>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setFormat("jpeg")}
                        variant={format === "jpeg" ? "default" : "outline"}
                        size="sm"
                      >
                        JPEG
                      </Button>
                      <Button
                        onClick={() => setFormat("png")}
                        variant={format === "png" ? "default" : "outline"}
                        size="sm"
                      >
                        PNG
                      </Button>
                      <Button
                        onClick={() => setFormat("webp")}
                        variant={format === "webp" ? "default" : "outline"}
                        size="sm"
                      >
                        WebP
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t("tools.image-compressor.quality")}: {quality[0]}%
                    </label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      min={1}
                      max={100}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{t("tools.image-compressor.lowQuality")}</span>
                      <span>{t("tools.image-compressor.highQuality")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={compressImage} className="flex-1">
                    <ImageDown className="h-4 w-4 mr-2" />
                    {t("tools.image-compressor.compressImageButton")}
                  </Button>
                  {compressedImage && (
                    <Button
                      onClick={downloadCompressed}
                      variant="default"
                      className="flex-1"
                    >
                      {t("tools.image-compressor.download")}
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.image-compressor.whatIs")}
              </strong>{" "}
              {t("tools.image-compressor.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("toolPage.sections.commonUseCases")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.image-compressor.useCases.webOptimization.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t(
                      "tools.image-compressor.useCases.webOptimization.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t(
                      "tools.image-compressor.useCases.emailAttachments.title"
                    )}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t(
                      "tools.image-compressor.useCases.emailAttachments.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.image-compressor.useCases.ecommerce.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.image-compressor.useCases.ecommerce.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Smartphone className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.image-compressor.useCases.mobileApps.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t(
                      "tools.image-compressor.useCases.mobileApps.description"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              💡 {t("toolPage.sections.proTips")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.image-compressor.proTips.webUse"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.image-compressor.proTips.tradeOff"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.image-compressor.proTips.testing"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.image-compressor.proTips.performance"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              Related Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/image-resizer")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.image-resizer.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.image-resizer.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/color-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.color-picker.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.color-picker.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.base64.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.base64.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageCompressor;
