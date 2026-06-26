// Shared type aliases for CMS rows. We use the supabase Database types
// where useful but expose hand-rolled types to keep callers simple.

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string | null;
  year: string | null;
  client: string | null;
  short_description: string | null;
  description: string | null;
  cover_url: string | null;
  media_urls: string[];
  facts: Array<{ label: string; value: string }>;
  published: boolean;
  sort_order: number;
};

export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_url: string | null;
  media_urls: string[];
  author: string | null;
  tags: string[];
  published: boolean;
  published_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string | null;
  kind: "text" | "video";
  video_embed_url: string | null;
  avatar_url: string | null;
  rating: number | null;
  published: boolean;
  sort_order: number;
};

export type Founder = {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
  published: boolean;
};

export type AboutContent = {
  id: number;
  heading: string | null;
  intro: string | null;
  mission: string | null;
  vision: string | null;
  image_url: string | null;
};

export type HeroTile = {
  eyebrow: string;
  headline: string;
  sub: string;
  image_url?: string;
};

export type StatItem = { label: string; value: string };

export type BrandWordmark = {
  line1: string;
  line2: string;
  line1_color: string;
  line2_color: string;
};

export type HomeCta = {
  eyebrow: string;
  title: string;
  description: string;
  button_text: string;
  button_url: string;
  bg_color: string;
};

export type ServiceCard = {
  title: string;
  body: string;
  icon: string;
  bg_color: string;
};

export type ServiceCity = { name: string };

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "youtube" | "twitter";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type ContactInfo = {
  address_lines: string[];
  phone: string;
  email: string;
  cin: string;
  whatsapp: string;
};

export type SiteSettings = {
  id: number;
  hero_tiles: HeroTile[];
  stats: StatItem[];
  logo_url: string | null;
  service_cards: ServiceCard[];
  service_cities: ServiceCity[];
  social_links: SocialLink[];
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  service: string | null;
  message: string;
  source: string | null;
  status: string;
  created_at: string;
};
