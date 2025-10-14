import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const navigate = useNavigate();

  const generateQr = () => {
    if (!text.trim()) {
      toast.error(t('tools.qr-generator.errorEmpty'));
      return;
    }
    const encodedText = encodeURIComponent(text);
    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`
    );
    toast.success(t('tools.qr-generator.generated'));
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
        toast.success(t('tools.qr-generator.downloadedPNG'));
      }

      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(t('tools.qr-generator.downloadError'));
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
              toast.success(t('tools.qr-generator.downloadedJPG'));
            }
          },
          "image/jpeg",
          0.9
        );
      };

      const url = URL.createObjectURL(blob);
      img.src = url;
    } catch (error) {
      toast.error(t('tools.qr-generator.convertError'));
    }
  };

  const clearText = () => {
    setText("");
    setQrUrl("");
    toast.success(t('toolPage.messages.cleared'));
  };

  const loadExample = () => {
    setText(t('tools.qr-generator.exampleUrl'));
    setQrUrl("");
    toast.success(t('toolPage.messages.exampleLoaded'));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold flex-1">{t('tools.qr-generator.title')}</h1>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('tools.qr-generator.title')}</CardTitle>
                <CardDescription>
                  {t('tools.qr-generator.description')}
                </CardDescription>
              </div>
              <FavoriteButton toolId="qr-generator" toolName={t('tools.qr-generator.title')} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearText} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('toolPage.buttons.clear')}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t('toolPage.buttons.loadExample')}
              </Button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t('tools.qr-generator.inputLabel')}
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t('tools.qr-generator.placeholder')}
                className="min-h-[100px]"
              />
            </div>

            <Button onClick={generateQr} className="w-full">
              {t('tools.qr-generator.generate')}
            </Button>

            {qrUrl && (
              <div className="flex flex-col items-center gap-4">
                <img src={qrUrl} alt="QR Code" className="rounded-lg border" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      {t('tools.qr-generator.download')}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem onClick={() => downloadQr("png")}>
                      <span className="mr-2">📄</span>
                      {t('tools.qr-generator.downloadPNG')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadQr("jpg")}>
                      <span className="mr-2">🖼️</span>
                      {t('tools.qr-generator.downloadJPG')}
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
                {t('tools.qr-generator.whatIs')}
              </strong>{" "}
              {t('tools.qr-generator.whatIsContent')}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t('toolPage.sections.commonUseCases')}
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
                    {t('tools.qr-generator.useCases.businessCards.title')}
                  </div>
                  <p
                    className="text-sm text-blue-700"
                    dangerouslySetInnerHTML={{
                      __html: t('tools.qr-generator.useCases.businessCards.description'),
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Wifi className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t('tools.qr-generator.useCases.wifiSharing.title')}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t('tools.qr-generator.useCases.wifiSharing.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Share2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t('tools.qr-generator.useCases.eventPromotion.title')}
                  </div>
                  <p className="text-sm text-green-700">
                    {t('tools.qr-generator.useCases.eventPromotion.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Smartphone className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t('tools.qr-generator.useCases.contactInfo.title')}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t('tools.qr-generator.useCases.contactInfo.description')}
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
              💡 {t('toolPage.sections.proTips')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.qr-generator.proTips.short'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.qr-generator.proTips.test'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.qr-generator.proTips.contrast'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.qr-generator.proTips.instructions'),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t('toolPage.sections.relatedTools')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/url-encoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.url-encoder.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.url-encoder.description')}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.base64-encoder.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.base64-encoder.description')}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/hash-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.hash-generator.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.hash-generator.description')}
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
