# BDG TRANS

Website rental kendaraan Bandung berdasarkan `PRD_BDG_TRANS.md`. Next.js App Router, React, strict TypeScript, Tailwind CSS, komponen shadcn-style berbasis Radix, React Hook Form dan Zod. Seluruh konten utama dan gambar disajikan secara lokal; tidak ada backend pemesanan.

## Menjalankan

Gunakan Node.js 24 dan npm (versi ditetapkan di `.nvmrc`).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000. Untuk produksi: `npm run build` lalu `npm run start`.

## Validasi

```sh
npm run lint
npm run format:check
npm test
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
npm audit
```

E2E menjalankan build produksi melalui `next start`; lakukan build terlebih dahulu. Laporan HTML ada di `playwright-report/index.html`. Screenshot desktop dan mobile di `docs/`. WhatsApp dicegat oleh tes, sehingga tidak ada pesan nyata yang dikirim.

## Environment dan deployment

- `NEXT_PUBLIC_SITE_URL`: origin domain resmi yang telah diverifikasi, tanpa path. Biarkan kosong selama domain belum dikonfirmasi. Canonical dan URL structured data hanya dihasilkan bila origin valid tersedia. Sitemap kosong bila domain belum dikonfigurasi. OG memakai origin tersebut pada produksi.
- `SITE_INDEXABLE`: default `false`. Ubah menjadi `true` hanya pada domain produksi yang disetujui. Staging harus tetap `false`; robots dan meta robots mencegah index.
- Tidak ada analytics ID yang diberikan, sehingga analytics dan cookie pelacakan tidak diaktifkan. Jangan mengirim PII ke analytics bila integrasi ditambahkan kemudian. Nama event yang disiapkan PRD adalah `hero_reservation_click`, `fleet_quote_click`, `reservation_form_valid`, `whatsapp_open_click`, `phone_contact_click`. Membuka WhatsApp tidak membuktikan pesan terkirim.

Panduan lengkap: [Deployment Vercel](docs/deployment-vercel.md).

Deploy ke Vercel: import folder proyek ini, gunakan preset Next.js, isi kedua environment di atas, build `npm run build`. Untuk host Node, jalankan `npm ci`, `npm run build`, `npm run start` di balik HTTPS/reverse proxy. Set environment sebelum build dan rebuild setelah mengubah origin atau indexing. Tidak memerlukan database, server action, API key, atau WhatsApp Business API.

## Mengubah konten

- `src/constants/brand.ts`: nama, kontak, hero, label ilustrasi dan keterangan reservasi.
- `src/constants/fleet.ts`: tepat lima armada, deskripsi, use cases dan aset. Jangan isi kapasitas/fasilitas sebelum diverifikasi.
- `src/constants/services.ts`, `faq.ts`, `gallery.ts`, `navigation.ts`: layanan, FAQ, galeri dan navigasi.
- `src/constants/testimonials.ts`: array sengaja kosong. Section ulasan hanya ditampilkan jika `verified` dan `permissionGranted` keduanya benar.
- `src/lib/reservation-schema.ts`: validasi bersama dengan WIB (Asia/Jakarta).
- `src/lib/whatsapp.ts`: normalisasi nomor dan template pesan persis sesuai PRD.
- `src/app/globals.css`: token dan tata letak responsif.

## Foto dan identitas sementara

Logo asli pengguna berada di `public/images/icon/logo.jpg`. Header, footer dan menu mobile memakai turunan transparan `public/brand/logo-white.svg` dan `logo-navy.svg` dengan bentuk asli yang sama. SVG menyematkan JPEG sumber dan mengubah hanya background/warna melalui alpha filter, tanpa mendesain ulang atau meregangkan logo. Tulisan pada aset tetap “ODG TRANS”, sementara nama situs tetap BDG TRANS. Favicon dan OpenGraph juga memakai sumber asli tersebut. Semua foto kendaraan/perjalanan merupakan ilustrasi AI, bukan dokumentasi armada milik BDG TRANS.

Aset telah dihasilkan dengan tool image generation bawaan, disalin ke proyek dan dioptimalkan menjadi WebP:

- `public/images/hero/hero-bdg-trans.webp`
- `public/images/fleet/{hiace-commuter,hiace-premio,elf-tayo,innova-reborn,avanza}.webp`
- `public/images/services/{wisata,dinas,bandara,keluarga}.webp`
- `public/images/gallery/{perbukitan,minibus,keluarga,bandung}.webp` (turunan aset di atas)
- `public/og/og-bdg-trans.png` (komposisi merek 1200×630 dengan keterangan ilustrasi)

Prompt dan asal aset didokumentasikan di `docs/assets.md`. Ganti gambar pada path yang sama dengan foto berizin dan terverifikasi. Pertahankan rasio hero landscape dan armada 4:3. Setelah verifikasi, ubah `imageIsIllustration` per kendaraan dan sesuaikan label/alt yang relevan pada section dan data galeri. Komponen logo bersama berada di `src/components/layout/brand-logo.tsx`. Jangan menghapus label ilustrasi sebelum gambar benar-benar diganti.

## Batasan konversi dan privasi

Formulir menggunakan state memori browser. Tidak ada pengiriman formulir ke backend, database atau localStorage. Validasi meliputi nomor Indonesia 9–15 digit, batas panjang, armada enum, jumlah penumpang integer 1–60, tanggal kalender sah, tanggal jemput >= hari ini WIB, jam hari ini di masa depan dan tanggal selesai >= jemput. Jumlah penumpang tidak dianggap sebagai konfirmasi kapasitas.

Consent tidak dicentang otomatis. Pengguna memeriksa ringkasan kemudian menekan **Lanjut ke WhatsApp**. URL menuju `https://wa.me/6289528051760` memuat pesan ter-encode. URL dapat masuk ke riwayat browser dan diproses WhatsApp; pengguna tetap harus mengirim pesan sendiri. Admin menentukan ketersediaan, harga, pembayaran dan konfirmasi reservasi. Website tidak menyatakan booking atau pesan berhasil.

Tidak ada harga, rating, pelanggan fiktif, alamat, email, jam buka atau ketentuan DP yang dibuat-buat. Tidak ada integrasi Instagram tanpa akun resmi yang dikonfirmasi.

## Sebelum publikasi produksi

Verifikasi domain produksi, file logo BDG TRANS, foto unit dan hak penggunaan. Konfirmasikan informasi tambahan kapasitas/fasilitas dan kebijakan operasional sebelum menambahkannya. Isi origin produksi, aktifkan indexing hanya untuk domain tersebut dan ulangi build serta pemeriksaan SEO. Target Lighthouse adalah Performance >=90, Accessibility/Best Practices/SEO >=95; angka aktual dicatat terpisah dan bukan jaminan untuk semua jaringan/perangkat.

Lihat `docs/validation.md` untuk hasil pengujian aktual dan `docs/design-decisions.md` untuk alasan desain.

## Form ringkas di hero

Hero mengikuti arahan terakhir pengguna: foto penuh dengan overlay navy, judul ringkas dan form sederhana. Top bar transparan dengan logo putih di atas, lalu berubah ke latar putih dan logo navy setelah scroll. Tinggi top bar 72px menjadi 64px saat scroll. Pilihan armada, tanggal jemput dan jumlah penumpang diteruskan ke formulir lengkap melalui query `armada`, `tanggal`, `penumpang`. Nilai tanggal/jumlah divalidasi sebelum dipakai. Form hero tidak mengirim pesan WhatsApp; persetujuan, data lengkap dan review tetap dilakukan di bagian reservasi.

## Tipografi

Seluruh teks UI memakai Google Sans variable melalui Next Font, disajikan secara lokal dari hasil build. Font dan skala teks dikonfigurasi pada `src/app/layout.tsx` dan token di `src/app/globals.css`. Body regular; heading, label dan tombol medium 500, dengan fallback sistem Apple/Windows bila dibutuhkan. Google Sans menggantikan Inter/Plus Jakarta Sans pada desain sebelumnya. Logo dan decal kendaraan merupakan aset gambar, sehingga bentuk tulisan aslinya dipertahankan.

## Katalog armada terbaru

Kartu armada mengikuti referensi terbaru pengguna: gambar transparan menghadap kiri, decal logo asli, panel kontak navy dan tombol penawaran/detail. Lima gambar aktif ada di `public/images/fleet/cutouts/` dengan nama slug kendaraan. Data dan copy section berada di `src/constants/fleet.ts` (`fleet` dan `fleetContent`). Warna/decal adalah konsep ilustrasi; ketersediaan dan spesifikasi unit tetap dikonfirmasi kepada admin. Gambar scenic sebelumnya dipertahankan, tetapi tidak lagi dipakai sebagai foto katalog/detail aktif.

### Fleet detail showcase

`/armada/show` opens the redesigned vehicle detail view with Hiace Premio selected. Use `/armada/show?armada=avanza` (or another existing fleet slug) to preselect a model. The five canonical `/armada/{slug}` pages share the same design, including inline exterior/interior switching and a model-prefilled quote link. Interior concepts remain explicitly illustrative; availability, seating configuration, facilities and pricing are confirmed with admin.

### Komponen penawaran dan optimasi aset

Daftar komponen yang perlu dikonfirmasi berada di `src/constants/quote-scope.ts`, dipakai bersama pada detail armada, FAQ, dan syarat ketentuan. Daftar ini tidak menetapkan harga atau menyatakan sopir, BBM, tol, parkir, durasi, maupun kebutuhan menginap sudah termasuk paket.

Jalankan `npm run optimize:assets` untuk memeriksa dan mengompres gambar lokal. File asli disimpan di `artifacts/asset-originals/` (diabaikan Git), dan hasil per file ada di `artifacts/asset-compression.json`. File yang sudah dioptimasi dikenali lewat hash agar tidak dikompres lossy berulang. Penggantian aset baru mendapat salinan cadangan tersendiri. SVG mempertahankan bentuk/filter/data logo; PNG memakai kompresi lossless dan WebP mempertahankan kanal alpha. Favicon ICO kecil dipertahankan.

Hero memakai AVIF responsif untuk browser yang mendukungnya, dengan WebP sebagai fallback. Varian AVIF dibentuk dari sumber asli yang masih sesuai manifest, atau dari file saat ini bila aset telah diganti. Foto destinasi dimuat secara lazy. Ukuran `sizes` About mengikuti lebar layout aktual.

Notifikasi prototipe tetap muncul setiap pemuatan dokumen dan refresh; ringkasan dua kalimat selalu terlihat, penjelasan lengkap tersedia melalui “Baca penjelasan”. Tidak ada penyimpanan status dismissal.

## Perencana perjalanan

- **Bantu pilih kendaraan:** tombol di hero dan formulir membuka pertanyaan penumpang, koper sedang, dan keperluan. Saran menghitung contoh jumlah unit dari kursi/bagasi, bukan harga atau ketersediaan. Pemilihan dari hero mengisi query non-PII `armada`, `penumpang`, `unit`, `koper`, `jenis`; bantuan di formulir mengikuti isian kelompok utama dan mempertahankan data lain.
- **Denah kabin:** ditampilkan langsung pada seluruh halaman detail armada, setelah interior dan spesifikasi, tanpa perlu membuka panel. Semua konfigurasi saat ini berstatus `concept`, sesuai persetujuan pengguna untuk prototipe. Sumbernya `src/constants/vehicle-configurations.ts`; jangan mengubahnya menjadi `verified` sebelum susunan kursi, ruang koper dan unit aktual dikonfirmasi. Diagram informatif, bukan pemesanan kursi.
- **Beberapa armada:** kelompok utama memakai `fleetSlug`, `vehicleQuantity`, `passengers`; hingga empat kelompok tambahan memakai `additionalVehicles`. Penumpang dihitung per kelompok, bukan dikalikan jumlah unit. Seluruh kelompok mengikuti satu jadwal/rute. Batas pengajuan tetap 60 peserta total dan 10 unit; tidak memvalidasi kapasitas unit memakai data konsep.
- **Field layanan:** bandara/stasiun memiliki nomor transportasi dan jam kedatangan opsional; dinas memiliki nama perusahaan dan permintaan dokumen penawaran; wisata memiliki agenda dan daftar rute. Field tidak aktif disembunyikan, nilai editnya tetap ada di memori formulir, dan hasil validasi menyingkirkan detail layanan yang tidak dipilih dari ringkasan/pesan.
- **Jadwal:** jam selesai wajib, dengan pilihan sekali jalan/pulang pergi dan kebutuhan menginap. Selesai harus setelah jemput dalam WIB; untuk melewati tengah malam, tanggal selesai harus berganti. Rentang waktu bukan hari sewa/harga otomatis.
- **Rute:** alamat jemput atau tautan Maps yang valid dapat digunakan. Hingga enam pemberhentian tambahan bisa ditambah, diurutkan dengan panah dan dihapus. Tujuan akhir tetap terpisah; WhatsApp mempertahankan urutannya.
- **Lokasi perangkat:** hanya diminta setelah menekan “Gunakan lokasi saya”. Pengguna memeriksa koordinat/akurasi atau membuka pin, lalu memilih “Gunakan titik ini” sebelum URL masuk formulir. Penolakan izin, timeout atau kegagalan lokasi tetap memberi pilihan alamat/manual Maps. Produksi memerlukan HTTPS untuk API lokasi; localhost dapat dipakai untuk pengujian. Tidak ada pelacakan terus-menerus, database atau penyimpanan formulir persisten.

Pesan WhatsApp kini mencakup rincian kelompok/unit, total peserta, koper, jadwal lengkap, arah perjalanan, kebutuhan menginap, pin dan pemberhentian, serta detail layanan aktif. Pengiriman pesan tetap tindakan pengguna di WhatsApp, dan admin mengonfirmasi kecocokan unit serta reservasi.
