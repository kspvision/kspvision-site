"use client";

import { useState } from "react";

export default function HeroReelToggle() {
  const [enabled, setEnabled] = useState(true);

  function toggleReel() {
    const next = !enabled;

    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>(
        "video.mv-hero-video, video.mv-mobile-background-reel, .mv-hero-video video, .mv-mobile-background-reel video"
      )
    );

    if (next) {
      videos.forEach((video) => {
        video.muted = true;
        const playback = video.play();
        if (playback) playback.catch(() => {});
      });
    } else {
      videos.forEach((video) => video.pause());
    }

    setEnabled(next);
  }

  return (
    <button
      type="button"
      className="mv-reel-toggle"
      onClick={toggleReel}
      aria-pressed={enabled}
      aria-label={enabled ? "Pause background reel" : "Play background reel"}
    >
      <span>BACKGROUND REEL</span>
      <span className="mv-reel-toggle-state">
        <i aria-hidden="true" />
        {enabled ? "ON" : "OFF"}
      </span>
    </button>
  );
}
