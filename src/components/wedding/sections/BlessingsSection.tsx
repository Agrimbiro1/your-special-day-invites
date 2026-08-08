import { useState } from "react";
import { Plus, X } from "lucide-react";
import { INITIAL_BLESSINGS } from "../data";
import { SectionTitle } from "../ui";

export function BlessingsSection() {
  const [items, setItems] = useState(INITIAL_BLESSINGS);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    setItems((p) => [{ name: name.trim() || "A well-wisher", text: text.trim() }, ...p]);
    setName("");
    setText("");
    setOpen(false);
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-4">
      <SectionTitle>Blessings</SectionTitle>
      <div className="mt-4 w-full overflow-hidden">
        <div className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((b, i) => (
            <div key={`${b.name}-${i}`} className="glass-panel w-[78%] shrink-0 snap-center rounded-3xl px-5 py-6 text-center text-ink">
              <p className="font-display text-lg italic leading-snug">&ldquo;{b.text}&rdquo;</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ink/60">{b.name}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="glass-panel mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.24em] text-ink"
      >
        <Plus className="size-3.5" /> Add Blessing
      </button>

      {open && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-ink/30 px-6 backdrop-blur-sm">
          <div className="glass-panel anim-soft-in w-full rounded-3xl p-5 text-ink">
            <div className="flex items-center justify-between">
              <p className="font-display text-xl">Leave a blessing</p>
              <button aria-label="Close" onClick={() => setOpen(false)}>
                <X className="size-4" />
              </button>
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-3 w-full rounded-full border border-gold/50 bg-background/60 px-4 py-2 text-sm outline-none placeholder:text-ink/40"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="Your wishes for the couple"
              className="mt-2 w-full resize-none rounded-2xl border border-gold/50 bg-background/60 px-4 py-2 text-sm outline-none placeholder:text-ink/40"
            />
            <button onClick={add} className="mt-3 w-full rounded-full bg-ink px-4 py-2.5 text-xs uppercase tracking-[0.28em] text-background">
              Send blessing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}