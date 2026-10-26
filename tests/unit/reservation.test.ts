import { describe, it, expect } from "vitest";
import {
  createReservationSchema,
  jakartaNow,
  sanitizeSingleLine,
  sanitizeMultiline,
  type ReservationInput,
} from "@/lib/reservation-schema";
import {
  buildReservationMessage,
  buildWhatsAppUrl,
  normalizeWhatsapp,
  formatDate,
} from "@/lib/whatsapp";
const schema = createReservationSchema(() => new Date("2026-11-07T03:30:00Z"));
const valid: ReservationInput = {
  fullName: "  Rani Putri  ",
  whatsappNumber: "0812-3456-7890",
  fleetSlug: "hiace-premio",
  passengers: 12,
  pickupDate: "2026-11-07",
  pickupTime: "11:00",
  endDate: "2026-11-08",
  endTime: "18:00",
  pickupLocation: "Stasiun Bandung",
  destination: "Lembang & Ciwidey 🌿\nKunjungan keluarga",
  tripType: "wisata",
  notes: "Koper & kursi anak?",
  consent: true,
};
describe("reservation validation", () => {
  it("trims fields and normalizes the phone before producing output", () => {
    const data = schema.parse(valid);
    expect(data.fullName).toBe("Rani Putri");
    expect(data.whatsappNumber).toBe("6281234567890");
  });
  it.each([
    ["empty name", { fullName: "" }],
    ["short name", { fullName: "a" }],
    ["invalid fleet", { fleetSlug: "unknown" }],
    ["invalid phone", { whatsappNumber: "12345" }],
    ["foreign phone", { whatsappNumber: "+14155551234" }],
    ["no passengers", { passengers: 0 }],
    ["too many passengers", { passengers: 61 }],
    ["fractional passengers", { passengers: 1.2 }],
    ["past date", { pickupDate: "2026-11-06" }],
    ["past time today", { pickupTime: "10:29" }],
    ["current minute", { pickupTime: "10:30" }],
    ["end before pickup", { endDate: "2026-11-06" }],
    ["invalid calendar date", { pickupDate: "2026-02-30" }],
    ["invalid time", { pickupTime: "25:00" }],
    ["short address", { pickupLocation: "abc" }],
    ["short destination", { destination: "ab" }],
    ["invalid trip", { tripType: "unknown" }],
    ["long notes", { notes: "a".repeat(1001) }],
    ["no consent", { consent: false }],
  ])("rejects %s", (_, changes) => {
    expect(schema.safeParse({ ...valid, ...changes }).success).toBe(false);
  });
  it("allows a future date with an earlier time and equal return date", () =>
    expect(
      schema.safeParse({
        ...valid,
        pickupDate: "2026-11-08",
        pickupTime: "01:00",
      }).success,
    ).toBe(true));
  it("uses Jakarta calendar across a UTC day boundary", () =>
    expect(jakartaNow(new Date("2026-11-06T18:30:00Z"))).toEqual({
      date: "2026-11-07",
      time: "01:30",
    }));
  it("does not invent a vehicle capacity restriction", () =>
    expect(schema.safeParse({ ...valid, passengers: 60 }).success).toBe(true));
  it("strips control characters while preserving intentional multiline fields", () => {
    expect(sanitizeSingleLine(" Rani\n\u0000Putri ")).toBe("Rani  Putri");
    expect(sanitizeMultiline("a\r\nb\u0000")).toBe("a\nb");
  });
});
describe("WhatsApp message", () => {
  it.each([
    ["081234567890", "6281234567890"],
    ["+62 812 3456 7890", "6281234567890"],
    ["6281234567890", "6281234567890"],
  ])("normalizes %s", (input, result) =>
    expect(normalizeWhatsapp(input)).toBe(result),
  );
  it("formats Indonesian dates", () =>
    expect(formatDate("2026-11-07")).toBe("7 November 2026"));
  it("encodes special characters, multiline and emoji once to the official destination", () => {
    const data = schema.parse(valid);
    const message = buildReservationMessage(data);
    const result = buildWhatsAppUrl(message);
    const url = new URL(result);
    expect(url.pathname).toBe("/6289528051760");
    expect(url.searchParams.get("text")).toBe(message);
    expect(message)
      .toBe(`Halo Admin BDG TRANS, saya ingin meminta penawaran sewa kendaraan.

Nama: Rani Putri
Nomor WhatsApp: 6281234567890
Armada: Toyota Hiace Premio
Rincian kelompok armada:
1. Toyota Hiace Premio × 1 unit · 12 penumpang
Jumlah penumpang: 12 orang
Koper sedang / tas besar: 0
Tanggal penjemputan: 7 November 2026
Jam penjemputan: 11:00 WIB
Tanggal selesai: 8 November 2026
Jam selesai: 18:00 WIB
Arah perjalanan: Sekali jalan
Perlu menginap: Tidak
Rentang jadwal (bukan durasi tagihan): 1 hari 7 jam
Lokasi penjemputan: Stasiun Bandung
Tujuan perjalanan: Lembang & Ciwidey 🌿
Kunjungan keluarga
Jenis perjalanan: Perjalanan Wisata
Catatan tambahan: Koper & kursi anak?

Mohon informasi ketersediaan armada, kecocokan kursi dan bagasi, penawaran harga, dan ketentuan reservasinya. Terima kasih.`);
    expect(result).toContain("%26");
    expect(result).toContain("%0A");
  });
  it("uses a dash for absent notes", () =>
    expect(
      buildReservationMessage(schema.parse({ ...valid, notes: "" })),
    ).toContain("Catatan tambahan: -"));
});
