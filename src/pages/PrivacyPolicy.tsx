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
              🌟 Introduction
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Welcome to Haoin Tools! We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you about how we look after your personal data when you visit our
              website and tell you about your privacy rights.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📊 Data We Collect
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We collect minimal data to provide you with the best service:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>
                ✅ <strong>Usage Data</strong>: Information about how you use
                our tools
              </li>
              <li>
                ✅ <strong>Technical Data</strong>: IP address, browser type,
                and device information
              </li>
              <li>
                ✅ <strong>No Personal Files</strong>: All file processing
                happens locally in your browser
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🔒 How We Protect Your Data
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Your privacy and security are our top priorities:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>
                🛡️ <strong>Client-Side Processing</strong>: All tools run in
                your browser
              </li>
              <li>
                🔐 <strong>No Data Storage</strong>: We don't store your files
                or personal data
              </li>
              <li>
                🚫 <strong>No Tracking</strong>: We don't use invasive tracking
                technologies
              </li>
              <li>
                ✨ <strong>HTTPS Secure</strong>: All connections are encrypted
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🍪 Cookies
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              We use essential cookies only to ensure the website functions
              properly. We do not use advertising or tracking cookies. You can
              control cookies through your browser settings.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📧 Contact Us
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us through our social media channels or email us at:{" "}
              <strong className="text-primary">contact@haoin.tech</strong>
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
            <p className="text-center text-foreground/70">
              💖 <strong>Privacy First:</strong> Your trust is important to us.
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
