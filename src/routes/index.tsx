import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, MapPin, Calendar } from "lucide-react";
import { PROJECTS, TESTIMONIALS, VIDEO_TESTIMONIALS, COMPANY, SEO_KEYWORDS } from "@/lib/site-data";
import type { Testimonial as TextTestimonial, VideoTestimonial } from "@/lib/site-data";
import { fetchAboutContent, type AboutView } from "@/lib/about-content";
import { resolveServiceIcon, DEFAULT_HOME_CTA } from "@/lib/site-branding";
import { useSiteBranding } from "@/lib/use-site-branding";
import { RichHtml } from "@/components/admin/RichTextEditor";
import { AboutContentSkeleton, AboutImageSkeleton } from "@/components/site/AboutContentSkeleton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { TestimonialsMarquee } from "@/components/site/TestimonialsMarquee";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import type { StatItem } from "@/lib/cms-types";
import { toVideoEmbedUrl } from "@/lib/video-embed";
import { visibleStats } from "@/lib/site-branding-storage";

const richProse = "prose prose-sm max-w-none leading-relaxed text-muted-foreground dark:prose-invert";

const DEFAULT_STATS: StatItem[] = [
  { value: "25+", label: "Projects Delivered" },
  { value: "12+", label: "Years of Excellence" },
  { value: "9", label: "Cities Across India" },
  { value: "100%", label: "Safety Record" },
];

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

type FeaturedProject = { slug: string; title: string; category: string; location: string; year: string; shortDescription: string; cover: string };

function HomePage() {
  const { serviceCards, homeCta, loaded: brandingLoaded } = useSiteBranding();
  const cta = homeCta ?? DEFAULT_HOME_CTA;
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);
  const [about, setAbout] = useState<AboutView | null>(null);
  const [featured, setFeatured] = useState<FeaturedProject[]>(
    PROJECTS.slice(0, 6).map((p) => ({ slug: p.slug, title: p.title, category: p.category, location: p.location, year: p.year, shortDescription: p.shortDescription, cover: p.cover })),
  );
  const [textTestimonials, setTextTestimonials] = useState<TextTestimonial[]>(TESTIMONIALS);
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>(VIDEO_TESTIMONIALS);
  useEffect(() => {
    supabase.from("site_settings").select("stats").eq("id", 1).maybeSingle().then(({ data }) => {
      const s = visibleStats((data?.stats ?? []) as unknown as StatItem[]);
      if (Array.isArray(s) && s.length) setStats(s);
    });
    fetchAboutContent().then(setAbout);
    supabase.from("projects").select("slug,title,category,location,year,short_description,cover_url,sort_order").eq("published", true).order("sort_order", { ascending: true }).order("year", { ascending: false }).limit(6).then(({ data }) => {
      if (data && data.length) {
        setFeatured(data.map((p) => ({ slug: p.slug, title: p.title, category: p.category ?? "", location: p.location ?? "", year: p.year ?? "", shortDescription: p.short_description ?? "", cover: p.cover_url ?? "" })));
      }
    });
    supabase
      .from("testimonials")
      .select("name,role,quote,kind,video_embed_url,sort_order")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (!data?.length) return;
        const text = data
          .filter((t) => t.kind === "text" && t.quote)
          .map((t) => ({ name: t.name, role: t.role ?? "", quote: t.quote ?? "" }));
        const video = data
          .filter((t) => t.kind === "video" && t.video_embed_url)
          .map((t) => {
            const embedUrl = toVideoEmbedUrl(t.video_embed_url ?? "");
            return embedUrl ? { name: t.name, role: t.role ?? "", embedUrl } : null;
          })
          .filter((t): t is VideoTestimonial => t !== null);
        if (text.length) setTextTestimonials(text);
        if (video.length) setVideoTestimonials(video);
      });
  }, []);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden text-white min-h-[640px] flex items-center py-28 sm:py-36">
        <HeroCarousel />
        <div className="relative z-10 mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6">
          <div className="mt-10 flex flex-wrap gap-3">
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
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl text-primary sm:text-5xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          {!about ? (
            <AboutContentSkeleton />
          ) : (
            <>
              <SectionHeading eyebrow="About Us" title={about.heading} />
              {about.intro && <RichHtml html={about.intro} className={`${richProse} mt-4 max-w-2xl`} />}
              <div className="mt-8 space-y-6 text-sm">
                {about.mission && (
                  <div>
                    <h3 className="text-foreground font-display text-base">Mission</h3>
                    <RichHtml html={about.mission} className={`${richProse} mt-1`} />
                  </div>
                )}
                {about.vision && (
                  <div>
                    <h3 className="text-foreground font-display text-base">Vision</h3>
                    <RichHtml html={about.vision} className={`${richProse} mt-1`} />
                  </div>
                )}
              </div>
              <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
        <div className="relative">
          {!about ? (
            <AboutImageSkeleton />
          ) : (
            <>
              <img src={about.image} alt="Sri Vishnu Consol construction site" className="h-full w-full rounded-md object-cover" loading="lazy" width={1280} height={1024} />
              <div className="absolute -left-4 top-10 hidden bg-primary p-6 text-primary-foreground shadow-xl md:block">
                <div className="font-display text-5xl">25+</div>
                <div className="mt-1 text-sm">Projects<br/>Completed</div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[oklch(0.98_0_0)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="What We Offer" title="OUR SERVICES" align="center">
            Comprehensive construction expertise — from concept through completion.
          </SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {!brandingLoaded ? (
              <>
                <Skeleton className="h-56 rounded-md" />
                <Skeleton className="h-56 rounded-md" />
                <Skeleton className="h-56 rounded-md" />
              </>
            ) : (
              serviceCards.map((card) => {
                const Icon = resolveServiceIcon(card.icon);
                return (
                  <div
                    key={card.title}
                    className="group relative overflow-hidden rounded-md p-8 text-white transition-transform hover:-translate-y-1"
                    style={{ backgroundColor: card.bg_color }}
                  >
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-display text-xl uppercase">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/90">{card.body}</p>
                  </div>
                );
              })
            )}
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
          {featured.map((p) => (
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
          <TestimonialsMarquee items={textTestimonials} />
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          {videoTestimonials.map((v) => (
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
        {!brandingLoaded ? (
          <Skeleton className="h-48 w-full rounded-md" />
        ) : (
          <div
            className="flex flex-col items-start gap-6 rounded-md border border-border p-10 md:flex-row md:items-center md:justify-between"
            style={{ backgroundColor: cta.bg_color }}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <ShieldCheck className="h-4 w-4" /> {cta.eyebrow}
              </div>
              <h2 className="mt-3 font-display text-3xl uppercase sm:text-4xl">{cta.title}</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">{cta.description}</p>
            </div>
            <Link to={cta.button_url} className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 font-semibold text-background hover:opacity-90">
              {cta.button_text} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
