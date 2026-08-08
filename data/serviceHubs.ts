import { ServiceHubStubProps } from "@/components/ServiceHubStub";

export const serviceHubs: Record<string, ServiceHubStubProps> = {
  "web-software": {
    title: "Web & Custom Software",
    lede: "Built around your real data and real workflow, not a demo.",
    meta: [
      { label: "Time to first result", value: "A live system built against your real records and real traffic, not a mockup." },
      { label: "Best for", value: "Businesses whose website generates no leads, or whose operations run on spreadsheets and disconnected SaaS tools." },
      { label: "Where it sits", value: "Usually the second layer." },
    ],
    problem: {
      title: "Most websites were built once and abandoned.",
      paragraphs: [
        "The websites most businesses run were built once and left alone — no lead capture wired to anything, no visibility into who visits or why they don't convert. And behind the website, the business itself runs on a patchwork: a spreadsheet for inventory, one SaaS tool for invoicing, another for bookings, none of them talking to each other.",
        "None of it fails loudly. It just means someone re-keys the same data into three systems, month-end reports get rebuilt by hand, and a returning customer has to re-enter everything at every step. The fix isn't a fancier website — it's one structured layer underneath everything the business runs on.",
      ],
    },
    tiles: [
      {
        title: "Business Systems & Internal Tools",
        body: "Internal operating systems that replace spreadsheets and disconnected SaaS, ERP-lite dashboards, and client self-service portals.",
      },
      {
        title: "Business Websites & Web Platforms",
        body: "Conversion-focused sites wired to automation, with search, personalisation, and content management built in.",
      },
      {
        title: "E-commerce Development",
        body: "Salla, Zid, Shopify, and headless storefronts — merchandising, order management, and everything synced to recovery flows.",
      },
      {
        title: "Legacy Modernisation",
        body: "Oracle Forms to APEX, CodeIgniter and other legacy PHP, and .NET upgrades — modernised without a disruptive rebuild.",
      },
      {
        title: "System Integration & APIs",
        body: "Connecting anything to anything — ERP, POS, CRM, accounting, and custom REST APIs.",
      },
    ],
    connectTo: [
      "ERP and accounting systems — Oracle, SQL Server platforms, Xero, QuickBooks",
      "E-commerce platforms — Salla, Zid, Shopify, WooCommerce",
      "CRMs and lead-desk systems for lead capture and routing",
      "POS and booking/scheduling platforms",
      "Spreadsheets — as a starting point when nothing more structured exists yet",
      "Any REST API your existing systems already expose",
    ],
    aiAdds: {
      title: "Most agencies stop at building the system. We build the intelligence into it.",
      body:
        // [TODO: confirm] Numbers AI attribution/sign-off is pending — see
        // RBIX-REDESIGN-PLAN.md §14 before this reference goes live.
        "Copilots inside the system we build, natural-language search over your own company data, and document intelligence wired directly into the workflow — Numbers AI, a conversational analytics agent embedded inside a live ERP, is the proof point.",
    },
    testimonialSlugs: ["tariq-mahmood", "robert-vance"],
    relatedCaseStudySlug: "flavors-hospitality",
    faq: [
      {
        q: "Why not just buy an off-the-shelf CRM or ERP?",
        a: "Off-the-shelf software forces your workflow to fit its assumptions. We build the layer around how your business actually runs, and connect the tools you already use rather than asking you to replace them all at once.",
      },
      {
        q: "How is this different from a typical agency website build?",
        a: "A marketing site is one deliverable. We treat the website as the front door of a system — lead capture wired to routing, forms that feed your CRM, and content tied to the automation behind it.",
      },
      {
        q: "Do we have to rebuild everything at once?",
        a: "No. Most engagements start with one real workflow or system — usually the spreadsheet costing the most — and expand from there once it's proven. You never lose what you already have.",
      },
    ],
    ctaTitle: "Still running the business on spreadsheets and five logins?",
  },

  "mobile-apps": {
    title: "Mobile Applications",
    lede: "Purpose-built apps for field teams and distributed staff — built offline-first where connectivity can't be guaranteed.",
    meta: [
      { label: "Time to first result", value: "A pilot team can be running on the app while the wider rollout is still being planned." },
      { label: "Best for", value: "Field inspectors, technicians, contractors, and distributed retail or hospitality staff." },
      { label: "Where it sits", value: "Usually follows a proven manual workflow that's outgrown paper checklists." },
    ],
    problem: {
      title: "Field work happens where connectivity doesn't.",
      paragraphs: [
        "Field teams and distributed staff spend a large part of the day on work that never gets properly recorded — which sites were inspected, what was found, who clocked in and out. When it does get logged, it's on paper or a phone call back to the office: unverifiable, untrackable, and invisible to managers until someone asks.",
        "The tools meant to fix this fail where the work actually happens. Most off-the-shelf field apps assume a constant connection, and many sites have none. The result is a choice between lying to the system or doing the work twice.",
      ],
    },
    tiles: [
      {
        title: "Field & Inspection Apps",
        body: "Offline-first structured checklists with GPS- and time-stamped photo capture, auto-syncing the moment signal returns.",
      },
      {
        title: "Workforce & Staff Apps",
        body: "Rosters, tasks, and clock-in/out, with real-time completion status visible to managers.",
      },
      {
        title: "Customer-Facing Mobile",
        body: "Booking, ordering, loyalty, and self-service portals built for your customers, not just your staff.",
      },
      {
        title: "Cross-Platform Development",
        body: "React Native and Flutter — iOS and Android from one codebase, without doubling the build cost.",
      },
    ],
    connectTo: [
      "Your existing ERP, CRM, or booking system for two-way sync",
      "Offline-first storage that syncs the moment signal returns",
      "GPS, camera, and signature capture on device",
      "Push notifications and automatic status updates to managers",
      "Staff rosters, scheduling, and clock-in/out systems",
      "Any REST API your existing systems already expose",
    ],
    aiAdds: {
      title: "The field is where connectivity is least reliable — that's exactly where embedded AI earns its keep.",
      body:
        "OCR and photo classification in the field, voice input for hands-busy work, and on-device inference where connectivity can't be guaranteed.",
    },
    testimonialSlugs: [],
    faq: [
      {
        q: "What happens when there's no signal in the field?",
        a: "The app is built offline-first — checklists, photo capture, and GPS/time stamps all work with zero connection, then sync automatically the moment the device is back in range. Field work never stops.",
      },
      {
        q: "iOS, Android, or both?",
        a: "Both, from one codebase. Cross-platform builds (React Native or Flutter) mean you don't build and maintain the same app twice.",
      },
      {
        q: "How long does the first version take?",
        a: "A pilot team can usually be running on a working app while the wider rollout is still being planned — the first version is scoped around one real workflow, not a speculative feature list.",
      },
    ],
    ctaTitle: "Where does your field team lose the most time?",
  },

  "data-analytics": {
    title: "Data Analytics & BI",
    lede: "Dashboards that turn scattered data into a single, daily-updated view of marketing, cash flow, and staff output.",
    meta: [
      { label: "Time to first result", value: "A live dashboard within the same engagement, updated daily from day one." },
      { label: "Best for", value: "Any growing business that can't quickly answer which channel, branch, or staff member is actually performing." },
      { label: "Where it sits", value: "The retention layer." },
    ],
    problem: {
      title: "The numbers exist — the visibility doesn't.",
      paragraphs: [
        "Most growing businesses can't quickly answer the questions that decide where money goes: which channel actually produces revenue, which branch or agent is performing, how much cash is really coming in. The data exists — across ad platforms, spreadsheets, and the accounting system — but pulling it together takes hours, and by the time it's assembled it's already stale.",
        "Month-end reports describe what happened last month, too late to change it. The gap isn't missing data; it's a missing layer that keeps it current, consistent, and answerable in minutes instead of days.",
      ],
    },
    tiles: [
      {
        title: "Revenue & Marketing Intelligence",
        body: "Attribution, cost-per-lead by channel, and funnel analysis — so you know which channel is actually converting.",
      },
      {
        title: "Financial & Operational Dashboards",
        body: "Cash flow, receivables aging, profitability, and capacity, rolled up into one view.",
      },
      {
        title: "Performance Scorecards",
        body: "Staff and agent response time and conversion, with weekly leaderboards that make performance visible.",
      },
      {
        title: "Data Pipelines & Warehousing",
        body: "Consolidating scattered sources into one daily-updated view, instead of five spreadsheets that disagree with each other.",
      },
    ],
    connectTo: [
      "Ad platforms, CRMs, and e-commerce back-ends for attribution",
      "Accounting and ERP systems for cash flow and receivables",
      "POS and booking systems for operational metrics",
      "Staff and agent activity feeds for performance scorecards",
      "Spreadsheets — as the starting point when nothing more structured exists yet",
      "Any REST API or database your existing systems already expose",
    ],
    aiAdds: {
      title: "A dashboard tells you what happened. Conversational analytics lets you ask why.",
      body:
        // [TODO: confirm] Numbers AI attribution/sign-off is pending — see
        // RBIX-REDESIGN-PLAN.md §14 before this reference goes live.
        "Conversational analytics — ask your data questions in plain language — plus forecasting and anomaly detection, with Numbers AI as the live proof inside a real production ERP.",
    },
    testimonialSlugs: [],
    faq: [
      {
        q: "Is this just a BI tool like Power BI or Looker?",
        a: "Those are the dashboard layer. We build the layer underneath — the pipelines that keep scattered sources in sync daily — so the dashboard shows real, current numbers instead of a snapshot someone spent a week assembling.",
      },
      {
        q: "How fast will our data be updated?",
        a: "The default is daily refreshes, with real-time where a workflow needs it — the cadence is set by the decision the dashboard supports.",
      },
      {
        q: "We don't have clean data yet — can we still start?",
        a: "Yes. Cleaning and consolidating messy historical data is part of the build. We start from whatever you actually have and make it trustworthy as we go.",
      },
    ],
    ctaTitle: "Ready to see your real numbers, in one place?",
  },
};
