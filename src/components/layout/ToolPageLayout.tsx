import React from "react";
import { AdBanner } from "@/components/ads/AdBanner";
import { AdInserter } from "@/components/ads/AdInserter";
import { shouldShowAd } from "@/config/ads";

interface ToolPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`container mx-auto max-w-7xl px-6 py-8 ${className}`}>
      {/* Top Ad Banner */}
      {shouldShowAd("toolPage", "top") && (
        <AdBanner
          size="medium"
          position="top"
          className="max-w-4xl mx-auto mb-8"
        />
      )}

      {/* Main Content with Smart Ad Insertion */}
      <div className="max-w-4xl mx-auto">
        <AdInserter>
          {children}
        </AdInserter>
      </div>

      {/* Bottom Ad Banner */}
      {shouldShowAd("toolPage", "bottom") && (
        <AdBanner
          size="large"
          position="bottom"
          className="max-w-4xl mx-auto mt-8"
        />
      )}
    </div>
  );
};
