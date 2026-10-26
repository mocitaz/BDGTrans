import { z } from "zod";
import { normalizeWhatsapp } from "./whatsapp";
import { jakartaNow, validCalendarDate } from "./date-time";
import { validMapsUrl } from "./travel-plan";
export { jakartaNow } from "./date-time";
export const fleetSlugs = [
  "hiace-commuter",
  "hiace-premio",
  "elf-tayo",
  "innova-reborn",
  "avanza",
] as const;
export const tripTypeKeys = [
  "wisata",
  "dinas",
  "bandara",
  "keluarga",
  "lainnya",
] as const;
export function sanitizeSingleLine(value: string) {
  return value.replace(/[\u0000-\u001f\u007f-\u009f]/g, " ").trim();
}
export function sanitizeMultiline(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, "")
    .trim();
}
const single = (min: number, max: number, label: string) =>
  z
    .string()
    .transform(sanitizeSingleLine)
    .pipe(
      z
        .string()
        .min(min, `${label} minimal ${min} karakter.`)
        .max(max, `${label} maksimal ${max} karakter.`),
    );
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Masukkan tanggal yang valid.")
  .refine(validCalendarDate, "Masukkan tanggal yang valid.");
const time = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Masukkan jam yang valid.");
const optionalText = (max: number) =>
  z
    .string()
    .transform(sanitizeSingleLine)
    .pipe(z.string().max(max, `Maksimal ${max} karakter.`))
    .default("");
const vehicleRequest = z.object({
  fleetSlug: z.enum(fleetSlugs, { error: "Pilih salah satu armada." }),
  quantity: z
    .number({ error: "Isi jumlah unit." })
    .int("Jumlah unit harus bulat.")
    .min(1, "Minimal 1 unit.")
    .max(10, "Maksimal 10 unit."),
  passengers: z
    .number({ error: "Isi jumlah penumpang." })
    .int("Jumlah penumpang harus bulat.")
    .min(1, "Minimal 1 penumpang.")
    .max(60, "Maksimal 60 penumpang."),
});
export function createReservationSchema(now: () => Date = () => new Date()) {
  return z
    .object({
      fullName: single(2, 100, "Nama"),
      whatsappNumber: z
        .string()
        .transform(normalizeWhatsapp)
        .pipe(
          z
            .string()
            .regex(
              /^62\d{7,13}$/,
              "Gunakan nomor WhatsApp Indonesia yang valid (9–15 digit).",
            ),
        ),
      fleetSlug: z.enum(fleetSlugs, { error: "Pilih salah satu armada." }),
      vehicleQuantity: z
        .number({ error: "Isi jumlah unit." })
        .int("Jumlah unit harus bulat.")
        .min(1, "Minimal 1 unit.")
        .max(10, "Maksimal 10 unit.")
        .default(1),
      additionalVehicles: z
        .array(vehicleRequest)
        .max(4, "Maksimal 5 kelompok armada.")
        .default([]),
      luggageCount: z
        .number({ error: "Isi jumlah koper." })
        .int("Jumlah koper harus bulat.")
        .min(0, "Jumlah koper tidak boleh negatif.")
        .max(60, "Maksimal 60 koper.")
        .default(0),
      passengers: z
        .number({ error: "Masukkan jumlah penumpang." })
        .int("Jumlah penumpang harus bulat.")
        .min(1, "Minimal 1 penumpang.")
        .max(60, "Maksimal 60 penumpang per pengajuan."),
      pickupDate: date,
      pickupTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Masukkan jam jemput yang valid."),
      endDate: date,
      endTime: time,
      journeyType: z.enum(["one-way", "round-trip"]).default("one-way"),
      overnight: z.boolean().default(false),
      pickupLocation: optionalText(250),
      pickupMapUrl: optionalText(1200).refine(
        validMapsUrl,
        "Gunakan tautan HTTPS Google Maps yang valid.",
      ),
      stops: z
        .array(z.object({ location: single(3, 250, "Pemberhentian") }))
        .max(6, "Maksimal 6 pemberhentian tambahan.")
        .default([]),
      destination: z
        .string()
        .transform(sanitizeMultiline)
        .pipe(
          z
            .string()
            .min(3, "Tujuan minimal 3 karakter.")
            .max(500, "Tujuan maksimal 500 karakter."),
        ),
      tripType: z.enum(tripTypeKeys, { error: "Pilih jenis perjalanan." }),
      transferKind: z.enum(["bandara", "kereta"]).default("bandara"),
      transportNumber: optionalText(40),
      arrivalTime: z.union([z.literal(""), time]).default(""),
      companyName: optionalText(120),
      needsQuotation: z.boolean().default(false),
      tourAgenda: optionalText(300),
      notes: z
        .string()
        .transform(sanitizeMultiline)
        .pipe(z.string().max(1000, "Catatan maksimal 1000 karakter.")),
      consent: z
        .boolean()
        .refine(Boolean, "Persetujuan diperlukan sebelum melanjutkan."),
    })
    .superRefine((data, ctx) => {
      if (
        (!data.pickupLocation && !data.pickupMapUrl) ||
        (data.pickupLocation.length > 0 && data.pickupLocation.length < 5)
      )
        ctx.addIssue({
          code: "custom",
          path: ["pickupLocation"],
          message:
            "Isi alamat minimal 5 karakter atau gunakan tautan Google Maps yang valid.",
        });
      const current = jakartaNow(now());
      if (data.pickupDate < current.date)
        ctx.addIssue({
          code: "custom",
          path: ["pickupDate"],
          message: "Tanggal jemput tidak boleh sebelum hari ini (WIB).",
        });
      if (data.pickupDate === current.date && data.pickupTime <= current.time)
        ctx.addIssue({
          code: "custom",
          path: ["pickupTime"],
          message: "Jam jemput hari ini harus setelah waktu sekarang (WIB).",
        });
      if (data.endDate < data.pickupDate)
        ctx.addIssue({
          code: "custom",
          path: ["endDate"],
          message: "Tanggal selesai tidak boleh sebelum tanggal jemput.",
        });
      if (data.endDate === data.pickupDate && data.endTime <= data.pickupTime)
        ctx.addIssue({
          code: "custom",
          path: ["endTime"],
          message:
            "Jam selesai harus setelah jam jemput. Untuk lewat tengah malam, pilih tanggal selesai berikutnya.",
        });
      const total =
        data.passengers +
        data.additionalVehicles.reduce(
          (sum, group) => sum + group.passengers,
          0,
        );
      if (total > 60)
        ctx.addIssue({
          code: "custom",
          path: ["passengers"],
          message: "Total semua kelompok maksimal 60 penumpang per pengajuan.",
        });
      if (
        data.vehicleQuantity +
          data.additionalVehicles.reduce(
            (sum, group) => sum + group.quantity,
            0,
          ) >
        10
      )
        ctx.addIssue({
          code: "custom",
          path: ["vehicleQuantity"],
          message: "Total semua kelompok maksimal 10 unit per pengajuan.",
        });
      if (
        data.tripType === "dinas" &&
        data.needsQuotation &&
        data.companyName.length < 2
      )
        ctx.addIssue({
          code: "custom",
          path: ["companyName"],
          message: "Isi nama perusahaan untuk permintaan dokumen penawaran.",
        });
    })
    .transform((data) => ({
      ...data,
      companyName: data.tripType === "dinas" ? data.companyName : "",
      needsQuotation: data.tripType === "dinas" && data.needsQuotation,
      transportNumber: data.tripType === "bandara" ? data.transportNumber : "",
      arrivalTime: data.tripType === "bandara" ? data.arrivalTime : "",
      tourAgenda: data.tripType === "wisata" ? data.tourAgenda : "",
    }));
}
export const reservationSchema = createReservationSchema();
export type ReservationData = z.output<typeof reservationSchema>;
export type ReservationInput = z.input<typeof reservationSchema>;
