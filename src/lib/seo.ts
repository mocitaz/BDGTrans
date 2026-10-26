import type { Metadata } from "next";
export function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (!["https:", "http:"].includes(url.protocol)) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}
export const siteDescription =
  "Jelajahi pilihan Hiace Commuter, Hiace Premio, Elf Tayo, Innova Reborn, dan Avanza di BDG TRANS. Ajukan kebutuhan perjalanan dan minta penawaran melalui WhatsApp.";
export function metadataFor(
  title: string,
  path: string,
  description = siteDescription,
): Metadata {
  const base = siteUrl();
  const url = base ? `${base}${path}` : undefined;
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title,
      description,
      siteName: "BDG TRANS",
      locale: "id_ID",
      type: "website",
      ...(url ? { url } : {}),
      images: [
        {
          url: base ? `${base}/og/og-bdg-trans.png` : "/og/og-bdg-trans.png",
          width: 1200,
          height: 630,
          alt: "BDG TRANS, pilihan kendaraan untuk perjalanan Bandung. Visual ilustrasi.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [base ? `${base}/og/og-bdg-trans.png` : "/og/og-bdg-trans.png"],
    },
  };
}
