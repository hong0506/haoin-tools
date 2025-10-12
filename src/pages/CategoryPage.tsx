import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { tools, categories } from "@/data/tools";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
import { multiLanguageSearch } from "@/lib/searchUtils";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { recentTools, clearRecentTools } = useRecentTools();
  const { favorites, clearAllFavorites } = useFavorites();
  const { t } = useTranslation();

  const category = categories.find((c) => c.id === categoryId);
  const IconComponent = category
    ? (Icons[category.icon as keyof typeof Icons] as React.ComponentType<{
        className?: string;
      }>)
    : null;

  const categoryTools = tools.filter((tool) => {
    if (categoryId === "recent") {
      // Show only recently accessed tools
      return recentTools.some((recent) => recent.id === tool.id);
    }
    if (categoryId === "favorites") {
      // Show only favorited tools
      return favorites.includes(tool.id);
    }
    return tool.category === categoryId;
  });

  // Sort tools by recent access time for "Recently Used" or by added time for "Favorites"
  const sortedTools =
    categoryId === "recent"
      ? categoryTools.sort((a, b) => {
          const aRecent = recentTools.find((recent) => recent.id === a.id);
          const bRecent = recentTools.find((recent) => recent.id === b.id);
          if (!aRecent && !bRecent) return 0;
          if (!aRecent) return 1;
          if (!bRecent) return -1;
          return bRecent.lastAccessed - aRecent.lastAccessed;
        })
      : categoryId === "favorites"
      ? categoryTools.sort((a, b) => {
          const aIndex = favorites.indexOf(a.id);
          const bIndex = favorites.indexOf(b.id);
          // Sort by the order they were added to favorites (most recent first)
          return aIndex - bIndex;
        })
      : categoryTools;

  // Use multi-language search to support all languages (en, zh, es)
  const filteredTools = multiLanguageSearch(sortedTools, searchQuery);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <SidebarTrigger />
          <div className="flex-1 min-w-0">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative z-0">
        {/* Category Header */}
        <div className="mb-12 animate-fade-in">
          <div className="mb-6 flex items-start gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 p-4 flex items-center justify-center shadow-lg animate-float">
              {IconComponent && (
                <IconComponent className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-black mb-2">
                <span className="gradient-text">
                  {t(`categories.${category.id}`)}
                </span>
              </h1>
              <p className="text-lg text-foreground/70 font-medium">
                🎯 {t("common.toolsAvailable", { count: filteredTools.length })}
              </p>
              {categoryId === "recent" && recentTools.length > 0 && (
                <Button
                  onClick={clearRecentTools}
                  variant="outline"
                  size="sm"
                  className="mt-4 border-2 hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                >
                  🗑️ {t("common.clearRecentTools")}
                </Button>
              )}
              {categoryId === "favorites" && favorites.length > 0 && (
                <Button
                  onClick={clearAllFavorites}
                  variant="outline"
                  size="sm"
                  className="mt-4 border-2 hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                >
                  🗑️ {t("common.clearFavorites")}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center p-12 rounded-3xl glass">
              {categoryId === "recent" ? (
                <>
                  <div className="mb-4 text-6xl">⏰</div>
                  <p className="text-xl font-semibold text-foreground mb-2">
                    {searchQuery
                      ? "No matching recent tools"
                      : "No recent tools yet"}
                  </p>
                  {searchQuery ? (
                    <p className="text-muted-foreground">
                      Can't find "
                      <span className="font-semibold text-primary">
                        {searchQuery}
                      </span>
                      " in recent tools
                    </p>
                  ) : (
                    <p className="text-muted-foreground max-w-md">
                      {t("common.startExploringTools")}
                    </p>
                  )}
                </>
              ) : categoryId === "favorites" ? (
                <>
                  <div className="mb-4 text-6xl">⭐</div>
                  <p className="text-xl font-semibold text-foreground mb-2">
                    {searchQuery
                      ? "No matching favorites"
                      : "No favorite tools yet"}
                  </p>
                  {searchQuery ? (
                    <p className="text-muted-foreground">
                      Can't find "
                      <span className="font-semibold text-primary">
                        {searchQuery}
                      </span>
                      " in favorites
                    </p>
                  ) : (
                    <p className="text-muted-foreground max-w-md">
                      Click the ⭐ star icon on any tool to add it to your
                      favorites. Your favorite tools will appear here for quick
                      access!
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-4 text-6xl">🔍</div>
                  <p className="text-xl font-semibold text-foreground mb-2">
                    No tools found
                  </p>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? `Can't find anything matching "${searchQuery}"`
                      : "No tools in this category"}
                  </p>
                  {searchQuery && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try a different search term
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryPage;
