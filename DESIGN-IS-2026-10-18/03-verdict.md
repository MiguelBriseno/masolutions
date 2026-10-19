# 03 — Verdict: REDESIGN

**The masolutions.mx landing page scores 9/30, below the threshold of 20, so the verdict is REDESIGN. The visual language and the copy register have to be rebuilt from the page's purpose: a business buyer understanding and trusting the offer, then asking for a proposal. The engineering underneath is sound and should be kept.**

The verdict follows the rule mechanically (total < 20). The redesign is
scoped. What failed is the **visual system** (#3, #5, #7, #10), the **buyer
language** (#4) and **claim accuracy** (#6). The things that scored well and
carry no failing evidence are **not** being restarted: the section order, the
accessibility work, the CSP-safe module architecture, the form logic and the
brand tokens. Throwing those away would be the "redesign because one screen is
ugly" anti-pattern applied to the whole stack.

## Highest-leverage moves

1. **#6 Honest — make every number on the page true and consistent.**
   - Label the mockups as illustrative, or replace client-branded figures with neutral sample data. Evidence: E-COPY-3 (864–887, 530, 497).
   - Reconcile the phase durations (8–16 weeks) with the FAQ (8–14 weeks). Evidence: E-COPY-2.
   - Pick one wording for "cerrado" vs "referencial" and one for 48 h vs 48 h hábiles, and apply each in all three surfaces (page, JSON-LD, llms.txt).
2. **#3 Aesthetic + #10 Little design — introduce a real spacing and type scale, then delete what does not earn its place.**
   - Build a 4/8-based spacing scale and a scale of 6–7 font sizes as tokens.
   - Collapse 12 radii to 3 and ~5 button treatments to the `.btn` system.
   - Drop the facts strip that duplicates the commitments panel. Evidence: E-VIS-1, E-VIS-2, E-VIS-4, E-STR-4.
3. **#7 Long-lasting + #5 Unobtrusive — retire the trend layer.**
   - Remove the drifting aurora, gradient text, glow, blueprint grid, floating chips and code chip, so the 4 idle infinite animations go to 0.
   - Let one honest product screenshot or mock, plus typography, carry the hero. Evidence: E-STR-7, E-WGT-4, E-VIS-8 (≈25% of the fold is decoration).
4. **#4 Understandable — write for the buyer, not the engineer.**
   - Replace API / SaaS / ERP / CRM / levantamiento / pasarelas with plain outcomes ("conectamos sus sistemas", "cada persona ve solo lo que le corresponde").
   - Use one CTA label everywhere.
   - Align the nav labels with the section headings. Evidence: E-COPY-5, E-STR-3, E-STR-5.
5. **#8 Thorough + #9 Environmental — finish the form states and honour the user's environment.**
   - Add `novalidate`, a visible sending state with `aria-busy`, required-field marking and an accessible form name.
   - Raise `--color-text-faint` above 4.5:1.
   - Add a `prefers-color-scheme: dark` token set. Evidence: E-A11Y-4, E-VIS-6, E-VIS-5, E-VIS-7.
