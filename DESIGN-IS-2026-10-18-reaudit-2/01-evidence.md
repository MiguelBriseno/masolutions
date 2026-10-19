# 01 — Evidence (second re-audit)

Two read-only subagents gathered this: one on structure and copy (repo at
`master` = production), one on visual and weight (live https://masolutions.mx/,
Playwright and Lighthouse CLI). Every line carries its source. Deltas are
against `DESIGN-IS-2026-10-18-reaudit/01-evidence.md`.

## E-STR — Structure

- **E-STR-1** 33 interactive elements (16 `a`, 3 `button`, 6 `summary`, 7 `input` of which 4 hidden/honeypot, 1 `textarea`). The form has 4 real fields and 1 is optional (index.html:1165). Unchanged.
- **E-STR-2** Hero max depth 8 (was 13), H1 at 7, CTA at 8 (index.html:472, 484). Page max 14 inside the Tonalli mock (766).
- **E-STR-3** 4 CTAs to `#contacto`, all labelled "Solicitar propuesta" (461, 484, 535, 1296). `404.html` still uses two labels (52, 66); out of scope.
- **E-STR-4** Repeated facts: "48 h" ×8, two-week cycle ×6, "sin costo" ×4, "cerrados" ×5, monthly support ×4, documentation ×4. Two "48 h" sit in the same success panel (1239, 1245). The company's own number is the phone field's placeholder (1173).
- **E-STR-5** Nav → heading: Proceso → "Metodología en cuatro fases" (695) and Preguntas → "Dudas habituales…" (984) are mild mismatches. The other three match.
- **E-STR-6** Dead code: 0 unused classes, custom properties, keyframes or exports. Every leftover of the removed elements returns 0 hits.
- **E-STR-7** Decorative elements left: 10 section eyebrows, most restating the nav label or the H2 (502, 542, 608, 694, 742, 947, 982, 1076, 1230); 6 service icons; "FASE 0n" pills and the connector; 3 captioned case mocks; check/cross discs (custom.css:90–116); FAQ ± marker; success check; logos. Removed since the last audit: hero eyebrow pill, hero mockup, testimonial avatars.

## E-VIS — Visual (production)

- **E-VIS-1 Spacing** At 1440 every rendered value is a `--space-*` step or one of the two clamps. The only margin/padding/gap literal left is faq.css:73. Glyph and icon sizes stay literal.
- **E-VIS-2 Type** 7 sizes at 1440 and 7 at 375, all `--text-*`.
- **E-VIS-3 Radii / buttons** 4 radii = 4 tokens. Buttons are 4 `.btn` combinations plus the toggle, with nothing hand-rolled. The action-bar WhatsApp now shares `.btn--secondary` hover and pressed (index.html:1298).
- **E-VIS-4 Colour** 0 literals outside token blocks.
- **E-VIS-5 Contrast** Lowest text: 5.80:1 light, 6.12:1 dark. Placeholders: 5.41:1 light, 5.87:1 dark (were 4.46 / 3.69).
- **E-VIS-6 States** All present: empty, field error, network error, loading, success, focus, disabled, pressed (including WhatsApp), input hover. Tested with FormSubmit mocked.
- **E-VIS-7 Dark** Honoured; nothing unreadable at 375 or 1440. The primary CTA's coloured brand glow is still prominent on the dark page.
- **E-VIS-8 Fold 1366×768** H1 3 lines (165px), CTA bottom 522px, **0% decoration** in the first viewport (was 18.3%). At 1440 the hero is one left-aligned column, leaving ~36% of the content width as plain background to the right of the H1. The dark band below follows the same left-aligned pattern.
- **E-VIS-9 Detail bug** Scrolling to `#servicios` and back to the top leaves "Servicios" `.active` while the hero is on screen. The observer excludes `#top` and never clears (navbar.js:13–30).
- **E-VIS-10** The three WhatsApp links open a new tab with no visual cue (1087, 1250, 1297).

## E-COPY — Copy and honesty

- **E-COPY-1** No superlatives and no dark patterns. The phone field is genuinely optional.
- **E-COPY-2** "tablero" appears 0 times in index.html, the JSON-LD and llms.txt. Phase durations sum to 8–14 weeks, matching the FAQ. Every mock is captioned as example data.
- **E-COPY-3** Claims made once with nothing else backing them:
  - "que siguen respondiendo cuando su operación crece" (635), a soft scalability claim;
  - "tiempos de respuesta acordados" (673);
  - "estado de entrega en tiempo real" (877, a description of a delivered case);
  - the testimonial "bajaron de forma notable" (969).
- **E-COPY-4** Not a UI pattern, but a disclosure gap: the form collects personal data and Clarity records sessions with no aviso de privacidad. CLAUDE.md records this as the owner's decision.
- **E-COPY-5** Jargon: "API" and "última milla" are glossed. "ciclo" is used in the FAQ (1029) before the page defines it; the process section says "etapas de dos semanas" (720). Domain-plain terms are left unglossed: "en producción", "trazabilidad", "migrar".
- **E-COPY-6** `usted` everywhere, including JS messages and the 404.
- **E-COPY-7** Parity: FAQ page and JSON-LD match 6/6. llms.txt questions match verbatim, with answers in the impersonal voice the spec allows. Service cards match `hasOfferCatalog` 6/6.

## E-WGT — Weight and friction (production)

- **E-WGT-1 JS** First-party 15.9 KB (8 modules). Third-party: GTM 119 KB (container still empty) plus Clarity ~27 KB, about 146 KB in total. The Cloudflare beacon is CSP-blocked.
- **E-WGT-2** 36 requests and 271 KB on first load. 18 render-blocking stylesheets plus the small inline head script.
- **E-WGT-3 Lighthouse mobile, production, light** (CLI 12.8.2, simulated):
  - Performance **86** (baseline 78), Accessibility 100, Best Practices 75, SEO 100.
  - LCP 3.6 s, **CLS 0.017** (was 0.118), TBT 120 ms.
  - Best Practices loses points to the two Cloudflare-injected scripts the CSP blocks and to the Clarity/GTM third-party cookies.
  - Dark: Accessibility 100.
  - DevTools trace (4× CPU, Slow 4G): LCP 3.1 s, CLS 0.01.
- **E-WGT-4** 0 running animations at idle, and 0 under reduced motion.
- **E-WGT-5** 0 modals, toasts or badges on load.
- **E-WGT-6** Console: 2 errors per load, both from Cloudflare-injected scripts; 0 from the site. The inline script's hash matches the served HTML.
