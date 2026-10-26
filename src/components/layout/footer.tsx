import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { navigation } from "@/constants/navigation";
import { brand } from "@/constants/brand";
import { adminChat } from "@/lib/whatsapp";

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
            <div
              className="footer-socials"
              role="group"
              aria-label="Kontak dan media sosial"
            >
              <a
                className="footer-social footer-instagram"
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram BDG TRANS (membuka tab baru)"
                title="Instagram"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                className="footer-social footer-phone"
                href={`tel:${brand.phone}`}
                aria-label="Telepon admin BDG TRANS"
                title="Telepon admin"
              >
                <Phone size={20} strokeWidth={1.6} aria-hidden="true" />
              </a>
              <a
                className="footer-social footer-whatsapp"
                href={adminChat}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat admin BDG TRANS melalui WhatsApp (membuka tab baru)"
                title="WhatsApp admin"
              >
                <Image
                  src="/icons/whatsapp.svg"
                  alt="WhatsApp"
                  width={21}
                  height={21}
                  unoptimized
                />
              </a>
            </div>
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
            <div className="footer-location">
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
