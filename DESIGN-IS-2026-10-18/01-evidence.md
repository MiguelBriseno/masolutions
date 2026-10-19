# 01 — Evidence

Consolidated from five evidence passes (structural, visual, copy & honesty,
weight & friction, accessibility). Line numbers refer to `index.html` unless a
file is named. Lab measurements: Playwright (Chromium) and headless Brave +
Lighthouse 12, 2026-10-18, against `http://localhost:8000` and production
`https://masolutions.mx` (same commit, 6700690).

## E-STR — Structure

- **E-STR-1** 39 interactive elements (16 `a`, 3 `button`, 7 `input`, 1 `textarea`, 6 `details`/`summary`); ~25 tab stops on load.
- **E-STR-2** Max DOM depth 14, reached only inside the case mockups (Tonalli 858→878, Urban Reps 994→1016). Form fields sit at depth 11.
- **E-STR-3** Four "request proposal" CTAs to `#contacto` (443, 466, 631, 1397) using two labels; heading reads "Solicite una propuesta" (1187) and submit "Enviar solicitud" (1317). Three WhatsApp links (1199, 1352, 1400).
- **E-STR-4** Two fact lists repeat each other: hero facts strip (571–588) and Nosotros "Compromisos" panel (673–698) both state 48 h, 2 semanas, documentación incluida. The 48 h claim appears 8×, the two-week cycle 8×.
- **E-STR-5** Nav covers 5 of 9 sections; "Casos" (439) lands on "Proyectos representativos" (855).
- **E-STR-6** Dead code is near zero: 0 unused CSS classes, 0 unused JS exports, 0 unused custom properties. 17 tokens used exactly once; duplicate `h1,h2,h3` blocks at globals.css:121–134.
- **E-STR-7** Decorative elements per section: hero 5 (code chip 484, status chip 490, mock 501, blueprint grid hero.css:63, glow hero.css:78) + gradient text 456; services 12 (6 icons, 6 gradient rules); casos 3 mocks; FAQ 6 markers; page-wide aurora `body::before/::after` (background.css:13–36).

## E-VIS — Visual system

- **E-VIS-1 Spacing:** no spacing scale. Only `--container-pad` and `--section-gap` are tokens (globals.css:100–102). 34 distinct literal px values in padding/margin/gap (1, 2, 5, 6, 7, 9, 11, 13, 14, 15, 17, 19, 22, 26, 34, 44, …), 79 hardcoded declarations, 432 px literals outside `:root`. Examples: hero.css:33 `30px`, about.css:45 `13px`, globals.css:243 `13px 22px`, globals.css:279 `10px 17px`.
- **E-VIS-2 Type:** 24 distinct rendered sizes at 1440px (6.5–50px); 27 distinct `font-size` declarations, none tokenised; five sizes within 2px of each other (11.5, 12, 12.5, 13, 13.5). Families: IBM Plex Sans + Space Grotesk + an untokenised mono stack (hero.css:108).
- **E-VIS-3 Colour:** 44 colour tokens in `:root` plus a second set of 11 `--mock-*` hex tokens (mockups.css:17–27); 63 unique literals in css/, ~20 outside `:root` (header.css:11/21 retype `--color-bg` with alpha; action-bar.css:27–36; mockups.css:51, 111, 115, 296, 359).
- **E-VIS-4 Radius / shadow / buttons:** 12 rendered radii vs 5 tokens (`md` 14 and `lg` 16 differ by 2px); 4 hardcoded shadows (action-bar.css:29, header.css:33, mockups.css:51, 296); `--shadow-md`/`--shadow-lg` near-duplicates; ~5 button treatments. `.form__success-link`/`-reset` (contact.css:252–285) re-implement primary/secondary with other padding, weight and fill.
- **E-VIS-5 Contrast (worst primary text):** `.service-card__index` `#8b8ba3` on `#fff` = **3.32:1, fails AA** (services.css:46, token `--color-text-faint` globals.css:62). `--color-text-subtle` is 4.31–4.44 on primary-soft and mock tints. Dark band `#a-la-medida` passes (worst 8.88). H1 gradient worst stop 4.40 (passes as large text).
- **E-VIS-6 States:** field error ✓ (contact.css:86, contact-form.js:187–193); network error ✓ (`role=alert`, contact-form.js:205–216); success ✓ rich (contact.css:172–336); focus-visible ✓ (globals.css:153); disabled — button only (globals.css:274); **loading weak** (opacity .6, no label change, no `aria-busy`, contact.css:157); **empty partial** (required fields not marked visibly); no `:active` styles anywhere; no hover on inputs.
- **E-VIS-7 Dark mode:** none. No `prefers-color-scheme` or `color-scheme` in any file; emulated dark renders the light page (scratchpad `dark-emulated-1440.png`).
- **E-VIS-8 Fold 1366×768:** primary CTA visible (y 560–612); H1 4 lines (220px). Decorative hero visual ≈ 576×443px ≈ **25% of the viewport**, plus the full-viewport aurora.

## E-COPY — Copy & honesty

- **E-COPY-1** No superlatives (no líder/mejor/garantía/100%); no dark patterns; "sin costo ni compromiso" stated 3× and true (phone genuinely optional, contact-form.js:29).
- **E-COPY-2 Contradictions:**
  - "Alcance cerrado, plazos comprometidos" (462–463) and "Alcance, precio y plazo / Cerrados" (679–680) vs "Los plazos indicados son referenciales" (847–850).
  - Process phases add to 1+2+(4–12)+1 = **8–16 weeks** (811–844) but the FAQ says **8–14 weeks** (1128, JSON-LD 286, llms.txt:74).
  - 48 h is unqualified (470, 632, 676, og 38), "hábiles" elsewhere (1190, 1319, 1340), unqualified again in success step 2 (1346); the FAQ (1114) says the proposal follows the initial meeting, the contact lead says it follows the form.
- **E-COPY-3 Unlabelled mock data under real client names:** "tonalli.mx/produccion · RENDIMIENTO 92% · AGAVE (TON) 2,340 · LOTES ACTIVOS 128" (864–887); "Guía AE-48192" ActuarEnvíos (921–975); hero "ENTREGA A TIEMPO 96%" (530), "Ciclo 06 entregado" (497). The only "illustrative" note is an HTML comment (475–483). Nothing visible says ejemplo / datos de muestra.
- **E-COPY-4 Unbacked generalisations:** "arquitectura preparada para escalar" (737), "API documentadas, versionadas y monitoreadas" (768–769), "niveles de servicio acordados" (784–785), "bajaron de forma notable" (1079); llms.txt:82–83 restates testimonial claims as company facts.
- **E-COPY-5 Jargon for a non-technical buyer:** API (457, 461, 765), SaaS multiusuario / control de acceso por rol (735–736), ERP / CRM / pasarelas de pago (622, 767, 907), levantamiento / relevamiento (812–814), reportería operativa (752), evolución funcional (783), puesta en producción (841), última milla (655, 986), hero code chip `const sistema = aLaMedida(...)` (485).
- **E-COPY-6 Register:** `usted` throughout, but native browser validation bubbles ("Completa este campo", `tú`) show on an empty submit because the form lacks `novalidate` (see E-A11Y-4).

## E-WGT — Weight & friction

- **E-WGT-1 JS:** first-party 8 modules, ~13–16.6 KB compressed. Production adds GTM 119 KB gzip (empty container, Lighthouse: 77 KiB unused) and Clarity ~27 KB gzip, ≈ **163 KB** total.
- **E-WGT-2 Transfer:** production 270 KB / 37 requests; **19 render-blocking stylesheets** (Lighthouse estimates 321 ms savings); fonts 63 KB (2 woff2); images ~12 KB, no content rasters.
- **E-WGT-3 Lab metrics:** production mobile Perf 78, LCP 4.1 s, TBT 10 ms, CLS 0 (one DevTools trace showed CLS 0.116 at DOMContentLoaded, attributed to the header collapsing when `nav[data-enhanced]` is set; not reproduced by Lighthouse). Desktop Perf 99. LCP is ~93% render delay, coinciding with the `hero-rise` entrance (60–700 ms delays).
- **E-WGT-4 Idle animation:** 4 infinite animations on the idle screen (`aurora-drift`, `aurora-drift-slow`, `hero-float` ×2); all stop under `prefers-reduced-motion` (0 animations).
- **E-WGT-5 Overlays:** 0 modals or toasts; sticky header plus a 71px fixed action bar on mobile after scroll.
- **E-WGT-6 Production console:** 2 CSP violations from scripts Cloudflare injects (email-decode, Web Analytics beacon); Best Practices 93. Production is served through Cloudflare (`server: cloudflare`).

## E-A11Y — Accessibility

- **E-A11Y-1** Lighthouse Accessibility 100 (all four runs). Single H1, no skipped levels; header/nav/main/footer landmarks + 9 named regions; skip link ✓ (400, globals.css:171–189).
- **E-A11Y-2** Every primary action is keyboard reachable: menu toggle (Enter/Space/Escape with focus return), nav, CTAs, FAQ, form, submit, success reset. Visible 2px focus ring everywhere (globals.css:153); dark-band override (custom.css:155–158).
- **E-A11Y-3** Labels associated, `aria-describedby` and `aria-invalid` wired (contact-form.js:188), success `role=status` with focus moved to it.
- **E-A11Y-4 Gaps:** no `novalidate`, so native bubbles pre-empt the accessible custom validation on empty submit; `<form>` has no accessible name; no sending announcement; the mobile action bar is last in DOM (after the footer), reached by keyboard only after the whole form.
- **E-A11Y-5** `prefers-reduced-motion` covered in 9 places (animations.css:13, background.css:74, hero.css:236, mockups.css:557, faq.css:103/116, cards.css:55, action-bar.css:92, contact.css:306, animations.js:13).

## Known gaps (across passes)

- Contrast ignores the low-alpha aurora overlay; gradient text approximated.
- Submitting state read from code; FormSubmit activation (TODO above the form) not verified live.
- Clarity was blocked by Brave Shields in every run, so its runtime cost is measured by curl only.
- Lab data only, single runs; no CrUX field data.
- 320px not re-checked in this pass (375px only); no horizontal overflow at 360/375/1366/1440.
