import React from "react";
import { ExternalLink, TrendingUp } from "lucide-react";

interface AdBannerProps {
  size?: "small" | "medium" | "large";
  position?: "top" | "bottom" | "sidebar";
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  size = "medium",
  position = "top",
  className = "",
}) => {
  const sizeClasses = {
    small: "h-24 md:h-20",
    medium: "h-32 md:h-28",
    large: "h-40 md:h-36",
  };

  const positionClasses = {
    top: "mb-6",
    bottom: "mt-12",
    sidebar: "mb-4",
  };

  // 模拟广告内容 - 实际使用时替换为真实的广告代码
  const adContent = {
    title: "🚀 Boost Your Productivity",
    description: "Discover powerful tools for developers and creators",
    cta: "Learn More",
    sponsor: "Sponsored by TechCorp",
    image: "🎯",
  };

  return (
    <div className={`relative ${positionClasses[position]} ${className}`}>
      <div
        className={`
        relative overflow-hidden rounded-xl border border-border/50 
        bg-gradient-to-br from-blue-50/80 to-purple-50/80 
        dark:from-blue-950/20 dark:to-purple-950/20
        hover:shadow-lg transition-all duration-300 hover:scale-[1.02]
        cursor-pointer group
        ${sizeClasses[size]}
      `}
      >
        {/* 广告标签 */}
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200/50 dark:border-gray-700/50">
            <TrendingUp className="w-3 h-3" />
            Ad
          </span>
        </div>

        {/* 广告内容 */}
        <div className="flex items-center h-full p-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{adContent.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {adContent.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {adContent.description}
                </p>
                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    {adContent.cta}
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {adContent.sponsor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 装饰性背景元素 */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full translate-y-8 -translate-x-8"></div>
      </div>
    </div>
  );
};

// Sidebar Ad Stack - Multiple small ads stacked vertically
export const AdSidebarStack = ({
  side = "right",
  count = 2,
  className = "",
}: {
  side?: "left" | "right";
  count?: number;
  className?: string;
}) => {
  const allAds = [
    {
      size: "160x160",
      color:
        "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
      border: "border-purple-200 dark:border-purple-800",
    },
    {
      size: "160x160",
      color:
        "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      border: "border-blue-200 dark:border-blue-800",
    },
    {
      size: "160x160",
      color:
        "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      border: "border-green-200 dark:border-green-800",
    },
    {
      size: "160x160",
      color:
        "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
      border: "border-orange-200 dark:border-orange-800",
    },
  ];

  const ads = allAds.slice(0, count);

  return (
    <div
      className={`hidden xl:block fixed top-24 ${
        side === "right" ? "right-4" : "left-[280px]"
      } w-[160px] space-y-4 ${className}`}
      style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
    >
      {ads.map((ad, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${ad.color} rounded-lg border ${ad.border} p-2`}
        >
          <div className="flex items-center gap-1 mb-2">
            <div className="px-1.5 py-0.5 bg-purple-500 text-white text-[10px] font-semibold rounded">
              AD
            </div>
          </div>
          <div
            className={`aspect-square bg-white dark:bg-gray-800 rounded border border-dashed ${ad.border} flex items-center justify-center`}
          >
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">{ad.size}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Medium Rectangle Ad - for in-content placement
export const AdMediumRectangle = ({ className = "" }: AdBannerProps) => {
  return (
    <div className={`my-6 ${className}`}>
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800 p-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded">
            AD
          </div>
          <p className="text-xs text-muted-foreground">Advertisement</p>
        </div>
        <div className="p-8 bg-white dark:bg-gray-800 rounded border border-dashed border-green-200 dark:border-green-700 text-center">
          <p className="text-sm text-muted-foreground">300x250 Ad Space</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Medium Rectangle
          </p>
        </div>
      </div>
    </div>
  );
};
