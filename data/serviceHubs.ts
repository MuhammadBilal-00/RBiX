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
    aiAdds: {
      title: "Most agencies stop at building the system. We build the intelligence into it.",
      body:
        // [TODO: confirm] Numbers AI attribution/sign-off is pending — see
        // RBIX-REDESIGN-PLAN.md §14 before this reference goes live.
        "Copilots inside the system we build, natural-language search over your own company data, and document intelligence wired directly into the workflow — Numbers AI, a conversational analytics agent embedded inside a live ERP, is the proof point.",
    },
    testimonialSlugs: ["tariq-mahmood", "robert-vance"],
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
    aiAdds: {
      title: "The field is where connectivity is least reliable — that's exactly where embedded AI earns its keep.",
      body:
        "OCR and photo classification in the field, voice input for hands-busy work, and on-device inference where connectivity can't be guaranteed.",
    },
    testimonialSlugs: [],
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
    aiAdds: {
      title: "A dashboard tells you what happened. Conversational analytics lets you ask why.",
      body:
        // [TODO: confirm] Numbers AI attribution/sign-off is pending — see
        // RBIX-REDESIGN-PLAN.md §14 before this reference goes live.
        "Conversational analytics — ask your data questions in plain language — plus forecasting and anomaly detection, with Numbers AI as the live proof inside a real production ERP.",
    },
    testimonialSlugs: [],
    ctaTitle: "Ready to see your real numbers, in one place?",
  },
};
