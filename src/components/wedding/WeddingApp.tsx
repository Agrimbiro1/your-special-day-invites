import { useState } from "react";
import {
  CalendarHeart,
  Camera,
  Gem,
  HeartHandshake,
  Hourglass,
  MailOpen,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { LivingBackground, type BgKind } from "./LivingBackground";
import { OpeningAnimation } from "./OpeningAnimation";
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
  { id: "family", label: "Family", icon: Users, bg: "arch", render: FamilySection },
  { id: "gallery", label: "Gallery", icon: Camera, bg: "courtyard", render: GallerySection },
  { id: "countdown", label: "Countdown", icon: Hourglass, bg: "arch", render: CountdownSection },
  { id: "rsvp", label: "RSVP", icon: MailOpen, bg: "courtyard", render: RsvpSection },
  { id: "blessings", label: "Blessings", icon: Sparkles, bg: "arch", render: BlessingsSection },
  { id: "venue", label: "Venue", icon: MapPin, bg: "courtyard", render: VenueSection },
  { id: "thanks", label: "Thanks", icon: HeartHandshake, bg: "arch", render: ThankYouSection },
] as const;

export function WeddingApp() {
  const [intro, setIntro] = useState(true);
  const [active, setActive] = useState(0);
  const section = SECTIONS[active]!;
  const Body = section.render;

  return (
    <div className="grid h-[100svh] w-full place-items-center overflow-hidden bg-[oklch(0.22_0.03_150)]">
      <div className="relative h-[100svh] w-full max-w-[430px] overflow-hidden bg-background shadow-2xl sm:h-[min(100svh,900px)] sm:rounded-[2.2rem]">
        <LivingBackground kind={section.bg as BgKind} />

        <main className="absolute inset-x-0 bottom-24 top-0 overflow-hidden">
          <div key={section.id} className="h-full">
            <Body />
          </div>
        </main>

        <nav className="glass-panel absolute inset-x-3 bottom-4 z-30 rounded-full px-2 py-2">
          <div className="flex snap-x gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              const on = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-current={on}
                  className={`flex shrink-0 snap-center flex-col items-center gap-0.5 rounded-full px-3 py-1.5 transition-colors ${
                    on ? "bg-ink text-background" : "text-ink/70"
                  }`}
                >
                  <Icon className="size-[18px]" />
                  <span className="text-[8px] uppercase tracking-[0.14em]">{s.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {intro && <OpeningAnimation onDone={() => setIntro(false)} />}
      </div>
    </div>
  );
}