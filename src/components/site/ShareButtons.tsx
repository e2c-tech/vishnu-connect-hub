import { Facebook, Linkedin, Twitter, Link as LinkIcon, MessageCircle } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ title, url }: { title: string; url?: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encUrl = encodeURIComponent(shareUrl);
  const encTitle = encodeURIComponent(title);

  const links = [
    { label: "Facebook", Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}` },
    { label: "Twitter", Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encUrl}&text=${encTitle}` },
    { label: "LinkedIn", Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}` },
    { label: "WhatsApp", Icon: MessageCircle, href: `https://wa.me/?text=${encTitle}%20${encUrl}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {/* ignore */}
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Share</span>
      {links.map(({ label, Icon, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}
           className="rounded-full border border-border p-2 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button onClick={copy} aria-label="Copy link"
              className="flex items-center gap-1 rounded-full border border-border px-3 py-2 text-xs transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
        <LinkIcon className="h-3.5 w-3.5" />
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
