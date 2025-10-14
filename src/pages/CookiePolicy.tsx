import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import {
  Cookie,
  Mail,
  Info,
  Settings,
  Table,
  Sliders,
  Shield,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const CookiePolicy = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold flex-1">
            {t("cookiePolicy.title")}
          </h2>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-lg mb-4">
            <Cookie className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">{t("cookiePolicy.title")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("cookiePolicy.lastUpdated")}
            {new Date().toLocaleDateString(
              i18n.language === "zh" ? "zh-CN" : "en-US"
            )}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-3">
              <Info className="h-6 w-6 text-blue-500" />
              {t("cookiePolicy.whatAreCookies.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("cookiePolicy.whatAreCookies.description")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-3">
              <Settings className="h-6 w-6 text-purple-500" />
              {t("cookiePolicy.howWeUseCookies.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("cookiePolicy.howWeUseCookies.description")}
            </p>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl">✓</span>
                <div>
                  <strong>
                    {t("cookiePolicy.howWeUseCookies.essential.title")}
                  </strong>
                  : {t("cookiePolicy.howWeUseCookies.essential.description")}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl">✓</span>
                <div>
                  <strong>
                    {t("cookiePolicy.howWeUseCookies.functionality.title")}
                  </strong>
                  :{" "}
                  {t("cookiePolicy.howWeUseCookies.functionality.description")}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">✗</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<strong>${t(
                      "cookiePolicy.howWeUseCookies.advertising.title"
                    )}</strong>: ${t(
                      "cookiePolicy.howWeUseCookies.advertising.description"
                    )}`,
                  }}
                />
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">✗</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<strong>${t(
                      "cookiePolicy.howWeUseCookies.thirdParty.title"
                    )}</strong>: ${t(
                      "cookiePolicy.howWeUseCookies.thirdParty.description"
                    )}`,
                  }}
                />
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-3">
              <Table className="h-6 w-6 text-green-500" />
              {t("cookiePolicy.typesOfCookies.title")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 rounded-lg">
                  <tr>
                    <th className="p-3 text-left font-semibold">
                      {t("cookiePolicy.typesOfCookies.table.cookieName")}
                    </th>
                    <th className="p-3 text-left font-semibold">
                      {t("cookiePolicy.typesOfCookies.table.purpose")}
                    </th>
                    <th className="p-3 text-left font-semibold">
                      {t("cookiePolicy.typesOfCookies.table.duration")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-mono text-xs">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.cookieConsent.name"
                      )}
                    </td>
                    <td className="p-3">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.cookieConsent.purpose"
                      )}
                    </td>
                    <td className="p-3">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.cookieConsent.duration"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.theme.name"
                      )}
                    </td>
                    <td className="p-3">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.theme.purpose"
                      )}
                    </td>
                    <td className="p-3">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.theme.duration"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.recentTools.name"
                      )}
                    </td>
                    <td className="p-3">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.recentTools.purpose"
                      )}
                    </td>
                    <td className="p-3">
                      {t(
                        "cookiePolicy.typesOfCookies.table.cookies.recentTools.duration"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-3">
              <Sliders className="h-6 w-6 text-orange-500" />
              {t("cookiePolicy.managingCookies.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {t("cookiePolicy.managingCookies.description")}
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>
                <strong>
                  {t("cookiePolicy.managingCookies.browserSettings.title")}
                </strong>
                :{" "}
                {t("cookiePolicy.managingCookies.browserSettings.description")}
              </li>
              <li>
                <strong>
                  {t("cookiePolicy.managingCookies.optOut.title")}
                </strong>
                : {t("cookiePolicy.managingCookies.optOut.description")}
              </li>
              <li>
                <strong>
                  {t("cookiePolicy.managingCookies.impact.title")}
                </strong>
                : {t("cookiePolicy.managingCookies.impact.description")}
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-3">
              <Shield className="h-6 w-6 text-indigo-500" />
              {t("cookiePolicy.privacyPriority.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("cookiePolicy.privacyPriority.description")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-3">
              <Mail className="h-6 w-6 text-pink-500" />
              {t("cookiePolicy.contact.title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("cookiePolicy.contact.description")}{" "}
              <strong className="text-primary">contact@haoin.tech</strong>
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 shadow-lg">
            <p className="text-center text-foreground/70">
              🍪 <strong>{t("cookiePolicy.footer.title")}</strong>{" "}
              {t("cookiePolicy.footer.description")}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
