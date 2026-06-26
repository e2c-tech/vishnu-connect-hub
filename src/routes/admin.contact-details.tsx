import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ContactInfo } from "@/lib/cms-types";
import { AdminSaveBar, Field, inputCls, textareaCls } from "@/components/admin/ui";
import { DEFAULT_CONTACT_INFO } from "@/lib/site-branding";
import { invalidateSiteBrandingCache } from "@/lib/use-site-branding";
import { fetchAdminBrandingState, patchAndSaveBranding } from "@/lib/site-branding-storage";

export const Route = createFileRoute("/admin/contact-details")({ component: AdminContactDetails });

function AdminContactDetails() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminBrandingState().then(({ payload }) => {
      setContactInfo(payload.contact_info);
    });
  }, []);

  const save = async () => {
    setErr(null);
    setBusy(true);
    setSaved(false);
    const { error } = await patchAndSaveBranding({ contact_info: contactInfo });
    setBusy(false);
    if (error) {
      setErr(error);
      return;
    }
    invalidateSiteBrandingCache();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl uppercase">Contact details</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Head office, phone, email and CIN shown on the contact page, footer and WhatsApp button.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-background p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone"><input className={inputCls} value={contactInfo.phone} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} /></Field>
          <Field label="Email"><input className={inputCls} type="email" value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} /></Field>
          <Field label="CIN"><input className={inputCls} value={contactInfo.cin} onChange={(e) => setContactInfo({ ...contactInfo, cin: e.target.value })} /></Field>
          <Field label="WhatsApp number" hint="Country code + number, no + or spaces — e.g. 919845000000">
            <input className={inputCls} value={contactInfo.whatsapp} onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })} />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Head office address" hint="One line per row — shown as separate lines on the contact page.">
            <textarea
              className={textareaCls}
              rows={5}
              value={contactInfo.address_lines.join("\n")}
              onChange={(e) => setContactInfo({ ...contactInfo, address_lines: e.target.value.split("\n") })}
            />
          </Field>
        </div>
      </section>

      <AdminSaveBar err={err} saved={saved} busy={busy} onSave={save} label="Save contact details" />
    </div>
  );
}
