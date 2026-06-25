import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, User } from "lucide-react";
import { POSTS } from "@/lib/site-data";
import { ShareButtons } from "@/components/site/ShareButtons";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    return {
      meta: [
        { title: p ? `${p.title} — Sri Vishnu Consol Blog` : "Blog post" },
        { name: "description", content: p?.excerpt ?? "" },
        { property: "og:title", content: p?.title ?? "" },
        { property: "og:description", content: p?.excerpt ?? "" },
        ...(p ? [{ property: "og:image", content: p.cover }, { name: "twitter:image", content: p.cover }] : []),
      ],
    };
  },
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
      <div className="mt-8 overflow-hidden rounded-md border border-border">
        <img src={post.cover} alt={post.title} className="h-auto w-full object-cover" width={1280} height={720} />
      </div>
      <div className="prose prose-neutral mt-8 max-w-none">
        <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="prose prose-sm mt-6 max-w-none leading-relaxed dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.body ?? "" }} />
      </div>
      <div className="mt-10 border-t border-border pt-6">
        <ShareButtons title={post.title} />
      </div>
    </article>
  );
}
