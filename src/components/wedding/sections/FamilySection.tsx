import { useState } from "react";
import { motion } from "framer-motion";
import { X, Sparkles, Heart, Quote } from "lucide-react";
import { FAMILY, type FamilyMember } from "../data";
import { Divider, SectionTitle } from "../ui";

export function FamilySection({ onModalToggle }: { onModalToggle?: (isOpen: boolean) => void }) {
  const [side, setSide] = useState<"bride" | "groom">("bride");
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const list = FAMILY[side];

  const handleClose = () => {
    setIsClosing(true);
    onModalToggle?.(false);
    setTimeout(() => {
      setSelectedMember(null);
      setIsClosing(false);
    }, 350);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center mt-4 pb-4 px-4 max-w-sm mx-auto select-none overflow-hidden">
      <SectionTitle>Our Families</SectionTitle>

      {/* Side Toggle Selector - Scale-in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        className="glass-panel mt-3 flex rounded-full p-1 border border-gold/30 shadow-xs"
      >
        {(["bride", "groom"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`rounded-full px-4 py-1 text-[10.5px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 ${
              side === s
                ? "bg-amber-900 text-white shadow-xs scale-102"
                : "text-ink/70 hover:text-ink"
            }`}
          >
            {s === "bride" ? "Bride's Side" : "Groom's Side"}
          </button>
        ))}
      </motion.div>

      {/* Family Name Title - Left-in */}
      <motion.h3
        key={side}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
        className="mt-2.5 font-display text-2xl text-ink font-normal tracking-wide"
      >
        {side === "bride" ? "Sharma Parivaar" : "Mehra Parivaar"}
      </motion.h3>

      {/* Premium Minimal Family Member Cards Grid - Staggered Left & Right */}
      <div className="mt-3 grid grid-cols-2 gap-2.5 w-full">
        {list.map((m, idx) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -35 : 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: "easeOut" }}
            onClick={() => {
              setIsClosing(false);
              setSelectedMember(m);
              onModalToggle?.(true);
            }}
            className="glass-panel group relative flex flex-col items-center justify-center p-3 overflow-hidden rounded-2xl border border-gold/40 bg-white/60 backdrop-blur-xl shadow-md hover:shadow-xl hover:border-gold hover:bg-white/80 active:scale-95 transition-all text-center"
          >
            {/* Top Gold Accent Bar */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-80" />

            {/* Glowing Avatar Initials Ring */}
            <div className="relative my-1">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 opacity-40 blur-xs group-hover:opacity-75 transition-opacity" />
              <div
                className={`relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br ${m.gradient} text-white font-display text-base font-bold shadow-md border border-white/40`}
              >
                {m.initials}
              </div>
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

      {/* Transparent Frosted Glass Honorific Bottom Sheet Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden">
          <div
            onClick={handleClose}
            className={`absolute inset-0 bg-black/50 backdrop-blur-xs ${
              isClosing ? "opacity-0 transition-opacity duration-350" : "opacity-100 transition-opacity duration-300"
            }`}
          />

          <div
            className={`relative z-10 w-full h-[65vh] max-w-md rounded-t-[2.5rem] p-6 glass-panel bg-white/30 backdrop-blur-xl border-t-2 border-x border-gold/50 shadow-[0_-20px_60px_rgba(0,0,0,0.35)] flex flex-col justify-between items-center text-center overflow-hidden ${
              isClosing ? "anim-sheet-down" : "anim-sheet-up"
            }`}
          >
            {/* Top Metallic Gold Accent Trim */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-90" />

            {/* Floating Glass Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-white/30 text-amber-950 hover:bg-white/60 active:scale-90 transition-all z-20 shadow-sm border border-gold/30 backdrop-blur-md"
            >
              <X className="size-4" />
            </button>

            {/* Top Section: Avatar Ring & Name */}
            <div className="mt-2 flex flex-col items-center">
              <div className="relative my-2">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 opacity-60 blur-md animate-pulse" />
                <div
                  className={`relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${selectedMember.gradient} text-white font-display text-2xl font-bold shadow-xl border-2 border-white/60`}
                >
                  {selectedMember.initials}
                </div>
              </div>

              <h4 className="font-display text-2xl font-semibold text-ink drop-shadow-xs">
                {selectedMember.name}
              </h4>

              {/* Relation Pill */}
              <div className="mt-1 px-3.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-500/20 rounded-full border border-gold/40 shadow-2xs flex items-center gap-1.5">
                <Sparkles className="size-3 text-amber-700" />
                <span>{selectedMember.relation}</span>
                <Sparkles className="size-3 text-amber-700" />
              </div>
            </div>

            {/* Middle Section: Honorific Role Card */}
            <div className="my-auto w-full bg-white/35 backdrop-blur-md border border-gold/30 rounded-2xl p-4 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-center gap-1.5 text-amber-900 font-display text-sm font-semibold tracking-wider">
                <Heart className="size-3.5 fill-amber-800 text-amber-800" />
                <span>{selectedMember.honorific}</span>
                <Heart className="size-3.5 fill-amber-800 text-amber-800" />
              </div>

              <Divider />

              {/* Personal Blessing Thought */}
              <div className="relative px-2">
                <Quote className="size-4 text-amber-800/40 mb-1 mx-auto" />
                <p className="font-display text-base italic text-amber-950 font-medium leading-relaxed">
                  "{selectedMember.thought}"
                </p>
              </div>
            </div>

            {/* Bottom Metallic Gold Button */}
            <button
              onClick={handleClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.22em] text-xs shadow-lg hover:shadow-gold active:scale-98 transition-all shrink-0 mt-2"
            >
              Close Blessing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}