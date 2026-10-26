import { LegalDocument } from "@/components/legal/legal-document";
import { metadataFor } from "@/lib/seo";
import { adminChat } from "@/lib/whatsapp";

export const metadata = metadataFor("Kebijakan Privasi", "/kebijakan-privasi");

export default function Privacy() {
  return (
    <LegalDocument
      kind="privacy"
      title="Kebijakan Privasi"
      description="Kenali cara data perjalananmu digunakan di website ini."
      introduction={
        <>
          Saat mengisi formulir, datamu diproses langsung di browser untuk
          menyiapkan pesan penawaran. Website ini tidak mengirim data formulir
          ke server BDG TRANS, menyimpannya di database, atau menyimpannya di
          localStorage.
        </>
      }
      sections={[
        {
          id: "data-yang-diisi",
          title: "Data yang kamu isi",
          content: (
            <p>
              Nama, nomor WhatsApp, kelompok armada dan jumlah unit, penumpang,
              koper, jadwal jemput dan selesai, arah perjalanan, kebutuhan
              menginap, alamat atau pin jemput, urutan pemberhentian, serta
              catatan digunakan untuk menyusun pesan penawaranmu. Detail layanan
              yang kamu isi, seperti perusahaan atau nomor penerbangan dan
              kereta, hanya disertakan untuk layanan yang sedang dipilih. Kamu
              bisa memeriksa semuanya sebelum lanjut.
            </p>
          ),
        },
        {
          id: "penggunaan-whatsapp",
          title: "Saat lanjut ke WhatsApp",
          content: (
            <p>
              Setelah kamu memberi persetujuan dan memilih Lanjut ke WhatsApp,
              detail perjalanan dimasukkan ke tautan WhatsApp. Tautan ini dapat
              tercatat di riwayat browser atau diproses oleh WhatsApp. Pesannya
              belum terkirim sampai kamu menekan kirim di WhatsApp. Penggunaan
              data setelah itu mengikuti kebijakan WhatsApp dan percakapanmu
              dengan admin.
            </p>
          ),
        },
        {
          id: "analytics-dan-penyimpanan",
          title: "Cookie, peta, dan penyimpanan",
          content: (
            <>
              <p>
                Website ini tidak mengaktifkan analytics atau menambahkan cookie
                pelacakan sendiri. Isi formulirmu juga tidak dikirim sebagai
                data analytics.
              </p>
              <p>
                Peta Google Maps di footer adalah konten pihak ketiga. Saat peta
                dimuat, Google dapat memproses data teknis sesuai kebijakannya.
                Penyedia hosting juga dapat memproses catatan teknis, seperti
                alamat IP dan permintaan halaman.
              </p>
              <p>
                Tombol Gunakan lokasi saya meminta izin lokasi perangkat saat
                kamu menekannya. Titik yang ditemukan baru dimasukkan ke
                formulir setelah kamu memilih Gunakan titik ini. Lokasi tidak
                dipantau terus-menerus; alamat manual dan tautan Maps tetap bisa
                digunakan. Membuka pin di Google Maps mengikuti kebijakan
                layanan tersebut.
              </p>
            </>
          ),
        },
        {
          id: "pertanyaan-data",
          title: "Ada pertanyaan soal data?",
          content: (
            <p>
              Kalau ingin menanyakan data yang sudah kamu kirim lewat
              percakapan, <a href={adminChat}>hubungi admin melalui WhatsApp</a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
