import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/ads/AdBanner";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { tools } from "@/data/tools";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Sparkles, Zap, Heart } from "lucide-react";
import { shouldShowAd } from "@/config/ads";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative z-0">
        {/* Hero Section */}
        <div className="mb-16 animate-fade-in text-center relative">
          {/* Decorative floating icons */}
          <div className="absolute -top-8 left-1/4 animate-float">
            <Sparkles className="h-8 w-8 text-pink-400 opacity-60" />
          </div>
          <div className="absolute top-0 right-1/4 animate-float-slow">
            <Zap className="h-6 w-6 text-yellow-400 opacity-60" />
          </div>
          <div className="absolute -top-4 left-1/3 animate-float-slower">
            <Heart className="h-5 w-5 text-red-400 opacity-60" />
          </div>

          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-pink-300/30 backdrop-blur-sm">
            <span className="text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              ✨ Free Online Tools Collection
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-black md:text-7xl leading-tight">
            <span className="gradient-text">Haoin Free Online Tools</span>
            <br />
            <span className="gradient-text-accent">30+ Free Web Tools 🚀</span>
          </h1>

          <p className="mx-auto max-w-3xl text-xl text-foreground/70 font-medium leading-relaxed mb-8">
            Access{" "}
            <span className="font-bold text-primary">
              {tools.length} free online tools
            </span>{" "}
            for text processing, image editing, code generation, calculators and
            more.
            <br />
            <span className="text-lg">
              No registration required. Instant access to all tools! ⚡
            </span>
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <span className="text-sm font-semibold text-blue-600">
                🎨 Beautiful UI
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
              <span className="text-sm font-semibold text-green-600">
                ⚡ Lightning Fast
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
              <span className="text-sm font-semibold text-purple-600">
                🔒 Privacy First
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
              <span className="text-sm font-semibold text-orange-600">
                🎯 Easy to Use
              </span>
            </div>
          </div>
        </div>

        {/* Top Ad Banner */}
        {shouldShowAd("homepage", "top") && (
          <AdBanner
            size="medium"
            position="top"
            className="max-w-4xl mx-auto"
          />
        )}

        {/* Tools Grid */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {searchQuery ? (
                  <>
                    <span className="gradient-text">Search Results</span>
                    <span className="ml-3 text-2xl text-muted-foreground">
                      ({filteredTools.length})
                    </span>
                  </>
                ) : (
                  <span className="gradient-text">Explore All Tools</span>
                )}
              </h2>
              {!searchQuery && (
                <p className="text-muted-foreground">
                  Choose the perfect tool for your needs
                </p>
              )}
            </div>
          </div>

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
                <div className="mb-4 text-6xl">🔍</div>
                <p className="text-xl font-semibold text-foreground mb-2">
                  No tools found
                </p>
                <p className="text-muted-foreground">
                  Can't find anything matching "
                  <span className="font-semibold text-primary">
                    {searchQuery}
                  </span>
                  "
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a different search term
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Ad Banner */}
      {shouldShowAd("homepage", "bottom") && (
        <AdBanner
          size="large"
          position="bottom"
          className="max-w-4xl mx-auto mt-12"
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
