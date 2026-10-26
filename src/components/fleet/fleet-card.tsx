import Image from "next/image";
import Link from "next/link";
import { CircleCheck, MessageCircle } from "lucide-react";
import type { FleetItem } from "@/types/content";
import { Card } from "@/components/ui/card";
import { brand } from "@/constants/brand";
export function FleetCard({
  item,
  index = 0,
}: {
  item: FleetItem;
  index?: number;
}) {
  return (
    <Card
      className="fleet-card"
      data-reveal="up"
      data-reveal-delay={(index % 3) * 65}
    >
      <div className="fleet-card-visual">
        <div className="fleet-card-platform" aria-hidden="true" />
        <div className="fleet-photo">
          <Image
            src={item.image}
            alt={`Ilustrasi ${item.name} berlogo perusahaan, menghadap kiri`}
            fill
            sizes="(max-width:639px) 90vw, (max-width:1023px) 45vw, 30vw"
            className="object-contain"
          />
        </div>
        <div className="fleet-brand-strip">
          <span className="fleet-strip-brand">
            BDG TRANS<small>Rental Bandung</small>
          </span>
          <span className="fleet-strip-contact">
            <MessageCircle size={14} />
            {brand.phoneDisplay}
          </span>
        </div>
      </div>
      <div
        className="fleet-meta-strip"
        aria-label="Jenis perjalanan yang dapat diajukan"
      >
        {["Wisata", "Dinas", "Keluarga"].map((label) => (
          <span key={label}>
            <CircleCheck size={12} />
            {label}
          </span>
        ))}
      </div>
      <div className="fleet-content">
        <h3>{item.name}</h3>
        <p>{item.summary}</p>
        <div className="fleet-actions">
          <Link
            className="fleet-quote"
            href={`/?armada=${item.slug}#reservasi`}
          >
            Minta Penawaran
          </Link>
          <Link href={`/armada/${item.slug}`} className="fleet-detail">
            Lihat Detail
          </Link>
        </div>
      </div>
    </Card>
  );
}
