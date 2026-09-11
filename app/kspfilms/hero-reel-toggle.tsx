"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Localized } from "../site-language";

export default function HeroReelToggle() {
  const [enabled, setEnabled] = useState(true);
  const [showFloating, setShowFloating] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const sync = () => setEnabled(!preference.matches);

    sync();

    preference.addEventListener("change", sync);

    return () => {
      preference.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const page = button.current?.closest<HTMLElement>(".mv-page");

    if (!page) return;

    const mobile = window.matchMedia(
      "(max-width: 800px)"
    ).matches;

    const videos = Array.from(
      page.querySelectorAll<HTMLVideoElement>(
        mobile
          ? ".mv-mobile-background-reel"
          : ".mv-hero-video"
      )
    );

    if (mobile) {
      const video = videos[0];

      if (video && !video.src) {
        video.src = "/music-hero-mobile.mp4";
      }
    }

    page.dataset.reel = enabled ? "on" : "off";

    let active = true;

    if (enabled) {
      for (const video of videos) {
        video.muted = true;

        void video.play().catch(() => {
          if (active) setEnabled(false);
        });
      }
    } else {
      videos.forEach((video) => video.pause());
    }

    return () => {
      active = false;
      videos.forEach((video) => video.pause());
    };
  }, [enabled]);

  useEffect(() => {
    const original = button.current;

    if (!original) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloating(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(original);

    return () => observer.disconnect();
  }, []);

  const toggle = () => setEnabled((value) => !value);

  const content = (
    <>
      <span>
        <Localized
          en="BACKGROUND REEL"
          fr="REEL EN ARRIÈRE-PLAN"
        />
      </span>

      <span className="mv-reel-toggle-state">
        <span aria-hidden="true">
          {enabled ? "●" : "○"}
        </span>

        {enabled ? (
          <Localized en="ON" fr="ACTIVÉ" />
        ) : (
          <Localized en="OFF" fr="DÉSACTIVÉ" />
        )}
      </span>
    </>
  );

  return (
    <>
      {/* ORIGINAL HERO CONTROL — UNCHANGED POSITION */}
      <button
        ref={button}
        type="button"
        className="mv-reel-toggle"
        onClick={toggle}
        aria-pressed={enabled}
        aria-hidden={showFloating}
        tabIndex={showFloating ? -1 : 0}
      >
        {content}
      </button>

      {/* FLOATING COPY — PORTALLED OUTSIDE PAGE STACKING CONTEXT */}
      {portalReady &&
        createPortal(
          <button
            type="button"
            className={`mv-reel-toggle mv-reel-toggle-floating${
              showFloating ? " is-visible" : ""
            }`}
            onClick={toggle}
            aria-pressed={enabled}
            aria-hidden={!showFloating}
            tabIndex={showFloating ? 0 : -1}
          >
            {content}
          </button>,
          document.body
        )}
    </>
  );
}
