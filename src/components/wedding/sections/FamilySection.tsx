import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Quote, HeartHandshake } from "lucide-react";
import { FAMILY } from "../data";
import { SectionTitle } from "../ui";

export function FamilySection({ onModalToggle }: { onModalToggle?: (isOpen: boolean) => void }) {
  const [side, setSide] = useState<"bride" | "groom">("bride");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalTouchStartX = useRef<number | null>(null);

  const list = FAMILY[side];
  const isModalOpen = selectedIndex !== null;

  const handleOpen = (idx: number) => {
    setSelectedIndex(idx);
    onModalToggle?.(true);
  };

  const handleClose = () => {
    setSelectedIndex(null);
    onModalToggle?.(false);
  };

  const goModal = (d: number) => {
    if (selectedIndex === null) return;
    setSelectedIndex((p) => (p! + d + list.length) % list.length);
  };

  // Modal swipe gesture
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

  const member = selectedIndex !== null ? list[selectedIndex] : null;

  return (
    <div className="flex h-full flex-col items-center justify-center mt-4 pb-4 px-4 max-w-sm mx-auto select-none overflow-hidden">
      <SectionTitle>Our Families</SectionTitle>

      {/* Side Toggle Selector */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        className="glass-panel mt-3 flex rounded-full p-1 border border-gold/30 shadow-xs"
      >
        {(["bride", "groom"] as const).map((s) => (
          <button
            key={s}
            onClick={() => {
              setSide(s);
              setSelectedIndex(null);
            }}
            className={`rounded-full px-4 py-1 text-[10.5px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 cursor-pointer ${
              side === s
                ? "bg-amber-900 text-white shadow-xs scale-102"
                : "text-ink/70 hover:text-ink"
            }`}
          >
            {s === "bride" ? "Bride's Side" : "Groom's Side"}
          </button>
        ))}
      </motion.div>

      {/* Family Name Subtitle */}
      <motion.h3
        key={side}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
        className="mt-2.5 font-display text-2xl text-ink font-normal tracking-wide"
      >
        {side === "bride" ? "Sharma Parivaar" : "Mehra Parivaar"}
      </motion.h3>

      {/* Family Member Cards Grid */}
      <div className="mt-3 grid grid-cols-2 gap-2.5 w-full">
        {list.map((m, idx) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -35 : 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: "easeOut" }}
            onClick={() => handleOpen(idx)}
            className="glass-panel group relative flex flex-col items-center justify-center p-3 overflow-hidden rounded-2xl border border-gold/40 bg-white/60 backdrop-blur-xl shadow-md hover:shadow-xl hover:border-gold hover:bg-white/80 active:scale-95 transition-all text-center cursor-pointer"
          >
            {/* Top Gold Accent Bar */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-80" />

            {/* Glowing Avatar Initials Ring / Anime Image */}
            <div className="relative my-1">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 opacity-40 blur-xs group-hover:opacity-75 transition-opacity" />
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  className="relative size-12 object-cover rounded-full shadow-md border-2 border-white/70"
                />
              ) : (
                <div
                  className={`relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br ${m.gradient} text-white font-display text-base font-bold shadow-md border border-white/40`}
                >
                  {m.initials}
                </div>
              )}
            </div>

            {/* Name */}
            <p className="mt-1 font-display text-xs font-semibold text-ink leading-tight truncate w-full">
              {m.name}
            </p>

            {/* Relation Subtitle Pill */}
            <span className="mt-1 px-2 py-0.5 text-[8.5px] uppercase tracking-wider text-amber-900 bg-amber-500/15 rounded-full border border-gold/30 w-full truncate font-semibold">
              {m.relation}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Redesigned Fully Enhanced Bottom-to-Top Family Popup Modal Sheet */}
      <AnimatePresence>
        {isModalOpen && member && (
          <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden">
            {/* Backdrop Click to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Sliding Popup Sheet */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onTouchStart={handleModalTouchStart}
              onTouchEnd={handleModalTouchEnd}
              className="relative z-10 w-full max-w-md h-[65vh] rounded-t-[2.5rem] p-5 glass-panel bg-gradient-to-b from-[#FFFDF7]/98 via-[#F9F3E5]/98 to-[#F2E7D3]/98 backdrop-blur-2xl border-t-2 border-x border-gold/60 shadow-[0_-25px_60px_rgba(0,0,0,0.45)] flex flex-col justify-between items-center text-center overflow-hidden"
            >
              {/* Top Gold Trim Accent Line */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 opacity-90 rounded-t-[2.5rem]" />

              {/* Decorative Mandalas & Arch Floral Motif Textured Overlay */}
              <svg className="absolute inset-0 size-full opacity-[0.08] pointer-events-none" viewBox="0 0 100 120" fill="none">
                <path d="M 10 30 Q 50 0 90 30 L 90 120 L 10 120 Z" stroke="currentColor" strokeWidth="1.2" className="text-amber-900" />
                <circle cx="50" cy="60" r="28" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" className="text-amber-800" />
              </svg>

              {/* Top Bar Header */}
              <div className="w-full flex items-center justify-between pt-1 px-1 relative z-20">
                <span className="font-mono text-xs font-bold text-amber-900/90 bg-amber-500/10 px-2.5 py-1 rounded-full border border-gold/30">
                  0{selectedIndex! + 1} / 0{list.length}
                </span>

                <span className="font-display text-sm font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <HeartHandshake className="size-4 text-amber-800" />
                  <span>{member.relation}</span>
                </span>

                <button
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="grid size-8 place-items-center rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 active:scale-95 transition-all border border-gold/30 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Center Member Content Container */}
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="my-auto w-full flex flex-col items-center justify-center relative z-20"
              >
                {/* Avatar with Radiant Gold Glow & AI Portrait */}
                <div className="relative my-1">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 opacity-60 blur-md animate-pulse" />
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative size-20 object-cover rounded-full shadow-2xl border-2 border-white/90"
                    />
                  ) : (
                    <div
                      className={`relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} text-white font-display text-xl font-bold shadow-2xl border-2 border-white/80`}
                    >
                      {member.initials}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h4 className="font-display text-xl sm:text-2xl font-bold text-amber-950 drop-shadow-xs">
                  {member.name}
                </h4>

                {/* Honorific Role Badge */}
                <div className="mt-1 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-900 bg-amber-500/15 rounded-full border border-gold/40 shadow-xs">
                  {member.honorific}
                </div>

                {/* Personal Blessing Thought Box */}
                <div className="mt-2.5 w-full bg-white/70 backdrop-blur-md border border-gold/35 rounded-2xl p-3 shadow-sm relative overflow-hidden">
                  <Quote className="size-4 text-amber-800/50 mb-0.5 mx-auto" />
                  <p className="font-display text-sm italic text-amber-950 font-medium leading-relaxed px-1">
                    "{member.thought}"
                  </p>
                </div>
              </motion.div>

              {/* In-Modal Navigation Control Bar */}
              <div className="w-full flex items-center justify-between gap-3 pt-2 relative z-20">
                <button
                  onClick={() => goModal(-1)}
                  aria-label="Previous member"
                  className="flex items-center gap-1.5 rounded-full bg-amber-900/10 px-4 py-1.5 text-xs font-bold text-amber-950 hover:bg-amber-900/20 active:scale-95 transition-all border border-gold/30 cursor-pointer"
                >
                  <ChevronLeft className="size-4 text-amber-800" />
                  <span>Prev</span>
                </button>

                {/* Pagination Dots */}
                <div className="flex items-center gap-1.5">
                  {list.map((_, idx) => (
                    <button
                      key={`family-modal-dot-${idx}`}
                      onClick={() => setSelectedIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === selectedIndex ? "w-5 bg-amber-900" : "w-2 bg-amber-900/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goModal(1)}
                  aria-label="Next member"
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