import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { Hero, About } from "@/components/sections/above-fold";
import {
  Fleet,
  Services,
  Benefits,
  FAQ,
} from "@/components/sections/content-sections";
import { ReservationSection } from "@/components/reservation/reservation-section";
import { LandingMotion } from "@/components/layout/landing-motion";
import { metadataFor, siteUrl } from "@/lib/seo";
export const metadata = {
  ...metadataFor("BDG TRANS | Sewa Hiace & Rental Kendaraan Bandung", "/"),
  title: { absolute: "BDG TRANS | Sewa Hiace & Rental Kendaraan Bandung" },
};
export default function Home() {
  const url = siteUrl();
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "BDG TRANS",
        ...(url ? { url } : {}),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+6289528051760",
          contactType: "customer service",
          availableLanguage: "Indonesian",
          url: "https://wa.me/6289528051760",
        },
      },
      {
        "@type": "WebSite",
        name: "BDG TRANS",
        inLanguage: "id-ID",
        ...(url ? { url } : {}),
      },
    ],
  };
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Fleet />
        <Services />
        <Benefits />
        <ReservationSection />
        <FAQ />
      </main>
      <Footer />
      <LandingMotion />
      <StickyMobileCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
