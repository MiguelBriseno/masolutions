# 04 — Handoff prompt (second re-audit)

````
/make-plan Refine the masolutions.mx landing page based on a Dieter Rams audit (total 21/30).

Verdict paragraph (quoted from 03-verdict.md):
> REFINE — 21/30 with no principle at 0: the redesign has cleared the threshold, and what remains is element-level polish plus two owner decisions.

Keep (already strong, do NOT touch in this pass):
- Principle #2 (useful) scored 3 — Evidence: single CTA label "Solicitar propuesta" at index.html:461, 484, 535, 1296; CTA bottom 522px at 1366×768; four fields, one optional; every form state present. Regression check: grep the CTA labels, measure the CTA against the 1366×768 fold, and re-run the mocked-FormSubmit state walk (empty, loading, error, success).
- Principle #3 (aesthetic) scored 3 — Evidence: all rendered spacing, type and radii come from the token scales in css/base/globals.css; 0 colour literals outside token blocks; buttons are one .btn system. Regression check: grep -nE '#[0-9a-fA-F]{3,8}\b|rgba?\(' css/ outside globals.css/mockups.css returns nothing; rendered font sizes stay at 7 per viewport.
- Principle #5 (unobtrusive) scored 3 — Evidence: 0% decoration in the first viewport, 0 idle animations, 0 overlays. Regression check: document.getAnimations() running count is 0 after 5 s idle; no element is added to the hero.

Fix in priority order (verbatim from the audit):
1. #10 — cut the restatements: drop the section eyebrows that repeat the nav label or the H2 (keep "COMPROMISOS DE TRABAJO" and "¿POR QUÉ A LA MEDIDA?"); drop the "FASE 0n" pills or merge the number into the phase title; remove one of the two "48 h" lines in the success panel (index.html:1239, 1245).
2. #6 — publish an aviso de privacidad (owner decision; the form collects nombre, teléfono, email and detalle and Clarity records sessions, which the LFPDPPP requires disclosing); soften or back "siguen respondiendo cuando su operación crece" (index.html:635).
3. #8 — fix the last details: clear the active nav link when the hero is in view (js/components/navbar.js:13–30); use a neutral example instead of the company's own number as the phone placeholder (index.html:1173); add a visual cue on links that open WhatsApp in a new tab.
4. #4 — make the labels match: align "Proceso" with "Metodología en cuatro fases" (index.html:695) and "Preguntas" with "Dudas habituales…" (984), in either direction; define "ciclo" where the two-week rhythm is introduced (720).
5. #7 / #9 — replace the coloured --shadow-brand glow with a neutral shadow; configure or remove the empty GTM container (119 KB, owner decision).

Out of scope for this refine pass: the hero layout (now a single text column, by owner decision), the case mockups, the dark palette, the form logic and validators, the nav-pending header mechanism and its CSP hash, any new section or claim.

Deliverables for the plan:
- Per fix: target files, exact change, verification step.
- Any FAQ, services or Nosotros text change applied to the page, the JSON-LD and llms.txt together.
- Regression checklist for every Keep item above.

Anti-patterns to guard against:
- Adding new abstractions where a direct change suffices.
- Restyling areas that already scored 3.
- Scope creep into structural redesign.
- Writing a privacy notice's legal content without the owner supplying or approving it.
````
