import { useState } from "react";
import { X } from "lucide-react";
import wechatQR from "@/assets/wechat-qr-code.jpg";
import douyinQR from "@/assets/douyin-qr-code.jpg";
import xiaohongshuQR from "@/assets/xiaohongshu-qr-code.jpg";

interface SocialModal {
  platform: string;
  name: string;
  account: string;
  qrCode?: string;
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<SocialModal | null>(null);

  const socialLinks = [
    {
      name: "WeChat",
      displayName: "WeChat",
      icon: "/icons/wechat.svg",
      color: "from-green-500 to-emerald-500",
      account: "lumifiretech",
      qrCode: wechatQR,
    },
    {
      name: "Douyin",
      displayName: "TikTok",
      icon: "/icons/douyin.svg",
      color: "from-black to-gray-800",
      account: "69832710392",
      qrCode: douyinQR,
    },
    {
      name: "Xiaohongshu",
      displayName: "Xiaohongshu",
      icon: "/icons/xiaohongshu.svg",
      color: "from-red-500 to-pink-500",
      account: "2942406351",
      qrCode: xiaohongshuQR,
    },
    {
      name: "Instagram",
      displayName: "Instagram",
      icon: "/icons/instagram.svg",
      color: "from-purple-500 via-pink-500 to-orange-500",
      account: "@haoin_tech",
    },
    // {
    //   name: "Facebook",
    //   displayName: "Facebook",
    //   icon: "👍",
    //   color: "from-blue-600 to-blue-500",
    //   account: "Haoin Tools",
    // },
  ];

  const handleSocialClick = (social: (typeof socialLinks)[0]) => {
    setModalData({
      platform: social.name,
      name: social.displayName,
      account: social.account,
      qrCode: social.qrCode,
    });
    setShowModal(true);
  };

  return (
    <>
      <footer className="relative mt-20 border-t glass">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-2xl font-black gradient-text mb-3">
                Haoin Tools
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your all-in-one toolkit for productivity. Free, fast, and
                privacy-first tools for everyone.
              </p>
              {/* <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
              <span>for the community</span>
            </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/" className="hover:text-primary transition-colors">
                    🏠 Home
                  </a>
                </li>
                <li>
                  <a
                    href="/category/popular"
                    className="hover:text-primary transition-colors"
                  >
                    🔥 Popular Tools
                  </a>
                </li>
                <li>
                  <a
                    href="/category/new"
                    className="hover:text-primary transition-colors"
                  >
                    ⚡ Latest Tools
                  </a>
                </li>
                <li>
                  <a
                    href="/category/code"
                    className="hover:text-primary transition-colors"
                  >
                    💻 Developer Tools
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-bold text-foreground mb-3">
                Connect With Us
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Follow us for updates and new tools!
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleSocialClick(social)}
                    className={`group relative p-3 rounded-xl bg-gradient-to-br ${social.color} text-white hover:shadow-xl transition-all hover:scale-110 cursor-pointer`}
                    aria-label={social.name}
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-6 h-6 text-white"
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {social.displayName}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Copyright */}
              <div className="text-sm text-muted-foreground">
                © {currentYear}{" "}
                <span className="font-semibold text-primary">Haoin Tools</span>.
                All rights reserved.
              </div>

              {/* Domain Info */}
              <div className="text-xs text-muted-foreground">
                <div className="space-y-1">
                  <div>🌐 haointools.com</div>
                  <div>📧 contact@haoin.tech</div>
                  {/* ICP备案预留位置 - 获得备案号后取消注释 */}
                  {/* <div>
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    浙ICP备xxxxxxxx号
                  </a>
                </div> */}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="/legal"
                  className="hover:text-primary transition-colors w-fit font-semibold"
                >
                  📜 Legal & Copyright
                </a>
                <a
                  href="/privacy"
                  className="hover:text-primary transition-colors w-fit"
                >
                  Privacy Policy
                </a>
                <a
                  href="/cookies"
                  className="hover:text-primary transition-colors w-fit"
                >
                  Cookie Policy
                </a>
                <a
                  href="/terms"
                  className="hover:text-primary transition-colors w-fit"
                >
                  Terms of Service
                </a>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors w-fit"
                >
                  About Us
                </a>
              </div>
            </div>

            {/* Additional Legal Info */}
            <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/30">
              <p>
                All tools process data locally in your browser for privacy and
                security. We do not store your files or personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-pink-400/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2" />
      </footer>

      {/* Social Media Modal - Outside footer for full screen coverage */}
      {showModal && modalData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white relative sticky top-0">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-2xl font-bold mb-1">{modalData.name}</h3>
              <p className="text-white/90 text-sm">
                Connect with us on {modalData.platform}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              {modalData.qrCode ? (
                <>
                  <p className="text-gray-600 mb-3 text-sm">
                    Scan QR code to follow our {modalData.name}
                  </p>
                  <div className="bg-gray-100 rounded-2xl p-4 inline-block mb-3">
                    <img
                      src={modalData.qrCode}
                      alt="QR Code"
                      className="w-48 h-auto max-h-48 mx-auto object-contain"
                    />
                  </div>
                </>
              ) : null}

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-3 mb-3">
                <p className="text-xs text-gray-600 mb-1.5">Account ID</p>
                <p className="text-lg font-bold text-gray-900 mb-2.5">
                  {modalData.account}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(modalData.account);
                    alert("Account copied to clipboard!");
                  }}
                  className="px-5 py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm rounded-full hover:shadow-lg transition-all hover:scale-105"
                >
                  📋 Copy Account
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Copy the account and search for it on {modalData.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
