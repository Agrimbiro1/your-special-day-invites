import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Divider, Panel, SectionTitle } from "../ui";

export function RsvpSection() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(2);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <SectionTitle>RSVP</SectionTitle>
      <Panel key={step} className="mt-4 w-full text-center">
        {step === 0 && (
          <>
            <p className="font-display text-2xl">Your good name?</p>
            <Divider />
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Type your name"
              className="w-full rounded-full border border-gold/50 bg-background/60 px-4 py-2 text-center text-sm text-ink outline-none placeholder:text-ink/40"
            />
            <button
              disabled={!name.trim()}
              onClick={() => setStep(1)}
              className="mt-4 w-full rounded-full bg-ink px-4 py-2.5 text-xs uppercase tracking-[0.28em] text-background disabled:opacity-40"
            >
              Continue
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <p className="font-display text-2xl">How many joining?</p>
            <Divider />
            <div className="flex items-center justify-center gap-6">
              <button aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid size-10 place-items-center rounded-full border border-gold/50 text-ink">
                <Minus className="size-4" />
              </button>
              <span className="font-display text-4xl tabular-nums">{guests}</span>
              <button aria-label="More guests" onClick={() => setGuests((g) => Math.min(10, g + 1))} className="grid size-10 place-items-center rounded-full border border-gold/50 text-ink">
                <Plus className="size-4" />
              </button>
            </div>
            <button onClick={() => setStep(2)} className="mt-5 w-full rounded-full bg-ink px-4 py-2.5 text-xs uppercase tracking-[0.28em] text-background">
              Continue
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <p className="font-display text-2xl">Shall we expect you?</p>
            <Divider />
            <p className="text-sm text-ink/75">
              {name || "Guest"} &middot; {guests} {guests === 1 ? "guest" : "guests"}
            </p>
            <button onClick={() => setStep(3)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-4 py-2.5 text-xs uppercase tracking-[0.28em] text-background">
              <Heart className="size-4" /> Accept Invitation
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <p className="font-display text-3xl">Dhanyavaad!</p>
            <Divider />
            <p className="text-sm text-ink/75">
              We can't wait to celebrate with you, {name || "friend"}.
            </p>
            <button onClick={() => setStep(0)} className="mt-5 text-[11px] uppercase tracking-[0.28em] text-ink/60 underline">
              Edit response
            </button>
          </>
        )}
      </Panel>
      <div className="mt-4 flex gap-2">
        {[0, 1, 2, 3].map((s) => (
          <span key={s} className={`h-1.5 rounded-full transition-all ${s === step ? "w-6 bg-ink/70" : "w-1.5 bg-ink/30"}`} />
        ))}
      </div>
    </div>
  );
}