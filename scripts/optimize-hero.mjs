import fs from "node:fs/promises";
import sharp from "sharp";
import { createHash } from "node:crypto";

const variants = [
  { source: "mobile", suffix: "mobile", width: 800, quality: 50 },
  { source: "desktop", suffix: "desktop-small", width: 1280, quality: 54 },
  { source: "desktop", suffix: "desktop", width: 1920, quality: 54 },
];
const results = [];
let manifest = [];
try {
  manifest = JSON.parse(
    await fs.readFile("artifacts/asset-compression.json", "utf8"),
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
for (const { source, suffix, width, quality } of variants) {
  const relative = `public/images/hero/gedung-sate-branded-${source}.webp`;
  const current = await fs.readFile(relative);
  const entry = manifest.find((item) => item.path === relative);
  let original = current;
  try {
    if (entry?.sha256 === createHash("sha256").update(current).digest("hex"))
      original = await fs.readFile(entry.backup);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const output = `public/images/hero/gedung-sate-branded-${suffix}.avif`;
  const encoded = await sharp(original)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality, effort: 6, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await fs.writeFile(output, encoded);
  results.push({
    path: output,
    width,
    bytes: encoded.length,
    sourceBytes: original.length,
  });
}
await fs.writeFile(
  "artifacts/hero-compression.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
