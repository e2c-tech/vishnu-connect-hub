import { createFileRoute } from "@tanstack/react-router";
import construction from "@/assets/about-construction.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { COMPANY } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";

type FounderView = { name: string; role: string; bio: string; photo: string };
type AboutView = { heading: string; intro: string; mission: string; vision: string; image: string };

const DEFAULT_ABOUT: AboutView = {
  heading: "ABOUT US",
  intro: "",
  mission: `${COMPANY.name} operates with unwavering integrity and professionalism, cultivating excellence in every project we undertake. We deliver superior client service, drive industry innovation, and expand our capabilities to address emerging market needs and client requirements.`,
  vision: "To be the world's leading engineering, construction, and project management company, recognized for delivering outstanding client outcomes and fostering rewarding careers for our team members.",
  image: construction,
};

const DEFAULT_TEAM: FounderView[] = [
  { name: "VIJAY KUMAR", role: "Founder & Partner", bio: "Vijay is a Founder and Partner at our company where he shapes financial strategy and investment direction.", photo: "" },
  { name: "PRAVEEN BV", role: "Managing Partner", bio: "With 25 years in project management, Praveen has worked with respected industry names including BL Kashyap and Afcons Infrastructure.", photo: "" },
];

export const Route = createFileRoute("/about")({
  loader: async () => {
    let about = DEFAULT_ABOUT;
    let team = DEFAULT_TEAM;
    try {
      const [aboutRes, foundersRes] = await Promise.all([
        supabase.from("about_content").select("heading,intro,mission,vision,image_url").eq("id", 1).maybeSingle(),
        supabase.from("founders").select("name,title,bio,photo_url,sort_order,published").eq("published", true).order("sort_order", { ascending: true }),
      ]);
      if (aboutRes.data) {
        about = {
          heading: aboutRes.data.heading || DEFAULT_ABOUT.heading,
          intro: aboutRes.data.intro || "",
          mission: aboutRes.data.mission || DEFAULT_ABOUT.mission,
          vision: aboutRes.data.vision || DEFAULT_ABOUT.vision,
          image: aboutRes.data.image_url || construction,
        };
      }
      if (foundersRes.data && foundersRes.data.length) {
        team = foundersRes.data.map((f) => ({
          name: f.name, role: f.title ?? "", bio: f.bio ?? "", photo: f.photo_url ?? "",
        }));
      }
    } catch {/* fallback */}
    return { about, team };
  },
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
  const { about, team } = Route.useLoaderData();
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="About Us" title={about.heading} />
          {about.intro && <p className="mt-6 text-muted-foreground">{about.intro}</p>}
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="font-display text-xl">Mission</h3>
              <p className="mt-2 text-muted-foreground">{about.mission}</p>
            </div>
            <div>
              <h3 className="font-display text-xl">Vision</h3>
              <p className="mt-2 text-muted-foreground">{about.vision}</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={about.image} alt="Sri Vishnu Consol" className="h-full w-full rounded-md object-cover" loading="lazy" width={1280} height={1024} />
          <div className="absolute -left-4 top-10 bg-primary p-6 text-primary-foreground shadow-xl">
            <div className="font-display text-5xl">25+</div>
            <div className="mt-1 text-sm">Projects<br/>Completed</div>
          </div>
        </div>
      </section>

      <section className="bg-[oklch(0.98_0_0)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Leadership" title="OUR PARTNERS" align="center" />
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {team.map((m: FounderView) => (
              <article key={m.name} className="rounded-md border border-border bg-background p-8">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="mx-auto h-32 w-32 rounded-full object-cover" loading="lazy" width={256} height={256} />
                ) : (
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-3xl">
                    {m.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
                <h3 className="mt-6 text-center font-display text-2xl text-primary">{m.name}</h3>
                <div className="mt-1 text-center text-xs uppercase tracking-widest text-muted-foreground">{m.role}</div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
