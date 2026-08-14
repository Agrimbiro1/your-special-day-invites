import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

interface FlowerShowerProps {
  continuous?: boolean;
  onComplete?: () => void;
  heavy?: boolean;
  slow?: boolean;
}

// Royal Gold & Amber Theme Matched Color Palette
const COLORS = [
  "oklch(0.80 0.22 75)",  // Golden Marigold
  "oklch(0.72 0.24 45)",  // Royal Saffron
  "oklch(0.60 0.24 25)",  // Crimson Rose Accent
  "oklch(0.88 0.14 85)",  // Sunlit Warm Amber
  "oklch(0.92 0.04 90)",  // Cream Jasmine Petal
  "oklch(0.84 0.18 70)",  // Deep Gold Dust
];

export function FlowerShower({ continuous = true, onComplete, heavy = false, slow = false }: FlowerShowerProps) {
  // Decreased particle count for a delicate, calm and silky-smooth shower (heavy: 18, slow: 12, normal: 10)
  const count = heavy ? 18 : slow ? 12 : 10;

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const left = Math.random() * 98;
      const delay = Math.random() * (slow ? 8.0 : 3.5);
      
      const duration = heavy
        ? 3.2 + Math.random() * 1.8
        : slow
        ? 16.0 + Math.random() * 8.0
        : 11.0 + Math.random() * 5.0;

      const size = heavy
        ? 14 + Math.random() * 12
        : slow
        ? 7 + Math.random() * 4
        : 8 + Math.random() * 7;

      const rotateStart = Math.random() * 360;
      const rotateEnd = rotateStart + 360 + Math.random() * 360;

      const windDir = (i % 2 === 0 ? 1 : -1);
      const windDrift = slow ? windDir * (30 + Math.random() * 40) : (Math.random() - 0.5) * 50;

      const color = COLORS[i % COLORS.length];
      const type = i % 4; // 0: Rose, 1: Marigold, 2: Jasmine/Lotus, 3: Gold Sparkle Ember
      const zDepth = i % 3; // 0: background, 1: mid, 2: foreground

      return {
        id: i,
        left,
        delay,
        duration,
        size,
        rotateStart,
        rotateEnd,
        windDrift,
        color,
        type,
        zDepth,
      };
    });
  }, [count, heavy, slow]);

  useEffect(() => {
    if (continuous || !onComplete) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [continuous, onComplete]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            top: "-12%",
            left: `${p.left}%`,
            opacity: 0,
            scale: p.zDepth === 0 ? 0.6 : p.zDepth === 1 ? 0.85 : 1.1,
            rotate: p.rotateStart,
            x: 0,
          }}
          animate={{
            top: "110%",
            opacity: [0, 0.85, 0.85, 0],
            rotate: p.rotateEnd,
            x: [0, p.windDrift, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: continuous ? Infinity : 0,
            repeatDelay: Math.random() * (slow ? 2.5 : 0.8),
            ease: "linear",
          }}
          className="absolute transform-gpu translate-z-0"
          style={{
            width: p.size,
            height: p.size * (p.type === 3 ? 1 : 1.3),
            willChange: "transform, opacity",
          }}
        >
          {p.type === 3 ? (
            // Gold Sparkle Ember / Theme Matched Dust Particle
            <div
              className="h-full w-full rounded-full opacity-85"
              style={{
                background: p.color,
              }}
            />
          ) : (
            <svg viewBox="0 0 30 40" className="h-full w-full opacity-90">
              {p.type === 0 ? (
                // Classic Curved Rose Petal
                <path
                  d="M15 2 C26 2 30 15 25 30 C20 40 10 40 5 30 C0 15 4 2 15 2 Z"
                  fill={p.color}
                />
              ) : p.type === 1 ? (
                // Golden Marigold Petal
                <path
                  d="M15 0 C28 8 28 32 15 40 C2 32 2 8 15 0 Z"
                  fill={p.color}
                />
              ) : (
                // Jasmine / Lotus Petal
                <path
                  d="M15 0 C25 10 25 30 15 40 C5 30 5 10 15 0 Z"
                  fill={p.color}
                />
              )}
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
