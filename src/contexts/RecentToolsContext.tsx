import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface RecentTool {
  id: string;
  title: string;
  lastAccessed: number;
}

interface RecentToolsContextType {
  recentTools: RecentTool[];
  addRecentTool: (toolId: string, toolTitle: string) => void;
  clearRecentTools: () => void;
}

const RecentToolsContext = createContext<RecentToolsContextType | undefined>(
  undefined
);

const STORAGE_KEY = "recent-tools";
const MAX_RECENT_TOOLS = 12; // Show up to 12 recent tools
const EXPIRY_DAYS = 30; // Tools expire after 30 days

interface RecentToolsProviderProps {
  children: ReactNode;
}

export const RecentToolsProvider: React.FC<RecentToolsProviderProps> = ({
  children,
}) => {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);

  // Load recent tools from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentTool[];
        const now = Date.now();
        const validTools = parsed.filter(
          (tool) => now - tool.lastAccessed < EXPIRY_DAYS * 24 * 60 * 60 * 1000
        );
        setRecentTools(validTools);

        // Update localStorage with cleaned data
        if (validTools.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validTools));
        }
      }
    } catch (error) {
      console.error("Error loading recent tools:", error);
    }
  }, []);

  // Add a tool to recent tools
  const addRecentTool = (toolId: string, toolTitle: string) => {
    const now = Date.now();
    setRecentTools((prev) => {
      // Remove if already exists
      const filtered = prev.filter((tool) => tool.id !== toolId);

      // Add to beginning
      const updated = [
        { id: toolId, title: toolTitle, lastAccessed: now },
        ...filtered,
      ].slice(0, MAX_RECENT_TOOLS); // Keep only the most recent ones

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving recent tools:", error);
      }

      return updated;
    });
  };

  // Clear all recent tools
  const clearRecentTools = () => {
    setRecentTools([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing recent tools:", error);
    }
  };

  return (
    <RecentToolsContext.Provider
      value={{
        recentTools,
        addRecentTool,
        clearRecentTools,
      }}
    >
      {children}
    </RecentToolsContext.Provider>
  );
};

export const useRecentTools = (): RecentToolsContextType => {
  const context = useContext(RecentToolsContext);
  if (context === undefined) {
    throw new Error("useRecentTools must be used within a RecentToolsProvider");
  }
  return context;
};

