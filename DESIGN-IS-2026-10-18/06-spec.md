# 06 — Redesign spec

Phase 1 output of `05-redesign-plan.md`. Every later phase copies from this
file. When it disagrees with a later phase's improvisation, the spec wins.

## 1. Owner decisions (2026-10-18, answered by the owner through AskUserQuestion)

| Topic | Decision (verbatim choice) | Consequence |
|---|---|---|
| Duration | "8–14 semanas" | The FAQ stays as it is. The phase 03 pill changes from `4–12 semanas` to **`4–10 semanas`**, so 1 + 2 + 4–10 + 1 = 8–14. |
| 48 h | "48 h hábiles desde el formulario" | Every occurrence reads **"en menos de 48 horas hábiles"** (short form: **"48 h hábiles"**). The FAQ stops tying the proposal to a prior meeting. |
| Closed vs referential | "Cerrados al firmar" | The plazos on the page are referenciales. Alcance, precio y plazo become **cerrados por escrito en la propuesta firmada**. Every "cerrado" claim gets the qualifier *al firmar la propuesta*, or links to it. |
| Mockups | "Leyenda 'datos de ejemplo'" | The mockups keep their client branding and figures. Each one gets a visible caption: **"Ilustración con datos de ejemplo."** By choosing this, the owner accepted that client brand use is approved. |
| Dark mode | "Sí, automático" | `prefers-color-scheme: dark` token set. No toggle and no extra JS. |
| Brand gradient | "Morado sólido" | `--gradient-brand` is retired everywhere. Everything uses solid `--color-primary` / `--color-primary-dark`. |
| Cases naming | "Casos" | Nav "Casos", eyebrow "CASOS", h2 **"Casos en operación"**. |

## 2. Information architecture

The order is derived from the buyer's three needs: **(a)** is this for me, **(b)** can I trust it, **(c)** how do I act.

| Section | Need | Decision |
|---|---|---|
| Hero | a, c | Keep. Headline, lead, CTA pair, note, one captioned mock. **Remove the facts strip** (`index.html:571-588`), which duplicates the Nosotros panel. |
| ¿Por qué a la medida? | a | Keep, as the one dark band. It answers "why not off-the-shelf". |
| Nosotros | b | Keep. The commitments panel becomes the single home of the 48 h / cerrados / 2 semanas / documentación facts. |
| Servicios | a | Keep. Six cards, with **no numerals**. |
| Proceso | b | Keep. Four phases plus the referential-durations note. |
| Casos | b | Keep. Three captioned mocks. |
| Testimonios | b | Keep. |
| FAQ | b | Keep. |
| Contacto | c | Keep. |

**Result:** the current order survives. That is not inertia. Each section maps
to a buyer need, no two sections serve the same need with the same content,
and the only duplicate (the facts strip) is cut.

## 3. Hero (low-fi)

```
1366×768                                         375×812
┌──────────────────────────────────────────┐     ┌───────────────────┐
│ header: logo · 5 links · [Solicitar prop]│     │ logo         [≡]  │
├──────────────────────────────────────────┤     ├───────────────────┤
│ PILL                     ┌─────────────┐ │     │ PILL              │
│ H1 (≤4 lines, solid      │ dashboard   │ │     │ H1 (solid)        │
│ text, no gradient)       │ mock        │ │     │ lead              │
│ lead                     │ (no chips,  │ │     │ [Solicitar prop.] │
│ [Solicitar propuesta]    │ no glow,    │ │     │ [Conocer servic.] │
│ [Conocer los servicios]  │ no grid)    │ │     │ note              │
│ note · note · note       └─────────────┘ │     │ ─ fold ─          │
│                          caption         │     │ mock + caption    │
└──────────────────────────────────────────┘     └───────────────────┘
```

## 4. Tokens

**Spacing, on a 4px base (`--space-*`):**

| Token | Value |
|---|---|
| `-1` | 4px |
| `-2` | 8px |
| `-3` | 12px |
| `-4` | 16px |
| `-5` | 20px |
| `-6` | 24px |
| `-7` | 32px |
| `-8` | 40px |
| `-9` | 48px |
| `-10` | 64px |

Map each literal to the nearest step, rounding toward the smaller step on a tie:

| Literal values | Token |
|---|---|
| 1–2 | keep as hairline literals, or `--space-1` when used as a gap |
| 4–5 | `-1` |
| 6–9 | `-2` |
| 10–13 | `-3` |
| 14–17 | `-4` |
| 18–21 | `-5` |
| 22–27 | `-6` |
| 28–35 | `-7` |
| 36–43 | `-8` |
| 44–55 | `-9` |
| 56+ | `-10` |

`--container-pad` and `--section-gap` stay as they are.

**Type (`--text-*`):**

| Token | Value |
|---|---|
| `xs` | 12px |
| `sm` | 13.5px |
| `base` | 15px |
| `md` | 17px |
| `lg` | 20px |
| `xl` | clamp(28px, 3.4vw, 38px) |
| `display` | clamp(34px, 4.4vw, 50px) |

Map body sizes as follows:

| Rendered size | Token |
|---|---|
| ≤ 12.5 | `xs` |
| 13–14 | `sm` |
| 14.5–16 | `base` |
| 16.5–18 | `md` |
| 19–22 | `lg` |

Notes:
- `16px` on `body` (`globals.css:112`) maps to `base`, so body text becomes 15px. **Exception:** keep `body` at 16px as `--text-body: 16px`, because form inputs below 16px trigger iOS zoom on focus.
- The contact title clamp(22px, 2.6vw, 26px) maps to `lg` on small screens. Keep it as its own clamp only if the screenshot shows a regression.
- The error page (`error.css`) display clamp stays local.

**Radius:**

| Token | Value |
|---|---|
| `--radius-sm` | 8px |
| `--radius-md` | 14px |
| `--radius-lg` | 20px |
| `--radius-pill` | 999px |

Former 9 maps to `sm`, former 16 to `md`, and the `custom.css:115` 50% circles become `pill`.

**Shadow:**

| Token | Value |
|---|---|
| `--shadow-sm` | (unchanged) |
| `--shadow-md` | `0 8px 24px rgba(20,20,31,.06)` (absorbs `--shadow-lg`) |
| `--shadow-lg` | `0 24px 60px -18px color-mix(in srgb, var(--color-primary-darker) 35%, transparent)` (the old `--shadow-float`) |

`--shadow-brand` and `--shadow-brand-strong` stay for the primary button.

**Motion:**

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(.2,.7,.3,1)` |
| `--duration-fast` | 150ms |
| `--duration-base` | 240ms |
| `--duration-slow` | 500ms |

`--transition-fast` stays as `var(--duration-fast) ease` for compatibility.

**Z-index:**

| Token | Value |
|---|---|
| `--z-skip` | 60 |
| `--z-header` | 30 |
| `--z-action-bar` | 25 |

**Exempt:** the `--mock-*` palette and the mock type and radius miniature in `mockups.css` stay local. They are a deliberate scale model.

**Dark theme** (Phase 7). Start from the ink tokens, with these mappings:

| Token | Dark value |
|---|---|
| `--color-bg` | `#0f0e1f` |
| `--color-surface` | `#17152e` (the ink-raised family) |
| `--color-border*` | white at 8–16% |
| `--color-text*` | ramp from `#f3f1ff` down; each step must keep ≥ 4.5:1 on the surface |
| `--color-primary` | `#5b3df5` on fills (white text on it is 6.12:1) |
| text-coloured primary (links) | `#b7a8ff` (the ink-accent) |

## 5. Copy deck

These rules apply to every row:
- **One CTA label:** "Solicitar propuesta" everywhere it appears as a link or button to `#contacto`. The contact h2 stays "Solicite una propuesta", because a heading addressed to the reader is fine. The submit stays "Enviar solicitud".
- **Register:** `usted` throughout.
- **No new claims.** Sectors appear only as delivery evidence.
- **Same text on every surface:** each "page" text applies verbatim to the JSON-LD twin. The `llms.txt` twin gets the same wording, keeping that file's impersonal voice only where it already uses it.

### Hero

| Element | Current (`index.html`) | New |
|---|---|---|
| H1 | 455-457 | Same words, with no `<span class="text-gradient">`: "Ingeniería de software a la medida: aplicaciones móviles, web e integraciones". Do not touch `slogan`, which already matches. |
| Lead | 459-464 | "Diseñamos, desarrollamos y mantenemos aplicaciones móviles, plataformas web, sistemas internos y conexiones entre los sistemas que su empresa ya usa, para empresas de cualquier sector. Alcance, precio y plazo por escrito, y avances que usted revisa cada dos semanas." |
| CTA | 466 | "Solicitar propuesta" |
| Note | 469-472 | "Propuesta en menos de 48 horas hábiles · Alcance, precio y plazo cerrados al firmar · Sin costo ni compromiso" |
| Mock caption (new) | — | "Ilustración con datos de ejemplo." |

### ¿Por qué a la medida?

The twin is `llms.txt:46-51`.

| Element | Current | New |
|---|---|---|
| Tailored item 1 | 621 | "Diseñado sobre su operación real, a partir de entrevistas con sus áreas" |
| Tailored item 2 | 622 | "Conectado con los sistemas que ya usa: facturación, ventas, inventario y cobros en línea" |
| Tailored item 3 | 623 | "Solo lo que su operación requiere, con alcance y precio cerrados al firmar la propuesta" |
| CTA | 631 | "Solicitar propuesta" |
| Note | 632 | "Propuesta en menos de 48 horas hábiles, sin costo ni compromiso" |

### Nosotros

The twin is `llms.txt:10-31`.

| Element | Current | New |
|---|---|---|
| Lead | 646-652 | Replace "integraciones por API" with "conexiones entre sistemas". |
| Paragraph 3 | 662 | "Cada proyecto arranca con entrevistas a las áreas involucradas y cierra con…". The rest stays. |
| Panel, row 1 | 675-676 | Key "Propuesta formal por escrito", value **"48 h hábiles"** |
| Panel, row 2 | 679-680 | Key **"Alcance, precio y plazo"**, value **"Cerrados al firmar"** |

### Servicios

There are no numerals. The twins are `hasOfferCatalog` (description) and `llms.txt:55-60`.

| Card | Title | New text |
|---|---|---|
| 01 | Aplicaciones móviles | "Apps para iPhone y Android, del prototipo a la publicación en App Store y Google Play." |
| 02 | Aplicaciones web | "Portales, paneles de operación y plataformas en línea para muchos usuarios, donde cada persona ve solo lo que le corresponde y que siguen respondiendo cuando su operación crece." |
| 03 | Software a la medida | "Sistemas internos que sustituyen la hoja de cálculo: inventarios, trazabilidad de lotes, facturación, reportes de la operación y automatización de tareas." |
| 04 | **"Integraciones entre sistemas"** (was "Integraciones y API"; also change the offer `name` and `llms.txt`) | "Hacemos que sus sistemas de gestión, de ventas, de cobro en línea y de terceros intercambien información solos, con conexiones (API) documentadas y vigiladas." |
| 05 | Mantenimiento y soporte | "Vigilancia del sistema, solución de fallas y nuevas funciones después del lanzamiento, bajo contrato mensual con tiempos de respuesta acordados." |
| 06 | Consultoría técnica | "Revisión técnica de su sistema actual, ayuda para elegir tecnología y acompañamiento a su equipo interno cuando el producto ya está en operación." |

### Proceso

The twins are the `ItemList` description and `llms.txt:62-69`. Phase titles stay, except phase 01, which changes to "Diagnóstico".

| Phase | Current | New text | Pill |
|---|---|---|---|
| 01 | 812-816 | Title **"Diagnóstico"**. "Entrevistas con las áreas involucradas para entender qué necesita, definición del alcance y estimación formal de costo y plazo." | 1 semana |
| 02 | 821-825 | "Recorridos de pantallas navegables y decisiones técnicas, aprobados por escrito antes de escribir código." | 2 semanas |
| 03 | 830-834 | "Construcción por etapas de dos semanas; al cierre de cada una usted prueba lo construido y revisamos la calidad." | **4–10 semanas** |
| 04 | 839-843 | "Arranque en uso real, publicación en tiendas, capacitación de su equipo y entrega de la documentación técnica." | 1 semana |
| Note | 847-850 | "Los plazos son referenciales hasta definir el alcance; quedan cerrados por escrito en la propuesta firmada." | — |

### Casos

| Element | New |
|---|---|
| h2 (855) | "Casos en operación" |
| Each mock caption (new) | "Ilustración con datos de ejemplo." |
| Pill "ERP web" (907) | "Sistema de gestión web" |

### FAQ

Answers only; the questions stay verbatim. The twins are JSON-LD `text` and `llms.txt:73-78`.

| Question | New answer |
|---|---|
| Q1 | "Depende del alcance definido. En menos de 48 horas hábiles desde su solicitud entregamos una propuesta sin costo, con entregables detallados; al firmarla, alcance, precio y plazo quedan cerrados por escrito." |
| Q2 | Unchanged ("entre 8 y 14 semanas" is now arithmetically true). |
| Q3 | Replace "tablero de tareas" with "tablero en línea con el avance". |
| Q5 | Replace "fichas de tienda" with "la página de la app en cada tienda". |
| Q6 | Replace "atención de incidencias" with "solución de fallas". |

### Contacto and success panel

| Element | New |
|---|---|
| Lead (1188-1192) | Keep "menos de 48 horas hábiles". |
| Success step 2 (1346) | "Recibirá una propuesta con alcance, plazos y presupuesto en menos de 48 horas hábiles." |
| Required marker | Label suffix " (obligatorio)" on nombre, email and detalle. Teléfono already reads optional. |

### Metadata

| Element | New |
|---|---|
| `og:description` (38) | "…Propuesta en menos de 48 horas hábiles." |
| `twitter:description` (61) | Same text as `og:description`. That drops "Jalisco y todo México" and puts the line on the capability axis. |

### llms.txt only

| Lines | Change |
|---|---|
| 82-83 | Drop the outcome clauses ("que sustituyó…", "que redujo…") that exist only as testimonial quotes. |
| 26 | Becomes "48 h hábiles". |
| 27 | Becomes "cerrados al firmar la propuesta". |
| 74 | Unchanged. |
