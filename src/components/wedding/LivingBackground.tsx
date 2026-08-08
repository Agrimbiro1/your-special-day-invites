import bgArch from "@/assets/bg-arch.jpeg.asset.json";
import bgCourtyard from "@/assets/bg-courtyard.jpeg.asset.json";

export type BgKind = "arch" | "courtyard";

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 8.3 + 4) % 96}%`,
  delay: `${(i * 1.7) % 12}s`,
  duration: `${11 + (i % 5) * 2.5}s`,
  size: 6 + (i % 3) * 3,
  hue: i % 2 === 0 ? "oklch(0.86 0.06 20)" : "oklch(0.9 0.05 90)",
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
        style={{ transformOrigin: "10px 700px", animation: "sway 7s ease-in-out infinite" }}
        opacity="0.5"
      >
        <path d="M2 720 q30 -40 18 -86 q26 40 14 92z" fill="oklch(0.42 0.09 148)" />
        <path d="M-6 760 q44 -30 44 -78 q16 52 -22 92z" fill="oklch(0.36 0.08 150)" />
      </g>
      {/* right foliage cluster */}
      <g
        style={{ transformOrigin: "382px 690px", animation: "sway 9s ease-in-out infinite reverse" }}
        opacity="0.5"
      >
        <path d="M388 706 q-32 -38 -20 -84 q-26 40 -12 90z" fill="oklch(0.42 0.09 148)" />
        <path d="M396 748 q-46 -28 -46 -76 q-14 52 24 90z" fill="oklch(0.36 0.08 150)" />
      </g>
      {/* hanging garlands – gentle drift (arch artwork) */}
      {kind === "arch" && (
        <g opacity="0.55">
          {[130, 175, 220, 262].map((x, i) => (
            <g
              key={x}
              style={{
                transformOrigin: `${x}px 20px`,
                animation: `sway ${5 + i}s ease-in-out ${i * 0.4}s infinite`,
              }}
            >
              <line x1={x} y1="14" x2={x} y2={120 + i * 14} stroke="oklch(0.5 0.09 145)" strokeWidth="1.4" />
              {Array.from({ length: 5 }).map((_, j) => (
                <ellipse
                  key={j}
                  cx={x + (j % 2 ? 4 : -4)}
                  cy={34 + j * 18}
                  rx="5"
                  ry="8"
                  fill="oklch(0.62 0.1 140)"
                />
              ))}
            </g>
          ))}
        </g>
      )}
      {/* drifting leaves */}
      {[
        { x: 40, y: 300, d: "11s" },
        { x: 340, y: 380, d: "14s" },
        { x: 300, y: 240, d: "9s" },
      ].map((l) => (
        <ellipse
          key={`${l.x}-${l.y}`}
          cx={l.x}
          cy={l.y}
          rx="7"
          ry="3.5"
          fill="oklch(0.55 0.1 145)"
          opacity="0.35"
          style={{ animation: `drift ${l.d} ease-in-out infinite` }}
        />
      ))}
    </svg>
  );
}

function FlyingBird({ delay, top, dur }: { delay: string; top: string; dur: string }) {
  return (
    <div
      className="pointer-events-none absolute left-0"
      style={{ top, animation: `flyacross ${dur} linear ${delay} infinite` }}
    >
      <svg width="26" height="16" viewBox="0 0 26 16" aria-hidden="true">
        <g style={{ transformOrigin: "13px 8px", animation: "flap 0.45s ease-in-out infinite" }}>
          <path d="M1 9 q6 -8 12 -1 q6 -7 12 1 q-6 -2 -12 3 q-6 -5 -12 -3z" fill="oklch(0.5 0.12 240)" />
        </g>
      </svg>
    </div>
  );
}

export function LivingBackground({ kind = "arch" }: { kind?: BgKind }) {
  const src = kind === "arch" ? bgArch.url : bgCourtyard.url;
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={src}
        alt="Illustrated Indian wedding backdrop"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <FoliageOverlay kind={kind} />
      <FlyingBird top="18%" delay="1s" dur="17s" />
      <FlyingBird top="30%" delay="9s" dur="22s" />
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-0 rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.7,
            background: p.hue,
            animation: `petalfall ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
      {/* soft readability veil, keeps artwork intact */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 38%, oklch(1 0 0 / 0.35), transparent 70%)",
        }}
      />
    </div>
  );
}