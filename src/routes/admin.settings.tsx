import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { BrandWordmark, HomeCta, HeroTile, ServiceCity, SocialLink, SocialPlatform, StatItem } from "@/lib/cms-types";
import { AdminSaveBar, ColorField, Field, GhostBtn, inputCls, textareaCls } from "@/components/admin/ui";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  DEFAULT_FOOTER_WORDMARK,
  DEFAULT_HEADER_WORDMARK,
  DEFAULT_HOME_CTA,
  DEFAULT_SERVICE_CITIES,
  DEFAULT_SOCIAL_LINKS,
  SOCIAL_PLATFORM_OPTIONS,
} from "@/lib/site-branding";
import { invalidateSiteBrandingCache } from "@/lib/use-site-branding";
import {
  fetchAdminBrandingState,
  patchAndSaveBranding,
} from "@/lib/site-branding-storage";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

const DEFAULT_STATS: StatItem[] = [
  { label: "Projects Delivered", value: "250+" },
  { label: "Years of Experience", value: "15+" },
  { label: "Cities Served", value: "12" },
  { label: "Safety Record", value: "Zero LTI" },
];

function WordmarkEditor({
  title,
  hint,
  value,
  onChange,
}: {
  title: string;
  hint: string;
  value: BrandWordmark;
  onChange: (v: BrandWordmark) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <h3 className="font-display text-sm uppercase">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Line 1 text"><input className={inputCls} value={value.line1} onChange={(e) => onChange({ ...value, line1: e.target.value })} /></Field>
        <Field label="Line 2 text"><input className={inputCls} value={value.line2} onChange={(e) => onChange({ ...value, line2: e.target.value })} /></Field>
        <ColorField label="Line 1 colour" value={value.line1_color} onChange={(v) => onChange({ ...value, line1_color: v })} />
        <ColorField label="Line 2 colour" value={value.line2_color} onChange={(v) => onChange({ ...value, line2_color: v })} />
      </div>
      <div className="mt-4 rounded-lg border border-border bg-background p-3">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Preview</div>
        <div className="mt-2 leading-tight">
          <div className="font-display text-base" style={{ color: value.line1_color }}>{value.line1 || "Line 1"}</div>
          <div className="text-[10px] tracking-[0.2em]" style={{ color: value.line2_color }}>{value.line2 || "Line 2"}</div>
        </div>
      </div>
    </div>
  );
}

function AdminSettings() {
  const [tiles, setTiles] = useState<HeroTile[]>([]);
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);
  const [logoUrl, setLogoUrl] = useState("");
  const [headerWordmark, setHeaderWordmark] = useState<BrandWordmark>(DEFAULT_HEADER_WORDMARK);
  const [footerWordmark, setFooterWordmark] = useState<BrandWordmark>(DEFAULT_FOOTER_WORDMARK);
  const [serviceCities, setServiceCities] = useState<ServiceCity[]>(DEFAULT_SERVICE_CITIES);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(DEFAULT_SOCIAL_LINKS);
  const [homeCta, setHomeCta] = useState<HomeCta>(DEFAULT_HOME_CTA);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminBrandingState().then(({ payload, hero_tiles, stats: loadedStats }) => {
      setTiles(hero_tiles);
      if (loadedStats.length) setStats(loadedStats);
      setLogoUrl(payload.logo_url ?? "");
      setHeaderWordmark(payload.header_wordmark);
      setFooterWordmark(payload.footer_wordmark);
      setHomeCta(payload.home_cta);
      setServiceCities(payload.service_cities);
      setSocialLinks(payload.social_links);
    });
  }, []);

  const save = async () => {
    setErr(null);
    setBusy(true);
    setSaved(false);
    const { error } = await patchAndSaveBranding(
      {
        logo_url: logoUrl.trim() || null,
        header_wordmark: headerWordmark,
        footer_wordmark: footerWordmark,
        home_cta: homeCta,
        service_cities: serviceCities,
        social_links: socialLinks,
      },
      { hero_tiles: tiles, stats },
    );
    setBusy(false);
    if (error) {
      setErr(error);
      return;
    }
    invalidateSiteBrandingCache();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const add = () => setTiles([...tiles, { eyebrow: "", headline: "", sub: "", image_url: "" }]);
  const upd = (i: number, p: Partial<HeroTile>) => setTiles(tiles.map((t, idx) => idx === i ? { ...t, ...p } : t));
  const del = (i: number) => setTiles(tiles.filter((_, idx) => idx !== i));

  const addStat = () => setStats([...stats, { label: "", value: "" }]);
  const updStat = (i: number, p: Partial<StatItem>) => setStats(stats.map((s, idx) => idx === i ? { ...s, ...p } : s));
  const delStat = (i: number) => setStats(stats.filter((_, idx) => idx !== i));

  const addCity = () => setServiceCities([...serviceCities, { name: "" }]);
  const updCity = (i: number, name: string) => setServiceCities(serviceCities.map((c, idx) => idx === i ? { name } : c));
  const delCity = (i: number) => setServiceCities(serviceCities.filter((_, idx) => idx !== i));

  const addSocial = () => setSocialLinks([...socialLinks, { platform: "facebook", url: "" }]);
  const updSocial = (i: number, p: Partial<SocialLink>) => setSocialLinks(socialLinks.map((s, idx) => idx === i ? { ...s, ...p } : s));
  const delSocial = (i: number) => setSocialLinks(socialLinks.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl uppercase">Site settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Logo, homepage CTA, footer cities, social links, hero slides and stats.</p>
      </div>

      <section className="rounded-2xl border border-border bg-background p-5">
        <h2 className="font-display text-xl uppercase">Logo (header &amp; footer)</h2>
        <p className="mt-1 text-xs text-muted-foreground">Shown on the left in the header and footer. Delete to hide the logo image.</p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[240px]">
            <ImageUpload label="Site logo" prefix="branding" value={logoUrl} onChange={setLogoUrl} />
          </div>
          {logoUrl && (
            <GhostBtn onClick={() => setLogoUrl("")} className="text-destructive hover:text-destructive">
              <Trash2 className="mr-1 inline h-4 w-4" />Delete logo
            </GhostBtn>
          )}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <WordmarkEditor
            title="Header text"
            hint="Shown beside the logo in the top navigation (light background)."
            value={headerWordmark}
            onChange={setHeaderWordmark}
          />
          <WordmarkEditor
            title="Footer text"
            hint="Shown beside the logo in the footer (dark background)."
            value={footerWordmark}
            onChange={setFooterWordmark}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background p-5">
        <h2 className="font-display text-xl uppercase">Homepage call-to-action</h2>
        <p className="mt-1 text-xs text-muted-foreground">The “Have a project in mind?” section at the bottom of the homepage.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Eyebrow label"><input className={inputCls} value={homeCta.eyebrow} onChange={(e) => setHomeCta({ ...homeCta, eyebrow: e.target.value })} /></Field>
          <Field label="Heading"><input className={inputCls} value={homeCta.title} onChange={(e) => setHomeCta({ ...homeCta, title: e.target.value })} /></Field>
        </div>
        <Field label="Description"><textarea className={textareaCls} rows={3} value={homeCta.description} onChange={(e) => setHomeCta({ ...homeCta, description: e.target.value })} /></Field>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Button text"><input className={inputCls} value={homeCta.button_text} onChange={(e) => setHomeCta({ ...homeCta, button_text: e.target.value })} /></Field>
          <Field label="Button link" hint="Internal path, e.g. /contact"><input className={inputCls} value={homeCta.button_url} onChange={(e) => setHomeCta({ ...homeCta, button_url: e.target.value })} /></Field>
        </div>
        <div className="mt-4">
          <ColorField label="Section background colour" value={homeCta.bg_color} onChange={(v) => setHomeCta({ ...homeCta, bg_color: v })} />
        </div>
        <div className="mt-4 rounded-lg border border-border p-4" style={{ backgroundColor: homeCta.bg_color }}>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">{homeCta.eyebrow}</div>
          <div className="mt-2 font-display text-2xl uppercase">{homeCta.title}</div>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{homeCta.description}</p>
          <span className="mt-4 inline-block rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background">{homeCta.button_text}</span>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl uppercase">Serving across (footer)</h2>
            <p className="mt-1 text-xs text-muted-foreground">City list in the footer “Serving Across” column.</p>
          </div>
          <GhostBtn onClick={addCity}><Plus className="mr-1 inline h-4 w-4" />Add city</GhostBtn>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCities.map((c, i) => (
            <div key={i} className="flex items-end gap-2">
              <Field label={`City ${i + 1}`}><input className={inputCls} value={c.name} onChange={(e) => updCity(i, e.target.value)} placeholder="Bangalore" /></Field>
              <button onClick={() => delCity(i)} className="mb-1 rounded p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl uppercase">Social media (footer)</h2>
            <p className="mt-1 text-xs text-muted-foreground">Icons and links shown in the footer contact column.</p>
          </div>
          <GhostBtn onClick={addSocial}><Plus className="mr-1 inline h-4 w-4" />Add link</GhostBtn>
        </div>
        <div className="space-y-3">
          {socialLinks.map((s, i) => (
            <div key={i} className="flex flex-wrap items-end gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <Field label="Platform">
                <select className={inputCls} value={s.platform} onChange={(e) => updSocial(i, { platform: e.target.value as SocialPlatform })}>
                  {SOCIAL_PLATFORM_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </Field>
              <Field label="URL"><input className={inputCls} value={s.url} onChange={(e) => updSocial(i, { url: e.target.value })} placeholder="https://…" /></Field>
              <button onClick={() => delSocial(i)} className="mb-1 rounded p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl uppercase">Hero banner slides</h2>
        <p className="mt-1 text-sm text-muted-foreground">Each tile rotates on the homepage banner.</p>
        <div className="mt-4 space-y-4">
          {tiles.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border bg-background p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Slide {i + 1}</div>
                <button onClick={() => del(i)} className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Eyebrow"><input className={inputCls} value={t.eyebrow} onChange={(e) => upd(i, { eyebrow: e.target.value })} /></Field>
                <Field label="Headline"><input className={inputCls} value={t.headline} onChange={(e) => upd(i, { headline: e.target.value })} /></Field>
              </div>
              <Field label="Subtext"><textarea className={textareaCls} rows={2} value={t.sub} onChange={(e) => upd(i, { sub: e.target.value })} /></Field>
              <div className="mt-3"><ImageUpload label="Background image (optional)" prefix="hero" value={t.image_url ?? ""} onChange={(v) => upd(i, { image_url: v })} /></div>
            </div>
          ))}
          <GhostBtn onClick={add}><Plus className="mr-1 inline h-4 w-4" />Add slide</GhostBtn>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl uppercase">Stats strip (below hero)</h2>
            <p className="mt-1 text-xs text-muted-foreground">Projects delivered, years of experience, etc.</p>
          </div>
          <GhostBtn onClick={addStat}><Plus className="mr-1 inline h-4 w-4" />Add stat</GhostBtn>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((s, i) => (
            <div key={i} className="flex items-end gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <Field label="Value"><input className={inputCls} value={s.value} onChange={(e) => updStat(i, { value: e.target.value })} placeholder="250+" /></Field>
              <Field label="Label"><input className={inputCls} value={s.label} onChange={(e) => updStat(i, { label: e.target.value })} placeholder="Projects Delivered" /></Field>
              <button onClick={() => delStat(i)} className="mb-1 rounded p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </section>

      <AdminSaveBar err={err} saved={saved} busy={busy} onSave={save} label="Save all settings" />
    </div>
  );
}
