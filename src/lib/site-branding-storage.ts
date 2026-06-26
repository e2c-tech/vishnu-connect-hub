import { supabase } from "@/integrations/supabase/client";
import type { BrandWordmark, ContactInfo, HeroTile, HomeCta, ServiceCard, ServiceCity, SocialLink, StatItem } from "@/lib/cms-types";
import {
  DEFAULT_FOOTER_WORDMARK,
  DEFAULT_HEADER_WORDMARK,
  DEFAULT_HOME_CTA,
  DEFAULT_CONTACT_INFO,
  DEFAULT_SERVICE_CARDS,
  DEFAULT_SERVICE_CITIES,
  DEFAULT_SOCIAL_LINKS,
  normalizeContactInfo,
  normalizeHomeCta,
  normalizeWordmark,
  parseServiceCards,
  parseServiceCities,
  parseSocialLinks,
} from "@/lib/site-branding";

export const BRANDING_STAT_LABEL = "__site_branding__";

export type BrandingPayload = {
  logo_url: string | null;
  header_wordmark: BrandWordmark;
  footer_wordmark: BrandWordmark;
  home_cta: HomeCta;
  contact_info: ContactInfo;
  service_cards: ServiceCard[];
  service_cities: ServiceCity[];
  social_links: SocialLink[];
};

export function visibleStats(stats: StatItem[]): StatItem[] {
  return stats.filter((s) => s.label !== BRANDING_STAT_LABEL);
}

export function brandingFromStats(statsRaw: unknown): BrandingPayload | null {
  if (!Array.isArray(statsRaw)) return null;
  const entry = statsRaw.find((s) => (s as StatItem).label === BRANDING_STAT_LABEL) as StatItem | undefined;
  if (!entry?.value) return null;
  try {
    return JSON.parse(entry.value) as BrandingPayload;
  } catch {
    return null;
  }
}

export function embedBrandingInStats(stats: StatItem[], branding: BrandingPayload): StatItem[] {
  const visible = visibleStats(stats);
  return [...visible, { label: BRANDING_STAT_LABEL, value: JSON.stringify(branding) }];
}

function isMissingColumnError(error: { message?: string; code?: string } | null) {
  if (!error) return false;
  return error.code === "42703" || error.code === "PGRST204" || (error.message?.includes("logo_url") ?? false);
}

function mergePayload(partial: Partial<BrandingPayload>): BrandingPayload {
  return {
    logo_url: partial.logo_url?.trim() || null,
    header_wordmark: normalizeWordmark(partial.header_wordmark, DEFAULT_HEADER_WORDMARK),
    footer_wordmark: normalizeWordmark(partial.footer_wordmark, DEFAULT_FOOTER_WORDMARK),
    home_cta: normalizeHomeCta(partial.home_cta),
    contact_info: normalizeContactInfo(partial.contact_info),
    service_cards: partial.service_cards?.length ? partial.service_cards : DEFAULT_SERVICE_CARDS,
    service_cities: partial.service_cities?.length ? partial.service_cities : DEFAULT_SERVICE_CITIES,
    social_links: partial.social_links?.length ? partial.social_links : DEFAULT_SOCIAL_LINKS,
  };
}

function toBrandingResult(payload: BrandingPayload) {
  return {
    logoUrl: payload.logo_url,
    headerWordmark: payload.header_wordmark,
    footerWordmark: payload.footer_wordmark,
    homeCta: payload.home_cta,
    contactInfo: payload.contact_info,
    serviceCards: payload.service_cards,
    serviceCities: payload.service_cities,
    socialLinks: payload.social_links,
  };
}

export async function loadBrandingPayload(): Promise<ReturnType<typeof toBrandingResult>> {
  const withColumns = await supabase
    .from("site_settings")
    .select("logo_url,service_cards,service_cities,social_links,stats")
    .eq("id", 1)
    .maybeSingle();

  const embedded = brandingFromStats(withColumns.data?.stats);

  if (!isMissingColumnError(withColumns.error) && withColumns.data) {
    const d = withColumns.data;
    return toBrandingResult(mergePayload({
      logo_url: d.logo_url ?? embedded?.logo_url ?? null,
      header_wordmark: embedded?.header_wordmark,
      footer_wordmark: embedded?.footer_wordmark,
      home_cta: embedded?.home_cta,
      contact_info: embedded?.contact_info,
      service_cards: parseServiceCards(d.service_cards).length ? parseServiceCards(d.service_cards) : embedded?.service_cards,
      service_cities: parseServiceCities(d.service_cities).length ? parseServiceCities(d.service_cities) : embedded?.service_cities,
      social_links: parseSocialLinks(d.social_links).length ? parseSocialLinks(d.social_links) : embedded?.social_links,
    }));
  }

  const statsOnly = await supabase.from("site_settings").select("stats").eq("id", 1).maybeSingle();
  const fromStats = brandingFromStats(statsOnly.data?.stats);
  if (fromStats) return toBrandingResult(mergePayload(fromStats));

  return toBrandingResult(mergePayload({ logo_url: null }));
}

export async function saveBrandingPayload(
  branding: BrandingPayload,
  extras: { hero_tiles: unknown; stats: StatItem[] },
): Promise<{ error: string | null }> {
  const payload = mergePayload(branding);
  const statsToSave = embedBrandingInStats(extras.stats, payload);

  const columnUpsert = await supabase.from("site_settings").upsert({
    id: 1,
    hero_tiles: extras.hero_tiles,
    stats: statsToSave,
    logo_url: payload.logo_url,
    service_cards: payload.service_cards,
    service_cities: payload.service_cities,
    social_links: payload.social_links,
  });

  if (!columnUpsert.error) return { error: null };

  if (!isMissingColumnError(columnUpsert.error)) {
    return { error: columnUpsert.error.message };
  }

  const fallback = await supabase.from("site_settings").upsert({
    id: 1,
    hero_tiles: extras.hero_tiles,
    stats: statsToSave,
  });

  return { error: fallback.error?.message ?? null };
}

export type AdminBrandingState = {
  payload: BrandingPayload;
  hero_tiles: HeroTile[];
  stats: StatItem[];
};

export async function fetchAdminBrandingState(): Promise<AdminBrandingState> {
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  const hero_tiles = (data?.hero_tiles ?? []) as unknown as HeroTile[];
  const statsRaw = (data?.stats ?? []) as unknown as StatItem[];
  const stats = visibleStats(Array.isArray(statsRaw) ? statsRaw : []);
  const loaded = await loadBrandingPayload();

  const payload = mergePayload({
    logo_url: loaded.logoUrl,
    header_wordmark: loaded.headerWordmark ?? undefined,
    footer_wordmark: loaded.footerWordmark ?? undefined,
    home_cta: loaded.homeCta ?? undefined,
    contact_info: loaded.contactInfo ?? undefined,
    service_cards: loaded.serviceCards,
    service_cities: loaded.serviceCities,
    social_links: loaded.socialLinks,
  });

  return { payload, hero_tiles, stats };
}

export async function patchAndSaveBranding(
  partial: Partial<BrandingPayload>,
  extras?: Partial<{ hero_tiles: HeroTile[]; stats: StatItem[] }>,
): Promise<{ error: string | null }> {
  const { payload, hero_tiles, stats } = await fetchAdminBrandingState();
  return saveBrandingPayload(mergePayload({ ...payload, ...partial }), {
    hero_tiles: extras?.hero_tiles ?? hero_tiles,
    stats: extras?.stats ?? stats,
  });
}
