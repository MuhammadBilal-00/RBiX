export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  summary: string;
  serviceTag: "AI & Automation" | "Web & Custom Software" | "Mobile Applications" | "Data Analytics & BI";
  industryTag: string;
  problem: string[];
  build: string[];
  result: string[];
  metrics: CaseStudyMetric[];
  testimonialSlug?: string;
  /** When true, this case study is intentionally excluded from nav, footer,
   * and sitemap.ts — reachable only by direct URL — because the underlying
   * attribution/sign-off question in RBIX-REDESIGN-PLAN.md §14 is still open. */
  unpublished?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "elevate-growth-partners",
    client: "Elevate Growth Partners",
    title: "Lead Routing & CRM Automation",
    summary: "An automated pipeline that routes, enriches, and assigns inbound leads instantly — cutting response time from 4 hours to 2 minutes.",
    serviceTag: "AI & Automation",
    industryTag: "Professional Services",
    problem: [
      "Elevate Growth Partners' sales team was drowning in manual lead assignment. Inbound leads sat in a shared inbox for hours before anyone triaged them, and the CRM, ad platforms, and outreach tools it depended on weren't in sync with each other.",
      "By the time a rep actually called a lead, a competitor had often already responded.",
    ],
    build: [
      "An n8n-based automation pipeline that captures leads the moment they arrive, enriches them with firmographic data, scores them, and routes them to the right rep automatically — no manual triage step.",
      "The same pipeline keeps the CRM, ad platforms, and outreach sequencing in sync, so a lead's status is accurate everywhere at once instead of drifting across five disconnected tools.",
    ],
    result: [
      "Lead response time dropped from 4 hours to 2 minutes.",
      "Conversion rates rose 30% in the first month as reps started reaching leads while they were still actively comparing options.",
    ],
    metrics: [
      { value: "4hrs → 2min", label: "Lead response time" },
      { value: "+30%", label: "Conversion rate, first month" },
    ],
    testimonialSlug: "michael-sterling",
  },
  {
    slug: "omniretail-networks",
    client: "OmniRetail Networks",
    title: "Omnichannel AI Chatbots",
    summary: "One unified chatbot handling WhatsApp, Facebook, and Instagram support and complaint triage — with response time down 70%.",
    serviceTag: "AI & Automation",
    industryTag: "Retail & Hospitality",
    problem: [
      "OmniRetail's support agents were managing customer inquiries across WhatsApp, Facebook, and Instagram as three separate, manually-staffed channels. Nothing about a customer's history on one channel carried over to another.",
      "Complaint volume was rising with the brand's growth, and there was no structured way to see which issues were recurring versus one-off.",
    ],
    build: [
      "A unified custom chatbot system deployed across all three channels, sharing one customer context regardless of where the conversation started.",
      "Routine inquiries and complaint tickets are triaged automatically; anything that needs a human is handed off with full conversation history attached, plus categorized analytics on complaint types feeding back to the product team.",
    ],
    result: [
      "Response time across all three channels cut by 70%.",
      "The product team now gets structured, real-time visibility into recurring complaint patterns instead of anecdotal reports.",
    ],
    metrics: [
      { value: "-70%", label: "Response time across channels" },
      { value: "3 → 1", label: "Channels unified into one system" },
    ],
    testimonialSlug: "farhan-malik",
  },
  {
    slug: "flavors-hospitality",
    client: "Flavors Hospitality Group",
    title: "Restaurant Management & POS",
    summary: "A custom POS and restaurant management system built around the real kitchen and front-of-house workflow — order accuracy near 100%.",
    serviceTag: "Web & Custom Software",
    industryTag: "Retail & Hospitality",
    problem: [
      "Flavors Hospitality Group was running peak rush hours on off-the-shelf POS software that didn't match how their kitchens and front-of-house staff actually worked, leading to order errors and no real-time view across branches.",
    ],
    build: [
      "A custom restaurant management and POS system designed around their exact kitchen and front-of-house workflow, rather than forcing the workflow to fit generic software.",
      "Multi-branch live floor tracking gives managers real-time visibility into every location from one dashboard.",
    ],
    result: [
      "Kitchen order accuracy is near 100%, even during peak rush hours.",
      "Managers can monitor floor activity across every branch in real time instead of calling each location individually.",
    ],
    metrics: [
      { value: "~100%", label: "Kitchen order accuracy" },
      { value: "Multi-branch", label: "Live floor tracking" },
    ],
    testimonialSlug: "tariq-mahmood",
  },
  {
    slug: "numbers-ai",
    client: "Numbers AI",
    title: "Conversational Analytics Inside a Live ERP",
    summary: "A financial chatbot embedded directly inside Numbers ERP — ask a plain-language question, get the number, live from production data.",
    serviceTag: "AI & Automation",
    industryTag: "Compliance-driven SMEs",
    problem: [
      "[TODO: confirm] Finance teams using Numbers ERP had to leave the system and build manual reports to answer basic questions about cash position, receivables, or spend by category — even though the data already lived inside the ERP.",
    ],
    build: [
      "A conversational AI agent embedded directly inside Numbers ERP, so a finance user can ask a plain-language question — \"what's our receivables aging over 60 days?\" — and get an answer sourced live from production data, without leaving the system or waiting on a report.",
      "This is the flagship proof point for RBiX's Embedded & Custom AI capability: AI built into the client's own product, not a bolt-on chatbot pointed at a support inbox.",
    ],
    result: [
      "[TODO: confirm — publishable metrics/results pending sign-off]",
    ],
    metrics: [
      { value: "[TODO]", label: "Metric pending confirmation" },
    ],
    unpublished: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Case studies safe to link from nav, footer, homepage, and sitemap.ts. */
export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => !c.unpublished);
}
