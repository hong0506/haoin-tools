import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import {
  Scale,
  Shield,
  Code,
  FileText,
  AlertCircle,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Legal = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold flex-1">{t("legal.title")}</h2>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            <Scale className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">{t("legal.title")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("legal.lastUpdated")}{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Copyright Notice */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <Shield className="h-6 w-6" />
              {t("legal.copyright.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("legal.copyright.content")}
            </p>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              {t("legal.copyright.originalContent.title")}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              {t("legal.copyright.originalContent.points", {
                returnObjects: true,
              }).map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              {t("legal.copyright.technicalImplementation.title")}
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              {t("legal.copyright.technicalImplementation.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              {t("legal.copyright.technicalImplementation.points", {
                returnObjects: true,
              }).map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <Code className="h-6 w-6" />
              {t("legal.technologyStack.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("legal.technologyStack.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              {t("legal.technologyStack.points", { returnObjects: true }).map(
                (point: string, index: number) => (
                  <li key={index}>{point}</li>
                )
              )}
            </ul>

            <p className="text-foreground/80 leading-relaxed mt-4">
              {t("legal.technologyStack.note")}
            </p>
          </div>

          {/* Usage Terms & Disclaimer */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <FileText className="h-6 w-6" />
              {t("legal.usageTerms.title")}
            </h2>

            <h3 className="font-semibold text-lg mt-4 mb-3 text-foreground">
              {t("legal.usageTerms.usageLicense.title")}
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("legal.usageTerms.usageLicense.content")}
            </p>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              {t("legal.usageTerms.disclaimer.title")}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              {t("legal.usageTerms.disclaimer.points", {
                returnObjects: true,
              }).map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              {t("legal.usageTerms.privacyProtection.title")}
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("legal.usageTerms.privacyProtection.content")}
            </p>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              {t("legal.usageTerms.contact.title")}
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              {t("legal.usageTerms.contact.content")}{" "}
              <strong>contact@haoin.tech</strong>
            </p>
          </div>

          {/* Third-party Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <Users className="h-6 w-6" />
              {t("legal.thirdPartyContent.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("legal.thirdPartyContent.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              {t("legal.thirdPartyContent.points", { returnObjects: true }).map(
                (point: string, index: number) => (
                  <li key={index}>{point}</li>
                )
              )}
            </ul>

            <p className="text-foreground/80 leading-relaxed mt-4">
              {t("legal.thirdPartyContent.note")}
            </p>
          </div>

          {/* DMCA Notice */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              {t("legal.dmca.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("legal.dmca.content")}
            </p>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              {t("legal.dmca.requirements.title")}
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              {t("legal.dmca.requirements.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              {t("legal.dmca.requirements.points", { returnObjects: true }).map(
                (point: string, index: number) => (
                  <li key={index}>{point}</li>
                )
              )}
            </ul>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              {t("legal.dmca.designatedAgent.title")}
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
              <p className="text-foreground">
                <strong>{t("legal.dmca.designatedAgent.agent")}</strong>
              </p>
              <p className="text-foreground mt-2">
                Email: <strong>{t("legal.dmca.designatedAgent.email")}</strong>
              </p>
              <p className="text-foreground mt-1">
                {t("legal.dmca.designatedAgent.subject")}
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              {t("legal.dmca.note")}
            </p>
          </div>

          {/* User Content Responsibility */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <Users className="h-6 w-6" />
              {t("legal.userContent.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("legal.userContent.content")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              {t("legal.userContent.points", { returnObjects: true }).map(
                (point: string, index: number) => (
                  <li key={index}>{point}</li>
                )
              )}
            </ul>

            <p className="text-foreground/80 leading-relaxed mt-4">
              <strong>{t("legal.userContent.importantNotice")}</strong>
            </p>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground pt-4 pb-8">
            <p>{t("legal.footer.rightsReserved")}</p>
            <p className="mt-2">{t("legal.footer.company")}</p>
            <p className="mt-2 text-xs">{t("legal.footer.compliance")}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Legal;
