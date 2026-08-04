export interface Testimonial {
  slug: string;
  name: string;
  role: string;
  company: string;
  tag: string;
  headline: string;
  body: string;
  featured?: boolean;
  /** Slug of the full case study on /work/, if one exists for this testimonial. */
  caseStudySlug?: string;
  /** Related capability/industry paths this testimonial supports. */
  relatedHref?: string;
}

export const testimonials: Testimonial[] = [
  {
    slug: "michael-sterling",
    name: "Michael Sterling",
    role: "VP of Sales & Operations",
    company: "Elevate Growth Partners",
    tag: "Lead Routing & CRM Automation",
    headline: "Reduced Our Lead Response Time from 4 Hours to 2 Minutes",
    body: "Before working with them, our sales team was drowning in manual lead assignment and sync issues across our tech stack. They built an automated pipeline using n8n that routes, enriches, and assigns inbound leads instantly. Our conversion rates jumped by 30% within the first month.",
    featured: true,
    caseStudySlug: "elevate-growth-partners",
    relatedHref: "/services/ai-automation/revenue-pipeline-automation/",
  },
  {
    slug: "sarah-lin",
    name: "Sarah Lin",
    role: "Head of Customer Success",
    company: "CloudPulse Technologies",
    tag: "AI Customer Support",
    headline: "Cut Our Support Backlog by 60% Without Adding Headcount",
    body: "The AI triage system is integrated directly into our help desk, categorizing, summarizing, and resolving Tier-1 queries on its own. Our support team can finally focus on enterprise accounts instead of drowning in routine tickets.",
    relatedHref: "/services/ai-automation/conversational-ai-agents/",
  },
  {
    slug: "david-reynolds",
    name: "David Reynolds",
    role: "Chief Operating Officer",
    company: "TradeFlow Global Logistics",
    tag: "Document & Invoice Processing",
    headline: "Flawless PDF & Invoice Extraction System",
    body: "We process hundreds of vendor invoices and logistics documents daily. The custom AI extraction pipeline reads multi-page files and syncs straight to our database in real time — it's virtually eliminated human entry error.",
    relatedHref: "/services/ai-automation/document-data-intelligence/",
  },
  {
    slug: "farhan-malik",
    name: "Farhan Malik",
    role: "Director of Customer Experience",
    company: "OmniRetail Networks",
    tag: "Omnichannel AI Chatbots",
    headline: "Centralized Support Across WhatsApp & Social Media with Deep Complaint Analytics",
    body: "Managing customer inquiries across WhatsApp, Facebook, and Instagram was a nightmare for our support agents. The unified chatbot system now handles routine inquiries and complaint tickets across all three channels automatically — response time is down 70%, and it gives our product team instant operational clarity.",
    caseStudySlug: "omniretail-networks",
    relatedHref: "/services/ai-automation/conversational-ai-agents/",
  },
  {
    slug: "elena-rostova",
    name: "Elena Rostova",
    role: "Growth Marketing Lead",
    company: "Nexus Media Strategy",
    tag: "Outbound Marketing Pipelines",
    headline: "Engineered an Automation System That Scaled Our Outreach Effortlessly",
    body: "The automated lead scoring and campaign workflow transformed our B2B outreach. The integration between our email platforms, CRM, and analytics dashboard runs seamlessly without manual intervention.",
    relatedHref: "/services/ai-automation/revenue-pipeline-automation/",
  },
  {
    slug: "tariq-mahmood",
    name: "Tariq Mahmood",
    role: "Managing Director",
    company: "Flavors Hospitality Group",
    tag: "Restaurant Management & POS",
    headline: "Transformed Our Restaurant Operations During Peak Rush Hours",
    body: "They built a custom restaurant management and POS system designed around our exact kitchen and front-of-house workflow. Kitchen order accuracy is near 100%, and multi-branch live tracking lets us monitor floor activity in real time.",
    caseStudySlug: "flavors-hospitality",
    relatedHref: "/industries/retail-hospitality/",
  },
  {
    slug: "robert-vance",
    name: "Robert Vance",
    role: "Director of Supply Chain",
    company: "Metro Distribution Systems",
    tag: "ERP & Multi-Warehouse Systems",
    headline: "Replaced Three Outdated Tools with One Unified ERP Platform",
    body: "Multi-warehouse inventory tracking was plagued by sync errors before the custom ERP. It's rock-solid now, and gives our execs real-time stock, purchase order, and financial visibility.",
    relatedHref: "/services/web-software/",
  },
];

export function getTestimonial(slug: string): Testimonial | undefined {
  return testimonials.find((t) => t.slug === slug);
}

export function getTestimonialsForCaseStudy(caseStudySlug: string): Testimonial[] {
  return testimonials.filter((t) => t.caseStudySlug === caseStudySlug);
}
