import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { HeroTile } from "@/lib/cms-types";
import { Field, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/admin/ui";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  const [tiles, setTiles] = useState<HeroTile[]>([]);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      const ht = (data?.hero_tiles ?? []) as unknown as HeroTile[];
      setTiles(ht);
    })();
  }, []);

  const save = async () => {
    setBusy(true);
    await supabase.from("site_settings").upsert({ id: 1, hero_tiles: tiles });
    setBusy(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const add = () => setTiles([...tiles, { eyebrow: "", headline: "", sub: "", image_url: "" }]);
  const upd = (i: number, p: Partial<HeroTile>) => setTiles(tiles.map((t, idx) => idx === i ? { ...t, ...p } : t));
  const del = (i: number) => setTiles(tiles.filter((_, idx) => idx !== i));

  return (
    <div>
      <h1 className="font-display text-3xl uppercase">Hero tiles &amp; settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Each tile rotates on the homepage banner with one of the background images.</p>

      <div className="mt-6 space-y-4">
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
            <div className="mt-3"><ImageUpload label="Background image (optional — falls back to default banner)" prefix="hero" value={t.image_url ?? ""} onChange={(v) => upd(i, { image_url: v })} /></div>
          </div>
        ))}
        <GhostBtn onClick={add}><Plus className="mr-1 inline h-4 w-4" />Add slide</GhostBtn>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {saved && <span className="flex items-center gap-1 text-sm text-primary"><CheckCircle2 className="h-4 w-4" /> Saved</span>}
        <PrimaryBtn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save tiles"}</PrimaryBtn>
      </div>
    </div>
  );
}
