import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPage from "@/components/IndustryPage";
import { industryPages, getIndustry } from "@/data/industries";

interface Props {
  params: Promise<{ slug: string }>;
}

// Required for `output: 'export'` — the slug list must be known at build time
// so all 8 industry pages are prerendered as static HTML.
export function generateStaticParams() {
  return Object.keys(industryPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry" };
  return {
    title: industry.label,
    description: industry.metaDescription,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = getIndustry(slug);
  if (!data) notFound();
  return <IndustryPage data={data} />;
}
