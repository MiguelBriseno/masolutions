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

**CSS pattern:** BEM naming (`.block__element--modifier`), CSS custom properties for all tokens (defined in `:root` in `globals.css`), mobile-first responsive (`@media (min-width: ...)`). Each page section has its own stylesheet in `css/layout/`.

## Conventions (from AGENTS.md)

- JS: ES6 modules with explicit `.js` extensions (required by browser — no bundler to resolve them)
- JS: `const` > `let`, never `var`; arrow functions for callbacks; template literals over concatenation
- DOM: always null-check before accessing elements; early return to prevent errors
- CSS: custom properties for all colors/spacing/shadows — never hardcode values
- HTML: semantic HTML5 elements, `alt` on all images, `aria-label` on interactive elements

## Key Components

- **navbar.js** — mobile menu toggle, scroll-based `scrolled` class (at 50px), smooth anchor scrolling with header offset, active link highlighting, language toggle (es/en, in-memory only)
- **contact-form.js** — async `fetch` POST with `FormData`, real-time blur/input validation, success (5s auto-hide) and error (4s) feedback
- **animations.js** — `IntersectionObserver` adds `.animate-on-scroll` trigger class; CSS handles the actual animation
