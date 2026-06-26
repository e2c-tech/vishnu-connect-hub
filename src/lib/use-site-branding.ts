import { useEffect, useState } from "react";
import type { BrandWordmark, ContactInfo, HomeCta, ServiceCard, ServiceCity, SocialLink } from "@/lib/cms-types";
import { loadBrandingPayload } from "@/lib/site-branding-storage";

export type SiteBranding = {
  logoUrl: string | null;
  headerWordmark: BrandWordmark | null;
  footerWordmark: BrandWordmark | null;
  homeCta: HomeCta | null;
  contactInfo: ContactInfo | null;
  serviceCards: ServiceCard[];
  serviceCities: ServiceCity[];
  socialLinks: SocialLink[];
  loaded: boolean;
};

const EMPTY: SiteBranding = {
  logoUrl: null,
  headerWordmark: null,
  footerWordmark: null,
  homeCta: null,
  contactInfo: null,
  serviceCards: [],
  serviceCities: [],
  socialLinks: [],
  loaded: false,
};

let cache: SiteBranding | null = null;
let inflight: Promise<SiteBranding> | null = null;

const UPDATED_EVENT = "site-branding-updated";

export async function fetchSiteBranding(): Promise<SiteBranding> {
  if (cache?.loaded) return cache;
  if (inflight) return inflight;

  inflight = (async () => {
    const data = await loadBrandingPayload();
    const result: SiteBranding = { ...data, loaded: true };
    cache = result;
    return result;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export function invalidateSiteBrandingCache() {
  cache = null;
  inflight = null;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(UPDATED_EVENT));
  }
}

export function useSiteBranding(): SiteBranding {
  const [branding, setBranding] = useState<SiteBranding>(cache?.loaded ? cache : EMPTY);

  useEffect(() => {
    let active = true;
    const reload = () => {
      cache = null;
      inflight = null;
      fetchSiteBranding().then((data) => {
        if (active) setBranding(data);
      });
    };
    reload();
    window.addEventListener(UPDATED_EVENT, reload);
    return () => {
      active = false;
      window.removeEventListener(UPDATED_EVENT, reload);
    };
  }, []);

  return branding;
}
