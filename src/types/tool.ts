export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  badgeVariant: "blue" | "green" | "purple" | "orange" | "pink" | "cyan";
  path: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  path: string;
}
