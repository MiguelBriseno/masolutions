# 03 — Verdict (second re-audit)

**REFINE — 21/30 with no principle at 0: the redesign has cleared the
threshold, and what remains is element-level polish plus two owner decisions.**

The scorecard was not revisited to reach this. The rule is mechanical: ≥ 20
and no 0 gives REFINE.

Highest-leverage moves:

1. **#10 — cut the restatements.**
   - Drop the section eyebrows that repeat the nav label or the H2. Keep the ones that add information ("COMPROMISOS DE TRABAJO", "¿POR QUÉ A LA MEDIDA?").
   - Drop the "FASE 0n" pills, or merge the number into the phase title.
   - Remove one of the two "48 h" lines in the success panel (index.html:1239, 1245).
   - Evidence: E-STR-7, E-STR-4.
2. **#6 — publish an aviso de privacidad (owner decision).** The form collects nombre, teléfono, email and detalle, and Clarity records sessions; the LFPDPPP requires the notice. Also soften or back "siguen respondiendo cuando su operación crece" (635). Evidence: E-COPY-3, E-COPY-4.
3. **#8 — fix the last details.**
   - Clear the active nav link when the hero is in view (navbar.js:13–30).
   - Use a neutral example as the phone placeholder instead of the company's own number (1173).
   - Add a visual cue on the links that open WhatsApp in a new tab.
   - Evidence: E-VIS-9, E-STR-4, E-VIS-10.
4. **#4 — make the labels match.** Align "Proceso" with its heading and "Preguntas" with "Dudas habituales…", in either direction, and define "ciclo" in the process section where the two-week rhythm is introduced. Evidence: E-STR-5, E-COPY-5.
5. **#7 / #9 — the last trend marker and the dead weight.** Replace `--shadow-brand` with a neutral shadow. Either configure the GTM container or remove it (owner decision): it is 119 KB with no tags. Evidence: E-VIS-7, E-WGT-1.

#1 innovative stays at 1. Nothing in this rubric rewards a new pattern on a
page whose job is to be plain, so it is a known ceiling, not a follow-up to
chase.
