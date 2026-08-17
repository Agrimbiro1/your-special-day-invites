import React from "react";

/**
 * Converts image paths ending in .jpg, .jpeg, or .png to .webp while preserving query strings/hashes.
 */
export function getWebpPath(src: string): string {
  if (!src) return src;
  return src.replace(/\.(jpg|jpeg|png)($|\?|#)/i, ".webp$1").replace(/\.(jpg|jpeg|png)\./i, ".webp.");
}

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  pictureClassName?: string;
}

/**
 * Renders a native HTML <picture> element serving WebP images primarily, with automatic fallback
 * to JPG/PNG for legacy browsers.
 */
export function ResponsiveImage({
  src,
  alt,
  className = "",
  pictureClassName = "contents",
  ...props
}: ResponsiveImageProps) {
  if (!src) return null;

  const isDirectFormat =
    src.endsWith(".webp") ||
    src.endsWith(".svg") ||
    src.endsWith(".mp4") ||
    src.endsWith(".webm") ||
    src.startsWith("data:");

  if (isDirectFormat) {
    return <img src={src} alt={alt} className={className} {...props} />;
  }

  const webpSrc = getWebpPath(src);

  return (
    <picture className={pictureClassName}>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} className={className} {...props} />
    </picture>
  );
}
