import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.route("https://maps.google.com/maps?**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><title>Peta</title>",
    }),
  );
  await page.addLocatorHandler(page.locator(".prototype-notice"), () =>
    page.getByRole("button", { name: "Saya Mengerti" }).click(),
  );
});
async function openForm(page: Page) {
  await page.goto("/?armada=hiace-commuter#reservasi");
  await page.locator("#fullName").waitFor();
}

test("advisor uses labeled concepts, forwards units and bags, and preserves existing form entries", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".hero-content .advisor-trigger").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("bukan denah atau kapasitas unit aktual");
  await dialog.locator("#advisor-passengers").fill("30");
  await dialog.locator("#advisor-bags").fill("10");
  await dialog.locator("#advisor-purpose").selectOption("wisata");
  await dialog.getByRole("button", { name: "Lihat saran kendaraan" }).click();
  await expect(dialog.locator(".advisor-result")).toHaveCount(3);
  await dialog
    .getByRole("button", { name: "Gunakan rencana ini" })
    .first()
    .click();
  await expect(dialog).toHaveCount(0);
  await expect(page.locator("#fleetSlug")).toHaveValue("elf-tayo");
  await expect(page.locator("#vehicleQuantity")).toHaveValue("2");
  await expect(page.locator("#passengers")).toHaveValue("30");
  await expect(page.locator("#luggageCount")).toHaveValue("10");
  await expect(page.locator("#reservation-heading")).toBeFocused();
  await expect(page.locator("#reservation-heading")).toBeInViewport();
  await page.locator("#fullName").fill("Nama tetap");
  await page.locator("#notes").fill("Catatan tetap");
  await page.locator(".reservation-fields .advisor-trigger").click();
  await expect(
    page.getByRole("dialog").locator("#advisor-purpose"),
  ).toHaveValue("wisata");
  await expect(
    page.getByRole("dialog").locator("#advisor-passengers"),
  ).toHaveValue("30");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Lihat saran kendaraan" })
    .click();
  await expect(page.locator("#fullName-error")).toHaveCount(0);
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Gunakan rencana ini" })
    .first()
    .click();
  await expect(page.locator("#fullName")).toHaveValue("Nama tetap");
  await expect(page.locator("#notes")).toHaveValue("Catatan tetap");
});

test("every cabin guide exposes an informative diagram without seat-booking controls", async ({
  page,
}) => {
  for (const [slug, seats] of [
    ["hiace-commuter", 15],
    ["hiace-premio", 11],
    ["elf-tayo", 19],
    ["innova-reborn", 6],
    ["avanza", 6],
  ] as const) {
    await page.goto(`/armada/${slug}`);
    await page.locator(".cabin-guide").scrollIntoViewIfNeeded();
    await expect(
      page.locator(".cabin-guide details, .cabin-guide summary"),
    ).toHaveCount(0);
    await expect(page.locator(".cabin-guide")).toContainText(
      "Contoh konfigurasi untuk prototipe",
    );
    await expect(page.locator(".cabin-guide h3")).toHaveText(
      `${seats} penumpang + sopir`,
    );
    await expect(page.locator(".cabin-floorplan")).toHaveAttribute(
      "aria-label",
      new RegExp(`${seats} kursi penumpang`),
    );
    await expect(page.locator(".cabin-guide button")).toHaveCount(0);
    await expect(
      page.locator('.cabin-floorplan [data-seat-kind="passenger"]'),
    ).toHaveCount(seats);
    await expect(
      page.locator('.cabin-floorplan [data-seat-kind="driver"]'),
    ).toHaveCount(1);
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      await expect(page.locator(".cabin-floorplan")).toBeVisible();
    }
  }
});

test("multi-vehicle round trip, ordered stops and corporate fields reach the official WhatsApp message", async ({
  page,
}) => {
  const mutations: string[] = [];
  page.on("request", (r) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(r.method()))
      mutations.push(r.url());
  });
  await openForm(page);
  await page.locator("#fullName").fill("Rani Putri");
  await page.locator("#whatsappNumber").fill("081234567890");
  await page.locator("#vehicleQuantity").fill("2");
  await page.locator("#passengers").fill("18");
  await page
    .getByRole("button", { name: "Tambah armada", exact: true })
    .click();
  await page
    .locator("#additionalVehicles-0-fleetSlug")
    .selectOption("innova-reborn");
  await page.locator("#additionalVehicles-0-passengers").fill("5");
  await page.locator("#luggageCount").fill("5");
  await expect(page.locator(".plan-fleet-footer")).toContainText(
    "Total 23 penumpang",
  );
  await page.locator("#tripType").selectOption("dinas");
  await page.locator("#companyName").fill("PT Contoh");
  await page.locator("#needsQuotation").check();
  await page.locator("#tripType").selectOption("keluarga");
  await expect(page.locator("#companyName")).toHaveCount(0);
  await page.locator("#tripType").selectOption("dinas");
  await expect(page.locator("#companyName")).toHaveValue("PT Contoh");
  await page.locator("#pickupDate").fill("2099-11-07");
  await page.locator("#pickupTime").fill("23:30");
  await page.locator("#endDate").fill("2099-11-07");
  await page.locator("#endTime").fill("01:00");
  await page.getByRole("radio", { name: "Pulang pergi", exact: true }).check();
  await page.locator("#overnight").check();
  await page.locator("#pickupLocation").fill("Hotel Bandung");
  await page.locator("#pickupMapUrl").fill("https://maps.app.goo.gl/Abc123");
  await page.locator("#destination").fill("Hotel Bandung kembali");
  await page
    .getByRole("button", { name: "Tambah pemberhentian", exact: true })
    .click();
  await page.locator("#stops-0-location").fill("Museum Bandung");
  await page
    .getByRole("button", { name: "Tambah pemberhentian", exact: true })
    .click();
  await page.locator("#stops-1-location").fill("Restoran & kafe 🌿");
  await page
    .getByRole("button", { name: "Naikkan pemberhentian 2", exact: true })
    .click();
  await expect(page.locator("#stops-0-location")).toHaveValue(
    "Restoran & kafe 🌿",
  );
  await page.locator("#consent").check();
  await page.getByRole("button", { name: "Periksa Permintaan" }).click();
  await expect(page.locator("#endTime-error")).toBeVisible();
  await page.locator("#endDate").fill("2099-11-08");
  await page.getByRole("button", { name: "Periksa Permintaan" }).click();
  await expect(page.locator(".summary")).toContainText("1 jam 30 menit");
  await expect(page.locator(".summary")).toContainText("23 orang");
  await expect(page.locator(".summary")).toContainText("PT Contoh");
  let message = "";
  await page.route("https://wa.me/**", async (route) => {
    message = new URL(route.request().url()).searchParams.get("text")!;
    await route.fulfill({
      contentType: "text/plain",
      body: "Intercepted without sending a message",
    });
  });
  await page.getByRole("button", { name: "Lanjut ke WhatsApp" }).click();
  await expect.poll(() => message).toContain("Jumlah penumpang: 23 orang");
  expect(message).toContain("Toyota Hiace Commuter × 2 unit · 18 penumpang");
  expect(message).toContain("Toyota Innova Reborn × 1 unit · 5 penumpang");
  expect(message).toContain("1. Restoran & kafe 🌿\n2. Museum Bandung");
  expect(message).toContain("Perusahaan: PT Contoh");
  expect(message).toContain("Dokumen penawaran: Diminta");
  expect(message).toContain("Perlu menginap: Ya");
  expect(mutations).toEqual([]);
});

test("service switches hide irrelevant fields and removal retains keyboard focus", async ({
  page,
}) => {
  await openForm(page);
  await page.locator("#tripType").selectOption("bandara");
  await page.locator("#transferKind").selectOption("kereta");
  await expect(page.getByLabel("Nomor kereta (opsional)")).toBeVisible();
  await page.locator("#transportNumber").fill("KA 32");
  await page.locator("#arrivalTime").fill("08:00");
  await page.locator("#tripType").selectOption("wisata");
  await expect(page.locator("#transportNumber")).toHaveCount(0);
  await expect(page.locator("#tourAgenda")).toBeVisible();
  await page
    .getByRole("button", { name: "Tambah armada", exact: true })
    .click();
  await page.getByRole("button", { name: "Hapus kelompok armada 2" }).click();
  await expect(page.locator("#add-vehicle")).toBeFocused();
  await page
    .getByRole("button", { name: "Tambah pemberhentian", exact: true })
    .click();
  await page.getByRole("button", { name: "Hapus pemberhentian 1" }).click();
  await expect(page.locator("#add-stop")).toBeFocused();
});

test("GPS requires explicit preview confirmation and preserves the manual address", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["geolocation"]);
  await context.setGeolocation({
    latitude: -6.917464,
    longitude: 107.619123,
    accuracy: 15,
  });
  await openForm(page);
  await page.locator("#pickupLocation").fill("Alamat manual tetap");
  await page
    .getByRole("button", { name: "Gunakan lokasi saya", exact: true })
    .click();
  await expect(
    page.getByText("Periksa titik penjemputan", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("#pickupMapUrl")).toHaveValue("");
  await page.getByRole("button", { name: "Batalkan", exact: true }).click();
  await expect(page.locator("#pickupMapUrl")).toHaveValue("");
  await page
    .getByRole("button", { name: "Gunakan lokasi saya", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Gunakan titik ini", exact: true })
    .click();
  await expect(page.locator("#pickupMapUrl")).toHaveValue(
    "https://www.google.com/maps/search/?api=1&query=-6.917464,107.619123",
  );
  await expect(page.locator("#pickupLocation")).toHaveValue(
    "Alamat manual tetap",
  );
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
});

for (const code of [1, 3])
  test(`GPS error ${code} leaves manual pickup usable`, async ({ page }) => {
    await page.addInitScript(
      (code) =>
        Object.defineProperty(navigator, "geolocation", {
          configurable: true,
          value: {
            getCurrentPosition: (
              _success: unknown,
              error: (error: { code: number }) => void,
            ) => error({ code }),
          },
        }),
      code,
    );
    await openForm(page);
    await page
      .getByRole("button", { name: "Gunakan lokasi saya", exact: true })
      .click();
    await expect(page.locator(".plan-location-error")).toBeVisible();
    await page.locator("#pickupLocation").fill("Hotel Bandung manual");
    await expect(page.locator("#pickupLocation")).toHaveValue(
      "Hotel Bandung manual",
    );
    await expect(page.locator("#pickupMapUrl")).toHaveValue("");
  });

test("expanded planner and advisor stay accessible without overflow", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openForm(page);
  await page.locator("#tripType").selectOption("bandara");
  await page
    .getByRole("button", { name: "Tambah armada", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Tambah pemberhentian", exact: true })
    .click();
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".reservation-fields .advisor-trigger").click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Lihat saran kendaraan" })
    .click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
