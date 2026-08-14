import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MailOpen, CheckCircle2 } from "lucide-react";
import type { FormFieldConfig, RsvpAnswers } from "@/types/rsvp";
import { RsvpFormField } from "./RsvpFormField";

interface RsvpFormModalProps {
  isOpen: boolean;
  fields: FormFieldConfig[];
  initialAnswers: RsvpAnswers;
  guestName?: string;
  isEditing?: boolean;
  onSubmit: (answers: RsvpAnswers) => void;
  onClose: () => void;
}

export function RsvpFormModal({
  isOpen,
  fields,
  initialAnswers,
  guestName = "Guest",
  isEditing = false,
  onSubmit,
  onClose,
}: RsvpFormModalProps) {
  const [formData, setFormData] = useState<RsvpAnswers>(initialAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(initialAnswers || {});
      setErrors({});
    }
  }, [isOpen, initialAnswers]);

  if (!isOpen) return null;

  const handleFieldChange = (fieldId: string, val: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: val }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[fieldId];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate required fields
    fields.forEach((f) => {
      if (f.required) {
        const val = formData[f.id];
        if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
          newErrors[f.id] = `${f.label} is required`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-end justify-center overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Bottom Sheet Modal Drawer */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md h-[58vh] max-h-[480px] rounded-t-[2.5rem] p-5 glass-panel bg-white/95 backdrop-blur-2xl border-t-2 border-x border-gold/50 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between text-center overflow-hidden select-none"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gold/30 pb-3 pt-1">
              <div className="flex items-center gap-2">
                <MailOpen className="size-5 text-amber-800" />
                <h4 className="font-display text-xl sm:text-2xl font-semibold text-ink">
                  {isEditing ? "Update RSVP" : "RSVP Details"}
                </h4>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="grid size-8 place-items-center rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 active:scale-90 transition-all border border-gold/30 cursor-pointer"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Guest Badge & Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden mt-2">
              <div className="overflow-y-auto scrollbar-none space-y-3.5 pr-1 py-1">
                {/* Guest Badge */}
                <div className="text-left">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-1 block">
                    Responding As
                  </label>
                  <div className="w-full rounded-2xl border border-gold/40 bg-amber-500/15 px-4 py-2 flex items-center justify-between shadow-2xs">
                    <span className="font-display text-sm font-bold text-amber-950">Dear {guestName}</span>
                    <span className="text-[9px] uppercase tracking-wider text-amber-900 font-bold bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-gold/30">
                      Guest
                    </span>
                  </div>
                </div>

                {/* Fields */}
                {fields.map((field) => (
                  <RsvpFormField
                    key={field.id}
                    field={field}
                    value={formData[field.id]}
                    onChange={(val) => handleFieldChange(field.id, val)}
                    error={errors[field.id]}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 mt-2 border-t border-gold/20 flex flex-col gap-2 shrink-0">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-gold/50 text-white font-bold uppercase tracking-[0.22em] text-xs shadow-lg hover:shadow-gold active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="size-4 text-amber-200" />
                  <span>{isEditing ? "Save Updated RSVP" : "Submit RSVP Details"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
