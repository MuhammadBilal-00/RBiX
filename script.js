/* ═══════════════════════════════════════════════════════════
   RBiX Technologies — scroll-driven image sequence
   300 frames · FRAME2/ezgif-frame-001.png … ezgif-frame-300.png
   ═══════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const FRAME_COUNT = 300;
  const BG = "#c3c3c3";                       // exact frame background
  const CHASE_RATE = 9;                       // frame-chasing rate (1/s); ≈0.14/tick at 60fps
  const GATE = 45;                            // frames needed before the loader lifts
  const framePath = i =>
    `FRAME2/ezgif-frame-${String(i + 1).padStart(3, "0")}.png`;

  const canvas   = document.getElementById("seq");
  const ctx      = canvas.getContext("2d");
  const scrolly  = document.getElementById("scrolly");
  const nav      = document.getElementById("nav");
  const loader   = document.getElementById("loader");
  const loadFill = document.getElementById("loaderFill");
  const loadPct  = document.getElementById("loaderPct");
  const captions = [...document.querySelectorAll(".cap")].map(el => ({
    el,
    start: parseFloat(el.dataset.start),
    end:   parseFloat(el.dataset.end),
    // hero opens on a cinematic navy dim with white type that lifts as you
    // scroll; side captions get a directional scrim on their own edge only,
    // so the frame never pumps globally; the end hint sits on the raw frame
    mode: el.classList.contains("cap--hero")  ? "dark"
        : el.classList.contains("cap--left")  ? "left"
        : el.classList.contains("cap--right") ? "right"
        : "none",
    interactive: !!el.querySelector("a"),
  }));

  const DARK_DIM   = 0.55;                    // hero's cinematic navy dim
  const SCRIM_EDGE = 0.72;                    // side scrim strength at its edge
  const SCRIM_SPAN = 0.62;                    // how far a side scrim reaches

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── preload ─────────────────────────────────────────────── */

  const frames   = new Array(FRAME_COUNT);
  const ready    = new Array(FRAME_COUNT).fill(false);
  const attempts = new Array(FRAME_COUNT).fill(0);
  let loadedCount = 0;                        // settled frames: loaded or given up

  function updateLoaderUI() {
    const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
    loadFill.style.transform = `scaleX(${(loadedCount / FRAME_COUNT).toFixed(3)})`;
    loadPct.textContent = pct + "%";
  }

  // lift the loader once the frame under the user is ready and a working
  // buffer around it exists; the queue keeps filling in the background
  function checkFinish() {
    const t = Math.min(FRAME_COUNT - 1,
      Math.max(0, Math.round(progress * (FRAME_COUNT - 1))));
    if (!loader.classList.contains("done") && ready[t] && loadedCount >= GATE)
      finishLoading();
  }

  function onFrameLoaded(i) {
    ready[i] = true;
    loadedCount++;
    updateLoaderUI();
    checkFinish();
  }

  function finishLoading() {
    loader.classList.add("done");
    document.body.classList.remove("loading");
  }

  // priority loader: always fetch the frame nearest the user's current scroll
  // position next, so a flick deep into the sequence never strands the scrub
  // on a stale frame while a sequential queue catches up
  const started = new Array(FRAME_COUNT).fill(false);
  const MAX_INFLIGHT = 14;
  let inFlight = 0;

  function pickNext() {
    const t = Math.min(FRAME_COUNT - 1,
      Math.max(0, Math.round(progress * (FRAME_COUNT - 1))));
    for (let d = 0; d < FRAME_COUNT; d++) {
      if (t + d < FRAME_COUNT && !started[t + d]) return t + d;
      if (d && t - d >= 0 && !started[t - d]) return t - d;
    }
    return -1;
  }

  function pump() {
    while (inFlight < MAX_INFLIGHT) {
      const i = pickNext();
      if (i === -1) return;
      started[i] = true;
      inFlight++;
      const img = new Image();
      img.onload = () => { inFlight--; onFrameLoaded(i); pump(); };
      img.onerror = () => {
        inFlight--;
        if (++attempts[i] < 3) {
          // transient failure: re-queue with backoff — an instant-fail cascade
          // (offline blip) must not poison the queue with unretried frames
          setTimeout(() => { started[i] = false; pump(); }, 800 * attempts[i]);
        } else {
          loadedCount++;                      // give up on this frame for good
          updateLoaderUI();
          checkFinish();
        }
        pump();
      };
      img.src = framePath(i);
      frames[i] = img;
    }
  }
  // (kicked off in boot, after the scroll state below exists)

  // safety: never trap the user behind the loader
  setTimeout(() => {
    if (!loader.classList.contains("done")) finishLoading();
  }, 5000);

  /* ── canvas sizing (cover-fit, retina-aware) ─────────────── */

  let cw = 0, ch = 0, dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = canvas.clientWidth;
    ch = canvas.clientHeight;
    canvas.width  = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawnIdx = -1;                            // force redraw at new size
  }

  function render(idx, wash) {
    const img = frames[idx];
    if (!img || !ready[idx]) return;

    ctx.fillStyle = BG;                       // matches page — no visible edge
    ctx.fillRect(0, 0, cw, ch);

    // cover fit: fill viewport, crop overflow, keep center
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

    // hero: deep navy dim, white type on top — crisp, never washed out
    if (wash.dark > 0.001) {
      ctx.fillStyle = `rgba(10, 16, 26, ${(wash.dark * DARK_DIM).toFixed(3)})`;
      ctx.fillRect(0, 0, cw, ch);
    }
    // side captions: dark text-protection gradients from the caption's own
    // edge (film-style) — white type on top, frame crisp everywhere else
    if (wash.left > 0.001) {
      const g = ctx.createLinearGradient(0, 0, cw * SCRIM_SPAN, 0);
      g.addColorStop(0, `rgba(10, 16, 26, ${(wash.left * SCRIM_EDGE).toFixed(3)})`);
      g.addColorStop(1, "rgba(10, 16, 26, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, cw * SCRIM_SPAN, ch);
    }
    if (wash.right > 0.001) {
      const g = ctx.createLinearGradient(cw, 0, cw * (1 - SCRIM_SPAN), 0);
      g.addColorStop(0, `rgba(10, 16, 26, ${(wash.right * SCRIM_EDGE).toFixed(3)})`);
      g.addColorStop(1, "rgba(10, 16, 26, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(cw * (1 - SCRIM_SPAN), 0, cw * SCRIM_SPAN, ch);
    }
  }

  // nearest loaded frame at or below idx, so scrubbing never blanks
  function nearestReady(idx) {
    if (ready[idx]) return idx;
    for (let d = 1; d < FRAME_COUNT; d++) {
      if (idx - d >= 0 && ready[idx - d]) return idx - d;
      if (idx + d < FRAME_COUNT && ready[idx + d]) return idx + d;
    }
    return -1;
  }

  /* ── scroll → progress → eased frame ─────────────────────── */

  let progress = 0;                           // 0..1 through the scrolly section
  let current  = 0;                           // eased frame position (float)
  let drawnIdx = -1;
  let drawnWash = -1;

  function readProgress() {
    const rect = scrolly.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
  }

  function snapToTarget() {
    readProgress();
    current = progress * (FRAME_COUNT - 1);
  }

  function updateCaptions() {
    const wash = { dark: 0, left: 0, right: 0 };
    for (const c of captions) {
      const span = c.end - c.start;
      const local = (progress - c.start) / span;
      let o = 0;
      if (local >= 0 && local <= 1) {
        // fade in over first 25%, hold, fade out over last 25% —
        // captions pinned to the sequence edges stay solid at their edge
        const fadeIn  = c.start <= 0 ? 1 : local / 0.25;
        const fadeOut = c.end  >= 1 ? 1 : (1 - local) / 0.25;
        o = Math.max(0, Math.min(1, fadeIn, fadeOut));
      }
      c.el.style.opacity = o.toFixed(3);
      if (c.interactive) c.el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      if (c.mode !== "none") wash[c.mode] = Math.max(wash[c.mode], o);
    }
    return wash;
  }

  /* ── about-title word scrub: the manifesto resolves as you scroll ── */

  const aboutTitle = document.getElementById("aboutTitle");
  let words = [];
  if (aboutTitle) {
    const wrapWords = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement("span");
            w.className = "w";
            w.textContent = part;
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrapWords(child);
        }
      });
    };
    wrapWords(aboutTitle);
    words = [...aboutTitle.querySelectorAll(".w")];
    if (reduceMotion) words.forEach(w => (w.style.opacity = 1));
  }

  function updateAboutScrub() {
    if (!words.length || reduceMotion) return;
    const r = aboutTitle.getBoundingClientRect();
    if (r.top > innerHeight || r.bottom < 0) return;
    const p = Math.min(1, Math.max(0,
      (innerHeight * 0.9 - r.top) / (r.height + innerHeight * 0.45)));
    const n = words.length;
    for (let i = 0; i < n; i++) {
      words[i].style.opacity = Math.min(1, Math.max(0.14, p * n - i)).toFixed(3);
    }
  }

  /* ── Lenis-style smooth scroll + checkpoint-paged hero section ──
     Outside the pinned 520vh sequence, scrolling is continuous, exactly
     as before. Inside it, one wheel/swipe/key gesture moves exactly one
     checkpoint — hero, "Automation pulls them into line", "Until
     everything clicks", the four-panel finale — and always settles
     precisely on it, never on a random in-between frame. ────────── */

  // key moments of the sequence: hero, the two caption beats, the finale
  const CHECKPOINTS = [0, 0.39, 0.63, 1];
  const SMOOTH_RATE  = 8;                     // easing rate, shared by both modes (1/s)
  const SNAP_LOCK_MS = 650;                   // fixed swallow window per checkpoint move

  let targetY = 0, smoothY = 0, expectedY = -1;
  let gestureLocked = false, lockTimer = null;

  const maxScroll = () =>
    document.documentElement.scrollHeight - innerHeight;

  function scrollyBounds() {
    const start = scrolly.offsetTop;
    return { start, end: start + scrolly.offsetHeight - innerHeight };
  }
  function progressOf(y, start, end) {
    const span = end - start;
    return span > 0 ? Math.min(1, Math.max(0, (y - start) / span)) : 0;
  }
  function nearestCheckpoint(p) {
    let best = 0, bestD = Infinity;
    CHECKPOINTS.forEach((c, i) => {
      const d = Math.abs(c - p);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }
  function armLock() {
    gestureLocked = true;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(() => { gestureLocked = false; }, SNAP_LOCK_MS);
  }

  // dir: +1 forward (down/later checkpoints), -1 backward. rawDelta only
  // matters outside the checkpoint zone, where motion stays continuous.
  function handleScrollGesture(dir, rawDelta) {
    // a FIXED lock window opens on every checkpoint move and does not
    // re-extend while it's swallowing events — a single fling's momentum
    // tail still can't sneak in an extra step, but a continuous/held
    // scroll (wheel spun steadily, trackpad held down) keeps advancing
    // one checkpoint per window instead of freezing after the first move
    if (gestureLocked) return;

    const { start, end } = scrollyBounds();
    const inRange = targetY > start + 1 && targetY < end - 1;
    const atStart = Math.abs(targetY - start) <= 1;
    const atEnd   = Math.abs(targetY - end)   <= 1;

    if (inRange || (atEnd && dir < 0) || (atStart && dir > 0)) {
      // checkpoint-paged: one gesture, one step, always lands exactly on it
      const curIdx = nearestCheckpoint(progressOf(targetY, start, end));
      const nextIdx = Math.min(CHECKPOINTS.length - 1, Math.max(0, curIdx + dir));
      if (nextIdx === curIdx) return;
      targetY = start + CHECKPOINTS[nextIdx] * (end - start);
      armLock();
    } else {
      // continuous, exactly as elsewhere on the page — but clamp so
      // crossing INTO the checkpoint zone always lands exactly on its
      // entrance checkpoint first (and locks there), never mid-sequence
      let next = targetY + rawDelta;
      if (dir > 0 && targetY <= start + 1 && next > start) { next = start; armLock(); }
      if (dir < 0 && targetY >= end - 1   && next < end)   { next = end;   armLock(); }
      targetY = Math.min(maxScroll(), Math.max(0, next));
    }
  }

  window.addEventListener("wheel", e => {
    if (reduceMotion || e.ctrlKey || e.deltaY === 0 ||
        document.body.classList.contains("loading")) return;
    e.preventDefault();
    const mult = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1;
    handleScrollGesture(e.deltaY > 0 ? 1 : -1, e.deltaY * mult);
  }, { passive: false });

  // touch: only take over once a gesture STARTS inside/at the checkpoint
  // zone (native scrolling elsewhere on the page is untouched); a full
  // swipe (start→end) counts as one gesture, same as one wheel tick
  const TOUCH_SWIPE_PX = 24;
  let touchStartY = null, touchInZone = false;

  window.addEventListener("touchstart", e => {
    if (reduceMotion || document.body.classList.contains("loading")) return;
    touchStartY = e.touches[0].clientY;
    const { start, end } = scrollyBounds();
    touchInZone = targetY >= start - 1 && targetY <= end + 1;
  }, { passive: true });

  window.addEventListener("touchmove", e => {
    if (!touchInZone || reduceMotion) return;
    e.preventDefault();                       // we drive the position ourselves
  }, { passive: false });

  window.addEventListener("touchend", e => {
    if (touchStartY === null) return;
    if (touchInZone && !reduceMotion) {
      const endY = e.changedTouches && e.changedTouches[0]
        ? e.changedTouches[0].clientY : touchStartY;
      const delta = touchStartY - endY;       // positive = swiped up = scroll forward
      if (Math.abs(delta) > TOUCH_SWIPE_PX) handleScrollGesture(delta > 0 ? 1 : -1, delta);
    }
    touchStartY = null;
    touchInZone = false;
  }, { passive: true });

  function smoothScrollStep(dt) {
    const actualY = window.scrollY;
    // adopt scrolls we did not write: keyboard, scrollbar, anchor jumps,
    // restored positions — never fight native input
    if (Math.abs(actualY - expectedY) > 1) {
      targetY = smoothY = actualY;
      expectedY = actualY;
      return;
    }
    smoothY += (targetY - smoothY) * (1 - Math.exp(-SMOOTH_RATE * dt));
    // only write, and only re-sync expectedY, while actually animating —
    // otherwise a slow native scroll under ~0.5px/frame (a gentle touch
    // drag, edge autoscroll) gets its sub-pixel progress silently snapped
    // back every frame instead of accumulating past the adopt threshold
    if (Math.abs(targetY - smoothY) > 0.5 && Math.abs(smoothY - actualY) > 0.5) {
      window.scrollTo(0, smoothY);
      expectedY = window.scrollY;
    }
  }

  /* ── main loop ───────────────────────────────────────────── */

  let lastTick = 0;

  function tick(now) {
    // self-heal: layout can settle after boot (hidden tab, pinch zoom, rotation)
    if (canvas.clientWidth !== cw || canvas.clientHeight !== ch) resize();

    // time-based ease: identical feel at 30Hz, 60Hz, or 144Hz — a fixed
    // per-tick factor turns sluggish whenever rAF slows down
    const dt = Math.min((now - (lastTick || now)) / 1000, 0.1);
    lastTick = now;

    if (!reduceMotion) smoothScrollStep(dt);

    readProgress();
    const target = progress * (FRAME_COUNT - 1);
    current = reduceMotion
      ? target
      : current + (target - current) * (1 - Math.exp(-CHASE_RATE * dt));
    if (Math.abs(target - current) < 0.35) current = target;

    const wash = updateCaptions();
    const washKey =
      `${wash.dark.toFixed(2)}|${wash.left.toFixed(2)}|${wash.right.toFixed(2)}`;
    const idx = nearestReady(Math.round(current));
    if (idx !== -1 && (idx !== drawnIdx || washKey !== drawnWash)) {
      render(idx, wash);
      drawnIdx = idx;
      drawnWash = washKey;
    }

    updateAboutScrub();
    requestAnimationFrame(tick);
  }

  /* ── nav: glass deepens past the top (IO sentinel, no scroll listener) ── */

  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:80px;pointer-events:none;";
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) =>
    nav.classList.toggle("scrolled", !e.isIntersecting)
  ).observe(sentinel);

  /* ── scroll-spy: current section marked in the nav ───────── */

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
  ["services", "approach", "industries", "testimonials", "contact"].forEach(id => {
    const s = document.getElementById(id);
    if (s) spy.observe(s);
  });

  /* ── anchor jumps land instantly — snap the canvas with them ── */

  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener("click", () => setTimeout(snapToTarget, 0)));

  /* ── nav dropdowns: click-toggle fallback for touch/no-hover ── */

  document.querySelectorAll(".nav__item").forEach(item => {
    const dropBtn = item.querySelector(":scope > button");
    if (!dropBtn) return;
    dropBtn.addEventListener("click", e => {
      e.stopPropagation();
      const willOpen = !item.classList.contains("open");
      document.querySelectorAll(".nav__item.open").forEach(o => {
        o.classList.remove("open");
        o.querySelector(":scope > button")?.setAttribute("aria-expanded", "false");
      });
      if (willOpen) { item.classList.add("open"); dropBtn.setAttribute("aria-expanded", "true"); }
    });
  });
  document.addEventListener("click", () =>
    document.querySelectorAll(".nav__item.open").forEach(o => o.classList.remove("open")));

  /* ── mobile menu ─────────────────────────────────────────── */

  const burger  = document.getElementById("navBurger");
  const overlay = document.getElementById("navOverlay");
  if (burger && overlay) {
    const setMenu = open => {
      burger.classList.toggle("open", open);
      overlay.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", () =>
      setMenu(!overlay.classList.contains("open")));
    overlay.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => setMenu(false)));
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
  setTimeout(() => document.querySelectorAll(".reveal:not(.in)")
    .forEach(el => el.classList.add("in")), 4000);

  /* ── boot ────────────────────────────────────────────────── */

  window.addEventListener("resize", resize, { passive: true });
  // if the tab was hidden, rAF was frozen — snap to target instead of visibly chasing it
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) snapToTarget();
  });
  readProgress();          // restored scroll positions load their frames first
  pump();
  resize();
  requestAnimationFrame(tick);
})();
