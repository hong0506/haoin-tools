import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Send,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Globe,
  Zap,
  Info,
  CheckCircle,
  XCircle,
  Loader2,
  Code2,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiTester = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const navigate = useNavigate();

  const sendRequest = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setLoading(true);
    const startTime = performance.now();

    try {
      let parsedHeaders: Record<string, string> = {};
      try {
        parsedHeaders = JSON.parse(headers);
      } catch {
        toast.error("Invalid JSON in headers");
        setLoading(false);
        return;
      }

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaders,
        },
      };

      if (method !== "GET" && method !== "HEAD" && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));

      setStatusCode(res.status);

      const contentType = res.headers.get("content-type");
      let responseData;

      if (contentType?.includes("application/json")) {
        responseData = await res.json();
        setResponse(JSON.stringify(responseData, null, 2));
      } else {
        responseData = await res.text();
        setResponse(responseData);
      }

      toast.success(`Request completed (${res.status})`);
    } catch (error) {
      setStatusCode(null);
      setResponse(
        `Error: ${error instanceof Error ? error.message : "Request failed"}`
      );
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    toast.success("Response copied to clipboard!");
  };

  const clearAll = () => {
    setUrl("");
    setMethod("GET");
    setHeaders("{}");
    setBody("");
    setResponse("");
    setStatusCode(null);
    setResponseTime(null);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setUrl("https://jsonplaceholder.typicode.com/posts/1");
    setMethod("GET");
    setHeaders("{}");
    setBody("");
    setResponse("");
    setStatusCode(null);
    setResponseTime(null);
    toast.success("Example loaded - click Send to test");
  };

  const loadPostExample = () => {
    setUrl("https://jsonplaceholder.typicode.com/posts");
    setMethod("POST");
    setHeaders("{}");
    setBody(
      JSON.stringify(
        {
          title: "Test Post",
          body: "This is a test post",
          userId: 1,
        },
        null,
        2
      )
    );
    setResponse("");
    setStatusCode(null);
    setResponseTime(null);
    toast.success("POST example loaded - click Send to test");
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
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">API Tester</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Test API Endpoints</CardTitle>
                <CardDescription>
                  Send HTTP requests and inspect responses
                </CardDescription>
              </div>
              <FavoriteButton toolId="api-tester" toolName="API Tester" />
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
                GET Example
              </Button>
              <Button onClick={loadPostExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                POST Example
              </Button>
            </div>

            <div className="flex gap-2">
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                  <SelectItem value="HEAD">HEAD</SelectItem>
                  <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                </SelectContent>
              </Select>

              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="flex-1"
              />

              <Button onClick={sendRequest} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>

            <Tabs defaultValue="headers" className="w-full">
              <TabsList>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
              </TabsList>

              <TabsContent value="headers" className="space-y-2">
                <label className="text-sm font-medium">
                  Request Headers (JSON)
                </label>
                <Textarea
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  placeholder='{"Authorization": "Bearer token", "Custom-Header": "value"}'
                  className="min-h-[100px] font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="body" className="space-y-2">
                <label className="text-sm font-medium">Request Body</label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  className="min-h-[150px] font-mono text-sm"
                  disabled={method === "GET" || method === "HEAD"}
                />
                {(method === "GET" || method === "HEAD") && (
                  <p className="text-xs text-muted-foreground">
                    Body not available for {method} requests
                  </p>
                )}
              </TabsContent>
            </Tabs>

            {statusCode !== null && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  statusCode >= 200 && statusCode < 300
                    ? "bg-green-50 border-green-200"
                    : statusCode >= 400
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                {statusCode >= 200 && statusCode < 300 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <div className="flex-1">
                  <div className="font-semibold">
                    Status: {statusCode}{" "}
                    {statusCode >= 200 && statusCode < 300
                      ? "Success"
                      : statusCode >= 400
                      ? "Error"
                      : "Info"}
                  </div>
                  {responseTime && (
                    <div className="text-sm text-muted-foreground">
                      Response time: {responseTime}ms
                    </div>
                  )}
                </div>
              </div>
            )}

            {response && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">Response</label>
                  <Button onClick={copyResponse} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={response}
                  readOnly
                  className="min-h-[250px] font-mono text-sm bg-gray-50"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is API Tester?</strong>{" "}
              This tool lets you test REST APIs by sending HTTP requests and
              inspecting responses. Perfect for API development, debugging, and
              testing endpoints! 🚀
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    API Development
                  </div>
                  <p className="text-sm text-purple-700">
                    Test{" "}
                    <Badge variant="secondary" className="mx-1">
                      endpoints
                    </Badge>{" "}
                    during development
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Debugging</div>
                  <p className="text-sm text-blue-700">
                    Debug API issues and inspect responses
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Integration
                  </div>
                  <p className="text-sm text-green-700">
                    Test third-party API integrations
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Send className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Quick Tests</div>
                  <p className="text-sm text-pink-700">
                    Quickly test endpoints without writing code
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
                  <strong>CORS:</strong> Some APIs may block browser requests
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Authentication:</strong> Add auth headers for
                  protected endpoints
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>JSON:</strong> Use valid JSON for request body
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Status Codes:</strong> 2xx = success, 4xx = client
                  error, 5xx = server error
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HTTP Methods */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>📋 HTTP Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Badge>GET</Badge>
                <span className="text-sm">Retrieve data from server</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Badge>POST</Badge>
                <span className="text-sm">Create new resource</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Badge>PUT</Badge>
                <span className="text-sm">Update entire resource</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Badge>PATCH</Badge>
                <span className="text-sm">Partially update resource</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Badge>DELETE</Badge>
                <span className="text-sm">Remove resource</span>
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
                onClick={() => navigate("/tools/json-formatter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  JSON Formatter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Format JSON responses
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/jwt-decoder")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  JWT Decoder
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Decode JWT tokens
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

export default ApiTester;
