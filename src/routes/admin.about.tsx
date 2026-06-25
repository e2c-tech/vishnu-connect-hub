import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AboutContent } from "@/lib/cms-types";
import { Field, inputCls, textareaCls, PrimaryBtn } from "@/components/admin/ui";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/about")({ component: AdminAbout });

function AdminAbout() {
  const [data, setData] = useState<Partial<AboutContent>>({});
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("about_content").select("*").eq("id", 1).maybeSingle();
      if (data) setData(data as unknown as AboutContent);
    })();
  }, []);

  const save = async () => {
    setErr(null); setBusy(true); setSaved(false);
    const { error } = await supabase.from("about_content").upsert({ id: 1, ...data });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h1 className="font-display text-3xl uppercase">About section</h1>
      <p className="mt-1 text-sm text-muted-foreground">This content powers the public About page and the homepage About block.</p>

      <div className="mt-6 space-y-4 rounded-2xl border border-border bg-background p-6">
        <Field label="Heading"><input className={inputCls} value={data.heading ?? ""} onChange={(e) => setData({ ...data, heading: e.target.value })} /></Field>
        <div><div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Intro</div><RichTextEditor value={data.intro ?? ""} onChange={(v) => setData({ ...data, intro: v })} minHeight={120} /></div>
        <div><div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Mission</div><RichTextEditor value={data.mission ?? ""} onChange={(v) => setData({ ...data, mission: v })} minHeight={140} /></div>
        <div><div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Vision</div><RichTextEditor value={data.vision ?? ""} onChange={(v) => setData({ ...data, vision: v })} minHeight={140} /></div>
        <ImageUpload label="About image" prefix="about" value={data.image_url ?? ""} onChange={(v) => setData({ ...data, image_url: v })} />

        {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
        <div className="flex items-center justify-end gap-3">
          {saved && <span className="flex items-center gap-1 text-sm text-primary"><CheckCircle2 className="h-4 w-4" /> Saved</span>}
          <PrimaryBtn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save changes"}</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}
