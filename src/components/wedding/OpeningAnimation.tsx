import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LivingBackground } from "./LivingBackground";
import { COUPLE } from "./data";

interface OpeningAnimationProps {
  guestName?: string;
  onOpen: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function OpeningAnimation({ guestName = "Rajesh Sharma", onOpen }: OpeningAnimationProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleStartOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpen();
  };

  return (
    <div className="absolute inset-0 z-50 overflow-hidden select-none pointer-events-auto">
      {/* Magic Revealing Opening Screen Layer */}
      <motion.div
        key="opening-animation-layer"
        initial={{ clipPath: "inset(0% 0 0 0)" }}
        animate={{ clipPath: isOpening ? "inset(100% 0 0 0)" : "inset(0% 0 0 0)" }}
        transition={{ duration: 2.2, ease: [0.42, 0, 0.25, 1] }}
        className="relative h-full w-full flex flex-col items-center justify-between bg-[oklch(0.18_0.03_150)] p-6 overflow-hidden"
      >
        {/* Background artwork (open animation.jpg) */}
        <LivingBackground kind="opening" />

        {/* Light soft veil for contrast without darkening the artwork */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-radial-[ellipse_80%_65%_at_50%_45%] from-white/60 via-white/30 to-transparent" />

        {/* Top Spacing */}
        <div className="h-4" />

        {/* Clean, Prominent Black Typography Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 my-auto flex w-full max-w-md flex-col items-center text-center px-4"
        >
          {/* Personalized Guest Greeting Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-2 px-4 py-1.5 rounded-full bg-amber-950/15 border border-amber-900/40 backdrop-blur-md shadow-xs"
          >
            <span className="font-display text-sm sm:text-base font-bold text-amber-950 tracking-wide">
              Dear {guestName}
            </span>
          </motion.div>

          {/* Welcome Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-black drop-shadow-xs"
          >
            Welcome to the Wedding of
          </motion.p>

          {/* Main Couple Names */}
          <motion.h1
            variants={itemVariants}
            className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-wide text-black drop-shadow-sm leading-tight"
          >
            {COUPLE.bride}
            <span className="mx-2 font-serif italic text-amber-900 font-normal">&amp;</span>
            {COUPLE.groom}
          </motion.h1>

          {/* Minimalist Line Divider */}
          <motion.div variants={itemVariants} className="my-4 flex items-center gap-3 w-full justify-center opacity-80">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-950 to-transparent" />
          </motion.div>

          {/* Invitation Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-display italic text-base sm:text-lg font-medium text-black max-w-[300px] leading-relaxed drop-shadow-xs"
          >
            Together with their families, cordially invite you to celebrate their special day.
          </motion.p>

          {/* Event Date & Venue */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-xs sm:text-sm font-extrabold tracking-widest text-black uppercase drop-shadow-xs"
          >
            6th December 2026 • Jaipur
          </motion.p>
        </motion.div>

        {/* Sand Bottom Center Open Invitation Button - Frosted Glass Blur & Extra Bold Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          className="relative z-30 pb-7 text-center"
        >
          <motion.button
            onClick={handleStartOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white/20 hover:bg-white/30 text-black px-9 py-3.5 border-2 border-black shadow-md backdrop-blur-xl transition-all cursor-pointer"
          >
            <span className="font-display text-xs sm:text-sm font-extrabold tracking-[0.28em] uppercase text-black drop-shadow-sm">
              OPEN INVITATION
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Golden Magic Sparkle Wave Front Line following the wipe from top to bottom */}
      {isOpening && (
        <motion.div
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 2.2, ease: [0.42, 0, 0.25, 1] }}
          className="pointer-events-none absolute inset-x-0 z-50 -translate-y-1/2 flex items-center justify-center"
        >
          {/* Glowing Golden Beam Line */}
          <div className="h-2.5 w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_25px_#ffd700,0_0_40px_#ff9900]" />

          {/* Twinkling Gold Stars across the magic wave line */}
          <div className="absolute inset-x-0 flex justify-around">
            {Array.from({ length: 7 }).map((_, idx) => (
              <Sparkles
                key={`magic-star-${idx}`}
                className="size-5 text-amber-200 filter drop-shadow-[0_0_8px_#ffd700] animate-spin"
                style={{ animationDuration: `${1.5 + idx * 0.3}s` }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}