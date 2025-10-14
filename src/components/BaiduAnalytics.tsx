import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Baidu Analytics (百度统计) Component
 * Add your Baidu Analytics tracking code here after registration
 */
export const BaiduAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if language is Chinese
    const language = localStorage.getItem("i18nextLng") || navigator.language;
    const isChinese = language.startsWith("zh");

    if (!isChinese) {
      return; // Don't load Baidu Analytics for non-Chinese users
    }

    // TODO: Replace 'YOUR_BAIDU_ANALYTICS_ID' with your actual Baidu Analytics ID
    // Register at: https://tongji.baidu.com/
    const BAIDU_ANALYTICS_ID = "YOUR_BAIDU_ANALYTICS_ID";

    // Only load if ID is set
    if (BAIDU_ANALYTICS_ID === "YOUR_BAIDU_ANALYTICS_ID") {
      console.log("Baidu Analytics: Please add your tracking ID");
      return;
    }

    // Baidu Analytics Script
    const script = document.createElement("script");
    script.innerHTML = `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ANALYTICS_ID}";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `;

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Track page views
  useEffect(() => {
    interface WindowWithBaiduAnalytics extends Window {
      _hmt?: Array<Array<string>>;
    }

    const windowWithBaidu = window as WindowWithBaiduAnalytics;
    if (typeof window !== "undefined" && windowWithBaidu._hmt) {
      windowWithBaidu._hmt.push(["_trackPageview", location.pathname]);
    }
  }, [location]);

  return null;
};
