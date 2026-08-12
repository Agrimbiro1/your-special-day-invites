import { useState } from "react";
import { motion } from "framer-motion";
import { Divider, SectionTitle } from "../ui";

export function RsvpSection() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-12 pb-4 px-4 w-full max-w-sm mx-auto select-none text-center overflow-hidden">
      <SectionTitle>RSVP</SectionTitle>

      {/* Main Wedding Text (No Card Layout) */}
      <div className="mt-3 flex flex-col items-center justify-center">
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
          className="mt-2.5 font-display text-sm italic text-amber-950/80 leading-relaxed max-w-[280px]"
        >
          We request the honor of your presence as we celebrate our love and union together.
        </motion.p>

        <motion.span
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
          className="mt-2 text-[10px] uppercase tracking-[0.22em] text-amber-900/70 font-semibold"
        >
          Saturday, Dec 12, 2026 &middot; Jaipur
        </motion.span>
      </div>

      <Divider />

      {/* Premium SVG Gold Frame Accept Invitation Button - Bottom-up appearing */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
        className="mt-2 w-full flex flex-col items-center"
      >
        {!accepted ? (
          <button
            onClick={() => setAccepted(true)}
            className="relative flex items-center justify-center py-3 px-6 w-full max-w-[210px] mx-auto overflow-hidden group transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md"
          >
            {/* Royal Metallic Gold SVG Frame Background */}
            <svg
              className="absolute inset-0 size-full pointer-events-none"
              viewBox="0 0 210 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="btnGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="35%" stopColor="#FFF8DC" />
                  <stop offset="70%" stopColor="#E6CA65" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>

                <linearGradient id="btnBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F5E4B8" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Main Button Pill Outer Stroke */}
              <rect
                x="2"
                y="2"
                width="206"
                height="44"
                rx="22"
                fill="url(#btnBgGrad)"
                stroke="url(#btnGoldGrad)"
                strokeWidth="1.6"
              />

              {/* Inset Decorative Dashed Border Line */}
              <rect
                x="5"
                y="5"
                width="200"
                height="38"
                rx="19"
                fill="none"
                stroke="url(#btnGoldGrad)"
                strokeWidth="0.8"
                strokeDasharray="4 2"
                opacity="0.65"
              />
            </svg>

            {/* Clean Serif Text (No Emojis / No Icons) */}
            <span className="relative z-10 font-display text-[11px] font-bold uppercase tracking-[0.24em] text-amber-950 drop-shadow-2xs">
              Accept Invitation
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-1.5 animate-soft-in">
            {/* Accepted Gold State Pill */}
            <div className="relative flex items-center justify-center py-2.5 px-5 w-full max-w-[210px] mx-auto overflow-hidden shadow-md">
              <svg
                className="absolute inset-0 size-full pointer-events-none"
                viewBox="0 0 210 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="btnAccGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#80541C" />
                    <stop offset="50%" stopColor="#B38038" />
                    <stop offset="100%" stopColor="#5E3C0F" />
                  </linearGradient>
                </defs>
                <rect
                  x="1"
                  y="1"
                  width="208"
                  height="42"
                  rx="21"
                  fill="url(#btnAccGold)"
                  stroke="#D4AF37"
                  strokeWidth="1.2"
                />
              </svg>
              <span className="relative z-10 font-display text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-100 drop-shadow-xs">
                Invitation Accepted
              </span>
            </div>

            <p className="text-[10.5px] font-display italic text-amber-950/80 mt-1">
              Dhanyavaad! We look forward to celebrating with you.
            </p>

            <button
              onClick={() => setAccepted(false)}
              className="mt-0.5 text-[9px] uppercase tracking-widest text-amber-900/60 hover:text-amber-950 underline transition-colors"
            >
              Change Response
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}