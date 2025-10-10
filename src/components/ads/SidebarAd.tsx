import React from "react";
import { Star, ExternalLink, Zap } from "lucide-react";

interface SidebarAdProps {
  className?: string;
}

export const SidebarAd: React.FC<SidebarAdProps> = ({ className = "" }) => {
  const ads = [
    {
      id: 1,
      title: "⚡ Code Faster",
      description: "AI-powered coding assistant",
      cta: "Try Free",
      sponsor: "DevTools Pro",
      icon: "🚀",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 2,
      title: "🎨 Design Tools",
      description: "Professional UI/UX toolkit",
      cta: "Explore",
      sponsor: "DesignHub",
      icon: "✨",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "📊 Analytics",
      description: "Track your website performance",
      cta: "Start Free",
      sponsor: "WebMetrics",
      icon: "📈",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  // 随机选择一个广告
  const selectedAd = ads[Math.floor(Math.random() * ads.length)];

  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      <div className="relative">
        {/* 广告标签 */}
        <div className="absolute -top-2 -right-2 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-orange-500 text-white rounded-full shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            Sponsored
          </span>
        </div>

        {/* 广告卡片 */}
        <div
          className={`
          relative overflow-hidden rounded-xl border border-border/50 
          bg-gradient-to-br ${selectedAd.color} 
          hover:shadow-xl transition-all duration-300 hover:scale-[1.03]
          cursor-pointer group
        `}
        >
          <div className="p-4 text-white">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{selectedAd.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">{selectedAd.title}</h3>
                <p className="text-xs text-white/90 mb-3">
                  {selectedAd.description}
                </p>
                <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm">
                  {selectedAd.cta}
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/20">
              <span className="text-xs text-white/80">
                {selectedAd.sponsor}
              </span>
            </div>
          </div>

          {/* 装饰性元素 */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-6 -translate-x-6"></div>
        </div>

        {/* 广告说明 */}
        <div className="mt-2 text-center">
          <p className="text-xs text-muted-foreground">
            Advertisement •{" "}
            <button className="hover:text-primary transition-colors">
              Why this ad?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
