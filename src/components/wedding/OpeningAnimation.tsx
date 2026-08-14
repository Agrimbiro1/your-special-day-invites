import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Heart } from "lucide-react";
import { COUPLE } from "./data";

interface OpeningAnimationProps {
  guestName?: string;
  onOpen: () => void;
}

export function OpeningAnimation({ guestName = "Rajesh Sharma", onOpen }: OpeningAnimationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFinalScene, setIsFinalScene] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set explicit DOM properties & HTML attributes for mobile iOS Safari & Android Chrome
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("autoplay", "");

    const triggerPlay = () => {
      if (video) {
        video.muted = true;
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Auto-retry on micro-tick
            setTimeout(() => {
              if (video && video.paused) {
                video.muted = true;
                video.play().catch(() => {});
              }
            }, 80);
          });
        }
      }
    };

    triggerPlay();

    // Listen to media ready events & mobile touch triggers
    video.addEventListener("loadedmetadata", triggerPlay);
    video.addEventListener("canplay", triggerPlay);
    video.addEventListener("canplaythrough", triggerPlay);

    const handleFirstInteraction = () => {
      triggerPlay();
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };

    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });

    return () => {
      video.removeEventListener("loadedmetadata", triggerPlay);
      video.removeEventListener("canplay", triggerPlay);
      video.removeEventListener("canplaythrough", triggerPlay);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    // When video enters its final scene (last 3 seconds), smoothly animate in text without pausing video
    if (video.duration - video.currentTime <= 3.0) {
      if (!isFinalScene) {
        setIsFinalScene(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsFinalScene(true);
  };

  const handleSkipToFinal = () => {
    if (isFinalScene) return;
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = Math.max(0, video.duration - 2.8);
    }
    setIsFinalScene(true);
  };

  const handleEnterHome = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isExiting) return;
    setIsExiting(true);
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={isExiting ? { opacity: 0, scale: 1.06, filter: "blur(6px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
      className="absolute inset-0 z-50 overflow-hidden select-none bg-black flex flex-col justify-center items-center"
      onClick={!isFinalScene ? handleSkipToFinal : undefined}
    >
      {/* Background Video (Seamless Mobile Autoplay, No Native Play Buttons) */}
      <video
        ref={videoRef}
        src="/assets/open%20invitation%20video.mp4"
        playsInline
        autoPlay
        muted
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="h-full w-full object-cover object-center pointer-events-none select-none"
      />

      {/* FINAL SCENE ANIMATED OVERLAY */}
      <AnimatePresence>
        {isFinalScene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 overflow-hidden bg-transparent"
          >
            {/* Center Main Content & Button Stack */}
            <div className="flex w-full max-w-sm flex-col items-center text-center px-2 pt-16">
              {/* Personalized Guest Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mb-3.5 sm:mb-4 px-4 py-1 rounded-full bg-[#78350f] border border-amber-400/50 shadow-md backdrop-blur-md"
              >
                <span className="font-display text-xs sm:text-sm font-bold text-amber-100 tracking-wider">
                  Dear {guestName}
                </span>
              </motion.div>

              {/* Welcome Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mb-3 sm:mb-4 text-[10.5px] sm:text-xs font-black uppercase tracking-[0.32em] text-[#78350f] drop-shadow-xs"
              >
                Cordially Invite You to the Wedding of
              </motion.p>

              {/* Main Couple Names (Warm Light Golden Brown Text) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                className="my-3 sm:my-4 relative"
              >
                <h1 className="font-display text-3xl sm:text-4xl font-black tracking-wide text-[#78350f] drop-shadow-xs leading-tight">
                  {COUPLE.bride}
                  <span className="mx-2 font-serif italic text-[#92400e] font-bold">&amp;</span>
                  {COUPLE.groom}
                </h1>
              </motion.div>

              {/* Warm Golden Brown Heart Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="my-2 flex items-center justify-center gap-2 w-full"
              >
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#78350f] to-[#78350f]" />
                <Heart className="size-3.5 text-[#78350f] fill-[#78350f]" />
                <div className="h-0.5 w-16 bg-gradient-to-l from-transparent via-[#78350f] to-[#78350f]" />
              </motion.div>

              {/* Date & Location Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-widest text-[#78350f] uppercase drop-shadow-xs mb-6"
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-[#78350f]" />
                  6th Dec 2026
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-[#78350f]" />
                  Jaipur, Rajasthan
                </span>
              </motion.div>

              {/* Open Invitation Button (Matching Accept Invitation button design & colors) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[240px]"
              >
                <motion.button
                  onClick={handleEnterHome}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative flex items-center justify-center px-7 py-3 rounded-full w-full max-w-[240px] mx-auto overflow-hidden shadow-lg transition-all duration-300 border border-amber-400/60 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 cursor-pointer"
                >
                  {/* Outer Golden Glow & Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-200/30 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Gold Ring Inset Border */}
                  <div className="absolute inset-0.5 rounded-full border border-amber-300/40 pointer-events-none" />

                  <span className="relative z-10 font-display text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-amber-100 drop-shadow-xs">
                    Open Invitation
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}