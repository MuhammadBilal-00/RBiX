"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";
import useScrolled from "@/hooks/useScrolled";
import { servicesNav, industriesNav, primaryNav } from "@/data/nav";

export default function Header() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // The dropdown sits 14px below its trigger (see .nav__drop's `top` offset)
  // so a straight-line mouse move from button to menu briefly crosses dead
  // space outside .nav__item's hoverable box, firing onMouseLeave early and
  // closing the menu before the pointer arrives. A short grace period (that
  // hover re-entering the item cancels) absorbs that gap.
  const openMenu = (i: number) => {
    clearTimeout(closeTimer.current);
    setOpenIndex(i);
  };
  const scheduleClose = (i: number) => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenIndex((cur) => (cur === i ? null : cur));
    }, 200);
  };

  useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        clearTimeout(closeTimer.current);
        setOpenIndex(null);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        clearTimeout(closeTimer.current);
        setOpenIndex(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenIndex(null);
  }, [pathname]);

  // The overlay is fixed and opaque; without this the page keeps scrolling
  // underneath it on touch.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const clean = href.split("#")[0];
    return clean !== "/" && pathname.startsWith(clean);
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className={`nav${scrolled ? " scrolled" : ""}`} ref={navRef}>
        <Link className="nav__brand" href="/" aria-label="RBiX Technologies">
          <BrandMark size={24} />
          <span className="nav__wordmark">RB<span className="dotless">ı</span>X</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <div
            className={`nav__item${openIndex === 0 ? " open" : ""}`}
            onMouseEnter={() => openMenu(0)}
            onMouseLeave={() => scheduleClose(0)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setOpenIndex((i) => (i === 0 ? null : i));
              }
            }}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openIndex === 0}
              onClick={() => (openIndex === 0 ? setOpenIndex(null) : openMenu(0))}
            >
              Services
              <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <div className="nav__drop">
              {servicesNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                  {item.blurb && <small>{item.blurb}</small>}
                </Link>
              ))}
            </div>
          </div>

          {primaryNav.slice(0, 1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`nav__item${openIndex === 1 ? " open" : ""}`}
            onMouseEnter={() => openMenu(1)}
            onMouseLeave={() => scheduleClose(1)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setOpenIndex((i) => (i === 1 ? null : i));
              }
            }}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openIndex === 1}
              onClick={() => (openIndex === 1 ? setOpenIndex(null) : openMenu(1))}
            >
              Industries
              <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <div className="nav__drop nav__drop--wide">
              {industriesNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                  {item.blurb && <small>{item.blurb}</small>}
                </Link>
              ))}
            </div>
          </div>

          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="nav__cta" href="/contact/">
          Get in Touch
          <span className="btn__ic" aria-hidden="true">
            <svg viewBox="0 0 12 12" width="11" height="11">
              <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        </Link>

        <button
          className={`nav__burger${mobileOpen ? " open" : ""}`}
          aria-expanded={mobileOpen}
          aria-controls="navOverlay"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
        </button>
      </header>

      <div
        className={`nav__overlay${mobileOpen ? " open" : ""}`}
        id="navOverlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
      >
        <nav aria-label="Mobile">
          {[...servicesNav, ...primaryNav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              style={{ "--i": i } as React.CSSProperties}
            >
              {item.label}
            </Link>
          ))}
          <div className="nav__overlay-group" style={{ "--i": 8 } as React.CSSProperties}>
            <p className="nav__overlay-label">Industries</p>
            <div className="nav__overlay-industries">
              {industriesNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive(item.href) ? "active" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            className="nav__overlay-cta"
            href="/contact/"
            style={{ "--i": 9 } as React.CSSProperties}
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </>
  );
}
