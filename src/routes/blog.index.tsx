import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { POSTS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Sri Vishnu Consol Pvt Ltd" },
      { name: "description", content: "Insights from the field — scaffolding safety, green building, project management and more." },
      { property: "og:title", content: "Sri Vishnu Consol — Blog" },
      { property: "og:description", content: "Construction insights from our project teams." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Journal" title="INSIGHTS & STORIES">
        Lessons from our sites — engineering, safety, sustainability and project delivery.
      </SectionHeading>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}
                className="group flex flex-col overflow-hidden rounded-md border border-border bg-background hover:shadow-lg transition-shadow">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={1280} height={720} />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <time>{new Date(p.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</time>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readMinutes} min read</span>
              </div>
              <h3 className="mt-3 font-display text-lg leading-tight">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
