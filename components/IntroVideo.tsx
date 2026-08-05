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
 * The mobile/desktop variant is picked in JS via matchMedia rather than
 * relying on native <source media> matching: Safari's support for the
 * `media` attribute on <video><source> is unreliable in practice (it can
 * fall through to the desktop variant on real iOS devices), which is what
 * shipped the desktop video — with its baked-in service labels sized for a
 * landscape frame — onto phones. Before JS decides, the SSR/no-JS markup
 * still lists all four <source> tags as a best-effort fallback.
 */
export default function IntroVideo() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [variant, setVariant] = useState<"mobile" | "desktop" | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setVariant(mq.matches ? "mobile" : "desktop");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section className="hero" aria-label="RBiX Technologies">
      {reducedMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hero__media" src="/media/intro/poster.jpg" alt="" aria-hidden="true" />
      ) : (
        <video
          key={variant ?? "default"}
          className="hero__media"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/intro/poster.jpg"
        >
          {variant === "mobile" && (
            <>
              <source src="/media/intro/rbix-intro-mobile.webm" type="video/webm" />
              <source src="/media/intro/rbix-intro-mobile.mp4" type="video/mp4" />
            </>
          )}
          {variant === "desktop" && (
            <>
              <source src="/media/intro/rbix-intro.webm" type="video/webm" />
              <source src="/media/intro/rbix-intro.mp4" type="video/mp4" />
            </>
          )}
          {variant === null && (
            <>
              <source src="/media/intro/rbix-intro-mobile.webm" type="video/webm" media="(max-width: 768px)" />
              <source src="/media/intro/rbix-intro-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
              <source src="/media/intro/rbix-intro.webm" type="video/webm" />
              <source src="/media/intro/rbix-intro.mp4" type="video/mp4" />
            </>
          )}
        </video>
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
