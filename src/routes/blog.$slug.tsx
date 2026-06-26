import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, User } from "lucide-react";
import { POSTS } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";
import { ShareButtons } from "@/components/site/ShareButtons";
import { buildShareMeta, getSiteOrigin, stripHtml } from "@/lib/social-meta";

type PostView = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  author: string;
  cover: string;
  readMinutes: number;
};

async function loadPost(slug: string): Promise<PostView | null> {
  try {
    const { data } = await supabase
      .from("blogs")
      .select("slug,title,excerpt,body,cover_url,author,published_at,published")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (data) {
      const body = data.body ?? "";
      const text = body.replace(/<[^>]+>/g, " ");
      const words = text.split(/\s+/).filter(Boolean).length;
      return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt ?? "",
        body,
        date: data.published_at,
        author: data.author ?? "Sri Vishnu Editorial",
        cover: data.cover_url ?? "",
        readMinutes: Math.max(1, Math.round(words / 200)),
      };
    }
  } catch {/* fall through */}
  const fb = POSTS.find((p) => p.slug === slug);
  return fb ?? null;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await loadPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Blog post" }] };
    const description = p.excerpt?.trim() || stripHtml(p.body).slice(0, 200);
    return buildShareMeta({
      pageTitle: `${p.title} — Sri Vishnu Consol Blog`,
      title: p.title,
      description,
      pathname: `/blog/${p.slug}`,
      image: p.cover || undefined,
      type: "article",
    });
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Post not found</h1>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>
      <header className="mt-6">
        <h1 className="font-display text-4xl uppercase leading-tight sm:text-5xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><User className="h-4 w-4 text-primary" />{post.author}</span>
          <time>{new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</time>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" />{post.readMinutes} min read</span>
        </div>
      </header>
      {post.cover && (
        <div className="mt-8 overflow-hidden rounded-md border border-border">
          <img src={post.cover} alt={post.title} className="h-auto w-full object-cover" width={1280} height={720} />
        </div>
      )}
      <div className="prose prose-neutral mt-8 max-w-none">
        {post.excerpt && <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>}
        <div className="prose prose-sm mt-6 max-w-none leading-relaxed dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.body ?? "" }} />
      </div>
      <div className="mt-10 border-t border-border pt-6">
        <ShareButtons title={post.title} url={`${getSiteOrigin()}/blog/${post.slug}`} />
      </div>
    </article>
  );
}
