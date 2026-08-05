import Link from "next/link";
import IntroVideo from "@/components/IntroVideo";
import RevealGroup from "@/components/RevealGroup";
import PinnedCards from "@/components/PinnedCards";
import BrandMark from "@/components/BrandMark";
import { industriesNav, contactInfo } from "@/data/nav";
import { getPublishedCaseStudies } from "@/data/work";

function ArrowIcon() {
  return (
    <span className="btn__ic" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="11" height="11">
        <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

const industryBlurbs: Record<string, string> = {
  "Clinics & Aesthetics": "Dental, cosmetic, aesthetic & veterinary practices",
  "Real Estate": "Brokerages and property / facility management firms",
  "E-commerce": "Direct-to-consumer and retail brands selling online",
  "Home & Field Services": "Contractors, inspection and maintenance businesses",
  "Professional Services": "Accounting, bookkeeping and legal practices",
  Construction: "Firms managing tenders, site work and certifications",
  "Retail & Hospitality": "Multi-branch retail, salons, appointment-based venues",
  "Compliance-driven SMEs": "Invoicing, tax and regulatory deadline management",
};

const proofStats = [
  { num: "4hrs → 2min", label: "Lead response time" },
  { num: "+30%", label: "Conversion lift, first month" },
  { num: "-70%", label: "Support response time" },
  { num: "~100%", label: "Kitchen order accuracy" },
];

const caseStudies = getPublishedCaseStudies();

export default function HomePage() {
  return (
    <>
      <IntroVideo />

      <PinnedCards
        heading={<h2 className="section__title">Four capabilities.<br />One stack.</h2>}
        titles={["AI & Automation", "Web & Custom Software", "Mobile Applications", "Data Analytics & BI"]}
      >
        {[
          (
            <Link key="ai-automation" className="card card--ink" href="/services/ai-automation/">
              <span className="card__index" aria-hidden="true">01</span>
              <svg className="card__glyph" viewBox="0 0 100 100" width="32" height="32" aria-hidden="true">
                <rect x="40" y="0" width="20" height="20" /><rect x="0" y="40" width="20" height="20" />
                <rect className="red" x="40" y="40" width="20" height="20" /><rect x="80" y="40" width="20" height="20" />
                <rect x="40" y="80" width="20" height="20" />
              </svg>
              <h3>AI &amp; Automation</h3>
              <p>Systems that respond to leads, reduce no-shows, recover lost revenue, and remove manual data entry. The foundation of every engagement.</p>
              <p className="card__stat"><span className="sq"></span>60-second average lead response time</p>
              <ul>
                <li>Lead Response Engine: qualified WhatsApp/SMS reply in 60s, 24/7</li>
                <li>No-Show Reduction Flow: 48h / 24h / 2h reminders, one-tap confirm</li>
                <li>E-commerce Recovery: abandoned carts &amp; COD confirmation</li>
                <li>Invoice OCR, Payment Chaser &amp; Compliance Tracker</li>
              </ul>
              <span className="card__more">
                See the full service
                <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                  <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </Link>
          ),
          (
            <Link key="web-software" className="card" href="/services/web-software/">
              <span className="card__index" aria-hidden="true">02</span>
              <svg className="card__glyph" viewBox="0 0 100 100" width="32" height="32" aria-hidden="true">
                <rect x="0" y="0" width="20" height="20" /><rect x="80" y="0" width="20" height="20" />
                <rect x="0" y="80" width="20" height="20" /><rect className="red" x="80" y="80" width="20" height="20" />
              </svg>
              <h3>Web &amp; Custom Software</h3>
              <p>From conversion-focused websites to internal operating systems that replace spreadsheets and disconnected SaaS tools.</p>
              <p className="card__stat"><span className="sq"></span>Built against your real data from day one</p>
              <ul>
                <li>Conversion-focused business websites wired to automation</li>
                <li>E-commerce storefronts: Salla, Zid, Shopify, headless</li>
                <li>Practice / clinic management &amp; broker lead-desk CRMs</li>
                <li>ERP-lite dashboards &amp; client self-service portals</li>
              </ul>
              <span className="card__more">
                See the full service
                <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                  <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </Link>
          ),
          (
            <Link key="mobile-apps" className="card" href="/services/mobile-apps/">
              <span className="card__index" aria-hidden="true">03</span>
              <svg className="card__glyph" viewBox="0 0 100 100" width="32" height="32" aria-hidden="true">
                <rect x="40" y="0" width="20" height="20" /><rect x="40" y="40" width="20" height="20" />
                <rect className="red" x="40" y="80" width="20" height="20" />
              </svg>
              <h3>Mobile Applications</h3>
              <p>Purpose-built apps for field teams and distributed staff, including offline-first support where connectivity can&apos;t be guaranteed.</p>
              <p className="card__stat"><span className="sq"></span>Works fully offline, syncs when back in range</p>
              <ul>
                <li>Field service &amp; inspection app: offline checklists</li>
                <li>GPS- and time-stamped photos, auto-sync in signal range</li>
                <li>Staff operations app: rosters, tasks, clock-in/out</li>
                <li>Real-time completion status for managers</li>
              </ul>
              <span className="card__more">
                See the full service
                <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                  <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </Link>
          ),
          (
            <Link key="data-analytics" className="card" href="/services/data-analytics/">
              <span className="card__index" aria-hidden="true">04</span>
              <svg className="card__glyph" viewBox="0 0 100 100" width="32" height="32" aria-hidden="true">
                <rect x="0" y="80" width="20" height="20" /><rect x="40" y="40" width="20" height="20" />
                <rect className="red" x="80" y="0" width="20" height="20" />
              </svg>
              <h3>Data Analytics &amp; BI</h3>
              <p>Dashboards that turn scattered data into a single, daily-updated view of marketing, cash flow, and staff output.</p>
              <p className="card__stat"><span className="sq"></span>Dashboards updated daily, not monthly</p>
              <ul>
                <li>Revenue &amp; marketing attribution: cost-per-lead by channel</li>
                <li>Financial health: cash flow, receivables aging, profitability</li>
                <li>Staff / agent performance: response time &amp; conversion</li>
                <li>Weekly leaderboards and individual scorecards</li>
              </ul>
              <span className="card__more">
                See the full service
                <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                  <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </Link>
          ),
        ]}
      </PinnedCards>

      <RevealGroup as="section" className="walk walk--soft">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag reveal"><span className="sq"></span>The Differentiator</p>
            <h2 className="walk__title reveal">What we build differently</h2>
            <p className="walk__lede reveal">
              Most agencies build the system and stop there. We build the intelligence into it —
              {/* [TODO: confirm] "100+ clients" / Vision Plus production-ERP attribution is
                  not independently verified content; confirm before publishing at scale. */}
              {" "}RBiX has embedded AI into production ERP, HMIS, and accounting systems serving 100+ clients.
              That background is what makes this credible rather than aspirational.
            </p>
          </div>
          <ul className="points">
            <li className="reveal">
              <strong>Copilots inside the systems we build</strong>
              <span>Not a chatbot bolted onto a support inbox — an assistant wired into your own ERP, CRM, or internal tool.</span>
            </li>
            <li className="reveal">
              <strong>Natural-language search over your own data</strong>
              <span>Ask a plain-language question about your business and get an answer sourced from your live records.</span>
            </li>
            <li className="reveal">
              <strong>Forecasting and anomaly detection where it matters</strong>
              <span>Cash flow, receivables, and operational metrics flagged before they become a problem, not after.</span>
            </li>
          </ul>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="approach" id="approach">
        <div className="wrap approach__grid">
          <div className="approach__head">
            <h2 className="section__title reveal">Automation first.<br />Software when it&apos;s earned.</h2>
            <p className="approach__note reveal">Every engagement includes a working automation or system, not just a proposal.</p>
          </div>
          <div className="steps">
            <div className="step reveal">
              <span className="step__num">1</span>
              <h3>Automate</h3>
              <p>Every engagement leads with AI &amp; Automation, the fastest path to a measurable result, usually inside the first few weeks.</p>
            </div>
            <div className="step reveal">
              <span className="step__num">2</span>
              <h3>Measure</h3>
              <p>Data analytics rides along as the retention layer, giving owners visibility into exactly what the automation is producing.</p>
            </div>
            <div className="step reveal">
              <span className="step__num">3</span>
              <h3>Scale</h3>
              <p>Custom software and mobile apps come in once a workflow has proven itself and needs a dedicated system of its own.</p>
            </div>
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="industries" id="industries">
        <div className="wrap">
          <h2 className="section__title reveal">Built around a reusable core,<br />adapted to your workflow.</h2>
          <div className="ind-grid">
            {industriesNav.map((ind) => (
              <Link key={ind.href} className="ind reveal" href={ind.href}>
                <h3>{ind.label}</h3>
                <p>{industryBlurbs[ind.label]}</p>
              </Link>
            ))}
          </div>
        </div>
      </RevealGroup>

      {/* outcome stats sit directly above the case studies they headline */}
      <section className="proof-strip">
        <div className="wrap">
          <div className="proof-grid">
            {proofStats.map((s) => (
              <div key={s.label}>
                <div className="proof-stat__num">{s.num}</div>
                <div className="proof-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RevealGroup as="section" className="testimonials" id="work">
        <div className="wrap">
          <h2 className="section__title reveal">What we&apos;ve shipped,<br />and what it moved.</h2>
          <div className="cards cards--flow">
            {caseStudies.map((c) => (
              <article key={c.slug} className="card reveal">
                <p className="tag"><span className="sq"></span>{c.serviceTag}</p>
                <h3>{c.client}</h3>
                <p>{c.summary}</p>
                <ul>
                  {c.metrics.map((m) => (
                    <li key={m.label}><strong>{m.value}</strong> — {m.label}</li>
                  ))}
                </ul>
                <Link className="card__more" href={`/work/${c.slug}/`}>
                  Read the case study
                  <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                    <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
          <Link className="btn btn--line" href="/work/" style={{ marginTop: "clamp(32px,4vw,48px)" }}>
            See all work
          </Link>
        </div>
      </RevealGroup>

      <section className="contact-band" id="contact">
        <div className="contact-band__divider" aria-hidden="true"></div>
        <div className="wrap contact-band__inner">
          <div className="contact-band__brand">
            <BrandMark size={88} />
            <span className="contact-band__wordmark">RB<span className="dotless">ı</span>X</span>
          </div>
          <h2>Let&apos;s automate<br />something real.</h2>
          <p className="contact-band__sub">One conversation is enough to find the workflow costing you the most.</p>
          <div className="contact-band__actions">
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
