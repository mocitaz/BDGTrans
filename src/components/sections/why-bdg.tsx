import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPinned,
  BriefcaseBusiness,
  Plane,
  Users,
} from "lucide-react";
import { services } from "@/constants/services";

const serviceIcons = {
  wisata: MapPinned,
  dinas: BriefcaseBusiness,
  bandara: Plane,
  keluarga: Users,
};
const serviceLabels = {
  wisata: "Trip Wisata",
  dinas: "Perjalanan Dinas",
  bandara: "Bandara & Stasiun",
  keluarga: "Perjalanan Keluarga",
};

const moments = [
  {
    id: "cabin",
    title: "Nyaman untuk pergi bersama.",
    alt: "Visual kabin minibus dengan kursi kain abu-abu, dilihat dari pintu samping dalam cahaya alami",
  },
  {
    id: "fleet",
    title: "Beda rencana, beda pilihan.",
    alt: "Visual Hiace hitam berlogo perusahaan dan Innova abu-abu di halaman rindang bergaya Bandung",
  },
  {
    id: "luggage",
    title: "Mulai dari kebutuhanmu.",
    alt: "Visual persiapan perjalanan dengan koper dan tas di samping pintu minibus yang terbuka",
  },
] as const;

export function WhyBDG() {
  return (
    <section className="why-bdg" aria-labelledby="why-bdg-heading">
      <div className="container">
        <header className="why-bdg-heading" data-reveal="up">
          <p>KENAPA BDG TRANS</p>
          <h2 id="why-bdg-heading">Bukan sekadar sampai tujuan.</h2>
        </header>

        <div className="why-bdg-grid">
          {moments.map((moment, index) => (
            <figure
              key={moment.id}
              className={`why-bdg-moment why-bdg-${moment.id}`}
              data-reveal="up"
              data-reveal-delay={index * 60}
            >
              <div className="why-bdg-photo">
                <Image
                  src={`/images/why-bdg/${moment.id}.webp`}
                  alt={moment.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 999px) 100vw, 660px"
                      : "(max-width: 639px) 100vw, (max-width: 999px) 50vw, 550px"
                  }
                  draggable={false}
                />
              </div>
              <figcaption>{moment.title}</figcaption>
            </figure>
          ))}
        </div>

        <div
          id="layanan"
          className="why-bdg-services"
          aria-labelledby="services-heading"
          data-reveal="up"
        >
          <h3 id="services-heading">Untuk setiap rencana perjalanan.</h3>
          <div className="why-bdg-service-list">
            {services.map((service) => {
              const Icon = serviceIcons[service.id];
              return (
                <Link
                  key={service.id}
                  href={`/?jenis=${service.id}#reservasi`}
                  className="why-bdg-service-link"
                >
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  <span>{serviceLabels[service.id]}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="why-bdg-footer" data-reveal="fade">
          <Link href="/#armada">
            Temukan armada untuk rencanamu
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
