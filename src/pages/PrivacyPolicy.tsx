import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold flex-1">{t("privacy.title")}</h2>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">{t("privacy.title")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("privacy.lastUpdated")} {new Date().toLocaleDateString("zh-CN")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("privacy.introduction.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("privacy.introduction.content")}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              <strong>{t("privacy.introduction.contact")}</strong>{" "}
              contact@haoin.tech
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("privacy.dataCollection.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("privacy.dataCollection.content")}
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>{t("privacy.dataCollection.usageData")}</li>
              <li>{t("privacy.dataCollection.technicalData")}</li>
              <li>{t("privacy.dataCollection.noPersonalFiles")}</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("privacy.dataProtection.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("privacy.dataProtection.content")}
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>{t("privacy.dataProtection.clientSide")}</li>
              <li>{t("privacy.dataProtection.noStorage")}</li>
              <li>{t("privacy.dataProtection.noTracking")}</li>
              <li>{t("privacy.dataProtection.httpsSecure")}</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("privacy.advertising.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("privacy.advertising.content")}
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>{t("privacy.advertising.adNetworks")}</li>
              <li>{t("privacy.advertising.cookies")}</li>
              <li>{t("privacy.advertising.dataSharing")}</li>
              <li>{t("privacy.advertising.privacyControls")}</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              {t("privacy.advertising.note")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("privacy.cookies.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("privacy.cookies.content")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("privacy.dataRights.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              <strong>{t("privacy.dataRights.gdpr.title")}</strong>
            </p>
            <ul className="space-y-2 text-foreground/80 mb-4">
              {t("privacy.dataRights.gdpr.rights", { returnObjects: true }).map(
                (right: string, index: number) => (
                  <li key={index}>{right}</li>
                )
              )}
            </ul>
            <p className="text-foreground/80 leading-relaxed mb-4">
              <strong>{t("privacy.dataRights.ccpa.title")}</strong>
            </p>
            <ul className="space-y-2 text-foreground/80 mb-4">
              {t("privacy.dataRights.ccpa.rights", { returnObjects: true }).map(
                (right: string, index: number) => (
                  <li key={index}>{right}</li>
                )
              )}
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              <strong>{t("privacy.dataRights.chinaLabel")}</strong>{" "}
              {t("privacy.dataRights.china")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("privacy.dataRetention.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("privacy.dataRetention.content")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("privacy.contact.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("privacy.contact.content")}{" "}
              <strong className="text-primary">contact@haoin.tech</strong>
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              {t("privacy.contact.responseTime")}
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
            <p className="text-center text-foreground/70">
              {t("privacy.trust")}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
