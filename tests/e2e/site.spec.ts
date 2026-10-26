import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }, testInfo) => {
  await page.route("https://maps.google.com/maps?**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><title>Peta</title>",
    }),
  );
  if (testInfo.title.startsWith("prototype notice")) return;
  await page.addLocatorHandler(page.locator(".prototype-notice"), async () => {
    await page.getByRole("button", { name: "Saya Mengerti" }).click();
  });
});

test("prototype notice appears on every document visit and refresh without persistent dismissal", async ({
  page,
}) => {
  await page.goto("/");
  const notice = page.getByRole("region", {
    name: "Pratinjau Konsep Website",
  });
  await expect(notice).toBeVisible();
  await expect(notice).toContainText("PT Teknalogi Transformasi Digital");
  await expect(notice).toContainText(
    "tidak menunjukkan adanya kerja sama, afiliasi, persetujuan, atau penugasan resmi",
  );
  await expect(notice.locator("details")).not.toHaveAttribute("open", "");
  await notice.getByText("Baca penjelasan", { exact: true }).click();
  await expect(notice.getByText(/Website ini merupakan/)).toBeVisible();
  await notice.getByText("Baca penjelasan", { exact: true }).click();
  await page.getByRole("button", { name: "Saya Mengerti" }).click();
  await expect(notice).toHaveCount(0);
  await page.reload();
  await expect(notice).toBeVisible();
  await page
    .getByRole("button", { name: "Tutup pemberitahuan prototipe" })
    .click();
  await expect(notice).toHaveCount(0);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  await page.locator('.fleet-card a[href="/armada/hiace-premio"]').click();
  await expect(notice).toHaveCount(0);
  await page.reload();
  await expect(notice).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(async () => {
      const bounds = await notice.boundingBox();
      return Math.round(bounds!.x + bounds!.width);
    })
    .toBeLessThanOrEqual(374);
  const box = await notice.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(16);
  expect(Math.round(box!.x + box!.width)).toBeLessThanOrEqual(374);
  expect(box!.y).toBeGreaterThanOrEqual(80);
  expect(box!.height).toBeLessThan(280);
});

const slugs = [
  "hiace-commuter",
  "hiace-premio",
  "elf-tayo",
  "innova-reborn",
  "avanza",
];
test("landing motion reveals once without running text and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const card = page.locator(".fleet-card").first();
  await card.scrollIntoViewIfNeeded();
  await expect
    .poll(() => card.evaluate((el) => el.getAnimations().length))
    .toBeGreaterThan(0);
  await card.evaluate((el) =>
    Promise.all(el.getAnimations().map((animation) => animation.finished)),
  );
  await expect(card).toHaveCSS("opacity", "1");
  await page.locator("#hero-title").scrollIntoViewIfNeeded();
  await card.scrollIntoViewIfNeeded();
  expect(await card.evaluate((el) => el.getAnimations().length)).toBe(0);
  await expect(page.locator(".travel-ticker")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero-content h1")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.setViewportSize({ width: 360, height: 800 });
  await page.locator("#tentang").scrollIntoViewIfNeeded();
  expect(
    await page
      .locator(".about-figure")
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
});
test("footer keeps icon contacts, navigation and visible map usable on phones and desktop", async ({
  page,
}) => {
  await page.goto("/armada/show");
  const footer = page.locator(".footer");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.locator(".footer-map-frame")).toBeVisible();
    await expect(
      footer.locator(".footer-location-link, .footer-map-details"),
    ).toHaveCount(0);
    for (const link of await footer
      .locator(".footer-links a, .footer-social, .footer-legal a")
      .all()) {
      const bounds = await link.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
  }
  await expect(footer.locator(".footer-social")).toHaveCount(3);
  await expect(footer.locator(".footer-instagram")).toHaveAttribute(
    "href",
    "https://www.instagram.com/sewahiacebandung.id_/",
  );
  for (const icon of await footer.locator(".footer-social").all()) {
    await expect(icon).toHaveAttribute("aria-label", /.+/);
    expect((await icon.innerText()).trim()).toBe("");
  }
  await expect(footer.locator(".footer-whatsapp")).toHaveAttribute(
    "href",
    /wa\.me\/6289528051760/,
  );
  await expect(footer.locator(".footer-phone")).toHaveAttribute(
    "href",
    /^tel:/,
  );
});
test("fleet showcase switches models and inline cabin views with correct quote destinations", async ({
  page,
}) => {
  const response = await page.goto("/armada/show");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toContainText("Hiace Premio");
  for (const slug of slugs) {
    await page
      .locator(`.fleet-model-nav a[href="/armada/show?armada=${slug}"]`)
      .click();
    await expect(
      page.locator(`.fleet-model-nav a[href="/armada/show?armada=${slug}"]`),
    ).toHaveAttribute("aria-current", "page");
    const interior = page.getByRole("button", { name: /Lihat interior/ });
    await interior.click();
    await expect(interior).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".fleet-viewer-stage img")).toHaveAttribute(
      "src",
      new RegExp(`interiors%2F${slug}`),
    );
    await page
      .locator(".fleet-viewer-stage img")
      .evaluate((image: HTMLImageElement) => image.decode());
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.locator(`a[href="/?armada=${slug}#reservasi"]`),
    ).toHaveCount(1);
    const chat = await page
      .locator(".fleet-quote-secondary")
      .getAttribute("href");
    expect(new URL(chat!).pathname).toBe("/6289528051760");
    await page.getByRole("button", { name: /Lihat eksterior/ }).click();
    await expect(page.locator(".fleet-viewer-stage img")).toHaveAttribute(
      "src",
      new RegExp(`cutouts%2F${slug}`),
    );
    await expect(page.locator(".fleet-related-card")).toHaveCount(4);
    await expect(page.locator(".fleet-product-metrics > div")).toHaveCount(3);
    await expect(page.locator(".fleet-board-features > div")).toHaveCount(3);
    await expect(page.locator(".fleet-spec-list > div")).toHaveCount(8);
    await expect(page.locator(".fleet-spec-layout")).toContainText(
      "bukan spesifikasi unit rental yang telah diverifikasi",
    );
    const source = await page
      .locator(".fleet-source-link")
      .getAttribute("href");
    expect(new URL(source!).hostname).toBe(
      slug === "elf-tayo" ? "astraisuzu.co.id" : "pressroom.toyota.astra.co.id",
    );
    await page
      .getByRole("navigation", { name: "Detail kendaraan" })
      .getByRole("link", { name: "Spesifikasi" })
      .click();
    await expect(page).toHaveURL(/#spesifikasi$/);
    await expect(page.locator("#fleet-spec-heading")).toBeInViewport();
    await page.getByText("Tentang spesifikasi ini", { exact: true }).click();
    await expect(page.locator(".fleet-source-link")).toBeVisible();
  }
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
  }
  await page.locator(".fleet-quote-primary").click();
  await expect(page.locator("#fleetSlug")).toHaveValue("avanza");
  await page.goto("/armada/show?armada=unknown");
  await expect(page.locator("h1")).toContainText("Hiace Premio");
});

test("legal documents support responsive reading, contents navigation and document switching", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [path, title, requiredText] of [
      ["/kebijakan-privasi", "Kebijakan Privasi", "riwayat browser"],
      [
        "/syarat-ketentuan",
        "Syarat & Ketentuan",
        "Website ini tidak menetapkan harga",
      ],
    ]) {
      await page.goto(path);
      const currentTab = page
        .getByRole("navigation", { name: "Dokumen website" })
        .getByRole("link", { name: title, exact: true });
      await currentTab.click();
      await expect(currentTab).toHaveAttribute("aria-current", "page");
      await expect(page.locator("h1")).toHaveText(title);
      await expect(page.locator(".legal-reading")).toContainText(requiredText);
      if (width === 390)
        await page.locator(".legal-toc-mobile summary").click();
      const links = page.locator(
        width === 390 ? ".legal-toc-mobile nav a" : ".legal-sidebar nav a",
      );
      await expect(links).toHaveCount(4);
      for (const link of await links.all()) {
        const target = await link.getAttribute("href");
        await expect(page.locator(target!)).toHaveCount(1);
      }
      const firstTarget = await links.first().getAttribute("href");
      await links.first().click();
      await expect.poll(() => new URL(page.url()).hash).toBe(firstTarget);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(audit.violations).toEqual([]);
    }
  }
  await page
    .getByRole("navigation", { name: "Dokumen terkait" })
    .getByRole("link", { name: "Kebijakan Privasi" })
    .click();
  await expect(page.locator("h1")).toHaveText("Kebijakan Privasi");
});

test("routes, SEO, all fleet pages and 404", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(
    "BDG TRANS | Sewa Hiace & Rental Kendaraan Bandung",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".fleet-card")).toHaveCount(5);
  expect(
    await page
      .locator('script[type="application/ld+json"]')
      .evaluate((el) => el.textContent),
  ).toContain("Organization");
  for (const slug of slugs) {
    await page.locator(`.fleet-card a[href="/armada/${slug}"]`).click();
    await expect(page.locator("h1")).toContainText("Bandung");
    await expect(
      page.locator(`a[href="/?armada=${slug}#reservasi"]`),
    ).toBeVisible();
    await page.getByRole("link", { name: "Kembali ke pilihan armada" }).click();
  }
  for (const path of ["/kebijakan-privasi", "/syarat-ketentuan"]) {
    const r = await page.goto(path);
    expect(r?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
  expect(errors).toEqual([]);
  const r = await page.goto("/armada/invalid");
  expect(r?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Kembali ke Beranda", exact: true }),
  ).toBeVisible();
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});
test("fleet prefill, validation, summary and official WhatsApp message without backend storage", async ({
  page,
}) => {
  const mutations: string[] = [];
  page.on("request", (request) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method()))
      mutations.push(request.url());
  });
  await page.goto("/");
  await page
    .locator(".fleet-card")
    .nth(1)
    .getByRole("link", { name: "Minta Penawaran" })
    .click();
  await expect(page.locator("#fleetSlug")).toHaveValue("hiace-premio");
  const review = page.getByRole("button", { name: "Periksa Permintaan" });
  await expect(review).toBeDisabled();
  await page.locator("#consent").check();
  await review.click();
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  expect(mutations).toEqual([]);
  await expect(page.locator("#fullName-error")).toBeVisible();
  await page.locator("#fullName").fill("Rani Putri");
  await page.locator("#whatsappNumber").fill("0812-3456-7890");
  await page.locator("#passengers").fill("12");
  await page.locator("#pickupDate").fill("2099-11-07");
  await page.locator("#pickupTime").fill("08:30");
  await page.locator("#endDate").fill("2099-11-08");
  await page.locator("#endTime").fill("18:00");
  await page.locator("#tripType").selectOption("wisata");
  await page.locator("#pickupLocation").fill("Stasiun Bandung");
  await page
    .locator("#destination")
    .fill("Lembang & Ciwidey 🌿\nWisata keluarga");
  await page.locator("#notes").fill("Koper tambahan");
  await review.click();
  await expect(
    page.getByRole("heading", { name: "Ringkasan perjalanan" }),
  ).toBeFocused();
  await expect(page.locator(".summary")).toContainText("6281234567890");
  await page.getByRole("button", { name: "Ubah Detail Perjalanan" }).click();
  await expect(page.locator("#fullName")).toHaveValue("Rani Putri");
  await review.click();
  let whatsapp = "";
  await page.route("https://wa.me/**", async (route) => {
    whatsapp = route.request().url();
    await route.fulfill({
      status: 200,
      contentType: "text/plain",
      body: "WhatsApp navigation intercepted for verification",
    });
  });
  await page.getByRole("button", { name: "Lanjut ke WhatsApp" }).click();
  await expect
    .poll(() => whatsapp)
    .toContain("https://wa.me/6289528051760?text=");
  const message = new URL(whatsapp).searchParams.get("text")!;
  expect(message).toContain("Armada: Toyota Hiace Premio");
  expect(message).toContain("Nomor WhatsApp: 6281234567890");
  expect(message).toContain("Lembang & Ciwidey 🌿\nWisata keluarga");
});
test("each fleet and service prefill preserves existing form entries", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#reservasi").scrollIntoViewIfNeeded();
  await page.locator("#fullName").fill("Nama tetap");
  for (const slug of slugs) {
    await page
      .locator(`.fleet-card a[href="/?armada=${slug}#reservasi"]`)
      .click();
    await expect(page.locator("#fleetSlug")).toHaveValue(slug);
    await expect(page.locator("#fullName")).toHaveValue("Nama tetap");
  }
  for (const type of ["wisata", "dinas", "bandara", "keluarga"]) {
    await page.locator(`a[href="/?jenis=${type}#reservasi"]`).click();
    await expect(page.locator("#tripType")).toHaveValue(type);
    await expect(page.locator("#fullName")).toHaveValue("Nama tetap");
  }
  await page.goto("/?armada=unknown#reservasi");
  await expect(
    page.getByText("Armada pada tautan tidak dikenal.", { exact: false }),
  ).toBeVisible();
  await expect(page.locator("#fleetSlug")).toHaveValue("");
});
test("gallery stays hidden; FAQ and mobile menu support keyboard and focus restoration", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Buka menu navigasi" });
  await menu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Navigasi seluler" })
    .getByRole("link", { name: "Armada", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#galeri")).toHaveCount(0);
  await expect(page.locator('a[href="#galeri"]')).toHaveCount(0);
  const questions = page.locator("#faq button");
  for (let i = 0; i < (await questions.count()); i++) {
    await questions.nth(i).click();
    await expect(questions.nth(i)).toHaveAttribute("aria-expanded", "true");
    await questions.nth(i).click();
    await expect(questions.nth(i)).toHaveAttribute("aria-expanded", "false");
  }
  await page.locator("#reservasi").scrollIntoViewIfNeeded();
  await expect(page.locator(".sticky-cta")).toHaveCount(0);
});
test("quote scope stays consistent and long mobile fields use full width", async ({
  page,
}) => {
  await page.goto("/armada/hiace-premio");
  const scope = page.locator(".fleet-quote-scope");
  await scope.locator("summary").click();
  await expect(scope.locator("dl > div")).toHaveCount(6);
  await expect(scope).toContainText("belum dinyatakan termasuk dalam harga");
  for (const label of [
    "Sopir",
    "BBM",
    "Tol & parkir",
    "Durasi",
    "Menginap",
    "Rute",
  ])
    await expect(scope.getByText(label, { exact: true })).toBeVisible();
  await page.goto("/syarat-ketentuan");
  await expect(page.locator("#harga-dan-kesepakatan")).toContainText(
    "akomodasi dan konsumsi sopir",
  );
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "Apa saja yang perlu dikonfirmasi dalam penawaran?",
    })
    .click();
  await expect(page.locator(".faq-answer[data-state=open]")).toContainText(
    "akomodasi dan konsumsi sopir",
  );
  await expect(page.locator(".travel-destination img").first()).toHaveAttribute(
    "loading",
    "lazy",
  );
  await page.locator("#reservasi").scrollIntoViewIfNeeded();
  await page.locator("#pickupLocation").waitFor();
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 844 });
    const route = await page.locator(".reservation-route-grid").boundingBox();
    const pickup = await page.locator("#pickupLocation").boundingBox();
    const destination = await page.locator("#destination").boundingBox();
    expect(Math.abs(route!.width - pickup!.width)).toBeLessThan(1);
    expect(Math.abs(route!.width - destination!.width)).toBeLessThan(1);
    expect(destination!.y).toBeGreaterThan(pickup!.y + pickup!.height);
  }
});
for (const width of [360, 390, 768, 1280, 1440]) {
  test(`responsive ${width}px and accessibility`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("#reservasi").scrollIntoViewIfNeeded();
    await expect(page.locator("#fullName")).toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.evaluate(async () => {
      await document.fonts.ready;
      Array.from(document.images).forEach((img) => {
        img.loading = "eager";
      });
      await Promise.all(
        Array.from(document.images).map((img) => img.decode().catch(() => {})),
      );
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    if (width === 390 || width === 1440)
      await page.screenshot({ path: `docs/home-${width}.png`, fullPage: true });
    for (const img of await page.locator("img").all()) {
      await expect(img).toHaveAttribute("alt", /.+/);
      expect(
        await img.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      ).toBe(true);
    }
  });
}
test("navigation anchors, conversion links and contact destinations are real", async ({
  page,
}) => {
  await page.goto("/");
  for (const id of [
    "beranda",
    "tentang",
    "armada",
    "layanan",
    "faq",
    "reservasi",
  ]) {
    expect(await page.locator(`#${id}`).count()).toBe(1);
  }
  for (const link of await page.locator('a[href^="#"]').all()) {
    const href = await link.getAttribute("href");
    expect(await page.locator(href!).count()).toBe(1);
    if (href === "#main") await link.focus();
    await link.click();
  }
  await expect(page.locator('a[href="tel:+6289528051760"]')).toHaveCount(1);
  const chats = page.locator('a[href^="https://wa.me/"]');
  expect(await chats.count()).toBeGreaterThan(0);
  for (const link of await chats.all()) {
    expect(new URL((await link.getAttribute("href"))!).pathname).toBe(
      "/6289528051760",
    );
  }
});

test("hero quick form validates and forwards vehicle, pickup date and passengers", async ({
  page,
}) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Rencanakan perjalanan" });
  await form.getByRole("button", { name: "Minta Penawaran" }).click();
  await expect(page).not.toHaveURL(/#reservasi/);
  await page.locator("#hero-armada").selectOption("innova-reborn");
  await page.locator("#hero-tanggal").fill("2099-11-07");
  await page.locator("#hero-penumpang").fill("5");
  await form.getByRole("button", { name: "Minta Penawaran" }).click();
  await expect(page).toHaveURL(
    /armada=innova-reborn&tanggal=2099-11-07&penumpang=5#reservasi/,
  );
  await expect(page.locator("#fleetSlug")).toHaveValue("innova-reborn");
  await expect(page.locator("#pickupDate")).toHaveValue("2099-11-07");
  await expect(page.locator("#passengers")).toHaveValue("5");
  await expect(page.locator("#reservation-heading")).toBeFocused();
});

test("ignores malformed quick-form query values", async ({ page }) => {
  await page.goto("/?tanggal=2099-02-30&penumpang=99#reservasi");
  await expect(page.locator("#pickupDate")).toHaveValue("");
  await expect(page.locator("#passengers")).toHaveValue("1");
});

test("compact header switches transparent white branding to navy on scroll", async ({
  page,
}) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  await expect(header).toHaveAttribute("data-overlay", "true");
  await expect(header.locator("img")).toHaveAttribute("src", /logo-white/);
  await page.locator("#armada").scrollIntoViewIfNeeded();
  await expect(header).toHaveAttribute("data-scrolled", "true");
  await expect(header).toHaveAttribute("data-overlay", "false");
  await expect(header.locator("img")).toHaveAttribute("src", /logo-navy/);
  await expect
    .poll(() => header.evaluate((el) => el.getBoundingClientRect().height))
    .toBeLessThanOrEqual(65);
  await page.goto("/armada/avanza");
  await expect(header).toHaveAttribute("data-overlay", "false");
  await expect(header.locator("img")).toHaveAttribute("src", /logo-navy/);
});

test("uses Google Sans consistently across headings, navigation and form controls", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const selector of [
    "body",
    "h1",
    "#about-heading",
    ".fleet-card h3",
    ".site-header nav a",
    "#faq button",
  ]) {
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((el) => getComputedStyle(el).fontFamily),
    ).toMatch(/Google.?Sans/);
  }
  expect(
    await page.locator("h1").evaluate((el) => getComputedStyle(el).fontWeight),
  ).toBe("500");
  expect(
    await page.evaluate(() =>
      Array.from(document.fonts).some(
        (face) => /Google.?Sans/.test(face.family) && face.status === "loaded",
      ),
    ),
  ).toBe(true);
  await page.locator("#reservasi").scrollIntoViewIfNeeded();
  await expect(page.locator("#fullName")).toBeVisible();
  for (const selector of [
    "#fullName",
    "#fleetSlug",
    "#destination",
    "#reservasi button",
  ]) {
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((el) => getComputedStyle(el).fontFamily),
    ).toMatch(/Google.?Sans/);
  }
  await page.goto("/armada/avanza");
  expect(
    await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily),
  ).toMatch(/Google.?Sans/);
});

test("floating WhatsApp links to admin without covering the mobile quote button", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.getByRole("link", {
    name: "Hubungi admin BDG TRANS melalui WhatsApp",
  });
  await expect(button).toBeVisible();
  const href = new URL((await button.getAttribute("href"))!);
  expect(href.hostname).toBe("wa.me");
  expect(href.pathname).toBe("/6289528051760");
  await expect(button).toHaveAttribute("target", "_blank");
  await expect
    .poll(async () => {
      const fab = await button.boundingBox();
      const quote = await page.locator(".sticky-cta a").boundingBox();
      return Boolean(fab && quote && fab.x >= quote.x + quote.width + 8);
    })
    .toBe(true);
  await page.goto("/armada/avanza");
  await expect(button).toBeVisible();
  const box = await button.boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(box!.y + box!.height).toBeLessThanOrEqual(844);
});
