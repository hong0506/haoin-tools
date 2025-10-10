import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div className={`${sizeClasses[size]} ${className} animate-float`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Haoin Tools icon"
        className="h-full w-full drop-shadow-lg"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="50%" stopColor="#C44569" />
            <stop offset="100%" stopColor="#B565D8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Rounded square background with gradient */}
        <rect x="0" y="0" width="64" height="64" rx="16" fill="url(#logo-gradient)" filter="url(#glow)" />
        
        {/* Cute sparkle/star decorations */}
        <circle cx="50" cy="14" r="2" fill="#FFF" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="14" cy="50" r="1.5" fill="#FFF" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Main icon - stylized "H" with modern twist */}
        <g fill="#ffffff" transform="translate(16,16)">
          {/* Left vertical bar */}
          <rect x="0" y="0" width="6" height="32" rx="3" />
          {/* Right vertical bar */}
          <rect x="26" y="0" width="6" height="32" rx="3" />
          {/* Horizontal connecting bar with gradient effect */}
          <rect x="0" y="13" width="32" height="6" rx="3" />
          {/* Small decorative circles */}
          <circle cx="3" cy="6" r="2" opacity="0.5" />
          <circle cx="29" cy="6" r="2" opacity="0.5" />
          <circle cx="16" cy="26" r="2" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};
