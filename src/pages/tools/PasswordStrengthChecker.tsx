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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Shield,
  CheckCircle2,
  XCircle,
  Info,
  Zap,
  Lock,
  Key,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

interface PasswordStrength {
  score: number;
  strength: string;
  color: string;
  suggestions: string[];
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    special: boolean;
  };
}

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (pwd: string): PasswordStrength => {
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    };

    let score = 0;
    if (checks.length) score += 30;
    if (checks.uppercase) score += 15;
    if (checks.lowercase) score += 15;
    if (checks.numbers) score += 20;
    if (checks.special) score += 20;

    const suggestions: string[] = [];
    if (!checks.length) suggestions.push("Use at least 12 characters");
    if (!checks.uppercase) suggestions.push("Add uppercase letters (A-Z)");
    if (!checks.lowercase) suggestions.push("Add lowercase letters (a-z)");
    if (!checks.numbers) suggestions.push("Add numbers (0-9)");
    if (!checks.special) suggestions.push("Add special characters (!@#$...)");

    let strength = "";
    let color = "";

    if (score >= 85) {
      strength = "Very Strong";
      color = "text-green-600";
    } else if (score >= 65) {
      strength = "Strong";
      color = "text-blue-600";
    } else if (score >= 45) {
      strength = "Medium";
      color = "text-yellow-600";
    } else if (score >= 25) {
      strength = "Weak";
      color = "text-orange-600";
    } else {
      strength = "Very Weak";
      color = "text-red-600";
    }

    return { score, strength, color, suggestions, checks };
  };

  const result = password ? checkPasswordStrength(password) : null;

  const clearAll = () => {
    setPassword("");
    toast.success("Cleared");
  };

  const loadExample = () => {
    setPassword("MyP@ssw0rd2024!");
    toast.success("Example loaded");
  };

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
          <h1 className="text-xl font-semibold">Password Strength Checker</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Check Password Strength</CardTitle>
                <CardDescription>
                  Analyze password security and get improvement suggestions
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="password-strength-checker"
                toolName="Password Strength Checker"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Label>Enter Password</Label>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {result && (
              <>
                {/* Strength Score */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Password Strength:
                    </span>
                    <span className={`text-xl font-bold ${result.color}`}>
                      {result.strength}
                    </span>
                  </div>
                  <Progress value={result.score} className="h-2" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>{result.score}% Secure</span>
                  </div>
                </div>

                {/* Requirements Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg border ${
                      result.checks.length
                        ? "bg-green-50 border-green-200 dark:bg-green-950/20"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-900"
                    }`}
                  >
                    {result.checks.length ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm">12+ characters</span>
                  </div>

                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg border ${
                      result.checks.uppercase
                        ? "bg-green-50 border-green-200 dark:bg-green-950/20"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-900"
                    }`}
                  >
                    {result.checks.uppercase ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm">Uppercase letters (A-Z)</span>
                  </div>

                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg border ${
                      result.checks.lowercase
                        ? "bg-green-50 border-green-200 dark:bg-green-950/20"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-900"
                    }`}
                  >
                    {result.checks.lowercase ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm">Lowercase letters (a-z)</span>
                  </div>

                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg border ${
                      result.checks.numbers
                        ? "bg-green-50 border-green-200 dark:bg-green-950/20"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-900"
                    }`}
                  >
                    {result.checks.numbers ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm">Numbers (0-9)</span>
                  </div>

                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg border ${
                      result.checks.special
                        ? "bg-green-50 border-green-200 dark:bg-green-950/20"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-900"
                    }`}
                  >
                    {result.checks.special ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm">Special characters (!@#$...)</span>
                  </div>
                </div>

                {/* Suggestions */}
                {result.suggestions.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-2">
                          Suggestions to Improve:
                        </h4>
                        <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                          {result.suggestions.map((suggestion, idx) => (
                            <li key={idx}>• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Password Strength Checker?
              </strong>{" "}
              This tool analyzes your password's security level and provides real-time feedback on how to create stronger passwords. All analysis happens locally in your browser! 🔒
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
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Account Security
                  </div>
                  <p className="text-sm text-blue-700">
                    Check if your passwords meet security standards
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Key className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Password Creation
                  </div>
                  <p className="text-sm text-purple-700">
                    Get suggestions when creating new passwords
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Security Audit
                  </div>
                  <p className="text-sm text-green-700">
                    Audit existing passwords for vulnerabilities
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Info className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Learn Best Practices
                  </div>
                  <p className="text-sm text-pink-700">
                    Understand what makes a password strong
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
                  <strong>Length Matters:</strong> 12+ characters significantly
                  improves security
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Mix It Up:</strong> Combine letters, numbers, and symbols
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Avoid Common Words:</strong> Don't use dictionary words or names
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Privacy First:</strong> Analysis happens in your browser only
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
                onClick={() => navigate("/tools/password-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Password Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate strong passwords
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/hash-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Hash Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate secure hashes
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64-encoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Base64 Encoder
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Encode/decode Base64
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
