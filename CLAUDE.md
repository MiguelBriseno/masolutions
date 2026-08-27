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

## Contact form delivery

The site is static (GitHub Pages, no Actions workflow), so it cannot send mail
itself: browsers speak no SMTP, and any mail credential shipped in the page
would be public. FormSubmit receives the POST and relays it.

Pending: the `action` still carries the destination address in clear text. That
address is now also published deliberately in the contact `mailto:` link and in
the JSON-LD, so the hash swap is no longer about hiding it — it is about using
the endpoint FormSubmit documents and being able to change the destination inbox
without editing the page. Submit the form once from production, confirm
FormSubmit's activation email, and replace the address with the hash it returns —
`https://formsubmit.co/<hash>`. Host and CSP are unchanged by that swap, and
`contact-form.js` derives its endpoint from `form.action`, so nothing else
needs editing. Step by
step instructions sit in a comment above the form in `index.html`.

Do not route submissions through `repository_dispatch` to trigger a workflow:
that needs a repo-scoped token in client-side code, which is strictly worse than
an exposed address.

## SEO, GEO and AEO

Three files at the repo root are served as-is by GitHub Pages and must stay in
sync with the page:

- `robots.txt` — allows every crawler, names the AI assistant crawlers
  explicitly (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) and points
  to the sitemap.
- `sitemap.xml` — one URL. Bump `<lastmod>` when the page content changes.
- `llms.txt` — a plain-text summary of the company, services, process and FAQ
  for answer engines. Adoption of this convention is still informal; it costs
  nothing and no crawler is required to read it.

**The FAQ answers are duplicated in three places** — the `<h3>`/`<p>` pairs in
`index.html`, the `FAQPage` `mainEntity` inside the JSON-LD, and the
"Respuestas frecuentes" section of `llms.txt`. Structured data that contradicts
the visible page is a guidelines violation, so edit all three together or edit
none. This has already gone wrong once: three questions were keyword-expanded
in the JSON-LD only, leaving marked-up questions that appeared nowhere on the
page. The marked-up question must match the rendered `<h3>` **verbatim** —
check it, do not assume it. The same applies to the six services (visible cards, `hasOfferCatalog`,
`llms.txt`) and the two testimonials (visible `<figure>`s, `review`).

The JSON-LD is a single `@graph` with four nodes: `Organization` (services,
reviews, contact point), `WebSite`, `WebPage`+`FAQPage` (the six questions) and
a `HowTo` for the four-phase method. Nodes reference each other by `@id`, so
keep the `https://masolutions.mx/#…` ids stable.

No ratings or reviews are marked up, and none should be added. Reviews of the
business, published by the business, on its own site are *self-serving*: Google
excludes them from review snippets for `LocalBusiness` and its subtypes, and
they are a known trigger for a spammy-structured-markup action. The two
testimonials stay as visible `<figure>`/`<blockquote>` — that is the right place
for them. `aggregateRating` is a harder no: the page shows no star ratings, and
marking up a rating that is not visible is squarely prohibited.

The four-phase method is an `ItemList`, not a `HowTo`. `HowTo` means
instructions the reader carries out, its rich result was retired in 2023, and
every `HowToStep` requires a `text` property. Do not "upgrade" it back.

The public contact address is a personal Gmail, chosen by the owner over a
`@masolutions.mx` mailbox. It appears in three places that must agree: the
`mailto:` link, `Organization.email` plus its `contactPoint`, and `llms.txt`.

The organisation is typed plain `Organization`, and **no postal address is
published anywhere** — not in the page, not in the JSON-LD, not in `llms.txt`.
The owner works from a private home; the address was added and then deliberately
removed. Do not reintroduce it, and do not "upgrade" the type to
`LocalBusiness` / `ProfessionalService`: both need a published address to mean
anything, and publishing this one exposes a residence to every crawler that
`robots.txt` invites in. Local reach is handled by the Google Business Profile
as a service-area business instead, which shows the coverage area without the
address.

Opening hours therefore live on `contactPoint.hoursAvailable`, which is valid
for `Organization`. `openingHoursSpecification` is not — it belongs to
`LocalBusiness`/`Place` — so do not move them back.

`areaServed` names México, Jalisco, Tala and Guadalajara. Keep it matching the
service area declared in the Google Business Profile; a schema that contradicts
the profile is a wasted signal.

`sameAs` is empty. Add the Google Business Profile URL there once the listing is
verified — that is the strongest entity link this site can currently earn.

`assets/og-image.png` is deliberately PNG, not WebP — WhatsApp and several link
unfurlers still fail to render WebP social cards. It is generated at 1200×630
from the brand palette; regenerate it if the tagline or brand colour changes.

## Constraints

The page CSP (in both `_headers` and the `index.html` meta tag) has no `style-src 'unsafe-inline'`, so inline `style` attributes are blocked. Every visual value must live in a stylesheet.

`_headers` is aspirational, not live. It is a Cloudflare Pages / Netlify
convention and GitHub Pages ignores it, so `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy` and `frame-ancestors` are never actually sent — and a
`<meta>` CSP is specified to ignore `frame-ancestors` regardless. The page is
therefore framable in practice. Only putting the site behind a host that honours
the file (Cloudflare) would change that; until then, do not cite `_headers` as
evidence that a header is set.
