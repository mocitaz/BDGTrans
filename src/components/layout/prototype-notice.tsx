"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

export function PrototypeNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <aside
      className="prototype-notice"
      role="region"
      aria-labelledby="prototype-notice-heading"
    >
      <button
        type="button"
        className="prototype-notice-close"
        aria-label="Tutup pemberitahuan prototipe"
        onClick={() => setVisible(false)}
      >
        <X size={16} />
      </button>

      <div className="prototype-notice-header">
        <h2 id="prototype-notice-heading">Pratinjau Konsep Website</h2>
      </div>

      <div role="status" className="prototype-notice-body">
        <p>
          Ini prototipe independen untuk presentasi desain, bukan website resmi
          atau milik BDG TRANS. Konten dan layanan yang ditampilkan masih berupa
          contoh, belum final.
        </p>
        <details className="prototype-notice-details">
          <summary>Baca penjelasan</summary>
          <div>
            <p>
              Website ini merupakan{" "}
              <strong>
                contoh konsep digital yang dikembangkan secara independen oleh
                PT Teknalogi Transformasi Digital
              </strong>{" "}
              sebagai ilustrasi dan referensi potensi pengembangan website untuk
              BDG TRANS.
            </p>
            <p>
              Seluruh desain, konten, gambar, fitur, informasi layanan, dan alur
              reservasi yang ditampilkan bersifat{" "}
              <strong>konseptual, ilustratif, dan belum final</strong>. Setiap
              elemen dapat berubah serta belum tentu mencerminkan kebutuhan,
              kebijakan, maupun layanan aktual BDG TRANS.
            </p>
            <p>
              Prototipe ini dibuat semata-mata untuk tujuan demonstrasi dan
              tidak menunjukkan adanya kerja sama, afiliasi, persetujuan, atau
              penugasan resmi dari pihak BDG TRANS.
            </p>
          </div>
        </details>
      </div>

      <div className="prototype-notice-actions">
        <button
          type="button"
          className="prototype-btn-primary"
          onClick={() => setVisible(false)}
        >
          <CheckCircle2 size={13} />
          Saya Mengerti
        </button>
      </div>
    </aside>
  );
}
