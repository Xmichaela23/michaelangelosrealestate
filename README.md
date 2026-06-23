# michaelangelos.realestate

Astro static site for Michael Angelos — real estate agent in Los Angeles.

## Stack

- [Astro](https://astro.build/) (static output)
- Markdown content collections for notes
- Netlify auto-deploy from GitHub

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Routes

| Route | Page |
|---|---|
| `/` | Contact card (home) |
| `/notes` | Notes feed |
| `/notes/[slug]` | Single note |
| `/_internal` | Internal placeholder |

## Assets

Drop these files into `public/`:

- `og.png` — Open Graph image
- `portrait.jpg` — Headshot (contact card + note rail)
- `logo-white.png` — The Sypek Group · Compass logo

## Deploy

Pushes to `main` on GitHub trigger a Netlify build (`npm run build` → `dist/`).
