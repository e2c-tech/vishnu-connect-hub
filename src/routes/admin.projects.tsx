import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/lib/cms-types";
import { Modal, Field, inputCls, textareaCls, PrimaryBtn, GhostBtn, DangerBtn } from "@/components/admin/ui";
import { ImageUpload, uploadToMedia } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";

export const Route = createFileRoute("/admin/projects")({ component: AdminProjects });

const empty = (): Partial<Project> => ({
  slug: "", title: "", category: "Construction", location: "", year: new Date().getFullYear().toString(),
  client: "", short_description: "", description: "", cover_url: "", media_urls: [], published: true,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

function AdminProjects() {
  const [rows, setRows] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order").order("created_at", { ascending: false });
    setRows((data ?? []) as unknown as Project[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setErr(null); setBusy(true);
    const slug = editing.slug?.trim() || slugify(editing.title ?? "");
    const payload = {
      slug,
      title: editing.title ?? "",
      category: editing.category ?? "Construction",
      location: editing.location ?? null,
      year: editing.year ?? null,
      client: editing.client ?? null,
      short_description: editing.short_description ?? null,
      description: editing.description ?? null,
      cover_url: editing.cover_url ?? null,
      media_urls: editing.media_urls ?? [],
      published: editing.published ?? true,
    };
    const q = editing.id
      ? supabase.from("projects").update(payload).eq("id", editing.id)
      : supabase.from("projects").insert(payload);
    const { error } = await q;
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    load();
  };

  const togglePublish = async (p: Project) => {
    await supabase.from("projects").update({ published: !p.published }).eq("id", p.id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl uppercase">Projects</h1>
        <PrimaryBtn onClick={() => setEditing(empty())}><Plus className="mr-1 inline h-4 w-4" />New project</PrimaryBtn>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{rows.length} total · click a row to edit</p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Year</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{p.title}<div className="text-xs text-muted-foreground">/{p.slug}</div></td>
                <td className="px-4 py-3 text-xs">{p.category}</td>
                <td className="px-4 py-3 text-xs">{p.location}</td>
                <td className="px-4 py-3 text-xs">{p.year}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] ${p.published ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{p.published ? "Published" : "Hidden"}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => togglePublish(p)} className="mr-1 rounded p-1.5 hover:bg-muted" title={p.published ? "Hide" : "Publish"}>
                    {p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button onClick={() => setEditing(p)} className="mr-1 rounded p-1.5 hover:bg-muted"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(p.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No projects yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit project" : "New project"} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title"><input className={inputCls} value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <Field label="Slug" hint="Leave empty to auto-generate from title."><input className={inputCls} value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto" /></Field>
              <Field label="Category"><input className={inputCls} value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="Commercial / Residential / Scaffolding…" /></Field>
              <Field label="Location"><input className={inputCls} value={editing.location ?? ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></Field>
              <Field label="Year"><input className={inputCls} value={editing.year ?? ""} onChange={(e) => setEditing({ ...editing, year: e.target.value })} /></Field>
              <Field label="Client"><input className={inputCls} value={editing.client ?? ""} onChange={(e) => setEditing({ ...editing, client: e.target.value })} /></Field>
            </div>
            <ImageUpload label="Cover image" prefix="projects" value={editing.cover_url ?? ""} onChange={(v) => setEditing({ ...editing, cover_url: v })} />
            <Field label="Short description"><textarea className={textareaCls} rows={2} value={editing.short_description ?? ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} /></Field>
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Full description</div>
              <RichTextEditor value={editing.description ?? ""} onChange={(v) => setEditing({ ...editing, description: v })} minHeight={220} />
            </div>
            <GalleryEditor
              items={editing.media_urls ?? []}
              onChange={(arr) => setEditing({ ...editing, media_urls: arr })}
              prefix="projects/gallery"
            />

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
              Published (visible on public site)
            </label>
            {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
            <div className="flex justify-end gap-2 pt-2">
              {editing.id && <DangerBtn onClick={() => { if (editing.id) remove(editing.id); setEditing(null); }}>Delete</DangerBtn>}
              <GhostBtn onClick={() => setEditing(null)}>Cancel</GhostBtn>
              <PrimaryBtn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save project"}</PrimaryBtn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function GalleryEditor({ items, onChange, prefix }: { items: string[]; onChange: (arr: string[]) => void; prefix: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const onPick = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true); setErr(null);
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) urls.push(await uploadToMedia(f, prefix));
      onChange([...items, ...urls]);
    } catch (e) { setErr(e instanceof Error ? e.message : "Upload failed"); }
    finally { setBusy(false); }
  };
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Gallery images</span>
        <label className="cursor-pointer rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted">
          <Upload className="mr-1 inline h-3 w-3" />{busy ? "Uploading…" : "Add images"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { onPick(e.target.files); e.currentTarget.value = ""; }} />
        </label>
      </div>
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {items.map((u, i) => (
            <div key={i} className="group relative">
              <img src={u} alt="" className="h-20 w-full rounded-md object-cover" />
              <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-white opacity-0 group-hover:opacity-100">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}
