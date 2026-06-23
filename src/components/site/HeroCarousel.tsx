import { useEffect, useState } from "react";
import { BANNER_IMAGES } from "@/lib/site-data";

export function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BANNER_IMAGES.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0 -z-10">
      {BANNER_IMAGES.map((b, idx) => (
        <img
          key={idx}
          src={b.src}
          alt={b.alt}
          width={1920}
          height={1080}
          loading={idx === 0 ? "eager" : "lazy"}
          fetchPriority={idx === 0 ? "high" : undefined}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-6">
        {BANNER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-8 bg-primary" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
