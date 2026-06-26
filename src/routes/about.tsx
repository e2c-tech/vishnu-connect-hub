import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RichHtml } from "@/components/admin/RichTextEditor";
import { AboutContentSkeleton, AboutImageSkeleton } from "@/components/site/AboutContentSkeleton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchAboutContent,
  fetchFounders,
  type AboutView,
  type FounderView,
} from "@/lib/about-content";

const richProse = "prose prose-sm mt-2 max-w-none leading-relaxed text-muted-foreground dark:prose-invert";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sri Vishnu Consol Pvt Ltd" },
      { name: "description", content: "Founded on integrity and engineering excellence — meet the team behind Sri Vishnu Consol Pvt Ltd." },
      { property: "og:title", content: "About Sri Vishnu Consol" },
      { property: "og:description", content: "Mission, vision, leadership and values." },
    ],
  }),
  errorComponent: ({ error }) => <div className="p-12 text-center text-sm">{error.message}</div>,
  notFoundComponent: () => <div className="p-12 text-center">Not found.</div>,
  component: AboutPage,
});

function AboutPage() {
  const [about, setAbout] = useState<AboutView | null>(null);
  const [team, setTeam] = useState<FounderView[] | null>(null);

  useEffect(() => {
    fetchAboutContent().then(setAbout);
    fetchFounders().then(setTeam);
  }, []);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          {!about ? (
            <AboutContentSkeleton />
          ) : (
            <>
              <SectionHeading eyebrow="About Us" title={about.heading} />
              {about.intro && <RichHtml html={about.intro} className={`${richProse} mt-6`} />}
              <div className="mt-8 space-y-8">
                {about.mission && (
                  <div>
                    <h3 className="font-display text-xl">Mission</h3>
                    <RichHtml html={about.mission} className={richProse} />
                  </div>
                )}
                {about.vision && (
                  <div>
                    <h3 className="font-display text-xl">Vision</h3>
                    <RichHtml html={about.vision} className={richProse} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="relative">
          {!about ? (
            <AboutImageSkeleton />
          ) : (
            <>
              <img src={about.image} alt="Sri Vishnu Consol" className="h-full w-full rounded-md object-cover" loading="lazy" width={1280} height={1024} />
              <div className="absolute -left-4 top-10 bg-primary p-6 text-primary-foreground shadow-xl">
                <div className="font-display text-5xl">25+</div>
                <div className="mt-1 text-sm">Projects<br/>Completed</div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-[oklch(0.98_0_0)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Leadership" title="OUR PARTNERS" align="center" />
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {team === null ? (
              <>
                <Skeleton className="h-80 rounded-md" />
                <Skeleton className="h-80 rounded-md" />
              </>
            ) : (
              team.map((m) => (
                <article key={m.name} className="rounded-md border border-border bg-background p-8">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="mx-auto h-32 w-32 rounded-full object-cover" loading="lazy" width={256} height={256} />
                  ) : (
                    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-3xl">
                      {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                  )}
                  <h3 className="mt-6 text-center font-display text-2xl text-primary">{m.name}</h3>
                  <div className="mt-1 text-center text-xs uppercase tracking-widest text-muted-foreground">{m.role}</div>
                  {m.bio && <RichHtml html={m.bio} className={`${richProse} mt-5 text-center`} />}
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
