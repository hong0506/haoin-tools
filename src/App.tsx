import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RecentToolsProvider } from "@/contexts/RecentToolsContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { CookieConsent } from "@/components/CookieConsent";
import { RouteLoader } from "@/components/RouteLoader";
import { BaiduPush } from "@/components/BaiduPush";
import { BaiduAnalytics } from "@/components/BaiduAnalytics";
import "@/i18n/config"; // Initialize i18n

// 核心页面直接导入（用户首次访问）
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";

// 懒加载所有工具页面（按需加载，减少初始包大小）
const CaseConverter = lazy(() => import("./pages/tools/CaseConverter"));
const WordCounter = lazy(() => import("./pages/tools/WordCounter"));
const PasswordGenerator = lazy(() => import("./pages/tools/PasswordGenerator"));
const Base64Tool = lazy(() => import("./pages/tools/Base64Tool"));
const JsonFormatter = lazy(() => import("./pages/tools/JsonFormatter"));
const UuidGenerator = lazy(() => import("./pages/tools/UuidGenerator"));
const ColorPicker = lazy(() => import("./pages/tools/ColorPicker"));
const QrGenerator = lazy(() => import("./pages/tools/QrGenerator"));
const UrlEncoder = lazy(() => import("./pages/tools/UrlEncoder"));
const MarkdownPreview = lazy(() => import("./pages/tools/MarkdownPreview"));
const HashGenerator = lazy(() => import("./pages/tools/HashGenerator"));
const TimestampConverter = lazy(
  () => import("./pages/tools/TimestampConverter")
);
const RegexTester = lazy(() => import("./pages/tools/RegexTester"));
const LoremIpsum = lazy(() => import("./pages/tools/LoremIpsum"));
const PercentageCalculator = lazy(
  () => import("./pages/tools/PercentageCalculator")
);
const BmiCalculator = lazy(() => import("./pages/tools/BmiCalculator"));
const LoanCalculator = lazy(() => import("./pages/tools/LoanCalculator"));
const InterestCalculator = lazy(
  () => import("./pages/tools/InterestCalculator")
);
const InvestmentCalculator = lazy(
  () => import("./pages/tools/InvestmentCalculator")
);
const CurrencyConverter = lazy(() => import("./pages/tools/CurrencyConverter"));
const CreditCardCalculator = lazy(
  () => import("./pages/tools/CreditCardCalculator")
);
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const DateCalculator = lazy(() => import("./pages/tools/DateCalculator"));
const RandomPicker = lazy(() => import("./pages/tools/RandomPicker"));
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const ImageResizer = lazy(() => import("./pages/tools/ImageResizer"));
const TextDiff = lazy(() => import("./pages/tools/TextDiff"));
const TextSorter = lazy(() => import("./pages/tools/TextSorter"));
const HtmlToText = lazy(() => import("./pages/tools/HtmlToText"));
const CsvToJson = lazy(() => import("./pages/tools/CsvToJson"));
const TextReplacer = lazy(() => import("./pages/tools/TextReplacer"));
const DuplicateRemover = lazy(() => import("./pages/tools/DuplicateRemover"));
const JsonToCsv = lazy(() => import("./pages/tools/JsonToCsv"));
const XmlToJson = lazy(() => import("./pages/tools/XmlToJson"));
const MarkdownToHtml = lazy(() => import("./pages/tools/MarkdownToHtml"));
const DiscountCalculator = lazy(
  () => import("./pages/tools/DiscountCalculator")
);
const PasswordStrengthChecker = lazy(
  () => import("./pages/tools/PasswordStrengthChecker")
);
const EmailValidator = lazy(() => import("./pages/tools/EmailValidator"));
const StopwatchTimer = lazy(() => import("./pages/tools/StopwatchTimer"));
const JwtDecoder = lazy(() => import("./pages/tools/JwtDecoder"));
const SqlFormatter = lazy(() => import("./pages/tools/SqlFormatter"));
const CodeMinifier = lazy(() => import("./pages/tools/CodeMinifier"));
const HttpStatusCodes = lazy(() => import("./pages/tools/HttpStatusCodes"));
const ApiTester = lazy(() => import("./pages/tools/ApiTester"));
const WhitespaceRemover = lazy(() => import("./pages/tools/WhitespaceRemover"));
const PomodoroTimer = lazy(() => import("./pages/tools/PomodoroTimer"));
const IpLookup = lazy(() => import("./pages/tools/IpLookup"));
const BarcodeGenerator = lazy(() => import("./pages/tools/BarcodeGenerator"));
const ColorGradientGenerator = lazy(
  () => import("./pages/tools/ColorGradientGenerator")
);
// const PromptGenerator = lazy(() => import("./pages/tools/PromptGenerator"));

// 法律页面懒加载
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Smart scroll restoration - save position on navigation, restore on back
const SmartScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Tool pages should always start from top, only save/restore position for home and category pages
    const isToolPage = pathname.startsWith("/tools/");

    if (isToolPage) {
      // Tool pages: always scroll to top
      window.scrollTo(0, 0);

      // Don't save tool page positions
      return;
    }

    // For home and category pages: restore saved position
    const savedPosition = sessionStorage.getItem(`scroll_${pathname}`);
    if (savedPosition) {
      const targetPosition = parseInt(savedPosition, 10);

      // Wait for all images and lazy-loaded content to render
      // Use multiple attempts to handle dynamic content loading
      let attempts = 0;
      const maxAttempts = 20; // Try for up to 2 seconds

      const restoreScroll = () => {
        attempts++;

        // Check if we can scroll to the target position
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (maxScroll >= targetPosition || attempts >= maxAttempts) {
          // Content is ready or we've waited long enough
          window.scrollTo({
            top: targetPosition,
            behavior: "instant",
          });
        } else {
          // Content still loading, try again
          setTimeout(restoreScroll, 100);
        }
      };

      // Start restoration after initial render
      setTimeout(restoreScroll, 50);

      return () => {
        // Save position when leaving home/category pages
        sessionStorage.setItem(`scroll_${pathname}`, window.scrollY.toString());
      };
    } else {
      // First time visiting: scroll to top
      window.scrollTo(0, 0);

      // Still save position when leaving
      return () => {
        sessionStorage.setItem(`scroll_${pathname}`, window.scrollY.toString());
      };
    }
  }, [pathname]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <SmartScrollRestoration />
          <BaiduPush />
          <BaiduAnalytics />
          <RecentToolsProvider>
            <FavoritesProvider>
              <SearchProvider>
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <main className="flex-1">
                      <Suspense fallback={<RouteLoader />}>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route
                            path="/category/:categoryId"
                            element={<CategoryPage />}
                          />
                          <Route
                            path="/tools/case-converter"
                            element={<CaseConverter />}
                          />
                          <Route
                            path="/tools/word-counter"
                            element={<WordCounter />}
                          />
                          <Route
                            path="/tools/password-generator"
                            element={<PasswordGenerator />}
                          />
                          <Route
                            path="/tools/base64"
                            element={<Base64Tool />}
                          />
                          <Route
                            path="/tools/json-formatter"
                            element={<JsonFormatter />}
                          />
                          <Route
                            path="/tools/uuid-generator"
                            element={<UuidGenerator />}
                          />
                          <Route
                            path="/tools/color-picker"
                            element={<ColorPicker />}
                          />
                          <Route
                            path="/tools/qr-generator"
                            element={<QrGenerator />}
                          />
                          <Route
                            path="/tools/url-encoder"
                            element={<UrlEncoder />}
                          />
                          <Route
                            path="/tools/markdown-preview"
                            element={<MarkdownPreview />}
                          />
                          <Route
                            path="/tools/hash-generator"
                            element={<HashGenerator />}
                          />
                          <Route
                            path="/tools/timestamp-converter"
                            element={<TimestampConverter />}
                          />
                          <Route
                            path="/tools/regex-tester"
                            element={<RegexTester />}
                          />
                          <Route
                            path="/tools/lorem-ipsum"
                            element={<LoremIpsum />}
                          />
                          <Route
                            path="/tools/percentage-calculator"
                            element={<PercentageCalculator />}
                          />
                          <Route
                            path="/tools/bmi-calculator"
                            element={<BmiCalculator />}
                          />
                          <Route
                            path="/tools/loan-calculator"
                            element={<LoanCalculator />}
                          />
                          <Route
                            path="/tools/interest-calculator"
                            element={<InterestCalculator />}
                          />
                          <Route
                            path="/tools/investment-calculator"
                            element={<InvestmentCalculator />}
                          />
                          <Route
                            path="/tools/currency-converter"
                            element={<CurrencyConverter />}
                          />
                          <Route
                            path="/tools/credit-card-calculator"
                            element={<CreditCardCalculator />}
                          />
                          <Route
                            path="/tools/unit-converter"
                            element={<UnitConverter />}
                          />
                          <Route
                            path="/tools/age-calculator"
                            element={<AgeCalculator />}
                          />
                          <Route
                            path="/tools/date-calculator"
                            element={<DateCalculator />}
                          />
                          <Route
                            path="/tools/random-picker"
                            element={<RandomPicker />}
                          />
                          <Route
                            path="/tools/image-compressor"
                            element={<ImageCompressor />}
                          />
                          <Route
                            path="/tools/image-resizer"
                            element={<ImageResizer />}
                          />
                          <Route
                            path="/tools/text-diff"
                            element={<TextDiff />}
                          />
                          <Route
                            path="/tools/text-sorter"
                            element={<TextSorter />}
                          />
                          <Route
                            path="/tools/html-to-text"
                            element={<HtmlToText />}
                          />
                          <Route
                            path="/tools/csv-to-json"
                            element={<CsvToJson />}
                          />
                          <Route
                            path="/tools/text-replacer"
                            element={<TextReplacer />}
                          />
                          <Route
                            path="/tools/duplicate-remover"
                            element={<DuplicateRemover />}
                          />
                          <Route
                            path="/tools/json-to-csv"
                            element={<JsonToCsv />}
                          />
                          <Route
                            path="/tools/xml-to-json"
                            element={<XmlToJson />}
                          />
                          <Route
                            path="/tools/markdown-to-html"
                            element={<MarkdownToHtml />}
                          />
                          <Route
                            path="/tools/discount-calculator"
                            element={<DiscountCalculator />}
                          />
                          <Route
                            path="/tools/password-strength-checker"
                            element={<PasswordStrengthChecker />}
                          />
                          <Route
                            path="/tools/email-validator"
                            element={<EmailValidator />}
                          />
                          <Route
                            path="/tools/stopwatch-timer"
                            element={<StopwatchTimer />}
                          />
                          <Route
                            path="/tools/jwt-decoder"
                            element={<JwtDecoder />}
                          />
                          <Route
                            path="/tools/sql-formatter"
                            element={<SqlFormatter />}
                          />
                          <Route
                            path="/tools/code-minifier"
                            element={<CodeMinifier />}
                          />
                          <Route
                            path="/tools/http-status-codes"
                            element={<HttpStatusCodes />}
                          />
                          <Route
                            path="/tools/api-tester"
                            element={<ApiTester />}
                          />
                          <Route
                            path="/tools/whitespace-remover"
                            element={<WhitespaceRemover />}
                          />
                          <Route
                            path="/tools/pomodoro-timer"
                            element={<PomodoroTimer />}
                          />
                          <Route
                            path="/tools/ip-lookup"
                            element={<IpLookup />}
                          />
                          <Route
                            path="/tools/barcode-generator"
                            element={<BarcodeGenerator />}
                          />
                          <Route
                            path="/tools/color-gradient-generator"
                            element={<ColorGradientGenerator />}
                          />
                          {/* <Route
                            path="/tools/prompt-generator"
                            element={<PromptGenerator />}
                          /> */}
                          <Route path="/privacy" element={<PrivacyPolicy />} />
                          <Route path="/cookies" element={<CookiePolicy />} />
                          <Route path="/terms" element={<TermsOfService />} />
                          <Route path="/about" element={<AboutUs />} />
                          <Route path="/legal" element={<Legal />} />
                          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </main>
                  </div>
                </SidebarProvider>
              </SearchProvider>
            </FavoritesProvider>
          </RecentToolsProvider>
        </BrowserRouter>
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
