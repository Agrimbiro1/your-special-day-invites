import { useState, useRef, useEffect } from "react";
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
  {
    icon: typeof Sun;
    subtitle: string;
    cardGradient: string;
    borderStyle: string;
    accentTrim: string;
  }
> = {
  Haldi: {
    icon: Sun,
    subtitle: "Auspicious Morning Ritual",
    cardGradient: "bg-gradient-to-br from-[#FFFDF2] via-[#FFF5D1] to-[#FDE699]",
    borderStyle: "border-2 border-amber-400/70 shadow-[0_15px_35px_rgba(245,158,11,0.25)]",
    accentTrim: "from-amber-400 via-yellow-500 to-amber-400",
  },
  Mehendi: {
    icon: Flower2,
    subtitle: "Artistic Henna Evening",
    cardGradient: "bg-gradient-to-br from-[#F2FAF4] via-[#D8F3E4] to-[#B7E4C7]",
    borderStyle: "border-2 border-emerald-400/70 shadow-[0_15px_35px_rgba(16,185,129,0.25)]",
    accentTrim: "from-emerald-400 via-teal-500 to-emerald-400",
  },
  Sangeet: {
    icon: Music,
    subtitle: "Night of Song & Dance",
    cardGradient: "bg-gradient-to-br from-[#FAF2FF] via-[#E9D5FF] to-[#D8B4FE]",
    borderStyle: "border-2 border-purple-400/70 shadow-[0_15px_35px_rgba(168,85,247,0.25)]",
    accentTrim: "from-purple-400 via-indigo-500 to-purple-400",
  },
  Wedding: {
    icon: Crown,
    subtitle: "The Sacred Phere",
    cardGradient: "bg-gradient-to-br from-[#FFF2F4] via-[#FFE1E5] to-[#FECDD3]",
    borderStyle: "border-2 border-rose-400/70 shadow-[0_15px_35px_rgba(244,63,94,0.25)]",
    accentTrim: "from-rose-400 via-amber-500 to-rose-400",
  },
};

interface EventsSectionProps {
  onEventChange?: (eventName: string) => void;
}

export function EventsSection({ onEventChange }: EventsSectionProps) {
  const [i, setI] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = EVENTS.length;

  const go = (d: number) => {
    setI((prev) => {
      const next = (prev + d + total) % total;
      onEventChange?.(EVENTS[next]!.name);
      return next;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const currentX = e.touches[0]?.clientX ?? 0;
      setDragOffset(currentX - touchStartX.current);
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragOffset) > 40) {
      if (dragOffset > 0) go(-1);
      else go(1);
    }
    setDragOffset(0);
    touchStartX.current = null;
  };

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-2 pb-4 px-3 w-full max-w-sm mx-auto select-none overflow-hidden">
      <SectionTitle>Events</SectionTitle>

      {/* 3D Perspective Carousel Container */}
      <div
        className="relative mt-3 w-full h-[270px] flex items-center justify-center overflow-visible"
        style={{ perspective: "1000px" }}
      >
        {/* Floating Left Navigation Arrow */}
        <button
          aria-label="Previous event"
          onClick={() => go(-1)}
          className="glass-panel absolute left-1 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-lg"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* 3D Animated Card Track with Touch Swipe */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-[240px] sm:w-[260px] h-[260px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
        >
          {EVENTS.map((ev, idx) => {
            const meta = EVENT_METADATA[ev.name] || { icon: Sparkles, subtitle: "Celebration", cardGradient: "bg-white/60", borderStyle: "border-white/20", accentTrim: "from-amber-300 to-amber-600" };
            const EventIcon = meta.icon;

            let diff = idx - i;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;

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
              scale = 1.0;
              opacity = 1;
              zIndex = 30;
            } else if (diff === -1) {
              translateX = "-74%";
              translateY = "-14px";
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

            if (opacity === 0) return null;

            return (
              <div
                key={ev.name}
                onClick={() => !isCenter && setI(idx)}
                className={`glass-panel absolute inset-0 rounded-3xl p-3.5 text-center backdrop-blur-2xl ${meta.cardGradient} ${meta.borderStyle} ${
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
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${meta.accentTrim} opacity-90 rounded-t-3xl`} />

                {/* Event Counter Header */}
                <div className="flex items-center justify-end text-[10px] font-semibold tracking-widest uppercase">
                  <span className="font-mono text-[10px] font-bold text-amber-900/80">
                    0{idx + 1}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="mt-1 font-serif italic text-3xl font-bold tracking-wide text-amber-950 drop-shadow-xs">
                  {ev.name}
                </h3>

                <Divider />

                {/* Details Section */}
                <div className="mt-0.5 flex flex-col gap-1 text-ink/90 text-xs">
                  {/* Date & Time Row */}
                  <div className="flex items-center justify-center gap-2 bg-white/65 rounded-xl py-1 px-2 border border-amber-900/10 shadow-2xs">
                    <div className="flex items-center gap-1 font-semibold text-[11px] text-amber-950">
                      <Calendar className="size-3 text-amber-800 shrink-0" />
                      <span>{ev.date}</span>
                    </div>
                    <span className="h-2.5 w-px bg-amber-900/20" />
                    <div className="flex items-center gap-1 font-semibold text-[11px] text-amber-950">
                      <Clock className="size-3 text-amber-800 shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                  </div>

                  {/* Venue Row */}
                  <div className="flex items-center justify-center gap-1 bg-white/65 rounded-xl py-1 px-2 border border-amber-900/10 shadow-2xs font-semibold text-[11px] text-amber-950">
                    <MapPin className="size-3 text-amber-800 shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                </div>

                {/* Dress Code Line */}
                <div className="mt-1.5 flex items-center justify-center rounded-xl bg-white/70 p-1.5 text-[10.5px] font-medium text-amber-950 border border-amber-900/15 shadow-2xs">
                  <span className="truncate">
                    <span className="font-bold text-amber-900">Dress Code: </span>
                    {ev.dressCode || ev.note}
                  </span>
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
      </div>

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