# Temporary visual asset manifest

Built-in image generation was used. No third-party vehicle photographs were downloaded. Every generated vehicle is illustrative and must not be interpreted as a vehicle BDG TRANS owns. Original generated PNGs remain in the Codex generated-images directory; optimized deliverables live in public/ and have no runtime dependency on it.

Common fleet prompt: “Use case: photorealistic-natural. Automotive catalog photograph of [vehicle], front three-quarter view, parked on a scenic asphalt turnout near Bandung tea plantations. Full vehicle visible, consistent soft morning light, natural green hills and muted sky, premium realistic commercial photography. Landscape 4:3. No people, no text, no watermark, no readable plates, no company branding. Concept illustration only.”

| Local asset | Subject |
| --- | --- |
| images/fleet/hiace-commuter.webp | White Toyota Hiace Commuter, classic cab-over flat front model |
| images/fleet/hiace-premio.webp | Pearl white Toyota Hiace Premio long nose premium minibus |
| images/fleet/elf-tayo.webp | White Isuzu Elf Tayo Indonesian tourist minibus, small bus body |
| images/fleet/innova-reborn.webp | Silver Toyota Innova Reborn MPV |
| images/fleet/avanza.webp | White Toyota Avanza MPV |

Hero prompt: “Use case: photorealistic-natural. Create a premium commercial automotive landscape photograph, wide 16:9. A pearl white Toyota Hiace Premio minibus on the RIGHT half, front three quarter angle on a paved mountain road amid lush tea plantations near Bandung West Java, misty mountains and soft early morning sunlight. Left half mostly lush scenic negative space for website headline overlay. Natural realistic photography, sophisticated travel editorial, crisp vehicle detailing. No text, no logos, no readable license plate, no watermark, no business branding. This is an illustrative concept vehicle, not a documentary photograph.” Saved as images/hero/hero-bdg-trans.webp.

Service prompt template: “Use case photorealistic-natural. Premium travel editorial photograph: [scene]. Natural morning lighting, lush green and neutral tones, realistic Indonesian setting. Landscape 4:3, no readable plates or lettering, no logos, no watermarks. Illustration for a travel website.”

| Asset | Scene |
| --- | --- |
| images/services/wisata.webp | Scenic winding asphalt road through rolling tea plantations in Bandung, misty mountains, no vehicles |
| images/services/dinas.webp | Silver Indonesian MPV parked outside a modern office building, understated business travel, no people |
| images/services/bandara.webp | White MPV near a modern airport departures terminal, suitcases beside vehicle, no signage text, no people |
| images/services/keluarga.webp | White MPV beside a green garden in Bandung, small family distantly from behind, natural candid travel atmosphere |

Gallery reuses scenery, vehicle and family assets; four physical WebP derivatives are saved in images/gallery/. The OG composition uses the hero, a navy readability overlay, typography and an illustration disclosure, saved as og/og-bdg-trans.png at 1200×630.

Generated vehicle/travel assets are temporary. Replacement requires actual authorized photographs. Vehicle model, layout and operational details must be confirmed by the business before any photo is described as actual fleet documentation.

User-supplied logo: `public/images/icon/logo.jpg`. Replaces the typographic placeholder in the header, footer, mobile menu, icon/favicon and OG composition. The source image is unchanged. Its lettering appears to read ODG TRANS; it is used at the user's explicit request while site copy remains BDG TRANS. Image layout crops background margins without changing the mark. Vehicle/travel photographs remain generated illustrations.

Final logo correction: no generated redesign is used in the website. `public/brand/logo-white.svg` and `logo-navy.svg` embed the original `public/images/icon/logo.jpg` and derive transparent white/navy variants through an SVG alpha/color filter. The viewBox removes empty background margins; object-contain preserves the original silhouette and lettering proportions. The original source file is unchanged. Discarded generation attempts remain outside this project and are not referenced by the application.

## Branded Gedung Sate hero

At the user's explicit request, the hero now uses AI concept visuals of the white Hiace in front of Gedung Sate with the supplied original company logo as a navy side-body decal. These images do not establish actual vehicle ownership or an actual decal installation. Existing source photographs and logo files are unchanged.

Final local assets (built-in image generation, optimized as local WebP):
- `public/images/hero/gedung-sate-branded-desktop.webp`: panoramic 3:1 scene.
- `public/images/hero/gedung-sate-branded-mobile.webp`: portrait 4:5 composition.

Prompt set: First edit the Gedung Sate concept reference to zoom out, preserve the white Hiace Premio, show roof/mirrors/bumpers/all wheels, add the supplied original logo as a navy decal below the passenger-side windows with correct panel perspective and no background rectangle, keep the central Gedung Sate roof/finial visible, preserve natural morning photographic lighting and leave empty space at left. Then derive two framing variants from that branded reference: an ultra-wide 3:1 panorama with outpainted left landscaping/road and full vehicle on the right, and a 4:5 portrait with the full vehicle across the lower middle, complete tower above and safe margins around all wheels/body. Preserve the exact supplied logo mark/lettering and add no other text, watermarks or vehicles.

The `<picture>` source selects the dedicated mobile asset below 640px; the desktop fallback uses Next Image optimization and eager/high-priority loading. Cropping is centered vertically with an 85% horizontal anchor on desktop, centered on the portrait mobile source. The older unbranded Gedung Sate image and original mountain hero remain in the repository as previous assets, not as the active hero.

## About-section two-vehicle cutout

Generated with the built-in image tool using the supplied original company logo as reference. Final project assets: `public/images/about/hiace-premio-elf.webp` (optimized website image) and `public/images/about/hiace-premio-elf.png` (transparent downloadable source derivative). Both preserve alpha and natural proportions; preparation only trims empty transparent margins and resizes, without redesigning the logo.

Prompt: a photorealistic transparent-background composition of exactly two passenger transport vehicles, complete with wheels/roofs/mirrors/bumpers. Glossy black Toyota Hiace Premio in the front-left with the original logo as a white vinyl side decal; silver/light gray Isuzu Elf Tayo slightly behind-right with the same logo in navy. Coordinated perspective/scale and natural contact shadows, crisp commercial automotive lighting, generous frame margins, no environment, no additional text/labels/watermarks/statistics/people/readable plates. Keep the supplied wing/arrow logo and lettering, not a newly invented symbol. This is a concept illustration, not actual fleet documentation.

The section adds its navy curved accent in CSS, keeping the vehicle bitmap reusable with a clear background. A short visible “Ilustrasi kendaraan” caption and factual alt text identify the image honestly.

## Fleet catalog cutouts

The user explicitly requested all five fleet visuals be regenerated facing LEFT with the supplied original company-logo decal, varied paint colors and transparent backgrounds. Built-in image generation was used with the original `public/images/icon/logo.jpg` as the logo-artwork reference. New final local assets are `public/images/fleet/cutouts/{slug}.webp`; previous scenic fleet assets are preserved.

| Slug | Concept paint | Logo decal |
| --- | --- | --- |
| hiace-commuter | Pearl white | Navy |
| hiace-premio | Gloss black | White |
| elf-tayo | Silver/champagne | Navy |
| innova-reborn | Dark graphite | White |
| avanza | Deep burgundy red | White |

Shared prompt: single photorealistic automotive catalog cutout of the named vehicle/model and specified paint; front bumper toward lower-left and rear toward upper-right, full roof/mirrors/wheels/bumpers inside frame, visible passenger-side body. Apply the exact supplied original wing/arrow logo/lettering as a naturally sized single-color side decal following perspective, without a rectangular background or redesigned symbol. Truly transparent background and natural tire contact shadows; consistent daylight studio lighting and realistic paint reflections; 4:3 landscape centered composition. No scenery, people, extra vehicles, watermark, title, contact details, badges, readable plates or other embedded labels. This is an illustrative fleet concept, not actual unit documentation.

Preparation trims transparent margins, resizes to <=1000px width and encodes WebP with alpha at quality 90. The live catalog renders object-contain over its HTML/CSS navy stage; static vehicle detail pages also use contain fitting to preserve the full vehicle. Displayed colors/decals are conceptual and do not confirm specific unit colors or availability.

## Floating WhatsApp icon

The small WhatsApp SVG is from Bootstrap Icons (MIT): https://github.com/twbs/icons/blob/main/icons/whatsapp.svg. Local asset: public/icons/whatsapp.svg; retained license: public/icons/LICENSE-bootstrap-icons.txt. The UI renders the original icon in white on a dark WhatsApp-green circular button; no image generation was used for this existing brand vector.

## Reservation portrait in blue work shirt

The user supplied the source portrait and requested a clothing edit for the quote section. Built-in image generation edited that portrait using the original `public/images/icon/logo.jpg` as the logo reference. The local website derivative is `public/images/reservation/blue-work-shirt.webp`, with transparency preserved, empty margins trimmed and width optimized to 850px at WebP quality 90. The supplied portrait and generated original remain unchanged at their original locations.

Prompt: preserve the same adult woman's face, hairstyle, expression, skin tone, hands, body proportions and pose. Replace the gray blazer/white blouse with a medium corporate-blue, collared, long-sleeved button-up work shirt with chest pockets and small white embroidery of the supplied original company mark on the left chest. Retain black trousers. True transparent background, full head and hands visible, natural studio lighting, no name tag, invented logo, props or additional people. This edited portrait is a visual accompanying the form and does not establish that the pictured person is a BDG TRANS employee.

## Reservation portrait with Bandung environment

Replaced the visible cutout and flat CSS backdrop at the user's request with `public/images/reservation/bandung-portrait.webp`. The previous transparent portrait is preserved. Built-in image generation edited that existing portrait, preserving its subject, blue uniform and supplied logo while adding a photographic Bandung setting: softly defocused Gedung Sate, a white Hiace, trees and natural late-afternoon lighting. Prompt constraints: coherent light/shadows, full head and both hands in frame, portrait 4:5, no flat shapes, extra people, invented office signage, text overlays or redesigned logos. Optimized to 1000px wide WebP quality 88. This remains a concept visual, not evidence of an employee or company premises.

## Soft editorial gallery series

Generated four new concept visuals with the built-in image-generation tool, keeping the earlier gallery assets untouched. Final local WebP files (1400px wide, quality 88):

- `public/images/gallery/lembang-soft.webp`: white Hiace at a tea-plantation overlook.
- `public/images/gallery/elf-bandung-soft.webp`: silver Elf on a leafy Bandung boulevard.
- `public/images/gallery/innova-soft.webp`: graphite Innova in a modest garden cafe courtyard.
- `public/images/gallery/ciwidey-soft.webp`: winding road through misty tea plantations.

Shared prompt: a single natural editorial travel photograph with ordinary environmental imperfections, soft diffuse cloudy daylight, muted greens/warm grays, low contrast, realistic camera exposure, subtle fine grain and believable vehicle proportions/reflections. Landscape 4:3, complete vehicle body/wheels when present, no people, invented company premises, logos, readable plates, watermarks or text. Avoid HDR, dramatic sunbeams, saturated teal/orange grading, glossy render surfaces, studio cutouts and idealized fantasy scenery. Each prompt specified its corresponding scene above. These images are concepts, not records of actual customers, trips, vehicle ownership or institutional work. A short visible gallery disclosure and accessible lightbox disclosure remain.

## Fictional Indonesian preview avatars

Built-in image generation created three distinct fictional adult Indonesian profiles for the explicitly marked development-only testimonial preview. Final optimized assets: `public/images/testimonials/{dina,rizky,anisa}-preview.webp`. These are synthetic mockup portraits, not photographs of actual customers. They are excluded from production testimonial rendering with the rest of the dummy records.

Prompt set: square everyday smartphone head-and-shoulder portraits, genuine-looking skin texture and natural asymmetry, soft real-world lighting, muted colors, no beauty retouching, studio backgrounds, glamour posing, company logos, watermark or text. Dina: about 35, tied-back black hair, cream blouse, Bandung home veranda with potted plants. Rizky: about 32, short slightly untidy black hair and light stubble, pale-blue office shirt, shaded office-sidewalk setting. Anisa: about 27, sage hijab and beige top, relaxed three-quarter smile in a leafy West Java public garden. Keep faces distinct and framed for small circular avatars. WebP derivatives are resized to 320px for local Next Image optimization; generated originals are preserved.

## Institutional logo marquee preview

Fifteen real institution/company/university marks were fetched from their official websites or official institutional hosts and optimized into `public/brand/partners/{id}.webp`. No logos were generated or redrawn. Asset URLs and retrieval outcomes are recorded in `public/brand/partners/sources.json`. Most marks come directly from their own domains; OJK's mark comes from the official Bank BJB website's regulator-logo asset. Disdik uses its official 180px touch icon, Dispora uses its official city-emblem touch icon, and UNPAR uses its published full-color mark.

The preview includes Kementerian Keuangan, Disdik Jawa Barat, Telkom Indonesia, Dispora Bandung, Pertamina, KAI, Pos Indonesia, Bank Mandiri, OJK, ITB, BPS, Telkomsel, Telkom University, UNPAR and Polban. These are design examples and do not establish any commercial relationship. They remain excluded from production until verified and approved. Contain fitting preserves proportions and original color; local images avoid runtime dependence on external logo URLs.

## Five destination visuals for the navy banner

Created with the built-in image-generation tool and saved as 800px-wide quality-88 WebP assets in `public/images/destinations/`: `gedung-sate.webp`, `kawah-putih.webp`, `tangkuban-perahu.webp`, `situ-patenggang.webp`, and `orchid-forest.webp`. Generated originals remain preserved in the image-generation output directory.

Prompt set: single landscape 4:3 editorial travel-style concept image of the named Bandung-area destination, with recognizable architectural/landscape features, soft diffused cloudy daylight, muted natural colors, restrained contrast, ordinary eye-level viewpoint, realistic surfaces and fine organic detail. Gedung Sate: central facade and characteristic tiered roof/finial across a garden. Kawah Putih: pale turquoise crater lake, white shore and forested rim. Tangkuban Perahu: broad volcanic crater with a small sulfur-steam plume and modest rim fence. Situ Patenggang: quiet lake with forested island, tea hills and a simple jetty. Cikole: elevated wooden footbridge among tall pine trees and ferns. No people, vehicles, text, logos, borders, HDR glow or fantasy lighting. These are destination concepts, not records of actual BDG TRANS trips.

## Fleet detail cabin concepts

Created five additional interior concepts using the built-in image-generation tool. Optimized final assets are `public/images/fleet/interiors/{hiace-commuter,hiace-premio,elf-tayo,innova-reborn,avanza}.webp` at 1400px width and WebP quality 88; generated originals are preserved.

Shared prompt: a single photorealistic passenger-cabin concept for the named vehicle, photographed from the front looking toward the rear, moderately wide natural perspective with straight believable seat/cabin geometry. Use ordinary gray fabric seating and restrained stock-style gray/beige trim, empty seats, soft overcast daylight, defocused Bandung greenery, realistic fabric texture and small natural imperfections. Minibuses show regular passenger rows and an aisle; MPVs show ordinary second/third-row benches. No people, luggage, company logos, readable text, numeric capacities, screens, oversized luxury captain chairs, starlight ceiling, neon lighting or CGI gloss. Landscape 3:2. These images illustrate possible interiors, not verified units or guaranteed facilities. Both the image viewer and cabin section identify them as illustrations and require admin confirmation of configuration/facilities.

## Compression pass — 2026-10-27

Assessed 66 existing local raster/SVG assets, including the app icon. Retained only encodings smaller than the existing files: 64 became smaller, reducing the original set from 11,096,859 to 8,302,689 bytes (25.2%). WebP preserves full-quality alpha; all 25 alpha-bearing raster images still decode with transparency. PNG optimization is lossless, SVG cleanup preserves embedded original-logo data, and the tiny ICO remains unchanged. Originals are backed up under ignored `artifacts/asset-originals/`; per-file sizes/hashes are in `artifacts/asset-compression.json`. Scripts recognize unchanged optimized files and preserve separate backups for newly replaced sources.

Added AVIF hero derivatives: mobile 800px / quality 50 / 73,022 bytes versus original mobile WebP 277,168 bytes; desktop 1280px / 88,004 bytes and 1920px / 155,836 bytes versus original desktop WebP 489,338 bytes. These are additional responsive formats, so the 25.2% original-set reduction does not claim to include these new files. Existing WebP fallbacks remain. Run `npm run optimize:assets` to repeat the safe compression/hero-generation workflow.
