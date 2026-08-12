import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { COUPLE } from "../data";
import { Divider } from "../ui";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
    },
  },
};

export function ThankYouSection() {
  return (
    <div className="relative z-20 flex h-full flex-col items-center justify-center -mt-12 px-6 py-2 text-center text-ink select-none overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full max-w-xs flex-col items-center justify-center"
      >
        {/* Animated Gratitude Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-0.5">
          <Sparkles className="size-3 text-amber-600 animate-pulse" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-ink/70">
            With Endless Gratitude
          </span>
          <Sparkles className="size-3 text-amber-600 animate-pulse" />
        </motion.div>

        {/* Main Animated Title */}
        <motion.h2
          variants={itemVariants}
          className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-wider text-amber-950 capitalize drop-shadow-2xs"
        >
          Thank You
        </motion.h2>

        {/* Animated Line Divider */}
        <motion.div
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
          }}
          className="w-full my-1 flex justify-center opacity-80"
        >
          <Divider />
        </motion.div>

        {/* Heart Icon Accent */}
        <motion.div
          variants={itemVariants}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="my-0.5 flex size-7 items-center justify-center rounded-full bg-rose-100/60 text-rose-500"
        >
          <Heart className="size-3.5 fill-rose-500 text-rose-500" />
        </motion.div>

        {/* Gratitude Body Text */}
        <motion.p
          variants={itemVariants}
          className="mt-1 text-[11.5px] font-display italic leading-relaxed text-amber-950/85 max-w-[260px] px-2"
        >
          "Your love, blessings, and warm presence mean the world to us."
        </motion.p>

        {/* Couple Sign-off */}
        <motion.div
          variants={itemVariants}
          className="mt-2.5 flex flex-col items-center gap-0.5"
        >
          <span className="text-[8px] uppercase tracking-[0.25em] text-ink/60">Forever Together</span>
          <p className="font-display text-lg font-semibold tracking-wider text-amber-900">
            {COUPLE.bride} &amp; {COUPLE.groom}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}