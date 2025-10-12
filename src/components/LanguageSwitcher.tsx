import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check, Sparkles } from "lucide-react";
import { languages } from "@/i18n/config";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(
    (lang) => lang.code === i18n.language
  ) || languages[0];

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-slow"
            style={{
              animation: isOpen ? "none" : undefined,
            }}
          >
            {/* Sparkle effect */}
            <Sparkles
              className={`absolute -top-1 -right-1 h-4 w-4 text-yellow-300 transition-all duration-300 ${
                isHovered || isOpen ? "scale-125 rotate-180" : "scale-0"
              }`}
            />
            
            {/* Globe icon with rotation animation */}
            <Globe
              className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-500 ${
                isHovered || isOpen ? "rotate-180 scale-110" : ""
              }`}
            />
            
            {/* Language name - show abbreviated on mobile */}
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
              <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
            </span>

            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-0 group-hover:opacity-75 blur-md transition-opacity duration-300 -z-10" />
          </button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent
          align="end"
          className="w-48 max-h-[420px] overflow-y-auto bg-white/95 backdrop-blur-lg border-2 border-purple-200 rounded-2xl shadow-2xl p-2 animate-in slide-in-from-top-2 duration-300"
        >
          {/* Header with gradient */}
          <div className="px-3 py-2 mb-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <div className="flex items-center gap-2 text-white">
              <Globe className="h-4 w-4 animate-spin-slow" />
              <span className="text-sm font-bold">Choose Your Language</span>
              <Sparkles className="h-3 w-3 ml-auto" />
            </div>
          </div>

          {/* Language list */}
          <div className="space-y-1">
            {languages.map((language, index) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className="group relative flex items-center gap-2 cursor-pointer py-2.5 px-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Language names without flag */}
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {language.nativeName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {language.name}
                  </span>
                </div>

                {/* Check mark with scale animation */}
                {i18n.language === language.code && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-scale-in">
                    <Check className="h-4 w-4 text-white font-bold" />
                  </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-50 transition-opacity duration-200 -z-10" />
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add custom animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

