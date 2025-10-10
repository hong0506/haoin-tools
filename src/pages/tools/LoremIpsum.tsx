import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import { Text, Copy, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const LoremIpsum = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loremText = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
  ];

  const generate = () => {
    const text = Array.from(
      { length: paragraphs },
      (_, i) => loremText[i % loremText.length]
    ).join("\n\n");
    setOutput(text);
    toast.success(
      `Generated ${paragraphs} paragraph${paragraphs > 1 ? "s" : ""}`
    );
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setOutput("");
    setParagraphs(3);
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setParagraphs(3);
    setOutput("");
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
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Lorem Ipsum Generator</h1>
            <div className="ml-auto">
              <FavoriteButton toolId="lorem-ipsum" toolTitle="Lorem Ipsum Generator" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardDescription>
              Create Lorem Ipsum text for your designs
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
              <label className="mb-2 block text-sm font-medium">
                Number of Paragraphs
              </label>
              <Input
                type="number"
                min={1}
                max={20}
                value={paragraphs}
                onChange={(e) =>
                  setParagraphs(
                    Math.max(1, Math.min(20, parseInt(e.target.value) || 1))
                  )
                }
              />
            </div>

            <Button onClick={generate} className="w-full">
              Generate
            </Button>

            {output && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">Generated Text</label>
                  <Button onClick={copyOutput} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <Textarea value={output} readOnly className="min-h-[300px]" />
              </div>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="Lorem Ipsum Generator"
          description="Lorem Ipsum is placeholder text commonly used in graphic design, publishing, and web development. This tool generates Lorem Ipsum text in various lengths to help you visualize layouts, test typography, and create design mockups without relying on actual content."
          features={[
            "Generate Lorem Ipsum placeholder text",
            "Choose number of paragraphs (1-20)",
            "Classic Lorem Ipsum text from Cicero's writings",
            "Copy generated text to clipboard",
            "Clear all fields with a single button",
            "Load example settings for testing",
          ]}
          useCases={[
            "Web design mockups",
            "Graphic design layouts",
            "Typography testing",
            "Template creation",
            "Publishing previews",
            "UI/UX prototyping",
            "Content placeholders",
            "Print design layouts",
          ]}
          tips={[
            "Lorem Ipsum has been industry standard since the 1500s",
            "Use it to focus on design rather than content",
            "Perfect for client presentations and mockups",
            "Generates consistent-looking text for testing layouts",
          ]}
        />
      </div>
    </div>
  );
};

export default LoremIpsum;
