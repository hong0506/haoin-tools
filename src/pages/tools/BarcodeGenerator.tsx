import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import JsBarcode from "jsbarcode";
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
  Link,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const BarcodeGenerator = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [format, setFormat] = useState("CODE128");
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const [downloadFormat, setDownloadFormat] = useState("png");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const generateBarcode = () => {
    if (!text.trim()) {
      toast.error(t("tools.barcode-generator.pleaseEnterText"));
      return;
    }

    try {
      // Create a temporary canvas for barcode generation
      const canvas = document.createElement("canvas");

      // Generate barcode locally using JsBarcode
      JsBarcode(canvas, text, {
        format: format,
        width: 3, // thicker bars
        height: 160, // taller barcode
        displayValue: true,
        fontSize: 18, // larger label text
        margin: 12,
      });

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png");
      setBarcodeUrl(dataUrl);
      toast.success(t("tools.barcode-generator.barcodeGenerated"));
    } catch (error) {
      toast.error(t("tools.barcode-generator.pleaseEnterText"));
      console.error("Barcode generation error:", error);
    }
  };

  const downloadBarcode = async (downloadFormat: string) => {
    if (!barcodeUrl) return;

    try {
      // Create download link directly from data URL
      const link = document.createElement("a");

      if (downloadFormat === "jpg") {
        // Convert PNG data URL to JPG
        const img = new Image();
        img.src = barcodeUrl;

        await new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            // Fill with white background for JPG
            if (ctx) {
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
            }

            link.href = canvas.toDataURL("image/jpeg", 0.95);
            link.download = `barcode-${text}.jpg`;
            link.click();
            resolve(true);
          };
        });
      } else {
        // Direct PNG download from data URL
        link.href = barcodeUrl;
        link.download = `barcode-${text}.png`;
        link.click();
      }

      toast.success(
        t("tools.barcode-generator.downloaded", {
          format: downloadFormat.toUpperCase(),
        })
      );
    } catch (error) {
      toast.error(
        t("tools.barcode-generator.downloadFailed", {
          format: downloadFormat.toUpperCase(),
        })
      );
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold flex-1">
            {t("tools.barcode-generator.title")}
          </h1>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {t("tools.barcode-generator.generateBarcodes")}
                </CardTitle>
                <CardDescription>
                  {t("tools.barcode-generator.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="barcode-generator"
                toolName={t("tools.barcode-generator.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setText("");
                  setBarcodeUrl("");
                  toast.success(t("toolPage.messages.cleared"));
                }}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button
                onClick={() => {
                  setText(t("tools.barcode-generator.exampleText"));
                  setFormat("CODE128");
                  toast.success(t("toolPage.messages.exampleLoaded"));
                }}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t("tools.barcode-generator.barcodeText")}</Label>
                <Input
                  type="text"
                  placeholder={t("tools.barcode-generator.placeholder")}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>{t("tools.barcode-generator.barcodeFormat")}</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CODE128">
                      {t("tools.barcode-generator.formats.code128")}
                    </SelectItem>
                    <SelectItem value="EAN13">
                      {t("tools.barcode-generator.formats.ean13")}
                    </SelectItem>
                    <SelectItem value="UPCA">
                      {t("tools.barcode-generator.formats.upca")}
                    </SelectItem>
                    <SelectItem value="CODE39">
                      {t("tools.barcode-generator.formats.code39")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={generateBarcode} className="w-full">
              <BarcodeIcon className="h-4 w-4 mr-2" />
              {t("tools.barcode-generator.generateBarcode")}
            </Button>

            {barcodeUrl && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    {t("tools.barcode-generator.generatedBarcode")}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        {t("tools.barcode-generator.downloadBarcode")}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => downloadBarcode("png")}>
                        <FileImage className="h-4 w-4 mr-2" />
                        {t("tools.barcode-generator.downloadPng")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => downloadBarcode("jpg")}>
                        <File className="h-4 w-4 mr-2" />
                        {t("tools.barcode-generator.downloadJpg")}
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
                {t("tools.barcode-generator.whatIs")}
              </strong>{" "}
              {t("tools.barcode-generator.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("toolPage.sections.commonUseCases")}
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
                    {t("tools.barcode-generator.useCases.retailProducts.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t(
                      "tools.barcode-generator.useCases.retailProducts.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.barcode-generator.useCases.inventory.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t(
                      "tools.barcode-generator.useCases.inventory.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <BarcodeIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.barcode-generator.useCases.assetTracking.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t(
                      "tools.barcode-generator.useCases.assetTracking.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Info className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.barcode-generator.useCases.shippingLabels.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t(
                      "tools.barcode-generator.useCases.shippingLabels.description"
                    )}
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
              💡 {t("toolPage.sections.proTips")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.barcode-generator.proTips.code128"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.barcode-generator.proTips.ean13"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.barcode-generator.proTips.highQuality"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.barcode-generator.proTips.testScan"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              {t('toolPage.sections.relatedTools')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/qr-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.qr-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.qr-generator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.uuid-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.uuid-generator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/random-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.random-picker.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.random-picker.description")}
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
