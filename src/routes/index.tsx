import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HardHat, Building2, Leaf, ShieldCheck } from "lucide-react";
import skyline from "@/assets/hero-skyline.jpg";
import construction from "@/assets/about-construction.jpg";
import { PROJECTS, TESTIMONIALS, VIDEO_TESTIMONIALS, COMPANY } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Vishnu Consol Pvt Ltd — Crafting Quality Structures for Tomorrow" },
      { name: "description", content: "Engineering, construction, scaffolding and project management services. 25+ projects delivered across India." },
      { property: "og:title", content: "Sri Vishnu Consol Pvt Ltd" },
      { property: "og:description", content: "Crafting Quality Structures for Tomorrow." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[oklch(0.93_0_0)]">
        <img src={skyline} alt="" aria-hidden
             className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 pb-44 pt-16 sm:px-6 sm:pb-56 sm:pt-24">
          <div className="absolute right-4 top-6 hidden sm:block text-right">
            <div className="text-2xl font-black tracking-tight text-primary">»»»</div>
            <a href={`https://${COMPANY.website}`} className="mt-3 inline-block text-sm font-semibold">
              {COMPANY.website}
            </a>
          </div>

          <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl md:text-8xl">
            SRI VISHNU
          </h1>
          <div className="mt-3 font-display text-xl tracking-[0.25em] sm:text-2xl">
            CONSOL PVT LTD
          </div>
          <div className="mt-8 inline-block bg-primary px-5 py-3">
            <span className="font-display text-sm uppercase tracking-wider sm:text-base">
              {COMPANY.tagline}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background hover:opacity-90">
              View our work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-background/80 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-background">
              Start a project
            </Link>
          </div>
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
              <p className="mt-1">To be the world's leading engineering, construction and project management company — recognized for outstanding client outcomes and rewarding careers.</p>
            </div>
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Learn more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <img src={construction} alt="Construction site with tower cranes" className="h-full w-full rounded-md object-cover" loading="lazy" width={1280} height={1024} />
          <div className="absolute -left-4 top-10 hidden bg-primary p-6 text-primary-foreground shadow-xl md:block">
            <div className="font-display text-5xl">25+</div>
            <div className="mt-1 text-sm">Projects<br/>Completed</div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="bg-[oklch(0.98_0_0)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="What We Offer" title="OUR SERVICES" align="center">
            Comprehensive construction expertise — from concept through completion.
          </SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { Icon: HardHat, title: "Design & Planning", body: "Comprehensive design and planning services including scaffolding design and access planning — balancing functionality, aesthetics, and cost." },
              { Icon: Building2, title: "Project Management", body: "End-to-end construction management, site supervision, scaffolding rental and erection, subcontractor coordination, quality control, and progress reporting." },
              { Icon: Leaf, title: "Green Building Solutions", body: "Eco-friendly materials, energy-efficient systems, and sustainable methods that meet international standards while ensuring cost-effectiveness." },
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
          <SectionHeading eyebrow="Portfolio" title={<>OUR<br/>PROJECTS</>} />
          <Link to="/projects" className="hidden text-sm font-semibold text-primary hover:underline sm:inline-flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(0, 3).map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group block overflow-hidden rounded-md border border-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={1280} height={800} />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</div>
                <h3 className="mt-2 font-display text-lg leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-foreground py-20 text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Testimonials" title="WHAT CLIENTS SAY" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-md border border-white/10 bg-white/5 p-6">
                <div className="text-3xl text-primary">"</div>
                <blockquote className="mt-2 text-sm leading-relaxed text-background/90">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <div className="font-display text-sm">{t.name}</div>
                  <div className="text-xs text-background/60">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
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
