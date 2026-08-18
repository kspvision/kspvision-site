"use client";

import { useEffect } from "react";

export default function MobileArrowFix() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 650px)").matches) return;

    const path = window.location.pathname;

    if (
      path !== "/" &&
      path !== "/music-videos" &&
      !path.startsWith("/music-videos/")
    ) {
      return;
    }

    const arrowPattern =
      /[\u2190-\u21FF\u27A1\u2B05\u2B06\u2B07]\uFE0F?/g;

    const arrowOnlyPattern =
      /^[\s\uFE0F\u2190-\u21FF\u27A1\u2B05\u2B06\u2B07]+$/;

    const arrowOnly = (value: string) => {
      const text = value.trim();
      return text.length > 0 && arrowOnlyPattern.test(text);
    };

    const style = document.createElement("style");

    style.textContent = `
      @media (max-width:650px) {
        .ksp-mobile-remove-arrow-pseudo::before,
        .ksp-mobile-remove-arrow-pseudo::after {
          content: none !important;
          display: none !important;
        }

        .ksp-mobile-remove-arrow-badge {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    const cleanText = (root: Node) => {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT
      );

      let node: Node | null;

      while ((node = walker.nextNode())) {
        const value = node.nodeValue;

        if (!value) continue;

        const cleaned = value
          .replace(arrowPattern, "")
          .replace(/\uFE0F/g, "");

        if (cleaned !== value) {
          node.nodeValue = cleaned;
        }
      }
    };

    const cleanBadges = () => {
      const elements = Array.from(
        document.querySelectorAll(
          "a span, a b, a i, a em, a strong, a small, a div, button span, button b, button i, button div"
        )
      );

      elements.forEach((element) => {
        if (!arrowOnly(element.textContent || "")) return;

        const action = element.closest("a,button");

        if (!action || element === action) return;

        let badge: Element = element;

        while (
          badge.parentElement &&
          badge.parentElement !== action &&
          arrowOnly(badge.parentElement.textContent || "")
        ) {
          badge = badge.parentElement;
        }

        badge.classList.add("ksp-mobile-remove-arrow-badge");
      });
    };

    const cleanPseudoArrows = () => {
      const elements = Array.from(
        document.querySelectorAll("a, button, a span, button span")
      );

      elements.forEach((element) => {
        const before = getComputedStyle(element, "::before").content || "";
        const after = getComputedStyle(element, "::after").content || "";

        if (
          arrowOnly(before.replace(/^["']|["']$/g, "")) ||
          arrowOnly(after.replace(/^["']|["']$/g, ""))
        ) {
          element.classList.add("ksp-mobile-remove-arrow-pseudo");
        }
      });
    };

    const cleanEverything = () => {
      cleanText(document.body);
      cleanBadges();
      cleanPseudoArrows();
    };

    cleanEverything();

    const observer = new MutationObserver(() => {
      cleanEverything();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => {
      observer.disconnect();
      style.remove();
    };
  }, []);

  return null;
}
