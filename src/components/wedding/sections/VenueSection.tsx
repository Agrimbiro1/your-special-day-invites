import { motion } from "framer-motion";
import { Navigation, Phone, Sparkles } from "lucide-react";
import { VENUE } from "../data";
import { Divider, SectionTitle } from "../ui";

export function VenueSection() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.mapsQuery)}`;

  const FAMILY_CONTACTS = [
    {
      name: "Mr. Vikram Sharma",
      relation: "Father of Bride",
      phone: "+91 98123 45670",
      tel: "+919812345670",
    },
    {
      name: "Mr. Rajesh Mehra",
      relation: "Father of Groom",
      phone: "+91 98123 45671",
      tel: "+919812345671",
    },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-2 pb-4 px-3 w-full max-w-sm mx-auto select-none text-center overflow-hidden">
      <SectionTitle>The Venue</SectionTitle>

      {/* Subtitle Emblem Badge - Top-down */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        className="mt-1.5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-500/15 backdrop-blur-md rounded-full border border-gold/40 shadow-2xs flex items-center gap-1.5"
      >
        <Sparkles className="size-3 text-amber-700" />
        <span>Sacred Royal Location</span>
        <Sparkles className="size-3 text-amber-700" />
      </motion.div>

      {/* Top Venue Name & Address (Without any card box layout) - Staggered Left & Right */}
      <div className="mt-3.5 flex flex-col items-center justify-center">
        <motion.h3
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="font-display text-2xl sm:text-3xl text-amber-950 font-normal tracking-wide leading-tight drop-shadow-2xs"
        >
          {VENUE.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          className="mt-2 font-display text-sm italic text-amber-950/85 leading-relaxed max-w-[275px]"
        >
          {VENUE.address}
        </motion.p>
      </div>

      {/* Middle Section: Get Directions Metallic Gold Button - Bottom-up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="mt-4 w-full flex justify-center"
      >
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center justify-center py-3 px-6 w-full max-w-[220px] rounded-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.2em] text-xs shadow-xl hover:shadow-gold hover:from-amber-800 hover:to-amber-800 active:scale-95 transition-all gap-2 group"
        >
          <Navigation className="size-3.5 text-amber-300 group-hover:rotate-45 transition-transform" />
          <span>Get Directions</span>
        </a>
      </motion.div>

      <Divider />

      {/* Bottom Section: 2 Family Contact Cards (Father of Bride Left-in, Father of Groom Right-in) */}
      <div className="mt-2 w-full flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-900 mb-2"
        >
          Family Assistance & Contacts
        </motion.span>

        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[310px]">
          {FAMILY_CONTACTS.map((c, idx) => (
            <motion.div
              key={c.relation}
              initial={{ opacity: 0, x: idx === 0 ? -35 : 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
              className="glass-panel relative flex flex-col justify-between p-3 rounded-2xl border border-gold/40 bg-white/70 backdrop-blur-xl shadow-lg text-center overflow-hidden hover:bg-white/85 transition-all"
            >
              {/* Top Accent Line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-600 to-amber-300 opacity-90 rounded-t-2xl" />

              {/* Relation Badge */}
              <span className="mt-0.5 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-amber-900 bg-amber-500/20 rounded-full border border-gold/35 shadow-2xs truncate">
                {c.relation}
              </span>

              {/* Contact Name & Phone */}
              <div className="my-2">
                <p className="font-display text-xs font-bold text-amber-950 truncate">
                  {c.name}
                </p>
                <p className="mt-0.5 text-[10px] text-amber-900/80 font-medium tracking-tight">
                  {c.phone}
                </p>
              </div>

              {/* Call Now Button */}
              <a
                href={`tel:${c.tel}`}
                className="mt-1 py-1.5 px-2.5 rounded-xl bg-amber-900 text-white font-bold uppercase tracking-wider text-[9px] shadow-sm hover:bg-amber-800 active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <Phone className="size-2.5 text-amber-300" />
                <span>Call Now</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}