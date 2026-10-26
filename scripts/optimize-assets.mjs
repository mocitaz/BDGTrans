import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { createHash } from "node:crypto";

const backupRoot = "artifacts/asset-originals";
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
let previous = [];
try {
  previous = JSON.parse(
    await fs.readFile("artifacts/asset-compression.json", "utf8"),
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const files = [];
async function collect(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(filename);
    else if (/\.(webp|png|jpe?g|svg)$/i.test(filename)) files.push(filename);
  }
}
await collect("public");
files.push("src/app/icon.png");
const results = [];
for (const filename of files) {
  const current = await fs.readFile(filename);
  const prior = previous.find((item) => item.path === filename);
  if (prior?.sha256 === hash(current)) {
    results.push(prior);
    continue;
  }
  let backup = path.join(backupRoot, filename);
  await fs.mkdir(path.dirname(backup), { recursive: true });
  try {
    await fs.writeFile(backup, current, { flag: "wx" });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    backup += `.${hash(current).slice(0, 12)}`;
    await fs.writeFile(backup, current);
  }
  const original = current;
  let candidate;
  let dimensions;
  if (filename.endsWith(".svg")) {
    candidate = Buffer.from(original.toString().replace(/>\s+</g, "><").trim());
  } else {
    const metadata = await sharp(original).metadata();
    dimensions = { width: metadata.width, height: metadata.height };
    const limit = filename.includes("branded-desktop") ? 1920 : 1600;
    const pipeline = sharp(original)
      .rotate()
      .resize({ width: limit, withoutEnlargement: true });
    if (filename.endsWith(".webp")) {
      const quality = filename.includes("brand/partners")
        ? 88
        : metadata.hasAlpha
          ? 84
          : filename.includes("hero/")
            ? 78
            : 80;
      candidate = await pipeline
        .webp({ quality, alphaQuality: 100, effort: 6, smartSubsample: true })
        .toBuffer();
    } else if (filename.endsWith(".png")) {
      candidate = await pipeline
        .png({
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: false,
          effort: 10,
        })
        .toBuffer();
    } else {
      candidate = await pipeline
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();
    }
  }
  const output = candidate.length < current.length ? candidate : current;
  if (output !== current) await fs.writeFile(filename, output);
  results.push({
    path: filename,
    originalBytes: original.length,
    bytes: output.length,
    savedBytes: original.length - output.length,
    sha256: hash(output),
    backup,
    ...dimensions,
  });
}
await fs.writeFile(
  "artifacts/asset-compression.json",
  JSON.stringify(results, null, 2),
);
const before = results.reduce((sum, file) => sum + file.originalBytes, 0);
const after = results.reduce((sum, file) => sum + file.bytes, 0);
console.log(
  JSON.stringify(
    {
      assessed: results.length,
      smaller: results.filter((file) => file.savedBytes > 0).length,
      beforeBytes: before,
      afterBytes: after,
      reductionPercent: Math.round((1 - after / before) * 100),
      hero: results.filter((file) => file.path.includes("branded-")),
    },
    null,
    2,
  ),
);
