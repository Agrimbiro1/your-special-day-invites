import { useEffect, useState } from "react";
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

const DEFAULT_ITEMS: BlessingItem[] = INITIAL_BLESSINGS.map((b, idx) => ({
  id: `b-${idx}`,
  name: b.name,
  relation: idx % 2 === 0 ? "Family Member" : "Friend of Groom",
  text: b.text,
}));

export function BlessingsSection({ onModalToggle }: { onModalToggle?: (isOpen: boolean) => void }) {
  const [items, setItems] = useState<BlessingItem[]>(DEFAULT_ITEMS);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [selectedRelation, setSelectedRelation] = useState(RELATIONS[0]!);
  const [text, setText] = useState("");

  const total = items.length;

  // Continuous Silky Auto-Rotation Timer for Carousel
  useEffect(() => {
    if (isInputOpen || isViewAllOpen) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [total, isInputOpen, isViewAllOpen]);

  const go = (d: number) => {
    setActiveIdx((prev) => (prev + d + total) % total);
  };

  const handleOpenInputModal = () => {
    setIsInputOpen(true);
    onModalToggle?.(true);
  };

  const handleCloseInputModal = () => {
    setIsInputOpen(false);
    onModalToggle?.(false);
  };

  const handleAddBlessing = () => {
    if (!text.trim()) return;
    const newItem: BlessingItem = {
      id: `user-${Date.now()}`,
      name: name.trim() || "A Well-Wisher",
      relation: selectedRelation,
      text: text.trim(),
    };
    setItems((prev) => [newItem, ...prev]);
    setName("");
    setText("");
    setSelectedRelation(RELATIONS[0]!);
    handleCloseInputModal();
    setActiveIdx(0); // Jump to newly added blessing
  };

  const handleOpenDrawer = () => {
    setIsDrawerClosing(false);
    setIsViewAllOpen(true);
    onModalToggle?.(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerClosing(true);
    onModalToggle?.(false);
    setTimeout(() => {
      setIsViewAllOpen(false);
      setIsDrawerClosing(false);
    }, 350);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-2 pb-4 px-3 w-full max-w-sm mx-auto select-none">
      <SectionTitle>Blessings</SectionTitle>

      {/* Subtitle Emblem Badge */}
      <div className="mt-2.5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-500/15 backdrop-blur-md rounded-full border border-gold/40 shadow-2xs flex items-center gap-1.5">
        <Sparkles className="size-3 text-amber-700" />
        <span>Heartfelt Wishes for the Couple</span>
        <Sparkles className="size-3 text-amber-700" />
      </div>

      {/* Fully Animated 3D Perspective Carousel Container */}
      <div
        className="relative mt-3.5 w-full h-[215px] flex items-center justify-center overflow-visible"
        style={{ perspective: "900px" }}
      >
        {/* Left Arrow Button */}
        <button
          aria-label="Previous blessing"
          onClick={() => go(-1)}
          className="glass-panel absolute -left-1 z-40 grid size-7 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-md border border-gold/40"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* 3D Animated Card Track */}
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
              translateY = "4px";
              translateZ = "-40px";
              rotateY = "16deg";
              scale = 0.83;
              opacity = 0.5;
              zIndex = 20;
            } else if (diff === 1) {
              translateX = "76%";
              translateY = "4px";
              translateZ = "-40px";
              rotateY = "-16deg";
              scale = 0.83;
              opacity = 0.5;
              zIndex = 20;
            } else {
              translateX = diff < 0 ? "-130%" : "130%";
              translateY = "0px";
              translateZ = "-80px";
              rotateY = "0deg";
              scale = 0.6;
              opacity = 0;
              zIndex = 10;
              pointerEvents = "none";
            }

            return (
              <div
                key={item.id}
                onClick={() => !isCenter && setActiveIdx(idx)}
                className={`glass-panel absolute inset-0 rounded-3xl p-4 text-center shadow-xl border border-gold/40 bg-white/80 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] flex flex-col justify-between overflow-hidden ${
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
                {/* Top Metallic Gold Accent Trim */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-90 rounded-t-3xl" />

                {/* Floating Sparkle Icon */}
                <Sparkles className="absolute right-3.5 top-3.5 size-3 text-amber-700/50" />

                {/* Relation Badge Pill */}
                <div className="mt-1 self-center px-3 py-0.5 text-[8.5px] font-bold uppercase tracking-widest text-amber-900 bg-amber-500/20 backdrop-blur-xs rounded-full border border-gold/40 shadow-2xs flex items-center gap-1">
                  <span>✦</span>
                  <span>{item.relation}</span>
                  <span>✦</span>
                </div>

                {/* Quote Message */}
                <div className="my-auto py-1 px-1">
                  <Quote className="size-4 text-amber-700/50 mb-1 mx-auto" />
                  <p className="font-display text-sm sm:text-base italic text-amber-950 font-medium leading-relaxed line-clamp-3">
                    "{item.text}"
                  </p>
                </div>

                {/* Author Name */}
                <div className="pb-0.5">
                  <span className="font-display text-xs font-bold text-ink tracking-wide">
                    &mdash; {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          aria-label="Next blessing"
          onClick={() => go(1)}
          className="glass-panel absolute -right-1 z-40 grid size-7 place-items-center rounded-full text-amber-950 hover:bg-white/90 active:scale-90 transition-all shadow-md border border-gold/40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Vertical Action Buttons (Top: View All, Bottom: Send Blessing) */}
      <div className="mt-4 flex flex-col gap-2.5 w-full max-w-[215px] items-center">
        {/* Top Button: View All Blessings */}
        <button
          onClick={handleOpenDrawer}
          className="w-full py-2.5 px-4 rounded-full glass-panel bg-white/70 backdrop-blur-md border border-gold/40 text-amber-950 font-bold uppercase tracking-[0.18em] text-[10px] shadow-md hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <ListFilter className="size-3.5 text-amber-800" />
          <span>View All Blessings ({items.length})</span>
        </button>

        {/* Bottom Button: Send Blessing */}
        <button
          onClick={handleOpenInputModal}
          className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.18em] text-[10px] shadow-lg hover:shadow-gold hover:from-amber-800 hover:to-amber-800 active:scale-95 transition-all flex items-center justify-center"
        >
          <span>Send Blessing</span>
        </button>
      </div>

      {/* Input Blessing Modal Form (Increased size on desktop screen: sm:max-w-md md:max-w-lg sm:p-7) */}
      {isInputOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={handleCloseInputModal}
            className="absolute inset-0 bg-black/65 backdrop-blur-xs animate-fade-in"
          />

          <div className="anim-soft-in relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg rounded-3xl p-5 sm:p-7 glass-panel bg-white/95 backdrop-blur-2xl border-2 border-gold/50 shadow-2xl flex flex-col text-center">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/30 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="size-5 text-amber-700 fill-amber-700/20" />
                <h4 className="font-display text-xl sm:text-2xl font-semibold text-ink">Send Your Blessing</h4>
              </div>
              <button
                onClick={handleCloseInputModal}
                className="grid size-8 place-items-center rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 active:scale-90 transition-all"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Name Input */}
            <div className="mt-4 text-left">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1.5 block">
                Your Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-gold/40 bg-white/80 px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 placeholder:text-ink/40"
              />
            </div>

            {/* Relation Selector */}
            <div className="mt-3.5 text-left">
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
                      className={`px-3 py-1.5 rounded-full text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider transition-all border ${
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

            {/* Blessing Message Textarea */}
            <div className="mt-3.5 text-left">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1.5 block">
                Your Heartfelt Blessing
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="Write your wishes for Aanya & Rohan..."
                className="w-full resize-none rounded-2xl border border-gold/40 bg-white/80 px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 placeholder:text-ink/40"
              />
            </div>

            {/* Submit Button (No + Icon) */}
            <button
              onClick={handleAddBlessing}
              disabled={!text.trim()}
              className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.22em] text-xs shadow-lg hover:shadow-gold disabled:opacity-40 active:scale-98 transition-all"
            >
              Send Blessing
            </button>
          </div>
        </div>
      )}

      {/* Fully Decorated 65% Height View All Blessings Bottom Sheet Drawer Modal */}
      {isViewAllOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden">
          <div
            onClick={handleCloseDrawer}
            className={`absolute inset-0 bg-black/60 backdrop-blur-xs ${
              isDrawerClosing ? "opacity-0 transition-opacity duration-350" : "opacity-100 transition-opacity duration-300"
            }`}
          />

          <div
            className={`relative z-10 w-full h-[65vh] max-w-md rounded-t-[2.5rem] p-5 glass-panel bg-white/40 backdrop-blur-2xl border-t-2 border-x border-gold/50 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between items-center text-center overflow-hidden ${
              isDrawerClosing ? "anim-sheet-down" : "anim-sheet-up"
            }`}
          >
            {/* Top Metallic Gold Accent Trim */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-90" />

            {/* Floating Glass Close Button */}
            <button
              onClick={handleCloseDrawer}
              aria-label="Close all blessings"
              className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-white/40 text-amber-950 hover:bg-white/70 active:scale-90 transition-all z-20 shadow-md border border-gold/40 backdrop-blur-md"
            >
              <X className="size-4" />
            </button>

            {/* Drawer Title Header */}
            <div className="w-full border-b border-gold/30 pb-3 pt-1 text-center">
              <h4 className="font-display text-2xl font-normal text-ink">All Blessings</h4>
              <p className="text-[10px] uppercase tracking-widest text-amber-900 font-semibold mt-0.5">
                ✦ {items.length} Heartfelt Wishes Received ✦
              </p>
            </div>

            {/* Scrollable Blessings List */}
            <div className="flex-1 w-full overflow-y-auto py-3 space-y-2.5 px-1">
              {items.map((b) => (
                <div
                  key={b.id}
                  className="w-full bg-white/45 backdrop-blur-md border border-gold/35 rounded-2xl p-3.5 text-left shadow-2xs relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-amber-900 bg-amber-500/20 rounded-full border border-gold/30">
                      ✦ {b.relation}
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

            {/* Drawer Close Footer Button */}
            <button
              onClick={handleCloseDrawer}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.22em] text-xs shadow-lg hover:shadow-gold active:scale-98 transition-all shrink-0 mt-2"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}