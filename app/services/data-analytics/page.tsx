import type { Metadata } from "next";
import ServiceHubStub from "@/components/ServiceHubStub";
import { serviceHubs } from "@/data/serviceHubs";

const data = serviceHubs["data-analytics"];

export const metadata: Metadata = {
  title: "Data Analytics & BI Services",
  description:
    "Dashboards that turn scattered data into a single, daily-updated view of marketing performance, cash flow, and staff output — riding alongside AI & Automation at little to no extra cost.",
};

export default function Page() {
  return <ServiceHubStub {...data} />;
}
