import type { Metadata } from "next";
import { getCaseStudy } from "@/data/work";
import CaseStudy from "@/components/CaseStudy";

const caseStudy = getCaseStudy("numbers-ai")!;

// Intentionally unpublished: not linked from nav, footer, homepage, work
// index, or sitemap.ts — reachable only by direct URL until the
// RBiX-vs-Vision-Plus attribution question in RBIX-REDESIGN-PLAN.md §14
// is resolved. `robots: noindex` is an extra safety net on top of that.
export const metadata: Metadata = {
  title: `${caseStudy.client} — ${caseStudy.title}`,
  description: caseStudy.summary,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CaseStudy caseStudy={caseStudy} />;
}
