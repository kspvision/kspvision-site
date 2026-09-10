"use client";

import { useEffect, useRef } from "react";

const reelSource = "https://github.com/kspvision/kspvision-site/releases/download/hero-reel-2026-08-15/Wedding.Reel.mp4";

function randomMoment(duration: number) {
  const safeStart = Math.min(6, duration / 4);
  const safeEnd = Math.max(safeStart + 1, duration - 8);
  return safeStart + Math.random() * (safeEnd - safeStart);
}

export function WeddingReel() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let timer: number | undefined;

    const scheduleJump = () => {
      timer = window.setTimeout(() => {
        if (video.duration && !video.paused) video.currentTime = randomMoment(video.duration);
        scheduleJump();
      }, 50000 + Math.random() * 30000);
    };

    const begin = () => {
      if (video.duration) video.currentTime = randomMoment(video.duration);
      scheduleJump();
    };

    if (video.readyState >= 1 && video.duration) {
      begin();
    } else {
      video.addEventListener("loadedmetadata", begin, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", begin);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster="/weddings/wedding-garden-portrait.jpg"><source src={reelSource} type="video/mp4" /></video>;
}

export function WeddingStoriesAmbient() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const chooseIndependentStart = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      // Start independently somewhere between 15% and 85% of the reel.
      // This happens ONCE per page load. No random jumping afterward.
      video.currentTime = video.duration * (0.15 + Math.random() * 0.70);

      video.play().catch(() => {});
    };

    if (video.readyState >= 1 && video.duration) {
      chooseIndependentStart();
    } else {
      video.addEventListener("loadedmetadata", chooseIndependentStart, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("loadedmetadata", chooseIndependentStart);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="weddingStoriesBackgroundVideo"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/wedding-reel-web.mp4" type="video/mp4" />
    </video>
  );
}
