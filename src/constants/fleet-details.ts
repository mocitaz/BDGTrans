import type { FleetSlug } from "@/types/content";

interface FleetDetailContent {
  intro: string;
  cabin: string;
  cabinAlt: string;
  headline: string;
  metrics: { label: string; value: string }[];
  highlights: { title: string; description: string }[];
  reference: string;
  specs: { label: string; value: string }[];
  source: { title: string; url: string };
  cabinTitle: string;
  cabinDescription: string;
}
const hiaceSource = {
  title: "Toyota Indonesia · New Hiace 2022",
  url: "https://pressroom.toyota.astra.co.id/toyota-hadirkan-new-hiace-dan-new-dyna-dengan-tampilan-yang-lebih-modern-sebagai-andalan-terbaik-di",
};
export const fleetDetails: Record<FleetSlug, FleetDetailContent> = {
  "hiace-commuter": {
    headline: "Untuk wisata dan perjalanan rombongan.",
    intro:
      "Untuk wisata bersama, agenda kantor, dan perjalanan luar kota. Commuter mengutamakan kapasitas kabin agar rombongan bisa berangkat dalam satu kendaraan.",
    metrics: [
      { label: "Kursi standar", value: "16 kursi" },
      { label: "Mesin diesel", value: "3,0 L" },
      { label: "Tenaga", value: "136 PS" },
    ],
    highlights: [
      {
        title: "Kabin untuk rombongan",
        description: "16 kursi pada konfigurasi standar.",
      },
      {
        title: "Diesel 1KD-FTV",
        description: "Diesel 3,0 L, penggerak roda belakang.",
      },
      {
        title: "USB & keselamatan",
        description: "4 port USB, Dual SRS Airbags, ABS + BA.",
      },
    ],
    reference: "Hiace Commuter Euro 4 · model 2022",
    specs: [
      { label: "Kursi standar", value: "16 kursi" },
      { label: "Bahan bakar", value: "Diesel" },
      { label: "Kode mesin", value: "1KD-FTV" },
      { label: "Kapasitas mesin", value: "2.982 cc" },
      { label: "Tenaga maksimum", value: "136 PS / 3.400 rpm" },
      { label: "Torsi maksimum", value: "30,6 kgm / 1.200–2.400 rpm" },
      { label: "Transmisi", value: "Manual" },
      { label: "Penggerak", value: "Roda belakang" },
    ],
    source: hiaceSource,
    cabinTitle: "Ruang untuk berangkat bersama.",
    cabinDescription:
      "Tentukan jumlah peserta terlebih dahulu. Admin membantu mencocokkan susunan kursi dan kebutuhan bagasi untuk perjalanan rombonganmu.",
    cabin: "/images/fleet/interiors/hiace-commuter.webp",
    cabinAlt:
      "Ilustrasi konsep kabin minibus Hiace Commuter dengan kursi kain abu-abu",
  },
  "hiace-premio": {
    headline: "Ruang lebih leluasa untuk perjalanan jauh.",
    intro:
      "Minibus untuk kamu yang mengutamakan ruang kabin saat pergi bersama. Pilihan untuk perjalanan keluarga, tamu kantor, maupun agenda luar kota.",
    metrics: [
      { label: "Kursi belakang", value: "10 kursi" },
      { label: "Mesin diesel", value: "2,8 L" },
      { label: "Tenaga", value: "176,8 PS" },
    ],
    highlights: [
      {
        title: "Fokus pada ruang kabin",
        description: "10 kursi belakang pada acuan model 2022.",
      },
      {
        title: "Mesin VNT intercooler",
        description: "Diesel 2,8 L dengan manual 6 percepatan.",
      },
      {
        title: "Audio & charging",
        description: "Layar AVX 7 inci dan 4 port USB.",
      },
    ],
    reference: "Hiace Premio Euro 4 · model 2022",
    specs: [
      { label: "Kursi belakang standar", value: "10 kursi" },
      { label: "Bahan bakar", value: "Diesel" },
      { label: "Kode mesin", value: "1GD-FTV" },
      { label: "Kapasitas mesin", value: "2,8 L" },
      { label: "Tenaga maksimum", value: "176,8 PS / 3.400 rpm" },
      { label: "Torsi maksimum", value: "42,8 kgm / 1.400–2.600 rpm" },
      { label: "Transmisi", value: "Manual 6 percepatan" },
      { label: "Teknologi mesin", value: "VNT intercooler · Euro 4" },
    ],
    source: hiaceSource,
    cabinTitle: "Nikmati ruang di sepanjang jalan.",
    cabinDescription:
      "Untuk perjalanan bersama keluarga atau tamu kantor, bahas ruang duduk yang kamu perlukan. Admin akan menjelaskan konfigurasi unit yang tersedia.",
    cabin: "/images/fleet/interiors/hiace-premio.webp",
    cabinAlt:
      "Ilustrasi konsep kabin Hiace Premio dengan kursi penumpang dan lorong tengah",
  },
  "elf-tayo": {
    headline: "Untuk tour, gathering, dan rombongan besar.",
    intro:
      "Untuk tour, gathering, dan kegiatan komunitas dengan lebih banyak peserta. Mulai dari jumlah rombongan, lalu sesuaikan kapasitas dan ruang bagasinya.",
    metrics: [
      { label: "Kursi penumpang", value: "19 kursi" },
      { label: "Mesin diesel", value: "3,0 L" },
      { label: "Tenaga", value: "120 PS" },
    ],
    highlights: [
      {
        title: "Kapasitas rombongan",
        description: "Referensi RTU: 19 penumpang + pengemudi.",
      },
      {
        title: "Diesel common rail",
        description: "VGS turbo intercooler, standar Euro 4.",
      },
      {
        title: "Fasilitas kabin",
        description: "USB, head unit, dan APAR pada acuan RTU.",
      },
    ],
    reference: "Isuzu NLR B L Microbus RTU · referensi sasis",
    specs: [
      { label: "Kapasitas standar", value: "19 penumpang + 1 pengemudi" },
      { label: "Bahan bakar", value: "Diesel" },
      { label: "Kode mesin", value: "4JJ1-TCC" },
      { label: "Kapasitas mesin", value: "2.999 cc" },
      { label: "Tenaga maksimum", value: "120 PS / 2.600 rpm" },
      { label: "Torsi maksimum", value: "36 kgm / 1.500–2.600 rpm" },
      {
        label: "Teknologi mesin",
        value: "Common rail · VGS turbo intercooler",
      },
      { label: "Tangki bahan bakar", value: "100 liter" },
    ],
    source: {
      title: "Astra Isuzu · NLR B L Microbus RTU",
      url: "https://astraisuzu.co.id/product/elf-nlr-71b-l/",
    },
    cabinTitle: "Rencanakan untuk seluruh rombongan.",
    cabinDescription:
      "Sebutan Elf Tayo belum menentukan sasis maupun karoseri. Sampaikan jumlah peserta dan barang bawaan agar admin dapat menjelaskan kapasitas unit yang sesuai.",
    cabin: "/images/fleet/interiors/elf-tayo.webp",
    cabinAlt:
      "Ilustrasi konsep kabin minibus Elf dengan baris kursi dan jendela samping",
  },
  "innova-reborn": {
    headline: "MPV untuk keluarga dan perjalanan dinas.",
    intro:
      "MPV untuk perjalanan dengan lebih sedikit orang, dari liburan keluarga hingga agenda kerja luar kota. Kenali pilihan mesin dan konfigurasi kabinnya sebelum menentukan unit.",
    metrics: [
      { label: "Pilihan mesin", value: "2,0 / 2,4 L" },
      { label: "Bahan bakar", value: "Bensin / diesel" },
      { label: "Transmisi", value: "MT / AT" },
    ],
    highlights: [
      {
        title: "Dua karakter mesin",
        description: "Bensin 2,0 L atau diesel 2,4 L.",
      },
      {
        title: "Torsi varian diesel",
        description: "149 PS dengan teknologi VNT intercooler.",
      },
      {
        title: "Pilihan transmisi",
        description: "Diesel: manual 5 atau otomatis 6 percepatan.",
      },
    ],
    reference: "Kijang Innova Reborn · peluncuran 2015, lintas varian",
    specs: [
      { label: "Bahan bakar", value: "Bensin / diesel, sesuai varian" },
      { label: "Mesin bensin", value: "1TR-FE · 1.998 cc" },
      { label: "Mesin diesel", value: "2GD-FTV · 2.393 cc" },
      { label: "Tenaga bensin", value: "139 PS" },
      { label: "Tenaga diesel", value: "149 PS" },
      { label: "Transmisi diesel", value: "Manual 5 / otomatis 6 percepatan" },
      { label: "Teknologi bensin", value: "Dual VVT-i" },
      { label: "Teknologi diesel", value: "VNT intercooler" },
    ],
    source: {
      title: "Toyota Indonesia · All New Kijang Innova 2015",
      url: "https://pressroom.toyota.astra.co.id/legend-reborn-all-new-kijang-innova-mpv-terbaik-indonesia-hadir-dengan-fitur-melebihi-ekspektasi",
    },
    cabinTitle: "Perjalanan dengan orang terdekat.",
    cabinDescription:
      "Bahas jumlah penumpang, kebutuhan kursi anak, dan koper yang akan dibawa. Susunan kursi serta fasilitas mengikuti tipe unit yang tersedia.",
    cabin: "/images/fleet/interiors/innova-reborn.webp",
    cabinAlt:
      "Ilustrasi konsep kabin Innova Reborn dengan kursi keluarga berwarna gelap",
  },
  avanza: {
    headline: "Praktis untuk keliling kota dan antar jemput.",
    intro:
      "Untuk keliling Bandung, kunjungan keluarga, atau antar jemput. Avanza menawarkan format MPV tujuh tempat duduk dengan pilihan mesin bensin 1,3 dan 1,5 liter pada generasi All New.",
    metrics: [
      { label: "Kapasitas standar", value: "7 orang" },
      { label: "Pilihan mesin", value: "1,3 / 1,5 L" },
      { label: "Bahan bakar", value: "Bensin" },
    ],
    highlights: [
      {
        title: "Format tujuh tempat duduk",
        description: "7 tempat duduk termasuk pengemudi.",
      },
      {
        title: "Pilihan mesin Dual VVT-i",
        description: "Bensin 1,3 L atau 1,5 L pada All New.",
      },
      {
        title: "Kursi tengah fleksibel",
        description: "Geser hingga 240 mm pada generasi All New.",
      },
    ],
    reference: "All New Avanza · generasi 2021, tipe 1.3 E / 1.5 G",
    specs: [
      { label: "Kapasitas standar", value: "7 orang termasuk pengemudi" },
      { label: "Bahan bakar", value: "Bensin" },
      { label: "Mesin 1,3 L", value: "1NR-VE · 1.329 cc" },
      { label: "Mesin 1,5 L", value: "2NR-VE · 1.496 cc" },
      { label: "Tenaga 1,3 / 1,5 L", value: "98 PS / 106 PS" },
      { label: "Teknologi mesin", value: "Dual VVT-i" },
      { label: "Transmisi", value: "Manual / CVT, sesuai varian" },
      { label: "Penggerak generasi All New", value: "Roda depan" },
    ],
    source: {
      title: "Toyota Indonesia · All New Avanza 2021",
      url: "https://pressroom.toyota.astra.co.id/50-tahun-toyota-di-indonesia-world-premiere-all-new-avanza-menjadi-bagian-dari-kebesaran-indonesia",
    },
    cabinTitle: "Bawa yang perlu. Pergi lebih praktis.",
    cabinDescription:
      "Untuk antar jemput atau perjalanan keluarga, sampaikan jumlah orang sekaligus barang bawaan. Admin akan membantu membahas kecocokan unit dengan rencanamu.",
    cabin: "/images/fleet/interiors/avanza.webp",
    cabinAlt:
      "Ilustrasi konsep kabin Avanza dengan kursi penumpang berwarna abu-abu",
  },
};
