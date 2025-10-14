import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Hash,
  Copy,
  RefreshCw,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Fingerprint,
  Zap,
  Info,
  Database,
  Key,
  Cloud,

} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const UuidGenerator = () => {
  const { t } = useTranslation();
  const [uuid, setUuid] = useState("");
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateUuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generate = () => {
    if (count === 1) {
      const newUuid = generateUuid();
      setUuid(newUuid);
      setUuids([]);
    } else {
      const newUuids = Array.from({ length: count }, () => generateUuid());
      setUuids(newUuids);
      setUuid("");
    }
    toast.success(t('tools.uuid-generator.generated', { count }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('common.copied'));
  };

  const clearAll = () => {
    setUuid("");
    setUuids([]);
    setCount(1);
    toast.success(t('toolPage.messages.cleared'));
  };

  const loadExample = () => {
    setCount(5);
    setUuid("");
    setUuids([]);
    toast.success(t('toolPage.messages.exampleLoaded'));
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
            <Hash className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">{t('tools.uuid-generator.title')}</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('tools.uuid-generator.title')}</CardTitle>
                <CardDescription>
                  {t('tools.uuid-generator.description')}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="uuid-generator"
                toolName="UUID Generator"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
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
                {t('tools.uuid-generator.quantity')}
              </label>
              <Input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) =>
                  setCount(
                    Math.max(1, Math.min(100, parseInt(e.target.value) || 1))
                  )
                }
              />
            </div>

            <Button onClick={generate} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              {t('tools.uuid-generator.generate')}
            </Button>

            {uuid && (
              <div className="flex gap-2">
                <Input value={uuid} readOnly className="font-mono" />
                <Button
                  onClick={() => copyToClipboard(uuid)}
                  size="icon"
                  variant="outline"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}

            {uuids.length > 0 && (
              <div className="space-y-2">
                {uuids.map((id, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={id} readOnly className="font-mono" />
                    <Button
                      onClick={() => copyToClipboard(id)}
                      size="icon"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">{t('tools.uuid-generator.whatIs')}</strong>{" "}
              {t('tools.uuid-generator.whatIsContent')}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t('tools.uuid-generator.useCases.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t('tools.uuid-generator.useCases.database.title')}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t('tools.uuid-generator.useCases.database.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Key className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t('tools.uuid-generator.useCases.api.title')}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t('tools.uuid-generator.useCases.api.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Cloud className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t('tools.uuid-generator.useCases.distributed.title')}
                  </div>
                  <p className="text-sm text-green-700">
                    {t('tools.uuid-generator.useCases.distributed.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Fingerprint className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t('tools.uuid-generator.useCases.session.title')}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t('tools.uuid-generator.useCases.session.description')}
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
              {t('tools.uuid-generator.proTips.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  {t('tools.uuid-generator.proTips.format')}
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  {t('tools.uuid-generator.proTips.collision')}
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  {t('tools.uuid-generator.proTips.v4')}
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  {t('tools.uuid-generator.proTips.storage')}
                </p>
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
                onClick={() => navigate("/tools/password-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.password-generator.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.password-generator.description')}
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
              <button
                onClick={() => navigate("/tools/random-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.random-picker.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">{t('tools.random-picker.description')}</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UuidGenerator;
