"use client";

import { useEffect, useRef } from "react";

/**
 * Ports the old single-IntersectionObserver reveal-on-scroll: elements with
 * class "reveal" inside the returned ref fade/rise in as they enter the
 * viewport, staggered by sibling order. A safety timeout forces `.in` on
 * anything the observer never catches (matches the old 4s failsafe).
 */
export default function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = Array.from(el.parentElement?.children ?? []);
          const index = siblings.indexOf(el);
          el.style.animationDelay = `${Math.min(index * 70, 350)}ms`;
          el.classList.add("in");
          obs.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));

    const failSafe = window.setTimeout(() => {
      items.forEach((item) => item.classList.add("in"));
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failSafe);
    };
  }, []);

  return ref;
}
