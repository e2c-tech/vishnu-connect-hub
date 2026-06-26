import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ServiceCard } from "@/lib/cms-types";
import { AdminSaveBar, ColorField, Field, GhostBtn, inputCls, textareaCls } from "@/components/admin/ui";
import { DEFAULT_SERVICE_CARDS, SERVICE_ICON_OPTIONS } from "@/lib/site-branding";
import { invalidateSiteBrandingCache } from "@/lib/use-site-branding";
import { fetchAdminBrandingState, patchAndSaveBranding } from "@/lib/site-branding-storage";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/homepage-services")({ component: AdminHomepageServices });

function AdminHomepageServices() {
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>(DEFAULT_SERVICE_CARDS);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminBrandingState().then(({ payload }) => {
      if (payload.service_cards.length) setServiceCards(payload.service_cards);
    });
  }, []);

  const save = async () => {
    setErr(null);
    setBusy(true);
    setSaved(false);
    const { error } = await patchAndSaveBranding({ service_cards: serviceCards });
    setBusy(false);
    if (error) {
      setErr(error);
      return;
    }
    invalidateSiteBrandingCache();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addCard = () => setServiceCards([...serviceCards, { title: "", body: "", icon: "HardHat", bg_color: "#f5b400" }]);
  const updCard = (i: number, p: Partial<ServiceCard>) => setServiceCards(serviceCards.map((c, idx) => (idx === i ? { ...c, ...p } : c)));
  const delCard = (i: number) => setServiceCards(serviceCards.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl uppercase">Homepage services</h1>
          <p className="mt-1 text-sm text-muted-foreground">Orange cards in the homepage “Our Services” section.</p>
        </div>
        <GhostBtn onClick={addCard}><Plus className="mr-1 inline h-4 w-4" />Add service</GhostBtn>
      </div>

      <div className="space-y-4">
        {serviceCards.map((c, i) => (
          <div key={i} className="rounded-2xl border border-border bg-background p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Service {i + 1}</span>
              <button onClick={() => delCard(i)} className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title"><input className={inputCls} value={c.title} onChange={(e) => updCard(i, { title: e.target.value })} /></Field>
              <Field label="Icon">
                <select className={inputCls} value={c.icon} onChange={(e) => updCard(i, { icon: e.target.value })}>
                  {SERVICE_ICON_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Description"><textarea className={textareaCls} rows={2} value={c.body} onChange={(e) => updCard(i, { body: e.target.value })} /></Field>
            <ColorField label="Card background colour" value={c.bg_color} onChange={(v) => updCard(i, { bg_color: v })} />
          </div>
        ))}
        {!serviceCards.length && <p className="text-sm text-muted-foreground">No services yet.</p>}
      </div>

      <AdminSaveBar err={err} saved={saved} busy={busy} onSave={save} label="Save services" />
    </div>
  );
}
