import type { FaqItem } from "@/types/content";
import { quoteScopeSummary } from "./quote-scope";
export const faq: FaqItem[] = [
  [
    "Bagaimana cara meminta penawaran?",
    "Pilih armada, isi formulir singkat di web ini, lalu lanjut chat WhatsApp admin untuk dapat penawaran harga terbaik.",
  ],
  [
    "Bagaimana cara mengetahui harga sewa?",
    "Harga dihitung transparan sesuai tipe mobil, durasi, dan rute perjalananmu. Langsung tanya admin untuk best deal-nya!",
  ],
  ["Apa saja yang perlu dikonfirmasi dalam penawaran?", quoteScopeSummary],
  [
    "Apakah formulir langsung mengonfirmasi reservasi?",
    "Belum. Formulir adalah langkah awal. Reservasi resmi dikonfirmasi admin setelah kamu sepakat dengan penawaran harga.",
  ],
  [
    "Bisa memilih jenis kendaraan tertentu?",
    "Bisa. Pilih kendaraan dan jumlah unit, lalu gunakan Tambah armada untuk kelompok lain. Admin akan mengonfirmasi kecocokan kursi, bagasi, dan ketersediaan; saran serta denah berlabel konsep belum mewakili unit aktual.",
  ],
  [
    "Bagaimana ketentuan pembayaran dan pembatalan?",
    "Ketentuan DP, pelunasan, jadwal, dan pembatalan akan dijelaskan secara transparan oleh admin sebelum kamu bertransaksi.",
  ],
  [
    "Bisa melayani perjalanan ke luar kota dan antar-jemput bandara?",
    "Bisa banget! Kami melayani trip luar kota ke berbagai destinasi, serta antar-jemput stasiun Whoosh, stasiun kereta, maupun bandara.",
  ],
].map(([question, answer], index) => ({
  id: `faq-${index}`,
  question,
  answer,
}));
