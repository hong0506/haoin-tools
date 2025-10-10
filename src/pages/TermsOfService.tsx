import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Terms of Service</h2>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
            <FileText className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">Terms of Service</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString("zh-CN")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📜 Agreement to Terms
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              By accessing and using Haoin Tools, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by these terms, please do not use this service.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              ✨ Use of Service
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Haoin Tools provides free online tools for everyone:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>
                🎯 <strong>Free Access</strong>: All tools are free to use
              </li>
              <li>
                🚀 <strong>No Registration</strong>: No account required
              </li>
              <li>
                💻 <strong>Personal & Commercial Use</strong>: Use for any legal
                purpose
              </li>
              <li>
                ⚡ <strong>Unlimited Usage</strong>: No usage limits or
                restrictions
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              ⚠️ Prohibited Activities
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              You agree NOT to:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>❌ Use the service for any illegal purposes</li>
              <li>❌ Attempt to harm or disrupt the service</li>
              <li>❌ Reverse engineer or copy our tools</li>
              <li>❌ Use automated systems to abuse the service</li>
              <li>❌ Upload, transmit or distribute any content that infringes intellectual property rights</li>
              <li>❌ Violate any applicable laws or regulations in your jurisdiction</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🛡️ Disclaimer & Limitation of Liability
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              The service is provided "as is" and "as available" without any
              warranties. We strive for accuracy and reliability, but we cannot
              guarantee that the tools will always be error-free or
              uninterrupted.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              <strong>Important Disclaimers:</strong>
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>• Financial calculators are for informational purposes only and do not constitute financial advice</li>
              <li>• Health-related tools (BMI calculator, etc.) are not medical advice - consult professionals</li>
              <li>• We are not liable for any losses or damages resulting from tool use or errors</li>
              <li>• Maximum liability is limited to the amount you paid for the service (which is zero for free tools)</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📝 Intellectual Property
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              All content, features, and functionality on Haoin Tools are owned
              by us and are protected by international copyright, trademark, and
              other intellectual property laws.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📺 Advertising
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              To maintain our free services, we may display third-party advertisements:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>• Ads are provided by third-party advertising networks</li>
              <li>• We do not endorse or take responsibility for advertised products/services</li>
              <li>• Ad content is subject to advertisers' terms and privacy policies</li>
              <li>• We are not liable for any transactions with advertisers</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              ⚖️ Governing Law & Dispute Resolution
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              These Terms are governed by the laws of the People's Republic of China.
              For international users, local consumer protection laws may also apply.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Any disputes shall be resolved through friendly negotiation first.
              If negotiation fails, disputes shall be submitted to the courts with
              jurisdiction in Hangzhou, Zhejiang Province, China.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              🔄 Changes to Terms
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes by updating the "Last
              updated" date at the top of this page. Continued use of the service
              after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              📧 Contact
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Questions about our Terms of Service? Contact us at:{" "}
              <strong className="text-primary">contact@haoin.tech</strong>
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg">
            <p className="text-center text-foreground/70">
              ⚖️ <strong>Fair Use:</strong> We believe in providing free,
              accessible tools for everyone while maintaining a safe and
              reliable service.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
