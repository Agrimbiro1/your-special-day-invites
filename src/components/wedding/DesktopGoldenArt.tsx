import React from "react";

export function DesktopGoldenArt() {
  return (
    <div className="hidden sm:block pointer-events-none absolute inset-0 z-0 select-none overflow-hidden bg-[oklch(0.15_0.035_145)]">
      {/* Full Page Royal Golden Jaali / Damask Pattern Overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-40" width="100%" height="100%">
        <defs>
          <linearGradient id="goldJaaliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Seamless Repeating Royal Indian Pattern Tile (Jaali + Lotus Motif) */}
          <pattern
            id="royalJaaliPattern"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Diamond Jaali Grid */}
            <path
              d="M40 0 L80 40 L40 80 L0 40 Z"
              fill="none"
              stroke="url(#goldJaaliGrad)"
              strokeWidth="1.2"
              opacity="0.85"
            />
            <path
              d="M40 10 L70 40 L40 70 L10 40 Z"
              fill="none"
              stroke="url(#goldJaaliGrad)"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              opacity="0.6"
            />

            {/* Center Royal Lotus Motif */}
            <circle cx="40" cy="40" r="5" fill="url(#goldJaaliGrad)" opacity="0.9" />
            <circle cx="40" cy="40" r="14" stroke="url(#goldJaaliGrad)" strokeWidth="0.8" fill="none" />
            <path
              d="M40 22 Q46 32 40 36 Q34 32 40 22 Z"
              fill="url(#goldJaaliGrad)"
              opacity="0.75"
            />
            <path
              d="M40 58 Q46 48 40 44 Q34 48 40 58 Z"
              fill="url(#goldJaaliGrad)"
              opacity="0.75"
            />
            <path
              d="M22 40 Q32 46 36 40 Q32 34 22 40 Z"
              fill="url(#goldJaaliGrad)"
              opacity="0.75"
            />
            <path
              d="M58 40 Q48 46 44 40 Q48 34 58 40 Z"
              fill="url(#goldJaaliGrad)"
              opacity="0.75"
            />

            {/* Corner Accent Dots */}
            <circle cx="0" cy="0" r="2.5" fill="url(#goldJaaliGrad)" />
            <circle cx="80" cy="0" r="2.5" fill="url(#goldJaaliGrad)" />
            <circle cx="0" cy="80" r="2.5" fill="url(#goldJaaliGrad)" />
            <circle cx="80" cy="80" r="2.5" fill="url(#goldJaaliGrad)" />
          </pattern>
        </defs>

        {/* Fill entire background with the royal golden pattern */}
        <rect width="100%" height="100%" fill="url(#royalJaaliPattern)" />
      </svg>

      {/* Atmospheric Gold Radial Light Spotlight behind center phone frame */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,oklch(0.11_0.03_145)_85%)] opacity-85" />

      {/* Floating Shimmering Gold Embers across full background */}
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={`bg-ember-${i}`}
          className="absolute rounded-full bg-amber-200 blur-[0.4px]"
          style={{
            left: `${(i * 17.3 + 5) % 94}%`,
            top: `${(i * 13.7 + 8) % 90}%`,
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            boxShadow: "0 0 10px rgba(251, 191, 36, 0.85)",
            animation: `shimmerGold ${3 + (i % 4)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
