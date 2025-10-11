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
        toast.error(data.reason || "Invalid IP address");
        setResult(null);
      } else {
        setResult(data);
        toast.success("IP information retrieved!");
      }
    } catch (error) {
      toast.error("Failed to lookup IP");
    }
    setLoading(false);
  };

  const loadExample = () => {
    setIp("8.8.8.8");
    setResult(null);
    toast.success("Example IP loaded (Google DNS)");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
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
          <h1 className="text-xl font-semibold">IP Address Lookup</h1>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>IP Address Information</CardTitle>
                <CardDescription>
                  Get location and ISP details for any IP
                </CardDescription>
              </div>
              <FavoriteButton toolId="ip-lookup" toolName="IP Address Lookup" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setIp("");
                  setResult(null);
                  toast.success("Cleared");
                }}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter IP address (leave empty for your IP)"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && lookupIp()}
              />
              <Button onClick={lookupIp} disabled={loading}>
                <Search className="h-4 w-4 mr-2" />
                {loading ? "Loading..." : "Lookup"}
              </Button>
            </div>
            {result && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200">
                  <div className="text-xs text-blue-600 mb-1">IP Address</div>
                  <div className="font-mono font-bold text-lg">{result.ip}</div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200">
                  <div className="text-xs text-purple-600 mb-1">Location</div>
                  <div className="font-bold">
                    {result.city}, {result.region}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.country_name}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200">
                  <div className="text-xs text-green-600 mb-1">ISP</div>
                  <div className="font-bold text-sm">{result.org || "N/A"}</div>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200">
                  <div className="text-xs text-orange-600 mb-1">Timezone</div>
                  <div className="font-bold">{result.timezone || "N/A"}</div>
                </div>
                <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-950/20 border border-pink-200">
                  <div className="text-xs text-pink-600 mb-1">Coordinates</div>
                  <div className="font-mono text-sm">
                    {result.latitude}, {result.longitude}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200">
                  <div className="text-xs text-cyan-600 mb-1">Postal Code</div>
                  <div className="font-bold">{result.postal || "N/A"}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is IP Lookup?</strong> Get
              detailed information about any IP address including location, ISP,
              timezone, and more. Leave empty to check your own IP! 🌍
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Network Security
                  </div>
                  <p className="text-sm text-purple-700">
                    Identify suspicious IP addresses
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Geolocation</div>
                  <p className="text-sm text-blue-700">
                    Find geographic location of visitors
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Search className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Troubleshooting
                  </div>
                  <p className="text-sm text-green-700">
                    Debug network connectivity issues
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Info className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Website Analytics
                  </div>
                  <p className="text-sm text-pink-700">
                    Understand your audience demographics
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
                  <strong>Your IP:</strong> Leave field empty to check your own
                  IP
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Privacy:</strong> Use VPN to mask your IP address
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Location:</strong> Accuracy varies by ISP
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>ISP Info:</strong> Identifies internet service
                  provider
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
                onClick={() => navigate("/tools/url-encoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  URL Encoder
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Encode/decode URLs
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
                  Generate hashes
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/api-tester")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  API Tester
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Test API endpoints
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
