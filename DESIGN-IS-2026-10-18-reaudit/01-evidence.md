# 01 — Evidence (re-audit)

Gathered by two read-only subagents (structure + copy; visual + weight) plus
the orchestrator's own Phase 8 measurements. Every line carries its source.
Baseline anchors refer to `DESIGN-IS-2026-10-18/01-evidence.md`.

## E-STR — Structure

- **E-STR-1** 33 interactive elements in the body (16 `a`, 3 `button`, 6 `summary`, 7 `input`, 1 `textarea`); 4 real form fields, one optional (index.html:1211–1262). Baseline 39 counted `details`+`summary` separately; the markup is otherwise unchanged.
- **E-STR-2** Max depth 14 (Urban Reps mock, index.html:974); hero 13 at the mock, H1 depth 7, CTA depth 8; form fields depth 11. Unchanged from baseline.
- **E-STR-3** 4 CTAs to `#contacto`, all labelled "Solicitar propuesta" (index.html:444, 468, 594, 1357). Baseline had four wordings. `404.html` still carries two labels (52 "Solicitar propuesta", 66 "Solicitar una propuesta"), out of scope.
- **E-STR-4** Facts still repeat: "48 h" 8× (472, 595, 639, 1064, 1141, 1279, 1300, 1306), two-week cycle 7×, "sin costo" 4×. The hero facts strip is gone (now one `hero__note` line, 471–474).
- **E-STR-5** Nav → heading: Casos → "Casos en operación" (802) fixed; Proceso → "Metodología en cuatro fases" (754) is a mild mismatch.
- **E-STR-6** Dead code: 0 unused CSS classes, 0 unused custom properties, 0 unused JS exports. 18 stylesheets (baseline 19).
- **E-STR-7** Decorative elements left: hero eyebrow pill repeating the H1 wording (455), hero dashboard mock (483–547), 6 service icons (673–740), process "FASE 0n" numerals and connector (757–785, process.css:38), 3 case mocks (805, 866, 943), FAQ markers, testimonial initials avatars (1018, 1032). Removed since baseline: code chip, status chip, blueprint grid, glow, gradient H1 text, aurora.

## E-VIS — Visual

- **E-VIS-1 Spacing** Rendered at 1440: [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64], all on the `--space-*` scale or the two clamps (globals.css:77–86, 125–126). 7 untokenised offsets remain, each a glyph or parking offset (faq.css:73, globals.css:244, 407, contact.css:135, custom.css:115–116, process.css:41). Baseline 34 values / 79 literals.
- **E-VIS-2 Type** 7 sizes rendered outside mocks at 1440 [12, 13.5, 15, 17, 20, 38, 50] and 7 at 375. Baseline 24.
- **E-VIS-3 Radii / buttons** 4 radii = the 4 tokens. 5 button treatments; the success panel now reuses `.btn--primary`/`.btn--secondary`. `.action-bar__wa` still hand-rolls a secondary-small button (action-bar.css:52–69), with a weaker hover and no `:active`.
- **E-VIS-4 Colour** 36 `--color-*` + 12 `--mock-*` tokens, all referenced; 0 colour literals outside `:root` blocks. Baseline ~20 literals.
- **E-VIS-5 Contrast** Lowest primary text: light 5.80:1 (`--color-text-subtle` on bg), dark 6.12:1; 0 fails in either theme. Brand-colour indicators in dark mode 8–10:1 (tailored border, FAQ open marker, mock route, 404 code). **Exception:** placeholders use the UA default #757575 — 4.46:1 light, 3.69:1 dark (index.html:1216, 1234, 1250, 1268). Baseline worst 3.32.
- **E-VIS-6 States** Empty (labels mark obligatorio/opcional; custom summary, no native bubble), field error, network error (`role=alert`, `aria-busy` cleared first), loading ("Enviando…", `aria-busy`, disabled, width kept), success (focus moved), focus (accent outline), disabled (button), pressed (both `.btn` variants), input hover: all present. Rough: placeholders (E-VIS-5), action-bar WhatsApp button has no pressed state.
- **E-VIS-7 Dark mode** Honoured: `color-scheme`, per-scheme `theme-color`, token block (globals.css:133–176), mock block (mockups.css:38). Screenshots at 375 and 1440 checked, nothing unreadable. Primary CTA's brand glow is prominent on the dark page.
- **E-VIS-8 Fold 1366×768** H1 4 lines (220px), CTA bottom 660–680px. Decorative hero visual 18.3% of the viewport, no aurora. Baseline 25% + full-viewport aurora.

## E-COPY — Copy and honesty

- **E-COPY-1** No superlatives, no dark patterns; phone genuinely optional.
- **E-COPY-2** "Plazo" reconciled: closed at signing (472, 586, 642, 1066), referential until scope is defined (795–796). Baseline contradiction fixed.
- **E-COPY-3** Every mock captioned "Ilustración con datos de ejemplo." (548, 853, 930, 987). Case mocks still show figures under real client names, now labelled.
- **E-COPY-4** Phase durations 1 + 2 + 4–10 + 1 = 8–14 weeks = FAQ (1079), JSON-LD, llms.txt. Baseline 8–16 vs 8–14 fixed.
- **E-COPY-5** Baseline jargon gone (SaaS multiusuario, control de acceso por rol, CRM, pasarelas, levantamiento, reportería, code chip). API (720) and "última milla" (619, 935) glossed. Unglossed but domain-plain: "en producción", "trazabilidad de lotes", "monitoreo".
- **E-COPY-6** `usted` everywhere including JS messages and 404. Native `tú` bubbles appear only with JS off, by design (native validation is the no-JS fallback).
- **E-COPY-7** Claims made once and nowhere else: FAQ "acceso permanente al tablero en línea" (1090); "estado de entrega en tiempo real" (936).

## E-WGT — Weight and friction

- **E-WGT-1** First-party JS 8 modules, ~9.7 KB gzip. Production adds GTM ~119 KB + Clarity ~27 KB (baseline figures; not loaded locally by design) → ~166 KB.
- **E-WGT-2** 31 requests / ~119 KB gzip first load locally; 18 render-blocking stylesheets.
- **E-WGT-3** Lighthouse mobile (local): Accessibility, Best Practices, SEO 100 in light and dark. Performance not runnable through the available tooling; throttled trace LCP 3.6 s on an uncompressed local server (not comparable to production's 4.1 s). **CLS 0.118**, reproduced by Lighthouse, from the header collapsing when `nav[data-enhanced]` is set (trace: `.container` / `.nav__brand` shift at ~4.1 s).
- **E-WGT-4** 0 running animations after 5 s idle; 0 under reduced motion (11 guards). Baseline 4 infinite.
- **E-WGT-5** 0 modals, toasts or badges on load.

## E-A11Y — Accessibility

- **E-A11Y-1** Lighthouse a11y 100 both themes; no-JS: all 5 header links visible and wrapped, action bar hidden (`data-hidden` + `visibility: hidden`); form has an accessible name; overflow 0 at 320/375/768/1366/1440.
