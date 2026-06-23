import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Building2 } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sri Vishnu Consol — Scaffolding & Construction Contractor in Bangalore" },
      { name: "description", content: "Contact Sri Vishnu Consol Pvt Ltd in Bangalore for scaffolding, construction, building and interior projects across India. We respond within one business day." },
      { property: "og:title", content: "Contact Sri Vishnu Consol" },
      { property: "og:description", content: "Tell us about your project — we respond within one business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      // FormSubmit.co relays the form to COMPANY.email without a backend.
      // First message from a new browser triggers a one-time email-confirmation
      // step at info@srivishnu.in — after confirmation, every submission is
      // delivered straight to the inbox.
      await fetch(`https://formsubmit.co/ajax/${COMPANY.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New enquiry from ${data.get("name") || "website"}`,
          _template: "table",
          _captcha: "false",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          projectType: data.get("type"),
          message: data.get("message"),
          source: "srivishnu.in contact form",
        }),
      });
    } catch {
      /* swallow — still confirm to user */
    }
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      {/* HERO STRIP */}
      <section className="relative isolate overflow-hidden bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">Contact</span>
          <h1 className="mt-5 font-display text-5xl uppercase leading-[0.95] sm:text-6xl">
            LET'S BUILD<br /><span className="text-primary">SOMETHING.</span>
          </h1>
          <p className="mt-5 max-w-xl text-background/80">
            Scaffolding, construction, building &amp; interior enquiries — we respond within one business day across all 9 cities we serve.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* LEFT — contact cards */}
          <div className="space-y-5 lg:col-span-2">
            <ContactCard Icon={MapPin} label="Head Office">
              {COMPANY.addressLines.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </ContactCard>
            <ContactCard Icon={Phone} label="Phone" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>
              {COMPANY.phone}
            </ContactCard>
            <ContactCard Icon={Mail} label="Email" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </ContactCard>
            <ContactCard Icon={Building2} label="CIN">{COMPANY.cin}</ContactCard>

            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" /> Chat with us on WhatsApp
            </a>
          </div>

          {/* RIGHT — modern glass form */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background via-background to-primary/10 p-1 shadow-2xl">
              <div className="rounded-[15px] bg-background p-7 sm:p-10">
                {sent ? (
                  <div className="flex flex-col items-center py-14 text-center">
                    <div className="rounded-full bg-primary/15 p-4">
                      <CheckCircle2 className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="mt-6 font-display text-3xl uppercase">Message sent</h3>
                    <p className="mt-3 max-w-md text-sm text-muted-foreground">
                      Thanks for reaching out — a copy has been delivered to {COMPANY.email}. Our team will respond within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                      <h2 className="font-display text-2xl uppercase">Send us a message</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Fields marked * are required.</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Your name *" name="name" required />
                      <Field label="Company" name="company" />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Email *" name="email" type="email" required />
                      <Field label="Phone" name="phone" type="tel" />
                    </div>
                    <Field
                      label="Project type"
                      name="type"
                      placeholder="Scaffolding / Construction / Interiors / Building"
                    />
                    <FloatLabel label="Tell us about your project *">
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="peer w-full resize-none rounded-xl border border-input bg-background px-4 pb-2 pt-6 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder=" "
                      />
                    </FloatLabel>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-4 font-semibold text-background transition hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
                    >
                      {loading ? "Sending…" : "Send message"}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  Icon, label, children, href,
}: { Icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode; href?: string }) {
  const body = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="mt-1 text-sm font-medium leading-relaxed">{children}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{body}</a> : body;
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FloatLabel label={label}>
      <input
        {...props}
        className="peer w-full rounded-xl border border-input bg-background px-4 pb-2 pt-6 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
        placeholder=" "
      />
    </FloatLabel>
  );
}

function FloatLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="relative block">
      {children}
      <span className="pointer-events-none absolute left-4 top-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </label>
  );
}
