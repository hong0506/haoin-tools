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
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  Globe,
  Info,
  Zap,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { toast } from "sonner";

const HttpStatusCodes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const clearSearch = () => {
    setSearchTerm("");
    toast.success("Search cleared");
  };

  const loadExample = () => {
    setSearchTerm("404");
    toast.success("Example loaded - searching for 404 Not Found");
  };

  const statusCodes = [
    // 1xx Informational
    {
      code: 100,
      name: "Continue",
      description:
        "The server has received the request headers, and the client should proceed to send the request body",
      category: "1xx",
    },
    {
      code: 101,
      name: "Switching Protocols",
      description: "The requester has asked the server to switch protocols",
      category: "1xx",
    },

    // 2xx Success
    {
      code: 200,
      name: "OK",
      description: "The request was successful",
      category: "2xx",
    },
    {
      code: 201,
      name: "Created",
      description: "The request was successful and a resource was created",
      category: "2xx",
    },
    {
      code: 202,
      name: "Accepted",
      description:
        "The request has been accepted for processing, but processing is not complete",
      category: "2xx",
    },
    {
      code: 204,
      name: "No Content",
      description:
        "The server successfully processed the request but is not returning any content",
      category: "2xx",
    },

    // 3xx Redirection
    {
      code: 301,
      name: "Moved Permanently",
      description:
        "The URL of the requested resource has been changed permanently",
      category: "3xx",
    },
    {
      code: 302,
      name: "Found",
      description: "The URI of requested resource has been changed temporarily",
      category: "3xx",
    },
    {
      code: 304,
      name: "Not Modified",
      description: "The client can use cached data",
      category: "3xx",
    },
    {
      code: 307,
      name: "Temporary Redirect",
      description: "The request should be repeated with another URI",
      category: "3xx",
    },
    {
      code: 308,
      name: "Permanent Redirect",
      description:
        "The request and all future requests should be repeated using another URI",
      category: "3xx",
    },

    // 4xx Client Errors
    {
      code: 400,
      name: "Bad Request",
      description: "The server cannot process the request due to client error",
      category: "4xx",
    },
    {
      code: 401,
      name: "Unauthorized",
      description:
        "Authentication is required and has failed or has not been provided",
      category: "4xx",
    },
    {
      code: 403,
      name: "Forbidden",
      description: "The client does not have access rights to the content",
      category: "4xx",
    },
    {
      code: 404,
      name: "Not Found",
      description: "The server cannot find the requested resource",
      category: "4xx",
    },
    {
      code: 405,
      name: "Method Not Allowed",
      description:
        "The request method is not supported for the requested resource",
      category: "4xx",
    },
    {
      code: 408,
      name: "Request Timeout",
      description: "The server timed out waiting for the request",
      category: "4xx",
    },
    {
      code: 409,
      name: "Conflict",
      description: "The request conflicts with the current state of the server",
      category: "4xx",
    },
    {
      code: 410,
      name: "Gone",
      description:
        "The requested resource is no longer available and will not be available again",
      category: "4xx",
    },
    {
      code: 413,
      name: "Payload Too Large",
      description: "The request entity is larger than limits defined by server",
      category: "4xx",
    },
    {
      code: 415,
      name: "Unsupported Media Type",
      description: "The media format of the requested data is not supported",
      category: "4xx",
    },
    {
      code: 429,
      name: "Too Many Requests",
      description:
        "The user has sent too many requests in a given amount of time",
      category: "4xx",
    },

    // 5xx Server Errors
    {
      code: 500,
      name: "Internal Server Error",
      description: "A generic error occurred on the server",
      category: "5xx",
    },
    {
      code: 501,
      name: "Not Implemented",
      description:
        "The server does not support the functionality required to fulfill the request",
      category: "5xx",
    },
    {
      code: 502,
      name: "Bad Gateway",
      description:
        "The server received an invalid response from an upstream server",
      category: "5xx",
    },
    {
      code: 503,
      name: "Service Unavailable",
      description: "The server is currently unavailable (overloaded or down)",
      category: "5xx",
    },
    {
      code: 504,
      name: "Gateway Timeout",
      description:
        "The server did not receive a timely response from an upstream server",
      category: "5xx",
    },
  ];

  const filteredCodes = statusCodes.filter(
    (status) =>
      status.code.toString().includes(searchTerm) ||
      status.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "1xx":
        return "bg-blue-50 border-blue-200 text-blue-900";
      case "2xx":
        return "bg-green-50 border-green-200 text-green-900";
      case "3xx":
        return "bg-yellow-50 border-yellow-200 text-yellow-900";
      case "4xx":
        return "bg-orange-50 border-orange-200 text-orange-900";
      case "5xx":
        return "bg-red-50 border-red-200 text-red-900";
      default:
        return "bg-gray-50 border-gray-200 text-gray-900";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "2xx":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "4xx":
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case "5xx":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
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
          <h1 className="text-xl font-semibold">HTTP Status Codes</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>HTTP Status Code Reference</CardTitle>
                <CardDescription>
                  Quick lookup for HTTP response status codes
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="http-status-codes"
                toolName="HTTP Status Codes"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearSearch} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by code, name, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="bg-blue-50">
                1xx Informational
              </Badge>
              <Badge variant="outline" className="bg-green-50">
                2xx Success
              </Badge>
              <Badge variant="outline" className="bg-yellow-50">
                3xx Redirection
              </Badge>
              <Badge variant="outline" className="bg-orange-50">
                4xx Client Error
              </Badge>
              <Badge variant="outline" className="bg-red-50">
                5xx Server Error
              </Badge>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredCodes.map((status) => (
                <div
                  key={status.code}
                  className={`p-4 rounded-lg border ${getCategoryColor(
                    status.category
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    {getCategoryIcon(status.category)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-lg font-bold font-mono">
                          {status.code}
                        </code>
                        <span className="font-semibold">{status.name}</span>
                      </div>
                      <p className="text-sm opacity-90">{status.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCodes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No status codes found matching "{searchTerm}"
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What are HTTP Status Codes?
              </strong>{" "}
              Standard response codes given by web servers on the internet. They
              help identify the cause of the problem when a webpage doesn't load
              properly. 🌐
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Category Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="font-semibold text-green-900 mb-2">
                  ✅ 2xx - Success
                </div>
                <p className="text-sm text-green-700">
                  Request received, understood, and accepted
                </p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="font-semibold text-yellow-900 mb-2">
                  🔄 3xx - Redirection
                </div>
                <p className="text-sm text-yellow-700">
                  Further action needed to complete request
                </p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                <div className="font-semibold text-orange-900 mb-2">
                  ⚠️ 4xx - Client Error
                </div>
                <p className="text-sm text-orange-700">
                  Request contains bad syntax or cannot be fulfilled
                </p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="font-semibold text-red-900 mb-2">
                  ❌ 5xx - Server Error
                </div>
                <p className="text-sm text-red-700">
                  Server failed to fulfill a valid request
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Info className="h-5 w-5 text-amber-600" />
              💡 Most Common Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>200:</strong> Everything worked perfectly
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>404:</strong> Page or resource not found
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>500:</strong> Server encountered an error
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>401:</strong> Authentication required
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
                onClick={() => navigate("/tools/api-tester")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  API Tester
                </div>
                <div className="text-sm text-gray-600 mt-1">Test REST APIs</div>
              </button>
              <button
                onClick={() => navigate("/tools/json-formatter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  JSON Formatter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Format JSON data
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/regex-tester")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Regex Tester
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Test regex patterns
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HttpStatusCodes;
