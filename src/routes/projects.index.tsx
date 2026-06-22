import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import projectsHero from "@/assets/projects-hero.jpg";
import { PROJECTS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Sri Vishnu Consol Pvt Ltd" },
      { name: "description", content: "Explore landmark projects delivered by Sri Vishnu Consol — commercial, residential, institutional, industrial and infrastructure." },
      { property: "og:title", content: "Our Projects" },
      { property: "og:description", content: "A portfolio of construction excellence across India." },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Portfolio" title={<>OUR<br/>PROJECTS</>}>
            From premium residential to large-scale infrastructure — every project executed with precision and safety.
          </SectionHeading>
        </div>
        <img src={projectsHero} alt="Engineers reviewing blueprints" className="aspect-[4/3] w-full rounded-md object-cover" loading="lazy" width={1280} height={1024} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }}
                  className="group flex flex-col overflow-hidden rounded-md border border-border bg-background transition-shadow hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={1280} height={800} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest">
                  <span className="text-primary">{p.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" />{p.year}</span>
                </div>
                <h3 className="mt-2 font-display text-lg leading-tight">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />{p.location}
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{p.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
