import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useTranslation } from "react-i18next";
import { Search, HelpCircle, Book, Zap, Shield, MessageCircle, X } from "lucide-react";

interface FAQItem {
  id: string;
  question: {
    en: string;
    zh: string;
    es: string;
  };
  answer: {
    en: string;
    zh: string;
    es: string;
  };
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "what-is-haointools",
    category: "general",
    question: {
      en: "What is HaoinTools?",
      zh: "HaoinTools是什么？",
      es: "¿Qué es HaoinTools?",
    },
    answer: {
      en: "HaoinTools is a free online platform offering 50+ productivity tools for text processing, conversion, generation, calculation, and more. All tools work directly in your browser without requiring registration or installation.",
      zh: "HaoinTools是一个免费的在线平台，提供50多个生产力工具，包括文本处理、转换、生成、计算等。所有工具直接在浏览器中运行，无需注册或安装。",
      es: "HaoinTools es una plataforma en línea gratuita que ofrece más de 50 herramientas de productividad para procesamiento de texto, conversión, generación, cálculo y más. Todas las herramientas funcionan directamente en tu navegador sin requerir registro o instalación.",
    },
  },
  {
    id: "is-it-free",
    category: "general",
    question: {
      en: "Is HaoinTools completely free?",
      zh: "HaoinTools完全免费吗？",
      es: "¿Es HaoinTools completamente gratis?",
    },
    answer: {
      en: "Yes! HaoinTools is 100% free to use. All tools are available without any subscription fees or hidden costs. We may display non-intrusive ads to support the platform.",
      zh: "是的！HaoinTools 100%免费使用。所有工具都可以使用，没有订阅费或隐藏费用。我们可能会显示非侵入性广告来支持平台运营。",
      es: "¡Sí! HaoinTools es 100% gratuito. Todas las herramientas están disponibles sin tarifas de suscripción ni costos ocultos. Podemos mostrar anuncios no intrusivos para mantener la plataforma.",
    },
  },
  {
    id: "data-privacy",
    category: "privacy",
    question: {
      en: "Is my data safe? Do you store my information?",
      zh: "我的数据安全吗？你们会存储我的信息吗？",
      es: "¿Mis datos están seguros? ¿Almacenan mi información?",
    },
    answer: {
      en: "Your privacy is our priority. All tools process data locally in your browser. We never upload, store, or transmit your data to our servers. Your information stays completely private and secure on your device.",
      zh: "您的隐私是我们的首要任务。所有工具都在浏览器本地处理数据。我们绝不会上传、存储或传输您的数据到我们的服务器。您的信息完全保留在您的设备上，安全且私密。",
      es: "Tu privacidad es nuestra prioridad. Todas las herramientas procesan datos localmente en tu navegador. Nunca subimos, almacenamos o transmitimos tus datos a nuestros servidores. Tu información permanece completamente privada y segura en tu dispositivo.",
    },
  },
  {
    id: "no-registration",
    category: "general",
    question: {
      en: "Do I need to register or create an account?",
      zh: "我需要注册或创建账户吗？",
      es: "¿Necesito registrarme o crear una cuenta?",
    },
    answer: {
      en: "No registration required! You can use all tools immediately without creating an account. Simply visit the tool you need and start using it right away.",
      zh: "无需注册！您可以立即使用所有工具，无需创建账户。只需访问您需要的工具并立即开始使用。",
      es: "¡No se requiere registro! Puedes usar todas las herramientas inmediatamente sin crear una cuenta. Simplemente visita la herramienta que necesitas y comienza a usarla de inmediato.",
    },
  },
  {
    id: "offline-usage",
    category: "technical",
    question: {
      en: "Can I use HaoinTools offline?",
      zh: "我可以离线使用HaoinTools吗？",
      es: "¿Puedo usar HaoinTools sin conexión?",
    },
    answer: {
      en: "Most tools work offline once the page is loaded since they process data in your browser. However, you need an internet connection to initially access the website and load the tools.",
      zh: "大多数工具在页面加载后可以离线工作，因为它们在浏览器中处理数据。但是，您需要互联网连接才能首次访问网站并加载工具。",
      es: "La mayoría de las herramientas funcionan sin conexión una vez cargada la página, ya que procesan datos en tu navegador. Sin embargo, necesitas una conexión a internet para acceder inicialmente al sitio web y cargar las herramientas.",
    },
  },
  {
    id: "mobile-support",
    category: "technical",
    question: {
      en: "Does HaoinTools work on mobile devices?",
      zh: "HaoinTools可以在移动设备上使用吗？",
      es: "¿Funciona HaoinTools en dispositivos móviles?",
    },
    answer: {
      en: "Yes! HaoinTools is fully responsive and optimized for mobile devices. You can access all tools on smartphones and tablets with the same functionality as desktop.",
      zh: "是的！HaoinTools完全响应式，并针对移动设备进行了优化。您可以在智能手机和平板电脑上访问所有工具，功能与桌面版相同。",
      es: "¡Sí! HaoinTools es totalmente responsive y está optimizado para dispositivos móviles. Puedes acceder a todas las herramientas en smartphones y tablets con la misma funcionalidad que en escritorio.",
    },
  },
  {
    id: "browser-support",
    category: "technical",
    question: {
      en: "Which browsers are supported?",
      zh: "支持哪些浏览器？",
      es: "¿Qué navegadores son compatibles?",
    },
    answer: {
      en: "HaoinTools works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your browser for the best experience.",
      zh: "HaoinTools可在所有现代浏览器上运行，包括Chrome、Firefox、Safari、Edge和Opera。我们建议使用最新版本的浏览器以获得最佳体验。",
      es: "HaoinTools funciona en todos los navegadores modernos incluyendo Chrome, Firefox, Safari, Edge y Opera. Recomendamos usar la última versión de tu navegador para la mejor experiencia.",
    },
  },
  {
    id: "tool-suggestions",
    category: "general",
    question: {
      en: "Can I request new tools or features?",
      zh: "我可以申请新工具或功能吗？",
      es: "¿Puedo solicitar nuevas herramientas o funciones?",
    },
    answer: {
      en: "Absolutely! We love hearing from our users. You can contact us through our social media channels or email with your tool suggestions. We regularly add new tools based on user feedback.",
      zh: "当然可以！我们很乐意听取用户的意见。您可以通过我们的社交媒体渠道或电子邮件联系我们，提出工具建议。我们会根据用户反馈定期添加新工具。",
      es: "¡Por supuesto! Nos encanta escuchar a nuestros usuarios. Puedes contactarnos a través de nuestras redes sociales o correo electrónico con tus sugerencias de herramientas. Agregamos regularmente nuevas herramientas basadas en los comentarios de los usuarios.",
    },
  },
  {
    id: "tool-accuracy",
    category: "usage",
    question: {
      en: "How accurate are the calculation and conversion tools?",
      zh: "计算和转换工具的准确性如何？",
      es: "¿Qué tan precisas son las herramientas de cálculo y conversión?",
    },
    answer: {
      en: "Our tools use industry-standard algorithms and formulas to ensure high accuracy. However, for critical financial or professional decisions, we recommend verifying results with official sources or professional advisors.",
      zh: "我们的工具使用行业标准算法和公式以确保高准确性。但是，对于关键的财务或专业决策，我们建议使用官方来源或专业顾问验证结果。",
      es: "Nuestras herramientas utilizan algoritmos y fórmulas estándar de la industria para garantizar alta precisión. Sin embargo, para decisiones financieras o profesionales críticas, recomendamos verificar los resultados con fuentes oficiales o asesores profesionales.",
    },
  },
  {
    id: "report-bug",
    category: "support",
    question: {
      en: "What should I do if I find a bug or error?",
      zh: "如果我发现错误或问题该怎么办？",
      es: "¿Qué debo hacer si encuentro un error o problema?",
    },
    answer: {
      en: "If you encounter any bugs or errors, please report them to us via email or social media. Include details about the issue, which tool you were using, and your browser type to help us fix it quickly.",
      zh: "如果您遇到任何错误或问题，请通过电子邮件或社交媒体向我们报告。请包含问题的详细信息、您使用的工具以及浏览器类型，以帮助我们快速修复。",
      es: "Si encuentras algún error o problema, repórtalo por correo electrónico o redes sociales. Incluye detalles sobre el problema, qué herramienta estabas usando y tu tipo de navegador para ayudarnos a solucionarlo rápidamente.",
    },
  },
];

const HelpCenter = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "zh" | "es";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: { en: "All", zh: "全部", es: "Todo" }, icon: HelpCircle },
    { id: "general", name: { en: "General", zh: "常规", es: "General" }, icon: Book },
    { id: "privacy", name: { en: "Privacy", zh: "隐私", es: "Privacidad" }, icon: Shield },
    { id: "technical", name: { en: "Technical", zh: "技术", es: "Técnico" }, icon: Zap },
    { id: "usage", name: { en: "Usage", zh: "使用", es: "Uso" }, icon: MessageCircle },
    { id: "support", name: { en: "Support", zh: "支持", es: "Soporte" }, icon: HelpCircle },
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    
    // 跨语言搜索：在所有语言版本中搜索
    const matchesSearch = 
      searchQuery === "" ||
      // 搜索英文
      faq.question.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // 搜索中文
      faq.question.zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // 搜索西班牙文
      faq.question.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.es.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title={t("helpCenter.title")}
        description={t("helpCenter.description")}
      />
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold flex-1">{t("helpCenter.title")}</h2>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
            <HelpCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">{t("helpCenter.pageTitle")}</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-8">
            {t("helpCenter.subtitle")}
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("helpCenter.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                    : "bg-white/80 hover:bg-white hover:shadow-md"
                }`}
              >
                <Icon className="h-5 w-5" />
                {category.name[currentLang]}
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <details
              key={faq.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg group animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <h3 className="text-lg font-bold gradient-text">
                  {faq.question[currentLang]}
                </h3>
                <span className="text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t">
                <p className="text-foreground/80 leading-relaxed">
                  {faq.answer[currentLang]}
                </p>
              </div>
            </details>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-muted-foreground">
              {t("helpCenter.noResults")}
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">{t("helpCenter.stillNeedHelp")}</h2>
          <p className="text-lg mb-6 text-white/90">
            {t("helpCenter.contactMessage")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:support@haointools.com"
              className="px-6 py-3 bg-white text-pink-600 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              📧 {t("helpCenter.emailUs")}
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
