import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING_DATE } from "../data";
import { SectionTitle } from "../ui";

function getDiff() {
  const ms = Math.max(0, new Date(WEDDING_DATE).getTime() - Date.now());
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor(ms / 3600000) % 24,
    Minutes: Math.floor(ms / 60000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  };
}

export function CountdownSection() {
  const [time, setTime] = useState(getDiff);

  useEffect(() => {
    const timer = setInterval(() => setTime(getDiff()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Directional motion variants for 2x2 grid cards
  const CARD_ANIMATIONS = [
    { x: -30, y: -20 }, // Days (Top-Left)
    { x: 30, y: -20 },  // Hours (Top-Right)
    { x: -30, y: 20 },  // Minutes (Bottom-Left)
    { x: 30, y: 20 },   // Seconds (Bottom-Right)
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-16 sm:-mt-18 pb-4 px-3 w-full max-w-sm mx-auto select-none overflow-hidden">
      <SectionTitle>Counting Down</SectionTitle>

      {/* 2x2 Grid using the Arch Frame PNG with Directional Framer Motion Animations */}
      <div className="mt-2 grid grid-cols-2 gap-x-0.5 gap-y-0.5 w-full max-w-[268px]">
        {Object.entries(time).map(([label, value], idx) => {
          const formattedValue = String(value).padStart(2, "0");
          const isSecs = label === "Seconds";
          const anim = CARD_ANIMATIONS[idx] || { x: 0, y: 20 };

          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: anim.x, y: anim.y }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + idx * 0.08, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center aspect-[5/5] w-full max-w-[130px] mx-auto overflow-visible group transition-transform duration-300 hover:scale-105"
            >
              {/* Arch Frame PNG Background Asset */}
              <img
                src="/assets/arch-frame-card.webp"
                alt="Arch Frame"
                className="absolute inset-0 size-full object-contain pointer-events-none drop-shadow-md select-none"
              />

              {/* Ticking Live Pulse Dot for Seconds */}
              {isSecs && (
                <span className="absolute top-4 right-4 flex size-2 z-20">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-amber-600" />
                </span>
              )}

              {/* Card Content centered inside the Arch Window */}
              <div className="relative z-10 flex flex-col items-center justify-center -mt-2.5 pt-0 pb-1">
                {/* Large High-Contrast Digit */}
                <span className="font-display text-3xl sm:text-4xl font-bold text-amber-950 tracking-tight tabular-nums drop-shadow-xs leading-none">
                  {formattedValue}
                </span>

                {/* Clean Label Text */}
                <span className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.2em] text-amber-950">
                  {label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}