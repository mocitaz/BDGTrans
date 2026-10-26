"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

const words = [
  "Bandung",
  "Hiace",
  "Elf",
  "MPV",
  "Wisata",
  "Perjalanan Dinas",
  "Antar Jemput",
];

export function TravelTicker() {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className="travel-ticker"
      data-paused={paused}
      role="region"
      aria-label="Pilihan kendaraan dan perjalanan"
    >
      <div className="container travel-ticker-layout">
        <div className="travel-ticker-viewport">
          <div className="travel-ticker-track">
            {[false, true].map((duplicate) => (
              <div
                className="travel-ticker-group"
                aria-hidden={duplicate || undefined}
                key={String(duplicate)}
              >
                {words.map((word) => (
                  <span key={word}>
                    {word}
                    <span className="travel-ticker-dot" aria-hidden="true">
                      ·
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? "Lanjutkan teks berjalan" : "Jeda teks berjalan"}
        >
          {paused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
