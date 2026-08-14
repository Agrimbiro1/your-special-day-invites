import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileText, Edit3 } from "lucide-react";
import { Divider, SectionTitle } from "../ui";
import { useRsvpState } from "@/hooks/useRsvpState";
import { RsvpFormModal } from "../rsvp/RsvpFormModal";
import { RsvpPreviewBar } from "../rsvp/RsvpPreviewBar";
import type { RsvpAnswers } from "@/types/rsvp";

interface RsvpSectionProps {
  guestName?: string;
  onModalToggle?: (isHidden: boolean) => void;
  onShowerTrigger?: () => void;
}

export function RsvpSection({ guestName = "Rajesh Sharma", onModalToggle, onShowerTrigger }: RsvpSectionProps) {
  const {
    settings,
    status,
    answers,
    isFormOpen,
    hasUrlOverride,
    handleAccept: baseHandleAccept,
    handleSubmitForm,
    handleOpenForm,
    handleCloseForm,
    handleResetState,
  } = useRsvpState();

  const handleAccept = () => {
    baseHandleAccept();
  };

  const handleFormSubmit = (formData: RsvpAnswers) => {
    handleSubmitForm(formData);
    onShowerTrigger?.();
  };

  // Notify parent app to hide bottom navigation bar when RSVP form modal is open
  useEffect(() => {
    onModalToggle?.(isFormOpen);
  }, [isFormOpen, onModalToggle]);

  const isDetailed = settings.rsvpType === "detailed";
  const isEditAllowed = settings.allowEditRsvp;

  return (
    <div className="flex h-full flex-col items-center justify-center -mt-4 pb-4 px-4 w-full max-w-sm mx-auto select-none text-center overflow-hidden">
      <SectionTitle>RSVP</SectionTitle>

      {/* Personalized Guest Greeting Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mt-2.5 px-4 py-1 rounded-full bg-amber-500/15 border border-gold/40 text-amber-950 font-display text-sm font-bold tracking-wide shadow-2xs"
      >
        Dear {guestName}
      </motion.div>

      {/* Main Wedding Text */}
      <div className="mt-2.5 flex flex-col items-center justify-center">
        <motion.h3
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-wide leading-tight drop-shadow-2xs"
        >
          Your Presence Is Our Greatest Blessing
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="mt-2 font-display text-sm italic text-amber-950/80 leading-relaxed max-w-[280px]"
        >
          We request the honor of your presence as we celebrate our love and union together.
        </motion.p>

        <motion.span
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
          className="mt-2 text-[10px] uppercase tracking-[0.22em] text-amber-900/70 font-semibold"
        >
          Saturday, Dec 6, 2026 &middot; Jaipur
        </motion.span>
      </div>

      <Divider />

      {/* RSVP Dynamic Content & Buttons Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
        className="mt-2 w-full flex flex-col items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {/* STAGE 1: NOT RESPONDED */}
          {status === "not_responded" && (
            <motion.button
              key="rsvp-accept-btn"
              onClick={handleAccept}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative flex items-center justify-center px-7 py-3 rounded-full w-full max-w-[240px] mx-auto overflow-hidden shadow-lg transition-all duration-300 border border-amber-400/60 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 cursor-pointer"
            >
              {/* Outer Golden Glow & Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-200/30 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Gold Ring Inset Border */}
              <div className="absolute inset-0.5 rounded-full border border-amber-300/40 pointer-events-none" />

              <span className="relative z-10 font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-100 drop-shadow-xs">
                Accept Invitation
              </span>
            </motion.button>
          )}

          {/* STAGE 2: ACCEPTED (Simple or Detailed before submission) */}
          {status === "accepted" && (
            <motion.div
              key="rsvp-accepted-state"
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-2.5 w-full"
            >
              <div className="flex items-center justify-center gap-1.5 px-6 py-2 rounded-full w-full max-w-[240px] mx-auto bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-800 text-emerald-100 border border-emerald-400/50 shadow-md">
                <CheckCircle2 className="size-3.5 text-emerald-300" />
                <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
                  Invitation Accepted
                </span>
              </div>

              <p className="text-[11px] font-display italic text-amber-950/80 mt-0.5 max-w-[260px]">
                Dhanyavaad! We look forward to celebrating with you.
              </p>

              {/* If Detailed type, show button to submit form details */}
              {isDetailed && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOpenForm}
                  className="mt-1 flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-amber-900/90 hover:bg-amber-800 text-amber-100 border border-amber-400/50 shadow-sm text-xs font-display font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <FileText className="size-3.5 text-amber-300" />
                  <span>Submit RSVP Details</span>
                </motion.button>
              )}
            </motion.div>
          )}

          {/* STAGE 3: SUBMITTED (Detailed type after form submission) */}
          {status === "submitted" && (
            <motion.div
              key="rsvp-submitted-state"
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 w-full max-w-[270px] mx-auto"
            >
              <div className="flex items-center justify-center gap-1.5 px-6 py-2 rounded-full w-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-100 border border-amber-400/60 shadow-md">
                <CheckCircle2 className="size-3.5 text-amber-300" />
                <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
                  RSVP Submitted
                </span>
              </div>

              <p className="text-[11px] font-display italic text-amber-950/80">
                Dhanyavaad! Your attendance details have been recorded.
              </p>

              {/* Edit button (only if allowEditRsvp is true) */}
              {isEditAllowed && (
                <button
                  onClick={handleOpenForm}
                  className="mt-1 flex items-center justify-center gap-1 text-[11px] uppercase tracking-widest text-amber-900/80 hover:text-amber-950 font-semibold underline transition-colors cursor-pointer"
                >
                  <Edit3 className="size-3 text-amber-800" />
                  <span>Edit RSVP Details</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Detailed Form Popup Modal */}
      {isDetailed && (
        <RsvpFormModal
          isOpen={isFormOpen}
          fields={settings.form.fields}
          initialAnswers={answers}
          guestName={guestName}
          isEditing={status === "submitted"}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}

      {/* Dev & Preview Parameter Bar (renders only when URL preview params are present) */}
      {hasUrlOverride && (
        <RsvpPreviewBar
          rsvpType={settings.rsvpType}
          allowEditRsvp={settings.allowEditRsvp}
          status={status}
          hasUrlOverride={hasUrlOverride}
          onReset={handleResetState}
        />
      )}
    </div>
  );
}