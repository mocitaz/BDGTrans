import Image from "next/image";
import { ArrowUpRight, MessageCircle, Info, ChevronRight } from "lucide-react";
import { fleet, fleetContent } from "@/constants/fleet";
import { destinations } from "@/constants/destinations";
import { faq } from "@/constants/faq";
import { testimonials } from "@/constants/testimonials";
import { FleetCard } from "@/components/fleet/fleet-card";
import { FleetScroll } from "@/components/fleet/fleet-scroll";
import { Accordion } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { adminChat } from "@/lib/whatsapp";
export function Fleet() {
  return (
    <FleetScroll
      count={fleet.length}
      heading={
        <div className="fleet-heading" data-reveal="up">
          <h2 id="fleet-heading">{fleetContent.title}</h2>
          <p>{fleetContent.intro}</p>
        </div>
      }
    >
      {fleet.map((item, index) => (
        <FleetCard key={item.slug} item={item} index={index} />
      ))}
    </FleetScroll>
  );
}
export function Benefits() {
  return (
    <section
      id="rencana-perjalanan"
      className="travel-banner"
      aria-labelledby="travel-banner-heading"
    >
      <div
        className="container travel-banner-destinations"
        role="region"
        aria-label="Lima visual tempat wisata Bandung dan sekitarnya"
        tabIndex={0}
      >
        {destinations.map((item, index) => (
          <div
            className="travel-destination"
            key={item.src}
            data-reveal="fade"
            data-reveal-delay={index * 50}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width:639px) 116px, 20vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="container travel-banner-layout">
        <div className="travel-banner-copy" data-reveal="up">
          <h2 id="travel-banner-heading">
            Liburan Seru di Bandung,
            <br />
            Berangkat Bareng Kami.
          </h2>
          <p className="travel-banner-description">
            Armada bersih &amp; nyaman, siap antar kamu ke mana saja.
          </p>
          <a href="#reservasi" className="travel-banner-cta">
            Rencanakan Perjalananmu <ArrowUpRight size={17} />
          </a>
        </div>
        <div
          className="travel-banner-stage"
          data-reveal="vehicle"
          data-reveal-delay="100"
        >
          <div className="travel-banner-car travel-banner-car-back">
            <Image
              src="/images/fleet/cutouts/innova-reborn.webp"
              alt="Visual Innova Reborn graphite berlogo perusahaan"
              fill
              sizes="(max-width:639px) 60vw, 35vw"
              className="object-contain"
            />
          </div>
          <div className="travel-banner-car travel-banner-car-front">
            <Image
              src="/images/fleet/cutouts/hiace-commuter.webp"
              alt="Visual Hiace Commuter putih berlogo perusahaan"
              fill
              sizes="(max-width:639px) 75vw, 42vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export function BookingSteps() {
  return (
    <section className="section muted-bg">
      <div className="container">
        <div className="eyebrow">CARA RESERVASI</div>
        <h2 className="section-heading">3 Langkah Mudah Booking Mobilmu</h2>
        <div className="steps">
          {[
            [
              "Pilih Mobil",
              "Tentukan armada yang sesuai dengan kebutuhan dan rombonganmu.",
            ],
            [
              "Isi Rencana Jalan",
              "Masukkan tanggal, titik jemput, tujuan, dan jumlah penumpang.",
            ],
            [
              "Deal via WhatsApp",
              "Dapatkan penawaran harga terbaik dan konfirmasi langsung dari admin.",
            ],
          ].map(([title, body], i) => (
            <article key={title}>
              <div className="step-number">
                0{i + 1}
                <ArrowUpRight size={23} className="float-right mt-4" />
              </div>
              <h3>{title}</h3>
              <p className="mt-3 text-sm">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 flex items-start gap-3 text-xs">
          <Info size={16} className="shrink-0" />
          Reservasi resmi dikonfirmasi setelah ketersediaan unit dan penawaran
          harga disepakati bersama admin.
        </p>
      </div>
    </section>
  );
}
export function TestimonialsOrContactPrompt() {
  const verified = testimonials.filter(
    (item) => item.verified && item.permissionGranted,
  );
  if (verified.length)
    return (
      <section className="container section">
        <h2 className="section-heading">Pengalaman Pelanggan</h2>
        {verified.map((item) => (
          <blockquote key={item.id} className="border-l-2 border-[#013274] p-5">
            <p>{item.quote}</p>
            <cite>{item.name}</cite>
          </blockquote>
        ))}
      </section>
    );
  return (
    <aside className="container">
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#d5dfec] bg-[#f5f7fb] p-8 md:flex-row md:items-center md:p-10">
        <div>
          <h2 className="mb-2 text-xl">Masih Bingung Pilih Mobil yang Mana?</h2>
          <p className="text-sm">
            Konsultasikan rencanamu dengan admin. Kami siap bantu carikan armada
            paling pas!
          </p>
        </div>
        <a
          className={buttonVariants({
            variant: "outline",
            className: "shrink-0",
          })}
          href={adminChat}
        >
          <MessageCircle size={17} />
          Tanya Admin via WhatsApp
        </a>
      </div>
    </aside>
  );
}
const trustedPartners = [
  { name: "Kementerian Keuangan", logo: "/brand/partners/kemenkeu.webp" },
  { name: "Telkom Indonesia", logo: "/brand/partners/telkom.webp" },
  { name: "Dinas Pendidikan", logo: "/brand/partners/disdik-jabar.webp" },
  { name: "Bank Mandiri", logo: "/brand/partners/mandiri.webp" },
  { name: "Pertamina", logo: "/brand/partners/pertamina.webp" },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="section faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="container faq-layout">
        <div className="faq-intro" data-reveal="up">
          <h2 id="faq-heading">Yang Sering Kamu Tanyakan.</h2>
          <p className="faq-description">
            Info praktis seputar armada, harga sewa, dan reservasi.
          </p>

          <div className="faq-trust">
            <div
              className="faq-avatar-stack"
              aria-label="Partner dan instansi yang bekerjasama"
            >
              {trustedPartners.map((partner) => (
                <div key={partner.name} className="faq-avatar-item">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={22}
                    height={22}
                    className="faq-avatar-img"
                  />
                </div>
              ))}
            </div>
            <div className="faq-trust-text">
              <p className="faq-trust-title">Dipercaya oleh</p>
              <p className="faq-trust-subtitle">
                Klien enterprise lintas industri
              </p>
            </div>
          </div>

          <a
            href={adminChat}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-ask-pill"
          >
            <span>Masih punya pertanyaan?</span>
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div data-reveal="fade" data-reveal-delay="100">
          <Accordion items={faq} />
        </div>
      </div>
    </section>
  );
}
