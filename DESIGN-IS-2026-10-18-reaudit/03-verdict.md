# 03 — Verdict (re-audit)

**REDESIGN — by the rule, at 19/30: one point under the REFINE threshold of 20,
with no principle at 0 and every load-bearing principle at 2 or 3.**

The rule is applied mechanically (total < 20 → REDESIGN) and the scorecard was
not revisited to clear it. In substance, though, nothing here asks to start
over from purpose: the gaps are element-level, and every move below is a
refine-sized change to the current structure. The owner should read the verdict
as "one more pass", not as a rejection of the redesign.

Highest-leverage moves:

1. **#10 — remove what repeats.** Drop the hero eyebrow pill (index.html:455), which restates the H1, and the testimonial initials avatars (1018, 1032). Decide on the hero dashboard mock (483–547): it is 18% of the fold and carries no task. Evidence E-STR-7.
2. **#8 — finish the last states.** Tokenise `::placeholder` to a colour ≥ 4.5:1 in both themes (index.html:1216–1268), and stop the 0.118 CLS from the header collapse on `nav[data-enhanced]`. Evidence E-VIS-5, E-WGT-3.
3. **#3 — one button system.** Rebuild `.action-bar__wa` on `.btn--secondary.btn--sm` (action-bar.css:52–69) so it gets the shared hover and pressed states. Evidence E-VIS-3.
4. **#6 — back or drop the dashboard promise.** Either the owner confirms "acceso permanente al tablero en línea" (FAQ, index.html:1090) and it appears in the process copy, or it comes out of the FAQ, JSON-LD and llms.txt together. Evidence E-COPY-7.
5. **#4 / #7 — small polish.** Align the "Proceso" nav label with its heading, and soften `--shadow-brand` to a neutral shadow, at least in dark mode. Evidence E-STR-5, E-VIS-7.

Moves 1–3 alone would plausibly lift #10, #8 and #3, but re-score only after a
new audit, not by assumption.
