import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-2 px-2 sm:px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1"></div>
        <div className="flex-shrink-0">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
