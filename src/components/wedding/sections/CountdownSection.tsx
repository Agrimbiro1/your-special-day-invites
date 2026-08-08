import { useEffect, useState } from "react";
import { WEDDING_DATE } from "../data";
import { SectionTitle } from "../ui";

function diff() {
  const ms = Math.max(0, new Date(WEDDING_DATE).getTime() - Date.now());
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor(ms / 3600000) % 24,
    Minutes: Math.floor(ms / 60000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  };
}

function Flip({ label, value }: { label: string; value: number }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="glass-panel relative grid h-20 w-[68px] place-items-center overflow-hidden rounded-2xl">
        <span className="absolute inset-x-0 top-1/2 h-px bg-ink/15" />
        <span key={v} className="font-display text-4xl tabular-nums text-ink" style={{ animation: "flipdown .45s cubic-bezier(.22,1,.36,1)" }}>
          {v}
        </span>
      </div>
      <span className="mt-2 text-[9px] uppercase tracking-[0.28em] text-ink/60">{label}</span>
    </div>
  );
}

export function CountdownSection() {
  const [t, setT] = useState(diff);
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center px-5">
      <SectionTitle>Counting Down</SectionTitle>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {Object.entries(t).map(([k, v]) => (
          <Flip key={k} label={k} value={v} />
        ))}
      </div>
      <p className="mt-6 text-center font-display text-lg italic text-ink/75">
        until we say forever
      </p>
    </div>
  );
}