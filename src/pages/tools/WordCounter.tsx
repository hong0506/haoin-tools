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
import { RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

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

        <ToolDescription
          title="Word Counter"
          description="Word counting is essential for writers, students, and professionals who need to meet specific length requirements or analyze text content. This tool provides comprehensive text statistics including word count, character count, sentence count, paragraph count, and estimated reading time."
          features={[
            "Count words, characters, sentences, and paragraphs",
            "Calculate estimated reading time",
            "Real-time statistics as you type",
            "Support for multiple languages and special characters",
            "Clear text with a single button",
            "Load example text for testing",
          ]}
          useCases={[
            "Academic writing",
            "Content creation",
            "Social media posts",
            "Email composition",
            "SEO optimization",
            "Translation projects",
            "Blog writing",
            "Report writing",
          ]}
          tips={[
            "Average reading speed is 200-250 words per minute",
            "Use word count to optimize content for different platforms",
            "Character count is important for social media limits",
            "Paragraph count helps structure long-form content",
          ]}
        />
      </div>
    </div>
  );
};

export default WordCounter;
