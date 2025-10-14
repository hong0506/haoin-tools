import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileCode,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Copy,
  Download,
  Link,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Zap, Info, FileText, Code2, BookOpen, Github } from "lucide-react";

const MarkdownPreview = () => {
  const { t } = useTranslation();
  const [markdown, setMarkdown] = useState("");
  const navigate = useNavigate();

  // Set initial text after translation is loaded
  useEffect(() => {
    if (!markdown) {
      setMarkdown(t("tools.markdown-preview.initialText"));
    }
  }, [t, markdown]);

  const renderMarkdown = (text: string) => {
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Strikethrough
      .replace(/~~(.*?)~~/gim, "<del>$1</del>")
      // Links
      .replace(
        /\[(.*?)\]\((.*?)\)/gim,
        "<a href='$2' target='_blank' rel='noopener noreferrer'>$1</a>"
      )
      // Inline code
      .replace(/`(.*?)`/gim, "<code>$1</code>")
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
      // Blockquotes
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      // Unordered lists
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      // Line breaks
      .replace(/\n/gim, "<br />");

    // Wrap list items in ul/ol tags
    html = html.replace(/(<li>.*<\/li>)/gims, (match) => {
      const listItems = match.match(/<li>.*?<\/li>/gims);
      if (listItems) {
        return `<ul>${listItems.join("")}</ul>`;
      }
      return match;
    });

    return html;
  };

  const clearText = () => {
    setMarkdown("");
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    const exampleMarkdown = t("tools.markdown-preview.exampleText");
    setMarkdown(exampleMarkdown);
    toast.success(t("toolPage.messages.exampleLoaded"));
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast.success(t("tools.markdown-preview.copied"));
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.md";
    link.click();
    URL.revokeObjectURL(url);
    toast.success(t("tools.markdown-preview.downloadedMd"));
  };

  const downloadHtml = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ul, ol { padding-left: 20px; }
    </style>
</head>
<body>
    ${renderMarkdown(markdown)}
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.html";
    link.click();
    URL.revokeObjectURL(url);
    toast.success(t("tools.markdown-preview.downloadedHtml"));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">
              {t("tools.markdown-preview.title")}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.markdown-preview.title")}</CardTitle>
                <CardDescription>
                  {t("tools.markdown-preview.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="markdown-preview"
                toolName={t("tools.markdown-preview.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={clearText} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
              <Button onClick={copyMarkdown} variant="ghost" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                {t("tools.markdown-preview.copyMarkdown")}
              </Button>
              <Button onClick={downloadMarkdown} variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-1" />
                {t("tools.markdown-preview.downloadMd")}
              </Button>
              <Button onClick={downloadHtml} variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-1" />
                {t("tools.markdown-preview.downloadHtml")}
              </Button>
            </div>

            {/* Word Count */}
            <div className="text-sm text-muted-foreground">
              {t("tools.markdown-preview.words")}:{" "}
              {
                markdown
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length
              }{" "}
              | {t("tools.markdown-preview.characters")}: {markdown.length} |{" "}
              {t("tools.markdown-preview.lines")}: {markdown.split("\n").length}
            </div>

            {/* Responsive layout: vertical on mobile, horizontal on desktop */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>{t("tools.markdown-preview.editor")}</CardTitle>
                  <CardDescription>
                    {t("tools.markdown-preview.editorDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="min-h-[400px] md:min-h-[500px] font-mono resize-none"
                    placeholder={t("tools.markdown-preview.placeholder")}
                  />
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>{t("tools.markdown-preview.preview")}</CardTitle>
                  <CardDescription>
                    {t("tools.markdown-preview.previewDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="min-h-[400px] md:min-h-[500px] overflow-auto prose prose-slate dark:prose-invert max-w-none border rounded-md p-4 bg-muted/20"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(markdown),
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">
                {t("tools.markdown-preview.whatIs")}
              </strong>{" "}
              {t("tools.markdown-preview.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("toolPage.sections.commonUseCases")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Github className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.markdown-preview.useCases.readme.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.markdown-preview.useCases.readme.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">
                    {t("tools.markdown-preview.useCases.blog.title")}
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.markdown-preview.useCases.blog.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.markdown-preview.useCases.documentation.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t(
                      "tools.markdown-preview.useCases.documentation.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Code2 className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.markdown-preview.useCases.codeDocs.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.markdown-preview.useCases.codeDocs.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              💡 {t("toolPage.sections.proTips")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.markdown-preview.proTips.headers"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.markdown-preview.proTips.formatting"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.markdown-preview.proTips.code"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">
                  →
                </div>
                <p
                  className="text-sm text-amber-900 dark:text-amber-300"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.markdown-preview.proTips.links"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              {t("toolPage.sections.relatedTools")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/html-to-text")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.html-to-text.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.html-to-text.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/word-counter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.word-counter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.word-counter.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-sorter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.text-sorter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.text-sorter.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarkdownPreview;
