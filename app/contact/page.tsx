import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { contactInfo } from "@/data/nav";

export const metadata = {
  title: "Contact",
  description:
    "Tell us about the workflow costing you the most. One conversation is usually enough to scope the first automation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <em>Contact</em>
          </p>
          <p className="tag"><span className="sq"></span>Contact</p>
          <h1>Let&rsquo;s talk about what&rsquo;s costing you time.</h1>
          <p className="pagehead__lede">
            Tell us about the workflow costing you the most. One conversation is usually enough to scope the first automation.
          </p>
        </div>
      </section>

      <section className="walk walk--light">
        <div className="wrap contact-grid">
          <ContactForm />

          <div className="contact-info">
            <div className="contact-info__item">
              <strong>Email</strong>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>
            <div className="contact-info__item">
              <strong>Phone (UK)</strong>
              <a href={`tel:${contactInfo.ukPhone.replace(/\s/g, "")}`}>{contactInfo.ukPhoneDisplay}</a>
            </div>
            <div className="contact-info__item">
              <strong>PK office</strong>
              <p>
                {contactInfo.pkPhones.map((phone, i) => (
                  <span key={phone.number}>
                    <a href={`tel:${phone.number}`}>{phone.display}</a>
                    {i < contactInfo.pkPhones.length - 1 ? " / " : ""}
                  </span>
                ))}
              </p>
            </div>
            <div className="contact-info__item">
              <strong>Response time</strong>
              <p>Within one business day, usually sooner.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="walk walk--soft walk--compact">
        <div className="wrap walk__grid2">
          <div className="walk__head">
            <p className="tag"><span className="sq"></span>What happens next</p>
            <h2 className="walk__title">Three steps, no pitch deck.</h2>
          </div>
          <ul className="points">
            <li>
              <strong>A short scoping call</strong>
              <span>We find the workflow costing you the most and confirm it&rsquo;s automatable.</span>
            </li>
            <li>
              <strong>A fixed price or banded estimate</strong>
              <span>Well-defined work gets a fixed number; anything depending on unseen integrations gets a band.</span>
            </li>
            <li>
              <strong>A working system, not a proposal</strong>
              <span>Every engagement ships a live automation or system — usually inside the first few weeks.</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
