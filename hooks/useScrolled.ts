"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors the old sentinel-based IntersectionObserver: an 80px-tall
 * offscreen marker is watched instead of listening to `scroll` directly,
 * so the nav's "glass deepens" state costs zero scroll-event overhead.
 */
export default function useScrolled(thresholdPx = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.left = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = `${thresholdPx}px`;
    sentinel.style.pointerEvents = "none";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, [thresholdPx]);

  return scrolled;
}
