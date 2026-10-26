import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { hero, about } from "@/constants/brand";
import { HeroQuickForm } from "@/components/reservation/hero-quick-form";
import { buttonVariants } from "@/components/ui/button";
import { adminChat } from "@/lib/whatsapp";
import { VehicleAdvisor } from "@/components/fleet/vehicle-advisor";
export function Hero() {
  return (
    <section id="beranda" className="hero" aria-labelledby="hero-title">
      <div className="hero-panel">
        <div className="hero-visual">
          <picture>
            <source
              media="(max-width: 639px)"
              type="image/avif"
              srcSet="/images/hero/gedung-sate-branded-mobile.avif"
            />
            <source
              media="(max-width: 639px)"
              type="image/webp"
              srcSet="/images/hero/gedung-sate-branded-mobile.webp"
            />
            <source
              media="(min-width: 640px)"
              type="image/avif"
              srcSet="/images/hero/gedung-sate-branded-desktop-small.avif 1280w, /images/hero/gedung-sate-branded-desktop.avif 1920w"
              sizes="100vw"
            />
            <Image
              src="/images/hero/gedung-sate-branded-desktop.webp"
              alt="Ilustrasi Hiace putih berlogo perusahaan di depan Gedung Sate, Bandung"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
          </picture>
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 id="hero-title">{hero.title}</h1>
          <p className="whitespace-pre-line">{hero.body}</p>
          <a className="text-link hero-fleet-link" href="#armada">
            Jelajahi Armada <ArrowUpRight size={16} />
          </a>
          <VehicleAdvisor hero />
        </div>
      </div>
      <HeroQuickForm />
    </section>
  );
}
export function About() {
  return (
    <section
      id="tentang"
      className="section about-section"
      aria-labelledby="about-heading"
    >
      <div className="container about-layout">
        <figure className="about-figure" data-reveal="vehicle">
          <div className="about-visual">
            <Image
              src={about.image}
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 46px), 550px"
              alt={about.imageAlt}
              className="about-vehicle-image object-contain"
            />
          </div>
        </figure>
        <div className="about-copy" data-reveal="up" data-reveal-delay="90">
          <div className="eyebrow">{about.eyebrow}</div>
          <h2 id="about-heading">{about.title}</h2>
          <p>{about.body}</p>
          <div className="about-actions">
            <a href="#armada" className={buttonVariants()}>
              Pilih Armada <ArrowUpRight size={16} />
            </a>
            <a
              href={adminChat}
              className={buttonVariants({ variant: "outline" })}
            >
              <MessageCircle size={16} />
              Tanya Admin
            </a>
          </div>
          <dl className="about-facts">
            <div>
              <dt>Pilihan armada</dt>
              <dd>Hiace, Elf &amp; MPV</dd>
            </div>
            <div>
              <dt>Konsultasi harga</dt>
              <dd>Langsung via WhatsApp</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
