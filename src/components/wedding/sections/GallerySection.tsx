import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "../ui";

const PHOTOS = [
  { caption: "The first hello", tint: "oklch(0.85 0.06 30)" },
  { caption: "Roka, Feb 2026", tint: "oklch(0.84 0.05 150)" },
  { caption: "Jaipur evenings", tint: "oklch(0.86 0.05 250)" },
  { caption: "Both families, one frame", tint: "oklch(0.87 0.06 90)" },
];

export function GallerySection() {
  const [i, setI] = useState(0);
  const p = PHOTOS[i]!;
  const go = (d: number) => setI((x) => (x + d + PHOTOS.length) % PHOTOS.length);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <SectionTitle>Our Moments</SectionTitle>
      <div className="glass-panel anim-soft-in relative mt-4 w-full overflow-hidden rounded-3xl p-2">
        <div
          key={i}
          className="anim-soft-in grid aspect-[4/5] w-full place-items-center rounded-2xl"
          style={{ background: `linear-gradient(160deg, ${p.tint}, oklch(0.95 0.02 80))` }}
        >
          <span className="font-display text-lg italic text-ink/60">Photo {i + 1}</span>
        </div>
        <p className="py-3 text-center font-display text-base text-ink">{p.caption}</p>
        <button aria-label="Previous photo" onClick={() => go(-1)} className="glass-panel absolute left-4 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-ink">
          <ChevronLeft className="size-4" />
        </button>
        <button aria-label="Next photo" onClick={() => go(1)} className="glass-panel absolute right-4 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-ink">
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        {PHOTOS.map((_, idx) => (
          <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-ink/70" : "w-1.5 bg-ink/30"}`} />
        ))}
      </div>
    </div>
  );
}