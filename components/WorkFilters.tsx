"use client";

import { useState } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/data/work";

interface WorkFiltersProps {
  caseStudies: CaseStudy[];
}

export default function WorkFilters({ caseStudies }: WorkFiltersProps) {
  const filters = (() => {
    const services = Array.from(new Set(caseStudies.map((c) => c.serviceTag)));
    const industries = Array.from(new Set(caseStudies.map((c) => c.industryTag)));
    return ["All", ...services, ...industries];
  })();

  const [active, setActive] = useState("All");

  const visible = caseStudies.filter(
    (c) => active === "All" || c.serviceTag === active || c.industryTag === active
  );

  return (
    <>
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-chip${active === f ? " active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="cards cards--flow">
        {visible.map((c) => (
          <article className="card" key={c.slug}>
            <p className="tag"><span className="sq" aria-hidden="true"></span>{c.serviceTag}</p>
            <h3>{c.client}</h3>
            <p>{c.summary}</p>
            <ul>
              {c.metrics.slice(0, 2).map((m) => (
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
    </>
  );
}
