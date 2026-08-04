import type { Metadata } from "next";
import ServiceHubStub from "@/components/ServiceHubStub";
import { serviceHubs } from "@/data/serviceHubs";

const data = serviceHubs["mobile-apps"];

export const metadata: Metadata = {
  title: "Mobile Applications",
  description:
    "Purpose-built mobile apps for field teams and distributed staff, including offline-first inspection and staff operations apps that keep working with zero signal.",
};

export default function Page() {
  return <ServiceHubStub {...data} />;
}
