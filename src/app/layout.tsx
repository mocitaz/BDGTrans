import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import "./travel-planner.css";
import { siteUrl } from "@/lib/seo";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { PrototypeNotice } from "@/components/layout/prototype-notice";
import { ImageInteractionGuard } from "@/components/layout/image-interaction-guard";
const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-ui",
  display: "swap",
  adjustFontFallback: false,
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl() ?? "http://localhost:3000"),
  robots: {
    index: process.env.SITE_INDEXABLE === "true" && Boolean(siteUrl()),
    follow: process.env.SITE_INDEXABLE === "true" && Boolean(siteUrl()),
  },
  title: {
    default: "BDG TRANS | Sewa Hiace & Rental Kendaraan Bandung",
    template: "%s | BDG TRANS",
  },
  description:
    "Jelajahi pilihan Hiace Commuter, Hiace Premio, Elf Tayo, Innova Reborn, dan Avanza di BDG TRANS. Ajukan kebutuhan perjalanan dan minta penawaran melalui WhatsApp.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={googleSans.variable}>
      <body>
        <ImageInteractionGuard />
        <a className="skip-link" href="#main">
          Lewati ke konten
        </a>
        {children}
        <FloatingWhatsApp />
        <PrototypeNotice />
      </body>
    </html>
  );
}
