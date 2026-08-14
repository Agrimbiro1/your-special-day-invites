import React, { useState } from "react";
import { SlidersHorizontal, ChevronUp, ChevronDown, RefreshCw } from "lucide-react";
import type { RsvpStatus, RsvpType } from "@/types/rsvp";

interface RsvpPreviewBarProps {
  rsvpType: RsvpType;
  allowEditRsvp: boolean;
  status: RsvpStatus;
  hasUrlOverride: boolean;
  onReset: () => void;
}

export function RsvpPreviewBar({
  rsvpType,
  allowEditRsvp,
  status,
  hasUrlOverride,
  onReset,
}: RsvpPreviewBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <div className="fixed bottom-2 left-2 z-50 select-none text-left font-sans text-xs">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/90 border border-amber-400/60 text-amber-200 shadow-lg hover:bg-amber-900 transition-all cursor-pointer backdrop-blur-md"
      >
        <SlidersHorizontal className="size-3.5 text-amber-400" />
        <span className="font-semibold text-[11px]">RSVP Preview Bar</span>
        {isOpen ? <ChevronDown className="size-3" /> : <ChevronUp className="size-3" />}
      </button>

      {/* Expanded Controls Card */}
      {isOpen && (
        <div className="mt-2 w-72 p-3.5 rounded-2xl bg-amber-950/95 border border-amber-400/40 shadow-2xl text-amber-100 backdrop-blur-lg flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-amber-400/20 pb-2">
            <span className="font-bold text-xs uppercase tracking-wider text-amber-300">
              Template Preview Settings
            </span>
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <RefreshCw className="size-3" /> Reset State
            </button>
          </div>

          {/* 1. RSVP Type */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-amber-200/80">RSVP Mode (?rsvp=)</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => updateUrl("rsvp", "simple")}
                className={`py-1 px-2.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                  rsvpType === "simple"
                    ? "bg-amber-500/30 border-amber-400 text-amber-100 font-bold"
                    : "bg-amber-900/40 border-amber-400/20 text-amber-300/70"
                }`}
              >
                Simple
              </button>
              <button
                onClick={() => updateUrl("rsvp", "detailed")}
                className={`py-1 px-2.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                  rsvpType === "detailed"
                    ? "bg-amber-500/30 border-amber-400 text-amber-100 font-bold"
                    : "bg-amber-900/40 border-amber-400/20 text-amber-300/70"
                }`}
              >
                Detailed
              </button>
            </div>
          </div>

          {/* 2. Edit Allowed */}
          {rsvpType === "detailed" && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-amber-200/80">
                Allow Editing (?edit=)
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => updateUrl("edit", "on")}
                  className={`py-1 px-2.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                    allowEditRsvp
                      ? "bg-amber-500/30 border-amber-400 text-amber-100 font-bold"
                      : "bg-amber-900/40 border-amber-400/20 text-amber-300/70"
                  }`}
                >
                  Edit ON
                </button>
                <button
                  onClick={() => updateUrl("edit", "off")}
                  className={`py-1 px-2.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                    !allowEditRsvp
                      ? "bg-amber-500/30 border-amber-400 text-amber-100 font-bold"
                      : "bg-amber-900/40 border-amber-400/20 text-amber-300/70"
                  }`}
                >
                  Edit OFF
                </button>
              </div>
            </div>
          )}

          {/* 3. Screen Stage Direct Jump */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-amber-200/80">
              Direct Stage Jump (&screen=)
            </span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => updateUrl("screen", null)}
                className={`py-1 px-1.5 rounded-lg border text-[10px] text-center transition-all cursor-pointer ${
                  status === "not_responded"
                    ? "bg-amber-500/30 border-amber-400 text-amber-100 font-bold"
                    : "bg-amber-900/40 border-amber-400/20 text-amber-300/70"
                }`}
              >
                Initial
              </button>
              <button
                onClick={() => updateUrl("screen", "accepted")}
                className={`py-1 px-1.5 rounded-lg border text-[10px] text-center transition-all cursor-pointer ${
                  status === "accepted"
                    ? "bg-amber-500/30 border-amber-400 text-amber-100 font-bold"
                    : "bg-amber-900/40 border-amber-400/20 text-amber-300/70"
                }`}
              >
                Accepted
              </button>
              <button
                onClick={() => updateUrl("screen", "submitted")}
                className={`py-1 px-1.5 rounded-lg border text-[10px] text-center transition-all cursor-pointer ${
                  status === "submitted"
                    ? "bg-amber-500/30 border-amber-400 text-amber-100 font-bold"
                    : "bg-amber-900/40 border-amber-400/20 text-amber-300/70"
                }`}
              >
                Submitted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
