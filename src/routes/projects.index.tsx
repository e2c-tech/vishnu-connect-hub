import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import projectsHero from "@/assets/projects-hero.jpg";
import { PROJECTS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

type ProjectCard = {
  slug: string; title: string; category: string; location: string; year: string;
  shortDescription: string; cover: string;
};

async function loadProjects(): Promise<ProjectCard[]> {
  try {
    const { data } = await supabase
      .from("projects")
      .select("slug,title,category,location,year,short_description,cover_url,published,sort_order")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("year", { ascending: false });
    if (data && data.length) {
      return data.map((p) => ({
        slug: p.slug, title: p.title, category: p.category ?? "", location: p.location ?? "",
        year: p.year ?? "", shortDescription: p.short_description ?? "", cover: p.cover_url ?? "",
      }));
    }
  } catch {/* fallback */}
  return PROJECTS.map((p) => ({
    slug: p.slug, title: p.title, category: p.category, location: p.location,
    year: p.year, shortDescription: p.shortDescription, cover: p.cover,
  }));
}

export const Route = createFileRoute("/projects/")({
  loader: async () => ({ projects: await loadProjects() }),
  head: () => ({
    meta: [
      { title: "Projects — Sri Vishnu Consol Pvt Ltd" },
      { name: "description", content: "Explore landmark projects delivered by Sri Vishnu Consol — commercial, residential, institutional, industrial and infrastructure." },
      { property: "og:title", content: "Our Projects — Sri Vishnu Consol" },
      { property: "og:description", content: "A portfolio of construction excellence across India." },
    ],
  }),
  errorComponent: ({ error }) => <div className="p-12 text-center text-sm text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => <div className="p-12 text-center">No projects.</div>,
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const { projects } = Route.useLoaderData();
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
          {projects.map((p: ProjectCard) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }}
                  className="group flex flex-col overflow-hidden rounded-md border border-border bg-background transition-shadow hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {p.cover && <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={1280} height={800} />}
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
