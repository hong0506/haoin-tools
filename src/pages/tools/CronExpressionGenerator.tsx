import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Clock,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Calendar,
  Zap,
  Info,
  Server,
  Timer,
  RefreshCw,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

const CronExpressionGenerator = () => {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [cronExpression, setCronExpression] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const generateCron = () => {
    const expression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setCronExpression(expression);
    setDescription(describeCron(expression));
    toast.success("Cron expression generated!");
  };

  const describeCron = (expr: string): string => {
    const parts = expr.split(" ");
    const [min, hr, dom, mon, dow] = parts;

    let desc = "Runs ";

    // Minute
    if (min === "*") desc += "every minute";
    else if (min.includes("/")) desc += `every ${min.split("/")[1]} minutes`;
    else if (min.includes(",")) desc += `at minutes ${min}`;
    else desc += `at minute ${min}`;

    // Hour
    if (hr === "*") desc += " of every hour";
    else if (hr.includes("/")) desc += ` every ${hr.split("/")[1]} hours`;
    else if (hr.includes(",")) desc += ` at hours ${hr}`;
    else desc += ` at ${hr}:00`;

    // Day of month
    if (dom !== "*") {
      if (dom.includes("/")) desc += ` every ${dom.split("/")[1]} days`;
      else if (dom.includes(",")) desc += ` on days ${dom}`;
      else desc += ` on day ${dom}`;
    }

    // Month
    if (mon !== "*") {
      const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      if (mon.includes(",")) {
        const monthNames = mon
          .split(",")
          .map((m) => months[parseInt(m)])
          .join(", ");
        desc += ` in ${monthNames}`;
      } else {
        desc += ` in ${months[parseInt(mon)]}`;
      }
    }

    // Day of week
    if (dow !== "*") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      if (dow.includes(",")) {
        const dayNames = dow
          .split(",")
          .map((d) => days[parseInt(d)])
          .join(", ");
        desc += ` on ${dayNames}`;
      } else {
        desc += ` on ${days[parseInt(dow)]}`;
      }
    }

    return desc;
  };

  const copyExpression = () => {
    navigator.clipboard.writeText(cronExpression);
    toast.success("Cron expression copied!");
  };

  const clearAll = () => {
    setMinute("*");
    setHour("*");
    setDayOfMonth("*");
    setMonth("*");
    setDayOfWeek("*");
    setCronExpression("");
    setDescription("");
    toast.success("Reset to default (* = any value)");
  };

  const loadExample = (type: string) => {
    let exampleName = "";
    switch (type) {
      case "hourly":
        setMinute("0");
        setHour("*");
        setDayOfMonth("*");
        setMonth("*");
        setDayOfWeek("*");
        exampleName = "Every Hour (at minute 0)";
        break;
      case "daily":
        setMinute("0");
        setHour("0");
        setDayOfMonth("*");
        setMonth("*");
        setDayOfWeek("*");
        exampleName = "Daily at Midnight";
        break;
      case "weekly":
        setMinute("0");
        setHour("0");
        setDayOfMonth("*");
        setMonth("*");
        setDayOfWeek("0");
        exampleName = "Weekly on Sunday";
        break;
      case "monthly":
        setMinute("0");
        setHour("0");
        setDayOfMonth("1");
        setMonth("*");
        setDayOfWeek("*");
        exampleName = "Monthly on Day 1";
        break;
      case "weekday":
        setMinute("0");
        setHour("9");
        setDayOfMonth("*");
        setMonth("*");
        setDayOfWeek("1-5");
        exampleName = "Weekdays at 9 AM";
        break;
    }
    toast.success(`Loaded: ${exampleName}`);
    // Auto-generate the expression after loading example
    setTimeout(() => {
      const expression = `${type === "hourly" ? "0" : type === "daily" ? "0" : type === "weekly" ? "0" : type === "monthly" ? "0" : "0"} ${type === "hourly" ? "*" : type === "daily" ? "0" : type === "weekly" ? "0" : type === "monthly" ? "0" : "9"} ${type === "monthly" ? "1" : "*"} * ${type === "weekly" ? "0" : type === "weekday" ? "1-5" : "*"}`;
      // Actually let's just call generateCron after a tiny delay
      document.getElementById("generate-btn")?.click();
    }, 100);
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
            <Clock className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Cron Expression Generator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generate Cron Expression</CardTitle>
                <CardDescription>
                  Create and understand cron expressions for scheduled tasks
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="cron-expression-generator"
                toolName="Cron Expression Generator"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Explanation */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm font-semibold text-blue-900 mb-2">
                ℹ️ What you need to know:
              </div>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li><strong>Cron expression</strong> = 5 fields: Minute, Hour, Day, Month, DayOfWeek</li>
                <li><strong className="text-green-700">* means "any value"</strong> (e.g., * * * * * = every minute)</li>
                <li><strong>Monthly</strong> = "1st day of every month" so Month stays * (every month)</li>
                <li>Click preset buttons → fields auto-fill → click "Generate"</li>
              </ul>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to *
              </Button>
              <Button onClick={() => loadExample("daily")} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
              <Button
                onClick={() => loadExample("hourly")}
                variant="ghost"
                size="sm"
              >
                Every Hour
              </Button>
              <Button
                onClick={() => loadExample("weekly")}
                variant="ghost"
                size="sm"
              >
                Weekly
              </Button>
              <Button
                onClick={() => loadExample("monthly")}
                variant="ghost"
                size="sm"
              >
                Monthly
              </Button>
              <Button
                onClick={() => loadExample("weekday")}
                variant="ghost"
                size="sm"
              >
                Weekdays
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Minute (0-59)
                </label>
                <Input
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  placeholder="*"
                  className="font-mono"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Hour (0-23)
                </label>
                <Input
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="*"
                  className="font-mono"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Day (1-31)
                </label>
                <Input
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                  placeholder="*"
                  className="font-mono"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Month (1-12)
                </label>
                <Input
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="*"
                  className="font-mono"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Day of Week (0-6)
                </label>
                <Input
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  placeholder="*"
                  className="font-mono"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-700 mb-2 font-medium">
                Syntax Guide:
              </div>
              <div className="text-xs text-blue-600 space-y-1">
                <div>
                  <Badge variant="secondary" className="mr-2">
                    *
                  </Badge>
                  = any value
                </div>
                <div>
                  <Badge variant="secondary" className="mr-2">
                    ,
                  </Badge>
                  = value list (1,3,5)
                </div>
                <div>
                  <Badge variant="secondary" className="mr-2">
                    -
                  </Badge>
                  = range (1-5)
                </div>
                <div>
                  <Badge variant="secondary" className="mr-2">
                    /
                  </Badge>
                  = step (*/5 = every 5)
                </div>
              </div>
            </div>

            <Button id="generate-btn" onClick={generateCron} className="w-full">
              <Clock className="h-4 w-4 mr-2" />
              Generate Expression
            </Button>

            {cronExpression && (
              <div className="space-y-3">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Cron Expression
                    </label>
                    <Button onClick={copyExpression} size="sm" variant="ghost">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <code className="text-lg font-mono font-bold text-green-800">
                      {cronExpression}
                    </code>
                  </div>
                </div>

                {description && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="text-sm font-medium text-purple-900 mb-1">
                      Description:
                    </div>
                    <div className="text-sm text-purple-700">{description}</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                What is Cron Expression Generator?
              </strong>{" "}
              This tool helps you create and understand cron expressions for
              scheduling automated tasks in Linux, Unix, and other systems.
              Perfect for DevOps, system administrators, and developers! ⏰
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
                  <Server className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Server Tasks
                  </div>
                  <p className="text-sm text-purple-700">
                    Schedule{" "}
                    <Badge variant="secondary" className="mx-1">
                      backups
                    </Badge>
                    , updates, and maintenance
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Data Processing
                  </div>
                  <p className="text-sm text-blue-700">
                    Automate data imports, exports, and synchronization
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Scheduled Jobs
                  </div>
                  <p className="text-sm text-green-700">
                    Run scripts and commands at specific times
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Timer className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Monitoring</div>
                  <p className="text-sm text-pink-700">
                    Schedule health checks and monitoring tasks
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
                  <strong>Testing:</strong> Test cron expressions before
                  deploying
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Timezone:</strong> Remember to consider server
                  timezone
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Logging:</strong> Always log cron job outputs for
                  debugging
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Frequency:</strong> Don't schedule tasks too
                  frequently
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Examples */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>📋 Common Cron Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <code className="font-mono text-sm font-bold">0 0 * * *</code>
                  <span className="ml-3 text-sm text-gray-600">
                    Daily at midnight
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <code className="font-mono text-sm font-bold">
                    */15 * * * *
                  </code>
                  <span className="ml-3 text-sm text-gray-600">
                    Every 15 minutes
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <code className="font-mono text-sm font-bold">
                    0 9 * * 1-5
                  </code>
                  <span className="ml-3 text-sm text-gray-600">
                    9 AM on weekdays
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <code className="font-mono text-sm font-bold">0 0 1 * *</code>
                  <span className="ml-3 text-sm text-gray-600">
                    First day of every month
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <code className="font-mono text-sm font-bold">
                    0 */6 * * *
                  </code>
                  <span className="ml-3 text-sm text-gray-600">
                    Every 6 hours
                  </span>
                </div>
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
                onClick={() => navigate("/tools/timestamp-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Timestamp Converter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert timestamps
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/date-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Date Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate date differences
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

export default CronExpressionGenerator;
