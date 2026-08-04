"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SESSION_KEY = "rbix-intro-seen";
const SAFETY_TIMEOUT_MS = 6000;

/**
 * Plays the assembly animation once per session inside the hero viewport
 * only. Everything below the hero (the services grid, etc.) is normal
 * document flow, already rendered and scrollable regardless of video state
 * — nothing is gated behind `ended`. No scroll-jacking: hero text/CTA
 * render immediately in markup, the video is a client-only overlay on top.
 */
export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";

    if (reducedMotion || alreadySeen) {
      setShowVideo(false);
      setRevealed(true);
      return;
    }

    setShowVideo(true);
    setRevealed(false);
  }, []);

  useEffect(() => {
    if (!showVideo) return;

    const safety = window.setTimeout(() => {
      reveal();
    }, SAFETY_TIMEOUT_MS);

    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showVideo]);

  function reveal() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setRevealed(true);
  }

  return (
    <section className="hero" aria-label="RBiX Technologies introduction">
      {showVideo && !revealed && (
        <video
          ref={videoRef}
          className="hero__media"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/media/intro/poster.jpg"
          onEnded={reveal}
        >
          <source src="/media/intro/rbix-intro-mobile.webm" type="video/webm" media="(max-width: 768px)" />
          <source src="/media/intro/rbix-intro-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/media/intro/rbix-intro.webm" type="video/webm" />
          <source src="/media/intro/rbix-intro.mp4" type="video/mp4" />
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
