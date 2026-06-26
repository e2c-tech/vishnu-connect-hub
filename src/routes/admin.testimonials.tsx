import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Testimonial } from "@/lib/cms-types";
import { Modal, Field, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/admin/ui";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toVideoEmbedUrl } from "@/lib/video-embed";

export const Route = createFileRoute("/admin/testimonials")({ component: AdminTesti });

const empty = (): Partial<Testimonial> => ({ name: "", role: "", quote: "", kind: "text", video_embed_url: "", published: true, sort_order: 0 });

function AdminTesti() {
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => { const { data } = await supabase.from("testimonials").select("*").order("sort_order"); setRows((data ?? []) as unknown as Testimonial[]); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return; setBusy(true);
    const rawVideoUrl = editing.video_embed_url?.trim() || null;
    const payload = {
      name: editing.name ?? "", role: editing.role ?? null, quote: editing.quote ?? null,
      kind: editing.kind ?? "text",
      video_embed_url: rawVideoUrl ? (toVideoEmbedUrl(rawVideoUrl) ?? rawVideoUrl) : null,
      published: editing.published ?? true, sort_order: editing.sort_order ?? 0,
    };
    const q = editing.id ? supabase.from("testimonials").update(payload).eq("id", editing.id) : supabase.from("testimonials").insert(payload);
    await q; setBusy(false); setEditing(null); load();
  };
  const remove = async (id: string) => { if (confirm("Delete?")) { await supabase.from("testimonials").delete().eq("id", id); load(); } };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl uppercase">Testimonials</h1>
        <PrimaryBtn onClick={() => setEditing(empty())}><Plus className="mr-1 inline h-4 w-4" />New</PrimaryBtn>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Text testimonials scroll on the homepage marquee; video testimonials embed below.</p>
      <div className="mt-5 grid gap-3">
        {rows.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${t.kind === "video" ? "bg-rose-500/15 text-rose-700 dark:text-rose-300" : "bg-primary/15 text-primary"}`}>{t.kind}</span>
                <span className="font-medium">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.role}</span>
              </div>
              {t.quote && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">"{t.quote}"</p>}
              {t.video_embed_url && <p className="mt-1 truncate text-xs text-muted-foreground">{t.video_embed_url}</p>}
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditing(t)} className="rounded p-1.5 hover:bg-muted"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(t.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        {!rows.length && <p className="text-sm text-muted-foreground">No testimonials.</p>}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit testimonial" : "New testimonial"}>
        {editing && (
          <div className="space-y-4">
            <Field label="Kind">
              <select className={inputCls} value={editing.kind ?? "text"} onChange={(e) => setEditing({ ...editing, kind: e.target.value as "text" | "video" })}>
                <option value="text">Text quote</option>
                <option value="video">Video embed</option>
              </select>
            </Field>
            <Field label="Name"><input className={inputCls} value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Role / Company"><input className={inputCls} value={editing.role ?? ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></Field>
            {editing.kind === "video" ? (
              <Field label="Video URL" hint="Paste any YouTube or Vimeo link — watch, share, or embed URLs all work.">
                <input className={inputCls} value={editing.video_embed_url ?? ""} onChange={(e) => setEditing({ ...editing, video_embed_url: e.target.value })} placeholder="https://www.youtube.com/watch?v=…" />
              </Field>
            ) : (
              <Field label="Quote"><textarea className={textareaCls} rows={4} value={editing.quote ?? ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} /></Field>
            )}
            <ImageUpload label="Avatar / photo" prefix="testimonials" value={editing.avatar_url ?? ""} onChange={(v) => setEditing({ ...editing, avatar_url: v })} />
            <Field label="Sort order"><input type="number" className={inputCls} value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <GhostBtn onClick={() => setEditing(null)}>Cancel</GhostBtn>
              <PrimaryBtn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</PrimaryBtn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
