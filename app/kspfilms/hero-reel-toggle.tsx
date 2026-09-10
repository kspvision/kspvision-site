"use client";

import { useEffect, useRef, useState } from "react";
import { Localized } from "../site-language";

export default function HeroReelToggle() {
  const [enabled, setEnabled] = useState(true);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const page = button.current?.closest<HTMLElement>(".mv-page");
    if (!page) return;
    const mobile = window.matchMedia("(max-width: 800px)").matches;
    const videos = Array.from(page.querySelectorAll<HTMLVideoElement>(mobile ? ".mv-mobile-background-reel" : ".mv-hero-video"));
    if (mobile) {
      const video = videos[0];
      if (video && !video.src) video.src = "/music-hero-mobile.mp4";
    }
    page.dataset.reel = enabled ? "on" : "off";
    let active = true;
    if (enabled) {
      for (const video of videos) {
        video.muted = true;
        void video.play().catch(() => { if (active) setEnabled(false); });
      }
    } else {
      videos.forEach(video => video.pause());
    }
    return () => { active = false; videos.forEach(video => video.pause()); };
  }, [enabled]);

  return <button ref={button} type="button" className="mv-reel-toggle"
    onClick={() => setEnabled(value => !value)} aria-pressed={enabled}>
    <span><Localized en="BACKGROUND REEL" fr="REEL EN ARRIÈRE-PLAN" /></span>
    <span className="mv-reel-toggle-state"><span aria-hidden="true">{enabled ? "●" : "○"}</span>{enabled ? <Localized en="ON" fr="ACTIVÉ" /> : <Localized en="OFF" fr="DÉSACTIVÉ" />}</span>
  </button>;
}
