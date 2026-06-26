import {
  HardHat,
  Building2,
  Leaf,
  Hammer,
  Wrench,
  Truck,
  Factory,
  Home,
  Layers,
  type LucideIcon,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";
import type { BrandWordmark, ContactInfo, HomeCta, ServiceCard, ServiceCity, SocialLink, SocialPlatform } from "@/lib/cms-types";
import { COMPANY } from "@/lib/site-data";

export const DEFAULT_HEADER_WORDMARK: BrandWordmark = {
  line1: "SRI VISHNU",
  line2: "CONSOL PVT LTD",
  line1_color: "#0a0a0a",
  line2_color: "#737373",
};

export const DEFAULT_FOOTER_WORDMARK: BrandWordmark = {
  line1: "SRI VISHNU",
  line2: "CONSOL PVT LTD",
  line1_color: "#ffffff",
  line2_color: "#a3a3a3",
};

export const DEFAULT_HOME_CTA: HomeCta = {
  eyebrow: "Trusted construction partner",
  title: "Have a project in mind?",
  description: "Tell us about your site, scope, and timeline — our team will respond within one business day.",
  button_text: "Contact us",
  button_url: "/contact",
  bg_color: "#fef9ec",
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  address_lines: COMPANY.addressLines,
  phone: COMPANY.phone,
  email: COMPANY.email,
  cin: COMPANY.cin,
  whatsapp: COMPANY.whatsapp,
};

export function normalizeContactInfo(
  raw: Partial<ContactInfo> | undefined,
  defaults: ContactInfo = DEFAULT_CONTACT_INFO,
): ContactInfo {
  const lines = raw?.address_lines?.map((l) => l.trim()).filter(Boolean);
  return {
    address_lines: lines?.length ? lines : defaults.address_lines,
    phone: raw?.phone?.trim() || defaults.phone,
    email: raw?.email?.trim() || defaults.email,
    cin: raw?.cin?.trim() || defaults.cin,
    whatsapp: raw?.whatsapp?.trim() || defaults.whatsapp,
  };
}

export function normalizeWordmark(raw: Partial<BrandWordmark> | undefined, defaults: BrandWordmark): BrandWordmark {
  return {
    line1: raw?.line1?.trim() || defaults.line1,
    line2: raw?.line2?.trim() || defaults.line2,
    line1_color: raw?.line1_color?.trim() || defaults.line1_color,
    line2_color: raw?.line2_color?.trim() || defaults.line2_color,
  };
}

export function normalizeHomeCta(raw: Partial<HomeCta> | undefined, defaults: HomeCta = DEFAULT_HOME_CTA): HomeCta {
  return {
    eyebrow: raw?.eyebrow?.trim() || defaults.eyebrow,
    title: raw?.title?.trim() || defaults.title,
    description: raw?.description?.trim() || defaults.description,
    button_text: raw?.button_text?.trim() || defaults.button_text,
    button_url: raw?.button_url?.trim() || defaults.button_url,
    bg_color: raw?.bg_color?.trim() || defaults.bg_color,
  };
}

export const SERVICE_ICON_OPTIONS = [
  { value: "HardHat", label: "Hard hat" },
  { value: "Building2", label: "Building" },
  { value: "Leaf", label: "Leaf / Green" },
  { value: "Hammer", label: "Hammer" },
  { value: "Wrench", label: "Wrench" },
  { value: "Truck", label: "Truck" },
  { value: "Factory", label: "Factory" },
  { value: "Home", label: "Home" },
  { value: "Layers", label: "Layers" },
] as const;

const SERVICE_ICONS: Record<string, LucideIcon> = {
  HardHat,
  Building2,
  Leaf,
  Hammer,
  Wrench,
  Truck,
  Factory,
  Home,
  Layers,
};

export function resolveServiceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? HardHat;
}

export const SOCIAL_PLATFORM_OPTIONS: { value: SocialPlatform; label: string }[] = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter / X" },
];

const SOCIAL_ICONS: Record<SocialPlatform, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
};

export function resolveSocialIcon(platform: SocialPlatform): LucideIcon {
  return SOCIAL_ICONS[platform] ?? Facebook;
}

export const DEFAULT_SERVICE_CARDS: ServiceCard[] = [
  {
    title: "Scaffolding & Access",
    body: "System scaffolding design, supply and erection — cuplock, ringlock, cantilever, suspended platforms and BMU coordination.",
    icon: "HardHat",
    bg_color: "#f5b400",
  },
  {
    title: "Construction & Civil",
    body: "Turnkey general contracting for commercial, residential, institutional, industrial and infrastructure projects.",
    icon: "Building2",
    bg_color: "#f5b400",
  },
  {
    title: "Interiors & Fit-out",
    body: "Office, retail, hospitality and healthcare interiors — ceilings, flooring, MEP integration and joinery.",
    icon: "Leaf",
    bg_color: "#f5b400",
  },
];

export const DEFAULT_SERVICE_CITIES: ServiceCity[] = COMPANY.cities.map((name) => ({ name }));

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: "facebook", url: COMPANY.social.facebook },
  { platform: "instagram", url: COMPANY.social.instagram },
  { platform: "linkedin", url: COMPANY.social.linkedin },
  { platform: "youtube", url: COMPANY.social.youtube },
  { platform: "twitter", url: COMPANY.social.twitter },
];

export function parseServiceCards(raw: unknown): ServiceCard[] {
  if (!Array.isArray(raw) || !raw.length) return [];
  return raw
    .map((item) => {
      const row = item as Partial<ServiceCard>;
      if (!row.title?.trim()) return null;
      return {
        title: row.title.trim(),
        body: row.body?.trim() ?? "",
        icon: row.icon?.trim() || "HardHat",
        bg_color: row.bg_color?.trim() || "#f5b400",
      };
    })
    .filter((item): item is ServiceCard => item !== null);
}

export function parseServiceCities(raw: unknown): ServiceCity[] {
  if (!Array.isArray(raw) || !raw.length) return [];
  return raw
    .map((item) => {
      const row = item as Partial<ServiceCity>;
      const name = row.name?.trim();
      return name ? { name } : null;
    })
    .filter((item): item is ServiceCity => item !== null);
}

export function parseSocialLinks(raw: unknown): SocialLink[] {
  if (!Array.isArray(raw) || !raw.length) return [];
  const platforms = new Set(SOCIAL_PLATFORM_OPTIONS.map((p) => p.value));
  return raw
    .map((item) => {
      const row = item as Partial<SocialLink>;
      if (!row.url?.trim() || !row.platform || !platforms.has(row.platform)) return null;
      return { platform: row.platform, url: row.url.trim() };
    })
    .filter((item): item is SocialLink => item !== null);
}
