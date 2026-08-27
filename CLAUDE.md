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
- `index.html` — links every stylesheet individually and loads `js/core/main.js` as `type="module"`
- `js/core/main.js` — imports all component `init*()` functions and calls them on `DOMContentLoaded`
- `404.html` — GitHub Pages serves it for any unknown path; `noindex, follow`, no JS

**JS pattern:** Each feature lives in `js/components/<name>.js` and exports a single `initComponentName()` function. To add a feature: create the module, export the init function, import and call it from `main.js`.

**CSS pattern:** BEM naming (`.block__element--modifier`), CSS custom properties for all tokens (defined in `:root` in `globals.css`). Each page section has its own stylesheet in `css/layout/`; reusable pieces that are not a section live in `css/components/` (currently `mockups.css`, the fake product screens drawn inside the case cards). Both directories are linked one `<link>` at a time from `index.html`, in
cascade order (`reset` → `globals` → `animations` → layout → components).

There is deliberately **no entry stylesheet full of `@import` rules**. An
`@import` chain is render-blocking in two hops: the browser cannot even discover
the imported files until the entry sheet has downloaded and parsed. Adding a
stylesheet therefore means adding a `<link>` to `index.html` (and to `404.html`
if that page needs it), not an `@import`.

**Brand assets:** `assets/logo.webp` (nav/footer) and `assets/icon.webp` (favicon) are the same M mark, repainted to exactly `--color-primary` (#5b3df5). Regenerate both together if the brand colour ever changes, and keep the favicon's mark filling most of its square canvas — it renders at 16px in a browser tab.

`apple-touch-icon.png` (180), `icon-192.png` and `icon-512.png` are `icon.webp`
flattened onto white — iOS composites a transparent touch icon onto black, so
they cannot stay transparent. `icon-maskable-512.png` is different on purpose:
Android crops maskable icons to a shape, so the mark is repainted white at 55%
of the canvas on a solid `--color-primary` square, inside the 80% safe zone. All
four derive from `icon.webp`; regenerate them together with it.

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

These files at the repo root are served as-is by GitHub Pages and must stay in
sync with the page:

- `robots.txt` — allows every crawler, names the AI assistant crawlers
  explicitly (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) and points
  to the sitemap.
- `sitemap.xml` — one URL. Bump `<lastmod>` when the page content changes.
- `llms.txt` — a plain-text summary of the company, services, process and FAQ
  for answer engines. Adoption of this convention is still informal; it costs
  nothing and no crawler is required to read it.
- `site.webmanifest` — `display: "browser"` on purpose. This is a marketing
  page, not an installable app; the manifest is there for the Android tab
  colour, name and icons, and asking for `standalone` would only advertise an
  app experience that does not exist.
- `404.html` — GitHub Pages serves it for unknown paths. It is `noindex,
  follow`: a soft 404 that gets indexed splits the site's signals across a page
  with no content. It also runs no JavaScript, which is why its footer carries
  no year.

**The "Nosotros" prose is duplicated in two places** — the `#nosotros` section
in `index.html` and the "Quiénes somos" / "Compromisos de trabajo" sections of
`llms.txt`. Every claim in it is one the rest of the page already makes (48-hour
proposal, closed scope and price, two-week cycles, documentation included, store
publishing, monthly support). Do not add a claim there that appears nowhere
else — no founding year, no team size, no client count — unless the owner
supplies it, and then add it to both surfaces.

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

`sameAs` carries one URL: the verified Google Business Profile, as its canonical
Maps place URL —
`https://www.google.com/maps/place/?q=place_id:ChIJWdP7cpGxKIQRUDx3ueF6TWk`.

That exact form is deliberate. A `share.google` or `maps.app.goo.gl` link is a
JavaScript redirect that can rot and cannot be resolved without hitting Google's
bot protection; a `search?kgmid=…` link is a results page, not a profile. The
`place_id` form is the one Google documents in the Maps URLs API and it is
stable. The listing's other identifiers, if they are ever needed:
CID `7587856057086983248` (hex `0x8428b19172fbd359:0x694d7ae1b9773c50`) and
Knowledge Graph MID `/g/11nvhy9fht`.

The same URL is repeated in `llms.txt` under Contacto, so change both together.

Note what `sameAs` is and is not: the authoritative link between the listing and
this site is the **website field inside the Business Profile itself**. `sameAs`
corroborates it from this side; it does not create it. If more profiles are ever
opened (LinkedIn, GitHub, Facebook), add them to the same array.

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
