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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenIndex(null);
  }, [pathname]);

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
          <div className={`nav__item${openIndex === 0 ? " open" : ""}`}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openIndex === 0}
              onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
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

          <div className={`nav__item${openIndex === 1 ? " open" : ""}`}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openIndex === 1}
              onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
            >
              Industries
              <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <div className="nav__drop nav__drop--wide">
              {industriesNav.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
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

      <div className={`nav__overlay${mobileOpen ? " open" : ""}`} id="navOverlay">
        <nav aria-label="Mobile">
          {servicesNav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <Link className="nav__overlay-cta" href="/contact/">Get in Touch</Link>
        </nav>
      </div>
    </>
  );
}
