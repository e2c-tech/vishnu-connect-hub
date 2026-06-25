import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Calendar, Briefcase } from "lucide-react";
import { PROJECTS } from "@/lib/site-data";
import { ShareButtons } from "@/components/site/ShareButtons";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    return {
      meta: [
        { title: p ? `${p.title} — Sri Vishnu Consol` : "Project" },
        { name: "description", content: p?.shortDescription ?? "" },
        { property: "og:title", content: p?.title ?? "" },
        { property: "og:description", content: p?.shortDescription ?? "" },
        ...(p ? [{ property: "og:image", content: p.cover }, { name: "twitter:image", content: p.cover }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Project not found</h1>
      <Link to="/projects" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <header className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">{project.category}</div>
        <h1 className="mt-2 font-display text-4xl uppercase sm:text-5xl">{project.title}</h1>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" />{project.location}</span>
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-primary" />{project.year}</span>
          {project.client && <span className="flex items-center gap-1"><Briefcase className="h-4 w-4 text-primary" />{project.client}</span>}
        </div>
      </header>

      <div className="mt-8 overflow-hidden rounded-md border border-border">
        <img src={project.cover} alt={project.title} className="h-auto w-full object-cover" width={1280} height={800} />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl uppercase">Project Overview</h2>
          <div className="prose prose-sm mt-4 max-w-none leading-relaxed text-muted-foreground dark:prose-invert" dangerouslySetInnerHTML={{ __html: project.description ?? "" }} />
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our scope included design coordination, scaffolding engineering, structural erection, finishing trades, and quality / safety reporting through to handover.
          </p>
        </div>
        <aside className="rounded-md border border-border bg-muted/40 p-6">
          <h3 className="font-display text-sm tracking-widest">PROJECT FACTS</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-muted-foreground">Category</dt><dd className="font-medium">{project.category}</dd></div>
            <div><dt className="text-muted-foreground">Location</dt><dd className="font-medium">{project.location}</dd></div>
            <div><dt className="text-muted-foreground">Completed</dt><dd className="font-medium">{project.year}</dd></div>
            {project.client && <div><dt className="text-muted-foreground">Client</dt><dd className="font-medium">{project.client}</dd></div>}
          </dl>
          <div className="mt-6 border-t border-border pt-5">
            <ShareButtons title={project.title} />
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl uppercase">Gallery</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.gallery.map((src: string, i: number) => (
            <div key={i} className="overflow-hidden rounded-md border border-border">
              <img src={src} alt={`${project.title} image ${i + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" width={1280} height={800} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-md border border-border bg-primary/10 p-8 text-center">
        <h3 className="font-display text-2xl uppercase">Interested in a similar project?</h3>
        <p className="mt-2 text-sm text-muted-foreground">Let's discuss your requirements.</p>
        <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 font-semibold text-background hover:opacity-90">
          Get in touch
        </Link>
      </section>
    </article>
  );
}
