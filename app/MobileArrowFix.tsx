"use client";

import { useEffect } from "react";

export default function MobileArrowFix() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 650px)").matches) return;

    const path = window.location.pathname;

    const targetPage =
      path === "/" ||
      path === "/music-videos" ||
      path.startsWith("/music-videos/");

    if (!targetPage) return;

    const ARROWS =
      /[\u2190-\u21FF\u27A1\u2B05\u2B06\u2B07]\uFE0F?/g;

    const ARROW_ONLY =
      /^[\s\uFE0F\u2190-\u21FF\u27A1\u2B05\u2B06\u2B07]+$/;

    const isArrowOnly = (el: Element | null) => {
      if (!el) return false;

      const text = (el.textContent || "").trim();

      return text.length > 0 && ARROW_ONLY.test(text);
    };

    const clean = (root: Node) => {
      /*
       * First remove complete arrow-only icon wrappers.
       * This catches the white Music Videos circles instead
       * of leaving an empty white button behind.
       */
      const scope =
        root instanceof Element || root instanceof Document
          ? root
          : root.parentElement;

      if (scope && "querySelectorAll" in scope) {
        const candidates = Array.from(
          scope.querySelectorAll(
            "span, div, i, b, em, strong, small"
          )
        ).filter((el) => isArrowOnly(el));

        candidates.forEach((el) => {
          /*
           * Hide the OUTERMOST arrow-only wrapper.
           * Example:
           *
           * <span class=circle>
           *   <span>↗️</span>
           * </span>
           *
           * We hide the circle itself.
           */
          if (!isArrowOnly(el.parentElement)) {
            (el as HTMLElement).style.setProperty(
              "display",
              "none",
              "important"
            );
          }
        });
      }

      /*
       * Then remove arrow characters that are directly
       * attached to text such as:
       *
       * BOOK A PROJECT ↗
       * EXPLORE THE WORK ↓
       * SCROLL →
       */
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT
      );

      let node: Node | null;

      while ((node = walker.nextNode())) {
        if (!node.nodeValue) continue;

        const next = node.nodeValue
          .replace(ARROWS, "")
          .replace(/\uFE0F/g, "");

        if (next !== node.nodeValue) {
          node.nodeValue = next;
        }
      }
    };

    clean(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          clean(node);
        });

        if (
          mutation.type === "characterData" &&
          mutation.target.parentNode
        ) {
          clean(mutation.target.parentNode);
        }
      });
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
