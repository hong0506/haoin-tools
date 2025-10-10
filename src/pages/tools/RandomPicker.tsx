import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shuffle, RotateCcw, Lightbulb, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToolDescription } from "@/components/ToolDescription";
import { FavoriteButton } from "@/components/FavoriteButton";

const RandomPicker = () => {
  const [items, setItems] = useState("");
  const [winner, setWinner] = useState("");
  const navigate = useNavigate();

  const pickRandom = () => {
    const list = items.split("\n").filter((item) => item.trim() !== "");
    if (list.length === 0) {
      toast.error("Please enter at least one item");
      return;
    }
    const randomItem = list[Math.floor(Math.random() * list.length)];
    setWinner(randomItem);
    toast.success("Winner selected!");
  };

  const clearAll = () => {
    setItems("");
    setWinner("");
    toast.success("All fields cleared");
  };

  const loadExample = () => {
    setItems("Alice\nBob\nCharlie\nDavid\nEve\nFrank");
    setWinner("");
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
          <div className="flex items-center gap-2">
            <Shuffle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Random Picker</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Random Name/Item Picker</CardTitle>
            <CardDescription>
              Enter items (one per line) and pick a random winner
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

            <Textarea
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder="Alice&#10;Bob&#10;Charlie&#10;David"
              rows={10}
            />
            <Button onClick={pickRandom} className="w-full">
              <Shuffle className="mr-2 h-4 w-4" />
              Pick Random Winner
            </Button>
            {winner && (
              <div className="rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 p-8 text-center animate-in fade-in zoom-in">
                <p className="text-sm text-muted-foreground mb-2">Winner</p>
                <p className="text-5xl font-bold text-primary">{winner}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <ToolDescription
          title="Random Picker"
          description="Randomly select a winner from a list of names or items. This tool is perfect for giveaways, raffles, decision making, and any situation where you need to pick something at random fairly."
          features={[
            "Pick random winners from a list",
            "Enter items one per line",
            "Fair and unbiased random selection",
            "Animated winner reveal",
            "Support for any number of items",
            "Simple and intuitive interface",
          ]}
          useCases={[
            "Contest giveaways",
            "Raffle drawings",
            "Team assignments",
            "Decision making",
            "Game selections",
            "Prize distributions",
            "Random sampling",
            "Classroom activities",
          ]}
          tips={[
            "Enter one item per line for best results",
            "Use for fair and unbiased selections",
            "Perfect for social media giveaways",
            "Screenshot the result for transparency",
          ]}
        />
      </div>
    </div>
  );
};

export default RandomPicker;
