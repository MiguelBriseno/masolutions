# 04 — /make-plan handoff (REDESIGN)

````
/make-plan Redesign the masolutions.mx landing page (index.html + css/** in /home/miguel/personal/html/masolutions). Current design failed a Dieter Rams audit at 9/30 with critical gaps in principles #4 understandable (1/3) and #6 honest (1/3), plus 0/3 on #7 long-lasting and #9 environmentally friendly, and 1/3 on #3 aesthetic, #5 unobtrusive, #8 thorough and #10 as little design as possible.

Verdict paragraph (quoted from 03-verdict.md):
> The masolutions.mx landing page scores 9/30, below the threshold of 20, so the verdict is REDESIGN. The visual language and the copy register have to be rebuilt from the page's purpose: a business buyer understanding and trusting the offer, then asking for a proposal. The engineering underneath is sound and should be kept.

Why redesign and not refine: the total (9/30) is far below the REFINE threshold of 20. The failures are systemic rather than local: there is no spacing or type scale (34 literal spacing values, 24 rendered font sizes), the decorative language is one specific trend, and the copy speaks engineer to a business buyer. They cannot be fixed one selector at a time.

Primary user: a decision-maker at a Mexican company, any sector, evaluating a vendor for custom software (mobile, web, internal systems, connecting existing systems).
Primary task: understand what MA Solutions builds and how, trust it, and request a proposal through the contact form (the site's only conversion path).

Hard project constraints (from CLAUDE.md; non-negotiable):
- Vanilla HTML/CSS/ES6 modules. No build tools, no frameworks, no npm. Every stylesheet is a <link> in index.html, never @import.
- Strict CSP: no inline style attributes, no inline scripts. Every visual value lives in a stylesheet as a custom property.
- BEM naming. Tokens in :root of css/base/globals.css. Grids use repeat(auto-fit, minmax(min(Xpx, 100%), 1fr)). Verify layout at 320 / 375 / 768 / 1366×768 / 1440 with no horizontal overflow.
- Address the reader as `usted` everywhere, including validation messages.
- Segment by capability, never by sector, at the top of the funnel. Sectors appear only as delivery evidence backed by a case card.
- The FAQ, the six services and the Nosotros prose are duplicated in the JSON-LD and llms.txt. Edit every surface together, and keep the marked-up FAQ question verbatim equal to the rendered <h3>.
- No postal address anywhere. No review or aggregateRating markup.
- Nothing the visitor needs may be hidden by CSS that only JS can undo. Header collapse stays gated on .nav[data-enhanced]; the action bar ships `data-hidden inert`.
- Mockup keyframes declare only `from` with fill backwards, so the resting CSS is the finished state, all inside one prefers-reduced-motion: no-preference block.
- Work on a branch, never commit to master (GitHub Pages deploys master live). The four-line H1 budget and the CTA must stay above the fold at 1366×768.

Preserve from current design:
- Brand tokens: --color-primary #5b3df5 and its dark ramp (css/base/globals.css:10–12), assets/logo.webp and icon.webp, and the IBM Plex Sans + Space Grotesk pairing (index.html:21).
- Section order and information content: hero → por qué a la medida → nosotros → servicios → proceso → casos → testimonios → FAQ → contacto (index.html:452–1366). No audit evidence faults the order.
- Accessibility foundations, all evidenced:
  - Lighthouse Accessibility 100
  - skip link (index.html:400)
  - global :focus-visible ring (globals.css:153)
  - full keyboard path, including the mobile menu with Escape and focus return (js/components/navbar.js)
  - prefers-reduced-motion in 9 places
  - native <details name="faq"> accordion
- Contact form logic: js/components/contact-form.js validation, the aria-invalid / aria-describedby wiring, the role=alert error and the role=status success panel with its reset. Restyle it; do not rewrite it.
- The JS module architecture (js/core/main.js and one init*() per component) and the try/catch-guarded analytics loaders placed last.

Discard:
- The trend decoration layer. Evidence: background.css:13–36 (aurora), globals.css:286–298 (.text-gradient), hero.css:63/78 (blueprint grid, glow), index.html:484/490 (code chip, status chip). It runs 4 infinite idle animations and takes about 25% of the 1366×768 fold. Caused failure on #7, #5 and #10.
- Ad-hoc spacing, type, radius and shadow values. Evidence: 34 literal spacing values (for example hero.css:33, about.css:45, globals.css:243/279), 27 font-size declarations, 12 rendered radii against 5 tokens, and 4 hardcoded shadows (action-bar.css:29, header.css:33, mockups.css:51/296). Caused failure on #3.
- The duplicate button implementations .form__success-link and .form__success-reset (contact.css:252–285). Caused failure on #3.
- The hero facts strip (index.html:571–588), which duplicates the Nosotros commitments panel (673–698). Caused failure on #10.
- Engineer-facing copy aimed at the buyer: API, SaaS multiusuario, control de acceso por rol, ERP/CRM, pasarelas de pago, levantamiento/relevamiento, reportería, puesta en producción, última milla (index.html:457, 461, 622, 735–737, 752, 765–770, 812–814, 841, 986). Caused failure on #4.
- Unlabelled metric-like mock data under real client names: "tonalli.mx/produccion · RENDIMIENTO 92%" (864–887), "ENTREGA A TIEMPO 96%" (530), "Ciclo 06 entregado" (497). Caused failure on #6.

Top moves from the audit (verbatim):
1. #6 Honest — make every number on the page true and consistent. Label the mockups as illustrative, or replace client-branded figures with neutral sample data (index.html:864–887, 530, 497). Reconcile the phase durations (1+2+(4–12)+1 = 8–16 weeks, index.html:811–844) with the FAQ (8–14 weeks, index.html:1128, JSON-LD 286, llms.txt:74). Pick one wording for "cerrado" vs "referencial" (index.html:462–463, 679–680 vs 847–850). Pick one for 48 h vs 48 h hábiles (index.html:470, 632, 676, 1190, 1319, 1340, 1346). Apply each choice on the page, in the JSON-LD and in llms.txt.
2. #3 Aesthetic + #10 Little design — introduce a real spacing and type scale, then delete what does not earn its place. Build a 4/8-based spacing scale and a scale of 6–7 font sizes as tokens. Collapse 12 radii to 3 and about 5 button treatments to the .btn system. Drop the facts strip that duplicates the commitments panel (index.html:571–588 vs 673–698).
3. #7 Long-lasting + #5 Unobtrusive — retire the trend layer. Remove the drifting aurora, gradient text, glow, blueprint grid, floating chips and code chip, so the 4 idle infinite animations go to 0. Let one honest product mock plus typography carry the hero (background.css:13–36, hero.css:63/78, index.html:484/490).
4. #4 Understandable — write for the buyer, not the engineer. Replace API / SaaS / ERP / CRM / levantamiento / pasarelas with plain outcomes ("conectamos sus sistemas", "cada persona ve solo lo que le corresponde"). Use one CTA label everywhere: today there are four wordings across index.html:443, 466, 631, 1187, 1317 and 1397. Align the nav labels with the section headings ("Casos" at 439 vs "Proyectos representativos" at 855).
5. #8 Thorough + #9 Environmental — finish the form states and honour the user's environment:
   - add `novalidate`, because native `tú` bubbles currently pre-empt the custom validation on empty submit
   - add a visible "Enviando…" state with aria-busy (contact.css:157)
   - mark required fields visibly
   - give the <form> an accessible name
   - raise --color-text-faint #8b8ba3 above 4.5:1 (it is 3.32:1 on .service-card__index, services.css:46)
   - add a prefers-color-scheme: dark token set (none exists today)

Redesign principles in priority order:
1. #6 Honest — every figure, duration and promise on the page is true, labelled where it is illustrative, and identical across page, JSON-LD and llms.txt.
2. #4 Understandable — a non-technical gerente general can say what each section offers and what the CTA does without knowing any acronym.
3. #10 As little design as possible — the hero is headline, lead, one CTA pair and at most one honest product visual. Zero infinite idle animations, every decorative element justified or removed.
4. #3 Aesthetic — a single visible system: spacing scale, 6–7 type sizes, 3 radii and 1 button family, all as tokens, with no literals outside :root.
5. #7 Long-lasting — a restrained typographic layout with no trend markers, light and dark themes driven by the same tokens.

Deliverables for the plan:
- New information architecture. Re-derive it from the primary task rather than from the old page; if the current section order survives that derivation, say so explicitly with the reasoning.
- A new hero and primary flow (low-fi, labelled), compared side by side with the current one at 1366×768 and 375×812.
- Token spec: spacing scale, type scale, radius set, shadow set, colour tokens for light and dark. All tokens in globals.css, and a list of every literal to delete.
- Copy deck: every changed string, in usted, with its JSON-LD and llms.txt counterparts changed in the same phase.
- States checklist for the contact form and controls: empty with required marking, sending, field error, network error, success, focus-visible, disabled, hover and active.
- Migration path: one branch and one PR per phase, chained on the previous PR rather than on master, so each phase is reviewable alone and production never shows a half-migrated page.
- Cutover criteria, checked before the final merge:
  - Lighthouse Accessibility 100 and Performance ≥ 90 mobile
  - 0 infinite idle animations
  - no colour or spacing literal outside :root
  - AA contrast on every text token in both themes
  - no horizontal overflow from 320 to 1440px
  - CTA above the fold at 1366×768
  - FAQ, services and Nosotros identical across page, JSON-LD and llms.txt

Anti-patterns to guard against (specific to REDESIGN):
- Porting the old trend layer under new names: a new glow is still a glow.
- Keeping both designs behind a flag or a second stylesheet indefinitely.
- Redesigning to follow a newer trend rather than the principles above.
- Treating the Preserve list as optional, especially the accessibility foundations and the JS-optional navigation contract.
- Adding a vertical or a new claim (team size, years, client count) that the owner has not supplied.
````
