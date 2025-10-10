import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Cookie Policy</h2>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-lg mb-4">
            <Cookie className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">Cookie Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString("zh-CN")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🍪 What Are Cookies?
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Cookies are small text files that are stored on your device when you visit
              a website. They help the website remember your preferences and improve your
              browsing experience.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📝 How We Use Cookies
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              At Haoin Tools, we use cookies minimally and responsibly:
            </p>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl">✓</span>
                <div>
                  <strong>Essential Cookies</strong>: These are necessary for the website
                  to function properly, such as remembering your theme preference (dark/light mode)
                  and language settings.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl">✓</span>
                <div>
                  <strong>Functionality Cookies</strong>: These remember your recently used
                  tools to provide quick access on your next visit.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">✗</span>
                <div>
                  <strong>Advertising Cookies</strong>: We <strong>DO NOT</strong> use
                  advertising or tracking cookies.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">✗</span>
                <div>
                  <strong>Third-Party Tracking</strong>: We <strong>DO NOT</strong> share
                  your data with third-party advertisers.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🎯 Types of Cookies We Use
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 rounded-lg">
                  <tr>
                    <th className="p-3 text-left font-semibold">Cookie Name</th>
                    <th className="p-3 text-left font-semibold">Purpose</th>
                    <th className="p-3 text-left font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-mono text-xs">cookieConsent</td>
                    <td className="p-3">Remember your cookie preference</td>
                    <td className="p-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">theme</td>
                    <td className="p-3">Remember dark/light mode preference</td>
                    <td className="p-3">Permanent</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">recentTools</td>
                    <td className="p-3">Store your recently used tools</td>
                    <td className="p-3">30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🔧 Managing Cookies
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              You have full control over cookies:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>
                <strong>Browser Settings</strong>: You can block or delete cookies
                through your browser settings at any time.
              </li>
              <li>
                <strong>Opt-Out</strong>: You can decline cookies when you first visit
                our website using the cookie consent banner.
              </li>
              <li>
                <strong>Impact</strong>: Blocking cookies may affect some website
                features, but all tools will continue to work.
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🔒 Your Privacy is Our Priority
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Unlike many websites, we don't use cookies to track your behavior,
              build user profiles, or serve targeted ads. Our cookies are strictly
              for improving your user experience on our site. All data processing
              happens locally in your browser, and we never send your files or
              personal data to our servers.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📞 Contact Us
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about our use of cookies, please contact us at:{" "}
              <strong className="text-primary">contact@haoin.tech</strong>
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 shadow-lg">
            <p className="text-center text-foreground/70">
              🍪 <strong>Simple & Transparent:</strong> We believe in being upfront
              about how we use cookies. No hidden trackers, no surprises.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
