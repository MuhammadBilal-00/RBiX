import type { Metadata } from "next";
import CapabilityPage from "@/components/CapabilityPage";
import { capabilityPages } from "@/data/capabilities";

const data = capabilityPages["revenue-pipeline-automation"];

export const metadata: Metadata = {
  title: data.title,
  description: data.lede,
};

export default function Page() {
  return <CapabilityPage {...data} />;
}
