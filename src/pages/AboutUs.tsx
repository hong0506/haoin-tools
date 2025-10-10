import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { Heart, Zap, Users, Target } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">About Us</h2>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">About Haoin Tools</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Your trusted companion for productivity and creativity 🚀
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              ✨ Our Story
            </h2>
            <p className="text-foreground/80 leading-relaxed text-lg mb-4">
              Haoin Tools was born from a simple idea:{" "}
              <strong className="text-primary">
                everyone deserves access to powerful, easy-to-use tools
              </strong>{" "}
              without barriers. We noticed that many online tools were either
              too complex, required registration, or charged fees for basic
              features.
            </p>
            <p className="text-foreground/80 leading-relaxed text-lg">
              So we built Haoin Tools - a completely{" "}
              <strong className="text-primary">
                free, no-registration-required
              </strong>{" "}
              collection of tools designed to make your life easier. Whether
              you're a developer, designer, student, or just someone who needs
              to get things done, we've got you covered!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl inline-block mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">
                Our Mission
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                To provide{" "}
                <strong>free, accessible, and privacy-first tools</strong> that
                empower people to work smarter and create better. All tools remain
                free forever, with optional advertising support to maintain our services.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl inline-block mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 gradient-text-accent">
                Our Vision
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                To become the <strong>go-to destination</strong> for anyone
                looking for reliable, fast, and beautiful online tools. We're
                constantly adding new tools based on your needs!
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold gradient-text">
                Why Choose Us?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎨</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Beautiful Design</h4>
                  <p className="text-foreground/70">
                    Modern, intuitive interface that's a joy to use
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Lightning Fast</h4>
                  <p className="text-foreground/70">
                    Client-side processing for instant results
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Privacy First</h4>
                  <p className="text-foreground/70">
                    Your data never leaves your browser
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🆓</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Always Free</h4>
                  <p className="text-foreground/70">
                    No hidden costs, no premium tiers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Mobile Friendly</h4>
                  <p className="text-foreground/70">
                    Works perfectly on all devices
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🌍</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">No Registration</h4>
                  <p className="text-foreground/70">
                    Start using immediately, no sign-up needed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              🚀 What We Offer
            </h2>
            <p className="text-foreground/80 leading-relaxed text-lg mb-4">
              We currently offer{" "}
              <strong className="text-primary">30+ powerful tools</strong>{" "}
              across multiple categories:
            </p>
            <div className="grid md:grid-cols-3 gap-3 text-foreground/80">
              <div>💻 Developer Tools</div>
              <div>🎨 Image Tools</div>
              <div>📝 Text Tools</div>
              <div>🔄 Converters</div>
              <div>🎲 Generators</div>
              <div>🧮 Calculators</div>
              <div>💰 Finance Tools</div>
              <div>🛠️ Utilities</div>
              <div>...and more!</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 shadow-lg text-white text-center">
            <h2 className="text-3xl font-bold mb-4">💖 Join Our Community</h2>
            <p className="text-lg mb-6 text-white/90">
              Follow us on social media to stay updated with new tools,
              features, and tips!
            </p>
            <p className="text-sm text-white/80">
              We love hearing from our users. Have a feature request or
              feedback? Reach out to us anytime!
            </p>
          </div>

          {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg text-center">
            <p className="text-lg text-foreground/70 space-y-2">
              <strong className="text-primary text-xl block">
                Made with ❤️ by Haoin Tech
              </strong>
              <span className="text-sm block">
                杭州皓萤科技有限公司 (Haoin Tech Co., Ltd.)
              </span>
              <span className="text-sm block">
                Empowering creativity and productivity, one tool at a time.
              </span>
              <span className="text-xs block mt-4 text-muted-foreground">
                📧 contact@haoin.tech | 🌐 haointools.com
              </span>
            </p>
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
