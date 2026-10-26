import { notFound } from "next/navigation";
import { fleet } from "@/constants/fleet";
import { FleetDetailView } from "@/components/fleet/fleet-detail";
import { metadataFor } from "@/lib/seo";

export function generateStaticParams() {
  return fleet.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = fleet.find((item) => item.slug === slug);
  return item
    ? metadataFor(`Sewa ${item.name} Bandung`, `/armada/${slug}`, item.summary)
    : {};
}
export default async function FleetDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = fleet.find((item) => item.slug === slug);
  if (!item) notFound();
  return <FleetDetailView item={item} />;
}
