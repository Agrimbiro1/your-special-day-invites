import { useState } from "react";
import { FAMILY } from "../data";
import { Divider, Panel, SectionTitle } from "../ui";

export function FamilySection() {
  const [side, setSide] = useState<"bride" | "groom">("bride");
  const list = FAMILY[side];

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <SectionTitle>Our Families</SectionTitle>
      <div className="glass-panel mt-4 flex rounded-full p-1">
        {(["bride", "groom"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`rounded-full px-5 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
              side === s ? "bg-ink text-background" : "text-ink/70"
            }`}
          >
            {s === "bride" ? "Bride's Side" : "Groom's Side"}
          </button>
        ))}
      </div>
      <Panel key={side} className="mt-4 w-full text-center">
        <p className="font-display text-2xl">{side === "bride" ? "Sharma Parivaar" : "Mehra Parivaar"}</p>
        <Divider />
        <ul className="space-y-3">
          {list.map((m) => (
            <li key={m.role}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-ink/55">{m.role}</p>
              <p className="font-display text-lg leading-tight">{m.names}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}