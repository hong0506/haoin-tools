interface AdBannerProps {
  className?: string;
}

export const AdBanner = ({ className = "" }: AdBannerProps) => {
  return (
    <div className={`mt-8 mb-4 ${className}`}>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
              AD
            </div>
            <p className="text-sm text-muted-foreground">
              Advertisement - Support our free tools
            </p>
          </div>
          <div className="text-xs text-muted-foreground hidden sm:block">
            Ads help keep this service free
          </div>
        </div>
        <div className="mt-3 p-6 bg-white dark:bg-gray-800 rounded border border-dashed border-gray-300 dark:border-gray-600 text-center">
          <p className="text-sm text-muted-foreground">
            Your ad could be here - 728x90 banner space
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Contact: ads@haoin.tech
          </p>
        </div>
      </div>
    </div>
  );
};

// Sidebar Ad Stack - Multiple small ads stacked vertically
export const AdSidebarStack = ({ 
  side = "right", 
  count = 2,
  className = "" 
}: { 
  side?: "left" | "right"; 
  count?: number;
  className?: string 
}) => {
  const allAds = [
    { size: "160x160", color: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20", border: "border-purple-200 dark:border-purple-800" },
    { size: "160x160", color: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20", border: "border-blue-200 dark:border-blue-800" },
    { size: "160x160", color: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20", border: "border-green-200 dark:border-green-800" },
    { size: "160x160", color: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20", border: "border-orange-200 dark:border-orange-800" },
  ];
  
  const ads = allAds.slice(0, count);

  return (
    <div 
      className={`hidden xl:block fixed top-24 ${side === "right" ? "right-4" : "left-[280px]"} w-[160px] space-y-4 ${className}`}
      style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
    >
      {ads.map((ad, index) => (
        <div key={index} className={`bg-gradient-to-br ${ad.color} rounded-lg border ${ad.border} p-2`}>
          <div className="flex items-center gap-1 mb-2">
            <div className="px-1.5 py-0.5 bg-purple-500 text-white text-[10px] font-semibold rounded">
              AD
            </div>
          </div>
          <div className={`aspect-square bg-white dark:bg-gray-800 rounded border border-dashed ${ad.border} flex items-center justify-center`}>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">
                {ad.size}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Single Sidebar Ad - for backward compatibility
export const AdSidebar = ({ side = "right", className = "" }: { side?: "left" | "right"; className?: string }) => {
  return (
    <div 
      className={`hidden xl:block fixed top-24 ${side === "right" ? "right-4" : "left-4"} w-[160px] ${className}`}
      style={{ maxHeight: 'calc(100vh - 120px)' }}
    >
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800 p-2">
        <div className="flex items-center gap-1 mb-2">
          <div className="px-1.5 py-0.5 bg-purple-500 text-white text-[10px] font-semibold rounded">
            AD
          </div>
          <p className="text-[10px] text-muted-foreground">Sponsor</p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded border border-dashed border-purple-200 dark:border-purple-700 text-center">
          <p className="text-[10px] text-muted-foreground mb-1">
            160x600
          </p>
          <p className="text-[9px] text-muted-foreground/60">
            Ad Space
          </p>
        </div>
      </div>
    </div>
  );
};

// Medium Rectangle Ad - for in-content placement
export const AdMediumRectangle = ({ className = "" }: AdBannerProps) => {
  return (
    <div className={`my-6 ${className}`}>
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800 p-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded">
            AD
          </div>
          <p className="text-xs text-muted-foreground">Advertisement</p>
        </div>
        <div className="p-8 bg-white dark:bg-gray-800 rounded border border-dashed border-green-200 dark:border-green-700 text-center">
          <p className="text-sm text-muted-foreground">
            300x250 Ad Space
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Medium Rectangle
          </p>
        </div>
      </div>
    </div>
  );
};
