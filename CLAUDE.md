# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page for masolutions.mx — vanilla HTML/CSS/ES6 JavaScript, **no build tools, no frameworks, no npm**.

## Branching

**Every change lands on its own branch. Never commit to `master`.** This holds
for one-line fixes, copy tweaks and documentation edits just as much as for
features — there is no change small enough to be an exception.

Before the first edit of any task, branch:

```bash
git switch -c <type>/<short-kebab-description>   # feat/, fix/, docs/, chore/, perf/
```

Then commit there and open a pull request against `master`. `master` only ever
moves through a merged PR.

This is not ceremony on a static site. GitHub Pages deploys `master` directly —
`source.branch: master`, no Actions workflow, no build step and no staging
environment — so a commit pushed to `master` is **live on masolutions.mx within
a minute**, with nothing between the typo and the visitor. The branch is the
only place a change can be looked at before the public sees it.

If work is already sitting uncommitted on `master`, do not commit it there and
fix it afterwards. Branch first — `git switch -c` carries the uncommitted
changes across untouched — and commit on the new branch.

When a change builds on another branch that is still an open PR, branch from
that branch and target the PR at it rather than at `master`. Chaining keeps each
diff limited to its own concern; retargeting at `master` would replay the parent
branch's commits inside the child's diff and make both unreviewable.

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

**CSS pattern:** BEM naming (`.block__element--modifier`), CSS custom properties for all tokens (defined in `:root` in `globals.css`). Each page section has its own stylesheet in `css/layout/`; reusable pieces that are not a section live in `css/components/` — `mockups.css` (the fake product screens), `cards.css` (the grid cards' hover treatment) and `action-bar.css` (the fixed mobile CTA). Both directories are linked one `<link>` at a time from `index.html`, in
cascade order (`reset` → `globals` → `animations` → `background` → layout →
components).

**`cards.css` must stay after `animations.css` in that order, and its
`transition` shorthand must keep restating the reveal's own
`opacity`/`transform` timings.** One element cannot have two owners for
`transition`: `.animate-on-scroll` declares it for the scroll reveal and the
hover rule declares it for the lift, and whichever wins the cascade silently
cancels the other. For the same reason the hover lift uses `translate`, not
`transform` — the reveal already owns `transform`, and independent properties
compose where a shared one would not.

`css/base/background.css` draws the drifting aurora behind the whole page as
two `body` pseudo-elements at `z-index: -1`. It carries no markup because the
CSP forbids inline styles and because `404.html` gets the same treatment from
the same file. Only `transform` is animated — animating the gradient stops or
`background-position` would repaint the full viewport every frame — and
`prefers-reduced-motion` drops the motion while keeping the gradients.

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

- **navbar.js** — three jobs: active nav link highlighting, the sticky header's
  scrolled state, and the mobile disclosure menu. Smooth scrolling is native
  `scroll-behavior`.
- **contact-form.js** — async `fetch` POST to FormSubmit with `FormData`, blur/input validation, and a success panel that replaces the form (with a reset button)
- **animations.js** — `IntersectionObserver` adds `.visible` to `.animate-on-scroll` elements; CSS handles the transition, and it is skipped under `prefers-reduced-motion`
- **action-bar.js** — parks the fixed mobile CTA off screen while the hero or
  the contact section is visible, and toggles `inert` with it
- **analytics.js** — loads the Microsoft Clarity tag from a `'self'` module instead of the inline snippet the CSP blocks (see Analytics below)
- **gtm.js** — same treatment for the Google Tag Manager container; `environment.js` holds the host guard both loaders share

**The header is sticky and lives outside `.container`.** The bar has to span the
full viewport; wrapped in the 1180px column it would stop short at both sides on
any wide screen and read as a rendering bug. `.site-header > .container > .nav`
is the shape, and the same restructure has *not* been applied to `404.html` —
that page ships no JavaScript, so a sticky header there could never get its
scrolled state, and its two links fit the row unaided.

Two consequences that are easy to break:

- Anchor targets need `scroll-margin-top` (set on `section[id]` and `#contenido`
  in `globals.css`), or every in-page jump lands with the heading hidden under
  the bar.
- Any mobile-only rule for `.nav__link` must be scoped to `.nav__menu`. On
  `404.html` the links are direct children of `.nav` with no menu wrapper, so an
  unscoped rule leaks a stray divider into the middle of that page's row.

Below 860px the header CTA is dropped on purpose and `action-bar.css` takes
over. Two competing calls to action on one phone screen only split the click.

**Nothing the visitor needs may be hidden by CSS that only JavaScript can
undo.** The mobile menu is the case that made this a rule. Collapsing the links
behind the hamburger from a plain media query meant that any failure to run
`main.js` — a fetch error, a throw earlier in the chain — left a phone visitor
with the logo, no links, no CTA and a button that did nothing.

The contract now is:

- Every rule that collapses the header is gated on `.nav[data-enhanced]`, and
  `navbar.js` sets that attribute as its **last** step, only after the toggle
  and the panel are bound. Unenhanced, the links wrap under the brand and the
  header CTA stays full width — which is what `404.html` gets too, since it is
  never enhanced.
- `initMobileMenu` runs *before* the active-link highlight and the header's
  scrolled state. It is the only one of the three that owns navigation; the
  other two are decoration and must not be able to take it down with them.
- The action bar is the mirror image: it ships `data-hidden inert` **in the
  markup**. Parking it from the deferred module painted it on screen and then
  slid it out on every load — and left it stuck over the page if the module
  never ran. JS only ever *removes* those attributes.
- `[data-hidden]` also sets `visibility: hidden`. `inert` alone is ignored by
  Firefox below 112 and Safari below 15.5, and neither `opacity: 0` nor
  `pointer-events: none` removes focusability, so a keyboard user on those
  engines would tab into two invisible off-screen links.

**The mockups animate on reveal** (`css/components/mockups.css`). Every keyframe
declares only `from` and fills `backwards`, so the element's ordinary CSS *is*
the resting state — with no animation running (reduced motion, no JS, an older
engine) the screens simply render finished. Keep that property: a keyframe with
a `to` would make the mockups depend on the animation having run. The whole
block sits inside one `prefers-reduced-motion: no-preference` query rather than
being switched off further down, so there is a single guard and no specificity
duel to lose. The hero copy of the dashboard plays on load; the case cards play
off `.project-card.visible`, which `animations.js` sets.

## Analytics

Microsoft Clarity (project `y95cif49iw`) runs from
`js/components/analytics.js`, not from the inline snippet Clarity hands out.
The page CSP has no `script-src 'unsafe-inline'`, so that snippet is blocked
outright — and opening inline scripts to admit an analytics tag would admit
every injected script too. The module transcribes the vendor loader (queue shim
plus an async `<script>` pointing at the tag) from a file served from `'self'`,
and the CSP allows `https://*.clarity.ms` in `script-src`, `img-src` and
`connect-src` — Clarity load-balances its tag and its ingestion across
`scripts.`, `a.` and `c.clarity.ms`.

`https://c.bing.com` is in `img-src` **only**, and it is not optional even
though the string appears nowhere in `clarity.js`. The MUID sync pixel at
`https://c.clarity.ms/c.gif` answers `302` to `https://c.bing.com/c.gif`, and
CSP checks the destination of a redirect, not just the URL first requested —
without that origin the pixel is blocked. It is deliberately absent from
`connect-src`, and that is not a guess: the sync is
`function sync(){(new Image).src="https://c.clarity.ms/c.gif"}` in the tag, an
image load governed by `img-src`. The tag contains exactly one `new Image` and
no `fetch`, `sendBeacon` or `XMLHttpRequest` at all, so no Clarity request can
reach `c.bing.com` through `connect-src`.

Keep the Clarity origins in sync between the `index.html` meta tag and
`_headers`. The two policies are **not** otherwise identical: `frame-ancestors`
stays `_headers`-only, because a `<meta>` CSP is specified to ignore it.

The queue shim stays a `function`, not an arrow — it forwards `arguments`,
which an arrow function does not have.

The third-party loaders run **after** the page's own components in `main.js`,
and each body is wrapped in `try`/`catch`. Privacy extensions neutralize known
analytics globals by redefining `window.clarity` as non-writable, as a getter
with no setter, or as a throwing Proxy; modules are strict mode, so **both**
reading and assigning it can throw. That is why the duplicate-load guard sits
inside the `try` rather than before it. Ordered first and unguarded, such a
throw would take the navbar, the mobile menu, the action bar and the contact
form — the site's only conversion path — down with it.

Both loaders return early on local hosts via `isMeasuredHost()` in
`js/core/environment.js` — the shared guard exists so the two cannot drift.
It covers `localhost`, `0.0.0.0`, loopback, the RFC 1918 private ranges,
link-local and `.local`/`.localhost`, not just `localhost`. The private ranges
are not padding: checking the layout at 320px means `--bind 0.0.0.0` and
opening `http://192.168.x.x:8000` on a real phone, and that session would
otherwise be recorded into the production project.

The `<noscript>` iframe is the one path this guard cannot cover — gating it
would take JavaScript, which is the whole point of `<noscript>`. A developer
browsing localhost with JavaScript disabled registers one pageview in the
production container. Narrow enough to accept; worth knowing before someone
hunts the phantom hit.

`404.html` is deliberately left out: it runs no JavaScript at all and its CSP
is `script-src 'none'`. Measuring broken inbound links would mean giving that
page a script, which is a bigger change than the data is worth.

**The site publishes no aviso de privacidad, and it needs one.** The contact
form already collects nombre, telefono, email and detalle, which makes an aviso
de privacidad a requirement under the LFPDPPP on its own — that gap predates
Clarity. Clarity widens it: it sets first-party cookies (`_clck`, `_clsk`) and
records session replays of the visitor filling that form, and transmits them to
a third party with no disclosure anywhere on the page. This is the owner's
decision to make, not a change to be made for them. If a notice or consent
banner is ever added, `initClarity()` is the single call to gate behind it.

### Google Tag Manager

Container `GTM-MNRGGGF9`, loaded from `js/components/gtm.js` for the same
reason Clarity is: the snippet Google publishes is an inline `<script>` and
there is no `script-src 'unsafe-inline'`. Google's documented alternative is a
per-request **nonce**, which this site cannot produce — GitHub Pages serves
static files and there is no server to generate one per response. A module
served from `'self'` is what is left.

The `<noscript>` iframe sits immediately after `<body>`. Google ships it with
`style="display:none;visibility:hidden"`, blocked by the CSP, so the same two
declarations live in `.gtm-noscript` in `globals.css`. It also needed a new
`frame-src` directive: frames previously fell back to `default-src 'self'`.

**GTM here is not a no-deploy tag manager, and that is the whole point of GTM.**
The CSP allows Google's own measurement origins, so a GA4 or Google Ads tag
configured in the UI will work. Anything else will not: a Custom HTML tag
injects an inline script and is blocked outright, and any third-party pixel
(Meta, LinkedIn, TikTok, Hotjar…) is blocked until its origin is added to the
CSP in **both** `index.html` and `_headers` and the change is deployed. Google's
CSP guide does not cover custom or third-party tags at all. The failure is
silent — the tag reports as fired in GTM's preview while the browser blocks the
request — so check the console before believing a new tag works.

Origins allowed for GTM and GA4: `https://www.googletagmanager.com` in
`script-src`, `img-src`, `connect-src` and `frame-src`, plus
`https://*.google-analytics.com`, `https://*.analytics.google.com`,
`https://*.g.doubleclick.net` and `https://www.google.com`. Deliberately **not**
included, because no Ads campaign runs yet: `pagead2.googlesyndication.com`,
`www.googleadservices.com` and the `https://*.google.<TLD>` ccTLD wildcards.
Add them if remarketing or conversion tracking is ever turned on.

At install time the container was **empty** — `"tags":[]`, `"rules":[]` — so it
downloads ~328 KB of runtime and measures nothing until tags are configured.

**GTM Preview does not work under this policy**, which is awkward given that
every tag added to an empty container needs validating. The debug overlay is
served from origins the CSP does not allow: `https://tagmanager.google.com` in
`script-src`, `style-src` and `frame-src`, plus `https://www.gstatic.com` and
`https://ssl.gstatic.com` in `img-src`. They are left out on purpose — letting
Google serve **styles** into the page permanently, to support a tool only the
owner ever opens, is a poor trade. Add them temporarily on a branch to debug,
and drop them before merging.

**Do not add Clarity as a tag inside GTM.** It is already loaded directly by
`analytics.js`; a second copy through the container would double-count sessions.

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

**The page segments by capability, not by sector — that axis is deliberate.**
The H1, `slogan`, meta/`og`/`twitter` descriptions and `Organization.description`
all name what gets built (aplicaciones móviles, web, sistemas internos,
integraciones por API) and say **`para empresas de cualquier sector`**. They
used to name verticals instead, and the owner asked for that filter to come off:
a buyer outside the named industries was reading the headline as "not for me".

Do not put a vertical back at the top of the funnel. If breadth ever needs
restating, restate it on the capability axis — it is specific, it keeps the
keywords, and it excludes nobody. `para cualquier industria` is the wrong fix:
it is what every dev shop on earth says, and it hands the buyer the job of
working out whether you can solve their problem.

**Lower down, the named sectors stay — as evidence, never as scope.** They
survive in exactly four places: `knowsAbout`, the `#nosotros` paragraph that
opens *"Los sistemas que hemos puesto en producción operan en…"*, the same
sentence in `llms.txt` under "Quiénes somos", and the `Sectores atendidos` line
in `llms.txt` (which reads *cualquier sector* first and then names where systems
are actually running). All four are phrased as delivery history, and each is
backed by a case card below (Tonalli ERP, ActuarEnvíos, Urban Reps).

That backing is the rule: adding a sector means the owner has a delivered case
for it; removing a case means removing its sector from all four. A vertical
claimed with no project behind it is a false promise on the page and a
contradicted signal in the schema.

**The hero type scale is tuned to the headline's length**, not chosen in the
abstract — see the comment on `.hero__title` in `css/layout/hero.css`. The
capability headline is 77 characters; at the previous `clamp()` it set six lines
and 396px, which pushed the call to action below the fold on a 1366×768 laptop.
Four lines is the budget. If the headline changes materially, measure the CTA
against the fold again rather than assuming it still fits.

**The page addresses the reader as `usted`, without exception** — headings,
form labels, placeholders, disclaimers and the success panel included. This has
already drifted once: the email placeholder read `tu@empresa.com` while the
surrounding section used `Describa` and `Le responderemos`. Mixed register in a
B2B page reads as careless, and the metadata is part of the page: `og:description`
carried an imperative `Impulsa tu negocio` long after the visible copy had moved
to `usted`.

**The FAQ answers are duplicated in three places** — the six `<details>` in
`index.html`, the `FAQPage` `mainEntity` inside the JSON-LD, and the
"Respuestas frecuentes" section of `llms.txt`. Structured data that contradicts
the visible page is a guidelines violation, so edit all three together or edit
none. This has already gone wrong once: three questions were keyword-expanded
in the JSON-LD only, leaving marked-up questions that appeared nowhere on the
page. The marked-up question must match the rendered `<h3>` **verbatim** —
check it, do not assume it. The same applies to the six services (visible cards, `hasOfferCatalog`,
`llms.txt`) and the two testimonials (visible `<figure>`s, `review`).

The accordion markup is `<details class="faq__item" name="faq">` wrapping
`<summary>` → `<h3 class="faq__question">` plus a decorative `<span>` marker. A
heading is valid as the sole content of `<summary>`, and keeping the marker on
the summary rather than inside the heading is what stops a chevron character
from ever landing inside the text the `FAQPage` markup has to match. The shared
`name` makes the six an exclusive group; engines without support just allow
several open at once, which is the old behaviour. The grid is a single column on
purpose — in two columns, opening an item on the left reflows the right-hand
column and moves the question the reader was about to reach.

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
