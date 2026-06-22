import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-srivishnu.png";
import { COMPANY } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-[oklch(0.16_0_0)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-auto" />
            <div className="leading-tight">
              <div className="font-display">SRI VISHNU</div>
              <div className="text-[10px] tracking-[0.2em] text-white/60">CONSOL PVT LTD</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70">{COMPANY.tagline}.</p>
          <p className="mt-4 text-xs text-white/50">
            CIN: <span className="text-white/80">{COMPANY.cin}</span>
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
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-widest">LEGAL</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-widest">CONTACT</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" />{COMPANY.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{COMPANY.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />{COMPANY.email}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[
              { href: COMPANY.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: COMPANY.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: COMPANY.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: COMPANY.social.youtube, Icon: Youtube, label: "YouTube" },
              { href: COMPANY.social.twitter, Icon: Twitter, label: "Twitter" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                 className="rounded-full border border-white/15 p-2 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
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
