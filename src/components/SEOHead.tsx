import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  image = "https://www.haointools.com/og-image.png",
  type = "website",
}: SEOHeadProps) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language || "en";

  // Base URL
  const baseUrl = "https://www.haointools.com";
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Default metadata by language
  const defaultMetadata = {
    en: {
      title: "Free Online Tools - 50+ Text, Image, Code & Calculator Tools | Haoin Tools",
      description: "Access 50+ free online tools instantly! Text converters, image editors, code formatters, calculators, generators & more. No registration, 100% free, works offline. Privacy-focused tools for developers, designers & everyone.",
      keywords: "free online tools, text converter, image editor, code formatter, calculator, JSON formatter, QR code generator, password generator, base64 encoder, URL encoder, markdown editor, color picker, image compressor, UUID generator, hash generator, regex tester, CSV converter, timestamp converter, percentage calculator, BMI calculator, unit converter, barcode generator, IP lookup, API tester, developer tools, online utilities, web tools, free tools, no registration",
    },
    zh: {
      title: "免费在线工具 - 50+文本、图像、代码和计算器工具 | 皓萤工具",
      description: "立即访问50+免费在线工具！文本转换器、图像编辑器、代码格式化工具、计算器、生成器等。无需注册，100%免费，可离线使用。为开发者、设计师和所有人提供注重隐私的工具。",
      keywords: "免费在线工具, 文本转换器, 图像编辑器, 代码格式化, 计算器, JSON格式化, 二维码生成器, 密码生成器, Base64编码, URL编码, Markdown编辑器, 颜色选择器, 图像压缩, UUID生成器, 哈希生成器, 正则表达式测试, CSV转换器, 时间戳转换器, 百分比计算器, BMI计算器, 单位转换器, 条形码生成器, IP查询, API测试工具, 开发者工具, 在线实用工具, 网页工具, 无需注册",
    },
    es: {
      title: "Herramientas Online Gratis - Más de 50 Herramientas de Texto, Imagen, Código y Calculadoras | Haoin Tools",
      description: "¡Accede a más de 50 herramientas online gratis al instante! Convertidores de texto, editores de imágenes, formateadores de código, calculadoras, generadores y más. Sin registro, 100% gratis, funciona sin conexión. Herramientas centradas en la privacidad para desarrolladores, diseñadores y todos.",
      keywords: "herramientas online gratis, convertidor de texto, editor de imágenes, formateador de código, calculadora, formateador JSON, generador de código QR, generador de contraseñas, codificador base64, codificador URL, editor markdown, selector de color, compresor de imágenes, generador UUID, generador hash, probador regex, convertidor CSV, convertidor de marca de tiempo, calculadora de porcentaje, calculadora IMC, convertidor de unidades, generador de código de barras, búsqueda IP, probador API, herramientas para desarrolladores, utilidades online, herramientas web, gratis, sin registro",
    },
  };

  const metadata = defaultMetadata[currentLang as keyof typeof defaultMetadata] || defaultMetadata.en;

  const pageTitle = title || metadata.title;
  const pageDescription = description || metadata.description;
  const pageKeywords = keywords || metadata.keywords;

  // Language codes mapping
  const langMapping = {
    en: "en-US",
    zh: "zh-CN",
    es: "es-ES",
  };

  const locale = langMapping[currentLang as keyof typeof langMapping] || "en-US";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={currentLang} />
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* hreflang tags for all language versions */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${location.pathname}`} />
      <link rel="alternate" hrefLang="zh" href={`${baseUrl}${location.pathname}`} />
      <link rel="alternate" hrefLang="es" href={`${baseUrl}${location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${location.pathname}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Haoin Tools" />
      
      {/* Alternate locales for Open Graph */}
      {currentLang !== "en" && <meta property="og:locale:alternate" content="en-US" />}
      {currentLang !== "zh" && <meta property="og:locale:alternate" content="zh-CN" />}
      {currentLang !== "es" && <meta property="og:locale:alternate" content="es-ES" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      {/* Language and Geographic Tags */}
      <meta name="language" content={currentLang} />
      <meta httpEquiv="content-language" content={currentLang} />
      
      {/* Search Engine Specific Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* For Chinese search engines (Baidu, Sogou, 360 Search) */}
      {currentLang === "zh" && (
        <>
          <meta name="baidu-site-verification" content="code-to-be-added" />
          <meta name="applicable-device" content="pc,mobile" />
          <meta name="MobileOptimized" content="width" />
          <meta name="HandheldFriendly" content="true" />
        </>
      )}
      
      {/* For Spanish markets */}
      {currentLang === "es" && (
        <>
          <meta name="geo.region" content="ES" />
          <meta name="geo.placename" content="Spain" />
        </>
      )}
    </Helmet>
  );
};
