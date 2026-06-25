import { useEffect, useState } from "react";
import { BANNER_IMAGES } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";
import type { HeroTile } from "@/lib/cms-types";

const DEFAULT_TILES: HeroTile[] = [
  { eyebrow: "Engineered for Safety", headline: "Zero-compromise scaffolding & access systems", sub: "Cuplock, ringlock, cantilever — designed, supplied & erected by certified crews." },
  { eyebrow: "Built to Last", headline: "Landmark structures delivered with precision", sub: "Turnkey civil contracting backed by 12+ years of on-site discipline." },
  { eyebrow: "Pan-India Delivery", headline: "One trusted partner across 9 major cities", sub: "Bangalore · Mumbai · Pune · Chennai · Hyderabad · Kolkata · Noida · Mysore · Mangalore." },
  { eyebrow: "On Time. On Budget.", headline: "Predictable outcomes for ambitious builds", sub: "Project management that respects your timeline and protects your cost plan." },
  { eyebrow: "Trusted Since 2012", headline: "A name developers, EPCs & owners rely on", sub: "CIN U45201KA2012PTC063587 — an Indian Private Limited Company you can verify." },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [tiles, setTiles] = useState<HeroTile[]>(DEFAULT_TILES);

  useEffect(() => {
    supabase.from("site_settings").select("hero_tiles").eq("id", 1).maybeSingle().then(({ data }) => {
      const ht = (data?.hero_tiles ?? []) as unknown as HeroTile[];
      if (Array.isArray(ht) && ht.length) setTiles(ht);
    });
  }, []);

  const slideImages = tiles.map((t, idx) => t.image_url || BANNER_IMAGES[idx % BANNER_IMAGES.length].src);
  const slideCount = slideImages.length || BANNER_IMAGES.length;

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slideCount), 5500);
    return () => clearInterval(t);
  }, [slideCount]);

  const tile = tiles[i % tiles.length] ?? DEFAULT_TILES[0];

  return (
    <>
      <div className="absolute inset-0 -z-10">
        {slideImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt=""
            width={1920}
            height={1080}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : undefined}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              idx === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{ transition: "opacity 1s ease, transform 8s ease" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      </div>


      {/* per-slide value message overlay (replaces the big SRI VISHNU CONSOL text) */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div key={i} className="animate-[fadeUp_0.8s_ease]">
          <span className="inline-block rounded-full border border-primary/60 bg-primary/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
            {tile.eyebrow}
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-4xl uppercase leading-[1.05] sm:text-6xl md:text-7xl">
            {tile.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">{tile.sub}</p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
        {Array.from({ length: slideCount }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-10 bg-primary" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </>
  );
}
