import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Newspaper, Inbox, MessageSquareQuote, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, testimonials: 0, submissions: 0, newSubs: 0 });
  useEffect(() => {
    (async () => {
      const [p, b, t, s, sn] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("blogs").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setStats({
        projects: p.count ?? 0, blogs: b.count ?? 0,
        testimonials: t.count ?? 0, submissions: s.count ?? 0, newSubs: sn.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Projects", n: stats.projects, Icon: Building2, to: "/admin/projects" },
    { label: "Blog posts", n: stats.blogs, Icon: Newspaper, to: "/admin/blogs" },
    { label: "Testimonials", n: stats.testimonials, Icon: MessageSquareQuote, to: "/admin/testimonials" },
    { label: `Inquiries (${stats.newSubs} new)`, n: stats.submissions, Icon: Inbox, to: "/admin/submissions" },
  ] as const;

  return (
    <div>
      <h1 className="font-display text-3xl uppercase">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Overview of your site content and visitor inquiries.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, n, Icon, to }) => (
          <Link key={label} to={to}
            className="group rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary">
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 text-primary" />
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </div>
            <div className="mt-4 font-display text-4xl">{n}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 text-sm">
        <h2 className="font-display text-lg uppercase">Quick tips</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Add new <strong>Projects</strong> &amp; <strong>Blogs</strong> from the side menu — paste image URLs (Unsplash, Drive, your own CDN) for each cover &amp; gallery item.</li>
          <li>Update the <strong>About</strong> section, <strong>Mission/Vision</strong>, and <strong>Founder</strong> bio &amp; photo at any time.</li>
          <li>Customise the <strong>Hero tiles</strong> shown on the homepage banner via Hero / Settings.</li>
          <li>Every contact-form submission is captured in <strong>Inquiries</strong>.</li>
        </ul>
      </div>
    </div>
  );
}
