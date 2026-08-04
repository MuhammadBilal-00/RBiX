import Link from "next/link";
import { getTestimonial } from "@/data/testimonials";
import { getCaseStudy } from "@/data/work";
import TestimonialCard from "@/components/TestimonialCard";

export interface CapabilityPageProps {
  breadcrumbTrail: { label: string; href?: string }[];
  tag?: string;
  title: string;
  lede: string;
  metaRow: { label: string; value: string }[];
  problem: { paragraphs: string[] };
  whatWeBuild: { intro: string; items: { title: string; body: string }[] };
  whatWeConnect: { intro: string; items: string[] };
  dontSeeWorkflow: { body: string };
  testimonialSlug?: string;
  relatedCaseStudySlug?: string;
  faq: { q: string; a: string }[];
  siblingLinks: { label: string; href: string; blurb?: string }[];
  parentHub: { label: string; href: string };
  finalCta?: { title: string; body: string };
}

function ArrowIcon() {
  return (
    <span className="btn__ic" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="11" height="11">
        <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

/**
 * Props-driven template for a Tier-2 AI & Automation capability page
 * (plan §6). Section order: pagehead -> problem -> what we build ->
 * what we can connect to -> testimonial/case study -> don't see your
 * workflow -> FAQ -> cross-links -> final CTA.
 */
export default function CapabilityPage({
  breadcrumbTrail,
  tag = "AI & Automation",
  title,
  lede,
  metaRow,
  problem,
  whatWeBuild,
  whatWeConnect,
  dontSeeWorkflow,
  testimonialSlug,
  relatedCaseStudySlug,
  faq,
  siblingLinks,
  parentHub,
  finalCta,
}: CapabilityPageProps) {
  const testimonial = testimonialSlug ? getTestimonial(testimonialSlug) : undefined;
  const rawCaseStudy = relatedCaseStudySlug ? getCaseStudy(relatedCaseStudySlug) : undefined;
  // Defensive: never surface a case study link if it's marked unpublished,
  // regardless of what a data entry passes in (see RBIX-REDESIGN-PLAN.md §14 —
  // Numbers AI attribution sign-off is still an open question).
  const caseStudy = rawCaseStudy && !rawCaseStudy.unpublished ? rawCaseStudy : undefined;

  return (
    <>
      {/* ══════════════ PAGEHEAD ══════════════ */}
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb">
            {breadcrumbTrail.map((crumb, i) => (
              <span key={crumb.label} style={{ display: "contents" }}>
                {i > 0 && <span>/</span>}
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <em>{crumb.label}</em>}
              </span>
            ))}
          </p>
          <p className="tag"><span className="sq"></span>{tag}</p>
          <h1>{title}</h1>
          <p className="pagehead__lede">{lede}</p>
          <div className="pagehead__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <ArrowIcon />
            </Link>
            <a className="btn btn--line" href="#build">See what we build</a>
          </div>
          <div className="pagehead__meta">
            {metaRow.map((item) => (
              <div key={item.label}>
                <strong>{item.label}</strong>
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════════ THE PROBLEM ══════════════ */}
      <section className="walk walk--light">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag"><span className="sq"></span>The Problem</p>
            <h2 className="walk__title">Where this quietly costs you.</h2>
          </div>
          <div className="prose">
            {problem.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHAT WE BUILD MOST OFTEN ══════════════ */}
      <section className="walk walk--soft" id="build">
        <div className="wrap">
          <div className="walk__head">
            <p className="tag"><span className="sq"></span>What We Build Most Often</p>
            <h2 className="walk__title">{whatWeBuild.intro}</h2>
            <p className="walk__lede">These are the builds we&rsquo;re asked for most. They&rsquo;re a starting point, not a menu.</p>
          </div>
          <div className="cards cards--flow">
            {whatWeBuild.items.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHAT WE CAN CONNECT TO ══════════════ */}
      <section className="walk walk--light">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag"><span className="sq"></span>What We Can Connect To</p>
            <h2 className="walk__title">{whatWeConnect.intro}</h2>
            <p className="walk__lede">Your case is probably in scope, even if it&rsquo;s not on this list.</p>
          </div>
          <ul className="points">
            {whatWeConnect.items.map((item) => (
              <li key={item}><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════════ TESTIMONIAL / RELATED CASE STUDY ══════════════ */}
      {(testimonial || caseStudy) && (
        <section className="walk walk--soft">
          <div className="wrap">
            <div className="walk__head">
              <p className="tag"><span className="sq"></span>Client Results</p>
              <h2 className="walk__title">What clients say about this.</h2>
            </div>
            {testimonial && (
              <div className="testi-grid">
                <TestimonialCard testimonial={testimonial} featured />
              </div>
            )}
            {caseStudy && (
              <p style={{ marginTop: 28 }}>
                <Link className="btn btn--line" href={`/work/${caseStudy.slug}/`}>
                  Read the full {caseStudy.client} case study
                  <ArrowIcon />
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      {/* ══════════════ DON'T SEE YOUR WORKFLOW? ══════════════ */}
      <section className="walk walk--ink">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag"><span className="sq"></span>Not On The List?</p>
            <h2 className="walk__title">Don&rsquo;t see your workflow?</h2>
          </div>
          <div className="prose">
            <p>{dontSeeWorkflow.body}</p>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="walk walk--light">
        <div className="wrap">
          <div className="walk__head">
            <p className="tag"><span className="sq"></span>FAQ</p>
            <h2 className="walk__title">Common questions about {title.toLowerCase()}.</h2>
          </div>
          <div className="faq">
            {faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CROSS-LINKS ══════════════ */}
      <section className="walk walk--soft">
        <div className="wrap">
          <div className="walk__head">
            <p className="tag"><span className="sq"></span>Related</p>
            <h2 className="walk__title">Explore the rest of {parentHub.label}.</h2>
          </div>
          <div className="related-grid">
            {siblingLinks.map((link) => (
              <Link className="ind" href={link.href} key={link.href}>
                <h3>{link.label}</h3>
                {link.blurb && <p>{link.blurb}</p>}
              </Link>
            ))}
            <Link className="ind" href={parentHub.href}>
              <h3>{parentHub.label}</h3>
              <p>Back to the hub</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="finalcta">
        <div className="wrap">
          <h2>{finalCta?.title ?? "Is this workflow costing you right now?"}</h2>
          <p>{finalCta?.body ?? "One conversation is enough to find out — and to scope the first build."}</p>
          <div className="finalcta__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <ArrowIcon />
            </Link>
            <a className="btn-link" href="tel:+447737641862">or call +44 7737 641862</a>
          </div>
        </div>
      </section>
    </>
  );
}
