import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Baidu Auto Push Component
 * Automatically pushes URLs to Baidu for faster indexing
 * Only loads when the user's language is Chinese
 */
export const BaiduPush = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if language is Chinese
    const language = localStorage.getItem("i18nextLng") || navigator.language;
    const isChinese = language.startsWith("zh");

    if (!isChinese) {
      return; // Don't load Baidu push for non-Chinese users
    }

    // Baidu Auto Push Script
    const script = document.createElement("script");
    script.innerHTML = `
      (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
          bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
      })();
    `;
    
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [location.pathname]); // Re-run when page changes

  return null; // This component doesn't render anything
};
