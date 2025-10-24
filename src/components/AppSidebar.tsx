import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { categories } from "@/data/tools";
import { Logo } from "@/components/Logo";
import { useSearch } from "@/contexts/SearchContext";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

function ConditionalTooltipLabel({ text }: { text: string }) {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language?.startsWith("es");
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [truncated, setTruncated] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      const el = spanRef.current;
      if (!el) return;
      setTruncated(el.scrollWidth > el.clientWidth + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    if (spanRef.current) ro.observe(spanRef.current);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [text, i18n.language]);

  const label = (
    <span ref={spanRef} className="text-[15px] truncate">
      {text}
    </span>
  );

  if (isSpanish && truncated) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{label}</TooltipTrigger>
        <TooltipContent side="right" align="start">
          {text}
        </TooltipContent>
      </Tooltip>
    );
  }
  return label;
}

export function AppSidebar() {
  const { clearSearch } = useSearch();
  const { t, i18n } = useTranslation();

  const handleAllToolsClick = () => {
    clearSearch();
    // Clear saved scroll position and scroll to top
    sessionStorage.removeItem("scroll_/");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleCategoryClick = (path: string) => {
    clearSearch();
    // Clear saved scroll position and scroll to top
    sessionStorage.removeItem(`scroll_${path}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border px-6 py-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="rounded-xl p-1 transition-transform group-hover:scale-110">
            <Logo size="md" />
          </div>
          <div>
            <h1 className="text-2xl font-black gradient-text">
              {t("hero.title")}
            </h1>
            <p className="text-xs font-semibold text-primary/70">
              ✨ {t("hero.subtitle")}
            </p>
          </div>
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 pb-8">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            📂 {t("nav.tools")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/"
                    end
                    onClick={handleAllToolsClick}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-white font-semibold shadow-lg transition-all"
                        : "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-all font-medium hover:translate-x-1"
                    }
                  >
                    <Icons.Home className="h-5 w-5" />
                    <ConditionalTooltipLabel text={t("common.allTools")} />
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {categories.map((category) => {
                const IconComponent = Icons[
                  category.icon as keyof typeof Icons
                ] as React.ComponentType<{
                  className?: string;
                }>;
                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={category.path}
                        onClick={() => handleCategoryClick(category.path)}
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-white font-semibold shadow-lg transition-all"
                            : "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-all font-medium hover:translate-x-1"
                        }
                      >
                        {IconComponent && <IconComponent className="h-5 w-5" />}
                        <ConditionalTooltipLabel text={t(`categories.${category.id}`)} />
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Resources Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            📚 {t("nav.resources")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-white font-semibold shadow-lg transition-all"
                        : "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-all font-medium hover:translate-x-1"
                    }
                  >
                    <Icons.BookOpen className="h-5 w-5" />
                    <ConditionalTooltipLabel text={t("nav.blog")} />
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/guide"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-white font-semibold shadow-lg transition-all"
                        : "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-all font-medium hover:translate-x-1"
                    }
                  >
                    <Icons.Lightbulb className="h-5 w-5" />
                    <ConditionalTooltipLabel text={t("nav.userGuide")} />
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/help"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-white font-semibold shadow-lg transition-all"
                        : "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-all font-medium hover:translate-x-1"
                    }
                  >
                    <Icons.HelpCircle className="h-5 w-5" />
                    <ConditionalTooltipLabel text={t("nav.helpCenter")} />
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
