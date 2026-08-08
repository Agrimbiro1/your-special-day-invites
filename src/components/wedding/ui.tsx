import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("glass-panel anim-soft-in rounded-3xl px-5 py-6 text-ink", className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[13px] uppercase tracking-[0.42em] text-ink/70">{children}</h2>
  );
}

export function Divider() {
  return (
    <div className="mx-auto my-3 flex items-center gap-2 text-gold">
      <span className="h-px w-10 bg-gold/60" />
      <span className="text-[10px]">✦</span>
      <span className="h-px w-10 bg-gold/60" />
    </div>
  );
}