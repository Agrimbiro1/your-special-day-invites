import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Battery,
  CalendarHeart,
  Camera,
  ChevronLeft,
  ChevronRight,
  Gem,
  HeartHandshake,
  Hourglass,
  MailOpen,
  MapPin,
  Signal,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";
import { LivingBackground, type BgKind } from "./LivingBackground";
import { OpeningAnimation } from "./OpeningAnimation";
import { FlowerShower } from "./FlowerShower";
import { DesktopGoldenArt } from "./DesktopGoldenArt";
import { HomeSection } from "./sections/HomeSection";
import { EventsSection } from "./sections/EventsSection";
import { FamilySection } from "./sections/FamilySection";
import { GallerySection } from "./sections/GallerySection";
import { CountdownSection } from "./sections/CountdownSection";
import { RsvpSection } from "./sections/RsvpSection";
import { BlessingsSection } from "./sections/BlessingsSection";
import { VenueSection } from "./sections/VenueSection";
import { ThankYouSection } from "./sections/ThankYouSection";

const SECTIONS = [
  { id: "home", label: "Home", icon: Gem, bg: "arch", render: HomeSection },
  { id: "events", label: "Events", icon: CalendarHeart, bg: "courtyard", render: EventsSection },
  { id: "family", label: "Family", icon: Users, bg: "family", render: FamilySection },
  { id: "gallery", label: "Gallery", icon: Camera, bg: "gallery", render: GallerySection },
  { id: "countdown", label: "Countdown", icon: Hourglass, bg: "countdown", render: CountdownSection },
  { id: "rsvp", label: "RSVP", icon: MailOpen, bg: "rsvp", render: RsvpSection },
  { id: "blessings", label: "Blessings", icon: Sparkles, bg: "blessings", render: BlessingsSection },
  { id: "venue", label: "Venue", icon: MapPin, bg: "venue", render: VenueSection },
  { id: "thanks", label: "Thanks", icon: HeartHandshake, bg: "thankyou", render: ThankYouSection },
] as const;

export function WeddingApp() {
  const [active, setActive] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isShowerActive, setIsShowerActive] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [activeEventBg, setActiveEventBg] = useState<BgKind>("haldi");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  // Extract personalized guest name from URL parameters (?guest=... or ?name=...)
  const [guestName] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const g = params.get("guest") || params.get("name");
      if (g && g.trim()) return g.trim();
    }
    return "Rajesh Sharma";
  });

  const section = SECTIONS[active]!;
  const Body = section.render;
  const isFirstSection = active === 0;
  const isLastSection = active === SECTIONS.length - 1;
  const currentBg = section.id === "events" ? activeEventBg : (section.bg as BgKind);

  const handleOpenInvitation = () => {
    setIsShowerActive(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 2250);
  };

  const handleNext = () => {
    if (active < SECTIONS.length - 1) {
      setActive((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (active > 0) {
      setActive((prev) => prev - 1);
    }
  };

  // Scroll active tab into view smoothly
  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
    setIsNavHidden(false);
  }, [active]);

  return (
    <div className="relative grid h-[100svh] w-full place-items-center overflow-hidden bg-[oklch(0.18_0.03_150)] p-0 sm:p-3">
      {/* Animated Desktop Golden Royal SVG Art Overlay (Left & Right background) */}
      <DesktopGoldenArt />

      {/* Left Side Desktop Royal Character Illustration with Glowing Background Shadow */}
      <div className="hidden lg:block absolute left-4 xl:left-16 top-1/2 -translate-y-1/2 h-[58%] max-h-[400px] w-auto pointer-events-none z-10 select-none">
        {/* Background Glowing Shadow Aura (Static, Shifted 10px down) */}
        <div className="absolute inset-0 translate-y-[10px] rounded-full bg-amber-400/40 blur-2xl" />
        <img
          src="/assets/desktop-side-man.png"
          alt="Royal Groom Greeting"
          className="relative h-full w-auto object-contain drop-shadow-[0_0_25px_rgba(251,191,36,0.7)] drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] opacity-90"
        />
      </div>

      {/* Right Side Desktop Royal Character Illustration with Glowing Background Shadow */}
      <div className="hidden lg:block absolute right-4 xl:right-16 top-1/2 -translate-y-1/2 h-[58%] max-h-[400px] w-auto pointer-events-none z-10 select-none">
        {/* Background Glowing Shadow Aura (Static, Shifted 10px down) */}
        <div className="absolute inset-0 translate-y-[10px] rounded-full bg-amber-400/40 blur-2xl" />
        <img
          src="/assets/desktop-side-woman.png"
          alt="Royal Bride Greeting"
          className="relative h-full w-auto object-contain drop-shadow-[0_0_25px_rgba(251,191,36,0.7)] drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] opacity-90"
        />
      </div>

      {/* Desktop Gold iPhone Frame Outer Bezel (Increased screen size by 7%) */}
      <div className="relative flex h-full w-full max-w-[375px] items-center justify-center sm:h-[min(100svh,762px)] z-20">
        {/* Hardware Volume Up Button (Desktop Frame) */}
        <div className="hidden sm:block absolute -left-[10px] top-[140px] h-[48px] w-[5px] rounded-l-md bg-gradient-to-r from-[#d4b46e] to-[#ab873e] shadow-md z-0" />
        {/* Hardware Volume Down Button (Desktop Frame) */}
        <div className="hidden sm:block absolute -left-[10px] top-[200px] h-[48px] w-[5px] rounded-l-md bg-gradient-to-r from-[#d4b46e] to-[#ab873e] shadow-md z-0" />
        {/* Hardware Power Button (Desktop Frame) */}
        <div className="hidden sm:block absolute -right-[10px] top-[160px] h-[72px] w-[5px] rounded-r-md bg-gradient-to-l from-[#d4b46e] to-[#ab873e] shadow-md z-0" />

        {/* Outer Metallic Bezel Container */}
        <div className="relative h-full w-full overflow-hidden bg-background shadow-2xl transition-all duration-300 sm:rounded-[3.2rem] sm:p-[10px] sm:bg-gradient-to-b sm:from-[#f3e1b6] sm:via-[#c5a258] sm:to-[#e8ce93] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
          {/* Main Mobile Screen Display */}
          <div
            className="relative h-full w-full overflow-hidden bg-background sm:rounded-[2.6rem] border border-black/10 shadow-inner"
          >
            {/* Top Desktop iPhone Status Bar Overlay */}
            <div className="hidden sm:flex absolute top-3 inset-x-6 z-40 justify-between items-center text-[10px] font-bold text-black/75 pointer-events-none tracking-tight">
              <span>2:57 PM</span>
              <div className="flex items-center gap-1.5 opacity-80">
                <Signal className="size-3 text-black" />
                <Wifi className="size-3 text-black" />
                <Battery className="size-3.5 text-black fill-black" />
              </div>
            </div>

            {/* Dynamic Island Camera Notch (Desktop View) */}
            <div className="hidden sm:flex absolute top-2.5 left-1/2 -translate-x-1/2 z-50 h-[26px] w-[110px] items-center justify-end rounded-full bg-black px-2 shadow-sm pointer-events-none">
              <span className="size-2.5 rounded-full bg-[#15151e] border border-white/10" />
            </div>

            {/* AnimatePresence Opening Intro overlay overlaying the main app */}
            <AnimatePresence mode="wait">
              {showIntro && (
                <OpeningAnimation guestName={guestName} onOpen={handleOpenInvitation} />
              )}
            </AnimatePresence>

            {/* Celebration Flower Shower Petal Rain Overlay */}
            {isShowerActive && (
              <FlowerShower onComplete={() => setIsShowerActive(false)} />
            )}

            <LivingBackground kind={currentBg} />

            <main className="absolute inset-x-0 bottom-20 top-0 overflow-hidden z-20 sm:top-6">
              <div key={section.id} className="h-full">
                <Body
                  guestName={guestName}
                  onModalToggle={setIsNavHidden}
                  onEventChange={(eventName: string) => {
                    const kind = eventName.toLowerCase() as BgKind;
                    setActiveEventBg(kind);
                  }}
                />
              </div>
            </main>

            {/* Integrated Redesigned Bottom Navigation Bar with Next and Previous Buttons */}
            <nav
              className={`glass-panel absolute inset-x-3 bottom-4 z-30 flex items-center justify-between rounded-full px-2.5 py-2 border border-gold/40 shadow-xl backdrop-blur-md transition-all duration-300 ${
                isNavHidden ? "opacity-0 pointer-events-none translate-y-12" : "opacity-100 translate-y-0"
              }`}
            >
              {/* Previous Button - Hidden on Home section */}
              {isFirstSection ? (
                <div className="w-[62px]" />
              ) : (
                <button
                  onClick={handlePrev}
                  aria-label="Previous section"
                  className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-amber-950 transition-all hover:bg-white active:scale-95 shadow-xs border border-gold/30"
                >
                  <ChevronLeft className="size-4 text-amber-800" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Prev</span>
                </button>
              )}

              {/* Center Active Section Label & Pagination Dots */}
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1.5">
                  {(() => {
                    const Icon = section.icon;
                    return <Icon className="size-4 text-amber-800" />;
                  })()}
                  <span className="font-display text-sm font-bold tracking-wider text-amber-950">
                    {section.label}
                  </span>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center gap-1">
                  {SECTIONS.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setActive(idx)}
                      aria-label={`Jump to ${s.label}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === active
                          ? "w-4 bg-amber-800"
                          : "w-1.5 bg-amber-900/30 hover:bg-amber-900/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Next Button - Hidden on Thank You section */}
              {isLastSection ? (
                <div className="w-[62px]" />
              ) : (
                <button
                  onClick={handleNext}
                  aria-label="Next section"
                  className="flex items-center gap-1 rounded-full bg-amber-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-amber-800 active:scale-95 shadow-xs"
                >
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Next</span>
                  <ChevronRight className="size-4 text-white" />
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
