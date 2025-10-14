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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Mail,
  CheckCircle2,
  XCircle,
  Info,
  Zap,
  Shield,
  Globe,
  AlertCircle,
  Download,
  Link
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

interface EmailValidationResult {
  email: string;
  isValid: boolean;
  reason?: string;
}

const EmailValidator = () => {
  const { t } = useTranslation();
  const [emailInput, setEmailInput] = useState("");
  const [results, setResults] = useState<EmailValidationResult[]>([]);
  const navigate = useNavigate();

  const validateEmail = (email: string): EmailValidationResult => {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      return { email: trimmedEmail, isValid: false, reason: t("tools.email-validator.errors.empty") };
    }

    // RFC 5322 compliant regex (simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(trimmedEmail)) {
      return { email: trimmedEmail, isValid: false, reason: t("tools.email-validator.errors.invalidFormat") };
    }

    const [localPart, domain] = trimmedEmail.split("@");

    if (localPart.length > 64) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: t("tools.email-validator.errors.localPartTooLong"),
      };
    }

    if (domain.length > 255) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: t("tools.email-validator.errors.domainTooLong"),
      };
    }

    if (localPart.startsWith(".") || localPart.endsWith(".")) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: t("tools.email-validator.errors.localPartDotPosition"),
      };
    }

    if (localPart.includes("..")) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: t("tools.email-validator.errors.consecutiveDots"),
      };
    }

    if (!domain.includes(".")) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: t("tools.email-validator.errors.domainNoDot"),
      };
    }

    return { email: trimmedEmail, isValid: true };
  };

  const handleValidate = () => {
    if (!emailInput.trim()) {
      toast.error(t("tools.email-validator.pleaseEnterEmails"));
      return;
    }

    const emails = emailInput.split("\n").filter((e) => e.trim());
    const validationResults = emails.map(validateEmail);
    setResults(validationResults);

    const validCount = validationResults.filter((r) => r.isValid).length;
    toast.success(t("tools.email-validator.validatedCount", { total: emails.length, valid: validCount }));
  };

  const exportResults = () => {
    if (results.length === 0) {
      toast.error(t("tools.email-validator.noResultsToExport"));
      return;
    }

    const validEmails = results.filter((r) => r.isValid).map((r) => r.email);
    const blob = new Blob([validEmails.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "valid-emails.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t("tools.email-validator.validEmailsExported"));
  };

  const clearAll = () => {
    setEmailInput("");
    setResults([]);
    toast.success(t("tools.email-validator.cleared"));
  };

  const loadExample = () => {
    setEmailInput(`user@example.com
john.doe@company.co.uk
invalid-email
test@domain
valid.email+tag@subdomain.example.com
user..name@domain.com`);
    toast.success(t("tools.email-validator.exampleLoaded"));
  };

  const validCount = results.filter((r) => r.isValid).length;
  const invalidCount = results.length - validCount;

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
          <h1 className="text-xl font-semibold flex-1">{t("tools.email-validator.title")}</h1>
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
                <CardTitle>{t("tools.email-validator.validateEmails")}</CardTitle>
                <CardDescription>
                  {t("tools.email-validator.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="email-validator"
                toolName={t("tools.email-validator.title")}
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
              <div className="text-sm font-medium mb-2">{t("tools.email-validator.emailAddresses")}</div>
              <Textarea
                placeholder={t("tools.email-validator.emailPlaceholder")}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={handleValidate} className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              {t("tools.email-validator.validateButton")}
            </Button>

            {results.length > 0 && (
              <>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex gap-3">
                    <Badge variant="default" className="bg-green-600">
                      {validCount} {t("tools.email-validator.valid")}
                    </Badge>
                    <Badge variant="destructive">{invalidCount} {t("tools.email-validator.invalid")}</Badge>
                  </div>
                  {validCount > 0 && (
                    <Button variant="outline" size="sm" onClick={exportResults}>
                      <Download className="h-4 w-4 mr-2" />
                      {t("tools.email-validator.exportValid")}
                    </Button>
                  )}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {results.map((result, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        result.isValid
                          ? "bg-green-50 border-green-200 dark:bg-green-950/20"
                          : "bg-red-50 border-red-200 dark:bg-red-950/20"
                      }`}
                    >
                      {result.isValid ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm break-all">
                          {result.email}
                        </div>
                        {result.reason && (
                          <div className="text-xs text-red-600 mt-1">
                            {result.reason}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.email-validator.whatIs")}
              </strong>{" "}
              {t("tools.email-validator.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.email-validator.useCases.listCleaning.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.email-validator.useCases.listCleaning.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.email-validator.useCases.formValidation.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.email-validator.useCases.formValidation.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.email-validator.useCases.dataImport.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.email-validator.useCases.dataImport.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <AlertCircle className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.email-validator.useCases.bulkValidation.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.email-validator.useCases.bulkValidation.description")}
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
                  __html: t("tools.email-validator.proTips.batchProcessing")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.email-validator.proTips.rfcCompliant")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.email-validator.proTips.exportValid")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.email-validator.proTips.instantFeedback")
                }} />
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
                onClick={() => navigate("/tools/duplicate-remover")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.duplicate-remover.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.duplicate-remover.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-sorter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.text-sorter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.text-sorter.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/csv-to-json")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.csv-to-json.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.csv-to-json.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailValidator;
