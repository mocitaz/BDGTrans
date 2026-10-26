import { afterEach, it, expect, vi } from "vitest";
import { metadataFor, siteUrl } from "@/lib/seo";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
afterEach(() => vi.unstubAllEnvs());
it("avoids inventing canonical domains before configuration", () => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  expect(siteUrl()).toBeUndefined();
  expect(metadataFor("Armada", "/armada/avanza").alternates).toBeUndefined();
  expect(sitemap()).toEqual([]);
  expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
});
it("builds all eight canonical production routes from a configured origin", () => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://verified.example/path");
  vi.stubEnv("SITE_INDEXABLE", "true");
  expect(siteUrl()).toBe("https://verified.example");
  expect(sitemap()).toHaveLength(8);
  expect(
    metadataFor("Sewa Avanza", "/armada/avanza").alternates?.canonical,
  ).toBe("https://verified.example/armada/avanza");
  expect(robots().sitemap).toBe("https://verified.example/sitemap.xml");
  expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
});
it("keeps staging disallowed even when origin is set", () => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://staging.example");
  vi.stubEnv("SITE_INDEXABLE", "false");
  expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
});
it.each(["not a url", "javascript:alert(1)", "ftp://example.org"])(
  "rejects invalid site URL %s",
  (url) => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", url);
    expect(siteUrl()).toBeUndefined();
  },
);
