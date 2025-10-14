import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";

interface InlineAdProps {
  className?: string;
}

export const InlineAd: React.FC<InlineAdProps> = ({ className = "" }) => {
  const ads = [
    {
      id: 1,
      title: "🚀 Boost Your Productivity",
      description: "Discover powerful tools for developers and creators",
      cta: "Learn More",
      sponsor: "Sponsored by TechCorp",
      icon: "⚡",
      color: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      title: "🎨 Design Like a Pro",
      description: "Professional UI/UX design tools and resources",
      cta: "Try Free",
      sponsor: "DesignHub",
      icon: "✨",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 3,
      title: "📊 Analytics Made Simple",
      description: "Track your website performance with ease",
      cta: "Start Free",
      sponsor: "WebMetrics",
      icon: "📈",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "🔒 Secure Your Data",
      description: "Advanced encryption and security solutions",
      cta: "Get Started",
      sponsor: "SecureTech",
      icon: "🛡️",
      color: "from-orange-500 to-red-500",
    },
  ];

  // 随机选择一个广告
  const selectedAd = ads[Math.floor(Math.random() * ads.length)];

  return (
    <div className={`w-full my-12 ${className}`}>
      <div className="relative">
        {/* 广告标签 */}
        <div className="absolute -top-2 -right-2 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full shadow-sm">
            <Sparkles className="w-3 h-3" />
            Sponsored
          </span>
        </div>

        {/* 广告卡片 */}
        <div
          className={`
            relative overflow-hidden rounded-xl border border-border/50 
            bg-gradient-to-r ${selectedAd.color} 
            hover:shadow-xl transition-all duration-300 hover:scale-[1.02]
            cursor-pointer group
            p-6
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{selectedAd.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-white mb-1 group-hover:text-blue-100 transition-colors">
                  {selectedAd.title}
                </h3>
                <p className="text-sm text-white/90 mb-2">
                  {selectedAd.description}
                </p>
                <button className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm">
                  {selectedAd.cta}
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-white/80">
                {selectedAd.sponsor}
              </span>
            </div>
          </div>

          {/* 装饰性元素 */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
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
