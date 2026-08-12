import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Camera,
  Users,
  Gem,
  X,
  Maximize2,
} from "lucide-react";
import { SectionTitle } from "../ui";

const PHOTOS = [
  {
    id: 1,
    caption: "The First Hello",
    subtitle: "January 2025",
    date: "Jan 2025",
    tint: "from-rose-600/90 via-amber-500/80 to-yellow-600/90",
    icon: Heart,
  },
  {
    id: 2,
    caption: "Roka Ceremony",
    subtitle: "February 2026",
    date: "Feb 2026",
    tint: "from-amber-600/90 via-rose-500/80 to-purple-700/90",
    icon: Sparkles,
  },
  {
    id: 3,
    caption: "Jaipur Evenings",
    subtitle: "July 2026",
    date: "Jul 2026",
    tint: "from-teal-600/90 via-emerald-500/80 to-amber-600/90",
    icon: Camera,
  },
  {
    id: 4,
    caption: "Family Togetherness",
    subtitle: "November 2026",
    date: "Nov 2026",
    tint: "from-indigo-600/90 via-purple-500/80 to-rose-600/90",
    icon: Users,
  },
  {
    id: 5,
    caption: "Forever & Always",
    subtitle: "December 2026",
    date: "Dec 2026",
    tint: "from-amber-500/90 via-yellow-400/80 to-rose-700/90",
    icon: Gem,
  },
];

export function GallerySection({ onModalToggle }: { onModalToggle?: (isOpen: boolean) => void }) {
  const [i, setI] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = PHOTOS.length;

  const activePhoto = PHOTOS[i]!;

  const go = (d: number) => setI((p) => (p + d + total) % total);

  const handleZoomToggle = () => {
    const nextState = !isZoomed;
    setIsZoomed(nextState);
    onModalToggle?.(nextState);
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
    onModalToggle?.(false);
  };

  // Mobile Touch & Finger Drag Handlers with propagation stop
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return;
    e.stopPropagation();
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isZoomed || touchStartX.current === null) return;
    e.stopPropagation();
    const currentX = e.touches[0]?.clientX ?? 0;
    setDragOffset(currentX - touchStartX.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isZoomed) return;
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
    <div className="flex h-full flex-col items-center justify-center -mt-6 pb-4 px-2 w-full max-w-sm mx-auto select-none overflow-hidden">
      <SectionTitle>Our Moments</SectionTitle>

      {/* 3D Coverflow Perspective Viewport Container - Scale-in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative mt-3 w-full h-[255px] flex items-center justify-center overflow-visible touch-pan-y"
        style={{ perspective: "900px" }}
      >
        {/* Floating Left Navigation Arrow */}
        <button
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="glass-panel absolute -left-2 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all duration-500 shadow-lg border border-gold/40"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* 3D Track Container */}
        <div
          className="relative w-[155px] sm:w-[170px] h-[245px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {PHOTOS.map((photo, idx) => {
            let diff = idx - i;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const Icon = photo.icon;

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
              translateZ = isZoomed ? "100px" : "0px";
              rotateY = "0deg";
              scale = isZoomed ? 1.28 : 1.0;
              opacity = 1;
              zIndex = isZoomed ? 60 : 30;
            } else if (diff === -1) {
              translateX = "-78%";
              translateY = "0px";
              translateZ = "-50px";
              rotateY = "18deg";
              scale = 0.82;
              opacity = 0.55;
              zIndex = 20;
            } else if (diff === 1) {
              translateX = "78%";
              translateY = "0px";
              translateZ = "-50px";
              rotateY = "-18deg";
              scale = 0.82;
              opacity = 0.55;
              zIndex = 20;
            } else {
              translateX = diff < 0 ? "-130%" : "130%";
              translateY = "0px";
              translateZ = "-100px";
              rotateY = "0deg";
              scale = 0.6;
              opacity = 0;
              zIndex = 10;
              pointerEvents = "none";
            }

            return (
              <div
                key={photo.id}
                onClick={() => {
                  if (isCenter) {
                    handleZoomToggle();
                  } else {
                    setI(idx);
                  }
                }}
                className={`glass-panel absolute inset-0 rounded-3xl p-3 text-center border-2 border-gold/40 bg-white/70 backdrop-blur-xl ${
                  dragOffset !== 0 ? "transition-none" : "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                } flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isCenter ? "shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-gold" : "hover:opacity-80"
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
                {/* Top Metallic Gold Accent Trim */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-90 rounded-t-3xl" />

                {/* Floating Close Button when In-Place Zoomed */}
                {isCenter && isZoomed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleZoomClose();
                    }}
                    aria-label="Close zoom"
                    className="absolute right-2 top-2 z-50 grid size-7 place-items-center rounded-full bg-amber-950/80 text-white shadow-lg hover:bg-amber-900 active:scale-90 transition-all border border-gold/40 backdrop-blur-md"
                  >
                    <X className="size-3.5" />
                  </button>
                )}

                {/* Inner Arch Photo Holder */}
                <div className="relative my-auto w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-inner border border-gold/30 flex flex-col items-center justify-center group">
                  {/* Rich Gradient Vignette Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${photo.tint} opacity-85 transition-transform duration-700 group-hover:scale-105`} />

                  {/* Decorative Arch Floral Motif Overlay */}
                  <svg className="absolute inset-0 size-full opacity-20 pointer-events-none" viewBox="0 0 100 120" fill="none">
                    <path d="M 10 30 Q 50 0 90 30 L 90 120 L 10 120 Z" stroke="currentColor" strokeWidth="1" className="text-white" />
                  </svg>

                  {/* Center Emblem Icon */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5 p-2 text-white text-center">
                    <div className="grid size-11 place-items-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-md">
                      <Icon className="size-5 text-amber-200" />
                    </div>
                    <span className="font-display text-sm font-bold tracking-wide drop-shadow-md">
                      {photo.caption}
                    </span>
                    <span className="text-[9.5px] uppercase tracking-[0.2em] opacity-90 font-medium">
                      {photo.subtitle}
                    </span>
                  </div>
                </div>

                {/* Card Footer Tag */}
                <div className="flex items-center justify-between pt-1 px-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-900 bg-amber-500/15 px-2 py-0.5 rounded-full border border-gold/30">
                    {photo.date}
                  </span>
                  {isCenter && !isZoomed && (
                    <div className="flex items-center gap-1 text-[8.5px] uppercase font-bold tracking-wider text-amber-900 animate-pulse">
                      <Maximize2 className="size-2.5" />
                      <span>Zoom</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Right Navigation Arrow */}
        <button
          aria-label="Next photo"
          onClick={() => go(1)}
          className="glass-panel absolute -right-2 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all duration-500 shadow-lg border border-gold/40"
        >
          <ChevronRight className="size-4" />
        </button>
      </motion.div>

      {/* Interactive In-Place Zoom Instruction Pill - Bottom-up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
        className="mt-2.5 px-3 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-500/15 backdrop-blur-md rounded-full border border-gold/35 shadow-2xs flex items-center gap-1.5"
      >
        <Sparkles className="size-3 text-amber-700" />
        <span>{isZoomed ? "Tap card or X to unzoom" : "Tap center photo to zoom forward"}</span>
      </motion.div>

      {/* Pagination Dots - Bottom-up */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.45, ease: "easeOut" }}
        className="mt-2 flex items-center gap-2"
      >
        {PHOTOS.map((photo, idx) => (
          <button
            key={photo.id}
            aria-label={`Go to photo ${idx + 1}`}
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