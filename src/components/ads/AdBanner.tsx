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
    bottom: "mt-6",
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
