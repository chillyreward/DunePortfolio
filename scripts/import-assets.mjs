import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sourceDirInput = process.argv[2];

if (!sourceDirInput) {
  console.error('Error: Please provide the source directory path as an argument.');
  process.exit(1);
}

// Clean quotes if passed in with quotes on Windows
const sourceDir = path.resolve(sourceDirInput.replace(/^["']|["']$/g, ''));

if (!fs.existsSync(sourceDir)) {
  console.error(`Error: Source directory does not exist: ${sourceDir}`);
  process.exit(1);
}

const outDir = path.resolve('public/images/_inbox');
fs.mkdirSync(outDir, { recursive: true });

const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.tif',
  '.tiff',
]);

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getAllFiles(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  // Sort entries for deterministic output
  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      files.push({
        fullPath,
        relPath: path.relative(baseDir, fullPath),
      });
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function run() {
  const allFiles = getAllFiles(sourceDir);
  const usedOutputNames = new Map(); // normalizedBase -> count of unique source files
  const results = [];
  const skipped = [];

  for (const file of allFiles) {
    const ext = path.extname(file.fullPath).toLowerCase();
    const parsedPath = path.parse(file.relPath);
    const subdirs = parsedPath.dir ? parsedPath.dir.split(/[\\/]/).filter(Boolean) : [];
    
    const slugifiedSubdirs = subdirs.map(slugify).filter(Boolean);
    const slugifiedName = slugify(parsedPath.name) || 'image';

    const baseNameCandidate = [...slugifiedSubdirs, slugifiedName].join('-');

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      skipped.push({
        source: file.relPath,
        reason: `Unsupported format (${ext || 'no extension'})`,
      });
      continue;
    }

    let finalName = `${baseNameCandidate}.webp`;
    let count = usedOutputNames.get(baseNameCandidate) || 0;
    count++;
    usedOutputNames.set(baseNameCandidate, count);

    if (count > 1) {
      finalName = `${baseNameCandidate}-${count}.webp`;
    }

    const outputPath = path.join(outDir, finalName);
    const statsBefore = fs.statSync(file.fullPath);

    try {
      const image = sharp(file.fullPath).rotate();
      const meta = await image.metadata();

      const origW = meta.width ?? 0;
      const origH = meta.height ?? 0;

      await image
        .resize({
          width: 2400,
          height: 2400,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toFile(outputPath);

      const statsAfter = fs.statSync(outputPath);
      const outMeta = await sharp(outputPath).metadata();

      results.push({
        source: file.relPath,
        output: finalName,
        origDimensions: `${origW}x${origH}`,
        outDimensions: `${outMeta.width}x${outMeta.height}`,
        sizeBefore: formatBytes(statsBefore.size),
        sizeAfter: formatBytes(statsAfter.size),
      });
    } catch (err) {
      skipped.push({
        source: file.relPath,
        reason: `Processing error: ${err.message}`,
      });
    }
  }

  console.log('\n--- IMPORT RESULTS ---');
  if (results.length > 0) {
    console.table(results);
  } else {
    console.log('No supported images found.');
  }

  if (skipped.length > 0) {
    console.log('\n--- SKIPPED FILES ---');
    console.table(skipped);
  }

  console.log(`\nTotal imported: ${results.length}, Total skipped: ${skipped.length}\n`);
}

run().catch((err) => {
  console.error('Fatal error during asset import:', err);
  process.exit(1);
});
