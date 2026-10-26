import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  const url = siteUrl();
  const indexable = process.env.SITE_INDEXABLE === "true" && Boolean(url);
  return {
    rules: {
      userAgent: "*",
      ...(indexable ? { allow: "/" } : { disallow: "/" }),
    },
    ...(indexable && url ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
