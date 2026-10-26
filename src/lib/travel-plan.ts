import { fleet } from "@/constants/fleet";
import type { ReservationData } from "./reservation-schema";

export const journeyLabels = {
  "one-way": "Sekali jalan",
  "round-trip": "Pulang pergi",
} as const;

export function validMapsUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return false;
    if (url.hostname === "maps.app.goo.gl") return url.pathname.length > 1;
    if (url.hostname === "goo.gl") return url.pathname.startsWith("/maps/");
    if (url.hostname === "maps.google.com")
      return (
        url.pathname === "/maps" ||
        url.pathname.startsWith("/maps/") ||
        url.pathname === "/"
      );
    return (
      [
        "google.com",
        "www.google.com",
        "google.co.id",
        "www.google.co.id",
      ].includes(url.hostname) &&
      (url.pathname === "/maps" || url.pathname.startsWith("/maps/"))
    );
  } catch {
    return false;
  }
}

export function tripDuration(
  pickupDate: string,
  pickupTime: string,
  endDate: string,
  endTime: string,
) {
  if (!pickupDate || !pickupTime || !endDate || !endTime) return "";
  const minutes = Math.round(
    (Date.parse(`${endDate}T${endTime}:00+07:00`) -
      Date.parse(`${pickupDate}T${pickupTime}:00+07:00`)) /
      60000,
  );
  if (!Number.isFinite(minutes) || minutes <= 0) return "";
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const remaining = minutes % 60;
  return [
    days ? `${days} hari` : "",
    hours ? `${hours} jam` : "",
    remaining ? `${remaining} menit` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function requestedVehicles(data: ReservationData) {
  return [
    {
      fleetSlug: data.fleetSlug,
      quantity: data.vehicleQuantity,
      passengers: data.passengers,
    },
    ...data.additionalVehicles,
  ];
}
export function totalPassengers(data: ReservationData) {
  return requestedVehicles(data).reduce(
    (sum, item) => sum + item.passengers,
    0,
  );
}
export function vehicleRequestText(data: ReservationData) {
  return requestedVehicles(data)
    .map(
      (item, index) =>
        `${index + 1}. ${fleet.find((vehicle) => vehicle.slug === item.fleetSlug)?.name} × ${item.quantity} unit · ${item.passengers} penumpang`,
    )
    .join("\n");
}
export function serviceRequestRows(data: ReservationData): [string, string][] {
  if (data.tripType === "bandara")
    return [
      [
        "Jenis antar jemput",
        data.transferKind === "kereta" ? "Stasiun kereta" : "Bandara",
      ],
      [
        data.transferKind === "kereta" ? "Nomor kereta" : "Nomor penerbangan",
        data.transportNumber || "Belum dicantumkan",
      ],
      [
        "Jam kedatangan",
        data.arrivalTime ? `${data.arrivalTime} WIB` : "Belum dicantumkan",
      ],
    ];
  if (data.tripType === "dinas")
    return [
      ["Perusahaan", data.companyName || "Belum dicantumkan"],
      ["Dokumen penawaran", data.needsQuotation ? "Diminta" : "Tidak diminta"],
    ];
  if (data.tripType === "wisata" && data.tourAgenda)
    return [["Agenda wisata", data.tourAgenda]];
  return [];
}
