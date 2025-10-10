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
import { RefreshCw, Copy, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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

        <ToolDescription
          title="Password Generator"
          description="Strong passwords are essential for protecting your online accounts and sensitive information. This tool generates cryptographically secure passwords with customizable options to meet different security requirements and platform specifications."
          features={[
            "Generate cryptographically secure passwords",
            "Customizable length from 4 to 128 characters",
            "Include uppercase letters (A-Z)",
            "Include lowercase letters (a-z)",
            "Include numbers (0-9)",
            "Include special symbols (!@#$%^&*)",
            "Copy generated passwords to clipboard",
            "Clear and regenerate with one click",
          ]}
          useCases={[
            "Online account creation",
            "Password updates",
            "API key generation",
            "Secure file encryption",
            "Database credentials",
            "Application secrets",
            "WiFi passwords",
            "System administration",
          ]}
          tips={[
            "Use at least 12 characters for strong passwords",
            "Include a mix of all character types for maximum security",
            "Avoid using personal information in passwords",
            "Use a password manager to store generated passwords",
            "Change passwords regularly for critical accounts",
          ]}
        />
      </div>
    </div>
  );
};

export default PasswordGenerator;
