import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Flower2,
  Music,
  Crown,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { EVENTS } from "../data";
import { Divider, SectionTitle } from "../ui";

const EVENT_METADATA: Record<
  string,
  { icon: typeof Sun; subtitle: string }
> = {
  Haldi: {
    icon: Sun,
    subtitle: "Auspicious Morning Ritual",
  },
  Mehendi: {
    icon: Flower2,
    subtitle: "Artistic Henna Evening",
  },
  Sangeet: {
    icon: Music,
    subtitle: "Night of Song & Dance",
  },
  Wedding: {
    icon: Crown,
    subtitle: "The Sacred Phere",
  },
};

export function EventsSection() {
  const [i, setI] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = EVENTS.length;

  const go = (d: number) => setI((p) => (p + d + total) % total);

  // Mobile Touch & Finger Drag Handlers with propagation stop
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    e.stopPropagation();
    const currentX = e.touches[0]?.clientX ?? 0;
    setDragOffset(currentX - touchStartX.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (touchStartX.current !== null) {
      if (dragOffset < -35) {
        go(1);
      } else if (dragOffset > 35) {
        go(-1);
      }
    }
    touchStartX.current = null;
    setDragOffset(0);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-16 pb-4 px-2 w-full max-w-md mx-auto select-none overflow-hidden">
      <SectionTitle>Celebrations</SectionTitle>

      {/* 3D Wave Perspective Carousel Viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative mt-2 w-full h-[290px] flex items-center justify-center overflow-visible touch-pan-y"
        style={{ perspective: "900px" }}
      >
        {/* Floating Left Navigation Arrow */}
        <button
          aria-label="Previous event"
          onClick={() => go(-1)}
          className="glass-panel absolute left-1 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-lg"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* 3D Wave Card Track */}
        <div
          className="relative w-[215px] sm:w-[235px] h-[270px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {EVENTS.map((ev, idx) => {
            let diff = idx - i;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const meta = EVENT_METADATA[ev.name] || {
              icon: Sparkles,
              subtitle: "Wedding Celebration",
            };
            const EventIcon = meta.icon;

            let translateX = "0%";
            let translateY = "0px";
            let translateZ = "0px";
            let rotateY = "0deg";
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;
            let pointerEvents: "auto" | "none" = "auto";

            if (diff === 0) {
              translateX = "0%";
              translateY = "0px";
              translateZ = "0px";
              rotateY = "0deg";
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (diff === -1) {
              translateX = "-74%";
              translateY = "14px";
              translateZ = "-60px";
              rotateY = "22deg";
              scale = 0.82;
              opacity = 0.6;
              zIndex = 20;
            } else if (diff === 1) {
              translateX = "74%";
              translateY = "-14px";
              translateZ = "-60px";
              rotateY = "-22deg";
              scale = 0.82;
              opacity = 0.6;
              zIndex = 20;
            } else {
              translateX = diff < 0 ? "-120%" : "120%";
              translateY = "0px";
              translateZ = "-120px";
              rotateY = "0deg";
              scale = 0.6;
              opacity = 0;
              zIndex = 10;
              pointerEvents = "none";
            }

            return (
              <div
                key={ev.name}
                onClick={() => !isCenter && setI(idx)}
                className={`glass-panel absolute inset-0 rounded-3xl p-3.5 text-center shadow-2xl border border-gold/40 bg-white/60 backdrop-blur-xl ${
                  dragOffset !== 0 ? "transition-none" : "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.35,1)]"
                } flex flex-col justify-between ${
                  !isCenter ? "cursor-pointer hover:opacity-80" : ""
                }`}
                style={{
                  transform: `translate3d(calc(${translateX} + ${dragOffset * 0.35}px), ${translateY}, ${translateZ}) rotateY(${rotateY}) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents,
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Subtle Top Gold Accent Line */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-80 rounded-t-3xl" />

                {/* Event Badge & Counter Header */}
                <div className="flex items-center justify-between text-[10px] font-semibold tracking-widest text-ink/60 uppercase">
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-gold/30 bg-amber-500/10 text-amber-900">
                    <EventIcon className="size-3 text-amber-800" />
                    <span className="truncate max-w-[100px]">{meta.subtitle}</span>
                  </span>
                  <span className="font-mono text-[10px] font-bold text-amber-900/80">
                    0{idx + 1}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="mt-1 font-display text-2xl font-normal tracking-wide text-ink drop-shadow-xs">
                  {ev.name}
                </h3>

                <Divider />

                {/* Details Section */}
                <div className="mt-0.5 flex flex-col gap-1 text-ink/90 text-xs">
                  {/* Date & Time Row */}
                  <div className="flex items-center justify-center gap-2 bg-white/50 rounded-xl py-1 px-2 border border-amber-900/10 shadow-2xs">
                    <div className="flex items-center gap-1 font-medium text-[11px]">
                      <Calendar className="size-3 text-amber-800 shrink-0" />
                      <span>{ev.date}</span>
                    </div>
                    <span className="h-2.5 w-px bg-amber-900/20" />
                    <div className="flex items-center gap-1 font-medium text-[11px]">
                      <Clock className="size-3 text-amber-800 shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                  </div>

                  {/* Venue Row */}
                  <div className="flex items-center justify-center gap-1 bg-white/50 rounded-xl py-1 px-2 border border-amber-900/10 shadow-2xs font-medium text-[11px]">
                    <MapPin className="size-3 text-amber-800 shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                </div>

                {/* Note Callout */}
                <div className="mt-1.5 flex items-start justify-center gap-1 rounded-xl bg-amber-900/5 p-1.5 text-[10.5px] italic text-amber-950/80 border border-amber-900/10">
                  <Sparkles className="size-3 text-amber-700 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{ev.note}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Right Navigation Arrow */}
        <button
          aria-label="Next event"
          onClick={() => go(1)}
          className="glass-panel absolute right-1 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-lg"
        >
          <ChevronRight className="size-4" />
        </button>
      </motion.div>

      {/* Pagination Dots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
        className="mt-2 flex items-center gap-2"
      >
        {EVENTS.map((ev, idx) => (
          <button
            key={ev.name}
            aria-label={`Go to ${ev.name}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === i ? "w-6 bg-amber-900" : "w-1.5 bg-amber-900/30 hover:bg-amber-900/50"
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
}