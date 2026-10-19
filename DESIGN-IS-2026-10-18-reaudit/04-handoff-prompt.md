# 04 — Handoff prompt (re-audit)

````
/make-plan Redesign the masolutions.mx landing page (follow-up pass). Current design scored 19/30 on a Dieter Rams re-audit with weakest principles #1 innovative (1) and #10 as little design as possible (1); no principle at 0.

Verdict paragraph (quoted from 03-verdict.md):
> REDESIGN — by the rule, at 19/30: one point under the REFINE threshold of 20, with no principle at 0 and every load-bearing principle at 2 or 3. In substance nothing asks to start over from purpose: the gaps are element-level, and every move is a refine-sized change to the current structure.

Why redesign and not refine: the total is below the 20-point threshold; no load-bearing principle failed (#2 = 3, #4 = 2, #6 = 2).

Preserve from current design:
- Token scales and dark theme in css/base/globals.css (:root lines 1–131, dark block 133–176): spacing --space-1..10, type --text-*, radius sm/md/lg/pill, --color-accent for brand-as-line.
- Single CTA label "Solicitar propuesta" (index.html:444, 468, 594, 1357) and the contact form states (js/components/contact-form.js; contact.css).
- The no-JS contract: header links wrap unenhanced, action bar ships data-hidden inert, native validation only switched off from JS.
- FAQ/services/Nosotros parity between index.html, the JSON-LD @graph and llms.txt.
- Brand colour #5b3df5 and assets/logo.webp.

Discard:
- Hero eyebrow pill that repeats the H1. Evidence: index.html:455. Caused failure on principle #10.
- Testimonial initials avatars. Evidence: index.html:1018, 1032. Caused failure on principle #10.
- Hand-rolled WhatsApp button in the action bar. Evidence: css/components/action-bar.css:52–69. Caused failure on principle #3.

Top moves from the audit (verbatim):
1. #10 — remove what repeats: drop the hero eyebrow pill (index.html:455) and the testimonial initials avatars (1018, 1032); decide on the hero dashboard mock (483–547), 18% of the fold with no task.
2. #8 — finish the last states: tokenise ::placeholder to ≥ 4.5:1 in both themes (index.html:1216–1268; currently 4.46 light / 3.69 dark) and stop the 0.118 CLS from the header collapsing when nav[data-enhanced] is set.
3. #3 — one button system: rebuild .action-bar__wa on .btn--secondary.btn--sm (action-bar.css:52–69) so it shares hover and :active.
4. #6 — the FAQ promise "acceso permanente al tablero en línea" (index.html:1090) is backed nowhere else: owner confirms it and it appears in the process copy, or it is removed from the FAQ, JSON-LD and llms.txt together.
5. #4 / #7 — align the "Proceso" nav label with "Metodología en cuatro fases" (index.html:754), and replace the coloured --shadow-brand glow with a neutral shadow at least in dark mode.

Redesign principles in priority order:
1. #10 as little design as possible — every remaining element breaks a task if removed.
2. #8 thorough — placeholders AA in both themes, CLS ≤ 0.1 on mobile load.
3. #3 aesthetic — one button system, zero hand-rolled variants.

Deliverables for the plan:
- Per move: target files, exact change, verification step (grep, Playwright, Lighthouse).
- States checklist re-run (empty, loading, error, success, focus, disabled, pressed) in light and dark.
- A re-audit at the end saved as a new dated folder; cutover when ≥ 20/30 with no principle at 0.

Anti-patterns to guard against:
- Porting old structure under new styling, or reintroducing any trend decoration removed in the previous pass (aurora, gradient text, glow, chips, blueprint grid).
- Adding a new section or claim the owner has not supplied.
- Changing the FAQ, services or Nosotros text on one surface only.
- Re-scoring instead of re-auditing.
````
