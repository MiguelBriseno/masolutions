# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page for masolutions.mx — vanilla HTML/CSS/ES6 JavaScript, **no build tools, no frameworks, no npm**.

## Local Development

```bash
python3 -m http.server 8000
# or
npx serve .
```

Visit `http://localhost:8000`.

## Architecture

Single-page app with a module-based JS architecture and a sectioned CSS architecture.

**Entry points:**
- `index.html` — loads `css/base/main.css` and `js/core/main.js` as `type="module"`
- `js/core/main.js` — imports all component `init*()` functions and calls them on `DOMContentLoaded`
- `css/base/main.css` — `@import`s all section-specific stylesheets

**JS pattern:** Each feature lives in `js/components/<name>.js` and exports a single `initComponentName()` function. To add a feature: create the module, export the init function, import and call it from `main.js`.

**CSS pattern:** BEM naming (`.block__element--modifier`), CSS custom properties for all tokens (defined in `:root` in `globals.css`). Each page section has its own stylesheet in `css/layout/`; reusable pieces that are not a section live in `css/components/` (currently `mockups.css`, the fake product screens drawn inside the case cards). Both directories are imported from `css/base/main.css`.

**Brand assets:** `assets/logo.webp` (nav/footer) and `assets/icon.webp` (favicon) are the same M mark, repainted to exactly `--color-primary` (#5b3df5). Regenerate both together if the brand colour ever changes, and keep the favicon's mark filling most of its square canvas — it renders at 16px in a browser tab.

**Responsive:** grids use `repeat(auto-fit, minmax(min(Xpx, 100%), 1fr))`. The `min()` is not optional — a bare `minmax(330px, 1fr)` forces horizontal overflow on every viewport narrower than the track. Layout is verified from 320px to 1440px.

## Conventions (from AGENTS.md)

- JS: ES6 modules with explicit `.js` extensions (required by browser — no bundler to resolve them)
- JS: `const` > `let`, never `var`; arrow functions for callbacks; template literals over concatenation
- DOM: always null-check before accessing elements; early return to prevent errors
- CSS: custom properties for all colors/spacing/shadows — never hardcode values
- HTML: semantic HTML5 elements, `alt` on all images, `aria-label` on interactive elements

## Key Components

- **navbar.js** — active nav link highlighting via `IntersectionObserver` (the nav is static, not sticky; smooth scrolling is native `scroll-behavior`)
- **contact-form.js** — async `fetch` POST to FormSubmit with `FormData`, blur/input validation, and a success panel that replaces the form (with a reset button)
- **animations.js** — `IntersectionObserver` adds `.visible` to `.animate-on-scroll` elements; CSS handles the transition, and it is skipped under `prefers-reduced-motion`

## Constraints

The page CSP (in both `_headers` and the `index.html` meta tag) has no `style-src 'unsafe-inline'`, so inline `style` attributes are blocked. Every visual value must live in a stylesheet.
