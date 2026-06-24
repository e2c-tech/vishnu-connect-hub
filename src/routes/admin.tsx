import { createFileRoute, Link, Outlet, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, Building2, Newspaper, MessageSquareQuote, Info, Users, Inbox,
  Settings as SettingsIcon, LogOut, ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/auth" });
  },
  head: () => ({
    meta: [
      { title: "Admin — Sri Vishnu Consol" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Projects", Icon: Building2 },
  { to: "/admin/blogs", label: "Blogs", Icon: Newspaper },
  { to: "/admin/testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { to: "/admin/about", label: "About", Icon: Info },
  { to: "/admin/founders", label: "Founders", Icon: Users },
  { to: "/admin/submissions", label: "Inquiries", Icon: Inbox },
  { to: "/admin/settings", label: "Hero / Settings", Icon: SettingsIcon },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate({ to: "/auth" }); return; }
      setEmail(user.email ?? "");
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      setIsAdmin((roles ?? []).some((r) => r.role === "admin"));
    })();
  }, [navigate]);

  const signOut = async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); };

  if (isAdmin === null) {
    return <div className="p-10 text-sm text-muted-foreground">Loading admin…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 font-display text-2xl uppercase">Not authorised</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account ({email}) is signed in but does not have admin access. Only <strong>info@sriv.com</strong> is configured as an admin for this site.
        </p>
        <button onClick={signOut} className="mt-6 rounded-md bg-foreground px-5 py-2 text-sm font-semibold text-background">Sign out</button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl border border-border bg-background p-4 md:sticky md:top-20 md:self-start">
        <div className="mb-4 px-2">
          <div className="font-display text-sm uppercase tracking-widest">Admin CMS</div>
          <div className="truncate text-[11px] text-muted-foreground">{email}</div>
        </div>
        <nav className="space-y-0.5">
          {NAV.map(({ to, label, Icon, exact }) => (
            <Link key={to} to={to}
              activeOptions={{ exact: !!exact }}
              activeProps={{ className: "bg-primary/15 text-primary" }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <button onClick={signOut}
          className="mt-4 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>
      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
