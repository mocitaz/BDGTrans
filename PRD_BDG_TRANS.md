# BDG TRANS — Product Requirements Document (PRD)

**Version:** 1.0  
**Status:** Implementation-ready specification  
**Product:** BDG TRANS — Rental Kendaraan & Transportasi Wisata Bandung  
**Primary conversion:** Permintaan penawaran melalui formulir website → WhatsApp admin  
**WhatsApp destination:** `6289528051760`

> **INSTRUKSI UNTUK CODEX:** Implementasikan website production-ready berdasarkan dokumen ini. Jangan berhenti pada mockup atau scaffold. Buat seluruh halaman, komponen, konten, validasi, aset sementara, SEO, pengujian, dan dokumentasi deployment. Bila tool generasi gambar tersedia, hasilkan gambar sementara dan simpan sebagai file lokal; jika tidak tersedia, gunakan aset lokal placeholder yang jelas berlabel sementara dan dokumentasikan aset yang masih harus diganti. Jangan mengklaim foto AI sebagai foto armada BDG TRANS yang sesungguhnya. Jangan mengarang fakta bisnis.

---

## 1. Project Overview & Conversion Objectives

### 1.1 Identitas
- **Brand resmi:** BDG TRANS (jangan gunakan ODG TRANS).
- **Kategori:** Rental kendaraan untuk wisata, perjalanan keluarga, perjalanan dinas, dan antar-jemput bandara dari/ke Bandung.
- **Armada yang ditawarkan:** Toyota Hiace Commuter, Toyota Hiace Premio, Isuzu Elf Tayo, Toyota Innova Reborn, Toyota Avanza.
- **Target pengguna:** wisatawan rombongan, keluarga, perusahaan, dan pelanggan yang membutuhkan transportasi dari/ke Bandung.
- **Nilai utama yang dikomunikasikan:** pilihan armada dan proses permintaan penawaran yang praktis; hindari klaim seperti 'termurah', 'terpercaya sejak tahun X', '24 jam', 'ribuan pelanggan' tanpa bukti.
- **Goal:** pengguna memilih armada, mengisi detail perjalanan, lalu membuka WhatsApp admin dengan pesan siap kirim.
- **Secondary goal:** pengguna memahami layanan, pilihan kendaraan, alur reservasi, dan cara menghubungi admin.

### 1.2 Non-goals
- Tidak ada login, dashboard admin, CMS, database, payment gateway, checkout, pembayaran DP online, kalender ketersediaan real-time, API WhatsApp Business, atau sistem booking otomatis.
- Form tidak menyimpan data pengguna di server. WhatsApp dibuka di sisi klien setelah validasi; pengiriman pesan tetap dilakukan oleh pengguna.
- Tidak menampilkan harga atau harga perkiraan. Semua kendaraan memakai **Minta Penawaran**.

### 1.3 KPI yang dapat dipantau
- `hero_reservation_click`, `fleet_quote_click`, `reservation_form_valid`, `whatsapp_open_click`, `phone_contact_click`.
- Pengukuran analytics hanya diaktifkan bila ID layanan analytics tersedia dan persyaratan privasi dipenuhi; jangan membuat statistik konversi palsu.
- `whatsapp_open_click` bukan bukti pesan telah terkirim atau reservasi berhasil.

---

## 2. Recommended Tech Stack & Architecture

| Area | Keputusan |
|---|---|
| Framework | Next.js App Router, React, TypeScript (strict) |
| Styling | Tailwind CSS, CSS custom properties |
| UI | shadcn/ui berbasis Radix, Lucide React |
| Motion | Motion for React (`motion/react`), secukupnya |
| Forms | React Hook Form + Zod + `@hookform/resolvers` |
| Images | `next/image` untuk aset lokal; `next/font` untuk font |
| State | React local state dan URL query; tanpa global store |
| Content | Typed static data pada `src/constants/*.ts` |
| Deployment | Vercel atau host Node.js yang mendukung Next.js |
| Tests | Vitest + React Testing Library; Playwright untuk alur kritis |
| Backend | Tidak diperlukan untuk MVP |

### 2.1 Struktur direktori

```text
bdg-trans/
├── public/
│   ├── brand/              # logo resmi yang diberikan pengguna
│   ├── images/
│   │   ├── hero/
│   │   ├── fleet/
│   │   ├── services/
│   │   └── gallery/
│   └── og/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── armada/[slug]/page.tsx
│   │   ├── kebijakan-privasi/page.tsx
│   │   └── syarat-ketentuan/page.tsx
│   ├── components/
│   │   ├── layout/          # Header, MobileNav, Footer, StickyMobileCTA
│   │   ├── sections/        # Hero, Highlights, About, Fleet, Services, Benefits,
│   │   │                    # BookingSteps, Gallery, Testimonials, FAQ, FinalCTA
│   │   ├── fleet/           # FleetCard, FleetDetails
│   │   ├── reservation/     # ReservationForm, ReservationSummary
│   │   └── ui/              # shadcn/ui components
│   ├── constants/
│   │   ├── brand.ts
│   │   ├── navigation.ts
│   │   ├── fleet.ts
│   │   ├── services.ts
│   │   ├── gallery.ts
│   │   ├── testimonials.ts
│   │   └── faq.ts
│   ├── lib/
│   │   ├── whatsapp.ts
│   │   ├── reservation-schema.ts
│   │   ├── seo.ts
│   │   └── utils.ts
│   └── types/
│       └── content.ts
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.example
├── README.md
└── package.json
```

### 2.2 Prinsip implementasi
- Server Components default; gunakan `use client` hanya untuk form, mobile navigation, accordion, dan interaksi yang perlu.
- Semua data armada, layanan, FAQ, navigasi, kontak, dan konten hero berada di constants; komponen menerima props bertipe jelas.
- Hindari ketergantungan runtime ke layanan eksternal untuk render konten utama.
- Tidak perlu API route atau Server Action untuk form WhatsApp-only.
- Pastikan `npm run lint`, `npm run typecheck`, `npm run build`, dan tes yang relevan lulus.

---

## 3. Visitor Journey & Conversion Funnel

1. Pengunjung membuka `/` dan melihat foto landscape kendaraan, headline, serta CTA **Minta Penawaran** dan **Jelajahi Armada**.
2. CTA **Jelajahi Armada** scroll ke `#armada`; CTA **Minta Penawaran** scroll ke `#reservasi`.
3. Pengunjung memilih kartu armada; tombol **Minta Penawaran** menuju `/#reservasi?` tidak valid sebagai query. Implementasikan navigasi dengan `/?armada=<slug>#reservasi` atau state client yang ekuivalen. Pada halaman detail, tautan menggunakan `/?armada=<slug>#reservasi`.
4. Form membaca parameter `armada`, memilih armada sesuai slug, lalu fokus ke judul/form secara aksesibel tanpa menggusur header.
5. Pengunjung mengisi form; validasi inline muncul untuk field tidak valid.
6. Setelah valid, tampilkan ringkasan singkat dan tombol **Lanjut ke WhatsApp**. Saat diklik, buka `https://wa.me/6289528051760?text=<encoded-message>` melalui user gesture langsung. Untuk kompatibilitas popup blocker, boleh langsung melakukan navigasi `window.location.href` setelah validasi.
7. Tampilkan penjelasan: **“Permintaan Anda belum menjadi reservasi. Admin akan mengonfirmasi ketersediaan armada, penawaran harga, dan ketentuan pembayaran melalui WhatsApp.”**
8. Tidak ada toast **Reservasi berhasil** karena website tidak dapat memverifikasi pesan terkirim.

**Anchor navigation:** `#beranda`, `#tentang`, `#armada`, `#layanan`, `#galeri`, `#faq`, `#reservasi`; gunakan `scroll-behavior: smooth` dan `scroll-margin-top` untuk sticky header, hormati `prefers-reduced-motion`.

---

## 4. Section-by-Section Functional & Content Specifications

Untuk semua section: implementasikan HTML semantik, spacing konsisten, responsivitas, alt text faktual, dan animasi yang tidak menghalangi konten. Semua teks di bawah adalah copy awal siap pakai, kecuali bagian yang secara eksplisit ditandai membutuhkan verifikasi.

### 4.1 Sticky Navbar
**Tujuan:** navigasi dan akses reservasi dari seluruh halaman.
- Kiri: logo resmi BDG TRANS; bila logo yang diberikan masih berlabel berbeda, jangan mengedit identitas tanpa persetujuan. Gunakan wordmark teks **BDG TRANS** sementara dan catat kebutuhan file logo final.
- Menu: Beranda, Tentang, Armada, Layanan, Galeri, FAQ.
- CTA kanan: **Minta Penawaran** → `/#reservasi`.
- Desktop header tinggi sekitar 76–84 px, latar putih dengan shadow tipis saat scroll; gunakan navy untuk tombol utama.
- Mobile: tombol menu berlabel, drawer dengan fokus terkelola, Escape untuk tutup, dan close saat link dipilih.

### 4.2 Hero — Full Landscape Photography
**Tujuan:** langsung mengkomunikasikan layanan dan memicu CTA.
- **Eyebrow:** `SEWA KENDARAAN DI BANDUNG`
- **H1:** `Perjalanan Nyaman Dimulai Bersama BDG TRANS`
- **Body:** `Butuh kendaraan untuk wisata, perjalanan keluarga, perjalanan dinas, atau antar-jemput bandara? Temukan pilihan armada yang sesuai dan kirim permintaan penawaran dengan mudah.`
- **CTA utama:** `Minta Penawaran` → `#reservasi`.
- **CTA kedua:** `Jelajahi Armada` → `#armada`.
- Foto landscape asli di kemudian hari; sementara generate visual realistis kendaraan travel modern di lokasi Bandung tanpa logo, nomor polisi terbaca, atau identitas palsu. Jangan membuat gambar yang mengesankan unit tertentu pasti dimiliki BDG TRANS.
- Desktop `min-height: 85svh`; `background-position: center`; implementasikan dengan `Image fill`, `sizes="100vw"`, `priority`, `object-cover`.
- Overlay `linear-gradient(90deg, rgba(1,32,73,.86) 0%, rgba(1,32,73,.48) 55%, rgba(1,32,73,.12) 100%)`.
- Teks overlay tetap berupa HTML, bukan tertanam di gambar. Batasi lebar H1 sekitar 700 px; desktop `clamp(2.8rem,5vw,5rem)`.
- Mobile tinggi minimal sekitar `75svh`, cropping disesuaikan, overlay lebih gelap, CTA vertikal dan touch target ≥44 px.
- Jika gambar tidak tersedia, fallback gradient navy dan teks tetap terbaca; jangan gunakan gambar broken.

### 4.3 Highlights
**Tujuan:** menjelaskan manfaat yang dapat dipastikan tanpa klaim palsu.
- Heading aksesibel: `Pilihan Perjalanan Lebih Praktis`.
- Tiga item: `Pilihan Armada` — `Pilih kendaraan sesuai kebutuhan perjalanan Anda.`; `Beragam Keperluan` — `Untuk wisata, keluarga, perjalanan dinas, dan antar-jemput bandara.`; `Penawaran via WhatsApp` — `Sampaikan detail perjalanan dan diskusikan kebutuhan langsung dengan admin.`
- Layout 3 kolom desktop, stacked mobile; ikon `BusFront`, `MapPinned`, `MessageCircle`.
- **Dilarang:** menampilkan 4.9/5, 5000+ pelanggan, 10+ tahun, garansi layanan, atau badge mitra tanpa data.

### 4.4 About
- Eyebrow: `KENALI BDG TRANS`
- H2: `Transportasi untuk Beragam Rencana Perjalanan`
- Body: `BDG TRANS menyediakan pilihan kendaraan untuk kebutuhan perjalanan dari dan menuju Bandung. Jelajahi armada yang tersedia, tentukan kebutuhan perjalanan, lalu hubungi admin untuk memperoleh penawaran.`
- CTA: `Lihat Armada` → `#armada`.
- Layout split 50:50 dengan visual perjalanan sementara dan blok teks. Jangan mengarang alamat kantor, izin usaha, atau tahun berdiri.

### 4.5 Fleet Catalog
- Eyebrow: `PILIHAN ARMADA`
- H2: `Temukan Kendaraan yang Sesuai untuk Perjalanan Anda`
- Body: `Lihat pilihan kendaraan dan kirim detail perjalanan untuk mendapatkan penawaran dari admin.`
- Kartu lima armada dengan foto, nama, deskripsi, kategori singkat, CTA `Lihat Detail` dan `Minta Penawaran`.
- Data awal:
  - `hiace-commuter`: `Toyota Hiace Commuter`; `Pilihan minibus untuk perjalanan bersama rombongan.`
  - `hiace-premio`: `Toyota Hiace Premio`; `Alternatif minibus untuk kebutuhan perjalanan kelompok.`
  - `elf-tayo`: `Isuzu Elf Tayo`; `Pilihan kendaraan rombongan untuk perjalanan bersama.`
  - `innova-reborn`: `Toyota Innova Reborn`; `Pilihan MPV untuk perjalanan keluarga atau kelompok kecil.`
  - `avanza`: `Toyota Avanza`; `Pilihan MPV untuk perjalanan dengan rombongan lebih kecil.`
- Jangan menetapkan kapasitas kursi, tipe transmisi, tahun unit, fasilitas, bagasi, harga, atau ketersediaan tanpa verifikasi. UI menampilkan `Kapasitas: Konfirmasi ke admin` jika diperlukan; lebih baik hilangkan baris kapasitas daripada menampilkan angka palsu.
- Kartu responsif: 1 kolom mobile, 2 tablet, 3 desktop; rasio foto 4:3; hover elevation 4 px, durasi 180 ms.
- CTA armada membuka form dengan kendaraan sudah terpilih melalui query `/?armada=<slug>#reservasi`.
- Detail kendaraan `/armada/[slug]` menampilkan foto, deskripsi, use case, penjelasan informasi kapasitas/fasilitas harus dikonfirmasi, dan CTA reservasi; 404 untuk slug tidak dikenal.

### 4.6 Services
- Eyebrow: `LAYANAN KAMI`
- H2: `Satu Tempat untuk Beragam Kebutuhan Transportasi`
- Kartu:
  1. `Perjalanan Wisata` — `Rencanakan perjalanan wisata bersama keluarga, teman, atau rombongan.`
  2. `Perjalanan Dinas` — `Ajukan kebutuhan kendaraan untuk agenda kerja dan kegiatan perusahaan.`
  3. `Antar-Jemput Bandara` — `Diskusikan kebutuhan penjemputan atau pengantaran bandara dengan admin.`
  4. `Perjalanan Keluarga` — `Pilih armada untuk kunjungan keluarga dan perjalanan bersama.`
- Setiap kartu CTA `Tanyakan Layanan` yang mengisi jenis perjalanan pada form; jangan menyebut bandara/rute spesifik sebagai layanan pasti tanpa verifikasi.

### 4.7 Why Choose Us
- H2: `Rencanakan Perjalanan Tanpa Ribet`
- Poin: `Pilih armada berdasarkan kebutuhan`, `Sampaikan detail penjemputan dan tujuan`, `Diskusikan penawaran langsung dengan admin`.
- Layout grid atau editorial split; jangan menampilkan janji operasional yang belum dibuktikan.

### 4.8 Booking Steps
- Eyebrow: `CARA RESERVASI`
- H2: `Tiga Langkah untuk Meminta Penawaran`
- Langkah 1: `Pilih Armada` — `Jelajahi pilihan kendaraan yang tersedia di website.`
- Langkah 2: `Isi Detail Perjalanan` — `Masukkan tanggal, titik jemput, tujuan, dan kebutuhan penumpang.`
- Langkah 3: `Diskusikan via WhatsApp` — `Kirim permintaan ke admin untuk memperoleh informasi ketersediaan dan harga.`
- Catatan: `Reservasi dikonfirmasi oleh admin setelah detail perjalanan, ketersediaan, dan pembayaran disepakati.`

### 4.9 Gallery
- Eyebrow: `GALERI PERJALANAN`
- H2: `Lihat Gambaran Armada dan Perjalanan`
- Sebelum foto asli tersedia, gambar AI boleh ditampilkan dengan label yang jelas: `Ilustrasi visual sementara — bukan dokumentasi armada aktual.`
- Grid masonry-like dengan rasio konsisten; klik membuka dialog lightbox aksesibel (Escape, fokus, tombol tutup).
- Jangan menyebut visual AI sebagai dokumentasi pelanggan.

### 4.10 Testimonials
- Jangan buat nama pelanggan, foto profil, rating, atau kutipan yang tampak seperti ulasan asli.
- Bila testimoni terverifikasi belum tersedia, **jangan render section testimonials**. Siapkan komponen dan typed data dengan array kosong, lalu render hanya jika data memiliki `verified: true` dan izin publikasi.
- Sebagai pengganti, tampilkan section informatif `Ada Pertanyaan tentang Perjalanan Anda?` dengan CTA `Tanya Admin via WhatsApp`.

### 4.11 FAQ
- Eyebrow: `PERTANYAAN UMUM`
- H2: `Informasi Sebelum Mengajukan Reservasi`
- Accordion single/multiple open sesuai standar shadcn, keyboard accessible.
- Q: `Bagaimana cara meminta penawaran?` A: `Pilih armada, isi formulir perjalanan, lalu lanjutkan ke WhatsApp untuk mengirim permintaan kepada admin.`
- Q: `Apakah harga sewa ditampilkan di website?` A: `Harga diberikan melalui penawaran admin berdasarkan detail kebutuhan perjalanan.`
- Q: `Apakah mengisi formulir berarti reservasi sudah dikonfirmasi?` A: `Belum. Admin akan memeriksa ketersediaan dan memberikan konfirmasi melalui WhatsApp.`
- Q: `Apakah saya bisa memilih kendaraan tertentu?` A: `Ya. Pilih salah satu armada pada katalog dan cantumkan kebutuhan Anda di formulir.`
- Q: `Bagaimana mengetahui ketentuan pembayaran dan pembatalan?` A: `Silakan konfirmasi ketentuan pembayaran, perubahan jadwal, dan pembatalan kepada admin sebelum menyetujui reservasi.`
- Q: `Apakah tersedia layanan antar-jemput bandara?` A: `Anda dapat mengajukan kebutuhan antar-jemput bandara melalui formulir. Admin akan mengonfirmasi rute dan ketersediaannya.`

### 4.12 Reservation Form
- Eyebrow: `MINTA PENAWARAN`
- H2: `Ceritakan Rencana Perjalanan Anda`
- Body: `Isi detail di bawah agar admin dapat menyiapkan informasi kendaraan dan penawaran yang sesuai.`
- Semua field, validasi, dan format pesan mengikuti Bagian 6–7.
- Tombol final: `Lanjut ke WhatsApp` dengan ikon `MessageCircle`.
- Informasi bawah form: `Anda akan diarahkan ke WhatsApp. Pengiriman pesan dan konfirmasi reservasi dilakukan melalui percakapan dengan admin.`
- Desktop form 2 kolom untuk field pendek, 1 kolom untuk alamat/tujuan/catatan; mobile 1 kolom.

### 4.13 Final CTA
- Background solid `#013274` dengan dekorasi geometris navy muda yang subtil, tanpa gradient mencolok.
- H2: `Sudah Siap Merencanakan Perjalanan?`
- Body: `Pilih armada dan sampaikan kebutuhan perjalanan Anda kepada tim BDG TRANS.`
- CTA: `Minta Penawaran Sekarang` → `#reservasi`.

### 4.14 Footer
- Wordmark BDG TRANS, ringkasan layanan, anchor navigasi, tautan kebijakan privasi, syarat & ketentuan, dan kontak WhatsApp.
- Copy: `BDG TRANS — Pilihan kendaraan untuk kebutuhan perjalanan di Bandung.`
- Kontak: `WhatsApp: +62 895-2805-1760`.
- Link Instagram hanya jika handle resmi dikonfirmasi; jangan otomatis menyamakan akun Instagram referensi dengan akun brand baru.
- Copyright: `© {currentYear} BDG TRANS. Hak cipta dilindungi.`
- Jangan mengarang alamat, email, nomor izin, atau badan hukum.

---

## 5. Page-by-Page Breakdown & Routing

| Route | Fungsi |
|---|---|
| `/` | Landing page semua section dan form reservasi |
| `/armada/[slug]` | Detail masing-masing armada dari typed static data |
| `/kebijakan-privasi` | Kebijakan transparan bahwa data form digunakan untuk menyusun pesan WhatsApp di browser; sesuaikan dengan analytics aktual |
| `/syarat-ketentuan` | Informasi bahwa pengajuan bukan konfirmasi booking; detail transaksi disepakati bersama admin; jangan mengarang syarat DP |
| `not-found.tsx` | 404 branded, tombol kembali ke beranda |
| `sitemap.ts`, `robots.ts` | SEO crawl metadata |

**Urutan komponen `/`:** `Header → Hero → Highlights → About → Fleet → Services → WhyChooseUs → BookingSteps → Gallery → TestimonialsOrContactPrompt → FAQ → ReservationForm → FinalCTA → Footer → StickyMobileCTA`.

**Parameter query:** `armada` hanya menerima slug valid dari daftar armada; slug tidak dikenal tidak boleh menyebabkan crash, gunakan pilihan default kosong dan tampilkan pesan informatif.

---

## 6. Content Data Structures & Form Validation

### 6.1 Data types (contoh wajib dikembangkan sebagai implementasi nyata)

```ts
export type FleetSlug =
  | 'hiace-commuter'
  | 'hiace-premio'
  | 'elf-tayo'
  | 'innova-reborn'
  | 'avanza';

export interface FleetItem {
  slug: FleetSlug;
  name: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  category: 'minibus' | 'mpv';
  capacity?: number; // omit until verified
  facilities?: string[]; // omit until verified
  imageIsIllustration: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  verified: boolean;
  permissionGranted: boolean;
}
```

### 6.2 Form fields

| Field | Key | Type | Required | Rules |
|---|---|---|---|---|
| Nama pemesan | `fullName` | text | Ya | Trim, 2–100 karakter |
| Nomor WhatsApp pemesan | `whatsappNumber` | tel | Ya | Normalisasi `08…` → `628…`, atau `+62…` → `62…`; validasi 9–15 digit total, diawali `62`; jangan kirim format mentah |
| Pilihan armada | `fleetSlug` | select | Ya | Enum dari 5 slug |
| Jumlah penumpang | `passengers` | number | Ya | Integer 1–60; tidak otomatis menyatakan kendaraan muat sebanyak itu |
| Tanggal jemput | `pickupDate` | date | Ya | Tanggal hari ini atau setelahnya, dalam zona Asia/Jakarta |
| Jam jemput | `pickupTime` | time | Ya | Format `HH:mm`; bila hari ini, waktu harus di masa depan menurut Asia/Jakarta |
| Tanggal selesai | `endDate` | date | Ya | >= tanggal jemput |
| Lokasi penjemputan | `pickupLocation` | text | Ya | Trim, 5–250 karakter |
| Tujuan perjalanan | `destination` | textarea | Ya | Trim, 3–500 karakter |
| Jenis perjalanan | `tripType` | select | Ya | `wisata`, `dinas`, `bandara`, `keluarga`, `lainnya` |
| Catatan tambahan | `notes` | textarea | Tidak | Maksimal 1000 karakter |

- Implementasikan schema Zod yang dipakai bersama React Hook Form, error inline berbahasa Indonesia, dan `aria-invalid` / `aria-describedby`.
- Saat user memilih armada dari kartu, prefill field `fleetSlug`. Jangan menghapus field lain yang sudah diisi.
- Batasi karakter dan gunakan sanitasi teks untuk mencegah control character/line break tak terduga di label satu baris; `encodeURIComponent` wajib untuk isi URL.
- `passengers` > kapasitas armada tidak otomatis ditolak karena kapasitas unit belum terverifikasi; admin menentukan kecocokan.
- Tidak ada pengiriman ke backend, localStorage, atau database.
- Sertakan checkbox persetujuan yang tidak dicentang secara default: `Saya memahami bahwa data ini akan dibuka dalam WhatsApp untuk dikirim kepada admin BDG TRANS.` Wajib sebelum CTA aktif.

---

## 7. WhatsApp Integration, SEO & Metadata

### 7.1 WhatsApp builder

```ts
export const ADMIN_WHATSAPP = '6289528051760';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
```

**Template pesan persis:**

```text
Halo Admin BDG TRANS, saya ingin meminta penawaran sewa kendaraan.

Nama: {fullName}
Nomor WhatsApp: {normalizedWhatsappNumber}
Armada: {fleetName}
Jumlah penumpang: {passengers} orang
Tanggal penjemputan: {pickupDateFormatted}
Jam penjemputan: {pickupTime} WIB
Tanggal selesai: {endDateFormatted}
Lokasi penjemputan: {pickupLocation}
Tujuan perjalanan: {destination}
Jenis perjalanan: {tripTypeLabel}
Catatan tambahan: {notesOrDash}

Mohon informasi ketersediaan armada, penawaran harga, dan ketentuan reservasinya. Terima kasih.
```

- Format tanggal `id-ID`, `Asia/Jakarta`, contoh `7 November 2026`.
- Uji karakter khusus, emoji, ampersand, multiline, serta nomor WhatsApp yang dinormalisasi.
- Jangan menyimpan status “pesan terkirim” karena website tidak memiliki akses status pengiriman.
- Tautan WhatsApp generik (tanpa form) boleh digunakan di footer sebagai fallback, tetapi CTA utama wajib menuju form.

### 7.2 SEO
- Site title homepage: `BDG TRANS | Sewa Hiace & Rental Kendaraan Bandung`.
- Meta description: `Jelajahi pilihan Hiace Commuter, Hiace Premio, Elf Tayo, Innova Reborn, dan Avanza di BDG TRANS. Ajukan kebutuhan perjalanan dan minta penawaran melalui WhatsApp.`
- Title template: `%s | BDG TRANS`.
- Armada detail: `Sewa {fleetName} Bandung | BDG TRANS`.
- OpenGraph/Twitter cards menggunakan brand dan visual representatif yang tidak mengklaim armada asli.
- Canonical dan sitemap memakai `NEXT_PUBLIC_SITE_URL`; dokumentasikan nilai yang harus diisi saat domain resmi tersedia. Jangan hardcode domain yang belum diverifikasi.
- JSON-LD: gunakan `Organization` dan `WebSite` dengan nama BDG TRANS, URL dari env, serta `contactPoint` WhatsApp. Jangan tambahkan `aggregateRating`, `review`, alamat, jam buka, atau `LocalBusiness` berisi detail yang belum terverifikasi.
- `robots.ts`: index halaman publik setelah deployment produksi; hindari index untuk staging.
- Heading: satu H1 per halaman, hierarki H2/H3 benar, breadcrumb pada detail armada.
- Pastikan gambar memiliki `alt` yang tidak menyatakan ilustrasi sebagai foto asli.

### 7.3 Privacy
- Form diproses di browser dan disusun menjadi URL WhatsApp; tidak ada pengiriman ke server BDG TRANS oleh website MVP.
- Jelaskan bahwa setelah membuka WhatsApp, pemrosesan pesan tunduk pada kebijakan WhatsApp dan komunikasi dengan admin.
- Jika analytics diaktifkan, jangan kirim nama, nomor telepon, alamat jemput, atau pesan mentah sebagai event property.

---

## 8. UI/UX, Brand Styling & Responsiveness

### 8.1 Brand palette

> **Catatan warna:** Gambar logo yang diberikan memiliki latar navy gelap dan simbol putih. Gunakan `#013274` sebagai token kerja awal yang dapat dikalibrasi kembali terhadap file logo resmi berkualitas tinggi. Jangan gunakan oranye/kuning/hijau sebagai warna dominan.

```css
:root {
  --brand-primary: #013274;
  --brand-primary-dark: #012657;
  --brand-primary-hover: #06438d;
  --brand-primary-light: #eaf1fa;
  --background: #ffffff;
  --background-muted: #f5f7fb;
  --surface: #ffffff;
  --foreground: #17263c;
  --foreground-muted: #64748b;
  --border: #e2e8f0;
  --focus-ring: #1b67c9;
}
```

- **Theme:** light premium, navy sebagai aksen utama. Tidak perlu dark-mode toggle.
- **Font:** `Plus Jakarta Sans` untuk heading dan `Inter` untuk body via `next/font/google`; gunakan fallback system fonts.
- **Container:** max-width 1200–1280 px, padding horizontal 20 px mobile, 32 px tablet, 40 px desktop.
- **Spacing section:** 72–96 px mobile, 96–120 px desktop; hindari ruang kosong berlebihan.
- **Buttons:** radius 10–12 px, tinggi min 44–48 px; hover dan focus jelas; outline sekunder kontras.
- **Cards:** radius 16–20 px, border lembut, shadow ringan.
- **Images:** natural, modern, realistis; tidak ada watermark atau teks AI tertanam di gambar.
- **Motion:** fade/translate kecil 8–16 px, 150–400 ms, animasi sekali saat reveal; hormati reduced motion.

### 8.2 Breakpoints
- `<640px`: satu kolom, navbar drawer, hero CTA stack, sticky bottom CTA `Minta Penawaran` dengan safe-area inset.
- `640–1023px`: dua kolom kartu, typography menengah.
- `>=1024px`: navbar horizontal, 3 kolom armada, split layout, form 2 kolom.
- `>=1440px`: batasi konten dalam container, tetapi hero image tetap full bleed.
- Hindari horizontal scroll, teks terpotong, form yang tertutup keyboard, dan sticky CTA yang menutupi footer/form; sembunyikan sticky CTA saat form terlihat.

### 8.3 Accessibility & performance
- WCAG 2.2 AA target: contrast teks, fokus terlihat, keyboard navigable, label input, aria-live untuk error/status.
- Optimalkan LCP hero: local WebP/AVIF, preload/priority, ukuran responsif; lazy-load gallery dan gambar di bawah fold.
- Hindari layout shift dengan `aspect-ratio` dan dimensi gambar.
- Tidak ada autoplay video atau carousel yang sulit dikendalikan.
- Target Lighthouse produksi: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95 (target, bukan klaim hasil).

---

## 9. AI Visual Assets & Content Policy

### 9.1 Generasi aset sementara
Jika tersedia image generation tool, buat dan simpan:
1. `public/images/hero/hero-bdg-trans.webp`: 16:9 atau lebih lebar, fotografi komersial realistis, minibus premium putih/netral di jalan dengan suasana Bandung, pencahayaan pagi, ruang negatif di kiri untuk headline, tanpa teks/logo/plat yang terbaca.
2. Lima foto kendaraan `public/images/fleet/{slug}.webp`: sudut 3/4 depan, latar realistis konsisten, tanpa merek BDG TRANS fiktif atau detail identitas palsu; representasi model kendaraan harus mendekati model asli.
3. `public/images/services/*.webp`: perjalanan wisata, keluarga, dinas, dan bandara dengan suasana natural; hindari wajah orang yang terlalu dominan.
4. `public/images/gallery/*.webp`: 4–6 foto ilustratif perjalanan dan kendaraan.
5. `public/og/og-bdg-trans.png`: 1200×630 dengan teks BDG TRANS dan elemen visual navy; hindari klaim yang tidak terverifikasi.

Jika image generator tidak tersedia: jangan mengeksekusi perintah API gambar palsu; gunakan fallback gradient/placeholder lokal yang rapi, buat daftar kebutuhan aset pada `README.md`, dan tandai `imageIsIllustration: true`. Jangan mengunduh foto berhak cipta tanpa lisensi.

### 9.2 Logo
- Referensi pengguna menunjukkan background navy dan simbol putih, tetapi nama brand final yang dikonfirmasi adalah **BDG TRANS**.
- Jangan menggunakan file logo dengan teks brand berbeda pada produksi. Gunakan wordmark tipografi `BDG TRANS` sementara dan jelaskan perlunya aset logo final yang benar.
- Jangan mencoba menyamarkan/mengubah teks logo lewat CSS yang menyesatkan.

### 9.3 Konten belum diverifikasi
- Tidak ada testimoni fiktif, harga fiktif, foto pelanggan palsu, kapasitas palsu, kontak selain nomor resmi, alamat kantor rekaan, atau jam layanan yang tidak dikonfirmasi.
- Semua konten visual AI harus berlabel ilustrasi pada tempat yang relevan.

---

## 10. Implementation Plan for Autonomous Coding Agent

### Phase 1 — Bootstrap & Tokens
- Inisialisasi Next.js TypeScript strict, Tailwind, shadcn/ui, lint, formatter, test setup.
- Konfigurasi font, theme tokens, metadata dasar, env example, content types.
- Tambahkan data 5 armada, layanan, FAQ, brand dan kontak di constants.
- **Gate:** lint, typecheck, build lulus.

### Phase 2 — Shared Components
- Bangun Button, Card, Input, Select, Textarea, Accordion, Dialog, Header, MobileNav, Footer.
- Implementasikan navigasi anchor dan focus states.
- **Gate:** responsif dan keyboard-accessible.

### Phase 3 — Above the Fold
- Implementasikan hero full-bleed, overlay navy, headline HTML, CTA, highlights, about.
- Integrasikan aset gambar lokal/fallback; tidak boleh ada broken images.
- **Gate:** mobile dan desktop tampil proporsional, CTA bekerja.

### Phase 4 — Core Sections & Fleet Routes
- Fleet catalog + detail armada statis, services, benefits, booking steps, gallery, FAQ, final CTA.
- Testimonials disembunyikan jika belum ada verified data.
- **Gate:** semua 5 slug valid, slug invalid 404, semua link berfungsi.

### Phase 5 — Reservation Conversion
- Implementasikan form, Zod schema, date/time validation Asia/Jakarta, prefill armada, consent, message builder, dan redirect WhatsApp.
- Unit test URL encoding, tanggal, field kosong, slug tidak valid, nomor telepon.
- E2E: dari kartu armada → form prefilled → validasi → WhatsApp URL tepat.
- **Gate:** tidak ada request backend, tidak ada klaim reservasi berhasil otomatis.

### Phase 6 — SEO, Performance & Final QA
- Implementasikan metadata per route, OpenGraph, sitemap, robots, JSON-LD, privacy dan terms.
- Optimasi image, CLS, mobile sticky CTA, reduced motion, contrast, focus.
- Jalankan lint/typecheck/build/unit/e2e dan audit accessibility; perbaiki error yang ditemukan.
- Buat `README.md` mencakup setup, env, edit konten, ganti foto/logo, deployment, batasan reservasi WhatsApp-only.
- **Gate:** seluruh acceptance criteria pada Bagian 11 terpenuhi.

---

## 11. Acceptance Criteria (Definition of Done)

1. Semua halaman dan rute berjalan tanpa error console atau hydration error.
2. Brand yang terlihat selalu **BDG TRANS**, bukan ODG TRANS.
3. Palet utama navy `#013274` + putih, sesuai arah logo; tidak ada aksen warna asing dominan.
4. Hero memakai visual landscape full-bleed, overlay navy, headline HTML, dan dua CTA berfungsi.
5. Katalog memuat persis lima jenis armada yang disepakati.
6. Tidak ada harga, rating, jumlah pelanggan, testimoni, atau kapasitas yang dikarang.
7. Tombol **Minta Penawaran** pada tiap kartu prefill armada yang tepat di form.
8. Form menolak input invalid dan tanggal yang tidak logis; pesan error mudah dipahami.
9. Form valid menghasilkan URL WhatsApp menuju `6289528051760` dengan semua data yang benar dan encoded.
10. Tidak ada penyimpanan PII ke database/localStorage atau pengiriman PII ke analytics.
11. UI tidak mengklaim WhatsApp telah mengirim pesan atau booking telah dikonfirmasi.
12. Gambar AI diberi label ilustrasi; bila belum tersedia, placeholder rapi dan tidak rusak.
13. Navbar, anchor, accordion, gallery, detail armada, mobile CTA, footer berfungsi.
14. Mobile 360 px, 390 px, tablet 768 px, desktop 1280 px dan widescreen 1440 px bebas horizontal overflow.
15. Keyboard navigation, form labels, error announcements, focus rings, reduced motion diuji.
16. SEO metadata, OG, sitemap, robots, canonical, dan structured data tersedia tanpa data bisnis palsu.
17. `npm run lint`, `npm run typecheck`, `npm run build`, unit tests, dan E2E smoke tests lulus.
18. `README.md` menjelaskan cara mengganti aset dan memperbarui konten TypeScript tanpa dashboard.
19. Tidak ada `TODO` placeholder untuk fitur inti, tombol mati, atau tautan dummy `#`.
20. Website siap deploy setelah domain, logo resmi yang konsisten, dan foto asli diverifikasi.

---

## 12. Explicit Execution Instructions for Codex

1. Baca PRD ini secara menyeluruh sebelum menulis kode.
2. Audit repository: jika kosong, bootstrap; jika sudah ada, pertahankan konfigurasi yang kompatibel dan hindari menimpa pekerjaan pengguna.
3. Implementasikan berurutan Phase 1–6, lakukan pengujian pada setiap gate.
4. Jangan bertanya tentang pilihan minor yang sudah bisa diputuskan dari PRD; gunakan default yang aman, mudah dipelihara, dan responsif.
5. Untuk fakta bisnis yang belum dikonfirmasi, **jangan mengarang**; sembunyikan informasi atau beri keterangan konfirmasi admin.
6. Jika kemampuan generasi gambar tidak tersedia, lanjutkan implementasi dengan placeholder yang teridentifikasi jelas, bukan menghambat seluruh pekerjaan.
7. Setelah implementasi, laporkan file yang dibuat, perintah verifikasi dan hasil aktualnya, status aset sementara, serta informasi yang diperlukan sebelum produksi.
8. Jangan mengklaim pengujian telah lulus bila tidak benar-benar dijalankan.

**End of PRD — BDG TRANS.**
