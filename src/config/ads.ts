// 广告配置管理
export interface AdConfig {
  enabled: boolean;
  positions: {
    homepage: {
      top: boolean;
      bottom: boolean;
      sidebar: boolean;
    };
    toolPages: {
      top: boolean;
      bottom: boolean;
      sidebar: boolean;
    };
  };
  providers: {
    googleAdsense: boolean;
    custom: boolean;
  };
}

// 默认广告配置
export const defaultAdConfig: AdConfig = {
  enabled: true,
  positions: {
    homepage: {
      top: true,
      bottom: true,
      sidebar: false,
    },
    toolPages: {
      top: true,
      bottom: true,
      sidebar: false,
    },
  },
  providers: {
    googleAdsense: false, // 设置为true以启用Google AdSense
    custom: true, // 自定义广告
  },
};

// 广告样式配置
export const adStyles = {
  borderRadius: "rounded-xl",
  shadow: "hover:shadow-lg",
  transition: "transition-all duration-300",
  hover: "hover:scale-[1.02]",
  colors: {
    primary: "from-blue-50/80 to-purple-50/80",
    secondary: "dark:from-blue-950/20 dark:to-purple-950/20",
    border: "border-border/50",
  },
};

// 广告位置配置
export const adPositions = {
  homepage: {
    top: { size: "medium", className: "mb-8" },
    sidebar: { size: "small", className: "mb-6" },
  },
  toolPages: {
    bottom: { size: "large", className: "mt-8" },
    sidebar: { size: "small", className: "mb-6" },
  },
};

// 检查是否应该显示广告
export const shouldShowAd = (
  page: "homepage" | "toolPage",
  position: string
): boolean => {
  const config = defaultAdConfig;

  if (!config.enabled) return false;

  if (page === "homepage") {
    return (
      config.positions.homepage[
        position as keyof typeof config.positions.homepage
      ] || false
    );
  } else if (page === "toolPage") {
    return (
      config.positions.toolPages[
        position as keyof typeof config.positions.toolPages
      ] || false
    );
  }

  return false;
};
