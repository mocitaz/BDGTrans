# BDG TRANS validation

26 October 2026 (WIB). Final checks used Node.js 24.22.1. Local review server: http://localhost:3001.

## Actual command results

| Command | Result |
| --- | --- |
| `npm run lint` | PASS, no errors or warnings |
| `npm run typecheck` | PASS, strict TypeScript |
| `npm run format:check` | PASS |
| `npm test` | PASS, 37 tests across three files |
| `npm run build` | PASS, all public pages and metadata routes |
| `npm run test:e2e` | PASS, 10 tests, final run 42.2 seconds |
| `npm audit` | PASS, zero known vulnerabilities |
| Lighthouse 13.5.0, production server, mobile simulation | Performance 90, Accessibility 100, Best Practices 100, SEO 66 |

Lighthouse report: `lighthouse-mobile.report.html` and `.json`. The sole failing SEO audit is `is-crawlable`: local/staging intentionally emits noindex/nofollow and disallows crawling until the verified production origin is configured. All other weighted SEO audits passed. Production SEO >=95 remains a deployment verification target after configuring the origin and enabling SITE_INDEXABLE. Do not treat the staging score as the production score.

Measured CLS: 0. Simulated mobile LCP: 3.7 seconds. This is a lab snapshot, not a guarantee across devices/networks. The final hash-navigation/loading-markup fix was followed by the full lint/typecheck/unit/build/browser suite; the performance snapshot immediately preceded that fix on the same image and deferred-form configuration.

## Implementation phases

1. Bootstrap: clean repository initialized with typed data, tokens, fonts, tooling and environment template. Initial lint/typecheck/build gate passed before landing-section implementation.
2. Shared components: Radix dialogs/accordion, buttons/cards/inputs, header, mobile menu and footer. Final browser gate verifies keyboard operation, Escape and focus restoration.
3. Above the fold: local landscape hero, HTML headline, functional CTAs, highlights and split about. Desktop/mobile screenshots inspected; images render without broken requests.
4. Core sections: five fleet/detail routes, invalid-slug 404, service prefills, benefits, steps, gallery, conditional testimonials/contact prompt, FAQs and final CTA. Browser gate passed.
5. Conversion: browser form, consent, review summary, Jakarta schema, phone normalization and exact WhatsApp builder. Unit/browser gate passed; no backend mutation or browser-storage persistence in the tested flow.
6. SEO/QA: metadata, canonical configuration, robots/sitemap, JSON-LD, OG, legal pages, responsive/a11y audits, optimization and documentation completed. Domain and actual business assets remain external launch inputs.

## Browser evidence

- Homepage title, one H1, five cards, Organization JSON-LD. All five fleet detail pages and both legal pages visited; unknown fleet route returns HTTP 404.
- Every fleet CTA selects the matching slug; every service CTA selects the matching trip type while preserving a typed name.
- Direct unknown-slug query shows an explanatory message and empty selection. Hash navigation loads the deferred form.
- Consent starts unchecked; invalid inputs show inline errors. Valid inputs show a normalized phone in the summary; editing restores values.
- Final action opens the official wa.me/6289528051760 URL with emoji, ampersands and multiline data preserved. Request interception prevents any real WhatsApp message.
- No POST/PUT/PATCH/DELETE requests or localStorage/sessionStorage writes during the tested conversion.
- All four gallery dialogs, mobile menu and six FAQ items exercised. Escape restores trigger focus. Menu links close the dialog.
- Sticky mobile CTA hides at the form/footer, including after deferred rendering.
- No horizontal overflow at 360, 390, 768, 1280 or 1440px. Axe WCAG A/AA checks, including 2.1 A/AA and 2.2 AA tags, report zero violations at all five widths.
- Reduced motion exercised. Every image checked for nonempty alt text and natural dimensions. No unexpected console/page errors during public-route traversal.
- Lighthouse browser-console and label-in-name audits pass after fixes.
- Screenshots: home-390.png, home-1440.png, mobile-top.png, desktop-top.png.

## Anti Slop delivery gate

PASS: Hard gate. Real routes/anchors/actions tested; no overflow at required widths; no invented prices, ratings, capacities, testimonials or business details. Illustrations disclosed; keyboard, error, loading and empty states implemented. User-approved PRD copy retains its specified punctuation under the source-of-truth instruction.

PASS: Purpose gate. Navy, typography, overlay, labels, cards, icons, arrows and subtle geometry have written reasons in design-decisions.md. No unrequested theme toggle or decorative glow system.

PASS: Liveliness. ENERGY 2 / RHYTHM 2 / MOTION 1 declared before implementation. Automotive photography supplies focal points; editorial splits alternate with catalogs; itinerary rules/numbering repeat. Navy is the deliberate accent; motion stays restrained.

PASS: Craftsmanship. Final lint/typecheck/build/unit/E2E suite passed; public routes and primary controls exercised. Accessible dialogs and native form controls support keyboard use. Testimonials require verification and publication permission. Design follows the PRD without invented business claims.

## Production inputs

- Verified public domain; rebuild with NEXT_PUBLIC_SITE_URL and SITE_INDEXABLE=true.
- Confirm consistency between the BDG TRANS site name and the supplied logo lettering. The supplied image now replaces temporary wordmarks and icons at the user's explicit request.
- Authorized actual fleet/travel photographs to replace labeled AI illustrations.
- Verified capacities/facilities/operating policies before adding those claims.

No production deployment or actual customer message was performed.

## Supplied logo update

The user requested applying `public/images/icon/logo.jpg` to the site. Header, footer, mobile menu, app icon/favicon and OpenGraph now use that supplied asset without altering its identity. Its lettering appears to read ODG TRANS; site copy remains BDG TRANS, and this difference was disclosed. Lint, typecheck, formatting and build passed after the change. All 10 E2E tests passed in 40.3 seconds, including responsive/accessibility checks at the five required widths. Header/footer/mobile-menu logo screenshots were visually inspected; the local server returned HTTP 200. The earlier Lighthouse score is not a fresh measurement of this logo update.

## Hero reference revision

Updated at the user's request to a rounded light hero with a short headline, vehicle photograph on the right and a three-field quick form (vehicle, pickup date, passengers). The quick form forwards validated non-PII query values to the full consent/review/WhatsApp flow. Invalid calendar dates and passenger query values are ignored. Lint, typecheck, formatting, 37 unit tests and build passed. All 12 E2E tests passed in 40.6 seconds; after the final desktop headline-width adjustment, build and all five responsive/a11y tests passed again (10.5 seconds). Screenshots were checked on desktop and mobile. Earlier Lighthouse measurements predate this hero redesign and are historical.

Hero delivery gate: Hard gate PASS (functional form/anchors, five overflow/a11y checks); Purpose gate PASS (supplied reference and reasons in design-decisions.md); Liveliness PASS (ENERGY 2 / RHYTHM 2 / MOTION 1 retained, vehicle focal point and navy accent); Craftsmanship PASS (build and functional/browser validation above).

## Original-logo color variants, compact header and final typography

The final implementation preserves the supplied original logo shape and lettering. No generated redesign is used. Two self-contained transparent SVG color variants embed the unchanged JPEG and apply only alpha/color filtering. Original proportions are maintained with object-contain. Header is transparent with white logo at the top, switching to solid white/navy and 64px height after scrolling. Other routes begin with the solid header. Full hero photography and navy overlay replace the white fade. The final heading is smaller and supporting text measures one line at 1440px (720px width, 25.2px line-height, 25.19px rendered height).

Lint, strict typecheck, 37 unit tests, build and all 13 E2E tests passed (43.8s). Following the final font-size adjustment, formatting/build passed again and all five responsive/a11y tests plus the scroll-header test passed (6 tests, 12.1s). Desktop, mobile, white-logo and navy-logo scroll states were visually checked. Header/hero delivery gates PASS for functionality, contrast/overflow, original-asset preservation, documented design direction and browser verification. Earlier Lighthouse numbers are historical, not fresh measurements of these changes.

## Hero fitting and label removal

Hero form now anchors below the main vehicle body on desktop, using the shared 1200px alignment guide. Image position, viewport-fit height and mobile spacing adjusted. The requested visible illustration notice is removed from the hero (DOM count 0 at desktop and mobile). Lint, typecheck and build passed; five responsive/accessibility tests, quick-form forwarding and compact-header scroll test all passed (7 tests, 15.1s). Desktop/mobile screenshots inspected in hero-fit-1440.png and hero-fit-390.png. Delivery gates PASS: working controls and no overflow/a11y violations; documented composition choices; restrained navy/photography direction retained; production build and targeted browser checks verified.

## Compact composition approved by user

Applied the recommended shorter desktop hero, lighter vehicle-side overlay, relaxed title tracking and quick form floating across the lower image boundary. Mobile uses a flow-positioned overlapping form. Lint, strict typecheck and build passed. All five required responsive/a11y checks, hero quick-form forwarding and scroll-header state checks passed (7 tests, 16.3s). Desktop and mobile screenshots visually reviewed in hero-balanced-1440.png and hero-balanced-390.png. Delivery gates PASS: functioning form/header, no overflow or automated accessibility violations at five widths, purposeful boundary overlap with reserved content space, original logo preserved and no new claims or illustrations introduced.

## Gedung Sate hero with logo and safe framing

Replaced the hero with a generated branded concept image using the original supplied logo as a navy side-panel decal. Added dedicated 3:1 desktop and 4:5 mobile local WebP variants to avoid cropping the vehicle. Alt text identifies the image as an illustration. Header/logo components, copy, form behavior and navy overlay remain unchanged. Actual source selection and full-vehicle framing visually checked at widths 390, 1440, 2174 and 2560px; screenshots are branded-hero-{width}.png. Lint/typecheck/build passed; all five required responsive/a11y E2E checks passed (13.2s). Delivery gates PASS for functional image source selection, visible complete vehicle/body logo, no overflow/a11y violations, documented photo direction and verified local production build. Prior Lighthouse measurements remain historical.

## About-section redesign

Replaced the prior scenic image/caption card and introductory text with an original transparent two-vehicle asset, navy curved accent, new centralized copy, two working CTAs and factual vehicle/contact descriptors. No numeric business statistics copied from the reference. Generated assets show a black Hiace Premio with white original logo decal and silver Elf with navy decal; both vehicles retain natural proportions and transparent background. The supplied logo/header and hero are unchanged. Lint, strict typecheck and production build passed. Five required responsive/a11y tests and anchor/contact navigation test passed (6 tests, 13.6s). Screenshots about-redesign-1440.png and about-redesign-390.png visually inspected. Delivery gates PASS for functional controls, no overflow/a11y violations, honest illustration caption, documented composition, restrained navy accent and verified build/browser behavior.

## Global Google Sans typography

Replaced Inter/Plus Jakarta Sans with self-hosted Google Sans variable across all public pages, headings, body copy, navigation, buttons, form controls and dialogs. Added shared family/weight/type-scale tokens, regular body and medium 500 heading/label/button weights, relaxed tracking and slightly larger supporting text. Logo/vehicle images are unchanged. Native control font resets now preserve component size/weight classes instead of overriding them via a full font shorthand.

Lint, strict typecheck, 37 unit tests, production build and all 14 E2E tests passed (47.1s). The additional typography test asserts Google Sans computed styles on heading/navigation/FAQ/form/detail-page elements, a loaded Google Sans FontFace, and 500 heading weight. Desktop/mobile hero and About screenshots visually inspected; five-width overflow/a11y checks pass. Build emits a Next Font diagnostic about unavailable auto-generated fallback metrics for Google Sans; native system fallbacks are provided explicitly in the shared CSS stack, Google Sans loads correctly, and build exits successfully. Earlier Lighthouse measurements are historical. Typography delivery gates PASS: consistent functional UI, documented font choice and hierarchy, preserved page rhythm/identity, no overflow/a11y violations and verified loaded font/controls.

## About copy and label cleanup

At the user's explicit request, updated About copy to “Bawa rencana Anda. Kami bantu pilih kendaraannya.” with a practical trip-detail/quotation paragraph. Removed the decorative eyebrow rule only in About and removed its visible illustration caption; factual image alt text remains. DOM check: caption count 0, eyebrow ::before content none. Desktop screenshot about-copy-update.png inspected. Lint/typecheck/build passed; all five responsive/a11y checks passed (12.4s). Existing Google Sans fallback-metrics diagnostic remains informational as documented above. Delivery gates PASS for scoped styling, real CTA behavior, no new business claims, and verified responsive rendering.

## Fleet reference-layout rebuild

Rebuilt the Fleet section around the supplied visual reference: short centered heading without an eyebrow rule; white cards with brand heading, left-facing transparent vehicle overlapping a navy contact stage, a slim trip-type strip, centered model/short summary and rounded quote/detail actions. Exactly five models remain, with the last pair centered on desktop. New locally generated cutouts use varied paint and original logo decals; detail pages use contain fitting for complete vehicles.

Lint, strict typecheck, formatting, 37 unit tests and production build passed. The full 14-test E2E run passed all 9 route/conversion/menu/navigation/font tests; its 5 responsive/a11y tests found only a 4.43:1 contrast issue in the new muted-background note. The note was darkened, production rebuilt successfully and all 5 responsive/a11y tests then passed (12.6s). No functional code changed after the passing flow tests. Existing Google Sans fallback-metrics diagnostic remains informational. Screenshots fleet-redesign-1440.png and fleet-redesign-390.png visually checked; the latter is an isolated component screenshot with fixed browser/development chrome hidden only during QA capture, not in the site.

Delivery gates PASS: original five models and real quote/detail destinations; vehicle/source images decoded at all required widths; no overflow or remaining automated accessibility violations; illustration disclosure/alt text present; no fabricated capacities/prices/rental packages; reference-based card hierarchy and restrained navy styling documented; all necessary build/unit/route/conversion/visual checks verified. Generation prompts and paths are recorded in assets.md.

## Fleet label cleanup

Removed the visible section-level illustration/detail note and the brand wordmark above every vehicle image at the user's request. Retained the navy-strip brand/contact information and original vehicle decals. Reduced the visual area and top image offset by 30px to close the removed heading space without changing vehicle proportions. DOM confirms both removed classes have zero elements and five cards remain. Lint, strict typecheck, formatting and build passed; all five responsive/a11y tests passed (12.8s). Card screenshot fleet-card-clean.png visually inspected. Delivery gates PASS for requested content removal, preserved actions/vehicles, compact spacing and responsive/a11y verification.

## Floating WhatsApp contact

Added a root-layout WhatsApp link visible on every public route, fixed bottom-right and pointing to the official admin destination with the existing generic greeting. It opens a separate tab via a real user-click link and never auto-sends a message. Includes an accessible action label, visible focus, reduced-motion support, local SVG icon and retained MIT license. At mobile widths its position lifts above the quote bar when present; footer spacing protects lower links. Lint/typecheck/build passed. All five responsive/a11y checks plus a new destination/target/mobile-bar-clearance/detail-route test passed (6 tests, 12.6s). The initial icon's empty alt was replaced with the meaningful service name to satisfy image semantics checks. Delivery gates PASS for real action, accessible naming/target size, mobile separation, documented styling and verified production rendering. Existing Google Sans fallback-metrics warning is unchanged and informational.

Final mobile contact placement: the quote bar now reserves an 88px right column, and the floating WhatsApp button sits in that separate corner slot rather than above the bar. The test asserts >=8px horizontal clearance from the quote link. Final build passed and all five responsive/a11y checks plus the WhatsApp destination/non-overlap/detail-route check passed (6 tests, 13.5s). This supersedes the earlier above-bar positioning note. Mobile screenshot floating-wa-390.png checked.

## Compact reservation form and edited portrait — 2026-10-26

- Node 24.22.1: lint, TypeScript, formatting check, all 37 unit tests and production build passed.
- All 15 Playwright tests passed (45.6s), including validation, retained values after editing, query prefills, summary focus, official WhatsApp payload, no backend storage, responsive layouts and axe checks at 360/390/768/1280/1440px.
- Visually inspected the desktop, tablet and phone reservation layouts after fonts and image decoding. Confirmed complete portrait, grouped controls, visible notes/consent and compact introduction. Component-only QA screenshots temporarily hid fixed navigation/contact chrome in the browser; website source behavior is unchanged.
- The existing informational Next Font warning about unavailable Google Sans fallback override metrics remains. Production compilation succeeded and the Google Sans loading/typography browser test passed.
- Local development preview remains available on port 3001 at /#reservasi.

## Reservation photographic backdrop — 2026-10-26

Lint, typecheck, format check, 37 unit tests, production build and all 15 browser tests passed. Following the final mobile frame adjustment, rebuilt production and reran all six responsive/accessibility and floating-contact tests: six passed. Existing Google Sans fallback-metrics warning remains informational. Inspected the photographic composition on desktop and mobile; the full mobile 4:5 frame preserves the subject's head and hands. Form validation, review and WhatsApp payload behavior remain verified by the full suite.

## Icon-based services redesign — 2026-10-26

Lint, typecheck, formatting, all 37 unit tests and production build passed. The initial browser run passed 10 flow/SEO/navigation tests and identified a visible-label/accessibility-name mismatch on the four new full-card links. Removed the unnecessary aria-label overrides so the visible card content provides each accessible name. Rebuilt production and reran all five responsive/axe tests at 360/390/768/1280/1440px: five passed. Confirmed the services section contains zero image elements and visually inspected desktop/mobile layouts. Fleet/service prefill and retained form values passed. The existing informational Google Sans fallback-metrics build warning remains.

## Editorial services layout — 2026-10-26

Formatting, lint, TypeScript and production build passed. Six relevant browser tests passed: all fleet/service prefills preserve existing form data, and all five responsive/axe checks pass at 360–1440px. Visually inspected desktop and phone layouts, confirming aligned line icons, unobstructed links and the absence of service photos, card fills and decorative shadows. The previously documented informational Google Sans fallback warning remains.

## Gallery and community sequence — 2026-10-26

Formatting, lint, TypeScript, all 37 unit tests, production build and all 15 browser tests passed (43.6s). Gallery lightbox opening, Escape and focus restoration remain verified for all four new images. Existing responsive/axe checks pass at 360/390/768/1280/1440px.

Inspected the new gallery and community sequence at desktop/phone widths. A separate development-browser axe scan of the dummy community sections reported zero violations, and all four requested institution names render in preview. Checked the generated production HTML: dummy institution names and sample customer attributions are absent. Production renders only verified publication-approved entries, with both real arrays currently empty. The existing informational Google Sans fallback-metrics warning remains.

## Testimonial reference refinement — 2026-10-26

Lint, typecheck, formatting, all 37 unit tests and production build passed. Inspected three-column desktop and stacked phone examples. Development-only testimonial axe scans at 390/768/1440px reported zero violations and no document overflow, with three example profiles rendered. All five production responsive/axe tests passed after the final text-color adjustment. Generated production HTML excludes all three abbreviated dummy names. Existing informational Google Sans fallback warning remains.

## Indonesian preview avatars — 2026-10-26

Generated, inspected and installed three distinct 320px WebP portraits for the local testimonial examples. Lint, typecheck, formatting, 37 unit tests and production build passed. Browser checks confirmed all three optimized images decode, have descriptive synthetic-preview alt text and display at 44×44px. Inspected desktop/mobile layouts; development-only testimonial axe scan reported zero violations. Production HTML contains none of the dummy avatar paths. Existing informational Google Sans fallback-metrics warning remains.

## Fifteen-logo institutional marquee — 2026-10-26

Formatting, lint, TypeScript, all 37 unit tests, production build and all 15 browser tests passed (41.7s). Separate development-browser checks verified fifteen original logos, successful decoding of all thirty images including the hidden duplicate group, moving transform, explicit pause/resume, hover pause/resume and keyboard-focus pause. Preview axe scans passed in both animated and reduced-motion modes.

The initial reduced-motion check found the duplicate list's grid display overriding its hide rule; increased selector specificity and confirmed the duplicate and pause control are hidden, animation is none and exactly fifteen static logos remain. No overflow at 360/768/1440px. Production HTML excludes all preview logo paths. Visually inspected desktop/mobile views and reviewed downloaded marks. A versioned Disdik asset path avoids reusing its earlier low-resolution thumbnail cache. The existing informational Google Sans fallback-metrics warning remains.

## Compact gallery without modal — 2026-10-26

Lint, typecheck, formatting, 37 unit tests, production build and all 15 browser tests passed (42.8s). Updated the former lightbox test to verify four semantic figures, no gallery buttons/links and no dialog after clicking a photo; mobile menu and FAQ focus checks remain. Responsive/axe checks pass at all five widths. Inspected compact desktop and phone screenshots and confirmed the gallery footer points to the real admin WhatsApp. The existing informational Google Sans fallback warning remains.

## Navy vehicle travel banner — 2026-10-26

Formatting, lint, TypeScript, all 37 unit tests, production build and all 15 browser tests passed (44.3s). Following the final vehicle baseline adjustment, rebuilt and reran all five responsive/axe checks: five passed. Inspected desktop and phone compositions with both vehicle images decoded; images use contain fitting, no overflow and a real #reservasi conversion link. The section is addressable at #rencana-perjalanan. The existing informational Google Sans fallback-metrics warning remains.

## Five destination thumbnails — 2026-10-26

Formatting, lint, typecheck, 37 unit tests, production build and all 15 browser tests passed (40.2s). After the final mobile scroll-padding refinement, rebuilt and reran all five responsive/axe checks: five passed. Inspected desktop/mobile screenshots with all destination images decoded. Confirmed exactly five thumbnails, no visible text in their strip, and working native horizontal keyboard scrolling on phones. Existing informational Google Sans fallback warning remains.

## Compact navy footer — 2026-10-26

Formatting, lint, typecheck and production build passed. Seven targeted browser tests passed: five responsive/axe checks, navigation/contact destinations and floating WhatsApp placement. Visually inspected desktop/mobile screenshots; footer height is approximately 294px desktop and 476px phone. Original white logo shape is preserved and aligned left; no overflow or inaccessible contrast was reported. Existing informational Google Sans fallback warning remains.

## Prototype disclosure notification — 2026-10-26

Formatting, lint, typecheck, 37 unit tests and production build passed. Added an end-to-end lifecycle check for initial visibility, both close actions, reappearance after refresh and direct inner-route refresh, retained dismissal during client navigation, no local/session storage and settled mobile bounds. Existing flow tests acknowledge the notification through a locator handler when interacting with the site. The first mobile-bound assertion sampled the entrance animation; updated it to wait for the panel to settle rather than inspecting its transient translation.

Visually inspected desktop and phone panels. A separate notice-only axe scan reported zero violations; reduced-motion emulation confirms animation is disabled. Existing informational Google Sans fallback warning remains.

Final browser suite: all 16 tests passed (46.9s), including the new notification lifecycle test and all existing responsive/accessibility and conversion checks.

## Compact FAQ — 2026-10-26

Formatting, lint, typecheck, 37 unit tests, production build and all 16 browser tests passed (48.4s). Existing browser coverage expands/collapses all six FAQ items and verifies aria-expanded, menu focus restoration, all five responsive/axe widths and prototype-notice lifecycle. Inspected desktop closed-state and phone open-state screenshots, with 48px phone section padding confirmed. Existing informational Google Sans fallback warning remains.

## Legal documents and landing-page copy alignment — 2026-10-26

Formatting, lint, typecheck, all 37 unit tests, production build and all 17 browser tests passed (53.7s). The new legal-document test checks both routes at 390/1440px, document titles/current tabs, preserved material disclosures, all contents targets, native mobile contents expansion, anchor navigation, related-document switching, no overflow and zero axe violations. Visually inspected both documents on desktop/phone. Existing prototype notice and recent landing/footer edits remain intact. Existing informational Google Sans fallback-metrics warning remains.

## Fleet detail showcase — 2026-10-26

Formatting, lint, typecheck, all 37 unit tests, production build and all 18 browser tests passed (57.2s). Added coverage for the new /armada/show route, all five model switches, exterior/interior selection with aria-pressed, decoded model-specific cabin images, absence of modal dialogs, four related vehicle links, selected-fleet reservation prefill, official model-specific WhatsApp URL and safe fallback for unknown query values. The new page also passes axe/overflow checks at 360/768/1440px; existing five-width home and two-width legal checks remain green.

Inspected full desktop/phone pages, selected-interior phone state and tablet hero after fonts/images loaded. Confirmed no overlapping controls or cropped vehicle cutouts and preserved real quote/contact destinations. The five cabin images are visibly marked as concepts rather than verified actual units. Existing informational Google Sans fallback-metrics warning remains.

## Compact product detail revision — 2026-10-27

Lint, typecheck, formatting, 37 unit tests, production build and all 18 browser tests passed (58.9s). Extended the showcase test to verify three reference metrics, three concise model-specific feature rows, eight specification rows, manufacturer source domains and specification-anchor navigation for every model. The native reference disclosure resets when switching vehicles and opens to a usable source link. Existing gallery, related-vehicle, WhatsApp, reservation-prefill, SEO and accessibility coverage passes.

Visually inspected final desktop, phone and tablet layouts. An additional browser check confirmed no horizontal overflow for all five models at 360/768/1440px. Compared with the initial verbose draft, the desktop page is substantially shorter and combines interior/specifications in one board. Tests fulfill only the external Google Maps iframe with a blank document to prevent remote load delays from affecting unrelated route/form assertions; the real application embed remains intact. Existing Google Sans fallback-metrics build warning remains informational.

## Mobile-first footer — 2026-10-27

Lint, typecheck, formatting, 37 unit tests, production build and all 19 browser tests passed (59.8s). The new footer test checks contact/navigation/legal/location target sizes and bounds at 320/390/768/1440px, collapsed map visibility, keyboard map expansion/collapse and official WhatsApp/telephone destinations. Existing whole-page axe audits pass after aligning the location link's accessible name with its visible text. Visually inspected phone and desktop screenshots and verified no horizontal overflow at all four widths. Existing Google Sans fallback-metrics build warning remains informational.

## Landing-page motion — 2026-10-27

Formatting, lint, typecheck, 37 unit tests, production build and all 20 browser tests passed (1.0m). Added browser coverage for a real card reveal animation, its completed opacity and one-time behavior, manual ticker pause/resume, reduced-motion CSS, cancellation/no replay of reveals, and the static ticker's 360px bounds. Existing responsive/axe checks, links, forms and keyboard flows remain green. Inspected phone screenshots with the moving strip and with reduced motion enabled. Existing Google Sans fallback-metrics build warning remains informational.

## Quote scope, mobile form, disclosure and compression — 2026-10-27

Lint, typecheck, formatting, all 37 unit tests, production build and all 21 browser tests passed (1.1m). The new test verifies six quote-scope topics and non-inclusion language on a vehicle page, matching terms/FAQ content, destination-image lazy loading and full-width pickup/destination controls at 360/390px. Prototype coverage checks optional detail expansion/collapse, refresh behavior, absence of persistent storage and collapsed phone height below 280px. All seven FAQ questions are exercised, and the existing responsive/axe suite remains green. Native image decoding/transparency checks pass for the compressed raster set, including 25 images with alpha.

Visually inspected collapsed/expanded phone notices, full-width mobile form, quote checklist and the final AVIF hero. Measured collapsed notice height at about 225px on a 390px viewport. Both asset scripts were run successfully, including a repeat run that recognizes unchanged compressed assets rather than re-encoding them lossy.

Production initial-load simulation used Chromium at 390×844, DPR 2, CPU slowdown 4×, download 1.6 Mbps, latency 150ms and a cold browser cache in three isolated contexts. Final runs recorded LCP 2020/2216/2132ms (median 2132ms), CLS 0 in each, and one 73,022-byte mobile AVIF hero request. These are local laboratory initial-load measurements, not physical-device, INP, production field or end-to-end scrolling results. Details are saved in `artifacts/mobile-throttled-performance-final.json`. Existing Google Sans fallback-metrics build warning remains informational.

## Integrated travel planner — 2026-10-27

Formatting, lint, typecheck, production build, 73 unit tests and all 29 browser tests passed (1.1m). Unit coverage adds chronological finish-time validation, overnight transitions, elapsed time, grouped totals/limits, bounded stops, trusted Maps URLs, Maps-only pickup, active-service serialization, clean hidden fields, recommendation quantities and explicit concept configuration status. The WhatsApp contract test now covers the extended request format and preserves encoding/normalization checks.

Eight additional browser tests exercise the hero-to-form advisor handoff, existing-form value preservation and current-value initialization, all five cabin diagrams, grouped requests, corporate/rail/tour field switching, end-time error recovery, actual stop reordering in the generated message, native GPS preview/confirmation/cancel, mocked permission-denied/timeout fallbacks, and managed focus after removal. WhatsApp navigation is intercepted before sending; no live message is submitted. Test GPS coordinates are synthetic, with no access to a user's physical location. Checks still show no PII persistence or form mutation requests to a backend.

Expanded planner states pass axe and overflow checks at 360/768/1440px; the advisor results pass axe at 390px. Existing page, menu, legal, footer, conversion, font, prototype-notice, motion and five-width landing checks remain green. Visually inspected mobile/desktop advisor results, a mobile cabin guide and a populated multi-group/service/stop form. The cabin's front label was moved clear of its windshield line, and selects retain reserved arrow space. Existing informational Google Sans fallback-metrics warning remains.

## Open cabin layout and first repository release — 2026-10-27

The redesigned cabin guide is always visible on all five vehicle detail pages. Browser checks verify one driver, the concept passenger-seat count, no disclosure controls, and no overflow at 360/768/1440px. Desktop Premio panels have matching 726px heights; tablet Elf panels have matching 753px heights. Desktop, tablet and phone screenshots were inspected locally. Seat layouts and bag counts remain explicitly conceptual.

Final validation passed: ESLint, TypeScript, Prettier, 73 unit tests, production build, all 29 Playwright tests (1.1m), and npm audit (0 vulnerabilities). Next.js still emits an informational Google Sans fallback-metrics warning; the production build succeeds. No actual WhatsApp messages are sent by tests.

Node.js is pinned to 24.x for Vercel, with framework/install/build settings and a deployment guide. The prototype remains noindex by default. Local environment files, dependency/build caches, raw screenshots, performance reports and asset backups are excluded from the initial Git upload. A staged-file scan found no private keys or common GitHub/AWS/live-secret patterns and no individual file above 10MB. These local checks do not claim a Vercel deployment has been performed.
