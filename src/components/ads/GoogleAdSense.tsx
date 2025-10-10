import React, { useEffect } from "react";

interface GoogleAdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  adStyle?: React.CSSProperties;
  className?: string;
}

export const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
  adSlot,
  adFormat = "auto",
  adStyle = {},
  className = "",
}) => {
  useEffect(() => {
    // 加载Google AdSense脚本
    const loadAdSense = () => {
      if (typeof window !== "undefined" && !window.adsbygoogle) {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.setAttribute("data-ad-client", "ca-pub-xxxxxxxxxx"); // 替换为你的AdSense ID
        document.head.appendChild(script);
      }
    };

    loadAdSense();
  }, []);

  useEffect(() => {
    // 推送广告
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [adSlot]);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...adStyle,
        }}
        data-ad-client="ca-pub-xxxxxxxxxx" // 替换为你的AdSense ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// 使用示例组件
export const AdSenseBanner: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`w-full ${className}`}>
    <GoogleAdSense
      adSlot="xxxxxxxxxx" // 替换为你的广告位ID
      adFormat="auto"
      adStyle={{ height: 90 }}
      className="max-w-4xl mx-auto"
    />
  </div>
);

export const AdSenseSidebar: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`w-full max-w-sm ${className}`}>
    <GoogleAdSense
      adSlot="xxxxxxxxxx" // 替换为你的广告位ID
      adFormat="rectangle"
      adStyle={{ height: 250 }}
    />
  </div>
);
