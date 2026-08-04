import Link from "next/link";
import BrandMark from "./BrandMark";
import { servicesNav, industriesNav, footerCompanyNav, contactInfo } from "@/data/nav";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__cols">
          <div>
            <Link className="footer__brand" href="/">
              <BrandMark size={22} />
              <span>RB<span className="dotless">ı</span>X</span>
            </Link>
            <p className="footer__tagline">
              AI &amp; software agency replacing manual, disconnected workflows with automated, data-driven systems.
            </p>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {servicesNav.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Industries</h4>
            <ul>
              {industriesNav.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              {footerCompanyNav.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
              <li><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
              <li><a href={`tel:${contactInfo.ukPhone.replace(/\s/g, "")}`}>{contactInfo.ukPhoneDisplay}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__row">
          <p>&copy; {new Date().getFullYear()} RBiX Technologies. All rights reserved.</p>
          <p className="footer__internal">
            PK office:{" "}
            {contactInfo.pkPhones.map((phone, i) => (
              <span key={phone.number}>
                <a href={`tel:${phone.number}`}>{phone.display}</a>
                {i < contactInfo.pkPhones.length - 1 ? " / " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
