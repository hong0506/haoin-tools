import { useParams, Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";
import { useTranslation } from "react-i18next";
import { Clock, Calendar, Tag, ArrowLeft, Share2 } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "zh" | "es";

  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">{t("blog.postNotFound")}</h1>
          <Link
            to="/blog"
            className="text-pink-500 hover:text-pink-600 underline"
          >
            {t("blog.backToBlog")}
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title[currentLang],
          text: post.excerpt[currentLang],
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(t("blog.linkCopied"));
    }
  };

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title={post.title[currentLang]}
        description={post.excerpt[currentLang]}
      />
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b glass">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <SidebarTrigger />
          <Link
            to="/blog"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">{t("blog.backToBlog")}</span>
          </Link>
          <div className="flex-1" />
          <button
            onClick={handleShare}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title={t("blog.share")}
          >
            <Share2 className="h-5 w-5" />
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      <article className="container mx-auto px-6 py-12 relative z-0 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
            {post.title[currentLang]}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {new Date(post.publishDate).toLocaleDateString(currentLang, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {post.readTime} {t("blog.minRead")}
            </div>
            <div className="flex items-center gap-2">
              👤 {post.author}
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <div 
            className="whitespace-pre-wrap leading-relaxed text-foreground/80"
            dangerouslySetInnerHTML={{ __html: post.content[currentLang].replace(/\n/g, '<br/>') }}
          />
        </div>

        {/* Related Tools */}
        {post.relatedTools && post.relatedTools.length > 0 && (
          <div className="mb-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              {t("blog.relatedTools")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedTools.map((toolId) => (
                <Link
                  key={toolId}
                  to={`/tools/${toolId}`}
                  className="px-4 py-2 bg-white rounded-full hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  {toolId}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              {t("blog.relatedPosts")}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="block"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h4 className="text-lg font-bold mb-2 gradient-text line-clamp-2">
                      {relatedPost.title[currentLang]}
                    </h4>
                    <p className="text-sm text-foreground/70 line-clamp-3">
                      {relatedPost.excerpt[currentLang]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
