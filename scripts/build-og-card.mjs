import sharp from 'sharp';

// Manual tool — not wired into npm build / Netlify.
// Reconstituted from the one-off that wrote public/og-card-v2.jpg,
// with the two approved changes: panel fill #F0EEEA; text block x += 30.

const W = 1200;
const H = 627;
const PHOTO_W = 620;
const TEXT_DX = 30;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#F0EEEA"/>
  <rect x="${PHOTO_W}" y="0" width="1" height="${H}" fill="#eaeaea"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <text x="${PHOTO_W + 56 + TEXT_DX}" y="210" font-size="15" font-weight="600" letter-spacing="3.2" fill="#8a8a8a">THE SYPEK GROUP &#183; COMPASS</text>
    <text x="${PHOTO_W + 54 + TEXT_DX}" y="300" font-size="52" letter-spacing="-0.5" fill="#1a1a18"><tspan font-weight="700">MICHAEL</tspan></text>
    <text x="${PHOTO_W + 54 + TEXT_DX}" y="362" font-size="52" font-weight="300" letter-spacing="-0.5" fill="#1a1a18">ANGELOS</text>
    <text x="${PHOTO_W + 56 + TEXT_DX}" y="430" font-size="16" font-weight="600" letter-spacing="2.4" fill="#6e6e6e">REAL ESTATE &#183; NORTHEAST LOS ANGELES</text>
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
