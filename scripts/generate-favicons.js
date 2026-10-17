const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  // 1. Extract the gold symbol from favicon.ico (offset 22, length 9887 is a valid 256x256 PNG)
  const icoBuf = fs.readFileSync(path.join(__dirname, '../public/favicon.ico'));
  const rawSymbolPng = icoBuf.slice(22, 22 + 9887);

  // Trim transparent edges from the symbol so it fills the icon nicely
  const trimmedSymbol = await sharp(rawSymbolPng)
    .trim()
    .toBuffer();

  const symbolMetadata = await sharp(trimmedSymbol).metadata();
  console.log('Trimmed symbol dimensions:', symbolMetadata.width, symbolMetadata.height);

  // We want an icon that pops in Google Search results (which are tiny: 16x16 to 48x48 circles).
  // A circular / rounded luxury dark green (#10221A) badge with the bright gold symbol
  // ensures maximum contrast and prestige against Google's white SERP background.

  // Let's create a 512x512 master icon:
  // Circle badge with gold rim and luxury dark green background:
  const masterSize = 512;
  const padding = 70; // safe area inside circle
  const targetSymbolSize = masterSize - (padding * 2); // 372px

  const resizedSymbol = await sharp(trimmedSymbol)
    .resize(targetSymbolSize, targetSymbolSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const svgBackground = `
  <svg width="${masterSize}" height="${masterSize}" viewBox="0 0 ${masterSize} ${masterSize}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#18362B" />
        <stop offset="100%" stop-color="#0B1A14" />
      </linearGradient>
      <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E8CA7C" />
        <stop offset="50%" stop-color="#C9A961" />
        <stop offset="100%" stop-color="#9C7A28" />
      </linearGradient>
    </defs>
    <!-- Background circle / squircle: squircle with rx=110 looks modern on both web and iOS -->
    <rect x="8" y="8" width="496" height="496" rx="130" fill="url(#bgGrad)" stroke="url(#goldRing)" stroke-width="12" />
  </svg>
  `;

  const masterBuffer = await sharp(Buffer.from(svgBackground))
    .composite([
      { input: resizedSymbol, gravity: 'center' }
    ])
    .png()
    .toBuffer();

  // Save outputs:
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../src/app');

  // 1. Google Search recommended sizes (multiple of 48): 48x48, 96x96, 192x192
  await sharp(masterBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon-48x48.png'));
  await sharp(masterBuffer).resize(96, 96).png().toFile(path.join(publicDir, 'favicon-96x96.png'));
  await sharp(masterBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(masterBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));

  // 2. Standard browser sizes
  await sharp(masterBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(masterBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));

  // 3. Apple Touch Icon (180x180)
  await sharp(masterBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(masterBuffer).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));

  // 4. Next.js App Router special convention: src/app/icon.png
  // Next.js automatically creates <link rel="icon" ...> from this file!
  await sharp(masterBuffer).resize(192, 192).png().toFile(path.join(appDir, 'icon.png'));

  // 5. Build multi-resolution ICO file (16, 32, 48) for public/favicon.ico and src/app/favicon.ico
  // A clean 48x48 PNG inside ICO satisfies Google and legacy browsers
  const png48 = await sharp(masterBuffer).resize(48, 48).png().toBuffer();
  
  // Create ICO header with 1 entry (48x48)
  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // image type 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // 1 image
  icoHeader.writeUInt8(48, 6);   // width
  icoHeader.writeUInt8(48, 7);   // height
  icoHeader.writeUInt8(0, 8);    // color palette
  icoHeader.writeUInt8(0, 9);    // reserved
  icoHeader.writeUInt16LE(1, 10); // color planes
  icoHeader.writeUInt16LE(32, 12); // bits per pixel
  icoHeader.writeUInt32LE(png48.length, 14); // image size in bytes
  icoHeader.writeUInt32LE(22, 18); // offset where image data starts

  const fullIco = Buffer.concat([icoHeader, png48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), fullIco);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), fullIco);

  console.log('✅ Todos los favicons generados exitosamente en public/ y src/app/');
}

generateFavicons().catch(console.error);
