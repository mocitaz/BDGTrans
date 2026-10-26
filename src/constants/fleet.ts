import type { FleetItem } from "@/types/content";
export const fleet: FleetItem[] = [
  {
    slug: "hiace-commuter",
    name: "Toyota Hiace Commuter",
    summary:
      "Minibus andalan kabin lega, pas buat trip rombongan ke dalam maupun luar kota.",
    category: "minibus",
    useCases: ["Wisata rombongan", "Agenda kantor & luar kota"],
  },
  {
    slug: "hiace-premio",
    name: "Toyota Hiace Premio",
    summary:
      "Minibus premium berkelas untuk perjalanan jauh luar kota lebih nyaman, mewah, dan lega.",
    category: "minibus",
    useCases: ["Road trip luar kota", "Liburan keluarga & VIP"],
  },
  {
    slug: "elf-tayo",
    name: "Isuzu Elf Tayo",
    summary:
      "Muat banyak dan hemat, pilihan seru buat gathering komunitas atau tour luar kota.",
    category: "minibus",
    useCases: ["Tour rombongan akbar", "Gathering komunitas"],
  },
  {
    slug: "innova-reborn",
    name: "Toyota Innova Reborn",
    summary:
      "MPV tangguh dan senyap, super nyaman buat perjalanan dinas maupun famili trip luar kota.",
    category: "mpv",
    useCases: ["Perjalanan dinas luar kota", "Liburan keluarga"],
  },
  {
    slug: "avanza",
    name: "Toyota Avanza",
    summary:
      "Lincah dan praktis, cocok buat keliling kota, trip santai bareng bestie, atau antar-jemput.",
    category: "mpv",
    useCases: ["City tour praktis", "Antar-jemput stasiun/bandara"],
  },
].map((item) => ({
  ...item,
  description: `${item.summary} Tentukan tanggal, titik jemput, dan tujuanmu—admin kami siap bantu atur semuanya sampai beres!`,
  image: `/images/fleet/cutouts/${item.slug}.webp`,
  gallery: [`/images/fleet/cutouts/${item.slug}.webp`],
  imageIsIllustration: true,
})) as FleetItem[];
export const fleetContent = {
  title: "Pilihan Armada",
  intro:
    "Pilih mobil favoritmu untuk trip dalam maupun luar kota. Liburan nyaman dimulai di sini.",
};
export const tripTypes = {
  wisata: "Perjalanan Wisata",
  dinas: "Perjalanan Dinas",
  bandara: "Antar-Jemput Bandara / Stasiun",
  keluarga: "Perjalanan Keluarga",
  lainnya: "Lainnya",
};
