import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

interface FlowerShowerProps {
  onComplete?: () => void;
}

const PETAL_COUNT = 32;

const COLORS = [
  "oklch(0.62 0.26 25)",  // Deep Rose Red
  "oklch(0.82 0.24 80)",  // Vibrant Marigold Gold
  "oklch(0.70 0.26 45)",  // Royal Saffron Orange
  "oklch(0.76 0.22 350)", // Rose Pink
  "oklch(0.92 0.18 90)",  // Sunlit Yellow
  "oklch(0.96 0.05 95)",  // Jasmine White
  "oklch(0.85 0.20 75)",  // Warm Gold
];

export function FlowerShower({ onComplete }: FlowerShowerProps) {
  const petals = useMemo(() => {
    return Array.from({ length: PETAL_COUNT }, (_, i) => {
      const left = Math.random() * 98;
      const delay = Math.random() * 2.2;
      const duration = 2.0 + Math.random() * 2.0;
      const size = 11 + Math.random() * 20;
      const rotateStart = Math.random() * 360;
      const rotateEnd = rotateStart + 360 + Math.random() * 720;
      const rotateX = Math.random() * 360;
      const rotateY = Math.random() * 360;
      const xDrift = (Math.random() - 0.5) * 90;
      const color = COLORS[i % COLORS.length];
      const type = i % 4; // 0: Rose, 1: Marigold, 2: Jasmine/Lotus, 3: Gold Sparkle Ember
      const zDepth = i % 3; // 0: background (blur), 1: mid, 2: foreground (large)

      return { id: i, left, delay, duration, size, rotateStart, rotateEnd, rotateX, rotateY, xDrift, color, type, zDepth };
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 4800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            top: "-15%",
            left: `${p.left}%`,
            opacity: 0,
            scale: p.zDepth === 0 ? 0.5 : p.zDepth === 1 ? 0.85 : 1.25,
            rotate: p.rotateStart,
            rotateX: 0,
            rotateY: 0,
            x: 0,
          }}
          animate={{
            top: "112%",
            opacity: [0, 1, 1, 0.9, 0],
            scale: p.zDepth === 0 ? [0.5, 0.7, 0.55] : [0.8, 1.3, 0.9],
            rotate: p.rotateEnd,
            rotateX: p.rotateX,
            rotateY: p.rotateY,
            x: [0, p.xDrift, -p.xDrift * 0.6, p.xDrift * 0.9],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute ${p.zDepth === 0 ? "blur-[0.8px] opacity-75" : ""}`}
          style={{ width: p.size, height: p.size * (p.type === 3 ? 1 : 1.45) }}
        >
          {p.type === 3 ? (
            // Sparkle Ember / Golden Dust Particle
            <div
              className="h-full w-full rounded-full"
              style={{
                background: p.color,
                boxShadow: `0 0 12px ${p.color}, 0 0 4px #ffffff`,
              }}
            />
          ) : (
            <svg viewBox="0 0 30 40" className="h-full w-full filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.38)]">
              {p.type === 0 ? (
                // Classic Rose Petal
                <path
                  d="M15 2 C26 2 30 15 25 30 C20 40 10 40 5 30 C0 15 4 2 15 2 Z"
                  fill={p.color}
                  opacity="0.95"
                />
              ) : p.type === 1 ? (
                // Marigold Petal
                <path
                  d="M15 0 C28 8 28 32 15 40 C2 32 2 8 15 0 Z"
                  fill={p.color}
                  opacity="0.96"
                />
              ) : (
                // Jasmine / Lotus Petal
                <path
                  d="M15 4 Q25 -2 29 12 Q31 26 15 38 Q-1 26 1 12 Q5 -2 15 4 Z"
                  fill={p.color}
                  opacity="0.93"
                />
              )}
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
