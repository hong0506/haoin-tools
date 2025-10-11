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
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

interface EmailValidationResult {
  email: string;
  isValid: boolean;
  reason?: string;
}

const EmailValidator = () => {
  const [emailInput, setEmailInput] = useState("");
  const [results, setResults] = useState<EmailValidationResult[]>([]);
  const navigate = useNavigate();

  const validateEmail = (email: string): EmailValidationResult => {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      return { email: trimmedEmail, isValid: false, reason: "Email is empty" };
    }

    // RFC 5322 compliant regex (simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(trimmedEmail)) {
      return { email: trimmedEmail, isValid: false, reason: "Invalid email format" };
    }

    const [localPart, domain] = trimmedEmail.split("@");

    if (localPart.length > 64) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: "Local part too long (max 64 characters)",
      };
    }

    if (domain.length > 255) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: "Domain too long (max 255 characters)",
      };
    }

    if (localPart.startsWith(".") || localPart.endsWith(".")) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: "Local part cannot start or end with a dot",
      };
    }

    if (localPart.includes("..")) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: "Consecutive dots not allowed",
      };
    }

    if (!domain.includes(".")) {
      return {
        email: trimmedEmail,
        isValid: false,
        reason: "Domain must contain a dot",
      };
    }

    return { email: trimmedEmail, isValid: true };
  };

  const handleValidate = () => {
    if (!emailInput.trim()) {
      toast.error("Please enter email addresses");
      return;
    }

    const emails = emailInput.split("\n").filter((e) => e.trim());
    const validationResults = emails.map(validateEmail);
    setResults(validationResults);

    const validCount = validationResults.filter((r) => r.isValid).length;
    toast.success(`Validated ${emails.length} email(s) - ${validCount} valid`);
  };

  const exportResults = () => {
    if (results.length === 0) {
      toast.error("No results to export");
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
    toast.success("Valid emails exported!");
  };

  const clearAll = () => {
    setEmailInput("");
    setResults([]);
    toast.success("Cleared");
  };

  const loadExample = () => {
    setEmailInput(`user@example.com
john.doe@company.co.uk
invalid-email
test@domain
valid.email+tag@subdomain.example.com
user..name@domain.com`);
    toast.success("Example loaded");
  };

  const validCount = results.filter((r) => r.isValid).length;
  const invalidCount = results.length - validCount;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Email Validator</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Validate Email Addresses</CardTitle>
                <CardDescription>
                  Check if email addresses are valid (one per line)
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="email-validator"
                toolName="Email Validator"
              />
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
              <div className="text-sm font-medium mb-2">Email Addresses</div>
              <Textarea
                placeholder="Enter email addresses (one per line)..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={handleValidate} className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Validate Emails
            </Button>

            {results.length > 0 && (
              <>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex gap-3">
                    <Badge variant="default" className="bg-green-600">
                      {validCount} Valid
                    </Badge>
                    <Badge variant="destructive">{invalidCount} Invalid</Badge>
                  </div>
                  {validCount > 0 && (
                    <Button variant="outline" size="sm" onClick={exportResults}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Valid
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

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Email Validator?
              </strong>{" "}
              This tool validates email addresses according to RFC 5322 standards. Perfect for cleaning email lists, verifying form inputs, and data validation! ✉️
            </p>
          </CardContent>
        </Card>

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
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Email List Cleaning
                  </div>
                  <p className="text-sm text-blue-700">
                    Remove invalid emails from mailing lists
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Form Validation
                  </div>
                  <p className="text-sm text-purple-700">
                    Verify email format before submission
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Data Import
                  </div>
                  <p className="text-sm text-green-700">
                    Validate emails before importing to CRM
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <AlertCircle className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Bulk Validation
                  </div>
                  <p className="text-sm text-pink-700">
                    Check hundreds of emails at once
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
              💡 Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Batch Processing:</strong> Validate multiple emails at once
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>RFC Compliant:</strong> Follows email standards strictly
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Export Valid:</strong> Download only valid emails
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Instant Feedback:</strong> See detailed error reasons
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🔗 Related Tools You Might Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/duplicate-remover")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Duplicate Remover
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Remove duplicate emails
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-sorter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Text Sorter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Sort email lists
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/csv-to-json")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  CSV to JSON
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert email data
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
