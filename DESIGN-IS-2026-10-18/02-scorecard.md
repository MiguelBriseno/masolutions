# 02 — Scorecard

Scored by the orchestrator against the per-principle anchors. Ties go to the
lower score; the worst instance on the surface is scored, not the average.

1. Good design is innovative — Score: 1/3
   Evidence: E-STR-7, E-VIS-8. Hero = headline + two CTAs + browser mock + floating chips + aurora; dark comparison band; numbered service cards; four-phase timeline; case mocks; testimonials; FAQ accordion.
   Justification: this is the standard SaaS/dev-shop template with minor variation; the CSS-only mockups that rest in their finished state are well built, but they refresh nothing a peer page does not already do, so not 2.

2. Good design makes a product useful — Score: 2/3
   Evidence: E-VIS-8, E-A11Y-2, E-A11Y-4, E-STR-3.
   Justification: the primary task (request a proposal) is above the fold and reachable by keyboard, but adjacent surface adds friction: native `tú` bubbles pre-empt the custom validation on empty submit, the CTA changes its wording four times on the way to the form, and on mobile the sticky CTA sits after the footer in DOM order. Not 3.

3. Good design is aesthetic — Score: 1/3
   Evidence: E-VIS-1, E-VIS-2, E-VIS-3, E-VIS-4.
   Justification: colour is tokenised and the rendered page looks coherent, so there is a visible system (not 0); but spacing has 34 untokenised values, type 24 rendered sizes, radii 12 against 5 tokens and ~5 button treatments, far beyond the "≤2 inconsistencies" of a 2.

4. Good design makes a product understandable — Score: 1/3
   Evidence: E-COPY-5, E-STR-5, E-STR-3.
   Justification: a business buyer meets API, SaaS multiusuario, control de acceso por rol, ERP/CRM, pasarelas de pago, levantamiento and a code snippet in the hero; "Casos" lands on "Proyectos representativos". Jargon is present and several labels are unclear to the stated primary user, which is the anchor for 1.

5. Good design is unobtrusive — Score: 1/3
   Evidence: E-VIS-8, E-WGT-4, E-STR-7.
   Justification: decoration takes ~25% of the first viewport and four infinite animations run on the idle screen (aurora ×2, floating chips ×2), so decoration competes with the headline and CTA rather than staying quiet chrome.

6. Good design is honest — Score: 1/3
   Evidence: E-COPY-2, E-COPY-3, E-COPY-4.
   Justification: no superlatives or dark patterns (so not 0), but there are 2+ inflations: precise "92% rendimiento" / "96% a tiempo" figures shown unlabelled under real client names, "plazos cerrados" vs "plazos referenciales", and phases summing to 8–16 weeks while the FAQ promises 8–14.

7. Good design is long-lasting — Score: 0/3
   Evidence: E-STR-7, E-WGT-4, E-VIS-8.
   Justification: drifting aurora gradient, gradient-filled headline text, radial glow, blueprint grid, floating glass chips and a code-snippet chip are six markers of one specific trend (the 2023–2026 AI/SaaS landing look), beyond the 2–3 of a 1; the page reads as that trend.

8. Good design is thorough down to the last detail — Score: 1/3
   Evidence: E-VIS-6, E-A11Y-4, E-VIS-5.
   Justification: error, success and focus are well done, but loading is rough (no label change, no `aria-busy`), empty is partial (required fields not marked), the error state is bypassed by native validation on the most common failure (empty submit), and the service index numerals fail AA at 3.32:1. That is 2–3 states missing or rough.

9. Good design is environmentally friendly — Score: 0/3
   Evidence: E-VIS-7, E-WGT-1, E-WGT-2, E-WGT-4.
   Justification: the anchor for 0 is met verbatim, because dark mode is ignored (no `prefers-color-scheme` anywhere). Everything else here would rate a 2: ~163 KB JS of which 119 KB is an empty GTM container, 19 render-blocking stylesheets, idle motion that is correctly gated by reduced-motion.

10. Good design is as little design as possible — Score: 1/3
    Evidence: E-STR-4, E-STR-7, E-STR-3.
    Justification: there are 3–5+ removable elements: code chip, status chip, blueprint grid, glow, aurora, the hero facts strip that duplicates the Nosotros commitments panel, and the 01–06 service numerals. Removing any of them breaks no task.

**Total: 9 / 30**

Principles at 0: #7 long-lasting, #9 environmentally friendly (neither load-bearing).
Load-bearing principles: #2 = 2, #4 = 1, #6 = 1.

Not scored, but strong: accessibility foundations (E-A11Y-1–3, E-A11Y-5: Lighthouse 100, full keyboard path, reduced motion everywhere), zero dead code (E-STR-6), CLS 0 and TBT ~0 (E-WGT-3).
