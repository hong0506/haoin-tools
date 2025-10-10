import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 检查用户是否已经同意Cookie
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      // 延迟显示，避免影响首次加载体验
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5">
      <div className="container mx-auto max-w-6xl">
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-6 text-white">
          <button
            onClick={declineCookies}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pr-8">
            <div className="flex-shrink-0">
              <div className="p-3 bg-white/20 rounded-xl">
                <Cookie className="h-8 w-8" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                🍪 We Value Your Privacy
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                We use essential cookies to ensure our website works properly.
                We do NOT use advertising or tracking cookies. All tools process
                data locally in your browser. By continuing to use our site, you
                agree to our use of essential cookies.
                <a
                  href="/privacy"
                  className="underline hover:text-white/80 ml-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn more
                </a>
              </p>
            </div>

            <div className="flex gap-3 flex-shrink-0">
              <Button
                onClick={acceptCookies}
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold shadow-lg"
              >
                Accept
              </Button>
              <Button
                onClick={declineCookies}
                variant="outline"
                className="border-white/30 text-purple-600 hover:bg-white/10 hover:text-white"
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
