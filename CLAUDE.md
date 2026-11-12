# jdfigueroa.com — notes for Claude

Portfolio of Juan David Figueroa (art direction, motion, spatial & interactive; New York / Bogotá).
Plain static site: HTML + CSS + vanilla JS. **No framework, no build step.** Edit files directly.
Hosted on GitHub Pages from the `main` branch root.
Every push to `main` goes live in ~1 minute, so keep `main` working.

**Domain status:** jdfigueroa.com still serves Juan's OLD site. The new site is on the
github.io preview address until he decides to switch. Do NOT add a `CNAME` file or change
DNS until he explicitly says to. At switch-over: add `CNAME` containing `jdfigueroa.com`,
set the custom domain in repo Settings → Pages, change only the A/AAAA/CNAME web records at
the registrar (never MX/email records), then enable "Enforce HTTPS".
All links are relative, so the site works both under /repo-name/ and at the domain root.

Originally built on Cargo 3 and converted in Nov 2026, so some class names and ids
come from Cargo (see "Cargo leftovers" below).

## Layout
```
index.html            Home: hero, "Selected Work" grid (#work), Archive / Explore
archive.html          Text list of projects
info.html             Info page: bio, 10 selected clients, exhibitions (was an overlay until Nov 2026)
work/<slug>.html      One page per project (21). Order = home grid order.
assets/css/style.css  All styles. Sections: base layout → site text styles → per-page styles → overrides
assets/css/fonts.css  Font setup (Diatype not licensed off Cargo; Inter + JetBrains Mono fallback)
assets/js/site.js     #info → info.html redirect, mobile menu, footer clock, scroll fade-in, touch thumbnail highlight, archive row click
assets/media/         All images (named <hash-prefix>-<original-name>)
tools/                fetch_media.py + media-manifest.json (one-time Cargo image import)
```

## Shared pieces repeated in every page
The desktop nav, mobile nav and footer are copied into **every** HTML file
(no includes, since there's no build step). When changing any of them, update all 24 files —
use a script/regex over `*.html work/*.html`, then verify with grep.
- Footer email: `mailto:EMAIL@EXAMPLE.COM` (placeholder — ask Juan)
- Footer Instagram: `https://www.instagram.com/YOUR_HANDLE/` (placeholder — ask Juan)

## Page anatomy
Each Cargo "page" became `<section class="page" id="CARGO_ID">` › `.page-layout` › `.page-content` › `.bodycopy`.
Per-page CSS targets `[id="CARGO_ID"]`, so keep ids when editing.

A project page is:
1. `section.page.hero` — full-screen backdrop image (`.backdrop.clip` = fixed image revealed while scrolling)
2. `section.project-main` — location/year captions, title `h2` ending in `<span class="tag-row">` of `.button-4` pills (no `<br>` inside pills), description `.body-text-1`, credits `.caption`
3. `section.project-images` — galleries and credits
4. `nav.project-pager` — Back / Next (wraps around the home-grid order)

## Building blocks
- Columns: `<div class="cs stack" style="grid-template-columns:repeat(12,minmax(0,1fr));--gap:2rem;--mgap:1rem">`
  with children `<div class="cu" style="grid-column:span N">`. `stack` = becomes one column on mobile.
  Without spans: `grid-template-columns:repeat(K,minmax(0,1fr))`.
- Masonry gallery: `<div class="g-cols" style="--cols:2;--mcols:1;--gap:1.4rem;--mgap:1rem">` of `<figure class="media">`.
- Grid gallery: `<div class="g-grid" style="--cols:3;--mcols:1;--gap:1rem;--mgap:1rem">`.
- Image: `<figure class="media" data-hash="…"><img src="../assets/media/x.webp" width="1200" height="900" alt="" loading="lazy" decoding="async"></figure>`
  (inline `style="border-radius:0"` removes the default 0.9rem rounding).
- Video embed: `<figure class="media"><div class="embed" style="aspect-ratio:16/9"><iframe src="https://player.vimeo.com/video/ID" …></iframe></div></figure>`
- Text styles (classes): `h1` big statement, `h2` titles, `.caption` small mono dark-green, `.body-text-1` body,
  `.button-4` outlined pill, `.button-8` nav.

## Adding a project
1. Copy an existing `work/*.html` (similar layout), rename to the new slug.
2. Replace `<title>`, meta description, canonical, og:image, hero image, text, galleries.
   New section ids can be any unique string; copy the per-page CSS block in style.css for the old ids if needed.
3. Add a thumbnail `<a class="media thumbnail" href="work/<slug>.html">…</a>` to `.thumbnail-index` in `index.html`
   (4:3 crop, title in `.page-title`, tags as `.tag-link`).
4. Update Back/Next links in the neighbouring project pages and the "16 / 26" counter on home if relevant.
5. Optionally add a row to `archive.html`.

## Images
Put new images in `assets/media/`. Prefer `.webp`/`.jpg` ≤ 2000px wide and ≤ ~500 KB; GIFs can be large — keep them under ~10 MB.
Always set `width`/`height` attributes (prevents layout jump).

## Checking work
Preview locally: `python3 -m http.server 8000` in the repo root. Check desktop (~1500px) and mobile (390px).
Mobile layout is driven by `html.mobile` (≤680px), set in the `<head>` script and site.js.

## Cargo leftovers (safe to clean up gradually)
- Ids like `L2400837117` (home), `R1943008901` (desktop nav), `R4100027574` (mobile nav), `N3368705310` (footer),
  `W0120917068` (Info page section), `O3471381827` (archive).
- `style.css` "SITE STYLES" contains unused Cargo text styles (`.mini`, `.footer`, `.nav-bar-2`, …).
- Some `style="color: rgb(...)"` inline spans from Cargo's editor.

## Open items
- Puma World Cup: year set to 2026 per the archive (Cargo page header was copied from Still, Life) — confirm with Juan.
- Unconfirmed facts: Julius Manolo vs Manalo (Brandcast 26 vs FIFA credits); Max Lehder vs Ledher (EP19 vs EP16);
  "Points in the Cloud" (Info/archive) vs "Points in the Clouds" (project page); Ela Minus & DJ Python 2022 (page) vs 2023 (archive);
  Estéreo Picnic 17 location says New York; FIFA credits end with an incomplete name ("Kristina").
- Email + Instagram placeholders in the footer.
- "Explore" on home has no destination.
- Archive rows for projects that don't exist yet are plain text.
- Diatype fonts would need a web license from Dinamo (see fonts.css).
