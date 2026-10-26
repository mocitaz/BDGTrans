import { LegalDocument } from "@/components/legal/legal-document";
import { metadataFor } from "@/lib/seo";
import { quoteScopeSummary } from "@/constants/quote-scope";

export const metadata = metadataFor("Syarat & Ketentuan", "/syarat-ketentuan");

export default function Terms() {
  return (
    <LegalDocument
      kind="terms"
      title="Syarat & Ketentuan"
      description="Supaya rencana perjalananmu lebih jelas dari awal."
      introduction={
        <>
          Sebelum lanjut, kenali dulu alur penawaran dan konfirmasi. Pilihan
          armada, harga, dan ketentuan perjalanan perlu kamu sepakati langsung
          dengan admin.
        </>
      }
      sections={[
        {
          id: "permintaan-penawaran",
          title: "Mulai dari minta penawaran",
          content: (
            <p>
              Mengisi formulir belum berarti reservasi dikonfirmasi. Admin akan
              mengecek ketersediaan dan membahas penawaran melalui WhatsApp.
              Reservasi baru dikonfirmasi setelah detail perjalanan dan
              ketentuan pembayaran disepakati.
            </p>
          ),
        },
        {
          id: "informasi-kendaraan",
          title: "Pilihan armada",
          content: (
            <p>
              Kamu bisa mengajukan Hiace, Elf, atau MPV yang sesuai rencana
              perjalananmu. Kapasitas, fasilitas, bagasi, kondisi unit, dan
              ketersediaan tetap perlu dikonfirmasi ke admin. Gambar ilustrasi
              membantu memberi gambaran dan tidak menjamin unit yang akan kamu
              gunakan.
            </p>
          ),
        },
        {
          id: "harga-dan-kesepakatan",
          title: "Harga dan kesepakatan",
          content: (
            <>
              <p>
                Harga sewa, rute, durasi, pembayaran, perubahan jadwal, dan
                pembatalan perlu kamu sepakati dengan admin sebelum reservasi
                dikonfirmasi. Website ini tidak menetapkan harga, persentase
                uang muka, atau biaya pembatalan.
              </p>
              <p>{quoteScopeSummary}</p>
            </>
          ),
        },
        {
          id: "detail-dan-whatsapp",
          title: "Pastikan detailnya sudah pas",
          content: (
            <p>
              Cek lagi nomor WhatsApp, jadwal, titik jemput, tujuan, dan jumlah
              penumpangmu sebelum lanjut. Semua jadwal di formulir memakai WIB.
              Membuka WhatsApp belum mengirim pesan secara otomatis; kamu tetap
              perlu menekan kirim di WhatsApp. Jumlah unit dan peserta per
              kelompok merupakan permintaan untuk dibahas, bukan jaminan
              ketersediaan. Rentang jadwal bukan perhitungan hari sewa atau
              harga. Saran kendaraan dan denah berlabel konsep memakai contoh
              konfigurasi prototipe; susunan unit tetap dikonfirmasi admin.
            </p>
          ),
        },
      ]}
    />
  );
}
