import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import { useTranslation } from "react-i18next";
import { Clock, Calendar, Tag } from "lucide-react";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const currentLang = i18n.language as "en" | "zh" | "es";

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title={t("blog.title")}
        description={t("blog.description")}
      />
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold flex-1">{t("blog.title")}</h2>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-0 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">{t("blog.pageTitle")}</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                : "bg-white/80 hover:bg-white"
            }`}
          >
            {t("blog.allCategories")}
          </button>
          {blogCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  : "bg-white/80 hover:bg-white"
              }`}
            >
              {category.name[currentLang]}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title[currentLang]}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}
                <h3 className="text-xl font-bold mb-2 gradient-text">
                  {post.title[currentLang]}
                </h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  {post.excerpt[currentLang]}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishDate).toLocaleDateString(currentLang)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime} {t("blog.minRead")}
                  </div>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              {t("blog.noPosts")}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
