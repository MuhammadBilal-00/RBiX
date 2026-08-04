import Link from "next/link";
import type { CaseStudy as CaseStudyData } from "@/data/work";
import type { Testimonial } from "@/data/testimonials";
import TestimonialCard from "@/components/TestimonialCard";
import RevealGroup from "@/components/RevealGroup";
import { industriesNav } from "@/data/nav";

const SERVICE_HUB_HREF: Record<CaseStudyData["serviceTag"], string> = {
  "AI & Automation": "/services/ai-automation/",
  "Web & Custom Software": "/services/web-software/",
  "Mobile Applications": "/services/mobile-apps/",
  "Data Analytics & BI": "/services/data-analytics/",
};

/** Wraps any literal "[TODO: confirm ...]" markers in the visible todo-flag badge. */
function flagTodos(text: string) {
  const parts = text.split(/(\[TODO:[^\]]*\])/g);
  return parts.map((part, i) =>
    part.startsWith("[TODO:") ? (
      <span className="todo-flag" key={i}>{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

interface CaseStudyProps {
  caseStudy: CaseStudyData;
  testimonial?: Testimonial;
}

export default function CaseStudy({ caseStudy, testimonial }: CaseStudyProps) {
  const serviceHref = SERVICE_HUB_HREF[caseStudy.serviceTag];
  const industry = industriesNav.find((i) => i.label === caseStudy.industryTag);
  const unpublished = Boolean(caseStudy.unpublished);

  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb">
            <Link href="/work/">Work</Link><span>/</span>
            <em>{caseStudy.client}</em>
          </p>
          <p className="tag"><span className="sq" aria-hidden="true"></span>{caseStudy.serviceTag}</p>
          {unpublished && <p className="todo-flag">Content pending client sign-off</p>}
          <h1>{caseStudy.title}</h1>
          <p className="pagehead__lede">{flagTodos(caseStudy.summary)}</p>
          {!unpublished && (
            <div className="pagehead__actions">
              <Link className="btn btn--red" href="/contact/">
                Get in Touch
                <span className="btn__ic" aria-hidden="true">
                  <svg viewBox="0 0 12 12" width="11" height="11">
                    <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </Link>
              <Link className="btn btn--line" href="/work/">
                See all work
              </Link>
            </div>
          )}
        </div>
      </header>

      <RevealGroup as="section" className="walk walk--light">
        <div className="wrap">
          <div className="walk__head reveal">
            <p className="tag"><span className="sq" aria-hidden="true"></span>The Problem</p>
            <h2 className="walk__title">Before RBiX</h2>
          </div>
          <div className="prose">
            {caseStudy.problem.map((p, i) => (
              <p className="reveal" key={i}>{flagTodos(p)}</p>
            ))}
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="walk walk--soft">
        <div className="wrap">
          <div className="walk__head reveal">
            <p className="tag"><span className="sq" aria-hidden="true"></span>What We Built</p>
            <h2 className="walk__title">The system</h2>
          </div>
          <div className="prose">
            {caseStudy.build.map((p, i) => (
              <p className="reveal" key={i}>{flagTodos(p)}</p>
            ))}
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="walk walk--ink">
        <div className="wrap">
          <div className="walk__head reveal">
            <p className="tag"><span className="sq" aria-hidden="true"></span>The Result</p>
            <h2 className="walk__title">What changed</h2>
          </div>
          <div className="prose">
            {caseStudy.result.map((p, i) => (
              <p className="reveal" key={i}>{flagTodos(p)}</p>
            ))}
          </div>
          <div className="case-meta reveal">
            {caseStudy.metrics.map((m) => (
              <div key={m.label}>
                <strong>{flagTodos(m.value)}</strong>
                {m.label}
              </div>
            ))}
          </div>
        </div>
      </RevealGroup>

      {testimonial && (
        <RevealGroup as="section" className="testimonials">
          <div className="wrap">
            <div className="testi-grid">
              <div className="reveal reveal--scale">
                <TestimonialCard testimonial={testimonial} featured />
              </div>
            </div>
          </div>
        </RevealGroup>
      )}

      {!unpublished && (
        <section className="walk walk--light">
          <div className="wrap">
            <div className="walk__head">
              <p className="tag"><span className="sq" aria-hidden="true"></span>Related</p>
              <h2 className="walk__title">See the service and industry behind this</h2>
            </div>
            <div className="related-grid">
              <Link className="ind" href={serviceHref}>
                <h3>{caseStudy.serviceTag}</h3>
                <p>See the full service</p>
              </Link>
              {industry ? (
                <Link className="ind" href={industry.href}>
                  <h3>{industry.label}</h3>
                  <p>See industry page</p>
                </Link>
              ) : null}
              <Link className="ind" href="/work/">
                <h3>All work</h3>
                <p>Browse every case study</p>
              </Link>
              <Link className="ind" href="/contact/">
                <h3>Contact</h3>
                <p>Talk about your own workflow</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {!unpublished && (
        <section className="finalcta">
          <div className="wrap">
            <h2>Have a similar workflow?</h2>
            <p>One conversation is enough to find out what&rsquo;s automatable.</p>
            <div className="finalcta__actions">
              <Link className="btn btn--red" href="/contact/">
                Get in Touch
                <span className="btn__ic" aria-hidden="true">
                  <svg viewBox="0 0 12 12" width="11" height="11">
                    <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </Link>
              <Link className="btn btn--line" href="/work/">See all work</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
