import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-2xl group">
      {/* Floating bubbles decoration - more cute bubbles! */}
      <div
        className="absolute -top-3 left-10 w-3 h-3 bg-pink-400/40 rounded-full shadow-sm"
        style={{ animation: "bubble-float 3s ease-in-out infinite" }}
      />
      <div
        className="absolute -top-4 left-20 w-2 h-2 bg-purple-400/40 rounded-full shadow-sm"
        style={{ animation: "bubble-float 4s ease-in-out infinite 0.5s" }}
      />
      <div
        className="absolute -top-2 right-32 w-2.5 h-2.5 bg-blue-400/40 rounded-full shadow-sm"
        style={{ animation: "bubble-float 3.5s ease-in-out infinite 1s" }}
      />
      <div
        className="absolute -top-2 right-48 w-2 h-2 bg-pink-300/40 rounded-full shadow-sm"
        style={{ animation: "bubble-float 4.5s ease-in-out infinite 1.5s" }}
      />
      <div
        className="absolute -bottom-2 left-16 w-2 h-2 bg-pink-300/40 rounded-full shadow-sm"
        style={{ animation: "bubble-float 3.5s ease-in-out infinite 2s" }}
      />
      <div
        className="absolute -bottom-3 right-20 w-3 h-3 bg-purple-300/40 rounded-full shadow-sm"
        style={{ animation: "bubble-float 4s ease-in-out infinite 2.5s" }}
      />
      <div
        className="absolute -bottom-2 right-40 w-2.5 h-2.5 bg-blue-300/40 rounded-full shadow-sm"
        style={{ animation: "bubble-float 3s ease-in-out infinite 0.8s" }}
      />

      {/* Cute cartoon border wrapper */}
      <div className="relative p-[3px] rounded-[20px] bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow-lg group-focus-within:shadow-xl transition-all">
        <div className="relative bg-white rounded-[18px] overflow-hidden">
          {/* Inner decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Sparkle decorations */}
            <div className="absolute top-2 left-3 text-yellow-400 text-xs animate-pulse">
              ✨
            </div>
            <div
              className="absolute bottom-2 right-3 text-pink-400 text-xs animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              💫
            </div>
          </div>

          {/* Search icon */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <Search className="h-5 w-5 text-primary/60 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
              {/* Cute ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-150 opacity-0 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all" />
            </div>
          </div>

          {/* Sparkles when typing */}
          {value && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
          )}

          {/* Input field */}
          <Input
            type="search"
            placeholder="Search for amazing tools... (e.g., JSON, password, calculator)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-14 pr-14 h-14 text-base border-0 rounded-[18px] focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shadow-none transition-all"
            style={{
              fontWeight: "500",
            }}
          />

          {/* Cute wave decoration at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Floating cute emoji decorations */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-2xl animate-float pointer-events-none opacity-40 group-focus-within:opacity-70 transition-opacity">
        🎨
      </div>
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-2xl animate-float-slow pointer-events-none opacity-40 group-focus-within:opacity-70 transition-opacity">
        ✨
      </div>
    </div>
  );
};
