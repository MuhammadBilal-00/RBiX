import type { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/data/testimonials";
import { getPublishedCaseStudies } from "@/data/work";
import TestimonialCard from "@/components/TestimonialCard";
import WorkFilters from "@/components/WorkFilters";

export const metadata: Metadata = {
  title: "Work",
  description:
    "What clients say after RBiX ships — real case studies across AI automation, custom software, and operations, with the numbers that changed.",
};

const quoteWall = testimonials.filter((t) => !t.caseStudySlug);
const publishedCaseStudies = getPublishedCaseStudies();

export default function WorkIndexPage() {
  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb"><Link href="/">Home</Link><span>/</span><em>Work</em></p>
          <p className="tag"><span className="sq" aria-hidden="true"></span>Work</p>
          <h1>What we&apos;ve shipped, and what it moved.</h1>
          <p className="pagehead__lede">
            Every engagement here started as a specific, named problem — a slow lead response,
            a support inbox spread across three channels, a POS that didn&apos;t match the kitchen.
            These are the systems we built and the numbers that changed afterward.
          </p>
        </div>
      </header>

      <section className="services">
        <div className="wrap">
          <WorkFilters caseStudies={publishedCaseStudies} />
        </div>
      </section>

      <section className="testimonials">
        <div className="wrap">
          <h2 className="section__title">More client results</h2>
          <div className="testi-grid">
            {quoteWall.map((t) => (
              <TestimonialCard testimonial={t} key={t.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="finalcta">
        <div className="wrap">
          <h2>Want to be the next one?</h2>
          <p>One conversation is enough to find the workflow costing you the most.</p>
          <div className="finalcta__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <span className="btn__ic" aria-hidden="true">
                <svg viewBox="0 0 12 12" width="11" height="11">
                  <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
