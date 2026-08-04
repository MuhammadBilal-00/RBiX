import Link from "next/link";
import BrandMark from "@/components/BrandMark";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="pagehead" style={{ minHeight: "70dvh", display: "flex", alignItems: "center" }}>
      <div className="wrap">
        <BrandMark size={40} />
        <p className="tag" style={{ marginTop: 24 }}>
          <span className="sq" aria-hidden="true"></span>404
        </p>
        <h1>That page moved, or never existed.</h1>
        <p className="pagehead__lede">
          Check the address, or head back to the homepage — from there every service, industry, and case study is one click away.
        </p>
        <div className="pagehead__actions">
          <Link className="btn btn--red" href="/">
            Back to homepage
            <span className="btn__ic" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="11" height="11">
                <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </Link>
          <Link className="btn btn--line" href="/contact/">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
