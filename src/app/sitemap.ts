import type { MetadataRoute } from "next";
import { fleet } from "@/constants/fleet";
import { siteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  if (!url) return [];
  return [
    "",
    "/kebijakan-privasi",
    "/syarat-ketentuan",
    ...fleet.map((item) => `/armada/${item.slug}`),
  ].map((path) => ({
    url: `${url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/armada") ? 0.8 : 0.3,
  }));
}
