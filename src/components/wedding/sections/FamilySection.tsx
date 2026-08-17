import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, HeartHandshake } from "lucide-react";
import { FAMILY, FamilyMember } from "../data";
import { SectionTitle } from "../ui";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

interface FamilySectionProps {
  familyData?: Record<"bride" | "groom", FamilyMember[]>;
  onModalToggle?: (isOpen: boolean) => void;
}

export function FamilySection({ familyData, onModalToggle }: FamilySectionProps) {
  const [side, setSide] = useState<"bride" | "groom">("bride");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalTouchStartX = useRef<number | null>(null);

  const data = familyData || FAMILY;
  const list = data[side] || [];
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
  const formatNum = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative flex h-full flex-col items-center justify-center mt-4 pb-20 px-4 max-w-sm mx-auto select-none overflow-hidden">
      {/* Background Royal Indian Arch SVG Accent */}
      <svg className="absolute inset-0 size-full opacity-20 pointer-events-none z-0" viewBox="0 0 320 480" fill="none">
        <path
          d="M 20 120 C 20 20, 300 20, 300 120 L 300 460 L 20 460 Z"
          stroke="url(#famArchGoldGrad)"
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <path
          d="M 32 128 C 32 36, 288 36, 288 128 L 288 448 L 32 448 Z"
          stroke="url(#famArchGoldGrad)"
          strokeWidth="1"
        />
        <circle cx="160" cy="55" r="22" stroke="url(#famArchGoldGrad)" strokeWidth="1.2" />
        <circle cx="160" cy="55" r="13" stroke="url(#famArchGoldGrad)" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="160" cy="55" r="4" fill="url(#famArchGoldGrad)" />
        <defs>
          <linearGradient id="famArchGoldGrad" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b45309" />
            <stop offset="0.5" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>

      <SectionTitle>Our Families</SectionTitle>

      {/* Side Toggle Selector */}
      <div className="glass-panel mt-3 flex rounded-full p-1 border border-gold/30 shadow-xs">
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
      </div>

      {/* Family Name Subtitle */}
      <h3 className="mt-2.5 font-display text-2xl text-ink font-normal tracking-wide">
        {side === "bride" ? "Sharma Parivaar" : "Mehra Parivaar"}
      </h3>

      {/* Smooth, Flicker-Free Dynamic Family Member Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={side}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`mt-3 grid grid-cols-2 gap-2.5 w-full ${
            list.length > 6
              ? "max-h-[350px] overflow-y-auto no-scrollbar pr-1 pb-2"
              : ""
          }`}
        >
          {list.map((m, idx) => (
            <button
              key={m.id || idx}
              onClick={() => handleOpen(idx)}
              className="glass-panel group relative flex flex-col items-center justify-center p-3 overflow-hidden rounded-2xl border border-gold/40 bg-white/85 backdrop-blur-md shadow-md hover:shadow-xl hover:border-gold hover:bg-white active:scale-95 transition-all text-center cursor-pointer transform-gpu translate-z-0"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Top Gold Accent Bar */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-80" />

              {/* Avatar Ring & Portrait Image */}
              <div className="relative my-1">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 opacity-40 blur-xs group-hover:opacity-75 transition-opacity" />
                {m.image ? (
                  <ResponsiveImage
                    src={m.image}
                    alt={m.name}
                    className="relative size-12 object-cover rounded-full shadow-md border-2 border-white/80"
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
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Redesigned Fully Enhanced Bottom-to-Top Family Popup Modal Sheet */}
      <AnimatePresence>
        {isModalOpen && member && (
          <div className="absolute inset-0 z-50 flex items-end justify-center overflow-hidden">
            {/* Backdrop Click to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />

            {/* Sliding Popup Sheet with Enhanced Gold Metallic Borders */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              onTouchStart={handleModalTouchStart}
              onTouchEnd={handleModalTouchEnd}
              className="relative z-10 w-full max-w-md h-[68vh] max-h-[560px] rounded-t-[2.8rem] p-5 glass-panel bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E8] to-[#F3E8D5] backdrop-blur-2xl border-t-4 border-x-2 border-amber-400/80 shadow-[0_-20px_60px_rgba(217,119,6,0.35)] flex flex-col justify-between items-center text-center overflow-hidden transform-gpu translate-z-0"
            >
              {/* Top Gold Metallic Bevel Trim Line */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 opacity-95 rounded-t-[2.8rem] shadow-sm" />

              {/* Inner Fine Gold Border Frame Accent */}
              <div className="absolute inset-2.5 rounded-t-[2.2rem] border border-amber-500/30 pointer-events-none" />

              {/* Enhanced Royal Arch Background SVG Overlay */}
              <svg className="absolute inset-0 size-full opacity-20 pointer-events-none" viewBox="0 0 200 240" fill="none">
                <path d="M 15 50 C 15 8, 185 8, 185 50 L 185 235 L 15 235 Z" stroke="url(#modalArchGoldGrad)" strokeWidth="1.6" />
                <path d="M 24 58 C 24 18, 176 18, 176 58 L 176 226 L 24 226 Z" stroke="url(#modalArchGoldGrad)" strokeWidth="1" strokeDasharray="3 3" />
                <defs>
                  <linearGradient id="modalArchGoldGrad" x1="0" y1="0" x2="200" y2="240" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#b45309" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Top Bar Header */}
              <div className="w-full flex items-center justify-between pt-1 px-2 relative z-20">
                <span className="font-mono text-xs font-bold text-amber-900 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-400/50 shadow-xs">
                  {formatNum(selectedIndex! + 1)} / {formatNum(list.length)}
                </span>

                <span className="font-display text-sm font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <HeartHandshake className="size-4 text-amber-800" />
                  <span>{member.relation}</span>
                </span>

                <button
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="grid size-8.5 place-items-center rounded-full bg-amber-950/10 text-amber-950 hover:bg-amber-950/20 active:scale-95 transition-all border border-amber-400/50 cursor-pointer shadow-xs"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              {/* Center Member Content (Increased Picture Size, Smooth Transition) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="my-auto w-full flex flex-col items-center justify-center relative z-20 py-2"
                >
                  {/* ENHANCED LARGE PICTURE (size-36 to size-40) with Gold Metallic Bevel Container */}
                  <div className="relative mt-2 mb-2.5">
                    <div className="relative p-1 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 shadow-[0_12px_28px_rgba(180,83,9,0.45)] border-2 border-amber-300/80">
                      {member.image ? (
                        <ResponsiveImage
                          src={member.image}
                          alt={member.name}
                          className="relative size-36 sm:size-40 object-cover rounded-full shadow-inner border-2 border-white/90"
                        />
                      ) : (
                        <div
                          className={`relative flex size-36 sm:size-40 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} text-white font-display text-3xl font-extrabold shadow-inner border-2 border-white/90`}
                        >
                          {member.initials}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h4 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-amber-950 drop-shadow-xs">
                    {member.name}
                  </h4>

                  {/* Honorific Role Badge */}
                  <div className="mt-2 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-900 bg-amber-500/20 rounded-full border border-amber-400/60 shadow-xs">
                    {member.honorific}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* In-Modal Navigation Control Bar */}
              <div className="w-full flex items-center justify-between gap-3 pt-2 pb-3 mb-1 relative z-20">
                <button
                  onClick={() => goModal(-1)}
                  aria-label="Previous member"
                  className="flex items-center gap-1.5 rounded-full bg-amber-950/10 px-4 py-1.5 text-xs font-bold text-amber-950 hover:bg-amber-950/20 active:scale-95 transition-all border border-amber-400/40 cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="size-4 text-amber-800" />
                  <span>Prev</span>
                </button>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-1.5 max-w-[150px] sm:max-w-[190px] overflow-x-auto no-scrollbar py-1">
                  {list.map((_, idx) => (
                    <button
                      key={`family-modal-dot-${idx}`}
                      onClick={() => setSelectedIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                        idx === selectedIndex ? "w-6 bg-amber-900 shadow-xs" : "w-2 bg-amber-900/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goModal(1)}
                  aria-label="Next member"
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-900 to-amber-950 px-4 py-1.5 text-xs font-bold text-white hover:from-amber-800 hover:to-amber-900 active:scale-95 transition-all shadow-md cursor-pointer border border-amber-400/40"
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