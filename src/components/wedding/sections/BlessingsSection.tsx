import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Heart,
  Quote,
  ListFilter,
  Wand2,
  Check,
} from "lucide-react";
import { INITIAL_BLESSINGS } from "../data";
import { Divider, SectionTitle } from "../ui";

export interface BlessingItem {
  id: string;
  name: string;
  relation: string;
  text: string;
}

const RELATIONS = [
  "Well Wisher",
  "Friend of Groom",
  "Friend of Bride",
  "Family Member",
  "Relative",
  "Colleague",
];

const QUICK_WISHES = [
  "Wishing you a lifetime of endless love & togetherness!",
  "May your love story continue to blossom every single day.",
  "Congratulations to the wonderful couple! Loads of blessings.",
  "Wishing you peace, happiness, and joy on this special journey.",
];

export function BlessingsSection({
  guestName = "Rajesh Sharma",
  onModalToggle,
  onShowerTrigger,
}: {
  guestName?: string;
  onModalToggle?: (isOpen: boolean) => void;
  onShowerTrigger?: () => void;
}) {
  const [items, setItems] = useState<BlessingItem[]>(() => {
    const saved = localStorage.getItem("wedding_blessings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore fallback
      }
    }
    return INITIAL_BLESSINGS.map((b, idx) => ({
      id: `init-${idx}`,
      name: b.name,
      relation: "Well Wisher",
      text: b.text,
    }));
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [filterRelation, setFilterRelation] = useState("All");

  // Form states
  const [selectedRelation, setSelectedRelation] = useState("Well Wisher");
  const [text, setText] = useState("");

  const total = items.length;

  useEffect(() => {
    localStorage.setItem("wedding_blessings", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (isInputOpen || isViewAllOpen) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total, isInputOpen, isViewAllOpen]);

  const go = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + total) % total);
  };

  const handleAddBlessing = () => {
    if (!text.trim()) return;
    const newItem: BlessingItem = {
      id: `blessing-${Date.now()}`,
      name: guestName,
      relation: selectedRelation,
      text: text.trim(),
    };
    setItems((prev) => [newItem, ...prev]);
    setActiveIdx(0);
    setText("");
    setSelectedRelation("Well Wisher");
    setIsInputOpen(false);
    onModalToggle?.(false);
    onShowerTrigger?.();
  };

  const handleOpenInputModal = () => {
    setIsInputOpen(true);
    onModalToggle?.(true);
  };

  const handleCloseInputModal = () => {
    setIsInputOpen(false);
    onModalToggle?.(false);
  };

  const handleOpenDrawer = () => {
    setIsViewAllOpen(true);
    onModalToggle?.(true);
  };

  const handleCloseDrawer = () => {
    setIsViewAllOpen(false);
    onModalToggle?.(false);
  };

  const filteredItems = items.filter(
    (item) => filterRelation === "All" || item.relation === filterRelation
  );

  return (
    <div className="flex h-full flex-col items-center justify-center mt-3 pb-4 px-3 w-full max-w-sm mx-auto select-none">
      <SectionTitle>Blessings</SectionTitle>

      {/* Subtitle Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-2.5 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-500/15 backdrop-blur-md rounded-full border border-gold/40 shadow-2xs flex items-center justify-center"
      >
        <span>Heartfelt Wishes for Aanya & Rohan</span>
      </motion.div>

      {/* Enhanced 3D Card Deck Carousel */}
      <div
        className="relative mt-4 w-full h-[225px] flex items-center justify-center overflow-visible"
        style={{ perspective: "1000px" }}
      >
        {/* Left Arrow Button */}
        <button
          aria-label="Previous blessing"
          onClick={() => go(-1)}
          className="glass-panel absolute -left-1.5 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-md border border-gold/40 cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* 3D Cards Stack with Framer Motion Spring Animations */}
        <div
          className="relative w-[240px] sm:w-[260px] h-[210px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, idx) => {
            let diff = idx - activeIdx;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;

            let translateX = "0%";
            let translateY = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;
            let pointerEvents: "auto" | "none" = "auto";

            if (diff === 0) {
              translateX = "0%";
              translateY = 0;
              translateZ = 0;
              rotateY = 0;
              scale = 1.0;
              opacity = 1;
              zIndex = 30;
            } else if (diff === -1) {
              translateX = "-78%";
              translateY = -4;
              translateZ = -120;
              rotateY = 24;
              scale = 0.85;
              opacity = 0.75;
              zIndex = 20;
            } else if (diff === 1) {
              translateX = "78%";
              translateY = -4;
              translateZ = -120;
              rotateY = -24;
              scale = 0.85;
              opacity = 0.75;
              zIndex = 20;
            } else if (diff === -2) {
              translateX = "-135%";
              translateY = -8;
              translateZ = -220;
              rotateY = 40;
              scale = 0.68;
              opacity = 0.35;
              zIndex = 10;
            } else if (diff === 2) {
              translateX = "135%";
              translateY = -8;
              translateZ = -220;
              rotateY = -40;
              scale = 0.68;
              opacity = 0.35;
              zIndex = 10;
            } else {
              translateX = diff < 0 ? "-180%" : "180%";
              translateY = -12;
              translateZ = -300;
              rotateY = diff < 0 ? 45 : -45;
              scale = 0.6;
              opacity = 0;
              zIndex = 10;
              pointerEvents = "none";
            }

            if (opacity === 0) return null;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: translateX,
                  y: translateY,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                  mass: 0.85,
                }}
                whileHover={
                  isCenter
                    ? { scale: 1.03, y: -4 }
                    : { scale: scale * 1.05 }
                }
                whileTap={{ scale: 0.97 }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -30) go(1);
                  else if (info.offset.x > 30) go(-1);
                }}
                onClick={() => !isCenter && setActiveIdx(idx)}
                className={`glass-panel absolute inset-0 rounded-3xl p-4 text-center border-2 transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-2xl ${
                  isCenter
                    ? "border-amber-400/70 bg-gradient-to-b from-white/98 via-[#FFFDF7]/95 to-[#FAF3E5]/98 shadow-[0_16px_40px_rgba(217,119,6,0.3)] cursor-grab active:cursor-grabbing"
                    : "border-gold/35 bg-gradient-to-b from-white/90 via-[#FFFDF7]/85 to-[#FAF3E5]/90 cursor-pointer opacity-80"
                }`}
                style={{
                  zIndex,
                  pointerEvents,
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Top Gold Shimmer Line with Animated Light Effect */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 opacity-90 rounded-t-3xl overflow-hidden">
                  {isCenter && (
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    />
                  )}
                </div>

                {/* Top Relation Tag */}
                <div className="mt-1 self-center px-3 py-0.5 text-[8.5px] font-bold uppercase tracking-widest text-amber-900 bg-amber-500/15 backdrop-blur-xs rounded-full border border-gold/40 shadow-2xs flex items-center justify-center">
                  <span>{item.relation}</span>
                </div>

                {/* Quote Text with Framer Motion AnimatePresence */}
                <div className="my-auto py-1 px-1">
                  <Quote className="size-4 text-amber-800/60 mb-1 mx-auto" />
                  <p className="font-display text-xs sm:text-sm italic text-amber-950 font-semibold leading-relaxed line-clamp-3">
                    "{item.text}"
                  </p>
                </div>

                {/* Sender Name */}
                <div className="pb-0.5">
                  <span className="font-display text-xs font-bold text-amber-950 tracking-wider">
                    &mdash; {item.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          aria-label="Next blessing"
          onClick={() => go(1)}
          className="glass-panel absolute -right-1.5 z-40 grid size-8 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-md border border-gold/40 cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {items.map((_, idx) => (
          <button
            key={`blessing-dot-${idx}`}
            onClick={() => setActiveIdx(idx)}
            aria-label={`Jump to blessing ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIdx
                ? "w-4 bg-amber-800"
                : "w-1.5 bg-amber-900/30 hover:bg-amber-900/50"
            }`}
          />
        ))}
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-4 flex flex-col gap-2.5 w-full max-w-[220px] items-center">
        <motion.button
          onClick={handleOpenInputModal}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center justify-center px-6 py-2.5 rounded-full w-full mx-auto overflow-hidden shadow-lg transition-all duration-300 border border-amber-400/60 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-200/30 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute inset-0.5 rounded-full border border-amber-300/40 pointer-events-none" />
          <span className="relative z-10 font-display text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-100 drop-shadow-xs">
            Send Blessing
          </span>
        </motion.button>

        <button
          onClick={handleOpenDrawer}
          className="w-full py-2 px-4 rounded-full glass-panel bg-white/70 backdrop-blur-md border border-gold/40 text-amber-950 font-bold uppercase tracking-[0.18em] text-[9.5px] shadow-sm hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ListFilter className="size-3.5 text-amber-800" />
          <span>View All Blessings ({items.length})</span>
        </button>
      </div>

      {/* SEND BLESSING DRAWER MODAL */}
      <AnimatePresence>
        {isInputOpen && (
          <div className="absolute inset-0 z-50 flex items-end justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseInputModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative z-10 w-full max-w-md h-[74vh] max-h-[600px] rounded-t-[2.5rem] p-5 glass-panel bg-white/95 backdrop-blur-2xl border-t-2 border-x border-gold/50 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between text-center overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gold/30 pb-3 pt-1">
                <div className="flex items-center gap-2">
                  <Heart className="size-5 text-amber-700 fill-amber-700/20" />
                  <h4 className="font-display text-xl sm:text-2xl font-semibold text-ink">
                    Send Your Blessing
                  </h4>
                </div>
                <button
                  onClick={handleCloseInputModal}
                  aria-label="Close modal"
                  className="grid size-8 place-items-center rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 active:scale-90 transition-all border border-gold/30 cursor-pointer"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto scrollbar-none py-2 pr-1 space-y-3">
                {/* Guest Badge */}
                <div className="text-left">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1 block">
                    Sending Blessing As
                  </label>
                  <div className="w-full rounded-2xl border border-gold/40 bg-amber-500/15 px-4 py-2 flex items-center justify-between shadow-2xs">
                    <span className="font-display text-sm font-bold text-amber-950">
                      Dear {guestName}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-amber-900 font-bold bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-gold/30">
                      Guest
                    </span>
                  </div>
                </div>

                {/* Relation Selector Dropdown */}
                <div className="text-left">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1 block">
                    Relation to Couple
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRelation}
                      onChange={(e) => setSelectedRelation(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-gold/40 bg-white/90 px-4 py-2.5 pr-10 text-xs sm:text-sm font-semibold text-amber-950 outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 shadow-2xs cursor-pointer"
                    >
                      {RELATIONS.map((rel) => (
                        <option key={rel} value={rel} className="bg-white text-amber-950 font-semibold py-1">
                          {rel}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-amber-800 pointer-events-none" />
                  </div>
                </div>

                {/* Quick Wishes Templates */}
                <div className="text-left">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1 flex items-center gap-1">
                    <Wand2 className="size-3 text-amber-700" />
                    <span>Quick Wishes Templates</span>
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {QUICK_WISHES.map((wish, wIdx) => {
                      const isSelected = text === wish;
                      return (
                        <button
                          key={`wish-${wIdx}`}
                          type="button"
                          onClick={() => setText(wish)}
                          className={`p-2 rounded-xl text-left text-xs font-display italic transition-all border cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? "bg-amber-500/20 border-gold text-amber-950 font-semibold"
                              : "bg-white/70 border-gold/30 text-amber-900/80 hover:bg-white"
                          }`}
                        >
                          <span>"{wish}"</span>
                          {isSelected && <Check className="size-3.5 text-amber-800 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="text-left">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1 block">
                    Your Personal Message
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    placeholder="Write your wishes for Aanya & Rohan..."
                    className="w-full resize-none rounded-2xl border border-gold/40 bg-white/80 px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 placeholder:text-ink/40 shadow-2xs"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 border-t border-gold/20 shrink-0">
                <button
                  onClick={handleAddBlessing}
                  disabled={!text.trim()}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.22em] text-xs shadow-lg hover:shadow-gold disabled:opacity-40 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Send Blessing</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW ALL BLESSINGS DRAWER MODAL */}
      <AnimatePresence>
        {isViewAllOpen && (
          <div className="absolute inset-0 z-50 flex items-end justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDrawer}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative z-10 w-full max-w-md h-[82vh] max-h-[680px] rounded-t-[2.5rem] p-5 glass-panel bg-white/95 backdrop-blur-2xl border-t-2 border-x border-gold/50 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between items-center text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDrawer}
                aria-label="Close all blessings"
                className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 active:scale-90 transition-all z-20 shadow-md border border-gold/40 backdrop-blur-md cursor-pointer"
              >
                <X className="size-4" />
              </button>

              {/* Drawer Header */}
              <div className="w-full border-b border-gold/30 pb-3 pt-1 text-center pr-8">
                <h4 className="font-display text-2xl font-normal text-ink">All Blessings</h4>
                <p className="text-[10px] uppercase tracking-widest text-amber-900 font-semibold mt-0.5">
                  {items.length} Heartfelt Wishes Received
                </p>
              </div>

              {/* Filter Pills */}
              <div className="w-full flex items-center gap-1.5 overflow-x-auto py-2 border-b border-gold/20 scrollbar-none">
                {["All", ...RELATIONS].map((rel) => (
                  <button
                    key={`filter-${rel}`}
                    onClick={() => setFilterRelation(rel)}
                    className={`px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                      filterRelation === rel
                        ? "bg-amber-900 text-white border-gold shadow-xs"
                        : "bg-white/60 text-amber-950 border-gold/30 hover:bg-white"
                    }`}
                  >
                    {rel}
                  </button>
                ))}
              </div>

              {/* Blessings List */}
              <div className="flex-1 w-full overflow-y-auto scrollbar-none py-3 space-y-2.5 px-1">
                {filteredItems.map((b) => (
                  <div
                    key={b.id}
                    className="w-full bg-white/70 backdrop-blur-md border border-gold/35 rounded-2xl p-3.5 text-left shadow-2xs relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-amber-900 bg-amber-500/20 rounded-full border border-gold/30">
                        {b.relation}
                      </span>
                      <span className="font-display text-xs font-bold text-amber-950">
                        &mdash; {b.name}
                      </span>
                    </div>
                    <p className="font-display text-xs sm:text-sm italic text-amber-950 leading-relaxed">
                      "{b.text}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer Close */}
              <button
                onClick={handleCloseDrawer}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.22em] text-xs shadow-lg hover:shadow-gold active:scale-98 transition-all shrink-0 mt-2 cursor-pointer"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}