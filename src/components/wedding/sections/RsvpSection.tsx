import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Divider, SectionTitle } from "../ui";

export function RsvpSection({ guestName = "Rajesh Sharma" }: { guestName?: string }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-4 pb-4 px-4 w-full max-w-sm mx-auto select-none text-center overflow-hidden">
      <SectionTitle>RSVP</SectionTitle>

      {/* Personalized Guest Greeting Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mt-2.5 px-4 py-1 rounded-full bg-amber-500/15 border border-gold/40 text-amber-950 font-display text-sm font-bold tracking-wide shadow-2xs"
      >
        Dear {guestName}
      </motion.div>

      {/* Main Wedding Text (No Card Layout) */}
      <div className="mt-2.5 flex flex-col items-center justify-center">
        <motion.h3
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-wide leading-tight drop-shadow-2xs"
        >
          Your Presence Is Our Greatest Blessing
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="mt-2 font-display text-sm italic text-amber-950/80 leading-relaxed max-w-[280px]"
        >
          Dear {guestName}, we request the honor of your presence as we celebrate our love and union together.
        </motion.p>

        <motion.span
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
          className="mt-2 text-[10px] uppercase tracking-[0.22em] text-amber-900/70 font-semibold"
        >
          Saturday, Dec 6, 2026 &middot; Jaipur
        </motion.span>
      </div>

      <Divider />

      {/* Redesigned Premium RSVP Button Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
        className="mt-3 w-full flex flex-col items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.button
              key="rsvp-accept-btn"
              onClick={() => setAccepted(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative flex items-center justify-center px-7 py-3 rounded-full w-full max-w-[230px] mx-auto overflow-hidden shadow-lg transition-all duration-300 border border-amber-400/60 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 cursor-pointer"
            >
              {/* Outer Golden Glow & Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-200/30 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Gold Ring Inset Border */}
              <div className="absolute inset-0.5 rounded-full border border-amber-300/40 pointer-events-none" />

              <span className="relative z-10 font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-100 drop-shadow-xs">
                Accept Invitation
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="rsvp-accepted-state"
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center justify-center px-6 py-2.5 rounded-full w-full max-w-[230px] mx-auto bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-800 text-emerald-100 border border-emerald-400/50 shadow-md">
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-emerald-100">
                  Invitation Accepted
                </span>
              </div>

              <p className="text-[11px] font-display italic text-amber-950/80 mt-1">
                Dhanyavaad! We look forward to celebrating with you.
              </p>

              <button
                onClick={() => setAccepted(false)}
                className="mt-0.5 text-[9.5px] uppercase tracking-widest text-amber-900/70 hover:text-amber-950 underline transition-colors cursor-pointer"
              >
                Change Response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}