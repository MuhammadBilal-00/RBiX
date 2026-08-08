export interface IndustryServiceCard {
  label: string;
  body: string;
  href: string;
  /** Which pixel-cube glyph to render — matches the four capability marks. */
  glyph: "ai" | "web" | "mobile" | "data";
  ink?: boolean;
}

export interface IndustryPageData {
  slug: string;
  label: string;
  metaDescription: string;
  lede: string;
  meta: { label: string; value: string }[];
  challenge: { title: string; paragraphs: string[] };
  servicesTitle: string;
  services: IndustryServiceCard[];
  whyTitle: string;
  why: { strong: string; span: string }[];
  /** Testimonial slugs to surface in the "Client Results" band (optional). */
  testimonials?: string[];
  cta: { title: string; body: string };
}

// The 8 sector pages, migrated from the legacy static HTML (previously served
// from public/industries/*.html). Each page keeps its own genuinely different
// copy — the only shared structure is the template.
export const industryPages: Record<string, IndustryPageData> = {
  "clinics-aesthetics": {
    slug: "clinics-aesthetics",
    label: "Clinics & Aesthetics",
    metaDescription:
      "Automated systems built for dental, cosmetic, aesthetic, and veterinary practices — no-show reduction, after-hours lead response, and patient records that follow the person across every visit and every branch.",
    lede: "Dental, cosmetic, aesthetic, and veterinary practices run on the calendar — every open slot is booked revenue, and every no-show is a gap that's hard to fill on short notice. Add more than one location and the challenge compounds: patient history needs to follow the person from branch to branch, not reset at the front desk every visit. RBiX builds the automation and systems layer that keeps appointments filled and records connected.",
    meta: [
      {
        label: "Typical clients",
        value: "Dental practices, cosmetic and aesthetic clinics, and veterinary practices — single-site and multi-branch.",
      },
      {
        label: "Most common starting point",
        value: "No-show reduction — the fastest visible win on lost chair-time.",
      },
      {
        label: "What usually follows",
        value: "A practice management system once patient records outgrow paper or spreadsheets.",
      },
    ],
    challenge: {
      title: "An empty chair is revenue that doesn't come back.",
      paragraphs: [
        "A missed appointment in a clinic or aesthetic practice isn't just an inconvenience — it's an empty chair, a block of paid staff time, and revenue that doesn't come back. Few other business types feel a no-show as directly. Front-desk staff spend hours every week on reminder calls that patients still forget, and even a modest no-show rate compounds fast across a full booking calendar.",
        "The problem deepens once a practice grows beyond one location. Patient and client history — treatment notes, billing, contact details — often lives in paper files or in systems that don't talk to each other branch to branch, so a returning patient has to repeat themselves at every visit. And a new-patient inquiry that lands after hours sits untouched until the next business day, by which point they've often booked somewhere else.",
      ],
    },
    servicesTitle: "The four services that show up most in clinics & aesthetics.",
    services: [
      {
        label: "AI & Automation",
        glyph: "ai",
        ink: true,
        href: "/services/ai-automation/",
        body: "A No-Show Reduction Flow sends 48h, 24h, and 2h reminders with one-tap confirm or reschedule, and a Lead Response Engine answers after-hours inquiries the moment they come in instead of the next morning.",
      },
      {
        label: "Web & Custom Software",
        glyph: "web",
        href: "/services/web-software/",
        body: "A Practice / Clinic Management System that keeps patients, appointments, staff, and billing in one place — so records follow the patient across every visit, not just the one at a single front desk.",
      },
      {
        label: "Mobile Applications",
        glyph: "mobile",
        href: "/services/mobile-apps/",
        body: "A Staff Operations App built for multi-branch clinic groups, so owners and practice managers can coordinate staff schedules and coverage across every location from one place.",
      },
      {
        label: "Data Analytics & BI",
        glyph: "data",
        href: "/services/data-analytics/",
        body: "A Financial Health Dashboard that gives multi-branch practices real profitability visibility per location, so underperforming branches surface early instead of showing up at year-end.",
      },
    ],
    whyTitle: "Every recovered appointment is revenue that was already booked.",
    why: [
      {
        strong: "No-shows recovered are chair-time recovered.",
        span: "Every appointment that gets confirmed instead of missed is revenue that was already on the books — not new revenue you have to go find.",
      },
      {
        strong: "Records that follow the patient.",
        span: "One patient, one file, wherever they walk in — no repeat intake forms, no re-keyed history, no errors from data that lives in two places.",
      },
      {
        strong: "After-hours inquiries no longer go cold.",
        span: "A prospective patient who messages at 9pm gets a response at 9pm, not a missed opportunity by the time you open.",
      },
      {
        strong: "One view instead of per-location silos.",
        span: "Multi-branch groups see bookings, staff, and financial health across every site from a single dashboard, not five separate systems.",
      },
    ],
    cta: {
      title: "Tired of empty chairs from no-shows?",
      body: "Let's find the one workflow that's costing your practice the most booked revenue.",
    },
  },

  "real-estate": {
    slug: "real-estate",
    label: "Real Estate",
    metaDescription:
      "Systems built for brokerages and property/facility management firms — automatic lead capture and routing, viewing scheduling, portfolio-wide maintenance tracking, and weekly agent performance dashboards.",
    lede: "Brokerages live or die on lead volume and how fast a viewing gets scheduled. Property and facility management firms live on the opposite problem — many properties, many tenants, and maintenance requests scattered across a whole portfolio. RBiX builds the systems that keep leads moving and portfolios visible.",
    meta: [
      {
        label: "Typical clients",
        value: "Residential and commercial brokerages, and property/facility management firms.",
      },
      {
        label: "Most common starting point",
        value: "A lead desk that qualifies and routes portal leads before they go cold.",
      },
      {
        label: "What usually follows",
        value: "Field service tooling and performance analytics once the pipeline is under control.",
      },
    ],
    challenge: {
      title: "A lead goes cold within hours — and most portfolios have no map.",
      paragraphs: [
        "Leads arrive from several portals and channels at once, and every one of them goes stale within hours if it isn't qualified and routed to the right agent fast. In practice that routing is manual — someone checking inboxes, matching a lead to an area or budget, then chasing the back-and-forth of arranging a viewing time. Management, meanwhile, has almost no visibility into agent performance or pipeline health until the numbers get pulled together at month-end.",
        "Property and facility managers face a different version of the same problem: maintenance requests come in from tenants across dozens of properties with no structured way to track what's open, what's overdue, and who's supposed to be on site. Neither problem needs more headcount. Both need the routing, scheduling, and tracking automated so nothing depends on someone remembering to check an inbox.",
      ],
    },
    servicesTitle: "The four services that show up most in real estate.",
    services: [
      {
        label: "Web & Custom Software",
        glyph: "web",
        ink: true,
        href: "/services/web-software/",
        body: "A broker / lead desk built as a CRM: leads pulled automatically from every portal and channel, qualified and routed by rule — area, budget, listing — with viewings scheduled straight into agent calendars and performance rolled into a weekly dashboard.",
      },
      {
        label: "AI & Automation",
        glyph: "ai",
        href: "/services/ai-automation/",
        body: "A lead response engine that answers portal and web inquiries with a qualified reply in minutes, not hours, backed by a quote follow-up sequence that keeps nurturing every prospect who isn't ready to view yet.",
      },
      {
        label: "Mobile Applications",
        glyph: "mobile",
        href: "/services/mobile-apps/",
        body: "A field service and inspection app for property and facility managers running site inspections and maintenance jobs across a portfolio, built offline-first so a weak signal on-site never stops the work.",
      },
      {
        label: "Data Analytics & BI",
        glyph: "data",
        href: "/services/data-analytics/",
        body: "Staff and agent performance analytics — a weekly leaderboard across the team plus an individual scorecard per agent, so pipeline health is visible every week instead of reconstructed at month-end.",
      },
    ],
    whyTitle: "The listing goes to whoever replies first.",
    why: [
      {
        strong: "Speed wins listings.",
        span: "A fast, qualified response wins a lead before a competing brokerage has even opened the inquiry.",
      },
      {
        strong: "No more scheduling back-and-forth.",
        span: "Viewings land directly on an agent's calendar instead of a chain of messages trying to find a time that works.",
      },
      {
        strong: "Portfolio-wide visibility for facility managers.",
        span: "Every maintenance request across every property tracked in one place, not scattered across tenant calls and texts.",
      },
      {
        strong: "Performance visible every week, not once a month.",
        span: "Agent activity and pipeline health show up on a weekly dashboard instead of being reconstructed at month-end.",
      },
    ],
    cta: {
      title: "Losing listings to slower follow-up?",
      body: "Let's find the fastest way to get your leads qualified, routed, and viewed.",
    },
  },

  ecommerce: {
    slug: "ecommerce",
    label: "E-commerce",
    metaDescription:
      "Automated systems built for direct-to-consumer and retail brands selling online — abandoned cart recovery, COD confirmation, branded storefronts, and revenue attribution that ties spend to sales.",
    lede: "Direct-to-consumer and retail brands selling online lose margin in two specific, fixable places — carts abandoned at checkout and cash-on-delivery orders that fail on the doorstep. Add a growing brand that's outgrowing a single storefront tool, and the systems layer stops being optional. RBiX builds the recovery, storefront, and reporting layer that stops that margin from leaking.",
    meta: [
      {
        label: "Typical clients",
        value: "Direct-to-consumer and retail brands selling online.",
      },
      {
        label: "Most common starting point",
        value: "Cart recovery and COD confirmation — the fastest visible margin win.",
      },
      {
        label: "What usually follows",
        value: "A branded storefront and attribution dashboard once channel spend needs justifying.",
      },
    ],
    challenge: {
      title: "Margin leaks at checkout and at the door.",
      paragraphs: [
        "Carts get abandoned at checkout with no automatic follow-up, so a large share of near-purchases simply disappear. Cash-on-delivery orders go out without confirmation, and a portion of them fail on delivery — eating margin on shipping both ways, on top of the wasted packaging and fulfillment time. As the brand scales across ad platforms, influencers, and marketplaces, marketing spend gets harder to tie back to actual revenue, so budget keeps getting allocated on gut feel or platform-reported clicks rather than what actually converted.",
        "Underneath all of it, a generic storefront template doesn't reflect the brand and often doesn't integrate cleanly with local payment and shipping providers — forcing manual workarounds that don't scale past a handful of orders a day. None of this needs a rebuild from scratch. It needs the recovery, confirmation, and reporting layers automated and connected to the storefront the brand already runs, or a storefront built to support them properly.",
      ],
    },
    servicesTitle: "The four services that show up most in e-commerce.",
    services: [
      {
        label: "AI & Automation",
        glyph: "ai",
        ink: true,
        href: "/services/ai-automation/",
        body: "An E-commerce Recovery Suite that automatically recovers abandoned carts with a timed follow-up message and product images, and confirms cash-on-delivery orders before dispatch to cut failed deliveries.",
      },
      {
        label: "Web & Custom Software",
        glyph: "web",
        href: "/services/web-software/",
        body: "An E-commerce Storefront — branded and built on Salla, Zid, Shopify, or fully headless — integrated with local payment and shipping providers, with orders syncing straight into the recovery suite and reporting layer.",
      },
      {
        label: "Data Analytics & BI",
        glyph: "data",
        href: "/services/data-analytics/",
        body: "A Revenue & Marketing Attribution Dashboard putting cost-per-lead and revenue-per-channel side by side, updated daily, so spend gets justified with real revenue instead of platform-reported clicks.",
      },
      {
        label: "Mobile Applications",
        glyph: "mobile",
        href: "/services/mobile-apps/",
        body: "A staff operations app for brands that also run their own warehouse and fulfillment teams — order picking, dispatch, and COD confirmation status coordinated in one place as the brand scales past a single site.",
      },
    ],
    whyTitle: "Recovered revenue, not vanity metrics.",
    why: [
      {
        strong: "Direct margin recovery.",
        span: "Recovered carts and confirmed COD orders are money back in the business, not a dashboard metric that looks good in a meeting.",
      },
      {
        strong: "A storefront that actually converts.",
        span: "A branded storefront built around the brand converts better than a generic off-the-shelf template — and it's yours to shape as you grow.",
      },
      {
        strong: "Spend you can justify.",
        span: "Real revenue attribution replaces platform-reported clicks, so every channel's budget is backed by evidence, not guesswork.",
      },
      {
        strong: "One connected stack.",
        span: "Storefront, recovery, and reporting talk to each other instead of running as three disconnected tools nobody fully trusts.",
      },
    ],
    cta: {
      title: "Losing carts and COD orders you should be keeping?",
      body: "Let's find out how much of that is recoverable.",
    },
  },

  "field-services": {
    slug: "field-services",
    label: "Home & Field Services",
    metaDescription:
      "Automated systems built for contractors, inspection, and maintenance businesses — quote follow-up, offline-first field apps, and job tracking built around how field work actually happens.",
    lede: "Field work happens where there's often no signal, quotes go cold while a prospect sits on the decision, and proof that a job was actually done properly is usually just someone's word. RBiX builds the automation and mobile layer that keeps quotes moving and gives every job a verifiable record.",
    meta: [
      {
        label: "Typical clients",
        value: "Contractors, inspection firms, and maintenance businesses working across multiple sites and crews.",
      },
      {
        label: "Most common starting point",
        value: "Automated quote follow-up — the fastest way to stop losing already-closable work.",
      },
      {
        label: "What usually follows",
        value: "An offline-first field app once crews outgrow paper checklists and phone-call status updates.",
      },
    ],
    challenge: {
      title: "Good work goes unproven, and good leads go cold.",
      paragraphs: [
        "A quote gets sent, and without a systematic follow-up sequence it goes cold within a few days — not because the prospect said no, but because nobody followed up before they moved on. That's closable work written off for nothing. Meanwhile, inspection and maintenance jobs are still logged on paper checklists, which means there's no verifiable proof of what was actually checked, when it was checked, or by whom — a real liability the moment a dispute comes up.",
        "Add in technicians working sites with no reliable signal, unable to access or update job data in the field, and office staff spending their day on the phone chasing status updates that should be automatic — and growth just means more manual overhead per crew, not less.",
      ],
    },
    servicesTitle: "The four services that show up most in home & field services.",
    services: [
      {
        label: "AI & Automation",
        glyph: "ai",
        ink: true,
        href: "/services/ai-automation/",
        body: "A Quote Follow-Up Sequence that automatically works cold quotes for 30–90 days on a scheduled, varied cadence — and alerts the assigned person the moment a prospect replies.",
      },
      {
        label: "Mobile Applications",
        glyph: "mobile",
        href: "/services/mobile-apps/",
        body: "A Field Service & Inspection App built offline-first, with structured checklists and GPS/time-stamped photos that auto-sync the moment a technician is back in signal.",
      },
      {
        label: "Web & Custom Software",
        glyph: "web",
        href: "/services/web-software/",
        body: "An Internal Operations Dashboard — an ERP-Lite that connects scattered tools and spreadsheets into one structured layer for scheduling and job tracking across every crew.",
      },
      {
        label: "Data Analytics & BI",
        glyph: "data",
        href: "/services/data-analytics/",
        body: "A Financial Health Dashboard tracking job profitability and receivables across crews and projects, so underperforming jobs surface early instead of at year-end.",
      },
    ],
    whyTitle: "Closable work shouldn't die from silence.",
    why: [
      {
        strong: "Cold quotes get worked automatically.",
        span: "Instead of being written off after a few days of silence, every quote gets a scheduled, varied follow-up cadence for up to 90 days.",
      },
      {
        strong: "Every inspection has proof.",
        span: "GPS and time-stamped photos attached to structured checklists mean there's a verifiable record of what was checked, when, and by whom.",
      },
      {
        strong: "Zero signal doesn't stop the crew.",
        span: "Field apps built offline-first keep working with no connection at all — everything syncs the moment a technician is back in range.",
      },
      {
        strong: "Office staff stop playing telephone.",
        span: "Status updates flow automatically from the field, so nobody's day is spent calling around to find out what's done.",
      },
    ],
    cta: {
      title: "Tired of chasing quotes and paper checklists?",
      body: "Let's find the one workflow that's costing your crews the most.",
    },
  },

  "professional-services": {
    slug: "professional-services",
    label: "Professional Services",
    metaDescription:
      "Automated systems built for accounting, bookkeeping, and legal practices — lead response, overdue receivables, invoice OCR, and client self-service portals built around billable time.",
    lede: "Accounting, bookkeeping, and legal practices bill by the hour or the engagement — which means firms live or die on client intake speed, overdue receivables, and the paperwork and compliance grind that quietly eats billable time. RBiX builds the automation layer that gets that time back.",
    meta: [
      {
        label: "Typical clients",
        value: "Accounting firms, bookkeeping practices, and legal offices billing by the hour or the engagement.",
      },
      {
        label: "Most common starting point",
        value: "Automated payment chasing or invoice OCR — the fastest visible win on receivables and admin time.",
      },
      {
        label: "What usually follows",
        value: "A client self-service portal once inquiry and document volume outgrows email and spreadsheets.",
      },
    ],
    challenge: {
      title: "Billable hours leak into the work that isn't billable.",
      paragraphs: [
        "A new client inquiry that arrives after hours or over a weekend often waits days for a reply, by which point they've already called someone else. Invoices for completed work go unchased because no one owns follow-up, quietly stretching days-sales-outstanding month after month. Vendor bills and receipts get manually re-typed into accounting software one line at a time, and client documents and filing deadlines end up tracked across scattered spreadsheets and calendar reminders that are easy to miss.",
        "None of this needs a bigger team. It needs the manual, easy-to-drop parts of the workflow — intake response, payment chasing, data entry, deadline tracking — automated and made consistent, so senior staff time goes back to billable work instead of admin.",
      ],
    },
    servicesTitle: "The four services that show up most in professional services.",
    services: [
      {
        label: "AI & Automation",
        glyph: "ai",
        ink: true,
        href: "/services/ai-automation/",
        body: "A Payment Chaser that sends escalating reminders and payment links at day 1, 7, 14, and 30 overdue, plus Invoice & Receipt OCR that reads a photo or PDF and pushes it straight into your accounting system instead of a manual re-type.",
      },
      {
        label: "Web & Custom Software",
        glyph: "web",
        href: "/services/web-software/",
        body: "A Client Self-Service Portal where clients log in to view history, invoices, and documents, upload files, and pay outstanding balances — all updating the same central system your staff already use.",
      },
      {
        label: "Internal Operations Dashboard",
        glyph: "web",
        href: "/services/web-software/",
        body: "An ERP-Lite layer that connects or migrates your existing spreadsheets, tools, and SaaS subscriptions into one structured system, so staff enter data once and partners get one login instead of five disconnected ones.",
      },
      {
        label: "Data Analytics & BI",
        glyph: "data",
        href: "/services/data-analytics/",
        body: "A Financial Health Dashboard giving one view of cash flow, receivables aging, and profitability by client or service line, syncing automatically from your accounting system and flagging anything trending the wrong way early.",
      },
    ],
    whyTitle: "Every hour spent on admin is an hour that isn't billable.",
    why: [
      {
        strong: "Same-day response, every time.",
        span: "After-hours inquiries get a qualified reply the same day instead of sitting unanswered over a weekend.",
      },
      {
        strong: "Receivables that chase themselves.",
        span: "Overdue invoices get followed up automatically and consistently, instead of depending on someone remembering to do it.",
      },
      {
        strong: "Deadlines that don't slip through the cracks.",
        span: "Filing and compliance deadlines are tracked in one system, not scattered across spreadsheets and calendar reminders.",
      },
      {
        strong: "Billable hours stay billable.",
        span: "Manual data entry stops eating into the hours that should be on a client invoice.",
      },
    ],
    testimonials: ["michael-sterling", "elena-rostova"],
    cta: {
      title: "Losing billable hours to admin?",
      body: "Let's find the one workflow that's costing your firm the most time.",
    },
  },

  construction: {
    slug: "construction",
    label: "Construction",
    metaDescription:
      "Systems built for construction and engineering firms — tender follow-up, offline site inspections, certification and insurance expiry tracking, and project financial visibility.",
    lede: "Construction and engineering firms live on tenders won, site work documented properly, and certifications that never lapse — three things that are easy to lose track of across multiple live projects.",
    meta: [
      {
        label: "Typical clients",
        value: "Firms managing tenders, site work, and certifications.",
      },
      {
        label: "Most common starting point",
        value: "Document expiry tracking or quote follow-up — the fastest visible win.",
      },
      {
        label: "What usually follows",
        value: "A field inspection app or financial dashboard once several live projects need visibility at once.",
      },
    ],
    challenge: {
      title: "Winning the tender is only the start of what's easy to lose track of.",
      paragraphs: [
        "Tenders and quotes go out and go cold with no structured follow-up, because the team has already moved on to the next bid. Site inspections and progress checks are still done on paper, in conditions where a phone with no signal is the norm on site, not the exception — so tools built around constant connectivity don't hold up in the field.",
        "Certifications, licences, and insurance — for equipment, staff, and subcontractors — expire quietly unless someone is tracking every date by hand, across every active project at once. And project financials — what's actually been billed, what's been collected, and what's still outstanding — are scattered across sites, making it hard to see the real numbers at a glance.",
      ],
    },
    servicesTitle: "The four services that show up most in construction.",
    services: [
      {
        label: "AI & Automation",
        glyph: "ai",
        ink: true,
        href: "/services/ai-automation/",
        body: "A Quote Follow-Up Sequence that keeps working cold tenders and quotes for 30 to 90 days after they go out, plus a Document Expiry & Compliance Tracker that checks every licence, insurance policy, and certification against today's date — with escalating alerts at 60, 30, 14, and 3 days out.",
      },
      {
        label: "Mobile Applications",
        glyph: "mobile",
        href: "/services/mobile-apps/",
        body: "An offline-first Field Service & Inspection App built around structured checklists for every site visit, with GPS and time-stamped photos captured on the spot and synced automatically the moment the crew is back in signal.",
      },
      {
        label: "Data Analytics & BI",
        glyph: "data",
        href: "/services/data-analytics/",
        body: "A Financial Health Dashboard that puts cash flow, receivables aging, and profitability by project or site in one place — updated regularly instead of reconstructed by hand at month-end.",
      },
      {
        label: "Web & Custom Software",
        glyph: "web",
        href: "/services/web-software/",
        body: "An Internal Operations Dashboard — an ERP-Lite — that consolidates the scattered project spreadsheets and point tools every site is running into one structured layer everyone works from.",
      },
    ],
    whyTitle: "Tenders, certifications, and site data shouldn't rely on memory.",
    why: [
      {
        strong: "Tenders stay warm.",
        span: "Structured follow-up keeps cold quotes working instead of going quiet the moment the team moves to the next bid.",
      },
      {
        strong: "Certifications never lapse without warning.",
        span: "Every licence, insurance policy, and certification is tracked against today's date, across every active project, with escalating alerts before anything expires.",
      },
      {
        strong: "Site documentation happens even with zero signal.",
        span: "Offline-first checklists and photo capture mean inspections still get done on remote sites, then sync automatically once the crew is back in range.",
      },
      {
        strong: "Project financials, visible in one place.",
        span: "Cash flow, receivables, and profitability by project replace scattered spreadsheets per site.",
      },
    ],
    cta: {
      title: "Managing tenders across multiple live projects?",
      body: "Let's find the one workflow — quotes, certifications, site data, or financials — that's costing you the most right now.",
    },
  },

  "retail-hospitality": {
    slug: "retail-hospitality",
    label: "Retail & Hospitality",
    metaDescription:
      "Automated systems built for multi-branch retail, salons, and appointment-based venues — booking reminders, order recovery, staff coordination, and POS built around real service flow.",
    lede: "Multi-branch retail, salons, and appointment-based venues run on volume — bookings, orders, and staff shifts moving fast across more than one location. RBiX builds the automation and systems layer that keeps that volume from turning into no-shows, abandoned carts, and disconnected branches.",
    meta: [
      {
        label: "Typical clients",
        value: "Multi-branch retail chains, salons, restaurants, and appointment-based service venues.",
      },
      {
        label: "Most common starting point",
        value: "No-show reduction or order recovery — the fastest visible win.",
      },
      {
        label: "What usually follows",
        value: "A branded storefront or custom POS once volume outgrows spreadsheets.",
      },
    ],
    challenge: {
      title: "Every branch runs slightly differently — until it doesn't scale.",
      paragraphs: [
        "A salon or restaurant group opens a second, then a third location, and the systems that worked for one site start to strain: booking reminders sent manually (or not at all), online orders and cash-on-delivery confirmations handled inconsistently branch to branch, and floor managers with no real-time view of what's happening beyond their own site. Retail brands moving online face a parallel problem — carts get abandoned, COD orders go unconfirmed, and failed deliveries eat into already-thin margins.",
        "None of this needs a rebuild. It needs the manual, inconsistent parts of the workflow — reminders, confirmations, staff coordination — automated and standardized across every location, so growth doesn't mean more manual overhead.",
      ],
    },
    servicesTitle: "The four services that show up most in retail & hospitality.",
    services: [
      {
        label: "AI & Automation",
        glyph: "ai",
        ink: true,
        href: "/services/ai-automation/",
        body: "No-show reduction reminders for bookings, cash-on-delivery confirmation before dispatch, and abandoned-cart recovery for online orders — running around the clock across every branch.",
      },
      {
        label: "Web & Custom Software",
        glyph: "web",
        href: "/services/web-software/",
        body: "Custom restaurant/POS and multi-branch management systems built around your exact kitchen and front-of-house workflow, plus branded e-commerce storefronts synced to fulfillment.",
      },
      {
        label: "Mobile Applications",
        glyph: "mobile",
        href: "/services/mobile-apps/",
        body: "A staff operations app so every branch clocks in, sees their roster, and flags issues in one place — with managers seeing real-time completion status without calling around.",
      },
      {
        label: "Data Analytics & BI",
        glyph: "data",
        href: "/services/data-analytics/",
        body: "Cost-per-lead and revenue-per-channel side by side, updated daily, plus branch-by-branch financial health so underperforming locations surface early, not at year-end.",
      },
    ],
    whyTitle: "Growth shouldn't mean more manual overhead per branch.",
    why: [
      {
        strong: "Consistency across every location.",
        span: "The same reminder sequence, the same confirmation flow, the same POS logic — whether it's your first site or your tenth.",
      },
      {
        strong: "Peak-hour resilience.",
        span: "Automated response and order confirmation don't slow down when the floor gets busy — the exact moment manual processes usually break.",
      },
      {
        strong: "One view across branches.",
        span: "Owners and area managers get a single login instead of five disconnected spreadsheets and point systems per site.",
      },
      {
        strong: "Built around your actual service, not a template.",
        span: "Kitchen workflow, salon booking rules, and retail fulfillment logic are all different — the system is built around yours specifically.",
      },
    ],
    testimonials: ["tariq-mahmood", "farhan-malik"],
    cta: {
      title: "Running more than one location?",
      body: "Let's find the one workflow that's costing every branch the most.",
    },
  },

  "compliance-smes": {
    slug: "compliance-smes",
    label: "Compliance-driven SMEs",
    metaDescription:
      "Automation for SMEs managing invoicing, tax, or regulatory deadlines — invoice OCR, deadline tracking, receivables chasing, and financial dashboards that cut real financial and legal exposure.",
    lede: "SMEs managing e-invoicing, tax filing, or regulatory deadlines carry real financial and legal exposure if a deadline slips or a filing is wrong — and most of that risk comes down to manual, easy-to-miss admin.",
    meta: [
      {
        label: "Typical clients",
        value: "Businesses managing invoicing, tax, or regulatory deadlines as part of daily operations.",
      },
      {
        label: "Most common starting point",
        value: "Invoice & receipt OCR or a compliance deadline tracker — whichever manual process is causing the most missed deadlines right now.",
      },
      {
        label: "What usually follows",
        value: "A financial health dashboard and a client self-service portal once the core admin risk is under control.",
      },
    ],
    challenge: {
      title: "Compliance risk usually starts as a manual admin problem.",
      paragraphs: [
        "Vendor invoices and receipts arrive as photos or PDFs and get manually re-typed into accounting or e-invoicing systems — introducing errors and eating hours every week that could go toward actual client work. Licences, permits, and regulatory filing deadlines get tracked across spreadsheets and calendar reminders, which are easy to lose track of the moment a business is managing many clients or assets at once.",
        "Overdue receivables go unchased because nobody owns consistent follow-up, and cash that should already be in the bank sits outstanding. When a filing or renewal is missed, the cost isn't just the admin time lost catching up — it's real financial or legal exposure that a spreadsheet reminder was never built to prevent.",
      ],
    },
    servicesTitle: "The four services that show up most for compliance-driven SMEs.",
    services: [
      {
        label: "Document & Data Intelligence",
        glyph: "ai",
        ink: true,
        href: "/services/ai-automation/document-data-intelligence/",
        body: "Vendor invoices and receipts — photographed or scanned — are read by OCR and AI extraction, validated, and pushed straight into your accounting or e-invoicing system, with anything uncertain flagged for a human. A Document Expiry & Compliance Tracker runs alongside it, watching licences, insurance, certifications, and filing deadlines with escalating alerts at 60, 30, 14, and 3 days out.",
      },
      {
        label: "Business Process Automation",
        glyph: "ai",
        href: "/services/ai-automation/business-process-automation/",
        body: "A Payment Chaser handles overdue receivables automatically instead of depending on someone remembering to follow up — escalating reminders and payment links go out at day 1, 7, 14, and 30 overdue, so collection stays consistent no matter how busy the team gets.",
      },
      {
        label: "Data Analytics & BI",
        glyph: "data",
        href: "/services/data-analytics/",
        body: "A Financial Health Dashboard puts cash flow, receivables aging, and profitability in one place, updated continuously, and flags anything trending the wrong way before it turns into a bigger problem.",
      },
      {
        label: "Web & Custom Software",
        glyph: "web",
        href: "/services/web-software/",
        body: "A Client Self-Service Portal lets clients view their own invoices and documents and pay outstanding balances directly — cutting down the inbound admin queries that eat into a small team's day.",
      },
    ],
    whyTitle: "This is about exposure, not just admin time.",
    why: [
      {
        strong: "Manual entry errors drop close to zero.",
        span: "Once OCR extraction is validated automatically, the retyping mistakes that used to slip through stop happening.",
      },
      {
        strong: "Deadlines don't rely on memory.",
        span: "Escalating alerts at 60/30/14/3 days replace spreadsheets and calendar reminders that are easy to lose track of.",
      },
      {
        strong: "Receivables get chased consistently.",
        span: "Follow-up happens on a schedule instead of depending on someone remembering to check.",
      },
      {
        strong: "Less financial and legal exposure.",
        span: "A missed filing or renewal costs more than admin time — this is about reducing that real exposure, not just saving hours.",
      },
    ],
    cta: {
      title: "Managing invoicing, tax, or regulatory deadlines by hand?",
      body: "Let's find the manual process most likely to cost you a missed deadline.",
    },
  },
};

export function getIndustry(slug: string): IndustryPageData | undefined {
  return industryPages[slug];
}
