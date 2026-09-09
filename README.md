# Stillwater

An interactive, browser-based planted aquarium. Built with vanilla JavaScript, Canvas 2D, and Vite.

## Run

```sh
npm install
npm run dev
```

For deployment, run `npm run build` and serve the `dist` directory on any static host.

## Features

- Procedural aquatic plants, rocks, driftwood, light shafts, particles, and bubbles
- Six fish species, up to 60 residents, with animated fins and food-seeking behavior
- Click-to-feed, day/night lighting, adjustable current and light, plant palettes
- Generated ambient water audio, zen and fullscreen modes, PNG snapshots
- Browser-local persistence, responsive controls, keyboard shortcuts (F, N, Z, Escape)

Water metrics are illustrative simulation values, not real aquarium measurements. No account or backend is required. Fonts load from Google Fonts with local fallbacks.

## GitHub Pages deployment

Run `npm run deploy` to build and publish the website to the repository's `gh-pages` branch. GitHub Pages must be configured to serve that branch from its root. Source code lives on `main`. The deployment command requires Git authentication and never force-pushes.
