import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslations from "./locales/en.json";
import zhTranslations from "./locales/zh.json";
import esTranslations from "./locales/es.json";
import ptTranslations from "./locales/pt.json";
import idTranslations from "./locales/id.json";
import viTranslations from "./locales/vi.json";
import frTranslations from "./locales/fr.json";
import deTranslations from "./locales/de.json";
import jaTranslations from "./locales/ja.json";
import koTranslations from "./locales/ko.json";

// Language configurations
export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "pt", name: "Portuguese", nativeName: "Português (Brasil)" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
];

const resources = {
  en: { translation: enTranslations },
  zh: { translation: zhTranslations },
  es: { translation: esTranslations },
  pt: { translation: ptTranslations },
  id: { translation: idTranslations },
  vi: { translation: viTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Fallback language
    lng: undefined, // Let the language detector decide
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      // Order of language detection methods
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"], // Cache user language preference
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;

