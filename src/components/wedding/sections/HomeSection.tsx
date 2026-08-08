import { COUPLE, WEDDING_DATE_LABEL } from "../data";
import { Divider } from "../ui";

export function HomeSection() {
  return (
    <div className="anim-soft-in flex h-full flex-col items-center justify-center px-8 text-center text-ink">
      <svg width="76" height="76" viewBox="0 0 100 100" aria-label="Lord Ganesha motif">
        <g style={{ transformOrigin: "50px 50px", animation: "drift 6s ease-in-out infinite" }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          <g
            style={{ transformOrigin: "50px 50px", animation: "spinslow 40s linear infinite" }}
            opacity="0.4"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx={50 + 44 * Math.cos((i * Math.PI) / 6)} cy={50 + 44 * Math.sin((i * Math.PI) / 6)} r="1.6" fill="currentColor" />
            ))}
          </g>
          <path
            d="M50 20 c10 0 17 7 17 16 c0 5 -2 8 -5 11 c8 2 13 8 13 15 c0 5 -4 8 -8 8 c-3 0 -5 -2 -6 -5 c-2 8 -10 13 -21 13 c-13 0 -22 -8 -22 -19 c0 -9 6 -15 14 -18 c-3 -3 -5 -6 -5 -11 c0 -9 7 -16 17 -16 z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M50 47 c0 8 -3 14 -3 21 c0 4 3 6 6 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="43" cy="40" r="1.8" fill="currentColor" />
          <circle cx="57" cy="40" r="1.8" fill="currentColor" />
        </g>
      </svg>
      <p className="mt-5 text-[10px] uppercase tracking-[0.5em] text-ink/60">Together with families</p>
      <h1 className="mt-3 font-display text-5xl leading-[1.05] tracking-wide">
        {COUPLE.bride}
        <span className="mx-2 text-3xl italic text-rose">&amp;</span>
        {COUPLE.groom}
      </h1>
      <Divider />
      <p className="font-display text-xl tracking-[0.22em]">{WEDDING_DATE_LABEL}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-ink/60">Jaipur, India</p>
    </div>
  );
}