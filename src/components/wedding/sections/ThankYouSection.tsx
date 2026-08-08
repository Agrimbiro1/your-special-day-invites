import { COUPLE } from "../data";
import { Divider } from "../ui";

export function ThankYouSection() {
  return (
    <div className="anim-soft-in flex h-full flex-col items-center justify-center px-10 text-center text-ink">
      <p className="text-[10px] uppercase tracking-[0.5em] text-ink/60">With gratitude</p>
      <h2 className="mt-3 font-display text-5xl">Thank You</h2>
      <Divider />
      <p className="text-sm leading-relaxed text-ink/80">
        Your blessings and presence mean the world to us. May the same joy you bring to our home
        always return to yours.
      </p>
      <p className="mt-6 font-display text-xl tracking-[0.2em]">
        {COUPLE.bride} &amp; {COUPLE.groom}
      </p>
    </div>
  );
}