export interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    zh: string;
    es: string;
  };
  excerpt: {
    en: string;
    zh: string;
    es: string;
  };
  content: {
    en: string;
    zh: string;
    es: string;
  };
  author: string;
  publishDate: string;
  lastUpdated?: string;
  category: string;
  tags: string[];
  readTime: number; // in minutes
  featuredImage?: string;
  relatedTools?: string[]; // tool IDs
}

export interface BlogCategory {
  id: string;
  name: {
    en: string;
    zh: string;
    es: string;
  };
  description: {
    en: string;
    zh: string;
    es: string;
  };
  icon: string;
}
