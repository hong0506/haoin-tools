import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const PasswordGenerator = () => {
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
      toast.error("Please select at least one character type");
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
    toast.success("Password generated!");
  };

  const copyToClipboard = () => {
    if (!password) {
      toast.error("Generate a password first");
      return;
    }
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const clearPassword = () => {
    setPassword("");
    toast.success("Password cleared");
  };

  const loadExample = () => {
    setLength([12]);
    setOptions({
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
    toast.success("Example settings loaded");
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
          <h1 className="text-xl font-semibold">Password Generator</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Secure Password Generator</CardTitle>
                <CardDescription>
                  Generate strong, random passwords with customizable options
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="password-generator"
                toolName="Password Generator"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearPassword} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={password}
                  readOnly
                  placeholder="Generated password will appear here"
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
                  <Label>Password Length: {length[0]}</Label>
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
                <Label>Character Types</Label>
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
                      Uppercase Letters (A-Z)
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
                      Lowercase Letters (a-z)
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
                      Numbers (0-9)
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
                      Symbols (!@#$%^&*)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Password
            </Button>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Password Generator?
              </strong>{" "}
              This tool generates cryptographically secure passwords with
              customizable length and character types. Perfect for creating strong
              passwords for accounts, APIs, and sensitive systems! 🔐
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
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
                    Create strong passwords for{" "}
                    <Badge variant="secondary" className="mx-1">
                      email
                    </Badge>
                    and social media accounts
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Key className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    API Keys
                  </div>
                  <p className="text-sm text-purple-700">
                    Generate secure keys for application APIs and webhooks
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Database Credentials
                  </div>
                  <p className="text-sm text-green-700">
                    Create secure passwords for database users and connections
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Shield className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    System Admin
                  </div>
                  <p className="text-sm text-pink-700">
                    Generate secure passwords for server and admin accounts
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
              💡 Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Length:</strong> Use at least 12 characters for strong
                  security
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Mix Characters:</strong> Enable all options (upper,
                  lower, numbers, symbols)
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Password Manager:</strong> Use a manager to store
                  generated passwords
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Unique:</strong> Never reuse passwords across different
                  accounts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🔗 Related Tools You Might Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  UUID Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate unique identifiers
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
                  Create secure hashes
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/base64")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Base64 Tool
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

export default PasswordGenerator;
