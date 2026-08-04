import Link from "next/link";
import RevealGroup from "@/components/RevealGroup";
import { industriesNav } from "@/data/nav";
import { getTestimonial } from "@/data/testimonials";

export interface ServiceHubStubProps {
  title: string;
  lede: string;
  meta: { label: string; value: string }[];
  tiles: { title: string; body: string }[];
  aiAdds: { title: string; body: string };
  testimonialSlugs?: string[];
  ctaTitle: string;
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
 * Lighter template for the 3 service lines whose own capability pages are
 * Phase 4 — routes and testimonials only this phase, Tier-1 names shown as
 * non-clickable tiles (.card--soon) rather than dead links.
 */
export default function ServiceHubStub({
  title,
  lede,
  meta,
  tiles,
  aiAdds,
  testimonialSlugs = [],
  ctaTitle,
}: ServiceHubStubProps) {
  const testimonials = testimonialSlugs.map(getTestimonial).filter(Boolean);

  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services/">Services</Link>
            <span>/</span>
            <em>{title}</em>
          </p>
          <p className="tag">
            <span className="sq"></span>Service
          </p>
          <h1>{title}</h1>
          <p className="pagehead__lede">{lede}</p>
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
            {meta.map((m) => (
              <div key={m.label}>
                <strong>{m.label}</strong>
                {m.value}
              </div>
            ))}
          </div>
        </div>
      </header>

      <RevealGroup as="section" className="services">
        <div className="wrap">
          <h2 className="section__title reveal">Where this capability shows up</h2>
          <div className="cards cards--flow">
            {tiles.map((tile) => (
              <article className="card card--soon reveal" key={tile.title}>
                <h3>{tile.title}</h3>
                <p>{tile.body}</p>
                <span className="card__more">Detail page coming soon</span>
              </article>
            ))}
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="walk walk--soft">
        <div className="wrap walk__grid2">
          <div className="reveal">
            <p className="tag">
              <span className="sq"></span>What AI adds
            </p>
            <h2 className="walk__title">{aiAdds.title}</h2>
          </div>
          <div className="prose reveal">
            <p>{aiAdds.body}</p>
          </div>
        </div>
      </RevealGroup>

      {testimonials.length > 0 && (
        <RevealGroup as="section" className="testimonials">
          <div className="wrap">
            <h2 className="section__title reveal">What clients say</h2>
            <div className="testi-grid">
              {testimonials.map((t, i) =>
                t ? (
                  <article className={`testi reveal${i === 0 && testimonials.length === 1 ? " testi--featured" : ""}`} key={t.slug}>
                    <p className="testi__tag">
                      <span className="sq"></span>
                      {t.tag}
                    </p>
                    <p className="testi__headline">&ldquo;{t.headline}&rdquo;</p>
                    <p className="testi__body">{t.body}</p>
                    <footer className="testi__meta">
                      <span className="testi__name">{t.name}</span>
                      <span className="testi__role">
                        {t.role}, {t.company}
                      </span>
                    </footer>
                  </article>
                ) : null
              )}
            </div>
          </div>
        </RevealGroup>
      )}

      <RevealGroup as="section" className="industries">
        <div className="wrap">
          <h2 className="section__title reveal">Built around a reusable core, adapted to your workflow.</h2>
          <div className="ind-grid">
            {industriesNav.map((ind) => (
              <Link className="ind reveal" href={ind.href} key={ind.href}>
                <h3>{ind.label}</h3>
                {ind.blurb && <p>{ind.blurb}</p>}
              </Link>
            ))}
          </div>
        </div>
      </RevealGroup>

      <section className="finalcta">
        <div className="wrap">
          <h2>{ctaTitle}</h2>
          <p>One conversation is enough to find the workflow costing you the most.</p>
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
