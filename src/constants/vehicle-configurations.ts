import type { FleetSlug } from "@/types/content";

export interface VehicleConfiguration {
  status: "concept" | "verified";
  frontPassengers: number;
  rows: number[];
  mediumBags: number;
  luggageNote: string;
  focus: string;
}

export const vehicleConfigurations: Record<FleetSlug, VehicleConfiguration> = {
  "hiace-commuter": {
    status: "concept",
    frontPassengers: 2,
    rows: [3, 3, 3, 4],
    mediumBags: 4,
    luggageNote: "Barang besar dapat memerlukan pengaturan ulang ruang kabin.",
    focus: "Rombongan wisata dan kegiatan bersama.",
  },
  "hiace-premio": {
    status: "concept",
    frontPassengers: 1,
    rows: [3, 3, 4],
    mediumBags: 4,
    luggageNote:
      "Diskusikan ukuran koper dan susunan kursi yang kamu perlukan.",
    focus: "Kelompok dengan prioritas ruang perjalanan.",
  },
  "elf-tayo": {
    status: "concept",
    frontPassengers: 1,
    rows: [3, 3, 3, 3, 3, 3],
    mediumBags: 6,
    luggageNote: "Ukuran bagasi mengikuti karoseri dan konfigurasi unit.",
    focus: "Rombongan besar dan agenda komunitas.",
  },
  "innova-reborn": {
    status: "concept",
    frontPassengers: 1,
    rows: [2, 3],
    mediumBags: 3,
    luggageNote: "Ruang koper berkurang saat seluruh baris kursi digunakan.",
    focus: "Keluarga dan perjalanan dinas kelompok kecil.",
  },
  avanza: {
    status: "concept",
    frontPassengers: 1,
    rows: [3, 2],
    mediumBags: 2,
    luggageNote:
      "Dengan seluruh kursi terpakai, prioritaskan barang bawaan ringkas.",
    focus: "Keliling kota dan perjalanan kelompok kecil.",
  },
};

export function passengerSeats(configuration: VehicleConfiguration) {
  return (
    configuration.frontPassengers +
    configuration.rows.reduce((sum, count) => sum + count, 0)
  );
}

export const configurationNotice =
  "Contoh konfigurasi untuk prototipe, bukan denah atau kapasitas unit aktual. Kursi, bagasi, dan jumlah unit dikonfirmasi admin.";
