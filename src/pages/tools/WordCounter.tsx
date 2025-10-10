import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  FileText,
  Zap,
  Info,
  MessageSquare,
  Globe,
  BookOpen,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { AdBanner, AdSidebarStack, AdMediumRectangle } from "@/components/AdBanner";

const WordCounter = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    const readingTime = Math.ceil(words.length / 200); // Average reading speed: 200 words/min

    return {
      words: words.length,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
    };
  }, [text]);

  const clearText = () => {
    setText("");
    toast.success("Text cleared");
  };

  const loadExample = () => {
    const exampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
    setText(exampleText);
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
          <h1 className="text-xl font-semibold">Word Counter</h1>
        </div>
      </header>

      {/* Left Sidebar - 2 Stacked Ads */}
      <AdSidebarStack side="left" count={2} />

      {/* Right Sidebar - 2 Stacked Ads */}
      <AdSidebarStack side="right" count={2} />

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Word & Character Counter</CardTitle>
                <CardDescription>
                  Count words, characters, sentences, paragraphs, and estimate
                  reading time
                </CardDescription>
              </div>
              <FavoriteButton toolId="word-counter" toolName="Word Counter" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearText} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Load Example
              </Button>
            </div>

            <Textarea
              placeholder="Start typing or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[300px] font-mono"
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {stats.words}
                    </p>
                    <p className="text-sm text-muted-foreground">Words</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {stats.characters}
                    </p>
                    <p className="text-sm text-muted-foreground">Characters</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {stats.charactersNoSpaces}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Characters (no spaces)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {stats.sentences}
                    </p>
                    <p className="text-sm text-muted-foreground">Sentences</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {stats.paragraphs}
                    </p>
                    <p className="text-sm text-muted-foreground">Paragraphs</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {stats.readingTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Minutes to read
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Medium Rectangle Ad - In Content */}
        <AdMediumRectangle />

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Word Counter?</strong>{" "}
              This tool provides real-time text analytics including word count,
              character count, sentences, paragraphs, and estimated reading time.
              Perfect for writers, students, bloggers, and content creators who
              need to meet specific length requirements! 📝
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
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Academic Writing
                  </div>
                  <p className="text-sm text-blue-700">
                    Meet essay and thesis word count requirements with precision
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Content Writing
                  </div>
                  <p className="text-sm text-purple-700">
                    Optimize blog posts and articles for{" "}
                    <Badge variant="secondary" className="mx-1">
                      SEO
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <MessageSquare className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Social Media
                  </div>
                  <p className="text-sm text-pink-700">
                    Stay within character limits for Twitter, LinkedIn, etc.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Globe className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Translation Projects
                  </div>
                  <p className="text-sm text-green-700">
                    Track word counts for pricing and project estimates
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
                  <strong>Reading Time:</strong> Average reading speed is 200-250
                  words/minute
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>SEO:</strong> Blog posts perform best at 1,500-2,500
                  words
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Twitter:</strong> 280 character limit (use character
                  count)
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Readability:</strong> Keep paragraphs under 150 words for
                  web content
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
                onClick={() => navigate("/tools/case-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Case Converter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert text case formats
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-sorter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Text Sorter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Sort text lines alphabetically
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/text-diff")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Text Diff
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Compare two texts
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Advertisement */}
        <AdBanner />
      </div>
    </div>
  );
};

export default WordCounter;
