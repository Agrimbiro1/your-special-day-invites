import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { PartyPopper } from "lucide-react";

interface CelebrationExplosionProps {
  onComplete?: () => void;
}

const CONFETTI_COUNT = 24;
const FIREWORK_RAYS = 12;

const CONFETTI_COLORS = [
  "#ffd700", // Bright Gold
  "#f59e0b", // Amber Gold
  "#ef4444", // Royal Crimson
  "#ec4899", // Rose Pink
  "#10b981", // Emerald Green
  "#3b82f6", // Royal Blue
  "#ffffff", // Shimmering White
];

export function CelebrationExplosion({ onComplete }: CelebrationExplosionProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const particles = useMemo(() => {
    return Array.from({ length: CONFETTI_COUNT }, (_, i) => {
      const angle = (i / CONFETTI_COUNT) * 360 + (Math.random() * 20 - 10);
      const velocity = 130 + Math.random() * 250;
      const rad = (angle * Math.PI) / 180;
      const targetX = Math.cos(rad) * velocity;
      const targetY = Math.sin(rad) * velocity - 80; // Upward party bomb burst
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const size = 6 + Math.random() * 10;
      const isRibbon = i % 3 === 0;

      return {
        id: i,
        targetX,
        targetY,
        color,
        size,
        isRibbon,
        rotation: Math.random() * 720 - 360,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none">
      {/* 1. Flash Backdrop Glow Aura */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-radial-[ellipse_80%_80%_at_50%_50%] from-amber-300/60 via-amber-500/25 to-transparent"
      />

      {/* 2. Expanding Fireworks Radial Rays */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: FIREWORK_RAYS }).map((_, idx) => {
          const angle = (idx / FIREWORK_RAYS) * 360;
          return (
            <motion.div
              key={`ray-${idx}`}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 2.8], opacity: [1, 0] }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.05 }}
              className="absolute h-0.5 w-36 bg-gradient-to-r from-amber-200 via-amber-400 to-transparent"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          );
        })}
      </div>

      {/* 3. Center Party Bomb Emblem Blast */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative z-10 size-20 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.95)]"
      >
        <PartyPopper className="size-10 text-amber-950 animate-bounce" />
      </motion.div>

      {/* 4. Firecracker Confetti Streamer Particle Burst */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{
            x: p.targetX,
            y: [0, p.targetY, p.targetY + 220],
            opacity: [1, 1, 0.9, 0],
            scale: [0, 1.2, 0.8],
            rotate: p.rotation,
          }}
          transition={{
            duration: 2.2 + Math.random() * 1.0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute"
          style={{
            width: p.isRibbon ? p.size * 0.45 : p.size,
            height: p.isRibbon ? p.size * 2.2 : p.size,
            background: p.color,
            borderRadius: p.isRibbon ? "2px" : "50%",
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
