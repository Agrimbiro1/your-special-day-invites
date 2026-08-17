import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface WeddingPreloaderProps {
  isLoading: boolean;
  progress: number;
  statusText: string;
  onFinish?: () => void;
}

export function WeddingPreloader({
  isLoading,
  progress,
  statusText,
  onFinish,
}: WeddingPreloaderProps) {
  return (
    <AnimatePresence {...(onFinish ? { onExitComplete: onFinish } : {})}>
      {isLoading && (
        <motion.div
          key="wedding-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[oklch(0.14_0.03_140)] p-4 text-amber-100 select-none"
        >
          {/* Ambient Royal Gold Radial Glow Background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-amber-950/40 to-black/90 blur-xl" />

          {/* Decorative Corner Filigree Frame Accents */}
          <div className="pointer-events-none absolute top-6 left-6 h-16 w-16 border-t-2 border-l-2 border-amber-400/40 rounded-tl-2xl" />
          <div className="pointer-events-none absolute top-6 right-6 h-16 w-16 border-t-2 border-r-2 border-amber-400/40 rounded-tr-2xl" />
          <div className="pointer-events-none absolute bottom-6 left-6 h-16 w-16 border-b-2 border-l-2 border-amber-400/40 rounded-bl-2xl" />
          <div className="pointer-events-none absolute bottom-6 right-6 h-16 w-16 border-b-2 border-r-2 border-amber-400/40 rounded-br-2xl" />

          {/* Main Loader Content Container */}
          <div className="relative z-10 flex flex-col items-center max-w-sm text-center px-6">
            {/* Pulsing Golden Ganesha / Royal Symbol */}
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                filter: [
                  "drop-shadow(0 0 15px rgba(251,191,36,0.4))",
                  "drop-shadow(0 0 30px rgba(251,191,36,0.8))",
                  "drop-shadow(0 0 15px rgba(251,191,36,0.4))",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-6 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
              <img
                src="/assets/ganesha-art.webp"
                alt="Sacred Ganesha Motif"
                className="relative size-24 object-contain drop-shadow-[0_4px_20px_rgba(251,191,36,0.6)]"
              />
            </motion.div>

            {/* Wedding Title Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 space-y-1"
            >
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-amber-300/80">
                <Sparkles className="size-3 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Shree Ganeshay Namah</span>
                <Sparkles className="size-3 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100 drop-shadow-sm">
                Aanya & Rohan
              </h1>
              <p className="text-xs tracking-widest uppercase font-medium text-amber-300/70">
                Royal Wedding Celebration
              </p>
            </motion.div>

            {/* Royal Gold Metallic Progress Bar */}
            <div className="w-full mb-3">
              <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-amber-300 mb-2 px-1">
                <span className="flex items-center gap-1">
                  <Heart className="size-3 text-red-400 fill-red-400 inline animate-ping" />
                  <span>Loading Assets</span>
                </span>
                <span className="font-mono text-sm text-amber-200 font-bold">{progress}%</span>
              </div>

              <div className="relative h-3.5 w-full rounded-full bg-black/60 p-0.5 border border-amber-500/40 shadow-inner overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>
            </div>

            {/* Dynamic Status Text */}
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-amber-200/90 font-medium tracking-wide min-h-[1.5rem]"
            >
              {statusText}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
