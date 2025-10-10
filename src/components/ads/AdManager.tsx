import React, { useState, useEffect } from "react";
import { AdBanner } from "./AdBanner";
import { SidebarAd } from "./SidebarAd";
import { GoogleAdSense, AdSenseBanner, AdSenseSidebar } from "./GoogleAdSense";
import { defaultAdConfig, shouldShowAd } from "@/config/ads";

interface AdManagerProps {
  page: "homepage" | "toolPage";
  position: "top" | "bottom" | "sidebar";
  size?: "small" | "medium" | "large";
  className?: string;
}

export const AdManager: React.FC<AdManagerProps> = ({
  page,
  position,
  size = "medium",
  className = "",
}) => {
  const [adConfig, setAdConfig] = useState(defaultAdConfig);

  // 检查是否应该显示广告
  if (!shouldShowAd(page, position)) {
    return null;
  }

  // 根据配置选择广告类型
  const renderAd = () => {
    if (adConfig.providers.googleAdsense) {
      // 使用Google AdSense
      switch (position) {
        case "top":
        case "bottom":
          return <AdSenseBanner className={className} />;
        case "sidebar":
          return <AdSenseSidebar className={className} />;
        default:
          return null;
      }
    } else {
      // 使用自定义广告
      switch (position) {
        case "top":
        case "bottom":
          return (
            <AdBanner size={size} position={position} className={className} />
          );
        case "sidebar":
          return <SidebarAd className={className} />;
        default:
          return null;
      }
    }
  };

  return <>{renderAd()}</>;
};

// 便捷的广告组件
export const HomepageTopAd: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <AdManager
    page="homepage"
    position="top"
    size="medium"
    className={className}
  />
);

export const HomepageSidebarAd: React.FC<{ className?: string }> = ({
  className = "",
}) => <AdManager page="homepage" position="sidebar" className={className} />;

export const ToolPageTopAd: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <AdManager
    page="toolPage"
    position="top"
    size="medium"
    className={className}
  />
);

export const ToolPageBottomAd: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <AdManager
    page="toolPage"
    position="bottom"
    size="large"
    className={className}
  />
);

export const ToolPageSidebarAd: React.FC<{ className?: string }> = ({
  className = "",
}) => <AdManager page="toolPage" position="sidebar" className={className} />;
