import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/**
 * SEO Head Component
 * Dynamically updates <html lang> attribute and meta tags based on current language
 */
export const SEOHead = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    // Update <html lang> attribute
    document.documentElement.lang = currentLang;

    // Update <title> if needed (optional, can be per-page)
    // document.title = `${pageTitle} - Haoin Tools`;

    // Update meta description language
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      // Keep existing description or update per language if needed
      metaDescription.setAttribute('lang', currentLang);
    }

    // Add hreflang alternates (for SPA, this is informational)
    updateHreflangTags(currentLang, location.pathname);
  }, [currentLang, location.pathname]);

  return null; // This component doesn't render anything
};

/**
 * Update hreflang link tags for SEO
 * In SPA, these are more for crawlers to understand language versions exist
 */
function updateHreflangTags(currentLang: string, pathname: string) {
  // Remove existing hreflang links
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

  const languages = [
    { code: 'en', region: 'en' },
    { code: 'zh', region: 'zh-CN' },
    { code: 'es', region: 'es' },
    { code: 'pt', region: 'pt-BR' },
    { code: 'id', region: 'id' },
    { code: 'vi', region: 'vi' },
    { code: 'fr', region: 'fr' },
    { code: 'de', region: 'de' },
    { code: 'ja', region: 'ja' },
    { code: 'ko', region: 'ko' },
  ];

  const baseUrl = window.location.origin;
  const head = document.head;

  // Add x-default (for search engines)
  const xDefaultLink = document.createElement('link');
  xDefaultLink.rel = 'alternate';
  xDefaultLink.hreflang = 'x-default';
  xDefaultLink.href = `${baseUrl}${pathname}`;
  head.appendChild(xDefaultLink);

  // Add each language version
  languages.forEach(({ code, region }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = region;
    link.href = `${baseUrl}${pathname}?lang=${code}`;
    head.appendChild(link);
  });
}

export default SEOHead;
