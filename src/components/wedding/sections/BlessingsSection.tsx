import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Heart,
  Quote,
  ListFilter,
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

export function BlessingsSection({
  guestName = "Rajesh Sharma",
  onModalToggle,
}: {
  guestName?: string;
  onModalToggle?: (isOpen: boolean) => void;
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

  return (
    <div className="flex h-full flex-col items-center justify-center mt-3 pb-4 px-3 w-full max-w-sm mx-auto select-none">
      <SectionTitle>Blessings</SectionTitle>

      <div className="mt-3 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-500/15 backdrop-blur-md rounded-full border border-gold/40 shadow-2xs flex items-center justify-center">
        <span>Heartfelt Wishes for the Couple</span>
      </div>

      <div
        className="relative mt-4.5 w-full h-[215px] flex items-center justify-center overflow-visible"
        style={{ perspective: "900px" }}
      >
        <button
          aria-label="Previous blessing"
          onClick={() => go(-1)}
          className="glass-panel absolute -left-1 z-40 grid size-7 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-md border border-gold/40"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div
          className="relative w-[235px] sm:w-[255px] h-[205px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, idx) => {
            let diff = idx - activeIdx;
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
              translateX = "-76%";
              translateY = "-5px";
              translateZ = "-100px";
              rotateY = "20deg";
              scale = 0.84;
              opacity = 0.7;
              zIndex = 20;
            } else if (diff === 1) {
              translateX = "76%";
              translateY = "-5px";
              translateZ = "-100px";
              rotateY = "-20deg";
              scale = 0.84;
              opacity = 0.7;
              zIndex = 20;
            } else if (diff === -2) {
              translateX = "-130%";
              translateY = "-10px";
              translateZ = "-200px";
              rotateY = "35deg";
              scale = 0.68;
              opacity = 0.35;
              zIndex = 10;
            } else if (diff === 2) {
              translateX = "130%";
              translateY = "-10px";
              translateZ = "-200px";
              rotateY = "-35deg";
              scale = 0.68;
              opacity = 0.35;
              zIndex = 10;
            } else {
              translateX = diff < 0 ? "-180%" : "180%";
              translateY = "-15px";
              translateZ = "-300px";
              rotateY = diff < 0 ? "45deg" : "-45deg";
              scale = 0.6;
              opacity = 0;
              zIndex = 10;
              pointerEvents = "none";
            }

            if (opacity === 0) return null;

            return (
              <div
                key={item.id}
                onClick={() => !isCenter && setActiveIdx(idx)}
                className={`glass-panel absolute inset-0 rounded-3xl p-4 text-center shadow-2xl border-2 border-gold/45 bg-gradient-to-b from-white/95 via-[#FFFDF7]/90 to-[#FAF3E5]/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] flex flex-col justify-between overflow-hidden ${
                  !isCenter ? "cursor-pointer hover:opacity-80" : ""
                }`}
                style={{
                  transform: `translate3d(${translateX}, ${translateY}, ${translateZ}) rotateY(${rotateY}) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents,
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 opacity-90 rounded-t-3xl" />
                <div className="mt-1 self-center px-3 py-0.5 text-[8.5px] font-bold uppercase tracking-widest text-amber-900 bg-amber-500/15 backdrop-blur-xs rounded-full border border-gold/40 shadow-2xs flex items-center justify-center">
                  <span>{item.relation}</span>
                </div>
                <div className="my-auto py-1 px-1">
                  <Quote className="size-4 text-amber-800/60 mb-1 mx-auto" />
                  <p className="font-display text-sm sm:text-base italic text-amber-950 font-semibold leading-relaxed line-clamp-3">
                    "{item.text}"
                  </p>
                </div>
                <div className="pb-0.5">
                  <span className="font-display text-xs font-bold text-amber-950 tracking-wider">
                    &mdash; {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          aria-label="Next blessing"
          onClick={() => go(1)}
          className="glass-panel absolute -right-1 z-40 grid size-7 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-md border border-gold/40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 w-full max-w-[215px] items-center">
        <button
          onClick={handleOpenDrawer}
          className="w-full py-2.5 px-4 rounded-full glass-panel bg-white/70 backdrop-blur-md border border-gold/40 text-amber-950 font-bold uppercase tracking-[0.18em] text-[10px] shadow-md hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ListFilter className="size-3.5 text-amber-800" />
          <span>View All Blessings ({items.length})</span>
        </button>

        <motion.button
          onClick={handleOpenInputModal}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center justify-center px-6 py-2.5 rounded-full w-full max-w-[215px] mx-auto overflow-hidden shadow-lg transition-all duration-300 border border-amber-400/60 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-200/30 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute inset-0.5 rounded-full border border-amber-300/40 pointer-events-none" />
          <span className="relative z-10 font-display text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-100 drop-shadow-xs">
            Send Blessing
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isInputOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseInputModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative z-10 w-full max-w-md h-[68vh] rounded-t-[2.5rem] p-5 glass-panel bg-white/95 backdrop-blur-2xl border-t-2 border-x border-gold/50 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between text-center overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-gold/30 pb-3 pt-1">
                <div className="flex items-center gap-2">
                  <Heart className="size-5 text-amber-700 fill-amber-700/20" />
                  <h4 className="font-display text-xl sm:text-2xl font-semibold text-ink">Send Your Blessing</h4>
                </div>
                <button
                  onClick={handleCloseInputModal}
                  aria-label="Close modal"
                  className="grid size-8 place-items-center rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 active:scale-90 transition-all border border-gold/30 cursor-pointer"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2">
                <div className="text-left">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1.5 block">
                    Sending Blessing As
                  </label>
                  <div className="w-full rounded-2xl border border-gold/40 bg-amber-500/15 px-4 py-2.5 flex items-center justify-between shadow-2xs">
                    <span className="font-display text-sm font-bold text-amber-950">Dear {guestName}</span>
                    <span className="text-[9px] uppercase tracking-wider text-amber-900 font-bold bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-gold/30">
                      Guest
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-left">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1.5 block">
                    Relation to Bride & Groom
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {RELATIONS.map((rel) => {
                      const isSelected = selectedRelation === rel;
                      return (
                        <button
                          key={rel}
                          type="button"
                          onClick={() => setSelectedRelation(rel)}
                          className={`px-3 py-1.5 rounded-full text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                            isSelected
                              ? "bg-amber-900 text-white border-gold shadow-xs"
                              : "bg-white/60 text-amber-950 border-gold/30 hover:bg-white"
                          }`}
                        >
                          {rel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 text-left">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1.5 block">
                    Your Heartfelt Blessing
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    placeholder="Write your wishes for Aanya & Rohan..."
                    className="w-full resize-none rounded-2xl border border-gold/40 bg-white/80 px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 placeholder:text-ink/40"
                  />
                </div>
              </div>

              <button
                onClick={handleAddBlessing}
                disabled={!text.trim()}
                className="mt-2 w-full py-3 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.22em] text-xs shadow-lg hover:shadow-gold disabled:opacity-40 active:scale-98 transition-all cursor-pointer shrink-0"
              >
                Send Blessing
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isViewAllOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDrawer}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative z-10 w-full max-w-md h-[65vh] rounded-t-[2.5rem] p-5 glass-panel bg-white/95 backdrop-blur-2xl border-t-2 border-x border-gold/50 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between items-center text-center overflow-hidden"
            >
              <button
                onClick={handleCloseDrawer}
                aria-label="Close all blessings"
                className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 active:scale-90 transition-all z-20 shadow-md border border-gold/40 backdrop-blur-md cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <div className="w-full border-b border-gold/30 pb-3 pt-1 text-center">
                <h4 className="font-display text-2xl font-normal text-ink">All Blessings</h4>
                <p className="text-[10px] uppercase tracking-widest text-amber-900 font-semibold mt-0.5">
                  {items.length} Heartfelt Wishes Received
                </p>
              </div>

              <div className="flex-1 w-full overflow-y-auto py-3 space-y-2.5 px-1">
                {items.map((b) => (
                  <div
                    key={b.id}
                    className="w-full bg-white/60 backdrop-blur-md border border-gold/35 rounded-2xl p-3.5 text-left shadow-2xs relative overflow-hidden"
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