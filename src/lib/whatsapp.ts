import { brand } from "@/constants/brand";
import { fleet, tripTypes } from "@/constants/fleet";
import type { ReservationData } from "./reservation-schema";
import {
  journeyLabels,
  serviceRequestRows,
  totalPassengers,
  tripDuration,
  vehicleRequestText,
} from "./travel-plan";
export const ADMIN_WHATSAPP = brand.whatsapp;
export function normalizeWhatsapp(value: string) {
  let n = value.replace(/[\s()+.-]/g, "");
  if (n.startsWith("0")) n = `62${n.slice(1)}`;
  return n;
}
export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
export const adminChat = buildWhatsAppUrl(
  "Halo Admin BDG TRANS, saya ingin bertanya tentang kebutuhan perjalanan.",
);
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(`${date}T12:00:00+07:00`));
}
export function buildReservationMessage(data: ReservationData) {
  const lines = [
    "Halo Admin BDG TRANS, saya ingin meminta penawaran sewa kendaraan.",
    "",
    `Nama: ${data.fullName}`,
    `Nomor WhatsApp: ${normalizeWhatsapp(data.whatsappNumber)}`,
    `Armada: ${fleet.find((item) => item.slug === data.fleetSlug)?.name}`,
    "Rincian kelompok armada:",
    vehicleRequestText(data),
    `Jumlah penumpang: ${totalPassengers(data)} orang`,
    `Koper sedang / tas besar: ${data.luggageCount}`,
    `Tanggal penjemputan: ${formatDate(data.pickupDate)}`,
    `Jam penjemputan: ${data.pickupTime} WIB`,
    `Tanggal selesai: ${formatDate(data.endDate)}`,
    `Jam selesai: ${data.endTime} WIB`,
    `Arah perjalanan: ${journeyLabels[data.journeyType]}`,
    `Perlu menginap: ${data.overnight ? "Ya" : "Tidak"}`,
    `Rentang jadwal (bukan durasi tagihan): ${tripDuration(data.pickupDate, data.pickupTime, data.endDate, data.endTime)}`,
    `Lokasi penjemputan: ${data.pickupLocation || "Lihat pin Google Maps"}`,
    ...(data.pickupMapUrl ? [`Pin penjemputan: ${data.pickupMapUrl}`] : []),
    ...(data.stops.length
      ? [
          "Pemberhentian:",
          ...data.stops.map((stop, index) => `${index + 1}. ${stop.location}`),
        ]
      : []),
    `Tujuan perjalanan: ${data.destination}`,
    `Jenis perjalanan: ${tripTypes[data.tripType]}`,
    ...serviceRequestRows(data).map(([label, value]) => `${label}: ${value}`),
    `Catatan tambahan: ${data.notes || "-"}`,
    "",
    "Mohon informasi ketersediaan armada, kecocokan kursi dan bagasi, penawaran harga, dan ketentuan reservasinya. Terima kasih.",
  ];
  return lines.join("\n");
}
