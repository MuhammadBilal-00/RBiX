import type { Metadata } from "next";
import Link from "next/link";
import RevealGroup from "@/components/RevealGroup";
import { aiAutomationCapabilities, capabilityPages } from "@/data/capabilities";
import { getCaseStudy } from "@/data/work";

export const metadata: Metadata = {
  title: "AI & Automation Services",
  description:
    "Five capabilities, not a fixed deliverable list: conversational agents, pipeline automation, document intelligence, business process automation, and embedded AI — the foundation of every RBiX engagement.",
};

function ArrowIcon() {
  return (
    <span className="btn__ic" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="11" height="11">
        <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

export default function Page() {
  const featured = getCaseStudy("elevate-growth-partners");

  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services/">Services</Link>
            <span>/</span>
            <em>AI &amp; Automation</em>
          </p>
          <p className="tag">
            <span className="sq"></span>Service
          </p>
          <h1>AI &amp; Automation</h1>
          <p className="pagehead__lede">
            Not a fixed list of seven flows — five capabilities broad enough to absorb whatever
            repetitive, rule-based problem you actually have. If your case isn&rsquo;t on a page yet,
            it&rsquo;s almost certainly inside one of these five.
          </p>
          <div className="pagehead__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <ArrowIcon />
            </Link>
            <Link className="btn btn--line" href="/services/">
              All services
            </Link>
          </div>
          <div className="pagehead__meta">
            <div>
              <strong>Time to first result</strong>Usually inside the first few weeks, not months.
            </div>
            <div>
              <strong>Best for</strong>Any business losing revenue to slow manual follow-up, chasing
              overdue invoices, or re-keying data by hand.
            </div>
            <div>
              <strong>Where it sits</strong>The layer everything else is built on.
            </div>
          </div>
        </div>
      </header>

      <RevealGroup as="section" className="services">
        <div className="wrap">
          <h2 className="section__title reveal">Five capabilities.<br />One layer.</h2>
          <div className="cards cards--flow">
            {aiAutomationCapabilities.map((cap) => (
              <article className="card reveal" key={cap.slug}>
                <h3>{cap.label}</h3>
                <p>{cap.blurb}</p>
                <ul>
                  {/* headline systems from the capability's own detail page */}
                  {capabilityPages[cap.slug].whatWeBuild.items.slice(0, 3).map((item) => (
                    <li key={item.title}>{item.title}</li>
                  ))}
                </ul>
                <Link className="card__more" href={`/services/ai-automation/${cap.slug}/`}>
                  See the full capability
                  <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                    <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </RevealGroup>

      {featured && (
        <RevealGroup as="section" className="testimonials">
          <div className="wrap">
            <h2 className="section__title reveal">Proof, not promises.</h2>
            <div className="testi-grid">
              <article className="testi testi--featured reveal">
                <p className="testi__tag">
                  <span className="sq"></span>
                  {featured.title}
                </p>
                <p className="testi__headline">{featured.summary}</p>
                <p className="testi__body">{featured.result.join(" ")}</p>
                <footer className="testi__meta">
                  <span className="testi__name">{featured.client}</span>
                </footer>
              </article>
            </div>
            <div className="pagehead__actions" style={{ marginTop: 32 }}>
              <Link className="btn btn--line" href={`/work/${featured.slug}/`}>
                Read the full case study
              </Link>
            </div>
          </div>
        </RevealGroup>
      )}

      <section className="finalcta">
        <div className="wrap">
          <h2>Which workflow is costing you the most?</h2>
          <p>One conversation is enough to find out — and to scope the first automation.</p>
          <div className="finalcta__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
