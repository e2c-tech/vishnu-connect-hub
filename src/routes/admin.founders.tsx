import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Founder } from "@/lib/cms-types";
import { Modal, Field, inputCls, PrimaryBtn, GhostBtn, DangerBtn } from "@/components/admin/ui";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/founders")({ component: AdminFounders });

const empty = (): Partial<Founder> => ({ name: "", title: "", bio: "", photo_url: "", sort_order: 0, published: true });

function AdminFounders() {
  const [rows, setRows] = useState<Founder[]>([]);
  const [editing, setEditing] = useState<Partial<Founder> | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => { const { data } = await supabase.from("founders").select("*").order("sort_order"); setRows((data ?? []) as unknown as Founder[]); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return; setBusy(true);
    const payload = {
      name: editing.name ?? "", title: editing.title ?? null, bio: editing.bio ?? null,
      photo_url: editing.photo_url ?? null, sort_order: editing.sort_order ?? 0,
      published: editing.published ?? true,
    };
    const q = editing.id ? supabase.from("founders").update(payload).eq("id", editing.id) : supabase.from("founders").insert(payload);
    await q; setBusy(false); setEditing(null); load();
  };
  const remove = async (id: string) => { if (confirm("Delete?")) { await supabase.from("founders").delete().eq("id", id); load(); } };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl uppercase">Founders / Leadership</h1>
        <PrimaryBtn onClick={() => setEditing(empty())}><Plus className="mr-1 inline h-4 w-4" />Add founder</PrimaryBtn>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {rows.map((f) => (
          <div key={f.id} className="flex gap-4 rounded-xl border border-border bg-background p-4">
            {f.photo_url ? (
              <img src={f.photo_url} alt={f.name} className="h-20 w-20 shrink-0 rounded-full object-cover" />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground">{f.name[0]}</div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-display">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.title}</div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(f)} className="rounded p-1.5 hover:bg-muted"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(f.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              {f.bio && <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">{f.bio}</p>}
            </div>
          </div>
        ))}
        {!rows.length && <p className="text-sm text-muted-foreground">No founders yet.</p>}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit founder" : "Add founder"}>
        {editing && (
          <div className="space-y-4">
            <Field label="Full name"><input className={inputCls} value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Title / Role"><input className={inputCls} value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
            <ImageUpload label="Photo" prefix="founders" value={editing.photo_url ?? ""} onChange={(v) => setEditing({ ...editing, photo_url: v })} />
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Bio</div>
              <RichTextEditor value={editing.bio ?? ""} onChange={(v) => setEditing({ ...editing, bio: v })} minHeight={180} />
            </div>
            <Field label="Sort order"><input type="number" className={inputCls} value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published
            </label>
            <div className="flex justify-end gap-2 pt-2">
              {editing.id && <DangerBtn onClick={() => { if (editing.id) remove(editing.id); setEditing(null); }}>Delete</DangerBtn>}
              <GhostBtn onClick={() => setEditing(null)}>Cancel</GhostBtn>
              <PrimaryBtn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</PrimaryBtn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
