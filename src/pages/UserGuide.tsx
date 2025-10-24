import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useTranslation } from "react-i18next";
import { 
  BookOpen, 
  Zap, 
  Shield, 
  Star, 
  Search, 
  Smartphone,
  Globe,
  Heart
} from "lucide-react";

const UserGuide = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "zh" | "es";

  const guides = [
    {
      title: {
        en: "Getting Started",
        zh: "快速开始",
        es: "Comenzar",
      },
      icon: Zap,
      content: {
        en: "Welcome to HaoinTools! Getting started is simple - no registration required. Just browse our collection of tools, click on the one you need, and start using it immediately. All tools work directly in your browser.",
        zh: "欢迎使用HaoinTools！开始使用非常简单 - 无需注册。只需浏览我们的工具集合，点击您需要的工具，立即开始使用。所有工具都直接在浏览器中运行。",
        es: "¡Bienvenido a HaoinTools! Comenzar es simple: no se requiere registro. Simplemente explora nuestra colección de herramientas, haz clic en la que necesites y comienza a usarla de inmediato. Todas las herramientas funcionan directamente en tu navegador.",
      },
    },
    {
      title: {
        en: "Finding Tools",
        zh: "查找工具",
        es: "Encontrar Herramientas",
      },
      icon: Search,
      content: {
        en: "Use the search bar at the top to quickly find tools by name or function. You can also browse by category using the sidebar menu. Popular categories include Text Tools, Converters, Generators, Calculators, and more.",
        zh: "使用顶部的搜索栏快速按名称或功能查找工具。您还可以使用侧边栏菜单按类别浏览。热门类别包括文本工具、转换器、生成器、计算器等。",
        es: "Usa la barra de búsqueda en la parte superior para encontrar rápidamente herramientas por nombre o función. También puedes navegar por categoría usando el menú lateral. Las categorías populares incluyen Herramientas de Texto, Convertidores, Generadores, Calculadoras y más.",
      },
    },
    {
      title: {
        en: "Privacy & Security",
        zh: "隐私与安全",
        es: "Privacidad y Seguridad",
      },
      icon: Shield,
      content: {
        en: "Your privacy matters. All data processing happens locally in your browser - we never upload or store your information on our servers. Your files, text, and calculations stay completely private and secure on your device.",
        zh: "您的隐私很重要。所有数据处理都在浏览器本地进行 - 我们绝不会上传或在服务器上存储您的信息。您的文件、文本和计算完全保留在您的设备上，安全且私密。",
        es: "Tu privacidad importa. Todo el procesamiento de datos ocurre localmente en tu navegador: nunca subimos ni almacenamos tu información en nuestros servidores. Tus archivos, textos y cálculos permanecen completamente privados y seguros en tu dispositivo.",
      },
    },
    {
      title: {
        en: "Using Favorites",
        zh: "使用收藏",
        es: "Usar Favoritos",
      },
      icon: Star,
      content: {
        en: "Click the star icon on any tool to add it to your favorites. Your favorites are saved locally in your browser, allowing quick access to your most-used tools. Access them anytime from the Favorites category in the sidebar.",
        zh: "点击任何工具上的星标图标将其添加到您的收藏夹。您的收藏夹保存在浏览器本地，允许快速访问您最常用的工具。随时从侧边栏的收藏夹类别访问它们。",
        es: "Haz clic en el ícono de estrella en cualquier herramienta para agregarla a tus favoritos. Tus favoritos se guardan localmente en tu navegador, permitiendo acceso rápido a tus herramientas más usadas. Accede a ellas en cualquier momento desde la categoría Favoritos en la barra lateral.",
      },
    },
    {
      title: {
        en: "Mobile Usage",
        zh: "移动端使用",
        es: "Uso Móvil",
      },
      icon: Smartphone,
      content: {
        en: "HaoinTools is fully optimized for mobile devices. All tools work seamlessly on smartphones and tablets. The responsive design ensures a great user experience regardless of your screen size.",
        zh: "HaoinTools完全针对移动设备进行了优化。所有工具在智能手机和平板电脑上无缝运行。响应式设计确保无论您的屏幕大小如何，都能获得出色的用户体验。",
        es: "HaoinTools está completamente optimizado para dispositivos móviles. Todas las herramientas funcionan perfectamente en smartphones y tablets. El diseño responsive garantiza una excelente experiencia de usuario independientemente del tamaño de tu pantalla.",
      },
    },
    {
      title: {
        en: "Language Support",
        zh: "语言支持",
        es: "Soporte de Idiomas",
      },
      icon: Globe,
      content: {
        en: "HaoinTools supports multiple languages including English, Chinese, and Spanish. Use the language switcher in the top-right corner to change languages. Your preference is saved and will be remembered on your next visit.",
        zh: "HaoinTools支持多种语言，包括英语、中文和西班牙语。使用右上角的语言切换器更改语言。您的偏好会被保存，下次访问时会被记住。",
        es: "HaoinTools admite varios idiomas, incluidos inglés, chino y español. Usa el selector de idioma en la esquina superior derecha para cambiar idiomas. Tu preferencia se guarda y se recordará en tu próxima visita.",
      },
    },
  ];

  const toolCategories = [
    {
      name: { en: "Text Tools", zh: "文本工具", es: "Herramientas de Texto" },
      description: {
        en: "Process and manipulate text with tools like case converters, word counters, text sorters, and more.",
        zh: "使用大小写转换器、字数统计器、文本排序器等工具处理和操作文本。",
        es: "Procesa y manipula texto con herramientas como convertidores de mayúsculas, contadores de palabras, ordenadores de texto y más.",
      },
      emoji: "✍️",
    },
    {
      name: { en: "Converters", zh: "转换器", es: "Convertidores" },
      description: {
        en: "Convert between formats like JSON to CSV, Base64 encoding, HTML to text, and various unit conversions.",
        zh: "在格式之间转换，如JSON到CSV、Base64编码、HTML到文本和各种单位转换。",
        es: "Convierte entre formatos como JSON a CSV, codificación Base64, HTML a texto y varias conversiones de unidades.",
      },
      emoji: "🔄",
    },
    {
      name: { en: "Generators", zh: "生成器", es: "Generadores" },
      description: {
        en: "Generate passwords, QR codes, UUIDs, lorem ipsum text, and more with customizable options.",
        zh: "生成密码、二维码、UUID、占位文本等，带有可自定义选项。",
        es: "Genera contraseñas, códigos QR, UUIDs, texto lorem ipsum y más con opciones personalizables.",
      },
      emoji: "⚡",
    },
    {
      name: { en: "Calculators", zh: "计算器", es: "Calculadoras" },
      description: {
        en: "Calculate everything from BMI and age to percentages, tips, and unit conversions.",
        zh: "计算从BMI和年龄到百分比、小费和单位转换的一切。",
        es: "Calcula todo, desde IMC y edad hasta porcentajes, propinas y conversiones de unidades.",
      },
      emoji: "🧮",
    },
    {
      name: { en: "Developer Tools", zh: "开发者工具", es: "Herramientas para Desarrolladores" },
      description: {
        en: "Tools for developers including JSON formatters, regex testers, JWT decoders, and code minifiers.",
        zh: "开发者工具，包括JSON格式化器、正则表达式测试器、JWT解码器和代码压缩器。",
        es: "Herramientas para desarrolladores incluyendo formateadores JSON, probadores regex, decodificadores JWT y minificadores de código.",
      },
      emoji: "👨‍💻",
    },
    {
      name: { en: "Design Tools", zh: "设计工具", es: "Herramientas de Diseño" },
      description: {
        en: "Create color palettes, compress images, resize photos, and generate gradients for your designs.",
        zh: "为您的设计创建调色板、压缩图像、调整照片大小和生成渐变。",
        es: "Crea paletas de colores, comprime imágenes, redimensiona fotos y genera gradientes para tus diseños.",
      },
      emoji: "🎨",
    },
  ];

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title={t("userGuide.title")}
        description={t("userGuide.description")}
      />
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold flex-1">{t("userGuide.title")}</h2>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-16 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">{t("userGuide.pageTitle")}</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            {t("userGuide.subtitle")}
          </p>
        </div>

        {/* Quick Start Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
            {t("userGuide.quickStart")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 gradient-text">
                        {guide.title[currentLang]}
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {guide.content[currentLang]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tool Categories Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
            {t("userGuide.toolCategories")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="text-xl font-bold mb-2 gradient-text">
                  {category.name[currentLang]}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {category.description[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 shadow-xl text-white">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="h-8 w-8" />
            <h2 className="text-3xl font-bold">{t("userGuide.proTips")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-bold mb-2">💡 {t("userGuide.tip1.title")}</h4>
              <p className="text-white/90 text-sm">{t("userGuide.tip1.description")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-bold mb-2">⚡ {t("userGuide.tip2.title")}</h4>
              <p className="text-white/90 text-sm">{t("userGuide.tip2.description")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-bold mb-2">🎯 {t("userGuide.tip3.title")}</h4>
              <p className="text-white/90 text-sm">{t("userGuide.tip3.description")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-bold mb-2">🌟 {t("userGuide.tip4.title")}</h4>
              <p className="text-white/90 text-sm">{t("userGuide.tip4.description")}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserGuide;
