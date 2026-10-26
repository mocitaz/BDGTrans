import { describe, expect, it } from "vitest";
import {
  createReservationSchema,
  type ReservationInput,
} from "@/lib/reservation-schema";
import { buildReservationMessage } from "@/lib/whatsapp";
import { validMapsUrl, tripDuration, totalPassengers } from "@/lib/travel-plan";
import { recommendVehicles } from "@/lib/vehicle-advisor";
import {
  vehicleConfigurations,
  passengerSeats,
} from "@/constants/vehicle-configurations";

const schema = createReservationSchema(() => new Date("2026-11-07T03:00:00Z"));
const valid: ReservationInput = {
  fullName: "Rani Putri",
  whatsappNumber: "081234567890",
  fleetSlug: "hiace-commuter",
  passengers: 18,
  vehicleQuantity: 2,
  pickupDate: "2026-11-08",
  pickupTime: "08:00",
  endDate: "2026-11-08",
  endTime: "18:30",
  pickupLocation: "Hotel Bandung",
  destination: "Lembang",
  tripType: "keluarga",
  notes: "",
  consent: true,
};

describe("travel planner validation", () => {
  it.each([
    ["missing finish time", { endTime: "" }],
    ["finish before pickup", { endTime: "07:00" }],
    ["finish equals pickup", { endTime: "08:00" }],
    ["invalid finish time", { endTime: "25:15" }],
    ["fractional units", { vehicleQuantity: 1.5 }],
    ["zero units", { vehicleQuantity: 0 }],
    ["too many units", { vehicleQuantity: 11 }],
    [
      "too many total passengers",
      {
        additionalVehicles: [
          { fleetSlug: "avanza", quantity: 1, passengers: 50 },
        ],
      },
    ],
    [
      "too many aggregate units",
      {
        vehicleQuantity: 10,
        additionalVehicles: [
          { fleetSlug: "avanza", quantity: 1, passengers: 1 },
        ],
      },
    ],
    [
      "missing extra model",
      { additionalVehicles: [{ fleetSlug: "", quantity: 1, passengers: 1 }] },
    ],
    ["empty added stop", { stops: [{ location: "" }] }],
    [
      "too many stops",
      {
        stops: Array.from({ length: 7 }, () => ({ location: "Hotel Bandung" })),
      },
    ],
    ["negative luggage", { luggageCount: -1 }],
    ["document without company", { tripType: "dinas", needsQuotation: true }],
    ["unsafe pickup URL", { pickupMapUrl: "javascript:alert(1)" }],
  ])("rejects %s", (_, changes) =>
    expect(schema.safeParse({ ...valid, ...changes }).success).toBe(false),
  );
  it("accepts overnight dates with an earlier finish clock time", () => {
    expect(
      schema.safeParse({
        ...valid,
        pickupTime: "23:30",
        endDate: "2026-11-09",
        endTime: "01:00",
        overnight: true,
      }).success,
    ).toBe(true);
    expect(tripDuration("2026-11-08", "23:30", "2026-11-09", "01:00")).toBe(
      "1 jam 30 menit",
    );
  });
  it("preserves grouped requests, ordered stops and Maps link in WhatsApp", () => {
    const data = schema.parse({
      ...valid,
      luggageCount: 5,
      journeyType: "round-trip",
      additionalVehicles: [
        { fleetSlug: "innova-reborn", quantity: 1, passengers: 5 },
      ],
      stops: [
        { location: "  Museum\nBandung  " },
        { location: "Restoran & kafe 🌿" },
      ],
      pickupMapUrl: "https://maps.app.goo.gl/Abc123",
    });
    expect(totalPassengers(data)).toBe(23);
    const message = buildReservationMessage(data);
    expect(message).toContain(
      "1. Toyota Hiace Commuter × 2 unit · 18 penumpang",
    );
    expect(message).toContain("2. Toyota Innova Reborn × 1 unit · 5 penumpang");
    expect(message).toContain("Jumlah penumpang: 23 orang");
    expect(message).toContain("1. Museum Bandung\n2. Restoran & kafe 🌿");
    expect(message).toContain("Arah perjalanan: Pulang pergi");
    expect(message).toContain(
      "Pin penjemputan: https://maps.app.goo.gl/Abc123",
    );
  });
  it("does not treat concept seat counts as a hard availability or capacity restriction", () =>
    expect(
      schema.safeParse({ ...valid, vehicleQuantity: 1, passengers: 60 })
        .success,
    ).toBe(true));
  it("only exposes active service fields", () => {
    const fields = {
      companyName: "Perusahaan Rahasia",
      needsQuotation: true,
      transportNumber: "GA 123",
      arrivalTime: "09:00",
      tourAgenda: "Kunjungan museum",
    };
    const family = schema.parse({ ...valid, ...fields });
    expect(family.companyName).toBe("");
    expect(family.transportNumber).toBe("");
    expect(family.tourAgenda).toBe("");
    expect(buildReservationMessage(family)).not.toContain("Perusahaan Rahasia");
    expect(
      buildReservationMessage(
        schema.parse({ ...valid, ...fields, tripType: "dinas" }),
      ),
    ).toContain("Dokumen penawaran: Diminta");
    const rail = buildReservationMessage(
      schema.parse({
        ...valid,
        ...fields,
        tripType: "bandara",
        transferKind: "kereta",
        transportNumber: "KA 32",
      }),
    );
    expect(rail).toContain("Nomor kereta: KA 32");
    expect(rail).not.toContain("Perusahaan Rahasia");
  });
});
describe("Maps and duration helpers", () => {
  it("allows a validated Maps pin as the pickup alternative", () => {
    expect(
      schema.safeParse({
        ...valid,
        pickupLocation: "",
        pickupMapUrl: "https://maps.app.goo.gl/Abc123",
      }).success,
    ).toBe(true);
    expect(
      schema.safeParse({ ...valid, pickupLocation: "", pickupMapUrl: "" })
        .success,
    ).toBe(false);
    expect(validMapsUrl("https://www.google.com/maps-fake")).toBe(false);
  });
  it.each([
    "https://maps.app.goo.gl/Abc123",
    "https://goo.gl/maps/Abc123",
    "https://www.google.com/maps/search/?api=1&query=-6.9,107.6",
    "https://maps.google.com/?q=Bandung",
    "",
  ])("accepts Google Maps URL %s", (value) =>
    expect(validMapsUrl(value)).toBe(true),
  );
  it.each([
    "http://www.google.com/maps",
    "https://google.com.evil.example/maps",
    "https://example.com/maps",
    "https://www.google.com/",
    "https://user:pass@www.google.com/maps",
    "javascript:alert(1)",
    "not-a-url",
  ])("rejects untrusted URL %s", (value) =>
    expect(validMapsUrl(value)).toBe(false),
  );
  it("handles multi-day time without implying billable days", () => {
    expect(tripDuration("2026-11-08", "08:00", "2026-11-10", "10:15")).toBe(
      "2 hari 2 jam 15 menit",
    );
    expect(tripDuration("2026-11-08", "08:00", "2026-11-08", "08:00")).toBe("");
    expect(tripDuration("", "08:00", "2026-11-08", "10:00")).toBe("");
  });
});
describe("concept vehicle advisor", () => {
  it("keeps every layout consistent with its passenger count", () => {
    for (const config of Object.values(vehicleConfigurations)) {
      expect(config.status).toBe("concept");
      expect(passengerSeats(config)).toBeGreaterThan(0);
    }
  });
  it("accounts for both people and bags when proposing units", () => {
    const results = recommendVehicles(30, 10, "wisata");
    expect(results).toHaveLength(3);
    for (const result of results) {
      expect(result.units * result.seats).toBeGreaterThanOrEqual(30);
      expect(
        result.units * result.configuration.mediumBags,
      ).toBeGreaterThanOrEqual(10);
    }
  });
  it("returns no suggestions for malformed counts", () => {
    expect(recommendVehicles(0, 0, "wisata")).toEqual([]);
    expect(recommendVehicles(2, NaN, "wisata")).toEqual([]);
  });
});
