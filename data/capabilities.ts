import { CapabilityPageProps } from "@/components/CapabilityPage";

export interface CapabilitySummary {
  slug: string;
  label: string;
  blurb: string;
}

// The 5 Tier-1 capability names under AI & Automation. Order matters — it
// drives the hub page cards and each page's sibling cross-links.
export const aiAutomationCapabilities: CapabilitySummary[] = [
  {
    slug: "conversational-ai-agents",
    label: "Conversational AI Agents",
    blurb: "Voice, WhatsApp, web chat, and social DMs — lead response, booking, and support triage in seconds, not hours.",
  },
  {
    slug: "revenue-pipeline-automation",
    label: "Revenue & Pipeline Automation",
    blurb: "Lead capture through follow-up, on autopilot — routing, enrichment, cart recovery, and quote sequences.",
  },
  {
    slug: "document-data-intelligence",
    label: "Document & Data Intelligence",
    blurb: "Invoices, receipts, and contracts read and filed automatically, with compliance deadlines tracked before they're missed.",
  },
  {
    slug: "business-process-automation",
    label: "Business Process Automation",
    blurb: "The catch-all for rule-based internal workflow — approvals, onboarding, and system-to-system sync.",
  },
  {
    slug: "embedded-custom-ai",
    label: "Embedded & Custom AI",
    blurb: "AI built into your own product — copilots, RAG over internal docs, forecasting, and anomaly detection.",
  },
];

function siblingsExcept(slug: string) {
  return aiAutomationCapabilities
    .filter((c) => c.slug !== slug)
    .map((c) => ({
      label: c.label,
      href: `/services/ai-automation/${c.slug}/`,
      blurb: c.blurb,
    }));
}

const parentHub = { label: "AI & Automation", href: "/services/ai-automation/" };

export const capabilityPages: Record<string, CapabilityPageProps> = {
  "conversational-ai-agents": {
    breadcrumbTrail: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services/" },
      { label: "AI & Automation", href: "/services/ai-automation/" },
      { label: "Conversational AI Agents" },
    ],
    title: "Conversational AI Agents",
    lede: "A lead that waits four hours for a reply has usually already messaged someone else. Conversational AI agents answer in seconds, on whichever channel the person actually used, in the language they used it in.",
    metaRow: [
      { label: "Time to first result", value: "Usually inside the first few weeks, not months." },
      { label: "Best for", value: "Any business losing leads to slow response, or drowning in repetitive inbound questions across channels." },
      { label: "Where it sits", value: "The layer everything else is built on." },
    ],
    problem: {
      paragraphs: [
        "Most inbound leads and support questions arrive outside business hours, or during the ten minutes a day your team is slammed. By the time someone gets to them, the moment that mattered — the person actively comparing options, actively deciding — has passed.",
        "The channels themselves are part of the problem: a lead messages on WhatsApp, a question comes in through Instagram DM, a booking request lands on the website chat widget. Three inboxes, three response times, and no shared memory of who's already been in touch.",
        "None of this is a staffing problem you can hire your way out of. It's a coverage and consistency problem — every message deserves the same fast, accurate first response, whether it arrives at 9am or 11pm.",
      ],
    },
    whatWeBuild: {
      intro: "Response systems built around how your customers actually reach you",
      items: [
        {
          title: "Lead Response Engine",
          body: "A qualified WhatsApp or SMS reply within 60 seconds, 24/7. Two or three qualifying questions, automatic hot/warm/cold tagging, and escalation to a human within 10 minutes if the conversation needs one.",
        },
        {
          title: "No-Show Reduction Flow",
          body: "Automated reminders at 48 hours, 24 hours, and 2 hours before an appointment, with a one-tap confirm or reschedule link — not another phone call your staff has to make.",
        },
        {
          title: "Omnichannel Support Triage",
          body: "One agent, deployed across WhatsApp, web chat, and social DMs, that shares context across channels so a customer never has to repeat themselves.",
        },
        {
          title: "Multi-language voice & chat",
          body: "Inbound and outbound voice agents and chat, fluent in Urdu, English, and Arabic, for markets where a single-language bot quietly loses half its audience.",
        },
        {
          title: "Order status & COD confirmation",
          body: "Automatic order-status replies and cash-on-delivery confirmation before dispatch, so your team isn't fielding \"where's my order\" messages by hand.",
        },
      ],
    },
    whatWeConnect: {
      intro: "If it has an inbox or an API, it's in scope",
      items: [
        "WhatsApp Business API, Instagram and Facebook DMs, web chat widgets",
        "Voice — inbound call answering and outbound reminder/confirmation calls",
        "CRMs and lead-desk systems for automatic handoff and tagging",
        "Booking and scheduling systems for confirmations and reschedules",
        "E-commerce platforms for order-status and delivery confirmation",
        "Any REST API your existing systems already expose",
      ],
    },
    dontSeeWorkflow: {
      body: "Tell us the process. If it's a conversation that follows a pattern — qualifying, confirming, answering the same handful of questions — it's automatable.",
    },
    // Table-specified proof point: Farhan Malik / OmniRetail Networks (both
    // channel automations absorbed here: Lead Response Engine, No-Show
    // Reduction Flow).
    testimonialSlug: "farhan-malik",
    relatedCaseStudySlug: "omniretail-networks",
    faq: [
      {
        q: "Does this replace our support team, or work alongside them?",
        a: "Alongside. The agent handles the repetitive, pattern-based volume — qualifying, FAQ, status checks — and escalates anything that needs judgment to a human, with the full conversation history attached.",
      },
      {
        q: "Can it actually handle Urdu and Arabic, not just English?",
        a: "Yes — multi-language is built in from the start where the market needs it, not bolted on afterward as a translation layer.",
      },
      {
        q: "What happens when the agent doesn't know the answer?",
        a: "It escalates rather than guessing. Every flow includes an explicit handoff point so a human picks up the conversation with context, not a customer starting over.",
      },
      {
        q: "How fast can this be live?",
        a: "The first working flow — usually lead response or no-show reduction — is typically live inside the first few weeks, not months, because it's built against your real inbound traffic from day one.",
      },
    ],
    siblingLinks: siblingsExcept("conversational-ai-agents"),
    parentHub,
    finalCta: {
      title: "Which channel is losing you the most leads?",
      body: "One conversation is enough to find out — and to scope the first response flow.",
    },
  },

  "revenue-pipeline-automation": {
    breadcrumbTrail: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services/" },
      { label: "AI & Automation", href: "/services/ai-automation/" },
      { label: "Revenue & Pipeline Automation" },
    ],
    title: "Revenue & Pipeline Automation",
    lede: "Revenue leaks out in the gaps between steps: the lead that sits unassigned, the cart that's abandoned without a follow-up, the quote nobody chased. Pipeline automation closes those gaps without adding headcount.",
    metaRow: [
      { label: "Time to first result", value: "A live pipeline running against real leads, usually inside the first few weeks." },
      { label: "Best for", value: "Businesses losing revenue to slow follow-up on leads, abandoned carts, or unchased quotes." },
      { label: "Where it sits", value: "Right behind first response — where a qualified lead either advances or goes cold." },
    ],
    problem: {
      paragraphs: [
        "A lead being answered quickly isn't the same as a lead being worked properly. Once someone responds, the lead still has to be routed to the right person, enriched with enough context to have a useful conversation, and followed up with consistently — not just once, but on a cadence, until it converts or clearly won't.",
        "The same pattern shows up in e-commerce: a cart is abandoned, and unless someone follows up within hours, that sale is usually gone for good. And quotes are the quietest leak of all — sent out, then never chased, because chasing thirty open quotes by hand doesn't happen consistently.",
        "None of this needs more salespeople. It needs the handoffs and follow-through to happen every single time, automatically.",
      ],
    },
    whatWeBuild: {
      intro: "Pipelines that route, enrich, and follow up without waiting on a person",
      items: [
        {
          title: "Lead routing & enrichment pipeline",
          body: "Inbound leads are captured, enriched with available context, scored, and routed to the right rep automatically — the exact system behind Elevate Growth Partners' drop from a 4-hour to a 2-minute response time.",
        },
        {
          title: "E-commerce Recovery Suite",
          body: "Abandoned-cart follow-up with the actual product images included, plus cash-on-delivery confirmation before a courier is dispatched — recovering orders that would otherwise just be lost.",
        },
        {
          title: "Quote Follow-Up Sequence",
          body: "A 30–90 day varied-cadence follow-up sequence on every quote sent, with an internal alert the moment a prospect replies, so nothing sits forgotten in a sales inbox.",
        },
        {
          title: "CRM & outreach sync",
          body: "Keeps your CRM, ad platforms, and outreach sequencing in agreement about a lead's real status, instead of drifting apart across disconnected tools.",
        },
      ],
    },
    whatWeConnect: {
      intro: "Wherever the lead or order already lives",
      items: [
        "CRMs — HubSpot, Salesforce, Zoho, and custom lead-desk systems",
        "E-commerce platforms — Salla, Zid, Shopify, WooCommerce",
        "Ad platforms and forms for lead capture and enrichment",
        "Email and outreach sequencing tools",
        "WhatsApp/SMS for cart recovery and quote follow-up",
        "Any REST API your existing stack already exposes",
      ],
    },
    dontSeeWorkflow: {
      body: "Tell us the process. If leads, carts, or quotes are going cold because nobody's following up on a consistent schedule, it's automatable.",
    },
    // Table-specified proof point: Michael Sterling / Elevate Growth Partners.
    testimonialSlug: "michael-sterling",
    relatedCaseStudySlug: "elevate-growth-partners",
    faq: [
      {
        q: "How is this different from just buying a CRM?",
        a: "A CRM stores the data. This is the automation layer on top that actually moves leads through it — routing, enrichment, and follow-up that happens whether or not anyone remembers to do it manually.",
      },
      {
        q: "Will this feel like spam to our leads and customers?",
        a: "No — the cadence and content are built around real buying patterns (a 30–90 day quote sequence, timed cart-recovery messages), not blanket automated blasts.",
      },
      {
        q: "We already have a sales team — why would we need this?",
        a: "This is what keeps your sales team working the leads that matter instead of manually re-triaging an inbox. It handles the routing and reminders; they handle the conversations that need a person.",
      },
      {
        q: "What's the fastest win here?",
        a: "Almost always lead routing — it's the single highest-leverage fix, and it's what took Elevate Growth Partners from a 4-hour to a 2-minute response time with a 30% conversion lift in the first month.",
      },
    ],
    siblingLinks: siblingsExcept("revenue-pipeline-automation"),
    parentHub,
    finalCta: {
      title: "Which stage is your pipeline actually leaking at?",
      body: "One conversation is enough to find out — and to scope the first automation.",
    },
  },

  "document-data-intelligence": {
    breadcrumbTrail: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services/" },
      { label: "AI & Automation", href: "/services/ai-automation/" },
      { label: "Document & Data Intelligence" },
    ],
    title: "Document & Data Intelligence",
    lede: "Every hour spent re-typing an invoice by hand is an hour not spent on work only a person can do. Document and data intelligence reads the paperwork for you — and remembers the deadlines attached to it.",
    metaRow: [
      { label: "Time to first result", value: "A working extraction pipeline against your real documents, not a demo file." },
      { label: "Best for", value: "Any business manually re-keying invoices, receipts, or contracts, or tracking compliance deadlines in a spreadsheet." },
      { label: "Where it sits", value: "Wherever paperwork currently becomes a bottleneck." },
    ],
    problem: {
      paragraphs: [
        "Invoices and receipts arrive by WhatsApp photo, email attachment, and PDF — in whatever format the sender happened to use — and someone on your team has to open each one, read it, and manually key the numbers into accounting software. It's slow, and it's exactly the kind of repetitive task where transcription errors creep in.",
        "Compliance and contract deadlines have the same failure mode in reverse: nothing goes wrong until the one date someone forgot, and by then it's a penalty or a lapsed certification, not a scheduling inconvenience.",
        "Both problems come from the same root cause — documents that live as static files instead of structured, trackable data.",
      ],
    },
    whatWeBuild: {
      intro: "Extraction and tracking systems that turn documents into structured data",
      items: [
        {
          title: "Invoice & Receipt OCR",
          body: "Photos or PDFs submitted via WhatsApp or email are read with OCR and AI extraction, pushed directly into accounting software, with anything uncertain flagged for a quick human check instead of failing silently.",
        },
        {
          title: "Document Expiry & Compliance Tracker",
          body: "Automatic alerts at 60, 30, 14, and 3 days before a certification, contract, or regulatory deadline lapses — tracked once, instead of remembered by whoever happened to notice last time.",
        },
        {
          title: "Contract data extraction",
          body: "Key terms, dates, and obligations pulled out of contracts automatically and made searchable, instead of living inside PDFs nobody re-reads until there's a dispute.",
        },
      ],
    },
    whatWeConnect: {
      intro: "Wherever the documents already arrive",
      items: [
        "WhatsApp and email for inbound invoice/receipt capture",
        "Accounting systems — Xero, QuickBooks, Zoho Books, and custom ledgers",
        "ERP and POS systems for downstream sync",
        "Calendar and notification systems for deadline alerts",
        "Document storage — Google Drive, SharePoint, and custom file stores",
        "Any REST API your existing systems already expose",
      ],
    },
    dontSeeWorkflow: {
      body: "Tell us the process. If it involves reading the same kind of document over and over, or tracking a recurring deadline in a spreadsheet, it's automatable.",
    },
    // Table-specified proof point: David Reynolds / TradeFlow Global
    // Logistics — testimonial only, no full case study exists for this client.
    testimonialSlug: "david-reynolds",
    faq: [
      {
        q: "What happens when the OCR gets something wrong?",
        a: "Anything the system isn't confident about is flagged for a human to check rather than pushed through silently — the goal is eliminating the repetitive 95%, not introducing new silent errors.",
      },
      {
        q: "Does this work with handwritten or low-quality phone photos?",
        a: "It's built and tuned against the real documents your business actually receives, including WhatsApp photos, not just clean scanned PDFs — extraction confidence is checked per document.",
      },
      {
        q: "Can it push straight into our existing accounting software?",
        a: "Yes — the extraction pipeline is built to sync with the accounting or ERP system you already use, rather than asking you to adopt a new one.",
      },
      {
        q: "How far in advance do compliance alerts go out?",
        a: "The default cadence is 60, 30, 14, and 3 days before a deadline, tuned to whatever lead time actually matters for that certification or filing.",
      },
    ],
    siblingLinks: siblingsExcept("document-data-intelligence"),
    parentHub,
    finalCta: {
      title: "How many hours a week go into re-typing documents?",
      body: "One conversation is enough to find out — and to scope the first extraction flow.",
    },
  },

  "business-process-automation": {
    breadcrumbTrail: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services/" },
      { label: "AI & Automation", href: "/services/ai-automation/" },
      { label: "Business Process Automation" },
    ],
    title: "Business Process Automation",
    lede: "Every business has a handful of internal processes that are entirely rule-based — the same steps, in the same order, every single time — and are still run by hand anyway. This is the catch-all for making those processes run themselves.",
    metaRow: [
      { label: "Time to first result", value: "A working automation against one real internal process, not a hypothetical one." },
      { label: "Best for", value: "Any business running a repetitive, rule-based internal workflow through email, spreadsheets, or manual handoffs." },
      { label: "Where it sits", value: "The genuine catch-all — if your problem doesn't fit neatly elsewhere, it's probably here." },
    ],
    problem: {
      paragraphs: [
        "Overdue invoices need reminders sent on a schedule. New hires need the same onboarding checklist walked through every time. Purchase approvals need to move through the same chain of people. None of this requires judgment — it requires consistency, and consistency is exactly what manual processes lose first as a business grows.",
        "The other version of this problem is systems that don't talk to each other: an ERP, a POS, and a CRM that each hold part of the truth, reconciled by someone manually copying numbers between them.",
        "If a process can be written down as a flowchart, it doesn't need a person running it step by step.",
      ],
    },
    whatWeBuild: {
      intro: "Automations for the rule-based work already written down in someone's head",
      items: [
        {
          title: "Payment Chaser",
          body: "Escalating reminders and payment links sent automatically at day 1, 7, 14, and 30 overdue — the follow-through that's easy to describe and hard to actually do by hand for every overdue invoice.",
        },
        {
          title: "ERP / POS / CRM sync",
          body: "Keeps records consistent across the systems that are each supposed to hold part of the truth, so nobody's manually reconciling numbers between them at month-end.",
        },
        {
          title: "HR onboarding workflows",
          body: "The same new-hire checklist — accounts, equipment, paperwork, introductions — triggered and tracked automatically instead of depending on someone remembering every step.",
        },
        {
          title: "Approval & procurement chains",
          body: "Purchase and approval requests routed through the right chain of people automatically, with visibility into where something is stuck.",
        },
      ],
    },
    whatWeConnect: {
      intro: "The systems already running your internal operations",
      items: [
        "ERP, POS, and accounting systems for cross-system sync",
        "CRMs and internal ticketing/approval tools",
        "HR and onboarding platforms",
        "Email and calendar systems for reminders and scheduling",
        "Spreadsheets, as a starting point when nothing more structured exists yet",
        "Any REST API your existing systems already expose",
      ],
    },
    dontSeeWorkflow: {
      body: "Tell us the process. If it's repetitive and rule-based — the same steps, in the same order, every time — it's automatable, whatever it's called internally.",
    },
    // Table-specified proof point: Robert Vance / Metro Distribution Systems
    // — testimonial only (ERP/multi-warehouse fits cross-system sync here).
    testimonialSlug: "robert-vance",
    faq: [
      {
        q: "How is this different from the other AI & Automation capabilities?",
        a: "The other four capabilities describe automations organized around leads, documents, and conversations specifically. This is the catch-all for everything else that's rule-based and internal — if your process doesn't obviously fit those, it's probably here.",
      },
      {
        q: "Our process is a bit unusual — is it still worth asking?",
        a: "Yes. The test isn't whether we've built exactly this before, it's whether the process follows a consistent, describable pattern. Most internal workflows do.",
      },
      {
        q: "Do you need access to all our internal systems upfront?",
        a: "No — we start by scoping one real process end-to-end, which usually only touches one or two systems, and expand from there once it's proven.",
      },
      {
        q: "What if our systems don't have a public API?",
        a: "Most modern ERP, POS, and CRM systems expose some form of API or integration layer; where they genuinely don't, we scope an alternative (scheduled exports, RPA-style automation) rather than ruling it out.",
      },
    ],
    siblingLinks: siblingsExcept("business-process-automation"),
    parentHub,
    finalCta: {
      title: "What's the most repetitive process on your team's plate?",
      body: "One conversation is enough to find out — and to scope the first automation.",
    },
  },

  "embedded-custom-ai": {
    breadcrumbTrail: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services/" },
      { label: "AI & Automation", href: "/services/ai-automation/" },
      { label: "Embedded & Custom AI" },
    ],
    title: "Embedded & Custom AI",
    lede: "Most agencies build the system and stop there. This is AI built into the system itself — a copilot inside your ERP, a natural-language layer over your own data, forecasting that runs on your real numbers.",
    metaRow: [
      { label: "Time to first result", value: "Scoped individually — this is the deepest integration work we do." },
      { label: "Best for", value: "Companies running their own ERP, HMIS, or core system who want intelligence built in, not bolted on." },
      { label: "Where it sits", value: "The highest-ticket, most defensible work in the stack." },
    ],
    problem: {
      paragraphs: [
        "A generic chatbot pointed at a support inbox is a commodity — dozens of shops can build one. What's genuinely hard, and genuinely valuable, is AI embedded inside a company's own production system: an ERP, HMIS, or accounting platform that real staff use every day to run the business.",
        "That kind of integration means understanding the client's actual data model, actual workflows, and actual edge cases — not a demo dataset. It's why so few shops can credibly offer it, and why it's the least contested, highest-ticket work in this entire stack.",
        // [TODO: confirm] The "100+ clients" figure and its Vision Plus attribution
        // (RBIX-REDESIGN-PLAN.md §2/§14) are not independently verified — confirm
        // with the client before this paragraph goes live, then remove this note.
        "RBiX's background is exactly this: embedding AI into production ERP, HMIS, and accounting systems used by a large, established client base.",
      ],
    },
    whatWeBuild: {
      intro: "AI built into the client's own product, not bolted on beside it",
      items: [
        {
          title: "Copilots inside your ERP or core system",
          body: "A conversational layer embedded directly inside the system your team already uses daily — ask a plain-language question, get an answer sourced from live production data.",
        },
        {
          title: "RAG over internal documentation",
          body: "Retrieval-augmented search over your own internal docs, policies, and historical records — so staff get a direct answer instead of searching through folders.",
        },
        {
          title: "Forecasting & anomaly detection",
          body: "Models trained on your actual historical data to flag unusual patterns — a spend spike, a receivables anomaly — before they become a real problem, and to forecast what's coming next.",
        },
        {
          // TODO: link to /work/numbers-ai/ once attribution sign-off is
          // confirmed — see RBIX-REDESIGN-PLAN.md §14. Numbers AI is
          // mentioned here as the flagship proof point in prose only — not
          // hyperlinked, and not imported from data/work.ts on this page.
          title: "Conversational analytics",
          body: "A natural-language interface over your own business data: ask what your receivables-over-60-days figure is, get the number, live — the same pattern behind Numbers AI, a conversational-analytics agent RBiX embedded directly inside a live production ERP.",
        },
      ],
    },
    whatWeConnect: {
      intro: "Your own core systems — this is the whole point",
      items: [
        "ERP systems — Oracle, SQL Server-based platforms, and custom-built systems",
        "HMIS and healthcare/clinic management platforms",
        "Accounting and financial systems",
        "Internal document stores and knowledge bases",
        "Any REST API or database your core system already exposes",
      ],
    },
    dontSeeWorkflow: {
      body: "Tell us what system you run the business on. If it holds real data and real workflows, there's almost certainly an embedded-AI layer worth scoping.",
    },
    // No testimonialSlug and no relatedCaseStudySlug here on purpose: Numbers
    // AI is the flagship example for this capability, but its case study is
    // `unpublished` in data/work.ts pending attribution sign-off (plan §14).
    // CapabilityPage also defensively refuses to render a link to any
    // unpublished case study even if one were passed in here.
    faq: [
      {
        q: "Is this only for companies with an existing custom system?",
        a: "It's the natural fit for one, but it also applies to established off-the-shelf ERP/HMIS platforms where we can build an integration layer on top.",
      },
      {
        q: "How long does an engagement like this take?",
        a: "Longer than a standalone chatbot — this is scoped individually because it depends on your specific data model and system architecture. An initial scoping conversation sets real expectations.",
      },
      {
        q: "Is our data used to train anything shared across clients?",
        a: "No — this work is built around your own data and your own system, not a shared or multi-tenant model.",
      },
      {
        q: "What's the Numbers AI example, exactly?",
        a: "A conversational financial-analytics agent embedded directly inside a live ERP, so a finance user can ask a plain-language question and get an answer sourced from real production data.",
      },
    ],
    siblingLinks: siblingsExcept("embedded-custom-ai"),
    parentHub,
    finalCta: {
      title: "What would it be worth to have AI built into your own system?",
      body: "This is a scoping conversation, not a sales pitch — tell us what you run the business on.",
    },
  },
};
