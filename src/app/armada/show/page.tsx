import { fleet } from "@/constants/fleet";
import { FleetDetailView } from "@/components/fleet/fleet-detail";
import { metadataFor } from "@/lib/seo";

type ShowProps = { searchParams: Promise<{ armada?: string | string[] }> };
async function selectedFleet(searchParams: ShowProps["searchParams"]) {
  const { armada } = await searchParams;
  return (
    fleet.find((item) => item.slug === armada) ??
    fleet.find((item) => item.slug === "hiace-premio")!
  );
}
export async function generateMetadata({ searchParams }: ShowProps) {
  const item = await selectedFleet(searchParams);
  return metadataFor(
    `Sewa ${item.name} Bandung`,
    `/armada/${item.slug}`,
    item.summary,
  );
}
export default async function ShowFleet({ searchParams }: ShowProps) {
  const item = await selectedFleet(searchParams);
  return <FleetDetailView item={item} showcase />;
}
