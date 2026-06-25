import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Blog } from "@/lib/cms-types";
import { Modal, Field, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/admin/ui";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/blogs")({ component: AdminBlogs });

const empty = (): Partial<Blog> => ({
  slug: "", title: "", excerpt: "", body: "", cover_url: "", media_urls: [], author: "Sri Vishnu Editorial",
  tags: [], published: true, published_at: new Date().toISOString(),
});
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 90);

function AdminBlogs() {
  const [rows, setRows] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Partial<Blog> | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("blogs").select("*").order("published_at", { ascending: false });
    setRows((data ?? []) as unknown as Blog[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setErr(null); setBusy(true);
    const slug = editing.slug?.trim() || slugify(editing.title ?? "");
    const payload = {
      slug, title: editing.title ?? "", excerpt: editing.excerpt ?? null, body: editing.body ?? null,
      cover_url: editing.cover_url ?? null, media_urls: editing.media_urls ?? [],
      author: editing.author ?? null, tags: editing.tags ?? [],
      published: editing.published ?? true,
      published_at: editing.published_at ?? new Date().toISOString(),
    };
    const q = editing.id ? supabase.from("blogs").update(payload).eq("id", editing.id) : supabase.from("blogs").insert(payload);
    const { error } = await q;
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setEditing(null); load();
  };

  const remove = async (id: string) => { if (confirm("Delete this post?")) { await supabase.from("blogs").delete().eq("id", id); load(); } };
  const togglePublish = async (p: Blog) => { await supabase.from("blogs").update({ published: !p.published }).eq("id", p.id); load(); };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl uppercase">Blog posts</h1>
        <PrimaryBtn onClick={() => setEditing(empty())}><Plus className="mr-1 inline h-4 w-4" />New post</PrimaryBtn>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{rows.length} total</p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Author</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{p.title}<div className="text-xs text-muted-foreground">/{p.slug}</div></td>
                <td className="px-4 py-3 text-xs">{p.author}</td>
                <td className="px-4 py-3 text-xs">{new Date(p.published_at).toLocaleDateString()}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] ${p.published ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{p.published ? "Published" : "Hidden"}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => togglePublish(p)} className="mr-1 rounded p-1.5 hover:bg-muted">{p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</button>
                  <button onClick={() => setEditing(p)} className="mr-1 rounded p-1.5 hover:bg-muted"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(p.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No posts yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit post" : "New post"} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title"><input className={inputCls} value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <Field label="Slug" hint="Auto-generated if empty."><input className={inputCls} value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto" /></Field>
              <Field label="Author"><input className={inputCls} value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} /></Field>
              <Field label="Published date"><input type="date" className={inputCls} value={(editing.published_at ?? "").slice(0,10)} onChange={(e) => setEditing({ ...editing, published_at: new Date(e.target.value).toISOString() })} /></Field>
            </div>
            <ImageUpload label="Cover image" prefix="blogs" value={editing.cover_url ?? ""} onChange={(v) => setEditing({ ...editing, cover_url: v })} />
            <Field label="Tags (comma separated)">
              <input className={inputCls} value={(editing.tags ?? []).join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </Field>
            <Field label="Excerpt"><textarea className={textareaCls} rows={2} value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></Field>
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Body</div>
              <RichTextEditor value={editing.body ?? ""} onChange={(v) => setEditing({ ...editing, body: v })} minHeight={280} />
            </div>

            <Field label="Additional media URLs (one per line)">
              <textarea className={textareaCls} rows={3} value={(editing.media_urls ?? []).join("\n")} onChange={(e) => setEditing({ ...editing, media_urls: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published
            </label>
            {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <GhostBtn onClick={() => setEditing(null)}>Cancel</GhostBtn>
              <PrimaryBtn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save post"}</PrimaryBtn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
