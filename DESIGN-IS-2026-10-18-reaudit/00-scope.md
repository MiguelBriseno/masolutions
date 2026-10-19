# 00 — Scope (re-audit)

- **Audited surface:** the masolutions.mx landing page at the top of the redesign
  chain, branch `feat/form-states-dark-mode` @ `e7123a3`. That is `index.html`,
  `css/**` and `js/**`, served locally at http://127.0.0.1:8765/ in light and
  dark. `404.html` is checked only for both themes rendering.
- **Not production.** None of the seven redesign branches has been merged yet.
- **Baseline:** `DESIGN-IS-2026-10-18/` scored 9/30 (REDESIGN). This pass uses
  the same rubric with no re-weighting. Target ≥ 20/30 with no principle at 0;
  any principle ≤ 1 is listed as a follow-up, not re-scored.
- **Primary user:** a decision-maker at a Mexican company (any sector)
  evaluating a vendor for custom software.
- **Primary task:** understand what MA Solutions builds and how, trust it, and
  request a proposal through the contact form.
- **Constraints:** unchanged from the baseline (vanilla stack, strict CSP,
  `usted`, no postal address, duplicated FAQ/services in JSON-LD and
  `llms.txt`, 320–1440px).
