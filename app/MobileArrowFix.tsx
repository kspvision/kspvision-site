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

    const parseRGB = (value: string) => {
      const match = value.match(
        /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/
      );

      if (!match) return null;

      return [
        Number(match[1]),
        Number(match[2]),
        Number(match[3]),
      ];
    };

    const looksLikeWhiteCircleBadge = (element: Element) => {
      const el = element as HTMLElement;
      const rect = el.getBoundingClientRect();

      if (
        rect.width < 18 ||
        rect.height < 18 ||
        rect.width > 72 ||
        rect.height > 72
      ) {
        return false;
      }

      const ratio = rect.width / rect.height;

      if (ratio < 0.78 || ratio > 1.22) {
        return false;
      }

      const style = getComputedStyle(el);
      const rgb = parseRGB(style.backgroundColor);

      if (!rgb) return false;

      const [r, g, b] = rgb;

      const whiteEnough =
        r >= 225 &&
        g >= 225 &&
        b >= 225;

      if (!whiteEnough) return false;

      const radius =
        parseFloat(style.borderTopLeftRadius) || 0;

      const circularEnough =
        radius >= Math.min(rect.width, rect.height) * 0.35;

      return circularEnough;
    };

    const hideMusicVideoWhiteBadges = () => {
      if (!isMusic) return;

      const root =
        document.querySelector(".mv-page") ||
        document.body;

      const candidates = Array.from(
        root.querySelectorAll(
          "a, a *, button, button *"
        )
      );

      candidates.forEach((element) => {
        if (!looksLikeWhiteCircleBadge(element)) return;

        const el = element as HTMLElement;

        el.style.setProperty(
          "display",
          "none",
          "important"
        );

        el.setAttribute("aria-hidden", "true");
      });
    };

    const removeMobileArrowCharacters = () => {
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
      hideMusicVideoWhiteBadges();
      removeMobileArrowCharacters();
    };

    clean();

    const frame = requestAnimationFrame(clean);

    const timer1 = window.setTimeout(clean, 250);
    const timer2 = window.setTimeout(clean, 1000);

    const observer = new MutationObserver(() => {
      clean();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
    };
  }, []);

  return null;
}
