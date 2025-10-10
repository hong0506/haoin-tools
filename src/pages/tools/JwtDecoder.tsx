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
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  KeyRound,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const JwtDecoder = () => {
  const [jwtInput, setJwtInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const navigate = useNavigate();

  const base64UrlDecode = (str: string): string => {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = str.length % 4;
    if (pad) {
      if (pad === 1) {
        throw new Error("InvalidLengthError: Input base64url string is the wrong length");
      }
      str += new Array(5 - pad).join("=");
    }
    return atob(str);
  };

  const decodeJwt = () => {
    if (!jwtInput.trim()) {
      toast.error("Please enter a JWT token");
      return;
    }

    try {
      const parts = jwtInput.trim().split(".");
      
      if (parts.length !== 3) {
        toast.error("Invalid JWT format");
        return;
      }

      const decodedHeader = base64UrlDecode(parts[0]);
      const decodedPayload = base64UrlDecode(parts[1]);

      const headerObj = JSON.parse(decodedHeader);
      const payloadObj = JSON.parse(decodedPayload);

      setHeader(JSON.stringify(headerObj, null, 2));
      setPayload(JSON.stringify(payloadObj, null, 2));
      
      toast.success("JWT decoded successfully!");
    } catch (error) {
      toast.error("Invalid JWT token");
      setHeader("");
      setPayload("");
    }
  };

  const clearAll = () => {
    setJwtInput("");
    setHeader("");
    setPayload("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    const exampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    setJwtInput(exampleJWT);
    toast.success("Example loaded");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">JWT Decoder</h1>
          <div className="ml-auto">
            <FavoriteButton toolId="jwt-decoder" toolName="JWT Decoder" />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Decode JWT Tokens</CardTitle>
            <CardDescription>
              Decode and inspect JWT (JSON Web Token) claims
            </CardDescription>
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
              <div className="text-sm font-medium mb-2">JWT Token</div>
              <Textarea
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                rows={4}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={decodeJwt} className="w-full">
              <KeyRound className="h-4 w-4 mr-2" />
              Decode JWT
            </Button>

            {header && (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm font-medium">Header</div>
                    <Badge variant="secondary">Algorithm & Token Type</Badge>
                  </div>
                  <Textarea
                    value={header}
                    readOnly
                    rows={4}
                    className="font-mono text-sm bg-red-50 dark:bg-red-950/20"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm font-medium">Payload</div>
                    <Badge variant="default">Claims & Data</Badge>
                  </div>
                  <Textarea
                    value={payload}
                    readOnly
                    rows={6}
                    className="font-mono text-sm bg-purple-50 dark:bg-purple-950/20"
                  />
                </div>
              </>
            )}
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
                  <strong>Signature:</strong> We don't verify signatures (decode only)
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Security:</strong> Never share your JWT tokens publicly
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JwtDecoder;
