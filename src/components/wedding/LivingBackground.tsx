import { motion } from "framer-motion";

export type BgKind = "arch" | "courtyard" | "family" | "gallery" | "countdown" | "blessings" | "venue" | "thankyou";

const PETALS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 6.2 + 3) % 94}%`,
  delay: `${(i * 1.3) % 10}s`,
  duration: `${9 + (i % 5) * 2.2}s`,
  size: 7 + (i % 4) * 3,
  hue: i % 3 === 0 ? "oklch(0.75 0.18 25)" : i % 3 === 1 ? "oklch(0.85 0.16 75)" : "oklch(0.88 0.08 350)",
}));

const DIYA_SPARKLES = Array.from({ length: 10 }, (_, i) => ({
  left: `${15 + (i * 8) % 70}%`,
  bottom: `${10 + (i * 3) % 25}%`,
  delay: `${i * 0.4}s`,
  duration: `${3 + (i % 3) * 1.5}s`,
  size: 3 + (i % 3) * 3,
}));

const THANKYOU_SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 8 + 5) % 90}%`,
  top: `${(i * 7 + 15) % 75}%`,
  scale: 0.6 + (i % 3) * 0.4,
  delay: i * 0.25,
}));

/** Animated transparent overlays sitting exactly on top of the static artwork. */
function FoliageOverlay({ kind }: { kind: BgKind }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* left foliage cluster – swaying */}
      <g
        style={{ transformOrigin: "15px 700px", animation: "sway 7s ease-in-out infinite" }}
        opacity="0.45"
      >
        <path d="M2 720 q30 -40 18 -86 q26 40 14 92z" fill="oklch(0.42 0.09 148)" />
        <path d="M-6 760 q44 -30 44 -78 q16 52 -22 92z" fill="oklch(0.36 0.08 150)" />
      </g>
      {/* right foliage cluster */}
      <g
        style={{ transformOrigin: "375px 690px", animation: "sway 9s ease-in-out infinite reverse" }}
        opacity="0.45"
      >
        <path d="M388 706 q-32 -38 -20 -84 q-26 40 -12 90z" fill="oklch(0.42 0.09 148)" />
        <path d="M396 748 q-46 -28 -46 -76 q-14 52 24 90z" fill="oklch(0.36 0.08 150)" />
      </g>

      {/* Hanging Garlands overlay for Arch artwork */}
      {kind === "arch" && (
        <g opacity="0.65">
          {[110, 155, 195, 235, 280].map((x, i) => (
            <g
              key={x}
              style={{
                transformOrigin: `${x}px 30px`,
                animation: `sway ${4.8 + i * 0.7}s ease-in-out ${i * 0.3}s infinite`,
              }}
            >
              <line x1={x} y1="30" x2={x} y2={125 + i * 10} stroke="oklch(0.68 0.14 75)" strokeWidth="1.8" strokeDasharray="3 3" />
              {Array.from({ length: 6 }).map((_, j) => (
                <ellipse
                  key={j}
                  cx={x + (j % 2 ? 4 : -4)}
                  cy={45 + j * 16}
                  rx="4.5"
                  ry="7"
                  fill={j % 2 === 0 ? "oklch(0.72 0.18 25)" : "oklch(0.82 0.15 80)"}
                />
              ))}
            </g>
          ))}
        </g>
      )}

      {/* Hanging Temple Bells overlay for Courtyard, Family, Gallery, Countdown, Blessings, and Venue artwork */}
      {(kind === "courtyard" || kind === "family" || kind === "gallery" || kind === "countdown" || kind === "blessings" || kind === "venue") && (
        <g>
          {/* Left Bell cluster */}
          <g style={{ transformOrigin: "36px 10px", animation: "swingBell 5s ease-in-out infinite" }}>
            <line x1="36" y1="10" x2="36" y2="110" stroke="oklch(0.68 0.14 75)" strokeWidth="1.6" strokeDasharray="3 3" />
            <path d="M26 110 L46 110 L48 127 C48 133 24 133 24 127 Z" fill="oklch(0.75 0.14 80)" opacity="0.88" />
            <circle cx="36" cy="133" r="3.2" fill="oklch(0.6 0.1 75)" />
          </g>
          {/* Right Bell cluster */}
          <g style={{ transformOrigin: "354px 10px", animation: "swingBell 5.8s ease-in-out 1s infinite reverse" }}>
            <line x1="354" y1="10" x2="354" y2="112" stroke="oklch(0.68 0.14 75)" strokeWidth="1.6" strokeDasharray="3 3" />
            <path d="M344 112 L364 112 L366 129 C366 135 342 135 342 129 Z" fill="oklch(0.75 0.14 80)" opacity="0.88" />
            <circle cx="354" cy="135" r="3.2" fill="oklch(0.6 0.1 75)" />
          </g>
        </g>
      )}

      {/* drifting leaves */}
      {[
        { x: 35, y: 280, d: "11s" },
        { x: 345, y: 360, d: "13s" },
        { x: 295, y: 220, d: "9s" },
      ].map((l) => (
        <ellipse
          key={`${l.x}-${l.y}`}
          cx={l.x}
          cy={l.y}
          rx="7"
          ry="3.5"
          fill="oklch(0.55 0.1 145)"
          opacity="0.4"
          style={{ animation: `drift ${l.d} ease-in-out infinite` }}
        />
      ))}
    </svg>
  );
}

function FlyingBird({ delay, top, dur }: { delay: string; top: string; dur: string }) {
  return (
    <div
      className="pointer-events-none absolute left-0 z-10"
      style={{ top, animation: `flyacross ${dur} linear ${delay} infinite` }}
    >
      <svg width="28" height="18" viewBox="0 0 26 16" aria-hidden="true">
        <g style={{ transformOrigin: "13px 8px", animation: "flap 0.4s ease-in-out infinite" }}>
          <path d="M1 9 q6 -8 12 -1 q6 -7 12 1 q-6 -2 -12 3 q-6 -5 -12 -3z" fill="oklch(0.42 0.08 50)" opacity="0.75" />
        </g>
      </svg>
    </div>
  );
}

export function LivingBackground({ kind = "arch" }: { kind?: BgKind }) {
  const imgSrc =
    kind === "arch"
      ? "/assets/bg-arch-custom.jpg"
      : kind === "courtyard"
      ? "/assets/bg-courtyard-custom.jpg"
      : kind === "family"
      ? "/assets/bg-family-custom.jpg"
      : kind === "gallery"
      ? "/assets/bg-gallery-custom.jpg"
      : kind === "countdown"
      ? "/assets/bg-countdown-custom.jpg"
      : kind === "blessings"
      ? "/assets/bg-blessings-custom.jpg"
      : kind === "venue"
      ? "/assets/bg-venue-custom.jpg"
      : "/assets/bg-thankyou-custom.jpg";

  return (
    <div className="absolute inset-0 overflow-hidden bg-[oklch(0.96_0.02_90)]">
      {/* Base Background Image with Framer Motion ambient breathing & entry animation */}
      <motion.div
        key={imgSrc}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full"
      >
        <img
          src={imgSrc}
          alt="Illustrated Indian wedding background"
          className="h-full w-full object-cover object-center"
          style={{ animation: "ambientBreathe 16s ease-in-out infinite" }}
        />
      </motion.div>

      {/* Animated Foliage, Garlands, and Temple Bells Overlay */}
      <FoliageOverlay kind={kind} />

      {/* Flying Royal Birds */}
      <FlyingBird top="14%" delay="1s" dur="18s" />
      <FlyingBird top="28%" delay="8s" dur="24s" />

      {/* Framer Motion Separated Elements for Thank You Background */}
      {kind === "thankyou" && (
        <>
          {/* 4. Sparkling Stars / Glitter Dust Timeline */}
          {THANKYOU_SPARKLES.map((sp, idx) => (
            <motion.span
              key={`ty-sparkle-${idx}`}
              className="pointer-events-none absolute rounded-full bg-amber-200 z-10"
              style={{
                left: sp.left,
                top: sp.top,
                width: 4 * sp.scale,
                height: 4 * sp.scale,
                boxShadow: "0 0 10px rgba(251, 191, 36, 0.9)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.1, 0.95, 0.1],
                scale: [0.5, 1.4, 0.5],
              }}
              transition={{
                duration: 2.4 + (idx % 3),
                repeat: Infinity,
                delay: 0.6 + sp.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* Falling Flower Petals */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-0 z-10 rounded-full blur-[0.3px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.75,
            background: p.hue,
            animation: `petalfall ${p.duration} linear ${p.delay} infinite`,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
      ))}

      {/* Diya / Stage Sparkle Embers for Courtyard */}
      {kind === "courtyard" &&
        DIYA_SPARKLES.map((s, i) => (
          <span
            key={`sparkle-${i}`}
            className="pointer-events-none absolute rounded-full z-10"
            style={{
              left: s.left,
              bottom: s.bottom,
              width: s.size,
              height: s.size,
              background: "oklch(0.88 0.18 85)",
              boxShadow: "0 0 10px oklch(0.85 0.2 85)",
              animation: `shimmerGold ${s.duration} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}

      {/* Soft readability veil to ensure text contrast while retaining artwork beauty */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            kind === "thankyou"
              ? "radial-gradient(ellipse 80% 60% at 50% 36%, oklch(1 0 0 / 0.45), transparent 80%)"
              : "radial-gradient(ellipse 75% 55% at 50% 38%, oklch(1 0 0 / 0.32), transparent 75%)",
        }}
      />
    </div>
  );
}
