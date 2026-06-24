import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ContactSubmission } from "@/lib/cms-types";
import { Trash2, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/submissions")({ component: AdminSubs });

const STATUS = ["new", "in_progress", "responded", "closed"] as const;

function AdminSubs() {
  const [rows, setRows] = useState<ContactSubmission[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setRows((data ?? []) as unknown as ContactSubmission[]);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => { await supabase.from("contact_submissions").update({ status }).eq("id", id); load(); };
  const remove = async (id: string) => { if (confirm("Delete?")) { await supabase.from("contact_submissions").delete().eq("id", id); load(); } };

  const shown = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl uppercase">Inquiries</h1>
        <div className="flex gap-1 rounded-lg bg-muted p-1 text-xs">
          {["all", ...STATUS].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`rounded-md px-3 py-1 ${filter === s ? "bg-background shadow" : "text-muted-foreground"}`}>{s}</button>
          ))}
        </div>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{shown.length} {filter === "all" ? "total" : filter} · pulled live from Lovable Cloud.</p>

      <div className="mt-5 space-y-3">
        {shown.map((r) => (
          <article key={r.id} className="rounded-2xl border border-border bg-background p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg">{r.name}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${r.status === "new" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{r.status}</span>
                  {r.source && <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{r.source}</span>}
                </div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <a href={`mailto:${r.email}`} className="flex items-center gap-1 hover:text-primary"><Mail className="h-3 w-3" />{r.email}</a>
                  {r.phone && <a href={`tel:${r.phone}`} className="flex items-center gap-1 hover:text-primary"><Phone className="h-3 w-3" />{r.phone}</a>}
                  {r.city && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{r.city}</span>}
                  <time>{new Date(r.created_at).toLocaleString()}</time>
                </div>
                {r.service && <p className="mt-2 text-xs"><strong>Service:</strong> {r.service}</p>}
                <p className="mt-2 whitespace-pre-wrap text-sm">{r.message}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}
                  className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                  {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {r.status !== "responded" && (
                  <button onClick={() => setStatus(r.id, "responded")} title="Mark responded"
                    className="rounded p-1.5 text-primary hover:bg-primary/10"><CheckCircle2 className="h-4 w-4" /></button>
                )}
                <button onClick={() => remove(r.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </article>
        ))}
        {!shown.length && <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No inquiries here.</p>}
      </div>
    </div>
  );
}
