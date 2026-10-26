# Deploy prototipe ke Vercel

## Import proyek

1. Masuk ke Vercel, pilih **Add New → Project**, lalu import `mocitaz/BDGTrans`.
2. Gunakan branch `main`, root directory `./`, framework **Next.js**, dan Node.js **24.x**.
3. Install command `npm ci`, build command `npm run build`, output directory biarkan default Next.js. Pengaturan build sudah tersedia di `vercel.json`.
4. Tambahkan environment berikut untuk Production dan Preview, lalu pilih **Deploy**.

| Environment | Nilai |
| --- | --- |
| `SITE_INDEXABLE` | `false` selama website berupa prototipe |
| `NEXT_PUBLIC_SITE_URL` | Origin HTTPS deployment, misalnya `https://nama-proyek.vercel.app`, tanpa path atau slash di akhir |

Jika alamat Vercel belum diketahui saat deploy pertama, biarkan `NEXT_PUBLIC_SITE_URL` kosong. Setelah alamat tersedia, isi environment tersebut dan lakukan **Redeploy** agar canonical, sitemap, structured data, dan URL gambar Open Graph memakai origin yang benar. Perubahan environment memerlukan build ulang.

Preview branch tidak perlu memakai origin produksi: biarkan URL kosong bila tidak mempunyai origin preview yang tetap. Pertahankan `SITE_INDEXABLE=false` pada seluruh preview. Noindex mengatur mesin pencari, bukan pembatas akses; gunakan Vercel Deployment Protection bila demo perlu dibatasi.

## Setelah deploy

- Periksa beranda, seluruh detail armada, kebijakan privasi, dan syarat ketentuan pada ponsel dan desktop.
- Coba formulir, rekomendasi kendaraan, beberapa armada, pemberhentian, dan ringkasan WhatsApp. Pesan baru terkirim setelah pengunjung menekan kirim di WhatsApp.
- Uji lokasi perangkat melalui tombolnya. HTTPS Vercel mendukung permintaan izin lokasi; alamat manual tetap tersedia jika izin ditolak.
- Pastikan foto, logo, denah konsep, nomor admin, dan status prototipe sudah sesuai kebutuhan presentasi.

Tidak membutuhkan database, API key Maps, atau WhatsApp Business API. Proyek menggunakan runtime Next.js dan optimasi gambar bawaan; jangan mengganti build menjadi static export.

## Sebelum menjadi website resmi

Verifikasi informasi usaha, hak penggunaan aset, kapasitas dan konfigurasi kendaraan, serta ketentuan layanan. Ubah `SITE_INDEXABLE=true` hanya setelah domain resmi dan kontennya disetujui. Nama, jadwal, alamat, dan data formulir tidak disimpan oleh server aplikasi.

Referensi: [Deploy Next.js di Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [Node.js runtime](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Environment variables](https://vercel.com/docs/environment-variables).
