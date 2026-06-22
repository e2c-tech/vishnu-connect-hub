import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sri Vishnu Consol Pvt Ltd" },
      { name: "description", content: "Get in touch with Sri Vishnu Consol for construction, scaffolding and project management enquiries." },
      { property: "og:title", content: "Contact Sri Vishnu Consol" },
      { property: "og:description", content: "Tell us about your project — we respond within one business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Contact" title={<>LET'S BUILD<br/>SOMETHING.</>}>
        Tell us about your site, scope and timeline. We respond within one business day.
      </SectionHeading>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          {[
            { Icon: MapPin, label: "Office", value: COMPANY.address },
            { Icon: Phone, label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g,"")}` },
            { Icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
          ].map(({ Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-4 rounded-md border border-border p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Icon className="h-5 w-5" /></div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
                {href ? <a href={href} className="font-medium hover:text-primary">{value}</a> : <div className="font-medium">{value}</div>}
              </div>
            </div>
          ))}
          <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer"
             className="flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-semibold text-white hover:opacity-90">
            Chat with us on WhatsApp
          </a>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-md border border-border bg-background p-6 sm:p-8"
        >
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-display text-2xl">Message sent</h3>
              <p className="mt-2 text-sm text-muted-foreground">Thanks for reaching out — we'll get back to you shortly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Company" name="company" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <Field label="Project type" name="type" placeholder="Commercial / Residential / Industrial / Scaffolding" />
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea name="message" required rows={5}
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <button type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">
                Send message <Send className="h-4 w-4" />
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input {...props}
             className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}
