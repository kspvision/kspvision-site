"use client";

import { useEffect } from "react";

export default function ReelBandSync() {
  useEffect(() => {
    const reel = document.querySelector<HTMLElement>(
      "#weddingStoriesFinal .weddingReel"
    );

    if (!reel) return;

    const media = reel.querySelector<HTMLElement>(".weddingReelMedia");
    const band = reel.querySelector<HTMLElement>(":scope > div");

    if (!media || !band) return;

    let raf = 0;

    const syncHeight = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const height = band.getBoundingClientRect().height;

        if (height > 0) {
          media.style.setProperty(
            "--reel-bottom-band-h",
            `${height}px`
          );
        }
      });
    };

    syncHeight();

    const observer = new ResizeObserver(syncHeight);
    observer.observe(band);
    observer.observe(media);

    window.addEventListener("resize", syncHeight, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
      media.style.removeProperty("--reel-bottom-band-h");
    };
  }, []);

  return null;
}
