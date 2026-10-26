import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { gallery } from "@/constants/gallery";
import { adminChat } from "@/lib/whatsapp";

export function Gallery() {
  return (
    <section
      id="galeri"
      className="section journey-gallery"
      aria-labelledby="gallery-heading"
    >
      <div className="container">
        <div className="journey-heading">
          <div>
            <p className="journey-kicker">GALERI PERJALANAN</p>
            <h2 id="gallery-heading">Sepanjang perjalanan.</h2>
          </div>
          <p>Armada dan suasana Bandung, dari dekat.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item) => (
            <figure className="gallery-item" key={item.src}>
              <div className="gallery-image">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width:639px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="gallery-caption">{item.title}</figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-footer">
          <p>Punya rencana perjalanan?</p>
          <a href={adminChat}>
            <MessageCircle size={16} />
            Tanya Admin
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
