import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Privacy Policy</h2>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString("zh-CN")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Introduction
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Welcome to haoin Tools! We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you about how we look after your personal data when you visit our
              website and tell you about your privacy rights.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              <strong>Contact:</strong> contact@haoin.tech
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Data We Collect
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We collect minimal data to provide you with the best service:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>
                Usage Data: Information about how you use our tools
              </li>
              <li>
                Technical Data: IP address, browser type, and device information
              </li>
              <li>
                No Personal Files: All file processing happens locally in your browser
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              How We Protect Your Data
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Your privacy and security are our top priorities:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>
                Client-Side Processing: All tools run in your browser
              </li>
              <li>
                No Data Storage: We don't store your files or personal data
              </li>
              <li>
                No Tracking: We don't use invasive tracking technologies
              </li>
              <li>
                HTTPS Secure: All connections are encrypted
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Third-Party Advertising
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We may display third-party advertisements to support our free services:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>
                Ad networks: We work with third-party advertising partners who may collect anonymous usage data
              </li>
              <li>
                Cookies: Advertisers may use cookies to show relevant ads (you can opt out via browser settings)
              </li>
              <li>
                Data Sharing: We do not share your personal information with advertisers
              </li>
              <li>
                Privacy Controls: You can use ad blockers or adjust privacy settings in your browser
              </li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Third-party advertisers have their own privacy policies. We recommend
              reviewing their policies for detailed information.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Cookies
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              We use essential cookies only to ensure the website functions
              properly. We do not use advertising or tracking cookies. You can
              control cookies through your browser settings.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              International Users & Data Rights
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              <strong>For Users in the European Union (GDPR):</strong>
            </p>
            <ul className="space-y-2 text-foreground/80 mb-4">
              <li>Right to access your personal data</li>
              <li>Right to rectification or deletion</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mb-4">
              <strong>For Users in California (CCPA):</strong>
            </p>
            <ul className="space-y-2 text-foreground/80 mb-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of sale of personal information (we do not sell data)</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              <strong>For Users in China:</strong> We comply with Chinese data
              protection laws including the Personal Information Protection Law (PIPL).
              Your data is processed locally in your browser and not transferred
              outside of China without consent.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Data Retention
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Since all data processing happens locally in your browser, we do not
              retain your personal data on our servers. Browser cookies and local
              storage are under your control and can be cleared at any time through
              your browser settings.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Contact Us
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise
              your data rights, please contact us through our social media channels
              or email us at: <strong className="text-primary">contact@haoin.tech</strong>
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              For privacy-related complaints or concerns, we will respond within
              30 days as required by applicable data protection laws.
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
            <p className="text-center text-foreground/70">
              Your trust is important to us. We're committed to keeping your data safe and private.
              We're committed to keeping your data safe and private.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
