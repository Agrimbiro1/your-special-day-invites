import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    image: "/assets/gallery/hello.jpg",
  },
  {
    id: 2,
    caption: "Roka Ceremony",
    subtitle: "February 2026",
    date: "Feb 2026",
    tint: "from-amber-600/90 via-rose-500/80 to-purple-700/90",
    icon: Sparkles,
    image: "/assets/gallery/roka.jpg",
  },
  {
    id: 3,
    caption: "Jaipur Evenings",
    subtitle: "July 2026",
    date: "Jul 2026",
    tint: "from-teal-600/90 via-emerald-500/80 to-amber-600/90",
    icon: Camera,
    image: "/assets/gallery/jaipur.jpg",
  },
  {
    id: 4,
    caption: "Family Togetherness",
    subtitle: "November 2026",
    date: "Nov 2026",
    tint: "from-indigo-600/90 via-purple-500/80 to-rose-600/90",
    icon: Users,
    image: "/assets/gallery/together.jpg",
  },
  {
    id: 5,
    caption: "Forever & Always",
    subtitle: "December 2026",
    date: "Dec 2026",
    tint: "from-amber-500/90 via-yellow-400/80 to-rose-700/90",
    icon: Gem,
    image: "/assets/gallery/forever.jpg",
  },
];

export function GallerySection({ onModalToggle }: { onModalToggle?: (isOpen: boolean) => void }) {
  const [i, setI] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const modalTouchStartX = useRef<number | null>(null);
  const total = PHOTOS.length;

  const go = (d: number) => setI((p) => (p + d + total) % total);
  const goModal = (d: number) => setModalIndex((p) => (p + d + total) % total);

  const handleOpenModal = (idx: number) => {
    setModalIndex(idx);
    setIsModalOpen(true);
    onModalToggle?.(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onModalToggle?.(false);
  };

  // Carousel Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isModalOpen) return;
    e.stopPropagation();
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isModalOpen || touchStartX.current === null) return;
    e.stopPropagation();
    const currentX = e.touches[0]?.clientX ?? 0;
    setDragOffset(currentX - touchStartX.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isModalOpen) return;
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

  // Popup Modal Touch Handlers for swipe inside modal
  const handleModalTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    modalTouchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (modalTouchStartX.current !== null) {
      const endX = e.changedTouches[0]?.clientX ?? 0;
      const diff = modalTouchStartX.current - endX;
      if (diff > 40) {
        goModal(1);
      } else if (diff < -40) {
        goModal(-1);
      }
    }
    modalTouchStartX.current = null;
  };

  const activeModalPhoto = PHOTOS[modalIndex]!;
  const ModalIcon = activeModalPhoto.icon;

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-10 sm:-mt-12 pb-4 px-2 w-full max-w-sm mx-auto select-none overflow-hidden">
      <SectionTitle>Our Moments</SectionTitle>

      {/* 3D Coverflow Carousel Viewport */}
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
          className="glass-panel absolute -left-2 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all duration-500 shadow-lg border border-gold/40 cursor-pointer"
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
              translateZ = "0px";
              rotateY = "0deg";
              scale = 1.0;
              opacity = 1;
              zIndex = 30;
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

            if (opacity === 0) return null;

            return (
              <div
                key={photo.id}
                onClick={() => {
                  if (isCenter) {
                    handleOpenModal(idx);
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

                {/* Inner Arch Photo Holder */}
                <div className="relative my-auto w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-inner border border-gold/30 flex flex-col items-center justify-center group">
                  {photo.image ? (
                    <>
                      <img
                        src={photo.image}
                        alt={photo.caption}
                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="relative z-10 mt-auto p-2 text-white text-center">
                        <span className="font-display text-xs font-bold tracking-wide drop-shadow-md block">
                          {photo.caption}
                        </span>
                        <span className="text-[8.5px] uppercase tracking-[0.18em] opacity-90 font-medium block">
                          {photo.subtitle}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                {/* Card Footer Tag */}
                <div className="flex items-center justify-between pt-1 px-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-900 bg-amber-500/15 px-2 py-0.5 rounded-full border border-gold/30">
                    {photo.date}
                  </span>
                  {isCenter && (
                    <div className="flex items-center gap-1 text-[8.5px] uppercase font-bold tracking-wider text-amber-900">
                      <Maximize2 className="size-2.5" />
                      <span>View</span>
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
          className="glass-panel absolute -right-2 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all duration-500 shadow-lg border border-gold/40 cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </button>
      </motion.div>

      {/* Instruction Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
        className="mt-2.5 px-3 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-500/15 backdrop-blur-md rounded-full border border-gold/35 shadow-2xs flex items-center justify-center"
      >
        <span>Tap photo to view large</span>
      </motion.div>

      {/* Pagination Dots */}
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

      {/* Bottom-to-Top Fullscreen Photo Preview Popup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="absolute inset-0 z-50 flex items-end justify-center overflow-hidden">
            {/* Backdrop Overlay Click to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Bottom-to-Top Sliding Popup Sheet Container */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onTouchStart={handleModalTouchStart}
              onTouchEnd={handleModalTouchEnd}
              className="relative z-10 w-full max-w-md h-[70vh] max-h-[580px] rounded-t-[2.5rem] p-5 glass-panel bg-gradient-to-b from-[#FFFDF7]/98 via-[#F9F3E5]/98 to-[#F2E7D3]/98 backdrop-blur-2xl border-t-2 border-x border-gold/60 shadow-[0_-25px_60px_rgba(0,0,0,0.45)] flex flex-col justify-between items-center text-center overflow-hidden"
            >
              {/* Top Gold Trim Accent Line */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 opacity-90 rounded-t-[2.5rem]" />

              {/* Decorative Mandalas & Arch Floral Motif Textured Overlay */}
              <svg className="absolute inset-0 size-full opacity-[0.08] pointer-events-none" viewBox="0 0 100 120" fill="none">
                <path d="M 10 30 Q 50 0 90 30 L 90 120 L 10 120 Z" stroke="currentColor" strokeWidth="1.2" className="text-amber-900" />
                <circle cx="50" cy="60" r="28" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" className="text-amber-800" />
              </svg>
              {/* Top Handle bar / Header */}
              <div className="w-full flex items-center justify-between pt-1 px-1">
                <span className="font-mono text-xs font-bold text-amber-900/90 bg-amber-500/10 px-2.5 py-1 rounded-full border border-gold/30">
                  0{modalIndex + 1} / 0{total}
                </span>

                <span className="font-display text-sm font-bold uppercase tracking-wider text-amber-950">
                  Moments Preview
                </span>

                <button
                  onClick={handleCloseModal}
                  aria-label="Close preview"
                  className="grid size-8 place-items-center rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 active:scale-95 transition-all border border-gold/30 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Big Size Photo Preview Card */}
              <div className="relative my-auto w-full max-w-[265px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/50 flex flex-col items-center justify-center group my-1">
                {activeModalPhoto.image ? (
                  <>
                    <img
                      src={activeModalPhoto.image}
                      alt={activeModalPhoto.caption}
                      className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="relative z-10 mt-auto p-3 text-white text-center">
                      <h3 className="font-display text-lg font-bold tracking-wide drop-shadow-md">
                        {activeModalPhoto.caption}
                      </h3>
                      <span className="text-[9.5px] uppercase tracking-[0.2em] opacity-90 font-medium block">
                        {activeModalPhoto.subtitle}
                      </span>
                      <span className="mt-1 text-[8.5px] font-bold uppercase tracking-widest text-amber-950 bg-white/90 px-2.5 py-0.5 rounded-full shadow-sm inline-block">
                        {activeModalPhoto.date}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${activeModalPhoto.tint} opacity-90`} />

                    {/* Decorative Arch Overlay */}
                    <svg className="absolute inset-0 size-full opacity-25 pointer-events-none" viewBox="0 0 100 120" fill="none">
                      <path d="M 10 30 Q 50 0 90 30 L 90 120 L 10 120 Z" stroke="currentColor" strokeWidth="1" className="text-white" />
                    </svg>

                    {/* Center Emblem Icon & Details */}
                    <div className="relative z-10 flex flex-col items-center gap-2 p-3 text-white text-center">
                      <div className="grid size-12 place-items-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-md">
                        <ModalIcon className="size-6 text-amber-200" />
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-wide drop-shadow-md">
                        {activeModalPhoto.caption}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.2em] opacity-90 font-medium">
                        {activeModalPhoto.subtitle}
                      </span>
                      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-900 bg-white/90 px-2.5 py-0.5 rounded-full shadow-sm">
                        {activeModalPhoto.date}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* In-Modal Navigation Control Bar */}
              <div className="w-full flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => goModal(-1)}
                  aria-label="Previous photo in popup"
                  className="flex items-center gap-1.5 rounded-full bg-amber-900/10 px-4 py-1.5 text-xs font-bold text-amber-950 hover:bg-amber-900/20 active:scale-95 transition-all border border-gold/30 cursor-pointer"
                >
                  <ChevronLeft className="size-4 text-amber-800" />
                  <span>Prev</span>
                </button>

                {/* Pagination Dots */}
                <div className="flex items-center gap-1.5">
                  {PHOTOS.map((_, idx) => (
                    <button
                      key={`modal-dot-${idx}`}
                      onClick={() => setModalIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === modalIndex ? "w-5 bg-amber-900" : "w-2 bg-amber-900/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goModal(1)}
                  aria-label="Next photo in popup"
                  className="flex items-center gap-1.5 rounded-full bg-amber-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-amber-800 active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="size-4 text-white" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}