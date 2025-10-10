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
import {
  Shuffle,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Gift,
  Zap,
  Info,
  Users,
  Trophy,
  Dice5,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";

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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Random Name/Item Picker</CardTitle>
                <CardDescription>
                  Enter items (one per line) and pick a random winner
                </CardDescription>
              </div>
              <FavoriteButton toolId="random-picker" toolName="Random Picker" />
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

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">What is Random Picker?</strong>{" "}
              This tool randomly selects a winner from your list of names or
              items. Perfect for giveaways, raffles, team assignments, and fair
              decision making! 🎯
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Gift className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    Contest Giveaways
                  </div>
                  <p className="text-sm text-pink-700">
                    Pick random{" "}
                    <Badge variant="secondary" className="mx-1">
                      winners
                    </Badge>
                    for social media contests
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Trophy className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    Raffle Drawings
                  </div>
                  <p className="text-sm text-purple-700">
                    Fair and unbiased random selection for prize drawings
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    Team Assignments
                  </div>
                  <p className="text-sm text-blue-700">
                    Randomly assign people to teams or groups
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Dice5 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    Decision Making
                  </div>
                  <p className="text-sm text-green-700">
                    Let randomness help you choose between options
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
                  <strong>One Per Line:</strong> Enter each name or item on a
                  new line
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Fair Selection:</strong> Uses true randomness for
                  unbiased picks
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Screenshot:</strong> Capture results for transparency
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Social Media:</strong> Perfect for Instagram and
                  Twitter giveaways
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
                onClick={() => navigate("/tools/uuid-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  UUID Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate unique IDs
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/password-generator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Password Generator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate secure passwords
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/lorem-ipsum")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Lorem Ipsum
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Generate placeholder text
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RandomPicker;
