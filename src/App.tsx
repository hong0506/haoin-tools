import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RecentToolsProvider } from "@/contexts/RecentToolsContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import CaseConverter from "./pages/tools/CaseConverter";
import WordCounter from "./pages/tools/WordCounter";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import Base64Tool from "./pages/tools/Base64Tool";
import JsonFormatter from "./pages/tools/JsonFormatter";
import UuidGenerator from "./pages/tools/UuidGenerator";
import ColorPicker from "./pages/tools/ColorPicker";
import QrGenerator from "./pages/tools/QrGenerator";
import UrlEncoder from "./pages/tools/UrlEncoder";
import MarkdownPreview from "./pages/tools/MarkdownPreview";
import HashGenerator from "./pages/tools/HashGenerator";
import TimestampConverter from "./pages/tools/TimestampConverter";
import RegexTester from "./pages/tools/RegexTester";
import LoremIpsum from "./pages/tools/LoremIpsum";
import PercentageCalculator from "./pages/tools/PercentageCalculator";
import BmiCalculator from "./pages/tools/BmiCalculator";
import LoanCalculator from "./pages/tools/LoanCalculator";
import InterestCalculator from "./pages/tools/InterestCalculator";
import InvestmentCalculator from "./pages/tools/InvestmentCalculator";
import CurrencyConverter from "./pages/tools/CurrencyConverter";
import CreditCardCalculator from "./pages/tools/CreditCardCalculator";
import UnitConverter from "./pages/tools/UnitConverter";
import AgeCalculator from "./pages/tools/AgeCalculator";
import DateCalculator from "./pages/tools/DateCalculator";
import RandomPicker from "./pages/tools/RandomPicker";
import ImageCompressor from "./pages/tools/ImageCompressor";
import ImageResizer from "./pages/tools/ImageResizer";
import TextDiff from "./pages/tools/TextDiff";
import TextSorter from "./pages/tools/TextSorter";
import HtmlToText from "./pages/tools/HtmlToText";
import CsvToJson from "./pages/tools/CsvToJson";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./pages/AboutUs";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RecentToolsProvider>
          <FavoritesProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1">
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
                  <Route path="/tools/word-counter" element={<WordCounter />} />
                  <Route
                    path="/tools/password-generator"
                    element={<PasswordGenerator />}
                  />
                  <Route path="/tools/base64" element={<Base64Tool />} />
                  <Route
                    path="/tools/json-formatter"
                    element={<JsonFormatter />}
                  />
                  <Route
                    path="/tools/uuid-generator"
                    element={<UuidGenerator />}
                  />
                  <Route path="/tools/color-picker" element={<ColorPicker />} />
                  <Route path="/tools/qr-generator" element={<QrGenerator />} />
                  <Route path="/tools/url-encoder" element={<UrlEncoder />} />
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
                  <Route path="/tools/regex-tester" element={<RegexTester />} />
                  <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
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
                  <Route path="/tools/text-diff" element={<TextDiff />} />
                  <Route path="/tools/text-sorter" element={<TextSorter />} />
                  <Route path="/tools/html-to-text" element={<HtmlToText />} />
                  <Route path="/tools/csv-to-json" element={<CsvToJson />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/legal" element={<Legal />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
          </FavoritesProvider>
        </RecentToolsProvider>
      </BrowserRouter>
      <CookieConsent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
