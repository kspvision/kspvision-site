"use client";

import { useEffect } from "react";

const branches = [
  {
    href: "/kspfilms",
    sources: ["/music-hero-mobile.mp4"],
  },
  {
    href: "/weddings",
    sources: ["/wedding-reel-web.mp4"],
  },
  {
    href: "/brand-documentary",
    sources: [
      "/corneille-web.mp4",
      "/kevin-shayne-web.mp4",
      "/fragrance-ad-web.mp4",
      "/amplify-season-1-advance-toronto-web.mp4",
    ],
  },
];

export default function BranchCardRandomizer() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    branches.forEach(({ href, sources }) => {
      const link = document.querySelector<HTMLAnchorElement>(
        `a[href="${href}"]`
      );

      const video = link?.querySelector<HTMLVideoElement>("video");

      if (!video) return;

      const chosen =
        sources[Math.floor(Math.random() * sources.length)];

      if (chosen && !video.currentSrc.endsWith(chosen)) {
        video.src = chosen;
        video.load();
      }

      const setRandomStart = () => {
        if (
          Number.isFinite(video.duration) &&
          video.duration > 8
        ) {
          const max = Math.max(2, video.duration - 5);

          try {
            video.currentTime =
              2 + Math.random() * Math.max(1, max - 2);
          } catch {}
        }

        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        if (reducedMotion) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
      };

      video.addEventListener(
        "loadedmetadata",
        setRandomStart,
        { once: true }
      );

      if (video.readyState >= 1) {
        setRandomStart();
      }
    });
  }, []);

  return null;
}
