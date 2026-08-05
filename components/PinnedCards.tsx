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
    const wrap = wrapRef.current;
    if (!wrap) return;

    const cards = cardRefs.current.slice();

    let ticking = false;
    let lastScaled = 0;
    let snapTimer: number | undefined;
    let snapFallback: number | undefined;
    let isSnapping = false;
    // Layout metrics refreshed inside the rAF'd update() from the rect it
    // already reads, so the snap timeout never forces a synchronous layout.
    let cachedTop = 0;
    let cachedTotal = 1;

    // Last-written value per card: skipping redundant writes keeps the
    // section from forcing a style recalc on every frame it sits at rest.
    const last = Array.from({ length: n }, () => ({
      op: -1,
      dir: NaN,
      z: "",
      pe: "unset",
      active: false,
    }));

    const scrollToCard = (index: number) => {
      isSnapping = true;
      window.clearTimeout(snapFallback);
      // scrollend clears the flag; the timeout is a fallback for browsers
      // without the event (older Safari)
      snapFallback = window.setTimeout(() => {
        isSnapping = false;
      }, 900);
      window.scrollTo({
        top: cachedTop + (index / (n - 1)) * cachedTotal + 1,
        behavior: "smooth",
      });
    };

    // Opacity is a direct function of scroll position, so stopping mid-scroll
    // would leave two cards double-exposed. Once scrolling goes quiet, ease to
    // the nearest whole card. Suppressed while our own smooth scroll is in
    // flight so the snap never re-arms against itself.
    const scheduleSnap = () => {
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(() => {
        const nearest = clamp(Math.round(lastScaled), 0, n - 1);
        const currentOffset = (lastScaled / (n - 1)) * cachedTotal;
        const targetOffset = (nearest / (n - 1)) * cachedTotal;
        if (Math.abs(targetOffset - currentOffset) > 2) scrollToCard(nearest);
      }, 220);
    };

    const update = (withSnap: boolean) => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      cachedTotal = total;
      cachedTop = window.scrollY + rect.top;

      const raw = clamp(-rect.top / total, 0, 1);
      const scaled = raw * (n - 1);
      lastScaled = scaled;
      const seg = clamp(Math.floor(scaled), 0, n - 2);
      const local = clamp(scaled - seg, 0, 1);

      const t0 = 0.15;
      const t1 = 0.85;
      let eased: number;
      if (local <= t0) eased = 0;
      else if (local >= t1) eased = 1;
      else {
        const u = (local - t0) / (t1 - t0);
        eased = u * u * (3 - 2 * u);
      }

      cards.forEach((el, i) => {
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
        const c = last[i];
        const opR = Math.round(op * 1000) / 1000;
        if (c.op !== opR) {
          el.style.opacity = String(opR);
          c.op = opR;
        }
        const dirR = Math.round(dir * 1000) / 1000;
        if (c.dir !== dirR) {
          el.style.transform = `translateY(${dirR * 28}px)`;
          c.dir = dirR;
        }
        const z = opR > 0.001 ? "2" : "1";
        if (c.z !== z) {
          el.style.zIndex = z;
          c.z = z;
        }
        // A card is clickable only once it has essentially settled — during a
        // crossfade neither card responds, so a click can't hit the outgoing
        // card and navigate to the wrong service. "" defers to the CSS
        // .is-active rule.
        const pe = opR > 0.9 ? "" : "none";
        if (c.pe !== pe) {
          el.style.pointerEvents = pe;
          c.pe = pe;
        }
        const active = opR > 0.5;
        if (c.active !== active) {
          el.classList.toggle("is-active", active);
          c.active = active;
        }
      });

      const activeIndex = eased < 0.5 ? seg : seg + 1;
      dotRefs.current.forEach((d, i) => {
        if (!d) return;
        const sel = i === activeIndex;
        if (d.classList.contains("is-active") !== sel) {
          d.classList.toggle("is-active", sel);
          d.setAttribute("aria-selected", String(sel));
        }
      });

      if (withSnap && !isSnapping) scheduleSnap();
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => update(true));
      }
    };
    // A resize (including a mobile URL bar collapse) must re-render the
    // section but never trigger a snap-scroll of the page.
    const onResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => update(false));
      }
    };
    const onScrollEnd = () => {
      isSnapping = false;
      window.clearTimeout(snapFallback);
    };

    // Promote the cards to compositor layers only while the section is close
    // enough to matter, instead of holding four layers for the page lifetime.
    const near = new IntersectionObserver(
      ([entry]) => wrap.classList.toggle("is-near", entry.isIntersecting),
      { rootMargin: "100% 0px" }
    );
    near.observe(wrap);

    update(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scrollend", onScrollEnd);
      window.clearTimeout(snapTimer);
      window.clearTimeout(snapFallback);
      near.disconnect();
      wrap.classList.remove("is-near");
      // Crossing into static mode (resize past 900px / reduced-motion flip)
      // must not leave cards stuck at a JS-written opacity/transform.
      cards.forEach((el) => {
        if (!el) return;
        el.style.opacity = "";
        el.style.transform = "";
        el.style.zIndex = "";
        el.style.pointerEvents = "";
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
