import Link from "next/link";
import RevealGroup from "@/components/RevealGroup";
import TestimonialCard from "@/components/TestimonialCard";
import { getTestimonial } from "@/data/testimonials";
import { industriesNav, contactInfo } from "@/data/nav";
import type { IndustryPageData } from "@/data/industries";

function ArrowIcon() {
  return (
    <span className="btn__ic" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="11" height="11">
        <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

/** The four pixel-cube glyphs, keyed by service line. */
function Glyph({ name, className }: { name: IndustryPageData["services"][number]["glyph"]; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="22" height="22" aria-hidden="true">
      {name === "ai" && (
        <>
          <rect x="40" y="0" width="20" height="20" />
          <rect x="0" y="40" width="20" height="20" />
          <rect className="red" x="40" y="40" width="20" height="20" />
          <rect x="80" y="40" width="20" height="20" />
          <rect x="40" y="80" width="20" height="20" />
        </>
      )}
      {name === "web" && (
        <>
          <rect x="0" y="0" width="20" height="20" />
          <rect x="80" y="0" width="20" height="20" />
          <rect x="0" y="80" width="20" height="20" />
          <rect className="red" x="80" y="80" width="20" height="20" />
        </>
      )}
      {name === "mobile" && (
        <>
          <rect x="40" y="0" width="20" height="20" />
          <rect x="40" y="40" width="20" height="20" />
          <rect className="red" x="40" y="80" width="20" height="20" />
        </>
      )}
      {name === "data" && (
        <>
          <rect x="0" y="80" width="20" height="20" />
          <rect x="40" y="40" width="20" height="20" />
          <rect className="red" x="80" y="0" width="20" height="20" />
        </>
      )}
    </svg>
  );
}

/**
 * Props-driven template for the 8 sector pages. Each industry keeps its own
 * copy; only the structure is shared. Section order: pagehead -> challenge ->
 * relevant services -> why it matters -> client results (optional) ->
 * related industries -> final CTA.
 */
export default function IndustryPage({ data }: { data: IndustryPageData }) {
  const testimonials = (data.testimonials ?? []).map(getTestimonial).filter(Boolean);

  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#industries">Industries</Link>
            <span>/</span>
            <em>{data.label}</em>
          </p>
          <p className="tag"><span className="sq" aria-hidden="true"></span>Industry</p>
          <h1>{data.label}</h1>
          <p className="pagehead__lede">{data.lede}</p>
          <div className="pagehead__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <ArrowIcon />
            </Link>
            <a className="btn btn--line" href="#services">See relevant services</a>
          </div>
          <div className="pagehead__meta">
            {data.meta.map((item) => (
              <div key={item.label}>
                <strong>{item.label}</strong>
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </header>

      <RevealGroup as="section" className="walk walk--light">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag reveal"><span className="sq" aria-hidden="true"></span>The Challenge</p>
            <h2 className="walk__title reveal">{data.challenge.title}</h2>
          </div>
          <div className="prose">
            {data.challenge.paragraphs.map((p, i) => (
              <p className="reveal" key={i}>{p}</p>
            ))}
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="walk walk--soft" id="services">
        <div className="wrap">
          <div className="walk__head">
            <p className="tag reveal"><span className="sq" aria-hidden="true"></span>Built For This Industry</p>
            <h2 className="walk__title reveal">{data.servicesTitle}</h2>
          </div>
          <div className="cards">
            {data.services.map((service) => (
              <Link className={`card reveal${service.ink ? " card--ink" : ""}`} href={service.href} key={service.label}>
                <Glyph name={service.glyph} className="card__glyph" />
                <h3>{service.label}</h3>
                <p>{service.body}</p>
                <span className="card__more">
                  See the full service
                  <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                    <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="walk walk--ink">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag reveal"><span className="sq" aria-hidden="true"></span>Why It Matters</p>
            <h2 className="walk__title reveal">{data.whyTitle}</h2>
          </div>
          <ul className="points">
            {data.why.map((point) => (
              <li className="reveal" key={point.strong}>
                <strong>{point.strong}</strong>
                <span>{point.span}</span>
              </li>
            ))}
          </ul>
        </div>
      </RevealGroup>

      {testimonials.length > 0 && (
        <RevealGroup as="section" className="walk walk--soft">
          <div className="wrap">
            <div className="walk__head">
              <p className="tag reveal"><span className="sq" aria-hidden="true"></span>Client Results</p>
              <h2 className="walk__title reveal">What {data.label.toLowerCase()} clients say.</h2>
            </div>
            <div className="testi-grid">
              {testimonials.map((t, i) =>
                t ? (
                  <div className={`reveal${i === 0 && testimonials.length === 1 ? " reveal--scale" : ""}`} key={t.slug}>
                    <TestimonialCard testimonial={t} featured={i === 0} />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </RevealGroup>
      )}

      <RevealGroup as="section" className="industries">
        <div className="wrap">
          <h2 className="section__title reveal">Explore more industries.</h2>
          <div className="ind-grid">
            {industriesNav.map((ind) =>
              ind.href === `/industries/${data.slug}/` ? (
                <div className="ind ind--current reveal" key={ind.href} aria-current="page">
                  <h3>{ind.label}</h3>
                  {ind.blurb && <p>{ind.blurb}</p>}
                </div>
              ) : (
                <Link className="ind reveal" href={ind.href} key={ind.href}>
                  <h3>{ind.label}</h3>
                  {ind.blurb && <p>{ind.blurb}</p>}
                </Link>
              )
            )}
          </div>
        </div>
      </RevealGroup>

      <section className="finalcta">
        <div className="wrap">
          <h2>{data.cta.title}</h2>
          <p>{data.cta.body}</p>
          <div className="finalcta__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <ArrowIcon />
            </Link>
            <a className="btn-link" href={`tel:${contactInfo.ukPhone.replace(/\s/g, "")}`}>
              or call {contactInfo.ukPhoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
