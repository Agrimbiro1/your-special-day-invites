import { useState, useEffect, useMemo, useCallback } from "react";
import defaultSettingsJson from "../config/rsvpSettings.json";
import type { RsvpSettings, RsvpStatus, RsvpAnswers, RsvpType, RsvpUrlParams } from "../types/rsvp";

export function useRsvpState() {
  const [urlParams, setUrlParams] = useState<RsvpUrlParams>({});

  // Parse URL search parameters safely on client-side
  const readUrlParams = useCallback((): RsvpUrlParams => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const rsvp = params.get("rsvp") || undefined;
    const edit = params.get("edit") || undefined;
    const screen = params.get("screen") || undefined;
    return { rsvp, edit, screen };
  }, []);

  useEffect(() => {
    setUrlParams(readUrlParams());
    const handlePopState = () => setUrlParams(readUrlParams());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [readUrlParams]);

  // Compute effective settings combining static config & URL overrides
  const effectiveSettings = useMemo<RsvpSettings>(() => {
    const base: RsvpSettings = {
      rsvpType: (defaultSettingsJson.rsvpType as RsvpType) || "detailed",
      allowEditRsvp: defaultSettingsJson.allowEditRsvp ?? true,
      form: defaultSettingsJson.form as RsvpSettings["form"],
    };

    if (urlParams.rsvp === "simple" || urlParams.rsvp === "detailed") {
      base.rsvpType = urlParams.rsvp;
    }

    if (urlParams.edit === "off") {
      base.allowEditRsvp = false;
    } else if (urlParams.edit === "on") {
      base.allowEditRsvp = true;
    }

    return base;
  }, [urlParams]);

  // Determine initial status based on URL ?screen= param or default to 'not_responded'
  const initialStatus = useMemo<RsvpStatus>(() => {
    if (urlParams.screen === "accepted") return "accepted";
    if (urlParams.screen === "submitted") return "submitted";
    return "not_responded";
  }, [urlParams.screen]);

  const [status, setStatus] = useState<RsvpStatus>(initialStatus);
  const [answers, setAnswers] = useState<RsvpAnswers>(() => ({
    guestCount: 2,
    arrivalTime: "18:00",
    mealPreference: "Veg",
  }));
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Sync status if URL screen parameter changes externally
  useEffect(() => {
    if (urlParams.screen === "accepted") {
      setStatus("accepted");
    } else if (urlParams.screen === "submitted") {
      setStatus("submitted");
    }
  }, [urlParams.screen]);

  // Handle guest tapping "Accept Invitation"
  const handleAccept = useCallback(() => {
    setStatus("accepted");
    if (effectiveSettings.rsvpType === "detailed") {
      setIsFormOpen(true);
    }
  }, [effectiveSettings.rsvpType]);

  // Handle form submission
  const handleSubmitForm = useCallback((submittedAnswers: RsvpAnswers) => {
    setAnswers(submittedAnswers);
    setStatus("submitted");
    setIsFormOpen(false);
  }, []);

  const handleOpenForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleResetState = useCallback(() => {
    setStatus("not_responded");
    setIsFormOpen(false);
  }, []);

  const hasUrlOverride = Boolean(urlParams.rsvp || urlParams.edit || urlParams.screen);

  return {
    settings: effectiveSettings,
    status,
    answers,
    isFormOpen,
    hasUrlOverride,
    urlParams,
    handleAccept,
    handleSubmitForm,
    handleOpenForm,
    handleCloseForm,
    handleResetState,
    setStatus,
  };
}
