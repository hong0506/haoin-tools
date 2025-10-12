import { useState } from "react";
import { Link } from "react-router-dom";
import { X, AlertCircle, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import wechatQR from "@/assets/wechat-qr-code.jpg";
import douyinQR from "@/assets/douyin-qr-code.jpg";
import xiaohongshuQR from "@/assets/xiaohongshu-qr-code.jpg";
import wechatIcon from "@/assets/wechat.svg";
import instagramIcon from "@/assets/instagram.svg";

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
  const { t } = useTranslation();

  // Scroll to top when clicking footer links and clear saved position
  const handleLinkClick = (path: string) => {
    // Clear the saved scroll position for the target page
    sessionStorage.removeItem(`scroll_${path}`);
    // Scroll current page to top immediately
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const socialLinks = [
    {
      name: "wechat",
      translationKey: "footer.wechat",
      icon: wechatIcon,
      color: "from-green-500 to-emerald-500",
      account: "lumifiretech",
      qrCode: wechatQR,
    },
    {
      name: "instagram",
      translationKey: "footer.instagram",
      icon: instagramIcon,
      color: "from-purple-500 via-pink-500 to-orange-500",
      account: "@haoin_tech",
    },
  ];

  const handleSocialClick = (social: (typeof socialLinks)[0]) => {
    setModalData({
      platform: social.name,
      name: t(social.translationKey),
      account: social.account,
      qrCode: social.qrCode,
    });
    setShowModal(true);
  };

  return (
    <>
      <footer className="relative mt-20 border-t glass">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
            {/* Brand Section - 40% width */}
            <div className="md:col-span-5">
              <h3 className="text-2xl font-black gradient-text mb-3">
                {t("hero.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {t("footer.description")}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                <span>{t("footer.dataProcessedLocally")}</span>
              </div>
            </div>

            {/* Quick Links - 25% width */}
            <div className="md:col-span-3">
              <h4 className="font-bold text-foreground mb-3">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick('/')}
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    🏠 {t("footer.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/favorites"
                    onClick={() => handleLinkClick('/category/favorites')}
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    ⭐ {t("footer.favorites")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/recent"
                    onClick={() => handleLinkClick('/category/recent')}
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    🕒 {t("footer.recentlyUsed")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/generator"
                    onClick={() => handleLinkClick('/category/generator')}
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    ⚡ {t("footer.generators")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/developer"
                    onClick={() => handleLinkClick('/category/developer')}
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    💻 {t("footer.devTools")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links - 20% width */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-foreground mb-3">
                {t("footer.legal")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/privacy"
                    onClick={() => handleLinkClick('/privacy')}
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.privacyPolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    onClick={() => handleLinkClick('/terms')}
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.termsOfService")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    onClick={() => handleLinkClick('/cookies')}
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.cookiePolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal"
                    onClick={() => handleLinkClick('/legal')}
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.copyright")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={() => handleLinkClick('/about')}
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.aboutUs")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect - 15% width */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-foreground mb-3">
                {t("footer.followUs")}
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                {t("footer.followUsForUpdates")}
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleSocialClick(social)}
                    className={`group relative p-2.5 rounded-lg bg-gradient-to-br ${social.color} text-white hover:shadow-lg transition-all hover:scale-105 cursor-pointer`}
                    aria-label={social.name}
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-5 h-5 filter brightness-0 invert"
                    />
                    {/* Tooltip */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {t(social.translationKey)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Disclaimer Section */}
          <div className="pt-8 border-t border-border/30 space-y-4">
            {/* Privacy First Banner */}
            <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-4 border border-blue-100/50 dark:border-blue-800/30">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500 rounded-lg flex-shrink-0">
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {t("footer.privacyFirst")}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("footer.privacyDescription")}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer & Legal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/50 dark:bg-gray-800/30 rounded-lg p-3 border border-border/50">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-3.5 w-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-xs text-foreground mb-1">
                      {t("footer.disclaimer")}
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {t("footer.disclaimerText")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 dark:bg-gray-800/30 rounded-lg p-3 border border-border/50">
                <div className="text-[11px] text-muted-foreground leading-relaxed">
                  <p className="mb-2">
                    <span className="font-semibold text-foreground">
                      {t("footer.advertising")}
                    </span>{" "}
                    {t("footer.advertisingText")}
                  </p>
                  <p>{t("footer.userResponsibility")}</p>
                </div>
              </div>
            </div>

            {/* Copyright Bar */}
            <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
                <div className="text-center md:text-left">
                  {t("footer.allRightsReserved")}
                </div>
                <div>
                  {t("footer.email")}{" "}
                  <a
                    href="mailto:contact@haoin.tech"
                    className="text-primary hover:underline font-medium"
                  >
                    contact@haoin.tech
                  </a>
                </div>
              </div>
              {/* <div className="text-center text-xs text-muted-foreground/70">
                <a
                  href="https://beian.miit.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  ICP备案号: [待补充]{" "}
                  Replace with actual ICP number when available
                </a>
              </div> */}
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
                    // Using native alert for better compatibility without toast import
                    setTimeout(() => alert("✓ Account ID copied!"), 100);
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
