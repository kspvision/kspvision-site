"use client";

import { useEffect } from "react";

export default function MobileArrowFix() {
  useEffect(() => {
    const path = window.location.pathname;

    const isHome = path === "/";
    const isMusic =
      path === "/music-videos" ||
      path.startsWith("/music-videos/");

    if (!isHome && !isMusic) return;

    const isMobile =
      window.matchMedia("(max-width: 650px)").matches;

    const arrowChars =
      /[\u2190-\u21FF\u27A1\u2B05\u2B06\u2B07]\uFE0F?/g;

    const arrowOnlyChars =
      /^[\s\uFE0F\u2190-\u21FF\u27A1\u2B05\u2B06\u2B07]+$/;

    const isArrowOnly = (element: Element | null) => {
      if (!element) return false;

      const value = (element.textContent || "").trim();

      return (
        value.length > 0 &&
        arrowOnlyChars.test(value)
      );
    };

    const hideMusicBadges = () => {
      if (!isMusic) return;

      const candidates = Array.from(
        document.querySelectorAll(
          "a span, a div, a b, a i, a em, a strong, button span, button div, button b, button i"
        )
      );

      candidates.forEach((element) => {
        if (!isArrowOnly(element)) return;

        const action = element.closest("a, button");

        if (!action) return;
        if (action === element) return;

        let badge: Element = element;

        while (
          badge.parentElement &&
          badge.parentElement !== action &&
          isArrowOnly(badge.parentElement)
        ) {
          badge = badge.parentElement;
        }

        const el = badge as HTMLElement;

        el.style.setProperty(
          "display",
          "none",
          "important"
        );

        el.style.setProperty(
          "visibility",
          "hidden",
          "important"
        );
      });
    };

    const removeMobileArrowText = () => {
      if (!isMobile) return;

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );

      let node: Node | null;

      while ((node = walker.nextNode())) {
        if (!node.nodeValue) continue;

        const cleaned = node.nodeValue
          .replace(arrowChars, "")
          .replace(/\uFE0F/g, "");

        if (cleaned !== node.nodeValue) {
          node.nodeValue = cleaned;
        }
      }
    };

    const clean = () => {
      /*
       * IMPORTANT:
       * Hide the Music Videos badge FIRST.
       * Then remove mobile arrow characters.
       *
       * This prevents empty white circles.
       */
      hideMusicBadges();
      removeMobileArrowText();
    };

    clean();

    const observer = new MutationObserver(() => {
      clean();
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
