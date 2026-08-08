import { useEffect, useState } from "react";

/**
 * Code-built title sequence (no video file):
 * green leaf canopy -> canopy parts -> courtyard scroll reveals ->
 * four dancers in red/yellow/purple/orange circle -> blue bird flies in -> fade out.
 */
export function OpeningAnimation({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setFading(true), 7200);
    const b = setTimeout(onDone, 8200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [onDone]);

  return (
    <div
      className="absolute inset-0 z-50 overflow-hidden transition-opacity duration-1000"
      style={{
        opacity: fading ? 0 : 1,
        background: "radial-gradient(120% 80% at 50% 30%, #f4efe0, #e6dcc4)",
      }}
    >
      <style>{`
        @keyframes canopyLeft { 0%,18% { transform: translateX(0) } 100% { transform: translateX(-78%) } }
        @keyframes canopyRight { 0%,18% { transform: translateX(0) } 100% { transform: translateX(78%) } }
        @keyframes scrollGrow { 0%,25% { transform: scale(.55); opacity: 0 } 55%,100% { transform: scale(1); opacity: 1 } }
        @keyframes dancerIn { 0%,45% { opacity: 0; transform: scale(.5) } 65%,100% { opacity: 1; transform: scale(1) } }
        @keyframes ring { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes birdIn { 0%,55% { transform: translate(-40vw, 30vh) scale(.5); opacity: 0 } 75% { opacity: 1 } 100% { transform: translate(24vw, -14vh) scale(1); opacity: 1 } }
        @keyframes titleIn { 0%,70% { opacity: 0; letter-spacing: .5em } 100% { opacity: 1; letter-spacing: .18em } }
      `}</style>

      {/* central courtyard scroll */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ animation: "scrollGrow 3.6s cubic-bezier(.22,1,.36,1) both" }}
      >
        <svg width="300" height="380" viewBox="0 0 300 380" aria-hidden="true">
          <defs>
            <linearGradient id="scrollBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdf8ec" />
              <stop offset="100%" stopColor="#f0e4cd" />
            </linearGradient>
          </defs>
          <path
            d="M150 6 C240 6 292 70 292 150 L292 350 Q292 372 270 372 L30 372 Q8 372 8 350 L8 150 C8 70 60 6 150 6z"
            fill="url(#scrollBg)"
            stroke="#c8a24a"
            strokeWidth="3"
          />
          <path
            d="M150 24 C230 24 276 80 276 152 L276 344 Q276 356 262 356 L38 356 Q24 356 24 344 L24 152 C24 80 70 24 150 24z"
            fill="none"
            stroke="#d9b96a"
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          {/* jharokha arches */}
          {[70, 150, 230].map((x) => (
            <path
              key={x}
              d={`M${x - 26} 330 L${x - 26} 250 A26 26 0 0 1 ${x + 26} 250 L${x + 26} 330z`}
              fill="#e9ddc4"
              stroke="#c8a24a"
              strokeWidth="1.5"
            />
          ))}
          {/* pattern dots */}
          {Array.from({ length: 18 }).map((_, i) => (
            <circle
              key={i}
              cx={30 + (i % 9) * 30}
              cy={i < 9 ? 100 : 128}
              r="3"
              fill="#c8a24a"
              opacity="0.55"
              style={{ animation: `twinkle ${2 + (i % 4)}s ease-in-out ${i * 0.1}s infinite` }}
            />
          ))}
        </svg>
      </div>

      {/* four dancers circling */}
      <div
        className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-[38%]"
        style={{ animation: "ring 14s linear infinite" }}
      >
        {[
          { c: "#c8332f", a: 0 },
          { c: "#e0a92b", a: 90 },
          { c: "#7b4b9c", a: 180 },
          { c: "#e2712c", a: 270 },
        ].map((d) => (
          <div
            key={d.a}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${d.a}deg) translateY(-86px) rotate(${-d.a}deg)`,
              animation: "dancerIn 3.6s ease-out both",
            }}
          >
            <svg width="46" height="70" viewBox="0 0 46 70" style={{ marginLeft: -23, marginTop: -35 }}>
              <g style={{ transformOrigin: "23px 60px", animation: "sway 1.4s ease-in-out infinite" }}>
                <circle cx="23" cy="12" r="8" fill="#8a5a3b" />
                <path d="M15 12 q8 -12 16 0 q-8 -5 -16 0z" fill="#2b1a12" />
                <path d="M23 20 L14 34 L32 34z" fill={d.c} />
                <path d="M14 34 Q23 30 32 34 L40 66 Q23 72 6 66z" fill={d.c} />
                <path d="M14 34 Q23 30 32 34 L40 66 Q23 72 6 66z" fill="#ffffff" opacity="0.18" />
                <path d="M17 24 q-12 6 -13 18" stroke="#8a5a3b" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M29 24 q12 6 13 18" stroke="#8a5a3b" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        ))}
      </div>

      {/* blue bird flying in */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{ animation: "birdIn 4s cubic-bezier(.3,.9,.4,1) both" }}
      >
        <svg width="42" height="26" viewBox="0 0 26 16" aria-hidden="true">
          <g style={{ transformOrigin: "13px 8px", animation: "flap 0.4s ease-in-out infinite" }}>
            <path d="M1 9 q6 -8 12 -1 q6 -7 12 1 q-6 -2 -12 3 q-6 -5 -12 -3z" fill="#2f6fd0" />
          </g>
        </svg>
      </div>

      {/* leaf canopy halves parting */}
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className="absolute inset-y-0 w-[62%]"
          style={{
            [side]: 0,
            animation: `${side === "left" ? "canopyLeft" : "canopyRight"} 3.2s cubic-bezier(.65,0,.35,1) both`,
          } as React.CSSProperties}
        >
          <svg className="h-full w-full" viewBox="0 0 240 844" preserveAspectRatio="none" aria-hidden="true">
            <rect width="240" height="844" fill="#1f4530" />
            {Array.from({ length: 26 }).map((_, i) => (
              <ellipse
                key={i}
                cx={20 + ((i * 53) % 210)}
                cy={30 + ((i * 97) % 800)}
                rx={38 + (i % 4) * 12}
                ry={20 + (i % 3) * 9}
                fill={i % 3 === 0 ? "#2c6144" : i % 3 === 1 ? "#387a54" : "#245239"}
                transform={`rotate(${(i * 37) % 180} ${20 + ((i * 53) % 210)} ${30 + ((i * 97) % 800)})`}
              />
            ))}
          </svg>
        </div>
      ))}

      <p
        className="absolute inset-x-0 bottom-24 text-center font-display text-2xl uppercase text-ink"
        style={{ animation: "titleIn 4s ease-out both" }}
      >
        Aanya &amp; Rohan
      </p>
    </div>
  );
}