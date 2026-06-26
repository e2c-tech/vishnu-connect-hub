import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/site-data";

type Props = { items: Testimonial[] };

export function TestimonialsMarquee({ items }: Props) {
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
      <div className="flex w-max gap-5 animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
        {loop.map((t, i) => (
          <figure key={i} className="w-[340px] shrink-0 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <Quote className="h-6 w-6 text-primary" />
            <blockquote className="mt-3 text-sm leading-relaxed text-background/90">"{t.quote}"</blockquote>
            <figcaption className="mt-5 border-t border-white/10 pt-4">
              <div className="font-display text-sm">{t.name}</div>
              <div className="text-xs text-background/60">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
