import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HardHat, Building2, Leaf, ShieldCheck, MapPin, Calendar } from "lucide-react";
import construction from "@/assets/about-construction.jpg";
import { PROJECTS, VIDEO_TESTIMONIALS, COMPANY, SEO_KEYWORDS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { TestimonialsMarquee } from "@/components/site/TestimonialsMarquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Vishnu Consol Pvt Ltd — Scaffolding & Construction Contractor in Bangalore, India" },
      { name: "description", content: "Sri Vishnu Consol Pvt Ltd — leading scaffolding, construction, building and interior contractor serving Bangalore, Mysore, Mumbai, Pune, Chennai, Hyderabad, Kolkata, Noida and Mangalore. 25+ landmark projects delivered." },
      { name: "keywords", content: SEO_KEYWORDS },
      { property: "og:title", content: "Sri Vishnu Consol Pvt Ltd — Scaffolding & Construction Contractor" },
      { property: "og:description", content: "Scaffolding, construction, building and interiors across India. Crafting Quality Structures for Tomorrow." },
      { property: "og:type", content: "website" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        name: COMPANY.name,
        url: `https://${COMPANY.website}`,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "No. 16, 1st Cross, ITI Layout, Nayandahalli",
          addressLocality: "Bangalore",
          postalCode: "560039",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        areaServed: COMPANY.cities,
        identifier: COMPANY.cin,
      }),
    }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden text-white min-h-[640px] flex items-center">
        <HeroCarousel />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 sm:py-36">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            Since 2012 · CIN {COMPANY.cin}
          </span>
          <h1 className="mt-5 font-display text-5xl uppercase leading-[0.95] sm:text-7xl md:text-8xl">
            SRI VISHNU<br />
            <span className="text-primary">CONSOL</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            Scaffolding, construction, building &amp; interior contractor —
            delivering landmark projects across Bangalore, Mumbai, Pune, Chennai, Hyderabad, Kolkata, Noida, Mysore &amp; Mangalore.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              View our work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-[oklch(0.98_0_0)]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[
            { k: "25+", v: "Projects Delivered" },
            { k: "12+", v: "Years of Excellence" },
            { k: "9", v: "Cities Across India" },
            { k: "100%", v: "Safety Record" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-display text-4xl text-primary sm:text-5xl">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="About Us" title={<>WE BUILD<br/>WITH INTEGRITY.</>}>
            {COMPANY.name} operates with unwavering integrity and professionalism, cultivating excellence in every project we undertake.
          </SectionHeading>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h3 className="text-foreground font-display text-base">Mission</h3>
              <p className="mt-1">We deliver superior client service, drive industry innovation, and expand our capabilities to address emerging market needs and client requirements.</p>
            </div>
            <div>
              <h3 className="text-foreground font-display text-base">Vision</h3>
              <p className="mt-1">To be India's leading engineering, construction and project management company — recognised for outstanding client outcomes and rewarding careers.</p>
            </div>
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Learn more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <img src={construction} alt="Sri Vishnu Consol construction site" className="h-full w-full rounded-md object-cover" loading="lazy" width={1280} height={1024} />
          <div className="absolute -left-4 top-10 hidden bg-primary p-6 text-primary-foreground shadow-xl md:block">
            <div className="font-display text-5xl">25+</div>
            <div className="mt-1 text-sm">Projects<br/>Completed</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[oklch(0.98_0_0)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="What We Offer" title="OUR SERVICES" align="center">
            Comprehensive construction expertise — from concept through completion.
          </SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { Icon: HardHat, title: "Scaffolding & Access", body: "System scaffolding design, supply and erection — cuplock, ringlock, cantilever, suspended platforms and BMU coordination." },
              { Icon: Building2, title: "Construction & Civil", body: "Turnkey general contracting for commercial, residential, institutional, industrial and infrastructure projects." },
              { Icon: Leaf, title: "Interiors & Fit-out", body: "Office, retail, hospitality and healthcare interiors — ceilings, flooring, MEP integration and joinery." },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="group relative overflow-hidden rounded-md bg-primary p-8 text-primary-foreground transition-transform hover:-translate-y-1">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl uppercase">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Portfolio" title={<>FEATURED<br/>PROJECTS</>} />
          <Link to="/projects" className="hidden text-sm font-semibold text-primary hover:underline sm:inline-flex items-center gap-1">
            View all 25 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(0, 6).map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group block overflow-hidden rounded-md border border-border hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={1280} height={800} />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest">
                  <span className="text-primary">{p.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" />{p.year}</span>
                </div>
                <h3 className="mt-2 font-display text-lg leading-tight">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{p.location}</div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-foreground py-20 text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Testimonials" title="WHAT CLIENTS SAY" align="center" />
        </div>
        <div className="mt-12">
          <TestimonialsMarquee />
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          {VIDEO_TESTIMONIALS.map((v) => (
            <div key={v.name} className="overflow-hidden rounded-md border border-white/10 bg-black">
              <div className="aspect-video">
                <iframe className="h-full w-full" src={v.embedUrl} title={v.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
              </div>
              <div className="p-4">
                <div className="font-display text-sm">{v.name}</div>
                <div className="text-xs text-background/60">{v.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-md border border-border bg-primary/10 p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <ShieldCheck className="h-4 w-4" /> Trusted construction partner
            </div>
            <h2 className="mt-3 font-display text-3xl uppercase sm:text-4xl">Have a project in mind?</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Tell us about your site, scope, and timeline — our team will respond within one business day.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 font-semibold text-background hover:opacity-90">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
