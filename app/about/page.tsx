import Link from "next/link";
import RevealGroup from "@/components/RevealGroup";

export const metadata = {
  title: "About",
  description:
    "RBiX Technologies replaces manual, disconnected workflows with automated, data-driven systems — AI embedded into production ERP, HMIS, and accounting platforms, not bolted onto a support inbox.",
};

const TEAM_PLACEHOLDERS = [
  { role: "Founder & CEO" },
  { role: "Engineering Lead" },
  { role: "Client Delivery" },
];

function ArrowIcon() {
  return (
    <span className="btn__ic" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="11" height="11">
        <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <em>About</em>
          </p>
          <p className="tag">
            <span className="sq"></span>Company
          </p>
          <h1>The systems layer behind the businesses that outgrew spreadsheets.</h1>
          <p className="pagehead__lede">
            We replace manual, disconnected workflows with automated, data-driven systems.
          </p>
          <div className="pagehead__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <ArrowIcon />
            </Link>
            <a className="btn btn--line" href="#approach">
              See how we work
            </a>
          </div>
        </div>
      </header>

      <RevealGroup as="section" className="walk walk--light">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag reveal">
              <span className="sq"></span>What we do
            </p>
            <h2 className="walk__title reveal">One delivery stack, not four separate vendors.</h2>
          </div>
          <div className="prose reveal">
            <p>
              Four core service lines — AI &amp; Automation, Web &amp; Custom Software, Mobile
              Applications, and Data Analytics &amp; BI — run as a single delivery stack for each
              client, rather than being sold and staffed as unrelated projects.
            </p>
            <p>
              Every engagement ships a working system, not just a proposal: we build against real
              inbound leads, real appointments, and real invoices from week one.
            </p>
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="walk walk--soft">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag reveal">
              <span className="sq"></span>Why AI, credibly
            </p>
            <h2 className="walk__title reveal">
              Almost anyone can say &ldquo;we build WhatsApp chatbots.&rdquo;
            </h2>
          </div>
          <div className="prose reveal">
            <p>
              RBiX&rsquo;s AI work sits somewhere else: inside the production ERP, HMIS, and
              accounting systems clients already run their business on, not a demo layered on top
              of one. That background spans 100+ clients{" "}
              <span className="todo-flag">Confirm client count</span> across systems where the
              model reads and writes against the same live data as the rest of the business.
            </p>
            <p>
              That&rsquo;s what makes AI in a client&rsquo;s core operations credible rather than
              aspirational — it&rsquo;s built into the system of record, not bolted onto a support
              inbox.
            </p>
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="approach">
        <div
          className="wrap approach__grid"
          id="approach"
          style={{ scrollMarginTop: "calc(var(--nav-h) + 28px)" }}
        >
          <div className="approach__head">
            <h2 className="section__title reveal">How we work</h2>
            <p className="approach__note reveal">
              Every engagement includes a working automation or system, not just a proposal.
            </p>
          </div>
          <div className="steps">
            <div className="step reveal">
              <span className="step__num">1</span>
              <h3>Automate</h3>
              <p>
                Every engagement leads with AI &amp; Automation, the fastest path to a measurable
                result, usually inside the first few weeks.
              </p>
            </div>
            <div className="step reveal">
              <span className="step__num">2</span>
              <h3>Measure</h3>
              <p>
                Data analytics rides along as the retention layer, giving owners visibility into
                exactly what the automation is producing.
              </p>
            </div>
            <div className="step reveal">
              <span className="step__num">3</span>
              <h3>Scale</h3>
              <p>
                Custom software and mobile apps come in once a workflow has proven itself and
                needs a dedicated system of its own.
              </p>
            </div>
          </div>
        </div>
      </RevealGroup>

      <RevealGroup as="section" className="walk walk--light">
        <div className="wrap">
          <div className="walk__head">
            <p className="tag reveal">
              <span className="sq"></span>Team
            </p>
            <h2 className="walk__title reveal">Who&rsquo;s behind the work.</h2>
            <p className="walk__lede reveal">
              Names and bios are being finalized ahead of launch — the roles below reflect how
              delivery is structured, not filler copy.
            </p>
          </div>
          <div className="cards cards--flow">
            {TEAM_PLACEHOLDERS.map((member) => (
              <article className="card reveal" key={member.role}>
                <h3>{member.role}</h3>
                <p>
                  <span className="todo-flag">Name pending</span>
                </p>
                <p>Bio pending.</p>
              </article>
            ))}
          </div>
        </div>
      </RevealGroup>

      <section className="finalcta">
        <div className="wrap">
          <h2>Let&rsquo;s talk about what&rsquo;s costing you time.</h2>
          <p>See the work first, or go straight to scoping yours.</p>
          <div className="finalcta__actions">
            <Link className="btn btn--red" href="/contact/">
              Get in Touch
              <ArrowIcon />
            </Link>
            <Link className="btn btn--line" href="/work/">
              See our work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
