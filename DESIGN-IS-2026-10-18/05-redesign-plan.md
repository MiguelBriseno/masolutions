# Redesign plan: masolutions.mx landing page

Source brief: `04-handoff-prompt.md` (REDESIGN, audit 9/30). Evidence anchors
(`E-…`) refer to `01-evidence.md`. Line numbers were taken from the
`docs/design-audit` branch on 2026-10-18; **re-grep before editing**, because
every phase shifts them.

## Primary goal

A business owner or manager with no technical background lands on
masolutions.mx and can:

- tell within one screen what MA Solutions builds and that it builds it for them;
- believe every number and promise on the page, because every one of them is true and consistent;
- request a proposal without friction.

The page should look calm and deliberate in light or dark mode, and should
still look current years from now.

"Done" means all of the following:

- the audit's cutover criteria pass (Phase 8);
- a re-run of `/claude-mem:design-is` scores ≥ 20/30;
- no principle scores 0.

---

## Phase 0: Documentation discovery (done, consolidated)

> **How this serves the primary goal:** every later phase edits a page with
> hard rules (CSP, duplicated content, JS-optional nav). Knowing the exact
> files, tokens and contracts up front is what stops a redesign from breaking
> the conversion path or the structured data while it changes the look.

### Project contracts that every phase must keep (CLAUDE.md)

- **No build step, vanilla only.** Add a stylesheet with a `<link>` in `index.html:365-384` (and in `404.html:28-33` if that page needs it). Never use `@import`.
- **CSP: no inline `style` attributes, no inline scripts.** Setting `element.style.transitionDelay` through the CSSOM is allowed; it is what `js/components/animations.js:36` already does.
- **Tokens live in `:root` of `css/base/globals.css:1-102`.** BEM names. Grids use `repeat(auto-fit, minmax(min(Xpx, 100%), 1fr))`.
- **Content is duplicated across three surfaces. Edit them together or not at all.**
  - FAQ: page `index.html:1106-1179`, JSON-LD `275-318`, `llms.txt:73-78`. The `<h3>` must match the JSON-LD question verbatim.
  - Services: page `718-801`, `hasOfferCatalog` `163-230`, `llms.txt:55-60`.
  - Nosotros: page `646-699`, `llms.txt:10-31`.
  - #a-la-medida: page `598-627`, `llms.txt:46-51`.
  - Process: page `810-845`, `ItemList` `324-356`, `llms.txt:62-69`.
- **The header collapse stays gated on `.nav[data-enhanced]`.** It is set last, at `navbar.js:104`. The action bar ships `data-hidden inert` in markup (`index.html:1396`); JS only ever removes them.
- **Mockup keyframes declare `from` only, with `backwards` fill,** inside the single `no-preference` block at `mockups.css:557-634`.
- **The hero's H1 has a four-line budget, and the CTA must stay above the fold at 1366×768.** See the comment at `hero.css:9-14`.
- **Never commit on `master`; it deploys live.** Each phase gets its own branch and PR. Chain each branch on the previous open PR, not on master.

### Allowed platform features (no polyfills, no new dependencies)

| Feature | Use it for | Notes |
|---|---|---|
| CSS custom properties, `clamp()`, `min()` | the scales | already used everywhere |
| `@media (prefers-color-scheme: dark)` | the dark theme | use the media query, **not** `light-dark()`: support for that function is too recent for the Safari 15 floor that CLAUDE.md already respects (`inert` fallback) |
| `color-scheme` property and `<meta name="color-scheme" content="light dark">` | native form controls and scrollbars in dark mode | |
| `<meta name="theme-color" media="(prefers-color-scheme: dark)">` | the tab colour | the existing tag is at `index.html:16` |
| `novalidate` on `<form>` | let `contact-form.js` own validation | its `VALIDATORS` already cover required, length and format (`contact-form.js:18-69`) |
| `aria-busy`, `aria-labelledby` | the sending state and the form's name | |
| Container queries | the process connectors | already used at `process.css:36-50` |

### Anti-patterns (things that do not exist here or are banned)

- No `@import`, no Sass or PostCSS, no npm scripts. "Just add a build" is not an option.
- No `style=""` in markup, no inline `<script>`, no new third-party origin without changing the CSP in both `index.html` and `_headers`.
- No `transform` on elements that `.animate-on-scroll` reveals. Use `translate`, as `cards.css` does.
- No `aggregateRating` or `review` markup, no postal address, no `LocalBusiness` type.
- Do not delete `background.css` without also removing its `<link>` from **both** pages (`index.html:368`, `404.html:30`).

### Stale documentation found during discovery (fix in Phase 7)

- CLAUDE.md says the graph has "a `HowTo` for the four-phase method". The code is an `ItemList` (`index.html:323-356`).
- CLAUDE.md says GitHub Pages serves the site directly and `_headers` is not live. Production actually answers with `server: cloudflare`, and Cloudflare injects two scripts that the CSP blocks (E-WGT-6).

---

## Phase 1: Design spec and owner decisions (docs only, no page change)

> **How this serves the primary goal:** honesty (#6) depends on facts only the
> owner knows. This phase also fixes the target (IA, hero, tokens, copy) before
> any CSS moves, so later phases copy from a spec instead of improvising.

**Branch:** `docs/redesign-spec`, based on `docs/design-audit` (which carries the audit). One PR.

**What to implement.** Write `DESIGN-IS-2026-10-18/06-spec.md` with:

1. **Owner decisions, recorded verbatim, each with the options listed.** Do not guess; ask the owner with AskUserQuestion.
   - Real total duration: is the FAQ's "entre 8 y 14 semanas" correct, or do the phase pills (1 + 2 + 4–12 + 1 = 8–16) describe reality? Evidence: E-COPY-2.
   - Is the 48 h counted in "horas hábiles" or calendar hours? Does it start from the form or from the initial meeting (FAQ `1114` vs contact lead `1190`)?
   - "Alcance, precio y plazo cerrados" against "plazos referenciales" (`847-850`): which is the commitment? Likely answer: estimates are referential until the proposal, then closed once it is signed. Write the exact wording.
   - Case mocks: keep them with a visible "Ilustración — datos de ejemplo" caption, or replace the client-branded figures (Tonalli `864-887`, ActuarEnvíos `921-975`) with neutral sample data? Is real permission to show client branding on record?
   - Dark mode: yes or no. The audit counts it as an environmental 0, but it is the owner's call.
2. **IA re-derivation from the primary task.** Ask, in order: what does the buyer need to (a) know it is for them, (b) trust it, (c) act? Map each existing section to a, b or c and decide keep, merge or cut. The expected outcome is that the current order survives with the hero facts strip merged into Nosotros (E-STR-4). If so, say that explicitly and give the reasoning.
3. **Hero wireframe, low-fi, labelled,** for 1366×768 and 375×812, compared side by side with the current screenshots (`fold-1366x768.png`, `fold-375x812.png` in the audit scratchpad). It contains the headline, lead, primary and secondary CTA, the note line, and one product visual: the existing dashboard mock **without** chips, glow or grid, captioned as illustrative.
4. **Token spec.** Copy the shape below and fill in the values.
   - Spacing on a 4px base: `--space-1: 4px` … `--space-10: 64px`, about 10 steps. Map each of the 34 literal values to its nearest step and keep that table in the spec.
   - Type: 7 steps, `--text-xs: 12px` / `--text-sm: 13.5px` / `--text-base: 16px` / `--text-md: 18px` / `--text-lg: 21px` / `--text-xl: clamp(28px, 3.4vw, 38px)` / `--text-display: clamp(34px, 4.4vw, 50px)`. The display value is the current `hero.css:16`; keep it, because of the four-line budget.
   - Radius: 3 steps, `--radius-sm: 8px` / `--radius-md: 14px` / `--radius-pill: 999px`.
   - Shadow: 3 steps, merging `--shadow-md` with `--shadow-lg`.
   - Motion: `--ease-out: cubic-bezier(.2,.7,.3,1)` (currently a literal in about 15 places) and `--duration-fast/base/slow`.
   - z-index: `--z-skip: 60`, `--z-header: 30`, `--z-action-bar: 25`.
   - The mock sub-palette (`mockups.css:16-28`) and the mock font sizes (6.5–9px) **stay local**. They are deliberately a miniature and are exempt from the scale; write that down.
5. **Copy deck.** Every string that changes, in `usted`, with its JSON-LD and `llms.txt` twin in adjacent columns. Use the plain replacements in E-COPY-5 as the starting list. One CTA label everywhere: **"Solicitar propuesta"**. Nav labels must match the section eyebrows ("Casos" and "Proyectos" pick one).

**Verification checklist**

- [ ] Every owner decision has an answer quoted from the owner, not an inference.
- [ ] Every row in the copy deck has all three surfaces filled, or "n/a — page only" with a reason.
- [ ] The token spec has a literal-to-token mapping table covering every value in the Phase 0 inventory.

**Anti-pattern guards**

- No CSS or HTML edits in this phase.
- Do not invent claims (team size, years, client count) to "strengthen" copy.
- Do not put a sector back into the H1, meta, `slogan` or `Organization.description`.

---

## Phase 2: Truth pass (copy facts only)

> **How this serves the primary goal:** this is the cheapest, highest-value
> move. A buyer who spots 8–14 vs 8–16, or "cerrado" vs "referencial", stops
> trusting everything else. It ships before any visual work, so production is
> honest even if the redesign stalls.

**Branch:** `fix/claims-consistency`, based on `docs/redesign-spec`.

**What to implement** (copy the decided wording from `06-spec.md` §1):

- **Durations:** make the phase pills (`index.html:817, 826, 835, 844`), the FAQ answer (`1128`), the JSON-LD (`286`) and `llms.txt:74` agree arithmetically.
- **48 h:** one wording, the same in every occurrence:
  - page: `38` (og), `470`, `573`, `632`, `676`, `1190`, `1319`, `1340`, `1346`;
  - `llms.txt`: `26`, `66`.
  - Also say from when the hours count, matching FAQ `1113-1117`.
- **"Cerrado" vs "referencial":** apply the decided sentence at `462-463`, `623`, `679-680`, `847-850`, `1115`, JSON-LD `278`, and `llms.txt:27, 51, 73`.
- **Mock data:** apply the decision.
  - If captioning, add a visible `<figcaption>`-style line under each mock reading "Ilustración con datos de ejemplo". Add a class in `css/layout/projects.css` / `hero.css`; no inline style.
  - If neutralising, swap the client domain and figures for generic ones (e.g. `panel.suempresa.mx`, round numbers).
  - Mock text stays `aria-hidden`; the caption must **not** be.
- **`llms.txt:82-83`:** remove the outcome claims that exist only as testimonial quotes, or attribute them as quotes.
- **Bump `<lastmod>`** at `sitemap.xml:5` and `dateModified` at `index.html:262`.

**Documentation references:** CLAUDE.md "FAQ answers are duplicated in three places" and "Nosotros prose is duplicated".

**Verification checklist**

- [ ] `grep -n "48 horas\|48 h" index.html llms.txt` shows one wording only.
- [ ] `grep -n "semanas" index.html llms.txt` shows durations that add up.
- [ ] Each FAQ `<h3>` equals its JSON-LD `name`. Check with a one-off script that extracts both and diffs them.
- [ ] The JSON-LD still parses: `python3 -c` on the extracted `<script type="application/ld+json">`.
- [ ] Captions are visible at 375 and 1440 and do not push the hero CTA below the 1366×768 fold.

**Anti-pattern guards**

- No styling changes beyond the caption class.
- Do not touch the FAQ question text (only answers) unless the copy deck says so, and if it does, change all three surfaces.

---

## Phase 3: Token foundation (no intended visual change beyond rounding)

> **How this serves the primary goal:** a single spacing and type system is
> what makes the page read as deliberate (#3 aesthetic). It is also the
> prerequisite for dark mode, which can only swap colours that are tokens.

**Branch:** `refactor/design-tokens`, based on `fix/claims-consistency`.

**What to implement**

1. Add the Phase 1 §4 token block to `globals.css` `:root`. Copy the existing grouping and comment style at `globals.css:1-102`.
2. Replace literals file by file with their mapped token. Follow the order of the Phase 0 inventory table: header → hero → custom → about → services → process → projects → testimonials → faq → contact → footer → action-bar → error.
   - Spacing: 79 declarations.
   - `font-size`: 27 values collapse to 7.
   - Radii: `mockups.css` is exempt; elsewhere, map to the 3 steps.
   - Shadows: `header.css:33`, `action-bar.css:29`.
   - The easing literal and z-index literals.
3. Fold the retyped alpha literals into tokens with `color-mix()`, the pattern already used at `globals.css:34-46`:
   - `header.css:11, 21` and `action-bar.css:27, 36` become `color-mix(in srgb, var(--color-bg) 88%, transparent)` and similar.
   - Delete the "change by hand" note at `header.css:9-10`.
4. Make the eyebrow style one rule. It is currently triplicated at `globals.css:205-214`, `about.css:26-32` and `contact.css:186-191`. Keep the `globals.css` rule and drop the other two in favour of the shared class in markup.
5. Delete the duplicate `h1,h2,h3` block (`globals.css:121-134`) and the reset overlaps listed in E-STR-6.

**Verification checklist**

- [ ] `grep -nE '[0-9]+(\.[0-9]+)?px' css/layout css/components css/base/globals.css`: every remaining hit is inside `:root`, `mockups.css`, a `@media`/`@container` condition, a `1px` hairline, or carries a comment justifying it. List the survivors in the PR.
- [ ] `grep -nE '#[0-9a-fA-F]{3,8}|rgba?\(' css/ | grep -v globals.css | grep -v mockups.css` returns nothing except the `#000` in the mask (`hero.css:71-72`), which is removed in Phase 4 anyway.
- [ ] Before/after screenshots at 320 / 375 / 768 / 1366×768 / 1440 show only rounding-level shifts. Attach them to the PR.
- [ ] The H1 is still ≤ 4 lines and the CTA is above the fold at 1366×768.
- [ ] `404.html` still renders, since it shares `globals.css`.

**Anti-pattern guards**

- No layout or decoration changes in this phase; it is a refactor.
- Do not tokenise the mock miniature scale.
- Do not introduce a utility-class system. The project is BEM and one-stylesheet-per-section.

---

## Phase 4: Retire the trend layer

> **How this serves the primary goal:** the decoration is what dates the page
> (#7) and competes with the headline and CTA (#5). Removing it gives the
> buyer's eye one path: headline → lead → CTA. It also stops four infinite
> animations.

**Branch:** `feat/retire-decoration`, based on `refactor/design-tokens`.

**What to implement**

- **Aurora.**
  - Delete `css/base/background.css` and its `<link>` at `index.html:368` and `404.html:30`.
  - Delete the aurora tokens at `globals.css:51-55`.
  - Simplify the frosted header and action bar: drop the `backdrop-filter` blur that existed so "the aurora keeps drifting behind it" (`header.css:17-26`, `action-bar.css:34-40`), unless it is still wanted for content scrolling under the header. Decide by screenshot.
- **Gradient text.**
  - Remove the span at `index.html:456`; the H1 becomes plain text.
  - Delete `.text-gradient` at `globals.css:284-298`.
- **Hero decoration.**
  - Delete the code chip and status chip markup (`index.html:481-500`, including the comments).
  - In `hero.css`, delete `::before` grid / `::after` glow (`52-81`), the chips (`89-189`), and `hero-float` (`275-279`) with its uses (`260-272`).
  - Keep `hero-rise` (from-only, `backwards`) and `.hero__visual .mock` (`83-87`), replacing its `--shadow-float` with a scale shadow.
  - Delete the tokens `--color-grid-line`, `--color-hero-glow`, `--color-code-fn` and `--color-code-string`.
- **Brand gradient.** Decide in the spec. The default is to retire `--gradient-brand` in favour of solid `--color-primary` on:
  - the primary button (`globals.css:242-258`; keep the inset-overlay hover technique, which still eases);
  - the process pills (`process.css:17-28`) and connectors (`40-50`, now a solid hairline);
  - the custom column border (`custom.css:68-75`) and markers (`125-127`);
  - the services top rule (`services.css:207-216` plus `cards.css:46-52, 65-67`). Delete it; the card's border and shadow hover remain.
- **Dark-band glow** (`custom.css:22-32`): delete it, and delete `--color-ink-glow*`. The band keeps the solid ink panel.
- **Service numerals 01–06** (`index.html:716-795`, `services.css:200-205`): remove them. They carry no information and fail contrast (E-VIS-5).
- **CLAUDE.md.** In the same PR, rewrite the paragraphs that describe removed features: the aurora/background paragraph, the hero chips/grid paragraph, and the mockups paragraph if anything changes. Leave none describing code that no longer exists.

**Verification checklist**

- [ ] At 1440px after 5 s idle, `document.getAnimations().length === 0`.
- [ ] `grep -rn "aurora\|text-gradient\|hero__chip\|gradient-brand\|ink-glow\|grid-line\|hero-glow" css/ index.html 404.html CLAUDE.md` returns nothing, apart from intentional history notes, if any.
- [ ] Lighthouse a11y is still 100. No horizontal overflow from 320 to 1440 (`scrollWidth === clientWidth`).
- [ ] `404.html` loads with no 404 for `background.css`.
- [ ] The primary button's hover still eases, with no snap.

**Anti-pattern guards**

- Do not replace a removed effect with a new one ("subtle noise texture", "mesh gradient"). A new glow is still a glow.
- Do not touch the mock animations in `mockups.css`. They are content-bound and reduced-motion-gated.

---

## Phase 5: Restraint and wayfinding

> **How this serves the primary goal:** one CTA label, nav labels that match
> what they open, and no duplicated fact lists. The buyer always knows where
> they are and what the button does (#4, #10).

**Branch:** `feat/hero-and-wayfinding`, based on `feat/retire-decoration`.

**What to implement** (from `06-spec.md` §2–3):

- Merge or remove the hero facts strip (`index.html:571-588`, `hero.css:191-226, 288-298`) as the IA decision says. The Nosotros commitments panel (`673-698`) stays as the single home for those facts.
- Use one CTA label at `443`, `466`, `631` and `1397`. The contact `<h2>` (`1187`) and submit (`1317`) follow the copy deck.
- Make the nav labels (`436-440`) match the section eyebrows and headings (`638`, `704`, `807`, `854-855`, `1093`).
- Re-check the hero against the wireframe: headline, lead, CTA pair, note, one mock with caption.
- Re-measure the H1 against the four-line budget at 1366×768 and update the `hero.css:9-14` comment if the numbers change.

**Verification checklist**

- [ ] `grep -c "Solicitar propuesta" index.html` equals the number of CTA anchors, and no "Solicitar una propuesta" remains.
- [ ] At 1366×768, the CTA bottom edge is < 768. Measure with `getBoundingClientRect`.
- [ ] Screenshots at 375 and 1366 sit next to the Phase 1 wireframe in the PR.

**Anti-pattern guards**

- Do not add `#a-la-medida` or `#testimonios` to the nav; six links crowd the row (CLAUDE.md).
- Do not move or rename any section `id`, because the JSON-LD `@id`s and anchors depend on them.

---

## Phase 6: Buyer language

> **How this serves the primary goal:** a gerente general must understand
> every service and phase without knowing what an API or an ERP is (#4).

**Branch:** `feat/plain-language`, based on `feat/hero-and-wayfinding`.

**What to implement.** Apply the copy deck from `06-spec.md` §5 across all three surfaces in one commit per content unit:

- services: cards, `hasOfferCatalog`, llms;
- process phases: page, `ItemList`, llms;
- #a-la-medida columns: page, llms;
- Nosotros: page, llms;
- FAQ answers: page, JSON-LD, llms;
- meta and `og`/`twitter` descriptions, `Organization.description`, `slogan`. `twitter:description` (`index.html:61`) must follow the capability axis like the others.

Keep technical terms only where the buyer needs them, glossed on first use, for example "integraciones (API): conectamos sus sistemas".

**Verification checklist**

- [ ] Run the FAQ verbatim diff from Phase 2 again.
- [ ] `grep -n "SaaS\|relevamiento\|reportería\|puesta en producción\|última milla" index.html llms.txt` returns nothing, or each hit has a gloss.
- [ ] No `tú` forms: `grep -nw "tu\|tus\|puedes\|quieres\|necesitas" index.html llms.txt js/` returns nothing.
- [ ] No sector appears at the top of the funnel. Grep the H1, meta, `slogan` and `Organization.description` for agro, logística, tequila and fitness.
- [ ] `sitemap.xml` `<lastmod>` and `dateModified` are bumped.

**Anti-pattern guards**

- No new claims.
- Do not shorten the H1 to the point that `title` and `slogan` stop matching it; they are the same string.

---

## Phase 7: Form states, contrast and dark mode

> **How this serves the primary goal:** the form is the only conversion path.
> Every state must speak `usted`, show progress, and survive the user's
> environment (#8, #9).

**Branch:** `feat/form-states-dark-mode`, based on `feat/plain-language`.

**What to implement**

- **Form.**
  - Add `novalidate` to `<form>` (`index.html:1236`). `contact-form.js:112-121` already validates and focuses the first invalid field.
  - Give the form an accessible name: `aria-labelledby` pointing at the contact `<h2>`.
  - Mark required fields in their labels (`1256`, `1286`, `1301`), and say once that the phone is optional.
  - **Sending state.** In `contact-form.js` around the existing `.loading` / `disabled` lines (`124-127`, `finally` `155-158`):
    - set `aria-busy="true"` on the form;
    - swap the submit text to "Enviando…" and restore it afterwards.
    - Copy the existing pattern of storing a value before `try` and restoring it in `finally`.
  - Retire the duplicate success-panel buttons. Give `index.html:1352` and `1359` the classes `btn btn--primary` and `btn btn--secondary`, then delete `contact.css:252-285` and `332-335`.
  - Add `:active` (pressed) states to `.btn--primary` / `.btn--secondary`, and a hover style to `.form__control`.
- **Contrast.** Raise `--color-text-faint` (`globals.css:62`) to ≥ 4.5:1 on `--color-surface`. Fix `--color-text-subtle` on the tints, or stop using it there (E-VIS-5).
- **Dark mode** (if the owner approved it in Phase 1):
  - Add `@media (prefers-color-scheme: dark) { :root { … } }` after the light `:root` in `globals.css`, redefining only colour tokens. The existing ink band tokens (`globals.css:37-44`) are a ready-made starting palette.
  - Add `color-scheme: light dark` on `:root`, plus `<meta name="color-scheme" content="light dark">` and a dark `theme-color` meta, in both pages.
  - The mock sub-palette (`mockups.css:16-28`) needs its own dark values inside the same media query.
  - Regenerate nothing in `assets/`. The logo is `--color-primary` on transparent; check that it is legible on the dark background, and record the result in the PR.
- **CLAUDE.md.**
  - Document the dark token set.
  - Fix the stale `HowTo` sentence and the Cloudflare/`_headers` facts found in Phase 0. Owner input is needed on what Cloudflare is configured to do, so record the observed facts only.

**Verification checklist**

- [ ] An empty submit shows the custom `usted` messages and the summary, with no native bubble (Playwright: click submit, assert `.form__error` exists).
- [ ] While the fetch is pending, the form has `aria-busy="true"` and the button reads "Enviando…". Check with a mocked slow FormSubmit response; do not post to production.
- [ ] Contrast for every text token passes AA in both themes. Script it with the WCAG luminance formula in `browser_evaluate`, as in the audit.
- [ ] Emulated dark mode screenshots at 375 and 1440 show no unreadable mock, border or focus ring.
- [ ] Lighthouse accessibility is 100 in both themes.

**Anti-pattern guards**

- Do not rewrite `contact-form.js` or its validators. These are additive edits around the existing flow.
- Do not use `light-dark()` or `:user-invalid`; see Phase 0.
- Do not move the action bar in the DOM without re-reading the CLAUDE.md action-bar contract. If you do move it, keep `data-hidden inert` in the markup.

---

## Phase 8: Verification and re-audit

> **How this serves the primary goal:** this phase proves the buyer-facing
> outcome rather than assuming it, against the same rubric that failed the page.

**Branch:** none. Run it on the top of the chain before merging the stack.

**Checklist (the cutover criteria from the handoff)**

- [ ] Lighthouse mobile: Accessibility 100, Performance ≥ 90. Run it locally and against a deployed preview if one exists; GTM's 119 KB is out of scope and should be noted as such.
- [ ] 0 infinite idle animations; reduced motion leaves 0 running animations.
- [ ] No colour or spacing literal outside `:root` (except the mock miniature exemption). Use the greps from Phase 3.
- [ ] AA contrast for every text token in both themes.
- [ ] No horizontal overflow at 320, 375, 768, 1366 or 1440.
- [ ] The CTA is above the fold at 1366×768, and the H1 is ≤ 4 lines.
- [ ] FAQ, services, Nosotros, #a-la-medida and process are identical across the page, the JSON-LD and `llms.txt`; the FAQ `<h3>` matches verbatim. The JSON-LD parses.
- [ ] Without JS (scripts disabled), the header links stay visible and wrap, and the action bar stays hidden.
- [ ] `404.html` renders correctly in both themes.
- [ ] `grep` checks from Phases 4 and 6 are clean.
- [ ] Re-run `/claude-mem:design-is` and save it as a new dated folder. Target ≥ 20/30 with no principle at 0. If any principle still scores ≤ 1, list it as a follow-up; do not re-score.

**Merge order:** merge the PRs bottom-up (spec → truth → tokens → decoration → wayfinding → language → form/dark). After each merge, retarget the next PR at `master`. Production then moves one reviewed step at a time.

---

## Not now (explicit deferrals)

- **GTM weight:** removing or deferring the empty GTM container (119 KB) is an analytics decision for the owner.
- **The 19 render-blocking stylesheets:** concatenating them would need a build step, which the project bans.
- **FormSubmit:** activating it and swapping in the hash is pending, and is tracked in CLAUDE.md.
- **Privacy notice (aviso de privacidad):** also tracked in CLAUDE.md.
- **Cloudflare:** cleaning up the scripts it injects (email obfuscation, Web Analytics) requires access to the Cloudflare dashboard.
- **New sections or claims:** none, unless the owner supplies them.
- **Mobile CLS of 0.116** seen in one trace when `data-enhanced` collapses the header: Lighthouse did not reproduce it. Investigate only if field data confirms it.
