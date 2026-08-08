import { Phone } from "lucide-react";
import { VENUE } from "../data";
import { Divider, SectionTitle } from "../ui";

export function VenueSection() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.mapsQuery)}`;
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <SectionTitle>The Venue</SectionTitle>
      <div className="glass-panel anim-soft-in mt-4 w-full overflow-hidden rounded-3xl text-ink">
        <a href={maps} target="_blank" rel="noreferrer" className="block">
          <div
            className="relative grid h-36 place-items-center"
            style={{ background: "linear-gradient(150deg, oklch(0.88 0.04 150), oklch(0.92 0.03 90))" }}
          >
            <svg width="100%" height="100%" viewBox="0 0 300 140" className="absolute inset-0" aria-hidden="true">
              <path d="M0 40 H300 M0 96 H300 M70 0 V140 M200 0 V140" stroke="oklch(0.75 0.03 120)" strokeWidth="6" />
              <path d="M0 70 Q90 30 300 80" stroke="oklch(0.8 0.06 220)" strokeWidth="8" fill="none" />
            </svg>
            <span className="relative grid size-9 place-items-center rounded-full bg-rose text-background shadow-lg">
              ✦
            </span>
          </div>
        </a>
        <div className="px-5 py-4 text-center">
          <p className="font-display text-2xl">{VENUE.name}</p>
          <Divider />
          <p className="text-xs text-ink/75">{VENUE.address}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {VENUE.contacts.map((c) => (
              <a
                key={c.phone}
                href={`tel:${c.phone}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-background"
              >
                <Phone className="size-3" /> {c.name.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}