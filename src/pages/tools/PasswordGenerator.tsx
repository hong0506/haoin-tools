import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  RefreshCw,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Shield,
  Zap,
  Info,
  Lock,
  Key,
  Database,
  Link
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const PasswordGenerator = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      toast.error(t('tools.password-generator.errors.selectCharacterType'));
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
    toast.success(t('tools.password-generator.generated'));
  };

  const copyToClipboard = () => {
    if (!password) {
      toast.error(t('tools.password-generator.errors.generateFirst'));
      return;
    }
    navigator.clipboard.writeText(password);
    toast.success(t('tools.password-generator.copied'));
  };

  const clearPassword = () => {
    setPassword("");
    toast.success(t('tools.password-generator.cleared'));
  };

  const loadExample = () => {
    setLength([12]);
    setOptions({
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
    toast.success(t('toolPage.messages.exampleLoaded'));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <h1 className="text-xl font-semibold flex-1">{t('tools.password-generator.title')}</h1>
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
                <CardTitle>{t('tools.password-generator.title')}</CardTitle>
                <CardDescription>
                  {t('tools.password-generator.description')}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="password-generator"
                toolName={t('tools.password-generator.title')}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearPassword} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('toolPage.buttons.clear')}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t('toolPage.buttons.loadExample')}
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={password}
                  readOnly
                  placeholder={t('tools.password-generator.placeholder')}
                  className="font-mono"
                />
                <Button onClick={copyToClipboard} size="icon" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t('tools.password-generator.length')}: {length[0]}</Label>
                </div>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  min={4}
                  max={64}
                  step={1}
                />
              </div>

              <div className="space-y-3">
                <Label>{t('tools.password-generator.characterTypes')}</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={options.uppercase}
                      onCheckedChange={(checked) =>
                        setOptions({
                          ...options,
                          uppercase: checked as boolean,
                        })
                      }
                    />
                    <label
                      htmlFor="uppercase"
                      className="text-sm cursor-pointer"
                    >
                      {t('tools.password-generator.uppercase')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={options.lowercase}
                      onCheckedChange={(checked) =>
                        setOptions({
                          ...options,
                          lowercase: checked as boolean,
                        })
                      }
                    />
                    <label
                      htmlFor="lowercase"
                      className="text-sm cursor-pointer"
                    >
                      {t('tools.password-generator.lowercase')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={options.numbers}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, numbers: checked as boolean })
                      }
                    />
                    <label htmlFor="numbers" className="text-sm cursor-pointer">
                      {t('tools.password-generator.numbers')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={options.symbols}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, symbols: checked as boolean })
                      }
                    />
                    <label htmlFor="symbols" className="text-sm cursor-pointer">
                      {t('tools.password-generator.symbols')}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              {t('tools.password-generator.generate')}
            </Button>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t('tools.password-generator.whatIs')}
              </strong>{" "}
              {t('tools.password-generator.whatIsContent')}
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
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t('tools.password-generator.useCases.accountSecurity.title')}
                  </div>
                  <p
                    className="text-sm text-blue-700"
                    dangerouslySetInnerHTML={{
                      __html: t('tools.password-generator.useCases.accountSecurity.description'),
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Key className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t('tools.password-generator.useCases.apiKeys.title')}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t('tools.password-generator.useCases.apiKeys.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t('tools.password-generator.useCases.databaseCredentials.title')}
                  </div>
                  <p className="text-sm text-green-700">
                    {t('tools.password-generator.useCases.databaseCredentials.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Shield className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t('tools.password-generator.useCases.systemAdmin.title')}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t('tools.password-generator.useCases.systemAdmin.description')}
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
                    __html: t('tools.password-generator.proTips.length'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.password-generator.proTips.mixCharacters'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.password-generator.proTips.passwordManager'),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t('tools.password-generator.proTips.unique'),
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
              {t('toolPage.sections.relatedTools')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t('tools.uuid-generator.title')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('tools.uuid-generator.description')}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordGenerator;
