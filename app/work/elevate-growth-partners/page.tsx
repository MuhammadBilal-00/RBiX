import type { Metadata } from "next";
import { getCaseStudy } from "@/data/work";
import { getTestimonial } from "@/data/testimonials";
import CaseStudy from "@/components/CaseStudy";

const caseStudy = getCaseStudy("elevate-growth-partners")!;

export const metadata: Metadata = {
  title: `${caseStudy.client} — ${caseStudy.title}`,
  description: caseStudy.summary,
};

export default function Page() {
  const testimonial = caseStudy.testimonialSlug ? getTestimonial(caseStudy.testimonialSlug) : undefined;
  return <CaseStudy caseStudy={caseStudy} testimonial={testimonial} />;
}
