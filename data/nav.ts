export interface NavLink {
  label: string;
  href: string;
  blurb?: string;
}

export const servicesNav: NavLink[] = [
  { label: "AI & Automation", href: "/services/ai-automation/", blurb: "Lead response, no-shows, invoicing" },
  { label: "Web & Custom Software", href: "/services/web-software/", blurb: "Sites, storefronts, internal systems" },
  { label: "Mobile Applications", href: "/services/mobile-apps/", blurb: "Field, inspection & staff apps" },
  { label: "Data Analytics & BI", href: "/services/data-analytics/", blurb: "Dashboards, attribution, scorecards" },
];

// Industries remain on the legacy static HTML for this phase — absolute
// paths so they resolve correctly regardless of which app they're linked from.
export const industriesNav: NavLink[] = [
  { label: "Clinics & Aesthetics", href: "/industries/clinics-aesthetics/", blurb: "Dental, cosmetic, aesthetic & veterinary practices" },
  { label: "Real Estate", href: "/industries/real-estate/", blurb: "Brokerages and property / facility management firms" },
  { label: "E-commerce", href: "/industries/ecommerce/", blurb: "Direct-to-consumer and retail brands selling online" },
  { label: "Home & Field Services", href: "/industries/field-services/", blurb: "Contractors, inspection and maintenance businesses" },
  { label: "Professional Services", href: "/industries/professional-services/", blurb: "Accounting, bookkeeping and legal practices" },
  { label: "Construction", href: "/industries/construction/", blurb: "Firms managing tenders, site work and certifications" },
  { label: "Retail & Hospitality", href: "/industries/retail-hospitality/", blurb: "Multi-branch retail, salons, appointment-based venues" },
  { label: "Compliance-driven SMEs", href: "/industries/compliance-smes/", blurb: "Invoicing, tax and regulatory deadline management" },
];

export const primaryNav: NavLink[] = [
  { label: "How we work", href: "/#approach" },
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Pricing", href: "/pricing/" },
];

export const footerCompanyNav: NavLink[] = [
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Contact", href: "/contact/" },
];

export const contactInfo = {
  email: "info@rbixtechnologies.com",
  ukPhone: "+44 7737 641862",
  ukPhoneDisplay: "+44 7737 641862",
  pkPhones: [
    { number: "+923104766280", display: "0310 4766280" },
    { number: "+923150083914", display: "0315 0083914" },
  ],
};
