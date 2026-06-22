import { createFileRoute } from "@tanstack/react-router";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Sri Vishnu Consol" },
      { name: "description", content: "Terms governing the use of the Sri Vishnu Consol website and engagement of services." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl uppercase">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-sm leading-relaxed text-foreground/90">
        <p>These Terms &amp; Conditions ("Terms") govern your access to and use of the website operated by {COMPANY.name} (CIN: {COMPANY.cin}) ("Company", "we", "our", or "us"), and any services, content, or features made available through it. By accessing or using this website you agree to be bound by these Terms.</p>

        <h2 className="font-display text-xl">1. Use of the Website</h2>
        <p>You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of the website. Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</p>

        <h2 className="font-display text-xl">2. Intellectual Property</h2>
        <p>All content, design, graphics, logos, images, project descriptions, and software on this website are the property of {COMPANY.name} or its licensors and are protected by Indian and international copyright laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>

        <h2 className="font-display text-xl">3. Project Information</h2>
        <p>Project descriptions, images, and case studies are provided for informational purposes. Specific scopes, schedules, and commercial terms for any engagement are governed by a separately executed written agreement.</p>

        <h2 className="font-display text-xl">4. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, the Company will not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of, or inability to use, the website. Information on the website is provided "as is" without warranties of any kind, express or implied.</p>

        <h2 className="font-display text-xl">5. Third-Party Links</h2>
        <p>The website may contain links to third-party websites. We do not control and are not responsible for the content, policies, or practices of any third-party site.</p>

        <h2 className="font-display text-xl">6. Governing Law</h2>
        <p>These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms is subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.</p>

        <h2 className="font-display text-xl">7. Changes</h2>
        <p>We may revise these Terms at any time by updating this page. Your continued use of the website constitutes acceptance of the revised Terms.</p>

        <h2 className="font-display text-xl">8. Contact</h2>
        <p>Questions about these Terms can be sent to <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a>.</p>
      </div>
    </article>
  );
}
