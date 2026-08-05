/* ═══════════════════════════════════════════════════════════
   RBiX Technologies — shared behavior for every page EXCEPT the
   home page (home keeps its own script.js, which drives the
   pinned canvas sequence + checkpoint-paged scroll). This file
   gives every other page the same nav, menu, reveal animations,
   and a plain continuous Lenis-style smooth scroll.
   ═══════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const nav = document.getElementById("nav");
  if (!nav) return;

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── nav: glass deepens past the top ─────────────────────── */

  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:80px;pointer-events:none;";
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) =>
    nav.classList.toggle("scrolled", !e.isIntersecting)
  ).observe(sentinel);

  /* ── nav dropdowns: click-toggle fallback for touch/no-hover ── */

  document.querySelectorAll(".nav__item").forEach(item => {
    const btn = item.querySelector(":scope > button");
    if (!btn) return;
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const willOpen = !item.classList.contains("open");
      document.querySelectorAll(".nav__item.open").forEach(o => {
        o.classList.remove("open");
        o.querySelector(":scope > button")?.setAttribute("aria-expanded", "false");
      });
      if (willOpen) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    });
  });
  document.addEventListener("click", () =>
    document.querySelectorAll(".nav__item.open").forEach(o => o.classList.remove("open")));

  /* ── mark the current page's nav link (and its dropdown item) active ── */

  const herePath = location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll('.nav__links a[href^="/"], .nav__overlay a[href^="/"]').forEach(a => {
    const linkPath = a.pathname.replace(/\/index\.html$/, "/");
    if (linkPath === herePath && linkPath !== "/") {
      a.classList.add("active");
      const dropParent = a.closest(".nav__item");
      if (dropParent) dropParent.querySelector(":scope > button")?.classList.add("active");
    }
  });

  /* ── scroll-spy: mark the current section in the nav, if any match ── */

  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const a = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
    if (!a) return;
    document.querySelectorAll(".nav__links a").forEach(x => {
      x.classList.remove("active");
      x.removeAttribute("aria-current");
    });
    a.classList.add("active");
    a.setAttribute("aria-current", "true");
  }), { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));

  /* ── mobile menu ─────────────────────────────────────────── */

  const burger  = document.getElementById("navBurger");
  const overlay = document.getElementById("navOverlay");
  if (burger && overlay) {
    const setMenu = open => {
      burger.classList.toggle("open", open);
      overlay.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      // page must not keep scrolling under the opaque overlay
      document.documentElement.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () =>
      setMenu(!overlay.classList.contains("open")));
    overlay.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => setMenu(false)));
    overlay.addEventListener("click", e => {
      if (e.target === overlay) setMenu(false);
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && overlay.classList.contains("open")) setMenu(false);
    });
  }

  /* ── reveal-on-scroll with sibling stagger ───────────────── */

  const io = new IntersectionObserver(entries => {
    const inview = entries.filter(e => e.isIntersecting);
    inview.forEach((e, i) => {
      e.target.style.animationDelay = Math.min(i * 70, 350) + "ms";
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  // safety net: force everything visible if IO somehow never fires
  // (e.g. a tab restored fully hidden) so content is never stuck invisible
  setTimeout(() => document.querySelectorAll(".reveal:not(.in)")
    .forEach(el => el.classList.add("in")), 4000);

  if (reduceMotion) return;   // skip the smooth-scroll engine entirely

  /* ── Lenis-style smooth scroll — continuous, no checkpoints ── */

  const SMOOTH_RATE = 8;
  let targetY = window.scrollY, smoothY = window.scrollY, expectedY = -1;

  const maxScroll = () =>
    document.documentElement.scrollHeight - innerHeight;

  window.addEventListener("wheel", e => {
    if (e.ctrlKey || e.deltaY === 0) return;
    e.preventDefault();
    const mult = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1;
    targetY = Math.min(maxScroll(), Math.max(0, targetY + e.deltaY * mult));
  }, { passive: false });

  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener("click", () => setTimeout(() => {
      targetY = smoothY = window.scrollY;
    }, 0)));

  let lastTick = 0;
  function tick(now) {
    const dt = Math.min((now - (lastTick || now)) / 1000, 0.1);
    lastTick = now;

    const actualY = window.scrollY;
    if (Math.abs(actualY - expectedY) > 1) {
      targetY = smoothY = actualY;
      expectedY = actualY;
    } else {
      smoothY += (targetY - smoothY) * (1 - Math.exp(-SMOOTH_RATE * dt));
      if (Math.abs(targetY - smoothY) > 0.5 && Math.abs(smoothY - actualY) > 0.5) {
        window.scrollTo(0, smoothY);
        expectedY = window.scrollY;
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
