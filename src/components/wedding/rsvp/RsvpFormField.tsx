import React from "react";
import type { FormFieldConfig } from "@/types/rsvp";

interface RsvpFormFieldProps {
  field: FormFieldConfig;
  value: any;
  onChange: (val: any) => void;
  error?: string | undefined;
}

export function RsvpFormField({ field, value, onChange, error }: RsvpFormFieldProps) {
  const { id, type, label, placeholder, required, options, hint } = field;

  const baseInputClasses =
    "w-full rounded-2xl border border-gold/40 bg-white/80 px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 placeholder:text-ink/40 shadow-2xs transition-all";

  const renderInput = () => {
    switch (type) {
      case "number":
        return (
          <input
            type="number"
            id={id}
            min={1}
            max={20}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder={placeholder || "e.g. 2"}
            required={required}
            className={baseInputClasses}
          />
        );

      case "time":
        return (
          <input
            type="time"
            id={id}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={baseInputClasses}
          />
        );

      case "date":
        return (
          <input
            type="date"
            id={id}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={baseInputClasses}
          />
        );

      case "select":
        return (
          <select
            id={id}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={`${baseInputClasses} appearance-none cursor-pointer pr-8 bg-no-repeat bg-[right_0.75rem_center] bg-[length:12px_12px] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2378350f%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')]`}
          >
            <option value="" disabled className="text-ink/40">
              Select {label}
            </option>
            {options?.map((opt) => (
              <option key={opt} value={opt} className="text-ink py-1">
                {opt}
              </option>
            ))}
          </select>
        );

      case "multiselect":
        const currentVals: string[] = Array.isArray(value) ? value : [];
        const toggleOption = (opt: string) => {
          if (currentVals.includes(opt)) {
            onChange(currentVals.filter((v) => v !== opt));
          } else {
            onChange([...currentVals, opt]);
          }
        };
        return (
          <div className="flex flex-wrap gap-2 pt-1">
            {options?.map((opt) => {
              const isSelected = currentVals.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleOption(opt)}
                  className={`px-3 py-1.5 rounded-full text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-amber-900 text-white border-gold shadow-xs"
                      : "bg-white/60 text-amber-950 border-gold/30 hover:bg-white"
                  }`}
                >
                  {opt} {isSelected ? "✓" : "+"}
                </button>
              );
            })}
          </div>
        );

      case "textarea":
        return (
          <textarea
            id={id}
            rows={3}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            required={required}
            className={`${baseInputClasses} resize-none`}
          />
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              id={id}
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="size-4 rounded border-gold/50 bg-white text-amber-800 focus:ring-gold"
            />
            <span className="text-xs font-semibold text-amber-950">{label}</span>
          </label>
        );

      case "phone":
        return (
          <input
            type="tel"
            id={id}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "+91 98765 43210"}
            required={required}
            className={baseInputClasses}
          />
        );

      case "email":
        return (
          <input
            type="email"
            id={id}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "guest@example.com"}
            required={required}
            className={baseInputClasses}
          />
        );

      case "text":
      default:
        return (
          <input
            type="text"
            id={id}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            required={required}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {type !== "checkbox" && (
        <label htmlFor={id} className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-900 font-bold block">
          {label} {required && <span className="text-amber-700">*</span>}
        </label>
      )}

      {renderInput()}

      {hint && <p className="text-[10.5px] italic text-amber-900/60 mt-0.5">{hint}</p>}
      {error && <p className="text-[11px] font-semibold text-rose-600 mt-0.5">{error}</p>}
    </div>
  );
}
