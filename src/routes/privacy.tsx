import { createFileRoute } from "@tanstack/react-router";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sri Vishnu Consol" },
      { name: "description", content: "How Sri Vishnu Consol collects, uses and protects personal information submitted through this website." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl uppercase">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-sm leading-relaxed text-foreground/90">
        <p>This Privacy Policy explains how {COMPANY.name} (CIN: {COMPANY.cin}) ("we", "our", "us") collects, uses and protects information you provide when you use this website. This page is maintained by {COMPANY.name} to answer common privacy questions about its website.</p>

        <h2 className="font-display text-xl">1. Information We Collect</h2>
        <p>We collect information you voluntarily submit through forms on this website, such as your name, email address, phone number, company name, and the contents of your enquiry. We may also collect non-identifying technical information such as browser type, device, and pages visited.</p>

        <h2 className="font-display text-xl">2. How We Use Information</h2>
        <p>We use the information you provide to respond to your enquiries, follow up on potential engagements, send project-related communications, and improve the website. We do not sell your personal information.</p>

        <h2 className="font-display text-xl">3. Cookies &amp; Analytics</h2>
        <p>The website may use cookies and similar technologies to remember preferences and measure aggregated traffic. You can disable cookies in your browser, but some parts of the website may not function as intended.</p>

        <h2 className="font-display text-xl">4. Sharing of Information</h2>
        <p>We share personal information only with service providers who help us operate the website and respond to enquiries, and only to the extent necessary. We may also disclose information if required to do so by law.</p>

        <h2 className="font-display text-xl">5. Data Retention</h2>
        <p>We retain personal information only for as long as is necessary for the purposes set out in this policy, or as required by applicable law.</p>

        <h2 className="font-display text-xl">6. Security</h2>
        <p>We implement reasonable technical and organisational measures designed to protect personal information from unauthorised access, alteration, disclosure, or destruction. No internet transmission is fully secure, and you provide information at your own risk.</p>

        <h2 className="font-display text-xl">7. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of the personal information you have submitted to us by emailing <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a>.</p>

        <h2 className="font-display text-xl">8. Updates</h2>
        <p>We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last updated" date above.</p>

        <h2 className="font-display text-xl">9. Contact</h2>
        <p>For any privacy-related questions, please contact us at <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a>.</p>
      </div>
    </article>
  );
}
