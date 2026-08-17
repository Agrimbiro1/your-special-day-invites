import { useState, useEffect } from "react";

// List of all background images, video, and primary section assets to preload
export const BACKGROUND_IMAGES = [
  "/assets/open%20animation.webp",
  "/assets/bg-arch-custom.webp",
  "/assets/bg-courtyard-enhanced.webp",
  "/assets/bg-family-custom.webp",
  "/assets/bg-gallery-custom.webp",
  "/assets/bg-countdown-custom.webp",
  "/assets/bg-blessings-custom.webp",
  "/assets/bg-venue-custom.webp",
  "/assets/bg-thankyou-custom.webp",
  "/assets/rsvp%20background.webp",
  "/assets/haldi.webp",
  "/assets/mehendi.webp",
  "/assets/sangeet.webp",
  "/assets/wedding.webp",
  "/assets/desktop-side-man.webp",
  "/assets/desktop-side-woman.webp",
  "/assets/ganesha-art.webp",
  "/assets/arch-frame-card.webp",
  // Key section media
  "/assets/family/father_bride.webp",
  "/assets/family/mother_bride.webp",
  "/assets/family/gfather.webp",
  "/assets/family/gmother.webp",
  "/assets/family/brother.webp",
  "/assets/family/sister.webp",
  "/assets/gallery/hello.webp",
  "/assets/gallery/roka.webp",
  "/assets/gallery/jaipur.webp",
  "/assets/gallery/together.webp",
  "/assets/gallery/forever.webp",
];

export const BACKGROUND_VIDEOS = [
  "/assets/open%20invitation%20video.mp4",
];

interface PreloadState {
  isLoading: boolean;
  progress: number;
  loadedCount: number;
  totalCount: number;
  statusText: string;
}

export function useAssetPreloader() {
  const [state, setState] = useState<PreloadState>({
    isLoading: true,
    progress: 0,
    loadedCount: 0,
    totalCount: BACKGROUND_IMAGES.length + BACKGROUND_VIDEOS.length,
    statusText: "Initializing Royal Invitation...",
  });

  useEffect(() => {
    let isMounted = true;
    let completedCount = 0;
    const totalAssets = BACKGROUND_IMAGES.length + BACKGROUND_VIDEOS.length;

    const updateProgress = (statusMsg?: string) => {
      if (!isMounted) return;
      completedCount++;
      const currentProgress = Math.min(100, Math.round((completedCount / totalAssets) * 100));

      let msg = statusMsg;
      if (!msg) {
        if (currentProgress < 35) {
          msg = "Loading Royal Background Assets...";
        } else if (currentProgress < 70) {
          msg = "Preparing Sacred Ambiance & Videos...";
        } else if (currentProgress < 100) {
          msg = "Finalizing Wedding Decor & Details...";
        } else {
          msg = "Welcome to Aanya & Rohan's Celebration";
        }
      }

      setState({
        isLoading: completedCount < totalAssets,
        progress: currentProgress,
        loadedCount: completedCount,
        totalCount: totalAssets,
        statusText: msg,
      });
    };

    // Preload Images
    BACKGROUND_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        updateProgress();
      } else {
        img.onload = () => updateProgress();
        img.onerror = () => {
          console.warn(`Failed to preload image asset: ${src}`);
          updateProgress();
        };
      }
    });

    // Preload Videos
    BACKGROUND_VIDEOS.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;

      const handleVideoReady = () => {
        video.removeEventListener("canplaythrough", handleVideoReady);
        video.removeEventListener("error", handleVideoError);
        updateProgress();
      };

      const handleVideoError = () => {
        video.removeEventListener("canplaythrough", handleVideoReady);
        video.removeEventListener("error", handleVideoError);
        console.warn(`Failed to preload video asset: ${src}`);
        updateProgress();
      };

      if (video.readyState >= 3) {
        updateProgress();
      } else {
        video.addEventListener("canplaythrough", handleVideoReady);
        video.addEventListener("error", handleVideoError);
        // Trigger load
        video.load();
      }
    });

    // Safety Timeout: Guarantee the loader finishes in at most 8 seconds
    const timeoutTimer = setTimeout(() => {
      if (isMounted) {
        setState({
          isLoading: false,
          progress: 100,
          loadedCount: totalAssets,
          totalCount: totalAssets,
          statusText: "Welcome to Aanya & Rohan's Celebration",
        });
      }
    }, 8000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutTimer);
    };
  }, []);

  return state;
}
