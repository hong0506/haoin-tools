import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorited: (toolId: string) => boolean;
  addFavorite: (toolId: string) => void;
  removeFavorite: (toolId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  const isFavorited = (toolId: string) => {
    return favorites.includes(toolId);
  };

  const addFavorite = (toolId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(toolId)) {
        return [...prev, toolId];
      }
      return prev;
    });
  };

  const removeFavorite = (toolId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== toolId));
  };

  const value: FavoritesContextType = {
    favorites,
    toggleFavorite,
    isFavorited,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
