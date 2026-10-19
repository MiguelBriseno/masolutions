# 02 — Scorecard (re-audit)

Same anchors as the baseline. Ties go to the lower score; the worst instance is
scored, not the average.

1. Good design is innovative — Score: 1/3 (baseline 1)
   Evidence: E-STR-7, E-VIS-8.
   Justification: still the standard dev-shop structure (hero + mock, comparison band, service cards, phases, cases, testimonials, FAQ); now restrained and well built, but restraint is not a new pattern, so not 2.

2. Good design makes a product useful — Score: 3/3 (baseline 2)
   Evidence: E-STR-1, E-STR-3, E-VIS-6, E-VIS-8, E-A11Y-1.
   Justification: one CTA label everywhere, CTA above the fold, four fields with one optional, custom validation in `usted`, and the no-JS path still validates and navigates; no decoy actions on the way to the form.

3. Good design is aesthetic — Score: 2/3 (baseline 1)
   Evidence: E-VIS-1–4.
   Justification: spacing, type, radius and colour now obey one visible system with 0 colour literals outside tokens; two minor inconsistencies remain (the hand-rolled `.action-bar__wa` button and the untokenised placeholder colour), which is the anchor for 2.

4. Good design makes a product understandable — Score: 2/3 (baseline 1)
   Evidence: E-COPY-5, E-STR-5.
   Justification: the jargon a buyer would trip on is gone or glossed and "Casos" lands on "Casos en operación"; one wayfinding mismatch remains (Proceso → "Metodología en cuatro fases"), so not 3.

5. Good design is unobtrusive — Score: 2/3 (baseline 1)
   Evidence: E-VIS-8, E-WGT-4, E-WGT-5.
   Justification: no idle motion, no overlays, decoration down to 18% of the fold; the hero mock and the dark-mode CTA glow are still visible chrome, quiet but not receding, so 2.

6. Good design is honest — Score: 2/3 (baseline 1)
   Evidence: E-COPY-2, E-COPY-3, E-COPY-4, E-COPY-7.
   Justification: the three baseline inflations are fixed; one minor item remains — the FAQ promises "acceso permanente al tablero en línea", a claim no other surface backs — which is the "≤1 minor inflation" of a 2.

7. Good design is long-lasting — Score: 2/3 (baseline 0)
   Evidence: E-STR-7, E-VIS-7.
   Justification: all six trend markers are gone; one remains — the coloured brand glow (`--shadow-brand`) on the primary CTA, prominent in dark mode — so 2, not 3.

8. Good design is thorough down to the last detail — Score: 2/3 (baseline 1)
   Evidence: E-VIS-6, E-VIS-5, E-WGT-3.
   Justification: every form state is present and considered; one is rough — placeholder text at 4.46:1 light / 3.69:1 dark — and the 0.118 CLS on load is an unconsidered edge, which together keep it at 2.

9. Good design is environmentally friendly — Score: 2/3 (baseline 0)
   Evidence: E-WGT-1, E-WGT-4, E-VIS-7.
   Justification: dark mode and reduced motion are honoured and there is no idle motion, but production initial JS is ~166 KB (GTM + Clarity), above the <100 KB of a 3.

10. Good design is as little design as possible — Score: 1/3 (baseline 1)
    Evidence: E-STR-7, E-STR-4.
    Justification: at least three elements can go without breaking any task — the hero eyebrow pill that repeats the H1, the decorative hero dashboard mock, and the testimonial initials avatars — which is the 3–5 band, so 1.

**Total: 19 / 30** (baseline 9)

Principles at 0: none. Load-bearing: #2 = 3, #4 = 2, #6 = 2.
Principles ≤ 1 (follow-ups): #1 innovative, #10 as little design as possible.
