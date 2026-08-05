"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Persistent ambient hero background: the video file itself is a seamless
 * forward+reverse ping-pong loop (baked in at encode time — browsers can't
 * natively play video backward, so reversing via JS/playbackRate would be
 * janky; native `loop` on a pre-built ping-pong file is smooth by
 * construction). It just keeps playing behind the hero text for as long as
 * the visitor is on the page.
 *
 * Load strategy: the SSR markup is the poster image only, so the hero paints
 * immediately with zero video bytes on the critical path (and no-JS visitors
 * simply keep the poster). After mount, matchMedia picks the mobile or
 * desktop mp4 and a single <video> fades in over the poster. The variant is
 * picked in JS rather than via <video><source media> because Safari's
 * support for that attribute is unreliable — it shipped the desktop video
 * (with baked-in landscape labels) onto real phones. mp4 only: the h264
 * files are ~2.6× smaller than their vp9 twins and universally supported.
 */
export default function IntroVideo() {
  const [variant, setVariant] = useState<"mobile" | "desktop" | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setVariant(mq.matches ? "mobile" : "desktop");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section className="hero" aria-label="RBiX Technologies">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero__media" src="/media/intro/poster.jpg" alt="" aria-hidden="true" />
      {variant !== null && (
        <video
          className="hero__media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/intro/poster.jpg"
          src={variant === "mobile" ? "/media/intro/rbix-intro-mobile.mp4" : "/media/intro/rbix-intro.mp4"}
        />
      )}
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__content reveal in">
        <h1>A thousand<br />moving pieces.</h1>
        <p className="hero__sub">
          Every business runs on them: leads, appointments, invoices, staff.
          RBiX builds the systems that make them move together.
        </p>
        <div className="hero__actions">
          <Link className="btn btn--red" href="/contact/">
            Get in Touch
            <span className="btn__ic" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="11" height="11">
                <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </Link>
          <a className="btn btn--line" href="#services">Explore the stack</a>
        </div>
      </div>
    </section>
  );
}
