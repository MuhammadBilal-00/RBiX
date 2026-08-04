import type { Metadata } from "next";
import ServiceHubStub from "@/components/ServiceHubStub";
import { serviceHubs } from "@/data/serviceHubs";

const data = serviceHubs["web-software"];

export const metadata: Metadata = {
  title: "Web & Custom Software Services",
  description:
    "Conversion-focused websites, e-commerce storefronts, and internal operating systems that replace spreadsheets and disconnected SaaS tools with one structured layer.",
};

export default function Page() {
  return <ServiceHubStub {...data} />;
}
