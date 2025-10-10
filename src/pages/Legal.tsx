import { SidebarTrigger } from "@/components/ui/sidebar";
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

const Legal = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Legal & Copyright</h2>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            <Scale className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">Legal & Copyright</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated:{" "}
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
              📋 Copyright Notice
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              All tools and services provided on this website (Haoin Tools) are
              independently developed. We respect and protect intellectual
              property rights, and all content usage complies with applicable
              laws and regulations.
            </p>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              Original Content Statement
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>
                All page designs, UI layouts, and interaction logic are original
              </li>
              <li>
                Code implementation based on React, TypeScript, and other
                open-source technologies
              </li>
              <li>
                User interface built with shadcn/ui open-source component
                library
              </li>
              <li>
                Tool functionality implemented based on public algorithms and
                technical standards
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              Technical Implementation
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              The core algorithms and functionality of this website's tools are
              based on the following public technologies and standards:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Base64 encoding/decoding: Complies with RFC 4648 standard</li>
              <li>JSON formatting: Implemented based on JSON specifications</li>
              <li>Hash generation: Uses Web Crypto API</li>
              <li>
                Other tools: All based on public technical standards and
                algorithms
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <Code className="h-6 w-6" />
              💻 Technology Stack
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              This website is built on the following open-source technologies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>
                <strong>Frontend Framework:</strong> React 18 + TypeScript
              </li>
              <li>
                <strong>Routing:</strong> React Router v6
              </li>
              <li>
                <strong>UI Components:</strong> shadcn/ui (Radix UI + Tailwind
                CSS)
              </li>
              <li>
                <strong>Styling:</strong> Tailwind CSS
              </li>
              <li>
                <strong>Build Tool:</strong> Vite
              </li>
              <li>
                <strong>State Management:</strong> React Context API
              </li>
            </ul>

            <p className="text-foreground/80 leading-relaxed mt-4">
              All open-source libraries used comply with their respective
              open-source licenses (MIT, Apache 2.0, etc.). We express our
              sincere gratitude to these excellent open-source projects.
            </p>
          </div>

          {/* Usage Terms & Disclaimer */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <FileText className="h-6 w-6" />
              📜 Usage Terms & Disclaimer
            </h2>

            <h3 className="font-semibold text-lg mt-4 mb-3 text-foreground">
              Usage License
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              All tools provided on this website are free for personal and
              commercial use. We do not collect, store, or transmit any data you
              enter in the tools; all processing is completed locally in your
              browser.
            </p>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              Disclaimer
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>
                The tools on this website are provided "as is" without any
                warranty of accuracy
              </li>
              <li>
                Users assume all risks arising from the use of these tools
              </li>
              <li>
                Financial calculation tools are for reference only and do not
                constitute investment advice
              </li>
              <li>
                This website is not responsible for any losses caused by using
                or inability to use the tools
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              Privacy Protection
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We value your privacy. All tools on this website run locally in
              your browser and do not send your data to any server (except tools
              requiring real-time data, such as currency conversion).
            </p>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              Contact Us
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about copyright, technical
              implementation, or other aspects of this website, please contact
              us at <strong>contact@haoin.tech</strong>
            </p>
          </div>

          {/* Third-party Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <Users className="h-6 w-6" />
              🤝 Third-Party Content
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Some features on this website may use third-party APIs or data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>
                <strong>Currency Rates:</strong> Uses third-party exchange rate
                APIs to obtain real-time data
              </li>
              <li>
                <strong>Icons:</strong> Uses Lucide Icons open-source icon
                library (MIT License)
              </li>
              <li>
                <strong>Fonts:</strong> Uses system default fonts or Google
                Fonts
              </li>
              <li>
                <strong>Advertising:</strong> May display third-party ads
                (Google AdSense) to support free services
              </li>
            </ul>

            <p className="text-foreground/80 leading-relaxed mt-4">
              We are committed to ensuring the lawful use of all third-party
              content. If you discover any infringing content, please contact us
              immediately at <strong>contact@haoin.tech</strong>, and we will
              address it within 24 hours.
            </p>
          </div>

          {/* DMCA Notice */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              ⚠️ DMCA Copyright Infringement Notice
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Haoin Tools respects intellectual property and complies with the
              provisions of the US Digital Millennium Copyright Act (DMCA). If
              you believe that content on this website infringes your copyright,
              please notify us following the procedure below.
            </p>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              DMCA Takedown Notice Requirements
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Your notice must include the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>
                Your physical or electronic signature (as the copyright owner or
                their authorized representative)
              </li>
              <li>
                Accurate description and location of the allegedly infringing
                material
              </li>
              <li>Your contact information (address, phone number, email)</li>
              <li>
                Statement that you believe in good faith that the use is not
                authorized by the copyright owner
              </li>
              <li>
                Statement that the information in the notice is accurate, and
                you are the copyright owner or their authorized representative
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-6 mb-3 text-foreground">
              DMCA Designated Agent
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
              <p className="text-foreground">
                <strong>Copyright Agent - Haoin Tools</strong>
              </p>
              <p className="text-foreground mt-2">
                Email: <strong>contact@haoin.tech</strong>
              </p>
              <p className="text-foreground mt-1">
                Subject Line: "DMCA Takedown Notice"
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Please note: According to DMCA regulations, knowingly providing
              false infringement claims may result in legal liability. We will
              handle it promptly upon receiving a valid notice.
            </p>
          </div>

          {/* User Content Responsibility */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
              <Users className="h-6 w-6" />
              👤 User Content Responsibility
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              All tools on this website only provide processing functionality
              and do not store user data. Users are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>
                Ensuring that uploaded or processed content does not infringe on
                others' intellectual property rights
              </li>
              <li>
                Ensuring content complies with applicable laws and regulations
              </li>
              <li>
                Ensuring content does not contain illegal, harmful, threatening,
                defamatory, or obscene materials
              </li>
              <li>
                Assuming all legal liabilities arising from using these tools to
                process illegal content
              </li>
            </ul>

            <p className="text-foreground/80 leading-relaxed mt-4">
              <strong>Important Notice:</strong> Since all processing is
              completed locally in the user's browser, we cannot monitor or
              control the content processed by users. Users must ensure lawful
              and compliant use on their own.
            </p>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground pt-4 pb-8">
            <p>© 2025 Haoin Tools. All Rights Reserved.</p>
            <p className="mt-2">Haoin Tech Co., Ltd.</p>
            <p className="mt-2 text-xs">
              This website complies with applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Legal;
