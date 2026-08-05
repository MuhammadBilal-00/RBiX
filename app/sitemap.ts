import type { MetadataRoute } from "next";
import { getPublishedCaseStudies } from "@/data/work";
import { industriesNav } from "@/data/nav";

// Required for `output: 'export'` — without this, `next build` fails to
// statically prerender /sitemap.xml.
export const dynamic = "force-static";

const SITE_URL = "https://rbixtechnologies.com";

// Kept in sync by hand with the App Router route tree for Phases 1-3 —
// there are few enough routes this phase that a build-time route scan
// would be more machinery than the problem needs.
const AI_AUTOMATION_CAPABILITY_SLUGS = [
  "conversational-ai-agents",
  "revenue-pipeline-automation",
  "document-data-intelligence",
  "business-process-automation",
  "embedded-custom-ai",
];

const STATIC_ROUTES = [
  "",
  "services/",
  "services/ai-automation/",
  "services/web-software/",
  "services/mobile-apps/",
  "services/data-analytics/",
  "work/",
  "about/",
  "pricing/",
  "contact/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const capabilityRoutes = AI_AUTOMATION_CAPABILITY_SLUGS.map(
    (slug) => `services/ai-automation/${slug}/`
  );

  // Numbers AI is intentionally excluded here — see data/work.ts `unpublished`
  // flag and RBIX-REDESIGN-PLAN.md §14 (attribution sign-off still open).
  const workRoutes = getPublishedCaseStudies().map((c) => `work/${c.slug}/`);

  // The 8 legacy static industry pages, sourced from the nav data so this
  // list can't drift from what the site actually links to.
  const industryRoutes = industriesNav.map((i) => i.href.replace(/^\//, ""));

  const allRoutes = [...STATIC_ROUTES, ...capabilityRoutes, ...workRoutes, ...industryRoutes];

  const buildDate = new Date();

  return allRoutes.map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: buildDate,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
