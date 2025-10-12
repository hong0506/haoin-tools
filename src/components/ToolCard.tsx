import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tool } from "@/types/tool";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import * as Icons from "lucide-react";
import { Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  const { addRecentTool } = useRecentTools();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const favorited = isFavorited(tool.id);
  const IconComponent = Icons[
    tool.icon as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  // Get translated tool info
  const toolTitle = t(`tools.${tool.id}.title`, { defaultValue: tool.title });
  const toolDescription = t(`tools.${tool.id}.description`, { defaultValue: tool.description });
  const badgeText = t(`categories.${tool.category}`, { defaultValue: tool.badge });

  const handleClick = () => {
    addRecentTool(tool.id, toolTitle);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    toggleFavorite(tool.id);
    if (favorited) {
      toast.success(`${toolTitle} ${t("toolCard.removedFromFavorites")}`);
    } else {
      toast.success(`⭐ ${toolTitle} ${t("toolCard.addedToFavorites")}`);
    }
  };

  // Different gradient colors for different badge types
  const gradientMap: Record<string, string> = {
    blue: "from-blue-400 to-cyan-400",
    purple: "from-purple-400 to-pink-400",
    green: "from-green-400 to-emerald-400",
    orange: "from-orange-400 to-yellow-400",
    pink: "from-pink-400 to-rose-400",
    cyan: "from-cyan-400 to-blue-400",
  };

  const gradient = gradientMap[tool.badgeVariant || "blue"];

  return (
    <Link
      to={tool.path}
      className="block group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full cursor-pointer overflow-hidden relative border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
        {/* Animated gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Favorite button */}
        <Button
          onClick={handleFavoriteClick}
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 z-20 h-8 w-8 rounded-full transition-all duration-200 ${
            favorited
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-lg"
              : "hover:bg-yellow-50 opacity-0 group-hover:opacity-100"
          }`}
        >
          <Star
            className={`h-4 w-4 transition-all ${
              favorited ? "fill-white text-white" : "text-gray-400"
            }`}
          />
        </Button>

        <CardHeader className="pb-3 relative">
          <div className="flex items-start justify-between gap-2 mb-3">
            {/* Icon with animated gradient background */}
            <div
              className={`relative rounded-xl p-3 bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              {IconComponent && (
                <IconComponent className="h-6 w-6 text-white relative z-10" />
              )}
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity`}
              />
            </div>
            <Badge
              variant={tool.badgeVariant}
              className="shadow-sm transition-transform duration-300 group-hover:scale-110"
            >
              {badgeText}
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-200">
            {toolTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <CardDescription className="text-sm leading-relaxed">
            {toolDescription}
          </CardDescription>
        </CardContent>

        {/* Bottom decorative line with gradient */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
        />
      </Card>
    </Link>
  );
};
