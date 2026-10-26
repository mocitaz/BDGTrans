import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { navigation } from "@/constants/navigation";
import { brand } from "@/constants/brand";
import { adminChat } from "@/lib/whatsapp";

const googleMapsUrl =
  "https://www.google.com/maps/place/Sewa+Hiace+Bandung+-+Bandung+Trip+Rent+Car/@-6.858063,107.5957184,17z/data=!3m1!4b1!4m6!3m5!1s0xaf58858c3aa1a6f:0x5b0b0b1dfba699a9!8m2!3d-6.858063!4d107.5957184!16s%2Fg%2F11xgd8krzx?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D";

const googleMapsEmbedUrl =
  "https://maps.google.com/maps?q=-6.858063,107.5957184+(BDG+TRANS+-+Sewa+Hiace+Bandung)&hl=id&z=15&output=embed";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top" data-reveal="fade">
          <div className="footer-brand">
            <Link
              className="footer-brand-link"
              href="/#beranda"
              aria-label="BDG TRANS. Rental Kendaraan Bandung, kembali ke beranda"
            >
              <BrandLogo tone="white" />
            </Link>
            <p>
              Hiace, Elf &amp; MPV untuk perjalanan dari dan menuju Bandung.
            </p>
          </div>

          <div className="footer-navigation">
            <h3 className="footer-heading">Navigasi</h3>
            <nav aria-label="Navigasi footer" className="footer-links">
              {navigation.map(([id, label]) => (
                <Link key={id} href={`/#${id}`}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-support">
            <div className="footer-contact">
              <h3 className="footer-heading">Hubungi admin</h3>
              <div className="footer-contact-links">
                <a href={adminChat} className="footer-whatsapp">
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>
                    <span className="footer-contact-label">Chat WhatsApp</span>
                    <span className="footer-contact-value">
                      {brand.phoneDisplay}
                    </span>
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a className="footer-phone" href={`tel:${brand.phone}`}>
                  <Phone size={16} aria-hidden="true" />
                  Telepon admin
                </a>
              </div>
            </div>

            <div className="footer-location">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-location-link"
                aria-label="Lihat lokasi di Google Maps untuk BDG TRANS (membuka tab baru)"
                title="Buka di Google Maps"
              >
                <MapPin size={17} aria-hidden="true" />
                Lihat lokasi di Google Maps
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <details className="footer-map-details">
                <summary>Pratinjau peta</summary>
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="130"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Sewa Hiace Bandung - BDG TRANS"
                  className="footer-map-frame"
                />
              </details>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} BDG TRANS. Hak cipta dilindungi.
          </span>
          <div className="footer-legal">
            <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>
            <Link href="/syarat-ketentuan">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
