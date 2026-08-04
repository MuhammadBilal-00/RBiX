import type { Metadata } from "next";
import Link from "next/link";
import RevealGroup from "@/components/RevealGroup";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four capabilities, one delivery stack: AI & Automation, Web & Custom Software, Mobile Applications, and Data Analytics & BI.",
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

const SERVICE_LINES = [
  {
    href: "/services/ai-automation/",
    title: "AI & Automation",
    ink: true,
    body: "Systems that respond to leads, reduce no-shows, recover lost revenue, and remove manual data entry. The foundation of every engagement.",
    bullets: [
      "Conversational agents across WhatsApp, voice, and web chat",
      "Lead capture, routing, and follow-up on autopilot",
      "Invoice OCR, compliance tracking, and document intelligence",
      "AI embedded into your own ERP or core system",
    ],
  },
  {
    href: "/services/web-software/",
    title: "Web & Custom Software",
    body: "From conversion-focused websites to internal operating systems that replace spreadsheets and disconnected SaaS tools.",
    bullets: [
      "Conversion-focused business websites wired to automation",
      "E-commerce storefronts: Salla, Zid, Shopify, headless",
      "Internal operating systems and ERP-lite dashboards",
      "Legacy modernisation — Oracle Forms, CodeIgniter, .NET",
    ],
  },
  {
    href: "/services/mobile-apps/",
    title: "Mobile Applications",
    body: "Purpose-built apps for field teams and distributed staff, including offline-first support where connectivity can't be guaranteed.",
    bullets: [
      "Field service & inspection apps: offline-first checklists",
      "GPS- and time-stamped photos, auto-sync in signal range",
      "Staff operations apps: rosters, tasks, clock-in/out",
      "Cross-platform builds — one codebase, iOS and Android",
    ],
  },
  {
    href: "/services/data-analytics/",
    title: "Data Analytics & BI",
    body: "Dashboards that turn scattered data into a single, daily-updated view of marketing, cash flow, and staff output.",
    bullets: [
      "Revenue & marketing attribution: cost-per-lead by channel",
      "Financial health: cash flow, receivables aging, profitability",
      "Staff / agent performance scorecards and leaderboards",
      "Conversational analytics — ask your data questions in plain language",
    ],
  },
];

export default function Page() {
  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <em>Services</em>
          </p>
          <p className="tag">
            <span className="sq"></span>Services
          </p>
          <h1>Four capabilities.<br />One stack.</h1>
          <p className="pagehead__lede">
            Every engagement combines these into a single delivery stack rather than treating them
            as separate projects — one working system, built against your real leads, appointments,
            and invoices from week one.
          </p>
        </div>
      </header>

      <RevealGroup as="section" className="services">
        <div className="wrap">
          <div className="cards">
            {SERVICE_LINES.map((line) => (
              <article className={`card reveal${line.ink ? " card--ink" : ""}`} key={line.href}>
                <h3>{line.title}</h3>
                <p>{line.body}</p>
                <ul>
                  {line.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link className="card__more" href={line.href}>
                  See the full service
                  <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
                    <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </RevealGroup>

      <section className="finalcta">
        <div className="wrap">
          <h2>Not sure which line fits?</h2>
          <p>Tell us the problem — we&rsquo;ll tell you which capability it lives under.</p>
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
