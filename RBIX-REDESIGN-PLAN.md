# RBiX Technologies — Website Redesign Plan

**Status:** Planning
**Current stack:** Plain HTML / CSS / JS, deployed on Vercel (source code in hand, to be converted)
**Target stack:** Next.js (static export) → cPanel
**Owner:** Kashif Amin

---

## 1. Why we're redesigning

The current site has a strong visual identity (the 3D cube scroll animation) but four structural problems:

1. **Performance** — the hero animation is a PNG frame sequence (`/FRAME2/ezgif-frame-*.png`) drawn frame-by-frame on scroll. Dozens of individual image requests + canvas redraws = visible stutter on load, and no mobile optimisation at all.
2. **Thin information architecture** — the homepage tries to be a brand film, a service explainer, and a proof page at once via one scroll-locked sequence. A prospect has to work to reach basic facts (what, for whom, proof).
3. **Services are named as deliverables, not capabilities** — each service page lists a closed set of items (e.g. 7 automation flows). A prospect whose problem isn't on that list reads it as "they can't help me." It caps inbound demand at exactly the list we published.
4. **AI is positioned as one service of four, when it's actually the spine** — the site currently implies web, mobile, and analytics are non-AI work. That contradicts the actual positioning and gives away the main differentiator.

**Two design principles for this redesign:**
- The animation is a *signature*, not the *structure*. Motion carries the brand; static, fast, crawlable pages carry the selling.
- **Name by capability, detail underneath.** Every top-level name must be broad enough to absorb work we haven't thought of yet; the specific flows live one level down.

---

## 2. Positioning: AI is the differentiator, not the label

Every automation shop on LinkedIn can say "we build WhatsApp chatbots." Almost none can say **"we embed AI into production ERP, HMIS, and accounting systems serving 100+ clients."** That Vision Plus background is what makes the high-ticket work credible rather than aspirational — and it's the least contested capability in the Gulf market.

**But AI stays out of the service names.** A prospect searching "custom software development company Dubai" or "mobile app developer UAE" is searching for exactly that. A page titled "AI-Powered Custom Software" matches that query worse and reads like we're selling them something they didn't ask for. Plain names match intent; AI is the reason they pick us *once they're on the page*.

| Service line (page name — unchanged) | Where AI appears |
|---|---|
| **AI & Automation** | AI is the product here. Name it freely. |
| **Web & Custom Software** | Page sells custom software on its own terms. One dedicated section: AI capabilities we can build in — copilots inside your system, natural-language search over your data, intelligent internal tooling. |
| **Mobile Applications** | Page sells apps on their own terms. AI section: OCR/photo capture, voice input, on-device inference for offline work. |
| **Data Analytics & BI** | Page sells dashboards and reporting. AI section: conversational analytics, forecasting, anomaly detection. |

**Placement rule for the three non-automation lines:** lead with the conventional value proposition the visitor came for. Introduce AI as an *upgrade* one or two sections down — "what you'd get from us that you wouldn't get elsewhere." Never in the H1, never in the meta title, never as the first thing on the page.

**Proof asset currently missing from the site entirely:** the Numbers AI financial chatbot, live inside Numbers ERP. That is a shipped example of AI embedded in a real accounting system. It belongs on the homepage, in the AI section of the Custom Software page, and as a full case study.

---

## 3. Benchmark findings

Structure pattern that repeats at every agency scale (verified against Globant ~30k staff, and Master of Code Global ~250 staff — the closer comparable):

```
Services  /  Industries  /  Work  /  Resources  /  Company
```

Both use five separate, indexable top-level sections. Neither relies on a cinematic animation to carry the homepage. Master of Code additionally runs a **resources hub with a lead-gen tool** (chatbot ROI calculator) — this is what makes a boutique agency feel as substantial as an enterprise one, at a fraction of the cost of a 3D scene.

**Carousel research (re: the "slides per service" idea):** Baymard found ~half of homepage carousels fail in practice. Notre Dame tracking: slide 1 takes ~40% of clicks, slide 2 ~18%, dropping steadily. Auto-rotation performs no better. **Decision: no services carousel on the homepage.** Whichever service lands on slide 1 wins; the other three lose. All four need equal weight.

---

## 4. Service taxonomy — two tiers

The reference pattern: names like "Business Process Automation" aren't products, they're **containers**. Broad enough to swallow OCR, invoice extraction, quote sequences, ERP sync, and anything else rule-based. Every Tier 1 name must pass this test: *could a prospect's unlisted problem plausibly live inside it?*

Tier 1 = the capability (own page). Tier 2 = concrete flows listed on that page as examples, explicitly framed as non-exhaustive.

### 4.1 AI & Automation

| Tier 1 capability | Tier 2 — what it absorbs |
|---|---|
| **Conversational AI Agents** | Voice agents (inbound/outbound), WhatsApp, web chat, social DMs, multi-language (Urdu / English / Arabic). Lead response, booking, FAQ, support triage, complaint tickets, order status, COD confirmation |
| **Revenue & Pipeline Automation** | Lead capture → routing → enrichment → outreach → follow-up. SDR agents, lead generation, no-show reduction, cart recovery, quote follow-up sequences |
| **Document & Data Intelligence** | Invoice OCR, contract parsing, form processing, receipt extraction, compliance deadline tracking, elimination of manual re-keying |
| **Business Process Automation** | The genuine catch-all — any rule-based internal workflow. HR onboarding, approvals, procurement, ERP / POS / CRM integration, cross-system sync |
| **Embedded & Custom AI** | AI inside the client's own product: copilots in their ERP, RAG over internal docs, forecasting, anomaly detection. *Highest ticket, least competition.* |

### 4.2 Web & Custom Software

| Tier 1 capability | Tier 2 |
|---|---|
| **Business Systems & Internal Tools** | Internal operating systems replacing spreadsheets and disconnected SaaS; ERP-lite dashboards; client self-service portals |
| **Business Websites & Web Platforms** | Conversion-focused sites wired to automation; search, personalisation, content management |
| **E-commerce Development** | Salla, Zid, Shopify, headless. Storefronts, merchandising, order management |
| **Legacy Modernisation** | Oracle Forms → APEX, CodeIgniter and other legacy PHP, .NET upgrades |
| **System Integration & APIs** | Connecting anything to anything: ERP, POS, CRM, accounting, custom REST |

*AI section on this hub page:* copilots inside the system we build, natural-language search over company data, document intelligence wired into workflows. Numbers AI is the proof point.

### 4.3 Mobile Applications

| Tier 1 capability | Tier 2 |
|---|---|
| **Field & Inspection Apps** | Offline-first checklists, GPS/time-stamped photo capture, auto-sync in signal range |
| **Workforce & Staff Apps** | Rosters, tasks, clock-in/out, real-time completion status for managers |
| **Customer-Facing Mobile** | Booking, ordering, loyalty, self-service portals |
| **Cross-Platform Development** | React Native / Flutter, iOS + Android from one codebase |

*AI section on this hub page:* OCR and photo classification in the field, voice input for hands-busy work, on-device inference where connectivity can't be guaranteed.

### 4.4 Data Analytics & BI

| Tier 1 capability | Tier 2 |
|---|---|
| **Revenue & Marketing Intelligence** | Attribution, cost-per-lead by channel, funnel analysis |
| **Financial & Operational Dashboards** | Cash flow, receivables aging, profitability, capacity |
| **Performance Scorecards** | Staff/agent response time and conversion, weekly leaderboards |
| **Data Pipelines & Warehousing** | Consolidating scattered sources into one daily-updated view |

*AI section on this hub page:* conversational analytics — ask your data questions in plain language — plus forecasting and anomaly detection. *Numbers AI is the live proof.*

---

## 5. Target site architecture

```
Home
│
├── Services (overview page — 4 lines)
│   ├── AI & Automation                    (hub)
│   │   ├── Conversational AI Agents
│   │   ├── Revenue & Pipeline Automation
│   │   ├── Document & Data Intelligence
│   │   ├── Business Process Automation
│   │   └── Embedded & Custom AI
│   ├── Web & Custom Software              (hub → 5 capability pages)
│   ├── Mobile Applications                (hub → 4 capability pages)
│   └── Data Analytics & BI                (hub → 4 capability pages)
│
├── Industries  (8 sector pages — keep, improve)
│   ├── Clinics & Aesthetics        ├── Professional Services
│   ├── Real Estate                 ├── Construction
│   ├── E-commerce                  ├── Retail & Hospitality
│   └── Home & Field Services       └── Compliance-driven SMEs
│
├── Work                    ← RENAMED from "Testimonials"
│   ├── index (filterable by service + industry)
│   ├── Elevate Growth Partners — lead routing & CRM
│   ├── OmniRetail Networks — omnichannel AI chatbots
│   ├── Flavors Hospitality Group — restaurant POS
│   └── Numbers AI — conversational analytics in a live ERP
│
├── Resources               ← NEW
│   ├── Automation ROI Calculator   (lead-gen tool, priority)
│   ├── Blog / Insights
│   └── (later) Guides & checklists
│
└── Company                 ← NEW
    ├── About / Team
    ├── Pricing
    └── Contact
```

**Page count reality check:** 4 service hubs + 18 capability pages + 8 industries + 5 work + 3 company + resources ≈ **40+ pages**. That is the right target for a serious software vendor, but it is a lot of *writing*, not a lot of *building* — the template work is bounded, the copy is not. Sequencing in §11 accounts for this: ship AI & Automation's five capability pages first, and let the other three service lines run as hub pages only until Phase 3.

---

## 6. Capability page template

Every Tier 2 page follows one structure. Build the template once, fill 18 times.

```
1. Hero — outcome-led headline + CTA
   Breadcrumb: Services / AI & Automation / Conversational AI Agents

2. The problem  (2–3 paragraphs, specific to this capability)
   The existing "Manual follow-up is where revenue quietly leaks out"
   copy is the quality bar — keep that voice.

3. What we build most often          ← the concrete flows
   Framing line above the list:
   "These are the builds we're asked for most. They're a starting
    point, not a menu."

4. What we can connect to            ← the capability layer
   Channels, CRMs, accounting systems, e-commerce platforms,
   ERP/POS, any REST API. This is the block that says
   "your case is probably in scope."

4b. What AI adds here            ← ONLY on non-automation lines
   Placed *after* the conventional pitch, never before it.
   "Most agencies stop at building the system. We build the
    intelligence into it." Then 2–3 concrete examples.
   Skip this block entirely on AI & Automation pages — AI is
   already the product there, repeating it is noise.

5. How we work  (3 steps — reuse existing Automate/Measure/Scale copy)

6. "Don't see your workflow?"
   Short block + CTA. "Tell us the process. If it's repetitive and
   rule-based, it's automatable."

7. Related case study

8. FAQ (3–5 questions — earns SEO, answers objections)

9. Cross-links to sibling capabilities + parent service hub

10. CTA
```

**Service hub page** (one level up) = short intro on how AI runs through this line + 4–5 capability cards + one case study + CTA. Deliberately light; the hub routes, the capability pages sell.

---

## 7. Homepage rebuild

### 7.1 Animation

**Problem:** frame-sequence PNGs, scroll-driven, no mobile handling.

**Fix — combine frames into a single video:**

```bash
# Desktop / landscape master
ffmpeg -framerate 30 -i frame%03d.png \
  -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart \
  rbix-intro.mp4

# WebM/VP9 — smaller, served first
ffmpeg -framerate 30 -i frame%03d.png \
  -c:v libvpx-vp9 -crf 33 -b:v 0 rbix-intro.webm
```

**Mobile optimisation (currently missing entirely):**
- Export a **separate portrait/square crop** — the landscape composition loses its subject at 390px. Do not just scale the desktop file down.
- Serve via `<source media="(max-width: 768px)">` so phones never download the desktop master.
- Target: mobile file under ~1.5 MB. Test on throttled 4G, not office wifi.
- Cap duration at **3–4 seconds**. On mobile it should read as a transition, not a film.

**Playback:**

```html
<video autoplay muted playsinline preload="auto" poster="last-frame.jpg" id="intro">
  <source src="/intro-mobile.webm" type="video/webm" media="(max-width: 768px)">
  <source src="/intro.webm" type="video/webm">
  <source src="/intro.mp4"  type="video/mp4">
</video>
```

- `ended` event → reveals the services section. Automated hand-off, no scroll-jacking.
- **No visible skip button** (undercuts the moment) — but respect `prefers-reduced-motion: reduce` by jumping to the end-state. Invisible to everyone else; keeps us clear of a real accessibility complaint.
- Session flag: first landing only, not every internal nav.
- Page content loads *behind* the animation. If the video stalls, content is already there. The animation must never block content.

### 7.2 What the animation resolves into

**Not a carousel.** It resolves into the **static 4-up services grid** that already exists. All four lines visible simultaneously and permanently. Reuses existing work; only the trigger changes.

A one-time sequential reveal of the four cards as the video ends is fine — the trap is only a persistent carousel a user must click through.

### 7.3 Homepage section order

| # | Section | Purpose |
|---|---------|---------|
| 1 | Hero: headline + subhead + CTA | Who we help, what we do, the result — no scroll needed |
| 2 | Four service cards (static grid) | Equal weight, AI framing visible in each |
| 3 | Proof strip: logos + hard numbers | "4 hrs → 2 min", "30% conversion lift" as headline stats, not buried prose |
| 4 | "What we build differently" | Short section: the AI layer we put inside custom systems, apps, and dashboards |
| 5 | How we work: Automate → Measure → Scale | Existing copy, keep |
| 6 | Industries grid (8) | |
| 7 | Featured case studies (2–3 → Work) | Include Numbers AI |
| 8 | Tech stack strip | n8n, WhatsApp Business API, Salla, Zid, Shopify, .NET, React, SQL Server, Oracle |
| 9 | Final CTA + contact | |

---

## 8. Industries pages — improvements

Structure is sound (8 sectors, well-chosen for Gulf + US SMB). Gaps:

- **Generic stock-feeling icons** — the cube icons (AI chip, phone, bar chart) are weaker than the hero. Replace with sector-specific imagery or a consistent custom icon set.
- **No sector-specific proof** — each page should surface the case study closest to that sector (Flavors Hospitality → Retail & Hospitality, etc.).
- **No sector-specific numbers** — e.g. clinics: average no-show rate and what a reminder flow recovers. One credible stat per page.
- **Thin cross-linking** — each industry page should link to the 3–4 most relevant *capability* pages (not just service hubs). This is where the two-tier taxonomy pays off: "Clinics" links directly to Conversational AI Agents and Revenue & Pipeline Automation.
- **Same-shape risk** — 8 pages from one template is fine for maintenance, but each needs genuinely different copy, not find-and-replace of the sector name.

---

## 9. Page-by-page review checklist

Reviewed against: *load speed / mobile / clarity in 5 seconds / proof / next action*.

| # | Page | Priority | Key action |
|---|------|----------|-----------|
| 1 | Home | P0 | Video intro, static grid, proof strip, AI-differentiator section |
| 2 | Services overview | P0 | New — routes to 4 hubs; AI framed as differentiator, not label |
| 3 | AI & Automation hub | P0 | Reframe from deliverable list to 5 capabilities |
| 4–8 | 5 AI & Automation capability pages | P0 | Build the template here, then reuse |
| 9 | Work index + 4 case studies | P0 | Rebuild from testimonials; add Numbers AI |
| 10 | About / Team | P0 | New — credibility for a clean-slate brand |
| 11 | Contact | P1 | Form must work on static export (§10.3) |
| 12 | Pricing | P1 | New — even ranges reduce friction |
| 13–15 | 3 remaining service hubs | P1 | Hub pages only at this stage |
| 16–17 | Numbers AI + Embedded AI showcase | P1 | The differentiator — give it real space |
| 18–31 | 13 remaining capability pages | P2 | Software (5), Mobile (4), Analytics (4) |
| 32–39 | 8 industry pages | P2 | Proof + stat + capability cross-links each |
| 40 | ROI Calculator | P2 | Lead-gen tool |
| 41 | Blog / Insights | P3 | Shell + 2–3 posts |

---

## 10. Technical implementation

### 10.1 Stack decision

**Next.js with `output: 'export'`.**

Rationale: React/TypeScript is already the daily stack — near-zero learning cost, no context-switch on a side project. Astro would ship less JS by default, but the actual performance problem was the frame-sequence animation, fixed identically either way. Not worth learning a new framework to solve a problem that isn't the framework's.

```js
// next.config.js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,   // matches current URL structure
};
module.exports = nextConfig;
```

### 10.2 Structure

Every page is its own file — fully custom layouts where wanted, shared templates where sensible:

```
app/
  page.tsx                            # home
  about/page.tsx
  pricing/page.tsx
  contact/page.tsx
  services/
    page.tsx                          # overview — 4 service lines
    ai-automation/
      page.tsx                        # hub
      conversational-ai-agents/page.tsx
      revenue-pipeline-automation/page.tsx
      document-data-intelligence/page.tsx
      business-process-automation/page.tsx
      embedded-custom-ai/page.tsx
    custom-software/   [hub + 5]
    mobile-apps/       [hub + 4]
    data-analytics/    [hub + 4]
  industries/[8]/page.tsx
  work/
    page.tsx
    [4 case studies]/page.tsx
components/
  IntroVideo.tsx                      # 'use client' — the one real island
  CapabilityPage.tsx                  # the §6 template — used 18×
  ServiceGrid.tsx
  ProofStrip.tsx
```

**Note on the 18 capability pages:** build `CapabilityPage.tsx` as a props-driven layout and keep content in per-page data objects (or MDX). Hand-writing 18 near-identical page files is how this project stalls.

### 10.3 Known constraints of static export

| Constraint | Mitigation |
|---|---|
| No API routes → contact form can't send mail | PHP `mail()` handler (cPanel runs PHP natively), **or** Web3Forms / Formspree |
| `next/image` optimisation disabled | Pre-optimise before build: compress, size correctly, WebP |
| No server-side redirects | Handle in `.htaccess` on cPanel |

### 10.4 Migration from existing source

Source code is in hand. Order of conversion:
1. Extract the design tokens (colours, type scale, spacing) from current CSS into a shared theme file *before* porting any page — otherwise 40 pages inherit 40 slightly different versions of the same button.
2. Port shared chrome first (header, nav, footer, breadcrumbs).
3. Port homepage; validate the video pipeline end-to-end.
4. Build `CapabilityPage.tsx` against one real page (Conversational AI Agents), then batch the rest.
5. Keep existing URL paths where they exist (`/services/ai-automation/`) so nothing already indexed 404s. New capability pages nest beneath them.

### 10.5 Deployment

- `next build` → `out/` directory
- Upload `out/` to `public_html` via FTP, **or** a GitHub Action that builds and rsyncs on push to `main` (push-to-deploy without Node running server-side)
- Keep Vercel as staging during the rebuild; cut over to cPanel only at parity

### 10.6 Infrastructure note

If the cPanel box lands on the existing Leaseweb (EU) hosting, Gulf and US visitors pay that latency on every asset — including the intro video. Put **Cloudflare's free tier** in front of it so static assets serve from an edge node instead of round-tripping to Europe.

---

## 11. Performance targets

Measure with Lighthouse on **mobile, throttled 4G** — not desktop wifi.

| Metric | Target |
|---|---|
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 200ms |
| Mobile Lighthouse performance | > 85 |
| Intro video (mobile) | < 1.5 MB |
| Intro video (desktop) | < 4 MB |

Rules: hero text and CTA render before the video loads. No lazy-load pop-in without a skeleton placeholder. Fonts preloaded. Non-critical JS deferred.

---

## 12. Content that needs writing

The real bottleneck. Roughly in order of leverage:

- [ ] 4 case studies (problem → build → metric) — including **Numbers AI**. Get client sign-off on naming and numbers.
- [ ] 5 AI & Automation capability pages (full §6 template each)
- [ ] About / Team copy + photos
- [ ] Pricing ranges per service line
- [ ] Services overview page + "what AI adds" blocks for the 3 non-automation lines
- [ ] 13 remaining capability pages
- [ ] FAQ blocks × 18 capability pages (3–5 each)
- [ ] Sector-specific stat + example × 8 industries
- [ ] ROI calculator logic + copy
- [ ] 2–3 launch blog posts

---

## 13. Build phases

**Phase 1 — Foundation**
Next.js scaffold, design tokens extracted from existing source, shared chrome, video pipeline (ffmpeg + mobile crop), homepage rebuilt.

**Phase 2 — The front door**
Services overview, AI & Automation hub, `CapabilityPage.tsx` template, 5 AI & Automation capability pages. *This is the demand-generating half of the site.*

**Phase 3 — Credibility**
Work section (index + 4 case studies incl. Numbers AI), About/Team, Pricing. *The phase that most changes conversion.*

**Phase 4 — Depth**
3 remaining service hubs, 13 remaining capability pages, 8 industry pages improved with capability cross-links.

**Phase 5 — Lead generation**
ROI calculator, blog shell + launch posts, FAQ schema markup.

**Phase 6 — Migration**
cPanel deploy, `.htaccess` redirects, Cloudflare, form handler, DNS cutover, Lighthouse verification on real mobile.

---

## 14. Open decisions

- [ ] Which domain does this ship on — `rbixtechnologies.com`? (footer email suggests it exists)
- [ ] Client sign-off obtained for naming Elevate Growth / OmniRetail / Flavors in full case studies?
- [ ] Numbers AI case study — is it publishable as RBiX work, given it was built at Vision Plus? Framing needs care.
- [ ] Pricing: publish ranges, or "starting from" only?
- [ ] Do we keep the UK number as primary contact, or lead with a Gulf/UAE number for that market?
- [ ] Capability page content in MDX or TS data objects?
