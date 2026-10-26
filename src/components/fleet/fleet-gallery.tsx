"use client";
import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
  contain: boolean;
}
export function FleetGallery({
  images,
  name,
  id,
}: {
  images: GalleryImage[];
  name: string;
  id: string;
}) {
  const [selected, setSelected] = useState(0);
  const active = images[selected] ?? images[0];
  return (
    <div className="fleet-viewer">
      <figure>
        <div className="fleet-viewer-stage" id={id}>
          <Image
            key={active.src}
            src={active.src}
            alt={active.alt}
            fill
            priority={selected === 0}
            sizes="(max-width:767px) 100vw, 55vw"
            className={
              active.contain ? "fleet-exterior-image" : "fleet-interior-image"
            }
          />
        </div>
        <figcaption aria-live="polite">
          Ilustrasi {active.label.toLowerCase()}. Detail unit dikonfirmasi
          admin.
        </figcaption>
      </figure>
      <div
        className="fleet-viewer-thumbnails"
        role="group"
        aria-label={`Pilihan tampilan ${name}`}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            aria-controls={id}
            aria-label={`Lihat ${image.label.toLowerCase()} ${name}`}
          >
            <span className="fleet-thumbnail-image">
              <Image
                src={image.src}
                alt={`Pratinjau ${image.label.toLowerCase()} ${name}`}
                fill
                sizes="72px"
                className={image.contain ? "object-contain" : "object-cover"}
              />
            </span>
            <span>{image.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
