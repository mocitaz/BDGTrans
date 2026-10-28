# Design direction from PRD
ENERGY 2 / RHYTHM 2 / MOTION 1.
- Navy #013274 and white follow the provided brand palette and distinguish primary actions.
- Plus Jakarta Sans headings give the Indonesian travel brand a clear typographic voice; Inter supports dense form labels.
- The full landscape hero puts travel imagery first; its directional navy overlay maintains readable HTML text.
- Split editorial sections alternate with fleet grids so visitors can scan choices without a uniform wall of cards.
- 104px desktop section spacing separates tasks; mobile reduces spacing to 72px.
- Vehicle cards group one image, vehicle description and two relevant next actions.
- Lucide vehicle, location and chat icons clarify fleet choice, trip details and WhatsApp communication as required by the PRD.
- Thin horizontal rules recall an itinerary and connect section labels and booking steps.
- Small uppercase section labels establish hierarchy in the exact copy specified by the PRD.
- Hover motion is limited to 4px on fleet cards and subtle image scaling; reduced motion disables transitions.
- Only the white form and fleet cards use restrained elevation; photography carries the visual emphasis.
- Temporary generated images are labeled as illustrations and never presented as actual fleet documentation.

## Hero revision from supplied reference
- A rounded light panel and landscape vehicle on the right follow the user's new reference while retaining the navy brand accent.
- One short headline and a single supporting sentence reduce text density as requested.
- A white horizontal quick form overlays the image on desktop; mobile stacks three labeled fields for usable tap targets.
- The white directional fade protects contrast behind the heading without covering the vehicle on the right.
- Quick-form vehicle/date/passenger fields continue into the full reservation form through validated non-PII query values; consent and WhatsApp review remain in the final form.

## Latest header and hero direction
- Use the original logo silhouette exactly; derive only white/navy colors and transparent background, with object-contain to avoid stretching.
- A transparent 72px header overlays the photograph; after 24px scroll it becomes a solid white 64px bar with navy logo/navigation for contrast over page content.
- Full-bleed photography and a directional navy overlay replace the white fade, per the user's correction.
- Reduce the desktop hero heading to 48px and widen the supporting sentence to 720px, creating one aligned desktop line while allowing mobile wrapping.

## Hero visual fitting
- The desktop hero uses a flexible column layout with the quick form anchored at the bottom so the main vehicle body is visible above it.
- Form edges align with the same 1200px content guide as the headline; the background image is bottom-aligned to preserve the vehicle composition.
- The visible illustration notice is removed from the hero at the user's explicit request. Other disclosures and factual image alt text remain.

## Approved compact hero composition
- Desktop image area is 78svh (bounded to 600–740px) so the opening benefits remain visible without a full extra scroll.
- Reduce the navy overlay toward the vehicle while retaining a darker reading area and header contrast on the left/top.
- Position the quick form across the image/white-section boundary; reserve matching space before benefits so controls and content do not overlap.
- On mobile, place the same form in normal document flow with a small negative margin, avoiding an oversized absolute-positioned card.
- Loosen headline tracking from -0.055em to -0.025em for readable letter spacing without enlarging the text.

## About section reconcept
- Follow the user's reference with vehicles on the left and editorial copy/actions on the right, using a clean white background.
- Pair a black Hiace Premio/white original decal with a silver Elf/navy decal so both vehicle types and branding are readable.
- The curved navy accent supports the vehicle silhouette and repeats the transport brand color without embedding promotional text in the image.
- Use the headline “Kendaraan yang pas untuk pergi bersama.” and concise Indonesian copy explaining trip types, vehicle choice and contact.
- Primary “Pilih Armada” opens the actual fleet anchor; secondary “Tanya Admin” opens the official WhatsApp destination.
- Replace the reference's unsupported numeric statistics with factual vehicle categories and WhatsApp discussion information.
- Mobile stacks the visual and copy with two usable CTA targets; disclosure is shortened to “Ilustrasi kendaraan”.

## Site-wide Google/Apple-inspired typography
- Use Google Sans variable as the single live UI font, self-hosted by Next Font, with native Apple/system UI fallbacks.
- Headings, labels, buttons and navigation use medium 500 weight rather than the former heavy heading/CTA weights; body remains regular.
- Apply the shared font to the root html element so document content, controls and Radix portal dialogs resolve the same family.
- Relax headline tracking and reduce uppercase label tracking for a quieter, clearer reading rhythm.
- Increase small body copy, form labels and navigation slightly while retaining compact tap targets and the existing content hierarchy.
- Typography changes apply to live text across public routes; supplied logo artwork and vehicle decals retain their original identity.

## Fleet reference redesign
- Follow the supplied reference's card hierarchy: brand heading, left-facing cutout overlapping a navy contact band, slim trip-type strip, centered vehicle title/description and two compact rounded actions.
- Keep precisely five fleet models, centering the last two cards on desktop; use two columns on tablet and one on mobile.
- Use a short centered “Pilihan Armada” heading and one supporting sentence, with no eyebrow rule.
- Retain original logo decals on each varied-color vehicle concept and show the actual known WhatsApp contact in the navy band.
- Use known trip categories (Wisata/Dinas/Keluarga) instead of copying unverified daily/weekly/monthly rental-package claims from the reference.
- Preserve fleet prefill and detail navigation with the real quote/detail buttons; no fabricated pricing, capacities or extra model.
- A short section-level illustration/detail note replaces repetitive individual photo captions, and the footer note uses AA contrast on the muted background.

## WhatsApp floating contact
- Use the recognizable WhatsApp mark and a dark service-green button for a direct admin-contact action, distinct from navy quote CTAs.
- Keep the link fixed bottom-right across routes, with a keyboard label, focus state and 52–56px target.
- On mobile, reserve a right-hand slot beside the fixed quote button so the WhatsApp control stays at the corner without covering quote/form actions.
- Retain extra desktop footer clearance so the floating contact does not obscure legal links.

## Compact reservation redesign

- Use a two-column composition with concise introduction and edited blue-uniform portrait beside a compact white form. On phones the introduction and portrait share a small row above the form.
- Replace the long introduction and three instruction paragraphs with “Atur perjalanan Anda.” and one short sentence. Use a plain eyebrow without a decorative dash.
- Group all existing fields into contact, trip timing and route details, with visible optional notes. Maintain labels, error descriptions, date constraints, WIB, capacity confirmation and explicit unchecked WhatsApp consent.
- Keep the review step, edit action, all data validation and the original WhatsApp message builder. Condense the reservation disclaimer instead of removing its material terms.
- Use 44px controls, a full-width review action and 16px mobile input text. Preserve original portrait proportions and place its transparent cutout over a restrained navy accent.

## Reservation portrait environment refinement

The photo now fills its frame with a natural Bandung setting instead of a transparent person over a navy CSS circle. The contact action sits within the lower photo area as a white button; the desktop photograph is taller and the mobile photograph uses its full 4:5 composition to preserve headroom and hands. The existing form grouping and reservation logic remain unchanged.

## Reservation transparent portrait correction

The user requested clear transparency instead of a photographic backdrop. Restored the existing blue-uniform alpha WebP, removed the portrait container's background, rounded crop and gradient decoration, and used contain fitting. The photographic variant is retained as an unused asset. Formatting, lint and typecheck passed; image metadata confirms alpha transparency and browser inspection confirms no container background or pseudo-element decoration.

## Services without photography

Replaced the four photographic service blocks with compact linked icon cards at the user's request. A short heading (“Untuk setiap rencana.”), one sentence per service and navy raised icon tiles keep the section aligned with the existing visual identity. Each full card prefills the existing trip-type field; hover and keyboard focus share the same icon/arrow feedback, with global reduced-motion rules retained. Four desktop columns become two phone/tablet columns. Removed service image fields from content/types and removed the now-inapplicable illustration disclosure; previous image assets remain unused rather than being deleted.

## Services editorial refinement

Replaced the previous rounded service cards and tilted raised icon tiles with an open, ruled layout. The section introduction sits at left on desktop; four service links form a balanced two-by-two list at right. Each link aligns a plain navy line icon, title, short description and discreet directional arrow. Mobile uses a single readable list with generous full-row tap targets. One direct admin link replaces the repeated contact labels. No imagery, decorative shadows, rotating tiles or continual animation.

## Gallery, customer stories and institutional trust

Organized this part of the page as related editorial sections with the same muted surface, typography and fine rules. The gallery uses four equal image frames, short captions outside the images and accessible enlarge dialogs. Stories use two open quote columns; institution names appear as a typographic row. A simple admin-contact footer closes the sequence.

The user requested dummy examples for Kementerian Keuangan, Disdik Jawa Barat, Telkom Indonesia and Dispora Bandung. These names and two sample quotes live separately in `community-preview.ts` with verified/permission flags false. They render only in development when no verified data exists, with explicit visible dummy labels. Production renders only verified, publication-approved entries from the real testimonials/partners arrays. No institution logos, customer portraits, ratings or named individuals were invented.

## Testimonial reference composition

Applied the supplied reference's centered heading, three equal quote columns, thin dividing rules, restrained inline emphasis and aligned profile footers. Mobile stacks the quotes into readable rows. Local dummy profiles use abbreviated example names, travel context and initials instead of invented customer photographs. The section explicitly labels names/quotes as preview examples and remains development-only until verified approved testimonials are supplied. Optional context/highlight fields support future genuine content without rewriting actual quotes.

## Running institutional logos

Replaced the plain four-name row with a centered heading and a continuous horizontal sequence of fifteen real logos and short names. A duplicated visual group makes the loop continuous while remaining hidden from assistive technology. The user can pause/resume explicitly; hover and keyboard focus also pause the sequence. Reduced-motion users receive a static responsive grid with the duplicate and animation control hidden. The entire preview retains its explicit dummy disclosure and development-only gate.

## Compact static gallery

At the user's request, gallery photos are now semantic figures without clickable stories or lightbox dialogs. Removed client-only dialog code, arrow affordances and hover zoom. Tightened the section header, photo gutters, captions and vertical spacing. Integrated the admin-contact action directly into the gallery footer instead of rendering a separate spaced community footer. Desktop keeps four images in a row; phones use a compact two-by-two grid. Testimonial/institution components and their data remain saved but are not mounted on the home page.

## Navy travel banner

Replaced the text-heavy three-step benefits block with a compact navy composition inspired by the supplied transport banner reference. A short Bandung/Lembang/Ciwidey location line, two-line headline, brief vehicle-category note and one real reservation-anchor CTA sit beside overlapping existing Innova/Hiace cutouts. Their proportions remain unchanged, with restrained floor lighting to separate wheels from navy. The composition stacks on phones. No invented price badge, social link or unsupported business statistic was copied from the reference.

## Uncaptioned destination strip

Replaced the Bandung/Lembang/Ciwidey text line with five photographic destination-concept thumbnails above the existing navy banner. Desktop presents five equal 4:3 images; phones retain a single native horizontal strip with keyboard focus, scroll snapping and visible peek at subsequent images. Place names remain in descriptive alt text only; there are no visible captions, modal triggers or extra CTA buttons.

## Compact navy footer

Reduced desktop footer spacing and aligned three restrained columns: original white brand mark with short vehicle summary, compact navigation and direct admin contact. Replaced verbose contact headings/disclaimer repetition with labeled WhatsApp details and a phone link. Copyright/legal links share a thin ruled bottom row. Phones use a stacked brand, one wrapping navigation row and adjacent contact actions with 44px targets; bottom clearance remains for fixed mobile controls.

## Prototype disclosure notice

Added a compact white notification below the top-right header area on every fresh document visit, including refreshes and direct visits to inner routes. It identifies the site as a design-presentation prototype, states that it is not official or owned by BDG TRANS, explains that sample identities/content do not establish partnerships or offers, and respects brand ownership. The notification has explicit acknowledgement and close actions, no timer, no focus trap and no persistent storage. Internal client-side navigation retains the dismissed state until a fresh document load. Its entrance animation is disabled for reduced-motion users.

## Compact FAQ refinement

Replaced the long FAQ heading/intro with “Yang perlu Anda tahu.” and a short supporting line. The plain eyebrow has no decorative rule. Six shorter questions share one restrained outlined panel with consistent row spacing and small plus/close indicators. Preserved the existing Radix single-open behavior, keyboard support, linked answer descriptions and all business caveats in the answers. Desktop uses an aligned introduction/list split; phones stack with 48px section padding.

## Privacy and terms document redesign

Both legal-information routes now share a server-rendered document template: restrained muted hero, breadcrumb, active document switcher, sticky desktop contents and a native collapsible mobile contents list. Consistent section numbers, readable body measure, a short overview and a related-document link make the information easier to scan without adding fabricated effective dates or legal claims.

At the user's follow-up request, rewrote the prose in the landing page's current friendly “kamu/rencanamu” voice. Retained the material explanations about browser-only form processing, WhatsApp URL/browser history, manual sending, third-party handling, availability confirmation, prices, payment and cancellation discussions, illustrative vehicles and WIB. Privacy copy now acknowledges the Google Maps iframe recently added to the footer, rather than implying that embedded third-party content has no technical data processing. Existing concurrent landing-page/footer/prototype-notice changes were retained; formatting repairs did not replace their content.

## Fleet detail and /armada/show redesign

Created a shared detail template for all five canonical vehicle pages and the previously unavailable /armada/show route. The latter defaults to Hiace Premio and supports an armada query for model selection; invalid/array/unknown queries safely fall back to the default. Its canonical metadata points to the selected vehicle's existing detail URL, while invalid canonical slugs still return 404.

The new composition separates a large contained vehicle visual, an inline exterior/interior viewer, concise model copy, use cases and a quote panel. The lower section pairs a cabin illustration with practical planning topics; four related vehicles provide real navigation. There are no popup galleries, invented capacities, prices or facility guarantees. The selected model is preserved in the reservation CTA and in the official WhatsApp enquiry. Contained cutouts, deliberate whitespace, responsive grids and ordinary fabric-interior visuals keep the page aligned with the site's navy/Google Sans identity.

## Product detail refinement — 2026-10-27

After feedback that the first richer version was too verbose, reduced it to a vehicle-led product composition: large exterior/interior viewer, prominent model name, one short description, three reference metrics and immediate quote/contact actions. Removed the separate numbered advantages section, repeated introductory prose, use-case chips and standalone cabin section. A single lower board pairs the cabin visual and three short model-specific points with an eight-row specification list. Native details reveals the reference generation, source and unit-configuration caveat. No modal or invented fuel-economy figures were added. The navy accent marks actions/current model; backgrounds and borders group actual product content without decorative effects.

Commuter/Premio figures refer to Toyota's New Hiace 2022 announcement; Innova to its 2015 Reborn launch; Avanza to its 2021 All New launch. Elf uses Astra Isuzu's NLR B L Microbus RTU as a named chassis reference, not a verified identification of an Elf Tayo rental unit. These are manufacturer references, visibly labeled as such; actual unit year, seating, fuel variant and equipment still require admin confirmation. Source URLs are stored alongside each model in fleet-details.ts.

## Mobile-first footer — 2026-10-27

Replaced conflicting desktop-first footer overrides with one mobile-first rule set. Phones show an aligned logo/short description, wrapping navigation row, clear WhatsApp/phone actions, location link and compact legal area. Below 375px the contact actions stack to preserve their full labels. Tablets use two columns; wide screens use three aligned columns. Every navigation, contact and legal action has at least a 44px target. The original logo, phone and map destinations remain intact.

Moved the embedded map into a native keyboard-operable “Pratinjau peta” disclosure. The direct Google Maps link stays visible, while the collapsed map removes the previous empty-looking rectangle and saves vertical space on phones. The map is no longer an aria-hidden iframe nested inside a link. Bottom padding preserves room for floating mobile controls.

## Landing-page motion — 2026-10-27

Added restrained entry motion across the current landing sections: staggered hero copy, a small initial photo settle, vehicle-image entrances, short card reveals, destination fades, reservation introduction/portrait and footer reveal. Section motion uses IntersectionObserver and the native Web Animations API, runs once per mounted element and cleans up on navigation. Content is visible in its unenhanced server-rendered state; dynamic reservation content is discovered after mounting. Form fields remain stationary. Desktop image hover motion affects only images rather than their interactive targets. Direction remains navy/Google Sans with ENERGY 2 / RHYTHM 3 / MOTION 2; movement guides the reading sequence instead of adding ornaments or scroll hijacking.

A compact running-text strip between About and Fleet repeats actual vehicle/service categories. It has manual pause/resume plus hover/focus pause, and its duplicate content is hidden from assistive technology. Reduced-motion preferences disable hero/hover/scroll animations, immediately cancel active reveal animations, and replace the ticker with one static wrapping text group. No new animation library or always-floating decorative objects were introduced.

## Quote clarity, mobile fields, compact disclosure — 2026-10-27

Running text is no longer mounted at the user's request; the other landing animations remain. Added a shared quote-scope constant covering driver, fuel, toll/parking, usage duration/overtime, overnight driver needs and route agreement. The vehicle pages expose a compact native disclosure, FAQ contains a matching answer, and terms uses the same summary. These are questions for admin confirmation, not invented inclusions, rates or payment rules.

Phones now stack contact and route fields at full width. Pickup date/time and other short values retain compact paired columns. Shorter pickup/destination placeholders and two-line address controls preserve readable typing space. The prototype notice keeps two visible sentences, an optional native “Baca penjelasan” disclosure and a 44px acknowledgement/close target. It still appears after each fresh document load/refresh and stores no dismissal state. At 390px, the collapsed notice measures about 225px instead of the prior 346px; expanded content stays scrollable within the viewport.

Image optimization preserves source backups, transparent alpha and original SVG logo data. Native picture sources prefer AVIF hero variants, keeping WebP fallbacks; only the hero receives eager/high-priority treatment, while destination photos now load lazily and About uses layout-specific sizes. No business identity or photo composition was regenerated.

## Integrated travel planning — 2026-10-27

Implemented the seven selected product features as a single WhatsApp-only journey. A compact Radix advisor dialog is available in the hero and the form, recommending up to three models with a transparent explanation based on people/bags. The user explicitly approved concept configurations while actual unit data is unavailable. All suggestion/diagram surfaces identify these as prototype examples; no stock, verified rental capacities, prices or individual seat bookings are implied. Passenger counts exclude the driver in the concept diagram. Server-rendered SVG cabin guides depict front/rear rows, an aisle, side access and a luggage zone without adding bitmap assets or a diagram library.

Split planner inputs into typed reusable fields, fleet groups, context-specific service inputs, scheduling and route/location controls under React Hook Form. An additional group's passenger count refers to that whole group, while quantities specify units requested. Totals remain limited to 60 passengers and ten units per request. Additional service values survive UI switching in memory, but Zod's output removes inactive details before review/WhatsApp. Actual rental seating capacity is deliberately not enforced using prototype data.

Added finish time, journey direction, overnight request and elapsed-time preview. Full WIB chronology rejects same-day finish times at/before pickup and supports midnight crossing with the next date. Duration is explicitly separated from rental-day or pricing rules. Ordered intermediate stops use stable field-array keys, bounded counts, keyboard-friendly move/delete controls and managed focus. Google Maps links have a strict HTTPS/domain/path allowlist. Native GPS is an explicit, one-shot request with preview/confirmation, accuracy text, cancellation, permission/timeout fallbacks and stale-callback cleanup; it never overwrites a manual address automatically.

The advisor prevents portal form submission from bubbling into the main form and suppresses closing autofocus when handing off to reservation fields. It uses the current main-group values when reopened inside the form. Existing fleet/service links still prefill without resetting unrelated inputs. New styling is isolated in travel-planner.css using the existing navy, Google Sans and 44px targets. Privacy, terms, FAQ and message serialization were updated to reflect the actual data flow.

## Denah kabin terbuka — 2026-10-27

Denah dipindahkan menjadi section penuh setelah interior dan spesifikasi pada semua halaman detail armada. Panel gambar dan informasi sejajar pada desktop/tablet, lalu bertumpuk pada ponsel. Diagram SVG menampilkan kursi, sopir, akses samping, lorong, dan area bagasi; data ringkas serta ilustrasi koper berada di panel pendamping. Tab “Denah & bagasi” langsung menuju section. Tidak ada accordion, pemesanan kursi, atau interaksi yang menyiratkan ketersediaan unit aktual. Konfigurasi tetap diberi label contoh untuk prototipe.

## Footer compact dengan ikon kontak — 2026-10-27

Footer tetap navy, dengan identitas merek, navigasi, dan peta dalam tiga kolom pada desktop. Di ponsel, logo dan tiga ikon kontak sejajar sebelum navigasi dan peta. Instagram memakai akun yang diberikan pengguna: `sewahiacebandung.id_`. Telepon dan WhatsApp menjadi ikon berlabel aksesibel dengan target sentuh 44px. Sesuai revisi pengguna, judul lokasi, tautan alamat dan disclosure peta dihapus; iframe peta langsung terlihat dengan lazy loading.

## Kenapa BDG TRANS dan layanan terpadu — 2026-10-27

Satu section setelah Pilihan Armada menggantikan section layanan terpisah. Satu judul utama membawahi tiga foto bergaya editorial: kabin, pilihan kendaraan, dan persiapan bagasi. Desktop memakai satu foto utama dan dua pendamping; ponsel memakai foto utama lebar dengan dua pendamping berdampingan. Caption pendek tetap di bawah gambar agar foto bersih dan teks terbaca tanpa overlay.

Empat tautan layanan tampil sebagai satu baris di desktop dan dua kolom di HP, tanpa deskripsi berulang. Anchor `#layanan` tetap ada, dan parameter `jenis` tetap mengisi formulir. Seluruh gambar dimuat lazy, mendukung aturan anti-drag global, dan tidak menambah klaim kapasitas atau fasilitas. Aset dan prompt lengkap tercatat di `docs/why-bdg-assets.md`.

## Pilihan Armada: scroll vertikal ke horizontal di HP — 2026-10-28

Di layar sampai 639px, section menahan satu kartu di bawah header sementara scroll vertikal menggerakkan baris lima kendaraan ke samping. Pergerakan mengikuti posisi halaman melalui transform dengan listener pasif dan requestAnimationFrame, tanpa mencegat touch/wheel atau mengunci body. Setelah kartu terakhir, halaman berjalan normal ke section berikutnya. Counter dan tombol panah memberikan posisi serta akses alternatif; fokus keyboard pada tautan kartu membawa kartu tersebut ke layar.

Area klip memakai overflow:clip ketika pinned agar tidak membentuk scroll container bersarang yang menahan gestur vertikal. Tinggi section dihitung dari tinggi konten dan jarak geser, diperbarui saat ukuran layar/header berubah. Kartu dibuat lebih compact agar tombol tidak tertutup CTA bawah. Desktop tetap berupa grid; reduced motion memakai daftar normal; viewport pendek yang tidak cukup memuat seluruh kartu memakai rail horizontal biasa. Seluruh listener, observer dan animation frame dibersihkan saat unmount.

## Perapian posisi kartu mobile — 2026-10-28

Progress scroll kini menentukan kartu aktif, lalu track bertransisi singkat menuju posisi kartu yang utuh. Track tidak lagi berhenti pada offset parsial yang memotong teks/tombol. Saat animasi berlangsung kedua kartu bisa terlihat sementara, tetapi setelah selesai setiap kartu memiliki margin kiri/kanan yang sama. Rail horizontal pada viewport pendek memakai native scroll snap. Tinggi foto, padding isi dan ukuran intro diperbaiki; hover lift dinonaktifkan pada rail mobile agar sisi atas kartu tidak terpotong.
