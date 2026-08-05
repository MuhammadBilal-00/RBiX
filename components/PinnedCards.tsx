"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import useReveal from "@/hooks/useReveal";

interface PinnedCardsProps {
  titles: string[];
  children: ReactNode[];
  heading: ReactNode;
}

const SEGMENT_VH = 62;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Desktop: pins the section in the viewport for a fixed scroll distance and
 * crossfades between cards as the user scrolls, instead of stacking every
 * card down the page. On ≤900px viewports, under prefers-reduced-motion, or
 * without JS, the section is a normal static card stack instead (see the
 * .pin-cards media blocks in components.css) — the pin effect never runs
 * there, and on phones the cards get the standard reveal-on-scroll entrance.
 */
export default function PinnedCards({ titles, children, heading }: PinnedCardsProps) {
  const n = children.length;
  const wrapRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isStatic, setIsStatic] = useState(false);
  const revealRef = useReveal<HTMLDivElement>(isStatic);

  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 900px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    const apply = () => setIsStatic(queries.some((q) => q.matches));
    apply();
    queries.forEach((q) => q.addEventListener("change", apply));
    return () => queries.forEach((q) => q.removeEventListener("change", apply));
  }, []);

  useEffect(() => {
    if (isStatic) return;

    let ticking = false;
    let lastScaled = 0;
    let snapTimer: number | undefined;

    const scrollToOffset = (offset: number) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh;
      const target = wrap.offsetTop + (offset / (n - 1)) * total;
      window.scrollTo({ top: target + 1, behavior: "smooth" });
    };

    const update = () => {
      ticking = false;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;

      const raw = clamp(-rect.top / total, 0, 1);
      const scaled = raw * (n - 1);
      lastScaled = scaled;
      const seg = clamp(Math.floor(scaled), 0, n - 2);
      const local = clamp(scaled - seg, 0, 1);

      const t0 = 0.25;
      const t1 = 0.75;
      let eased: number;
      if (local <= t0) eased = 0;
      else if (local >= t1) eased = 1;
      else {
        const u = (local - t0) / (t1 - t0);
        eased = u * u * (3 - 2 * u);
      }

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        let op = 0;
        let dir = 0;
        if (i === seg) {
          op = 1 - eased;
          dir = -eased;
        } else if (i === seg + 1) {
          op = eased;
          dir = 1 - eased;
        } else if (i < seg) {
          dir = -1;
        } else {
          dir = 1;
        }
        el.style.opacity = String(op);
        el.style.transform = `translateY(${dir * 28}px)`;
        el.style.zIndex = op > 0.001 ? "2" : "1";
        el.classList.toggle("is-active", op > 0.5);
      });

      const activeIndex = eased < 0.5 ? seg : seg + 1;
      dotRefs.current.forEach((d, i) => d?.classList.toggle("is-active", i === activeIndex));
    };

    // Opacity is a direct function of scroll position, so stopping mid-scroll
    // leaves two cards visibly overlapping (double-exposed text). Once scroll
    // events go quiet for a beat, ease to the nearest whole card so the view
    // always settles on a single readable card instead of a blend.
    const scheduleSnap = () => {
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(() => {
        const nearest = clamp(Math.round(lastScaled), 0, n - 1);
        const wrap = wrapRef.current;
        if (!wrap) return;
        const vh = window.innerHeight;
        const total = wrap.offsetHeight - vh;
        if (total <= 0) return;
        const currentOffset = (lastScaled / (n - 1)) * total;
        const targetOffset = (nearest / (n - 1)) * total;
        if (Math.abs(targetOffset - currentOffset) > 2) {
          scrollToOffset(nearest);
        }
      }, 140);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
      scheduleSnap();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(snapTimer);
      // Crossing into static mode (resize past 900px / reduced-motion flip)
      // must not leave cards stuck at a JS-written opacity/transform.
      cardRefs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = "";
        el.style.transform = "";
        el.style.zIndex = "";
      });
    };
  }, [n, isStatic]);

  const scrollToIndex = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const vh = window.innerHeight;
    const total = wrap.offsetHeight - vh;
    const target = wrap.offsetTop + (i / (n - 1)) * total;
    window.scrollTo({ top: target + 1, behavior: "smooth" });
  };

  return (
    <section
      className="pin-cards"
      id="services"
      ref={wrapRef}
      style={{ height: `calc(100vh + ${(n - 1) * SEGMENT_VH}vh)` }}
    >
      <div className="pin-cards__sticky">
        <div className="wrap pin-cards__grid">
          <div className="pin-cards__head">
            {heading}
            <div className="pin-cards__rail" role="tablist" aria-label="Capabilities">
              {titles.map((t, i) => (
                <button
                  key={t}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={i === 0}
                  className={`pin-cards__dot${i === 0 ? " is-active" : ""}`}
                  onClick={() => scrollToIndex(i)}
                >
                  <span className="pin-cards__dot-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pin-cards__dot-label">{t}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pin-cards__stage" ref={revealRef}>
            {children.map((child, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`pin-card${i === 0 ? " is-active" : ""}${isStatic ? " reveal" : ""}`}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
