# Moma's Care Cleaning — website redesign

A rebuilt, single-page marketing site for **Moma's Care Cleaning** (Philadelphia, PA) — vanilla
HTML, CSS and JavaScript, no build step and no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entire page: header, hero, highlights, services, story, gallery, FAQ, estimate/contact, footer. Includes meta/OG tags and LocalBusiness JSON-LD. |
| `styles.css` | Design system (color tokens, typography, spacing) and all responsive layout. |
| `script.js` | Sticky header, mobile nav, scroll spy, reveal animations, FAQ accordion, demo estimate form validation. |
| `favicon.svg` | Site icon. |
| `site.webmanifest` | PWA manifest metadata. |
| `robots.txt` | Crawler directives. |

## Business details used

- Phone: (267) 990-2478
- Address: 6140 Lansdowne Ave, Philadelphia, PA 19151
- Hours: Monday–Saturday open 24 hours; Sunday closed
- Owner: Rob Camargo — 25 years of experience; licensed, bonded, insured; free estimates
- Ten services: residential housekeeping, commercial office cleaning, deep cleaning, carpet
  cleaning, window washing, power washing, post-construction cleanup, move-in/move-out cleaning,
  event cleaning, junk & trash removal

## Notes

- The estimate form is a **demo**: it validates and summarizes input in the browser and sends
  nothing. Visitors are directed to call for an estimate.
- Photography is a mix of the business's own gallery images and contextually matched Pexels
  photography for services that had no existing photo.
