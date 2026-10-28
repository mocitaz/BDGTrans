import { test, expect } from "@playwright/test";

test("mobile vertical scroll advances all fleet cards and releases the next section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Saya Mengerti", exact: true })
    .click();
  const section = page.locator("#armada");
  await expect(section).toHaveAttribute("data-pinned", "true");
  await section.scrollIntoViewIfNeeded();
  await expect(page.locator(".header-inner")).toHaveCSS("height", "64px");
  const geometry = await section.evaluate((element) => {
    const sticky = element.querySelector<HTMLElement>(".fleet-sticky")!;
    return {
      start:
        window.scrollY +
        element.getBoundingClientRect().top -
        parseFloat(
          getComputedStyle(element).getPropertyValue("--fleet-sticky-top"),
        ),
      distance:
        parseFloat((element as HTMLElement).style.height) - sticky.offsetHeight,
    };
  });
  await page.evaluate(
    (start) => window.scrollTo({ top: start, behavior: "instant" }),
    geometry.start,
  );
  await page.mouse.move(190, 350);
  await page.mouse.wheel(0, geometry.distance / 4);
  await expect(page.locator(".fleet-scroll-count")).toHaveText("2 / 5");
  for (const index of [2, 3, 4]) {
    await page.evaluate(
      ({ start, distance, index }) =>
        window.scrollTo({
          top: start + (distance * (index - 0.12)) / 4,
          behavior: "instant",
        }),
      { ...geometry, index },
    );
    await expect(page.locator(".fleet-scroll-count")).toHaveText(
      `${index + 1} / 5`,
    );
    await expect
      .poll(async () => {
        const bounds = await section
          .locator(".fleet-card")
          .nth(index)
          .boundingBox();
        return Math.abs(bounds!.x - 20);
      })
      .toBeLessThan(2);
    const card = await section.locator(".fleet-card").nth(index).boundingBox();
    expect(card!.x).toBeGreaterThanOrEqual(18);
    expect(card!.x + card!.width).toBeLessThanOrEqual(372);
    const quote = await section
      .locator(".fleet-card")
      .nth(index)
      .locator(".fleet-quote")
      .boundingBox();
    expect(quote!.y).toBeGreaterThan(64);
    expect(quote!.y + quote!.height).toBeLessThan(764);
  }
  await page.getByRole("button", { name: "Armada sebelumnya" }).click();
  await expect(page.locator(".fleet-scroll-count")).toHaveText("4 / 5");
  await section.locator(".fleet-card").first().locator(".fleet-detail").focus();
  await expect(page.locator(".fleet-scroll-count")).toHaveText("1 / 5");
  await page.evaluate(
    ({ start, distance }) =>
      window.scrollTo({ top: start + distance + 650, behavior: "instant" }),
    geometry,
  );
  await expect(page.locator(".why-bdg-heading")).toBeInViewport();
  await page.evaluate(
    ({ start, distance }) =>
      window.scrollTo({ top: start + distance, behavior: "instant" }),
    geometry,
  );
  await section.locator(".fleet-card").last().locator(".fleet-quote").click();
  await expect(page.locator("#fleetSlug")).toHaveValue("avanza");
});

test("fleet scroll keeps reduced-motion, desktop and short-screen fallbacks usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const section = page.locator("#armada");
  await expect(section).toHaveAttribute("data-pinned", "true");
  await page.setViewportSize({ width: 390, height: 500 });
  await expect(section).toHaveAttribute("data-pinned", "false");
  await expect(section).toHaveAttribute("data-mobile-rail", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(section).toHaveAttribute("data-mobile-rail", "false");
  await expect(section.locator(".fleet-scroll-controls")).toBeHidden();
  await expect(section).not.toHaveAttribute("style", /height:/);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(section).toHaveAttribute("data-pinned", "false");
  await expect(section).toHaveAttribute("data-mobile-rail", "false");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
