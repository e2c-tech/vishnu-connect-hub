import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Sri Vishnu Consol" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate({ to: "/admin" });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-2xl border border-border bg-background p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-primary p-2 text-primary-foreground"><ShieldCheck className="h-5 w-5" /></div>
          <div>
            <h1 className="font-display text-2xl uppercase leading-none">Admin Access</h1>
            <p className="text-xs text-muted-foreground">Sri Vishnu Consol CMS</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground"><Mail className="h-3 w-3" />Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
          </label>
          <label className="block">
            <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground"><Lock className="h-3 w-3" />Password</span>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
          </label>
          {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-foreground py-2.5 text-sm font-semibold text-background hover:bg-primary hover:text-primary-foreground disabled:opacity-60">
            {loading ? "Please wait…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Back to website</Link>
        </p>
      </div>
    </section>
  );
}
