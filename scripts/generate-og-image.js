const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // We want a design that:
  // 1. Is 1200x630 (standard OG ratio 1.91:1)
  // 2. Has the luxury villa atmosphere
  // 3. Has a clean, high-contrast, elegant glassmorphic/dark container in the center
  // 4. Center 630x630 safe zone contains the entire logo and text so WhatsApp 1:1 square crop is flawless!
  
  const heroPath = path.join(__dirname, '../public/images/hero-bg.jpg');
  const logoPath = path.join(__dirname, '../public/logotipo.png');

  // Resize hero image with slight blur and darkening for luxury feel
  const background = await sharp(heroPath)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.65, saturation: 1.1 })
    .blur(1.5)
    .toBuffer();

  // Create an SVG overlay with luxury frame, logo backing, and typography
  // Safe zone is between x=285 and x=915 (width 630 centered)
  const overlaySvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradient for overall vignette -->
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.75" />
      </radialGradient>
      
      <!-- Card background gradient (ultra premium ivory/glass) -->
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.97" />
        <stop offset="100%" stop-color="#F7F5F0" stop-opacity="0.95" />
      </linearGradient>

      <!-- Gold gradient for borders & accents -->
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D4AF37" />
        <stop offset="50%" stop-color="#F3E5AB" />
        <stop offset="100%" stop-color="#AA771C" />
      </linearGradient>
      
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000000" flood-opacity="0.5" />
      </filter>
    </defs>

    <!-- Dark vignette over background -->
    <rect width="${width}" height="${height}" fill="url(#vignette)" />

    <!-- Centered Luxury Card - 680px wide x 490px high (fits comfortably in 1200x630 and within WhatsApp's 630 center square) -->
    <rect x="260" y="70" width="680" height="490" rx="20" fill="url(#cardGrad)" filter="url(#shadow)" stroke="url(#goldGrad)" stroke-width="2" />
    
    <!-- Inner subtle border for luxury certificate look -->
    <rect x="274" y="84" width="652" height="462" rx="14" fill="none" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="6,4" />

    <!-- Tagline below logo area -->
    <text x="600" y="465" font-family="'Montserrat', 'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="3" fill="#10221A" text-anchor="middle" text-transform="uppercase">
      ADMINISTRACIÓN DE FINCAS EN AIRBNB
    </text>

    <!-- Location & Standard badge -->
    <text x="600" y="495" font-family="'Playfair Display', Georgia, serif" font-size="15" font-style="italic" fill="#8C7335" text-anchor="middle">
      Villeta, Cundinamarca · Estándar Superanfitrión 5★
    </text>
    
    <!-- Website pill badge at bottom -->
    <rect x="475" y="515" width="250" height="26" rx="13" fill="#10221A" />
    <text x="600" y="532" font-family="'Montserrat', Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="2" fill="#D4AF37" text-anchor="middle">
      VILLETACONSERJE.COM
    </text>
  </svg>
  `;

  // Process the logo to fit nicely in the upper portion of the card
  // Card is x: 260 to 940 (width 680), y: 70 to 560
  // Logo area: width ~420, height ~310, placed at x: 390, y: 110
  const processedLogo = await sharp(logoPath)
    .resize(440, 310, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const finalImage = await sharp(background)
    .composite([
      { input: Buffer.from(overlaySvg), top: 0, left: 0 },
      { input: processedLogo, top: 115, left: 380 }
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(__dirname, '../public/images/og-villeta-conserje.jpg'));

  console.log('OG image created successfully:', finalImage);
}

createOgImage().catch(console.error);
