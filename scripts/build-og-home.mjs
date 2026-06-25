import sharp from 'sharp';

// Vertical card so it survives Instagram DM / iMessage portrait crops.
const W = 1080;
const H = 1350;
const PHOTO_H = 920;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#fcfcfd"/>
  <rect x="0" y="${PHOTO_H}" width="${W}" height="1" fill="#eaeaea"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <text x="80" y="1015" font-size="22" font-weight="600" letter-spacing="3" fill="#8a8a8a">THE SYPEK GROUP &#183; COMPASS</text>
    <text x="78" y="1120" font-size="76" letter-spacing="-1" fill="#1a1a18"><tspan font-weight="700">MICHAEL</tspan><tspan font-weight="300" dx="26">ANGELOS</tspan></text>
    <text x="80" y="1185" font-size="22" font-weight="600" letter-spacing="3" fill="#6e6e6e">REAL ESTATE AGENT &#183; LOS ANGELES</text>
  </g>
</svg>`;

const photo = await sharp('public/portrait.jpg')
  .resize(W, PHOTO_H, { fit: 'cover', position: 'top' })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: 0, top: 0 }])
  .png()
  .toFile('public/og-home.png');

console.log('wrote public/og-home.png (vertical)');
