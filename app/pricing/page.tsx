import Link from "next/link";
import RevealGroup from "@/components/RevealGroup";
import { servicesNav } from "@/data/nav";

export const metadata = {
  title: "Pricing",
  description:
    "How RBiX prices AI & Automation, Web & Custom Software, Mobile Applications, and Data Analytics engagements — scope-based bands, not a fixed rate card.",
};

const PRICING_DETAIL: Record<string, { note: string; body: string }> = {
  "AI & Automation": {
    note: "Build + monthly retainer",
    body: "Price scales with how many systems the workflow has to talk to, how much custom logic sits beyond off-the-shelf integrations, and how much historical data needs cleaning up before automation can run against it reliably.",
  },
  "Web & Custom Software": {
    note: "One-time build, retainer optional",
    body: "Driven mainly by the number of user roles and permission levels, whether payments or e-commerce are involved, and how much custom backend logic sits behind the interface rather than a template.",
  },
  "Mobile Applications": {
    note: "One-time build, retainer optional",
    body: "Shaped by whether you need one platform or both iOS and Android, how much offline functionality is required, and how many third-party services — maps, payments, push — it needs to integrate with.",
  },
  "Data Analytics & BI": {
    note: "Monthly retainer",
    body: "Depends on the number of data sources being unified, how much historical data needs backfilling, and whether daily refreshes are enough or the dashboard needs to update in real time.",
  },
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

export default function PricingPage() {
  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <em>Pricing</em>
          </p>
          <p className="tag">
            <span className="sq"></span>Pricing
          </p>
          <h1>Pricing that starts with your problem, not a rate card.</h1>
          <p className="pagehead__lede">
            Every engagement is scoped around the specific workflow or system you need. The bands
            below are a starting point for budgeting, not a menu — final pricing depends on scope,
            integrations, and timeline.
          </p>
        </div>
      </header>

      <RevealGroup as="section" className="walk walk--light">
        <div className="wrap">
          <div className="pricing-grid">
            {servicesNav.map((service) => {
              const detail = PRICING_DETAIL[service.label];
              return (
                <article className="price-card reveal" key={service.href}>
                  <h3>{service.label}</h3>
                  {/* price-card__figure returns here once starting-from bands are confirmed */}
                  <p className="price-card__note">{detail.note}</p>
                  <p className="price-card__body">{detail.body}</p>
                  <Link className="btn btn--line" href="/contact/">
                    Get a quote
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="walk walk--soft">
        <div className="wrap">
          <div className="walk__head">
            <p className="tag reveal">
              <span className="sq"></span>How pricing works
            </p>
            <h2 className="walk__title reveal">No fixed packages — scope-driven bands instead.</h2>
          </div>
          <ul className="points">
            <li className="reveal">
              <strong>How quoting works</strong>
              <span>
                Every engagement starts with a short scoping call. From there we send either a
                fixed price for well-defined work, or a banded estimate when scope depends on
                integrations we haven&rsquo;t seen yet.
              </span>
            </li>
            <li className="reveal">
              <strong>Why some lines carry a retainer</strong>
              <span>
                Anything with an ongoing monitoring or support component — automation workflows,
                live dashboards — is priced as a build plus a monthly retainer, rather than a
                one-time fee, so it keeps running and gets maintained after launch.
              </span>
            </li>
            <li className="reveal">
              <strong>Custom software and mobile scope varies the most</strong>
              <span>
                It&rsquo;s priced after a short technical discovery call, once real requirements —
                roles, integrations, platforms — are known.
              </span>
            </li>
          </ul>
        </div>
      </RevealGroup>

      <section className="finalcta">
        <div className="wrap">
          <h2>Ready to scope yours?</h2>
          <p>Tell us the workflow or system costing you the most — we&rsquo;ll turn it into a real number.</p>
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
