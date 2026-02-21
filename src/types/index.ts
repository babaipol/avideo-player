export interface Campaign {
  id: string;
  title: string;
  state: string;
  year: number;
  description: string;
  imageUrl: string;
  stats: {
    label: string;
    value: string;
  }[];
  outcome: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  category: "news" | "press" | "video";
  imageUrl?: string;
  excerpt?: string;
}

export interface Office {
  id: string;
  city: string;
  address: string;
  phone?: string;
  email: string;
  mapUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StateData {
  id: string;
  name: string;
  campaigns: Campaign[];
}
