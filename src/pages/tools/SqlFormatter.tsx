import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, RotateCcw, Lightbulb, Database, Copy } from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const SqlFormatter = () => {
  const [sqlInput, setSqlInput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const navigate = useNavigate();

  const formatSql = () => {
    if (!sqlInput.trim()) {
      toast.error("Please enter SQL query");
      return;
    }
    try {
      let formatted = sqlInput
        .replace(/\b(SELECT|FROM|WHERE|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|ORDER BY|GROUP BY|HAVING|LIMIT|UNION)\b/gi, "\n$1")
        .replace(/\b(AND|OR)\b/gi, "\n  $1")
        .replace(/\(/g, "\n  (")
        .replace(/\)/g, ")\n")
        .replace(/\s+/g, " ")
        .replace(/\n\s*\n/g, "\n")
        .trim();
      const keywords = ["SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "OUTER", "ON", "AND", "OR", "ORDER BY", "GROUP BY", "HAVING", "LIMIT", "INSERT", "UPDATE", "DELETE", "CREATE", "DROP", "ALTER", "TABLE", "AS", "IN", "NOT", "NULL", "IS", "LIKE", "BETWEEN", "DISTINCT", "COUNT", "SUM", "AVG", "MAX", "MIN", "UNION", "ALL"];
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        formatted = formatted.replace(regex, keyword.toUpperCase());
      });
      setSqlOutput(formatted);
      toast.success("SQL formatted successfully!");
    } catch (error) {
      toast.error("Error formatting SQL");
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">SQL Formatter</h1>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Format SQL Queries</CardTitle>
                <CardDescription>Format and beautify SQL queries for better readability</CardDescription>
              </div>
              <FavoriteButton toolId="sql-formatter" toolName="SQL Formatter" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={() => { setSqlInput(""); setSqlOutput(""); toast.success("Cleared"); }} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />Clear
              </Button>
              <Button onClick={() => { setSqlInput("select u.id,u.name,o.order_id from users u inner join orders o on u.id=o.user_id where u.status='active' and o.total>100 order by o.created_at desc limit 10"); toast.success("Example loaded"); }} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />Load Example
              </Button>
            </div>
            <div><div className="text-sm font-medium mb-2">SQL Input</div><Textarea placeholder="SELECT * FROM users WHERE..." value={sqlInput} onChange={(e) => setSqlInput(e.target.value)} rows={8} className="font-mono text-sm" /></div>
            <Button onClick={formatSql} className="w-full"><Database className="h-4 w-4 mr-2" />Format SQL</Button>
            {sqlOutput && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Formatted SQL</div>
                  <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(sqlOutput); toast.success("Copied!"); }}>
                    <Copy className="h-4 w-4 mr-2" />Copy
                  </Button>
                </div>
                <Textarea value={sqlOutput} readOnly rows={10} className="font-mono text-sm bg-green-50 dark:bg-green-950/20" />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SqlFormatter;
