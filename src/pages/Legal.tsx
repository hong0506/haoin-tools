import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Shield, Code, Scale } from "lucide-react";

const Legal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Legal & Copyright</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-6">
          {/* Copyright Notice */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Copyright Notice</CardTitle>
              </div>
              <CardDescription>
                Intellectual property information about this website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  All tools and services provided on this website (Haoin Tools) are independently developed.
                  We respect and protect intellectual property rights, and all content usage complies with applicable laws and regulations.
                </p>
                
                <h3 className="font-semibold mt-4 mb-2">Original Content Statement</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>All page designs, UI layouts, and interaction logic are original</li>
                  <li>Code implementation based on React, TypeScript, and other open-source technologies</li>
                  <li>User interface built with shadcn/ui open-source component library</li>
                  <li>Tool functionality implemented based on public algorithms and technical standards</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">Technical Implementation</h3>
                <p>
                  The core algorithms and functionality of this website's tools are based on the following public technologies and standards:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Base64 encoding/decoding: Complies with RFC 4648 standard</li>
                  <li>JSON formatting: Implemented based on JSON specifications</li>
                  <li>Hash generation: Uses Web Crypto API</li>
                  <li>Other tools: All based on public technical standards and algorithms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>Technology Stack</CardTitle>
              </div>
              <CardDescription>
                Open-source technologies and frameworks used on this website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>This website is built on the following open-source technologies:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Frontend Framework:</strong> React 18 + TypeScript</li>
                  <li><strong>Routing:</strong> React Router v6</li>
                  <li><strong>UI Components:</strong> shadcn/ui (Radix UI + Tailwind CSS)</li>
                  <li><strong>Styling:</strong> Tailwind CSS</li>
                  <li><strong>Build Tool:</strong> Vite</li>
                  <li><strong>State Management:</strong> React Context API</li>
                </ul>

                <p className="mt-4">
                  All open-source libraries used comply with their respective open-source licenses (MIT, Apache 2.0, etc.).
                  We express our sincere gratitude to these excellent open-source projects.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fair Use & Disclaimer */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <CardTitle>Usage Terms & Disclaimer</CardTitle>
              </div>
              <CardDescription>
                Terms of use for the tools on this website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h3 className="font-semibold mb-2">Usage License</h3>
                <p>
                  All tools provided on this website are free for personal and commercial use. We do not collect,
                  store, or transmit any data you enter in the tools; all processing is completed locally in your browser.
                </p>

                <h3 className="font-semibold mt-4 mb-2">Disclaimer</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>The tools on this website are provided "as is" without any warranty of accuracy</li>
                  <li>Users assume all risks arising from the use of these tools</li>
                  <li>Financial calculation tools are for reference only and do not constitute investment advice</li>
                  <li>This website is not responsible for any losses caused by using or inability to use the tools</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">Privacy Protection</h3>
                <p>
                  We value your privacy. All tools on this website run locally in your browser
                  and do not send your data to any server (except tools requiring real-time data, such as currency conversion).
                </p>

                <h3 className="font-semibold mt-4 mb-2">Contact Us</h3>
                <p>
                  If you have any questions about copyright, technical implementation, or other aspects of this website,
                  please contact us through the "About Us" page.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third-party Content */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Content</CardTitle>
              <CardDescription>
                Third-party resources used on this website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Some features on this website may use third-party APIs or data:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Currency Rates:</strong> Uses third-party exchange rate APIs to obtain real-time data</li>
                  <li><strong>Icons:</strong> Uses Lucide Icons open-source icon library (MIT License)</li>
                  <li><strong>Fonts:</strong> Uses system default fonts or Google Fonts</li>
                  <li><strong>Advertising:</strong> May display third-party ads to support free services</li>
                </ul>

                <p className="mt-4">
                  We are committed to ensuring the lawful use of all third-party content. If you discover any infringing content,
                  please contact us immediately, and we will address it within 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* DMCA Notice */}
          <Card>
            <CardHeader>
              <CardTitle>DMCA Copyright Infringement Notice</CardTitle>
              <CardDescription>
                Copyright protection and infringement complaint procedures (applicable to the US Digital Millennium Copyright Act)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Haoin Tools respects intellectual property and complies with the provisions of the US Digital Millennium Copyright Act (DMCA).
                  If you believe that content on this website infringes your copyright, please notify us following the procedure below.
                </p>

                <h3 className="font-semibold mt-4 mb-2">DMCA Takedown Notice Requirements</h3>
                <p>Your notice must include the following information:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Your physical or electronic signature (as the copyright owner or their authorized representative)</li>
                  <li>Accurate description and location of the allegedly infringing material</li>
                  <li>Your contact information (address, phone number, email)</li>
                  <li>Statement that you believe in good faith that the use is not authorized by the copyright owner</li>
                  <li>Statement that the information in the notice is accurate, and you are the copyright owner or their authorized representative</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">DMCA Designated Agent</h3>
                <p className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <strong>Copyright Agent - Haoin Tools</strong><br />
                  Email: <strong>contact@haoin.tech</strong><br />
                  Subject Line: "DMCA Takedown Notice"
                </p>

                <p className="mt-4 text-sm text-muted-foreground">
                  Please note: According to DMCA regulations, knowingly providing false infringement claims may result in legal liability.
                  We will handle it promptly upon receiving a valid notice.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Generated Content */}
          <Card>
            <CardHeader>
              <CardTitle>User Content Responsibility</CardTitle>
              <CardDescription>
                User responsibilities when using the tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  All tools on this website only provide processing functionality and do not store user data. Users are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ensuring that uploaded or processed content does not infringe on others' intellectual property rights</li>
                  <li>Ensuring content complies with applicable laws and regulations</li>
                  <li>Ensuring content does not contain illegal, harmful, threatening, defamatory, or obscene materials</li>
                  <li>Assuming all legal liabilities arising from using these tools to process illegal content</li>
                </ul>

                <p className="mt-4">
                  <strong>Important Notice:</strong> Since all processing is completed locally in the user's browser,
                  we cannot monitor or control the content processed by users. Users must ensure lawful and compliant use on their own.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>Last Updated: October 2025</p>
            <p className="mt-2">
              Haoin Tools © 2025 All Rights Reserved.
            </p>
            <p className="mt-2 text-xs">
              This website complies with applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
