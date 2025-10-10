import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
  toolId: string;
  toolName: string;
  className?: string;
}

export const FavoriteButton = ({
  toolId,
  toolName,
  className = "",
}: FavoriteButtonProps) => {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(toolId);

  const handleFavorite = () => {
    toggleFavorite(toolId);
    if (!favorited) {
      toast.success(`${toolName} added to favorites!`);
    } else {
      toast.success(`${toolName} removed from favorites!`);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleFavorite}
      className={`flex items-center gap-2 text-muted-foreground hover:text-primary ${className}`}
    >
      <Star
        className={`h-4 w-4 ${
          favorited ? "fill-yellow-400 text-yellow-400" : ""
        }`}
      />
      <span className="text-sm">Favorite</span>
    </Button>
  );
};
