import { motion } from "framer-motion";
import { Navigation, Phone } from "lucide-react";
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

      {/* Subtitle Emblem Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        className="mt-1.5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-500/15 backdrop-blur-md rounded-full border border-gold/40 shadow-2xs flex items-center justify-center"
      >
        <span>Sacred Royal Location</span>
      </motion.div>

      {/* Top Venue Name & Address */}
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

      {/* Middle Section: Get Directions Premium RSVP-Style Metallic Gold Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="mt-4 w-full flex justify-center"
      >
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center justify-center gap-2 px-7 py-3 rounded-full w-full max-w-[230px] mx-auto overflow-hidden shadow-lg transition-all duration-300 border border-amber-400/60 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 cursor-pointer"
        >
          {/* Outer Golden Glow & Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-200/30 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Gold Ring Inset Border */}
          <div className="absolute inset-0.5 rounded-full border border-amber-300/40 pointer-events-none" />

          <Navigation className="relative z-10 size-3.5 text-amber-300 group-hover:rotate-45 transition-transform" />
          <span className="relative z-10 font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-100 drop-shadow-xs">
            Get Directions
          </span>
        </motion.a>
      </motion.div>

      <Divider />

      {/* Bottom Section: 2 Family Contact Cards */}
      <div className="mt-2 w-full flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-900 mb-2"
        >
          Family Assistance & Contacts
        </motion.span>

        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[320px]">
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

              {/* Call Now Button - Styled same as Accept Invitation button */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`tel:${c.tel}`}
                className="group relative flex items-center justify-center gap-1.5 py-2 px-3 rounded-full w-full mx-auto overflow-hidden shadow-md transition-all duration-300 border border-amber-400/60 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 cursor-pointer"
              >
                {/* Outer Golden Glow & Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-200/30 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Gold Ring Inset Border */}
                <div className="absolute inset-0.5 rounded-full border border-amber-300/40 pointer-events-none" />

                <Phone className="relative z-10 size-3 text-amber-300" />
                <span className="relative z-10 font-display text-[9.5px] font-bold uppercase tracking-[0.18em] text-amber-100 drop-shadow-xs">
                  Call Now
                </span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}