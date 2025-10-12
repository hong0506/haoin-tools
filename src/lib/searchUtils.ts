import { Tool } from "@/types/tool";
import enTranslations from "@/i18n/locales/en.json";
import zhTranslations from "@/i18n/locales/zh.json";
import esTranslations from "@/i18n/locales/es.json";

// Import all translation resources
const translations = {
  en: enTranslations,
  zh: zhTranslations,
  es: esTranslations,
};

/**
 * Multi-language search function
 * Searches across all supported languages (English, Chinese, Spanish)
 * regardless of the current interface language
 */
export const multiLanguageSearch = (
  tools: Tool[],
  searchQuery: string
): Tool[] => {
  if (!searchQuery || searchQuery.trim() === "") {
    return tools;
  }

  const query = searchQuery.toLowerCase().trim();

  return tools.filter((tool) => {
    // Search in the original English data
    const matchesEnglishData =
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query);

    if (matchesEnglishData) {
      return true;
    }

    // Search across all language translations
    const languages = ["en", "zh", "es"] as const;

    for (const lang of languages) {
      const toolTranslation =
        translations[lang].tools?.[
          tool.id as keyof (typeof translations)[typeof lang]["tools"]
        ];

      if (toolTranslation) {
        // Check title translation
        if (
          toolTranslation.title &&
          toolTranslation.title.toLowerCase().includes(query)
        ) {
          return true;
        }

        // Check description translation
        if (
          toolTranslation.description &&
          toolTranslation.description.toLowerCase().includes(query)
        ) {
          return true;
        }
      }

      // Check category translation
      const categoryTranslation =
        translations[lang].categories?.[
          tool.category as keyof (typeof translations)[typeof lang]["categories"]
        ];
      if (
        categoryTranslation &&
        categoryTranslation.toLowerCase().includes(query)
      ) {
        return true;
      }
    }

    return false;
  });
};
