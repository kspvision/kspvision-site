"use client";

import { useEffect } from "react";

export default function MobileArrowFix() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 650px)").matches) return;

    const normalize = (value: string) =>
      value
        .replace(/\u2197\uFE0F/g, "\u2197")
        .replace(/\u2196\uFE0F/g, "\u2196")
        .replace(/\u2198\uFE0F/g, "\u2198")
        .replace(/\u2199\uFE0F/g, "\u2199")
        .replace(/\u27A1\uFE0F/g, "\u2192")
        .replace(/\u2B05\uFE0F/g, "\u2190")
        .replace(/\u2B06\uFE0F/g, "\u2191")
        .replace(/\u2B07\uFE0F/g, "\u2193")
        .replace(/\u2192\uFE0F/g, "\u2192")
        .replace(/\u2190\uFE0F/g, "\u2190")
        .replace(/\u2191\uFE0F/g, "\u2191")
        .replace(/\u2193\uFE0F/g, "\u2193");

    const clean = (root: Node) => {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT
      );

      let node: Node | null;

      while ((node = walker.nextNode())) {
        if (!node.nodeValue) continue;

        const cleaned = normalize(node.nodeValue);

        if (cleaned !== node.nodeValue) {
          node.nodeValue = cleaned;
        }
      }
    };

    clean(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "characterData" &&
          mutation.target.nodeValue
        ) {
          mutation.target.nodeValue = normalize(
            mutation.target.nodeValue
          );
        }

        mutation.addedNodes.forEach((node) => clean(node));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
