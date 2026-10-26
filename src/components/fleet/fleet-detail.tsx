import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FleetGallery } from "./fleet-gallery";
import { CabinGuide } from "./cabin-guide";
import { fleet } from "@/constants/fleet";
import { fleetDetails } from "@/constants/fleet-details";
import { quoteScope } from "@/constants/quote-scope";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { FleetItem } from "@/types/content";

export function FleetDetailView({
  item,
  showcase = false,
}: {
  item: FleetItem;
  showcase?: boolean;
}) {
  const content = fleetDetails[item.slug];
  const category = item.category === "minibus" ? "Minibus" : "MPV";
  const chat = buildWhatsAppUrl(
    `Halo Admin BDG TRANS, saya ingin bertanya tentang ${item.name} untuk rencana perjalanan saya. Mohon informasi pilihan unit dan penawarannya. Terima kasih.`,
  );
  return (
    <>
      <Header />
      <main id="main" className="fleet-detail-page">
        <div className="container">
          <nav className="fleet-detail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Beranda</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/#armada">Armada</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{item.name}</span>
          </nav>
          <nav className="fleet-model-nav" aria-label="Pilihan model armada">
            {fleet.map((model) => (
              <Link
                key={model.slug}
                href={
                  showcase
                    ? `/armada/show?armada=${model.slug}`
                    : `/armada/${model.slug}`
                }
                aria-current={model.slug === item.slug ? "page" : undefined}
              >
                {model.name.replace(/^(Toyota|Isuzu) /, "")}
              </Link>
            ))}
          </nav>
          <section
            className="fleet-detail-hero"
            aria-labelledby="fleet-detail-title"
          >
            <div className="fleet-product-visual">
              <FleetGallery
                key={item.slug}
                id={`${item.slug}-visual`}
                name={item.name}
                images={[
                  {
                    src: item.image,
                    alt: `Ilustrasi eksterior ${item.name} berlogo perusahaan`,
                    label: "Eksterior",
                    contain: true,
                  },
                  {
                    src: content.cabin,
                    alt: content.cabinAlt,
                    label: "Interior",
                    contain: false,
                  },
                ]}
              />
            </div>
            <div className="fleet-detail-copy">
              <p className="fleet-detail-kicker">{category} · Bandung</p>
              <h1 id="fleet-detail-title">
                <span className="sr-only">Sewa </span>
                {item.name}
                <span className="sr-only"> di Bandung</span>
              </h1>
              <p className="fleet-product-tagline">{content.headline}</p>
              <dl className="fleet-product-metrics">
                {content.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="fleet-reference-label">
                Acuan pabrikan · detail unit dikonfirmasi admin
              </p>
              <div className="fleet-quote-box">
                <div className="fleet-quote-actions">
                  <Link
                    href={`/?armada=${item.slug}#reservasi`}
                    className="fleet-quote-primary"
                  >
                    Minta Penawaran
                    <ArrowUpRight size={16} />
                  </Link>
                  <a href={chat} className="fleet-quote-secondary">
                    <MessageCircle size={16} />
                    Tanya Admin
                  </a>
                </div>
                <p className="fleet-quote-notice">
                  Harga sesuai rute dan jadwal. Reservasi dikonfirmasi admin.
                </p>
              </div>
            </div>
          </section>
          <nav className="fleet-product-tabs" aria-label="Detail kendaraan">
            <a href="#interior">Ruang kabin</a>
            <a href="#denah-kabin">Denah &amp; bagasi</a>
            <a href="#spesifikasi">Spesifikasi</a>
            <a href="#pilihan-lain">Pilihan lain</a>
          </nav>
        </div>
        <section
          className="fleet-product-board"
          aria-label="Interior dan spesifikasi"
        >
          <div className="container fleet-board-layout">
            <div id="interior" className="fleet-cabin-figure">
              <div className="fleet-board-heading">
                <h2>Di dalam kabin.</h2>
                <span>{item.name.replace(/^(Toyota|Isuzu) /, "")}</span>
              </div>
              <div className="fleet-cabin-image">
                <Image
                  src={content.cabin}
                  alt={content.cabinAlt}
                  fill
                  sizes="(max-width:767px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="fleet-board-features">
                {content.highlights.map((highlight) => (
                  <div key={highlight.title}>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id="spesifikasi" className="fleet-spec-layout">
              <div className="fleet-board-heading">
                <h2 id="fleet-spec-heading">Spesifikasi.</h2>
                <span>Acuan pabrikan</span>
              </div>
              <dl className="fleet-spec-list">
                {content.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <details key={item.slug} className="fleet-reference-details">
                <summary>Tentang spesifikasi ini</summary>
                <p className="fleet-spec-reference">{content.reference}</p>
                <p>
                  Ini acuan pabrikan, bukan spesifikasi unit rental yang telah
                  diverifikasi. Tahun, kursi, dan fasilitas unit dikonfirmasi
                  admin. Konsumsi BBM mengikuti kondisi perjalanan.
                </p>
                <a
                  className="fleet-source-link"
                  href={content.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.source.title}
                  <ExternalLink size={14} aria-hidden="true" />
                  <span className="sr-only"> (tab baru)</span>
                </a>
              </details>
            </div>
          </div>
        </section>
        <CabinGuide slug={item.slug} />
        <section
          id="pilihan-lain"
          className="fleet-related-section"
          aria-labelledby="fleet-related-heading"
        >
          <div className="container">
            <details className="fleet-quote-scope">
              <summary>Yang perlu dikonfirmasi dalam penawaran</summary>
              <p>
                Pastikan rincian berikut disepakati dengan admin sebelum
                reservasi.
              </p>
              <dl>
                {quoteScope.map(({ label, detail }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{detail}</dd>
                  </div>
                ))}
              </dl>
              <p>
                Komponen di atas belum dinyatakan termasuk dalam harga.
                Rinciannya mengikuti penawaran yang kamu sepakati.
              </p>
            </details>
            <div className="fleet-related-heading">
              <div>
                <h2 id="fleet-related-heading">Pilihan lainnya.</h2>
              </div>
              <Link href="/#armada" className="fleet-return">
                <ArrowLeft size={15} />
                Kembali ke pilihan armada
              </Link>
            </div>
            <div className="fleet-related-grid">
              {fleet
                .filter((model) => model.slug !== item.slug)
                .map((model) => (
                  <Link
                    key={model.slug}
                    href={`/armada/${model.slug}`}
                    className="fleet-related-card"
                  >
                    <div className="fleet-related-image">
                      <Image
                        src={model.image}
                        alt={`Ilustrasi ${model.name} berlogo perusahaan`}
                        fill
                        sizes="(max-width:767px) 45vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="fleet-related-text">
                      <div>
                        <span>
                          {model.category === "minibus" ? "Minibus" : "MPV"}
                        </span>
                        <h3>{model.name}</h3>
                      </div>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
