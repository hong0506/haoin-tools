import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Link,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const ImageResizer = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [format, setFormat] = useState<"png" | "jpg" | "webp">("png");
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
    null
  );
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(t("tools.image-resizer.pleaseUploadImage"));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(t("tools.image-resizer.imageTooLarge"));
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
            toast.success(
              t("tools.image-resizer.imageLoaded", {
                width: img.width,
                height: img.height,
              })
            );
          };
          img.onerror = () => {
            toast.error(t("tools.image-resizer.failedToLoad"));
            setImage(null);
          };
          img.src = result;
        }
      };
      reader.onerror = () => {
        toast.error(t("tools.image-resizer.failedToRead"));
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = () => {
    if (!image) {
      toast.error(t("tools.image-resizer.uploadImageFirst"));
      return;
    }
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      const ctx = canvas.getContext("2d");
      if (format === "jpg") {
        // Fill background white for JPG to avoid black transparency
        ctx!.fillStyle = "#ffffff";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const mime =
        format === "jpg"
          ? "image/jpeg"
          : format === "webp"
          ? "image/webp"
          : "image/png";
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `resized-${width}x${height}.${format}`;
            a.click();
            toast.success(t("tools.image-resizer.imageResized"));
          }
        },
        mime,
        format === "jpg" || format === "webp" ? 0.92 : undefined
      );
    };
    img.src = image;
  };

  const clearAll = () => {
    setImage(null);
    setWidth("");
    setHeight("");
    setSelectedFileName("");
    // Clear the file input value
    if (fileInputRef) {
      fileInputRef.value = "";
    }
    toast.success(t("tools.image-resizer.allFieldsCleared"));
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
    toast.success(t("tools.image-resizer.exampleImageLoaded"));
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
            <h1 className="text-xl font-semibold">
              {t("tools.image-resizer.title")}
            </h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.image-resizer.resizeImages")}</CardTitle>
                <CardDescription>
                  {t("tools.image-resizer.changeDimensions")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="image-resizer"
                toolName={t("tools.image-resizer.title")}
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
                {t("tools.image-resizer.uploadImage")}
              </label>
              <input
                ref={setFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef?.click()}
                >
                  {t("tools.image-compressor.chooseFile")}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedFileName || t("tools.image-compressor.noFileChosen")}
                </span>
              </div>
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
                      {t("tools.image-resizer.width")}
                    </label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t("tools.image-resizer.height")}
                    </label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Format
                  </label>
                  <Select
                    value={format}
                    onValueChange={(v: "png" | "jpg" | "webp") => setFormat(v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="PNG" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={resizeImage} className="w-full">
                  {t("tools.image-resizer.resizeDownload")}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.image-resizer.whatIs")}
              </strong>{" "}
              {t("tools.image-resizer.whatIsContent")}
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
                  <Instagram className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.image-resizer.useCases.social.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.image-resizer.useCases.social.description")}{" "}
                    <Badge variant="secondary" className="mx-1">
                      Instagram/Twitter
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Monitor className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.image-resizer.useCases.web.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.image-resizer.useCases.web.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.image-resizer.useCases.mobile.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.image-resizer.useCases.mobile.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <ImageIcon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.image-resizer.useCases.thumbnails.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.image-resizer.useCases.thumbnails.description")}
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
                    __html: t("tools.image-resizer.proTips.platformSizes"),
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
                    __html: t("tools.image-resizer.proTips.aspectRatio"),
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
                    __html: t("tools.image-resizer.proTips.workflow"),
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
                    __html: t("tools.image-resizer.proTips.devices"),
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
              {t("toolPage.sections.relatedTools")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/image-compressor")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.image-compressor.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.image-compressor.description")}
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

export default ImageResizer;
