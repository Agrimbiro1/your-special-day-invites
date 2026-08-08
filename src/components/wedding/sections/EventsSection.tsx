import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EVENTS } from "../data";
import { Divider, Panel, SectionTitle } from "../ui";

export function EventsSection() {
  const [i, setI] = useState(0);
  const e = EVENTS[i]!;
  const go = (d: number) => setI((p) => (p + d + EVENTS.length) % EVENTS.length);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <SectionTitle>Celebrations</SectionTitle>
      <div className="mt-4 flex w-full items-center gap-2">
        <button aria-label="Previous event" onClick={() => go(-1)} className="glass-panel grid size-9 shrink-0 place-items-center rounded-full text-ink">
          <ChevronLeft className="size-4" />
        </button>
        <Panel key={e.name} className="min-w-0 flex-1 text-center">
          <p className="font-display text-3xl">{e.name}</p>
          <Divider />
          <p className="text-sm tracking-wide">{e.date}</p>
          <p className="text-sm tracking-wide">{e.time}</p>
          <p className="mt-2 text-xs text-ink/70">{e.venue}</p>
          <p className="mt-3 text-[11px] italic text-ink/60">{e.note}</p>
        </Panel>
        <button aria-label="Next event" onClick={() => go(1)} className="glass-panel grid size-9 shrink-0 place-items-center rounded-full text-ink">
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="mt-4 flex gap-2">
        {EVENTS.map((ev, idx) => (
          <button
            key={ev.name}
            aria-label={ev.name}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-ink/70" : "w-1.5 bg-ink/30"}`}
          />
        ))}
      </div>
    </div>
  );
}