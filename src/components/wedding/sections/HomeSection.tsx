import { motion } from "framer-motion";
import { COUPLE, WEDDING_DATE_LABEL } from "../data";
import { Divider } from "../ui";

export function HomeSection() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center -mt-20 sm:-mt-22 px-8 text-center text-ink select-none overflow-hidden">
      {/* Top Floating Lord Ganesha Artwork Image */}
      <motion.img
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        src="/assets/ganesha-art.webp"
        alt="Lord Ganesha"
        className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md pointer-events-none select-none relative z-10"
      />

      {/* Subtitle Left-in */}
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="mt-1.5 text-[10px] uppercase tracking-[0.5em] text-ink/60 font-medium relative z-10"
      >
        Together with families
      </motion.p>

      {/* Couple Names - Staggered Left & Right Appearing */}
      <div className="mt-1 font-display text-5xl leading-[1.05] tracking-wide flex items-center justify-center gap-2 relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          {COUPLE.bride}
        </motion.span>

        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="italic text-rose text-3xl"
        >
          &amp;
        </motion.span>

        <motion.span
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
        >
          {COUPLE.groom}
        </motion.span>
      </div>

      <Divider />

      {/* Date Label Bottom-up */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
        className="font-display text-xl tracking-[0.22em] relative z-10"
      >
        {WEDDING_DATE_LABEL}
      </motion.p>
    </div>
  );
}