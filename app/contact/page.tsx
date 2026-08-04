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
    </>
  );
}
