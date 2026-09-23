import sharp from 'sharp';

// Manual tool — not wired into npm build / Netlify.
// Landscape OG card: left photo + right brand panel.

const W = 1200;
const H = 627;
const PHOTO_W = 620;
const TEXT_DX = 30;

// Internal gaps preserved from the original composition:
//   SYPEK → MICHAEL: 90
//   MICHAEL → ANGELOS: 62
//   ANGELOS → REAL ESTATE: 68  (also used for REAL ESTATE → DRE)
// Block vertically re-centered so (first + last) baseline midpoint ≈ 313.
// +6 vs baseline-mid centering so the dark-pixel bbox optical center lands ≈313
const Y0 = 175; // THE SYPEK GROUP
const Y_MICHAEL = Y0 + 90; // 265
const Y_ANGELOS = Y_MICHAEL + 62; // 327
const Y_RE = Y_ANGELOS + 68; // 395
const Y_DRE = Y_RE + 68; // 463

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <rect x="${PHOTO_W}" y="0" width="1" height="${H}" fill="#eaeaea"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <text x="${PHOTO_W + 56 + TEXT_DX}" y="${Y0}" font-size="15" font-weight="600" letter-spacing="3.2" fill="#8a8a8a">THE SYPEK GROUP &#183; COMPASS</text>
    <text x="${PHOTO_W + 54 + TEXT_DX}" y="${Y_MICHAEL}" font-size="52" letter-spacing="-0.5" fill="#1a1a18"><tspan font-weight="700">MICHAEL</tspan></text>
    <text x="${PHOTO_W + 54 + TEXT_DX}" y="${Y_ANGELOS}" font-size="52" font-weight="300" letter-spacing="-0.5" fill="#1a1a18">ANGELOS</text>
    <text x="${PHOTO_W + 56 + TEXT_DX}" y="${Y_RE}" font-size="16" font-weight="600" letter-spacing="2.4" fill="#6e6e6e">REAL ESTATE &#183; LOS ANGELES</text>
    <text x="${PHOTO_W + 56 + TEXT_DX}" y="${Y_DRE}" font-size="16" font-weight="600" letter-spacing="2.4" fill="#6e6e6e">DRE# 02283132</text>
  </g>
</svg>`;

const photo = await sharp('public/portrait.jpg')
  .resize(PHOTO_W, H, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 90 })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: 0, top: 0 }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile('public/og-card-v2.jpg');

console.log('wrote public/og-card-v2.jpg');
