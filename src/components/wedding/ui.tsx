import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("glass-panel anim-soft-in rounded-3xl px-5 py-6 text-ink", className)}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "font-display text-2xl sm:text-3xl font-semibold tracking-wider text-amber-950 capitalize drop-shadow-2xs text-center select-none",
        className
      )}
    >
      {children}
    </motion.h2>
  );
}

export function Divider({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
      className={cn("mx-auto my-1.5 flex items-center gap-2 text-gold", className)}
    >
      <span className="h-px w-10 bg-gold/60" />
      <span className="size-1 rounded-full bg-gold/80" />
      <span className="h-px w-10 bg-gold/60" />
    </motion.div>
  );
}