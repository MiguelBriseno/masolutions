# AGENTS.md - Development Guidelines for MASolutions

## Project Overview

MASolutions is a vanilla HTML/CSS/JS landing page for a software development company. It uses no build tools or frameworks—just pure HTML, CSS, and ES6 JavaScript modules. The site is deployed statically.

---

## Build / Lint / Test Commands

This is a **static site with no build system**. There are no npm scripts, linters, or test frameworks configured.

### Running the Site

Since there's no build step, open `index.html` directly in a browser or serve it locally:

```bash
# Using Python's built-in server (run from project root)
python3 -m http.server 8000

# Using PHP
php -S localhost:8000

# Using npx (if available)
npx serve .
```

### Single Test / Development

There are **no tests** in this project. For development:

1. Make changes to HTML, CSS, or JS files
2. Refresh the browser to see changes
3. Use browser DevTools for debugging

### Adding Linting (Optional)

If you want to add linting later, install ESLint:

```bash
npm init -y
npm install eslint --save-dev
npx eslint --init  # Follow prompts
```

To lint a single JS file:
```bash
npx eslint js/components/hero.js
```

---

## Code Style Guidelines

### JavaScript Conventions

#### File Structure & Organization

- Use **ES6 modules** with `import`/`export`
- Entry point: `js/core/main.js`
- Components: `js/components/*.js`
- Each component exports an `init*` function

```javascript
// Correct import style (include .js extension)
import { initHero } from "../components/hero.js";

// Export pattern - use init prefix for initialization functions
export function initNavbar() { ... }
```

#### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Functions | camelCase, verb prefix | `initNavbar()`, `handleClick()` |
| Variables | camelCase | `currentIndex`, `isOpen` |
| Constants | UPPER_SNAKE_CASE (if truly constant) | `const MAX_RETRIES = 3` |
| DOM Elements | Descriptive, suffix with element type | `navToggle`, `heroSection` |

#### Functions

- Keep functions small and focused (single responsibility)
- Use named functions over anonymous callbacks when possible
- Prefix event handlers with `handle`: `handleSubmit()`, `handleInputChange()`

```javascript
// Good: Named function with clear purpose
function updateLangUI(button, lang) {
  button.setAttribute("data-lang", lang);
  const textSpan = button.querySelector(".nav__lang-text");
  if (textSpan) {
    textSpan.textContent = lang.toUpperCase();
  }
}

// Good: Initialize function pattern
export function initNavbar() {
  const toggle = document.getElementById("nav-toggle");
  if (!toggle) return;
  // ... initialization logic
}
```

#### Error Handling

- Always null-check DOM elements before use
- Use early returns for guard clauses

```javascript
// Good: Defensive coding
function initHero() {
  const dynamicText = document.getElementById("hero-dynamic-text");
  if (!dynamicText) return;  // Early return, no error needed
  
  // ... rest of logic
}
```

- Log meaningful messages to console when something fails silently

#### Imports

- Use **relative paths** with `.js` extension
- One import per line (or group related imports)
- Order: external → internal → styles (if any)

```javascript
// Correct
import { initHero } from "../components/hero.js";
import { initNavbar } from "../components/navbar.js";

// Avoid
import {initHero} from "../components/hero.js";  // No spaces inside braces
```

---

### CSS Conventions

#### BEM Naming (Block Element Modifier)

```
.block              -> Base class
.block__element     -> Element within a block
.block--modifier    -> Variant of a block
.block__element--modifier -> Variant of an element
```

```css
/* Block */
.nav { }

/* Element */
.nav__menu { }
.nav__link { }

/* Modifier */
.nav__menu--open { }
.nav__link--active { }
```

#### CSS Custom Properties

Define all colors, spacing, and other tokens in `:root`:

```css
:root {
  --color-bg: #020617;
  --color-primary: #2563eb;
  --color-text: #e5e7eb;
  --radius-lg: 1rem;
  --shadow-soft: 0 10px 30px rgba(15, 23, 42, 0.6);
}
```

#### Responsive Design

- Use **mobile-first** approach (base styles for mobile, `@media (min-width: ...)` for desktop)
- Use `clamp()` for fluid typography
- Test with `@media (prefers-reduced-motion: reduce)` for accessibility

```css
/* Mobile first - base styles */
.hero__title {
  font-size: 2rem;
}

/* Desktop override */
@media (min-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .hero__floating-card {
    animation: none;
  }
}
```

#### General CSS Rules

- Use 2-space indentation
- One selector per line, one property per line
- Group related properties together
- Use shorthand properties when appropriate

```css
/* Good */
.hero {
  position: relative;
  padding: 4rem 0 5rem;
  overflow: hidden;
}

/* Avoid excessive nesting */
.nav .nav__menu .nav__link { }  /* Too deep */
```

---

### HTML Conventions

- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`)
- Include `alt` text for all images
- Use `aria-label` for icon-only buttons
- Include `rel="noopener noreferrer"` on external `_blank` links

```html
<!-- Good -->
<button id="nav-toggle" aria-label="Abrir menú">...</button>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>
<img src="./assets/logo.webp" alt="Company logo" />

<!-- Avoid -->
<button id="nav-toggle">...</button>  <!-- Missing aria-label -->
```

---

### Accessibility Guidelines

- Always include `alt` text for images
- Use semantic HTML elements
- Support keyboard navigation
- Respect `prefers-reduced-motion`
- Use sufficient color contrast (WCAG AA minimum)

---

### Git Conventions (If Used)

- Use clear, descriptive commit messages
- Keep commits small and focused
- Branch naming: `feature/description` or `fix/description`

---

### Adding New Components

1. Create `js/components/component-name.js`
2. Export an `initComponentName()` function
3. Import and call in `js/core/main.js`
4. Add CSS in the appropriate `css/layout/` or `css/components/` file, then
   link it from `index.html` in cascade order — there is no entry stylesheet
   with `@import` rules, because that chain blocks rendering twice over

---

### Browser Support

- Target: Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- No IE11 support required
