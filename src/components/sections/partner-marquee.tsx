"use client";
import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { PartnerItem } from "@/constants/partners";

export function PartnerMarquee({ items }: { items: PartnerItem[] }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="partner-marquee" data-paused={paused}>
      <div className="partner-marquee-toolbar">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-controls="partner-logo-track"
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          <span>{paused ? "Putar logo" : "Jeda animasi"}</span>
        </button>
      </div>
      <div
        className="partner-viewport"
        tabIndex={0}
        role="region"
        aria-label="Daftar logo instansi. Animasi berhenti saat area ini menerima fokus."
      >
        <div className="partner-track" id="partner-logo-track">
          {[false, true].map((duplicate) => (
            <ul
              className={`partner-logo-group${duplicate ? " partner-logo-duplicate" : ""}`}
              key={String(duplicate)}
              aria-hidden={duplicate ? true : undefined}
            >
              {items.map((item) => (
                <li key={item.id}>
                  <span className="partner-logo">
                    {item.logo && (
                      <Image
                        src={item.logo}
                        alt={
                          duplicate
                            ? `Salinan logo ${item.name}`
                            : `Logo ${item.name}`
                        }
                        fill
                        sizes="144px"
                        loading="eager"
                        className="object-contain"
                      />
                    )}
                  </span>
                  <span className="partner-name">{item.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
