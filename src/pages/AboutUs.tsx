import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { Heart, Zap, Users, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">{t("aboutUs.title")}</h2>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">{t("aboutUs.pageTitle")}</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            {t("aboutUs.subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              {t("aboutUs.ourStory.title")}
            </h2>
            <p
              className="text-foreground/80 leading-relaxed text-lg mb-4"
              dangerouslySetInnerHTML={{
                __html: t("aboutUs.ourStory.paragraph1"),
              }}
            />
            <p
              className="text-foreground/80 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{
                __html: t("aboutUs.ourStory.paragraph2"),
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl inline-block mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">
                {t("aboutUs.ourMission.title")}
              </h3>
              <p
                className="text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: t("aboutUs.ourMission.description"),
                }}
              />
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl inline-block mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 gradient-text-accent">
                {t("aboutUs.ourVision.title")}
              </h3>
              <p
                className="text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: t("aboutUs.ourVision.description"),
                }}
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold gradient-text">
                {t("aboutUs.whyChooseUs.title")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎨</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    {t("aboutUs.whyChooseUs.features.beautifulDesign.title")}
                  </h4>
                  <p className="text-foreground/70">
                    {t(
                      "aboutUs.whyChooseUs.features.beautifulDesign.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    {t("aboutUs.whyChooseUs.features.lightningFast.title")}
                  </h4>
                  <p className="text-foreground/70">
                    {t(
                      "aboutUs.whyChooseUs.features.lightningFast.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    {t("aboutUs.whyChooseUs.features.privacyFirst.title")}
                  </h4>
                  <p className="text-foreground/70">
                    {t("aboutUs.whyChooseUs.features.privacyFirst.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🆓</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    {t("aboutUs.whyChooseUs.features.alwaysFree.title")}
                  </h4>
                  <p className="text-foreground/70">
                    {t("aboutUs.whyChooseUs.features.alwaysFree.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    {t("aboutUs.whyChooseUs.features.mobileFriendly.title")}
                  </h4>
                  <p className="text-foreground/70">
                    {t(
                      "aboutUs.whyChooseUs.features.mobileFriendly.description"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🌍</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    {t("aboutUs.whyChooseUs.features.noRegistration.title")}
                  </h4>
                  <p className="text-foreground/70">
                    {t(
                      "aboutUs.whyChooseUs.features.noRegistration.description"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              {t("aboutUs.whatWeOffer.title")}
            </h2>
            <p
              className="text-foreground/80 leading-relaxed text-lg mb-4"
              dangerouslySetInnerHTML={{
                __html: t("aboutUs.whatWeOffer.description"),
              }}
            />
            <div className="grid md:grid-cols-3 gap-3 text-foreground/80">
              <div>{t("aboutUs.whatWeOffer.categories.textProcessing")}</div>
              <div>{t("aboutUs.whatWeOffer.categories.converters")}</div>
              <div>{t("aboutUs.whatWeOffer.categories.generators")}</div>
              <div>{t("aboutUs.whatWeOffer.categories.calculators")}</div>
              <div>{t("aboutUs.whatWeOffer.categories.imageStudio")}</div>
              <div>{t("aboutUs.whatWeOffer.categories.devTools")}</div>
              <div>{t("aboutUs.whatWeOffer.categories.finance")}</div>
              <div>{t("aboutUs.whatWeOffer.categories.utilities")}</div>
              <div>{t("aboutUs.whatWeOffer.categories.andMore")}</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 shadow-lg text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t("aboutUs.joinCommunity.title")}
            </h2>
            <p className="text-lg mb-6 text-white/90">
              {t("aboutUs.joinCommunity.description")}
            </p>
            <p className="text-sm text-white/80">
              {t("aboutUs.joinCommunity.feedback")}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
