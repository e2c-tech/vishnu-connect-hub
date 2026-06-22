import { createFileRoute } from "@tanstack/react-router";
import construction from "@/assets/about-construction.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sri Vishnu Consol Pvt Ltd" },
      { name: "description", content: "Founded on integrity and engineering excellence — meet the team behind Sri Vishnu Consol Pvt Ltd." },
      { property: "og:title", content: "About Sri Vishnu Consol" },
      { property: "og:description", content: "Mission, vision, leadership and values." },
    ],
  }),
  component: AboutPage,
});

const TEAM = [
  {
    name: "VIJAY KUMAR",
    role: "Founder & Partner",
    bio: "Vijay is a Founder and Partner at our company where he shapes financial strategy and investment direction. With comprehensive expertise in operational risk management, finance, and corporate governance, he brings a wealth of knowledge to day-to-day operations and long-term planning. His proactive approach to identifying and mitigating risk has helped navigate complex market conditions while maintaining our competitive edge.",
  },
  {
    name: "PRAVEEN BV",
    role: "Managing Partner",
    bio: "With 25 years in project management, Praveen has worked with respected industry names including BL Kashyap and Afcons Infrastructure. His experience covers commercial and residential buildings, industrial facilities, roads, and bridges. As Managing Partner he focuses on sound financial planning, practical budgeting, and continuous improvement — delivering excellent client results without compromising quality or budget.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="About Us" title="ABOUT US" />
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="font-display text-xl">Mission</h3>
              <p className="mt-2 text-muted-foreground">
                {COMPANY.name} operates with unwavering integrity and professionalism, cultivating excellence in every project we undertake. We deliver superior client service, drive industry innovation, and expand our capabilities to address emerging market needs and client requirements.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl">Vision</h3>
              <p className="mt-2 text-muted-foreground">
                To be the world's leading engineering, construction, and project management company, recognized for delivering outstanding client outcomes and fostering rewarding careers for our team members. We are committed to providing timely, value-driven, and optimized solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={construction} alt="Construction site" className="h-full w-full rounded-md object-cover" loading="lazy" width={1280} height={1024} />
          <div className="absolute -left-4 top-10 bg-primary p-6 text-primary-foreground shadow-xl">
            <div className="font-display text-5xl">25+</div>
            <div className="mt-1 text-sm">Projects<br/>Completed</div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[oklch(0.98_0_0)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Leadership" title="OUR PARTNERS" align="center" />
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {TEAM.map((m) => (
              <article key={m.name} className="rounded-md border border-border bg-background p-8">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-3xl">
                  {m.name.split(" ").map(w => w[0]).join("").slice(0,2)}
                </div>
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
