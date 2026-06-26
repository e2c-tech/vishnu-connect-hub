import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { BrandWordmark } from "@/components/site/BrandWordmark";
import { COMPANY } from "@/lib/site-data";
import { DEFAULT_CONTACT_INFO, DEFAULT_FOOTER_WORDMARK, resolveSocialIcon } from "@/lib/site-branding";
import { useSiteBranding } from "@/lib/use-site-branding";

export function Footer() {
  const { logoUrl, footerWordmark, contactInfo, serviceCities, socialLinks, loaded } = useSiteBranding();
  const wordmark = footerWordmark ?? DEFAULT_FOOTER_WORDMARK;
  const contact = contactInfo ?? DEFAULT_CONTACT_INFO;

  return (
    <footer className="mt-20 border-t border-border bg-[oklch(0.16_0_0)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            {loaded && logoUrl && <img src={logoUrl} alt="" className="h-12 w-auto" />}
            {loaded && (
              <BrandWordmark wordmark={wordmark} line1ClassName="font-display" line2ClassName="text-[10px] tracking-[0.2em]" />
            )}
          </div>
          <p className="mt-4 text-sm text-white/70">{COMPANY.tagline}.</p>
          <p className="mt-4 text-xs text-white/50">
            CIN: <span className="text-white/80">{contact.cin}</span>
          </p>
          <p className="mt-2 text-xs text-white/50">
            GST/PAN registered Indian Private Limited Company.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-widest">EXPLORE</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-widest">SERVING ACROSS</h4>
          {loaded && (
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-white/70">
              {serviceCities.map((c) => (
                <li key={c.name}>{c.name}</li>
              ))}
            </ul>
          )}
          <h4 className="mt-6 font-display text-sm tracking-widest">SERVICES</h4>
          <p className="mt-3 text-sm text-white/70">{COMPANY.services.join(" · ")}</p>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-widest">CONTACT</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="leading-relaxed">
                {contact.address_lines.filter(Boolean).map((l, i) => (
                  <span key={i} className="block">{l}</span>
                ))}
              </span>
            </li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{contact.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />{contact.email}</li>
          </ul>
          {loaded && (
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map(({ platform, url }, i) => {
                const Icon = resolveSocialIcon(platform);
                const label = platform.charAt(0).toUpperCase() + platform.slice(1);
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                     className="rounded-full border border-white/15 p-2 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>{COMPANY.website}</span>
        </div>
      </div>
    </footer>
  );
}
