# 02 — Scorecard (second re-audit)

Same anchors as the baseline. Ties go to the lower score; the worst instance is
scored, not the average.

1. Good design is innovative — Score: 1/3 (prev 1, baseline 1)
   Evidence: E-STR-7, E-VIS-8.
   Justification: a cleaner version of the standard dev-shop page. Restraint is not a new pattern, and nothing refreshes a peer pattern with a clear improvement, so it is not 2.

2. Good design makes a product useful — Score: 3/3 (prev 3)
   Evidence: E-STR-1, E-STR-3, E-VIS-6, E-VIS-8.
   Justification: one CTA label, CTA at 522px on a laptop fold, four fields with one optional, every form state present; no decoy action on the way.

3. Good design is aesthetic — Score: 3/3 (prev 2)
   Evidence: E-VIS-1–5.
   Justification: spacing, type, radius and colour each render only from their token scales; buttons are one system with nothing hand-rolled; the placeholder colour is tokenised. Neither previous inconsistency survives and no new one was found.

4. Good design makes a product understandable — Score: 2/3 (prev 2)
   Evidence: E-STR-5, E-COPY-5.
   Justification: every primary control is nameable, but two nav labels land on headings with different words (Proceso → Metodología, Preguntas → Dudas habituales) and "ciclo" is used before it is defined. That is more than one weak spot, but below the "2–3 controls unclear" of a 1.

5. Good design is unobtrusive — Score: 3/3 (prev 2)
   Evidence: E-VIS-8, E-WGT-4, E-WGT-5.
   Justification: 0% decoration in the first viewport, no idle motion, no overlays; the sticky header is the only chrome and the content is the figure.

6. Good design is honest — Score: 2/3 (prev 2)
   Evidence: E-COPY-2, E-COPY-3, E-COPY-4.
   Justification: the dashboard promise is gone and the numbers, durations and plazos reconcile; one soft inflation remains ("siguen respondiendo cuando su operación crece"), and personal data plus session recording go undisclosed without an aviso de privacidad.

7. Good design is long-lasting — Score: 2/3 (prev 2)
   Evidence: E-VIS-7.
   Justification: one dated marker remains: the coloured brand glow (`--shadow-brand`) on the primary CTA, prominent in dark mode.

8. Good design is thorough down to the last detail — Score: 2/3 (prev 2)
   Evidence: E-VIS-6, E-VIS-9, E-STR-4, E-VIS-10.
   Justification: every form state is now done. One detail is rough: the nav keeps "Servicios" highlighted after scrolling back to the top. Smaller items: the company's own number is used as the visitor's phone placeholder, and WhatsApp links open a new tab with no cue.

9. Good design is environmentally friendly — Score: 2/3 (prev 2)
   Evidence: E-WGT-1, E-WGT-3, E-WGT-4.
   Justification: dark mode and reduced motion are honoured and first-party JS is 16 KB, but production ships ~146 KB of third-party JS, 119 KB of it an empty GTM container. That is above the <100 KB of a 3.

10. Good design is as little design as possible — Score: 1/3 (prev 1)
    Evidence: E-STR-7, E-STR-4.
    Justification: the three removable elements from the last audit are gone. Applying the same test again still finds 3+ removable elements: the section eyebrows that restate the nav label or H2, the "FASE 0n" pills that restate the order, and the check/cross discs that restate the column titles. Facts also repeat (48 h ×8, twice in the success panel alone).

**Total: 21 / 30** (prev 19, baseline 9)

Principles at 0: none. Load-bearing: #2 = 3, #4 = 2, #6 = 2.
Principles ≤ 1 (follow-ups): #1 innovative, #10 as little design as possible.
