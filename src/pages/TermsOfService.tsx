import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const TermsOfService = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">{t("terms.title")}</h2>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
            <FileText className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">{t("terms.title")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("terms.lastUpdated")} {new Date().toLocaleDateString("zh-CN")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.agreement.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("terms.agreement.content")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.useOfService.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("terms.useOfService.content")}
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>{t("terms.useOfService.freeAccess")}</li>
              <li>{t("terms.useOfService.noRegistration")}</li>
              <li>{t("terms.useOfService.personalCommercial")}</li>
              <li>{t("terms.useOfService.unlimitedUsage")}</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.prohibited.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("terms.prohibited.content")}
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>{t("terms.prohibited.illegal")}</li>
              <li>{t("terms.prohibited.harm")}</li>
              <li>{t("terms.prohibited.reverseEngineer")}</li>
              <li>{t("terms.prohibited.automated")}</li>
              <li>{t("terms.prohibited.infringe")}</li>
              <li>{t("terms.prohibited.violate")}</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.disclaimer.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("terms.disclaimer.content")}
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              <strong>{t("terms.disclaimer.important")}</strong>
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>{t("terms.disclaimer.financial")}</li>
              <li>{t("terms.disclaimer.health")}</li>
              <li>{t("terms.disclaimer.liability")}</li>
              <li>{t("terms.disclaimer.maximum")}</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.intellectualProperty.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("terms.intellectualProperty.content")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.advertising.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("terms.advertising.content")}
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>{t("terms.advertising.networks")}</li>
              <li>{t("terms.advertising.endorse")}</li>
              <li>{t("terms.advertising.content")}</li>
              <li>{t("terms.advertising.transactions")}</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.governingLaw.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("terms.governingLaw.content")}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t("terms.governingLaw.disputes")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.changes.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("terms.changes.content")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t("terms.contact.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("terms.contact.content")}{" "}
              <strong className="text-primary">contact@haoin.tech</strong>
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg">
            <p className="text-center text-foreground/70">
              {t("terms.fairUse")}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
