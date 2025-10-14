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
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  RotateCcw,
  Search,
  Globe,
  MapPin,
  Info,
  Zap,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const IpLookup = () => {
  const { t } = useTranslation();
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const lookupIp = async () => {
    const ipToCheck = ip.trim() || "auto";
    setLoading(true);
    try {
      const res = await fetch(
        `https://ipapi.co/${ipToCheck === "auto" ? "" : ipToCheck + "/"}json/`
      );
      const data = await res.json();
      if (data.error) {
        toast.error(data.reason || t("tools.ip-lookup.invalidIp"));
        setResult(null);
      } else {
        setResult(data);
        toast.success(t("tools.ip-lookup.ipInfoRetrieved"));
      }
    } catch (error) {
      toast.error(t("tools.ip-lookup.failedToLookup"));
    }
    setLoading(false);
  };

  const loadExample = () => {
    setIp("8.8.8.8");
    setResult(null);
    toast.success(t("tools.ip-lookup.exampleLoaded"));
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
          <h1 className="text-xl font-semibold flex-1">{t("tools.ip-lookup.title")}</h1>
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
                <CardTitle>{t("tools.ip-lookup.ipAddressInfo")}</CardTitle>
                <CardDescription>
                  {t("tools.ip-lookup.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton toolId="ip-lookup" toolName={t("tools.ip-lookup.title")} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setIp("");
                  setResult(null);
                  toast.success(t("tools.ip-lookup.cleared"));
                }}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={t("tools.ip-lookup.inputPlaceholder")}
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && lookupIp()}
              />
              <Button onClick={lookupIp} disabled={loading}>
                <Search className="h-4 w-4 mr-2" />
                {loading ? t("tools.ip-lookup.loading") : t("tools.ip-lookup.lookup")}
              </Button>
            </div>
            {result && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">{t("tools.ip-lookup.ipAddress")}</div>
                  <div className="font-mono font-bold text-lg">{result.ip}</div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">{t("tools.ip-lookup.location")}</div>
                  <div className="font-bold">
                    {result.city}, {result.region}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.country_name}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <div className="text-xs text-green-600 dark:text-green-400 mb-1">{t("tools.ip-lookup.isp")}</div>
                  <div className="font-bold text-sm">{result.org || "N/A"}</div>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                  <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">{t("tools.ip-lookup.timezone")}</div>
                  <div className="font-bold">{result.timezone || "N/A"}</div>
                </div>
                <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800">
                  <div className="text-xs text-pink-600 dark:text-pink-400 mb-1">{t("tools.ip-lookup.coordinates")}</div>
                  <div className="font-mono text-sm">
                    {result.latitude}, {result.longitude}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800">
                  <div className="text-xs text-cyan-600 dark:text-cyan-400 mb-1">{t("tools.ip-lookup.postalCode")}</div>
                  <div className="font-bold">{result.postal || "N/A"}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">{t("tools.ip-lookup.whatIs")}</strong> {t("tools.ip-lookup.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.ip-lookup.useCases.networkSecurity.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.ip-lookup.useCases.networkSecurity.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">{t("tools.ip-lookup.useCases.geolocation.title")}</div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.ip-lookup.useCases.geolocation.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.ip-lookup.useCases.troubleshooting.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.ip-lookup.useCases.troubleshooting.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Info className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.ip-lookup.useCases.analytics.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.ip-lookup.useCases.analytics.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.ip-lookup.proTips.yourIp")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.ip-lookup.proTips.privacy")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.ip-lookup.proTips.location")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.ip-lookup.proTips.ispInfo")
                }} />
              </div>
            </div>
          </CardContent>
        </Card>

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
                onClick={() => navigate("/tools/url-encoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.url-encoder.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.url-encoder.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/hash-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.hash-generator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.hash-generator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/api-tester")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.api-tester.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.api-tester.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IpLookup;
