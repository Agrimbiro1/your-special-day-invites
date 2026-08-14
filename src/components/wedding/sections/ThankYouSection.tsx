import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { COUPLE } from "../data";

interface ThankYouSectionProps {
  guestName?: string;
  onShowerTrigger?: () => void;
}

interface HeartParticle {
  id: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

const HEART_COLORS = [
  "#e11d48", // Ruby Red
  "#be123c", // Crimson
  "#f43f5e", // Rose
  "#fb7185", // Soft Pink
  "#f59e0b", // Amber Gold
  "#ffd700", // Bright Gold
  "#ec4899", // Fuchsia Pink
  "#ffffff", // Shimmer White
];

export function ThankYouSection({
  guestName = "Rajesh Sharma",
  onShowerTrigger: _onShowerTrigger,
}: ThankYouSectionProps) {
  const [burstCount, setBurstCount] = useState(0);

  const particles = useMemo<HeartParticle[]>(() => {
    if (burstCount === 0) return [];
    return Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * 360 + (Math.random() * 15 - 7.5);
      const velocity = 50 + Math.random() * 80;
      const rad = (angle * Math.PI) / 180;
      const targetX = Math.cos(rad) * velocity;
      const targetY = Math.sin(rad) * velocity - 30; // gentle float
      return {
        id: burstCount * 100 + i,
        targetX,
        targetY,
        color: HEART_COLORS[i % HEART_COLORS.length]!,
        size: 8 + Math.random() * 6,
        rotation: Math.random() * 360 - 180,
        delay: Math.random() * 0.08,
      };
    });
  }, [burstCount]);

  const handleHeartClick = () => {
    setBurstCount((prev) => prev + 1);
  };

  return (
    <div className="relative z-20 flex h-full flex-col items-center justify-center -mt-16 sm:-mt-18 px-4 py-2 text-center select-none overflow-hidden w-full max-w-sm mx-auto">
      {/* Main Content Container (No Card Layout) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
        }}
        className="relative z-10 flex w-full flex-col items-center justify-center"
      >
        {/* Main "Thank You" Header with Personalized Guest Name */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
          }}
          className="mt-1 flex flex-col items-center"
        >
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-amber-900 bg-amber-500/15 px-3.5 py-0.5 rounded-full border border-gold/40 shadow-2xs mb-1 flex items-center justify-center">
            Dear {guestName}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-wide text-amber-950 capitalize drop-shadow-2xs leading-tight">
            Thank You
          </h2>
        </motion.div>

        {/* Enhanced Golden Flourish Diamond SVG Divider */}
        <motion.div
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.65, ease: "easeOut" } },
          }}
          className="w-full max-w-[220px] my-2 flex items-center justify-center text-amber-800"
        >
          <svg viewBox="0 0 240 24" fill="none" className="w-full h-auto text-amber-700 drop-shadow-2xs">
            {/* Left Flourish Line */}
            <path
              d="M10 12 H90 C95 12 98 7 104 7 C108 7 110 12 112 15"
              stroke="url(#goldGradientLeft)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Right Flourish Line */}
            <path
              d="M230 12 H150 C145 12 142 7 136 7 C132 7 130 12 128 15"
              stroke="url(#goldGradientRight)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Center Diamond Ornament */}
            <polygon points="120,4 127,12 120,20 113,12" fill="url(#goldGradientCenter)" />
            <circle cx="120" cy="12" r="2" fill="#FFFDF7" />
            <circle cx="104" cy="7" r="1.5" fill="url(#goldGradientCenter)" />
            <circle cx="136" cy="7" r="1.5" fill="url(#goldGradientCenter)" />

            <defs>
              <linearGradient id="goldGradientLeft" x1="10" y1="12" x2="112" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#b45309" stopOpacity="0.2" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="goldGradientRight" x1="230" y1="12" x2="128" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#b45309" stopOpacity="0.2" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="goldGradientCenter" x1="113" y1="4" x2="127" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f59e0b" />
                <stop offset="1" stopColor="#b45309" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Gratitude Body Message */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
          }}
          className="mt-1 font-display text-sm sm:text-base italic leading-relaxed text-amber-950 font-medium max-w-[300px] px-2"
        >
          "Your love, presence, and blessings fill our hearts
          <br />
          with joy as we begin our new journey together."
        </motion.p>

        {/* Couple Sign-off */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
          }}
          className="mt-3 flex flex-col items-center justify-center"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-amber-900/70">
            With Love &amp; Respect
          </span>
          <h3 className="mt-0.5 font-display text-2xl sm:text-3xl font-bold tracking-wider text-amber-950 drop-shadow-xs">
            {COUPLE.bride} &amp; {COUPLE.groom}
          </h3>

          <span className="mt-1.5 text-[9.5px] uppercase tracking-[0.25em] text-amber-900/80 font-bold bg-amber-500/15 px-3 py-0.5 rounded-full border border-gold/30">
            Dec 6, 2026 &middot; Jaipur
          </span>
        </motion.div>

        {/* Animated Heart Button & Party Bomb Petal Shower Burst */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 180 } },
          }}
          className="relative mt-2.5 flex flex-col items-center justify-center"
        >

          <motion.button
            onClick={handleHeartClick}
            aria-label="Trigger heart petal shower party bomb"
            whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0] }}
            whileTap={{ scale: 0.82 }}
            className="group relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 via-amber-100 to-rose-200 text-rose-600 border-2 border-gold/60 shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:shadow-[0_0_30px_rgba(244,63,94,0.85)] active:shadow-inner cursor-pointer transition-shadow duration-300"
          >
            {/* Background glowing halo */}
            <motion.div
              animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-rose-400/40 blur-md pointer-events-none"
            />

            {/* Interactive Pulsing Heart Icon */}
            <Heart className="relative size-6 fill-rose-500 text-rose-600 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />
          </motion.button>

          {/* Party Bomb Heart Petal Burst Explosive Particles */}
          <AnimatePresence>
            {particles.length > 0 && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.2, rotate: 0 }}
                    animate={{
                      x: p.targetX,
                      y: [0, p.targetY, p.targetY + 190],
                      opacity: [1, 1, 0.9, 0],
                      scale: [0.2, 1.35, 0.85],
                      rotate: p.rotation,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2.4 + Math.random() * 0.8,
                      delay: p.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute flex items-center justify-center z-50"
                  >
                    <Heart
                      className="fill-current text-current"
                      style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        color: p.color,
                        filter: `drop-shadow(0 2px 8px ${p.color}aa)`,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}