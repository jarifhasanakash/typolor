# Typolor Studio 🎨🔤

> **Typolor** turns a few brand colors and fonts into a complete design-token set — color roles, a fluid type scale, spacing, radius and buttons — previews it on a real website, and exports a `branding.md` file you can hand to an AI before it designs anything.

[![Version](https://img.shields.io/badge/version-2.0.0-4F46E5.svg)](#changelog)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Build-emerald.svg)](index.html)

**Live:** https://jarifhasanakash.github.io/typolor/

---

## How it works

Typolor is a six-step flow. Everything saves in your browser as you go.

| Step | What you do |
|---|---|
| **1 · Colors** | Add brand colors (Primary, Secondary, Tertiary …). Each gets an 11-shade scale (`50`–`950`). One color is the **Neutral** and always sits last. |
| **2 · Roles** | Map shades to semantic variables such as `--heading-dark`, `--bg-1`, `--br-light`, with opacity and a "use for" note. Live WCAG contrast checks and a mini preview sit alongside. |
| **3 · Typography** | Pick heading, paragraph and overline fonts from 370 Google Fonts, then set a modular scale that grows fluidly from mobile to desktop with `clamp()`. |
| **4 · Spacing** | Spacing and radius primitives on a 4px unit, container max width, button style, layout rules and icon instructions. |
| **5 · Preview** | A full sample website painted only with your variables. Switch desktop / tablet / mobile and turn on token labels to see which variable paints what. |
| **6 · Export** | Download `branding.md`, CSS variables, a Tailwind v4 theme, or a project file to reopen later. |

---

## Features

### 🎨 Colors
* **11-shade scales** from the Typolor engine, with three algorithms:
  * **Original** — nearest hand-tuned skeleton, ΔE projection and curve transfer.
  * **Lock** — pins your exact color to a chosen shade.
  * **APCA** — lightness tuned for accessible text contrast.
* **One-click "Add color"** picks a hue that stays distinct from your existing colors; harmony (complementary, analogous, triadic, split) and status (success, warning, danger, info) suggestions are one toggle away.
* **Auto-tinted neutral** derived from your primary, always kept at the bottom.
* Every added color gets a matching variable in the Brand roles, kept in sync when you rename or delete it.

### 🧩 Color roles
* Brand, text-on-light, text-on-dark, background and border groups, each with **+ Add** and drag-to-reorder (mouse, touch, or ↑ ↓ on the handle).
* Shade picker with every palette, white, black and custom hex.
* `--on-primary` follows contrast by default: it uses `--heading-light` or `--heading-dark`, whichever reads better on `--primary`.
* Live **WCAG 2.1 contrast checks** for the pairings that matter.

### 🔤 Typography
* **370 Google Fonts** in a searchable, categorised picker (each name shown in its own typeface), plus any other Google Font by name.
* Separate heading / paragraph / overline settings: weight, line height, letter spacing, case.
* **Fluid scale**: a mobile ratio and a desktop ratio between two viewports, written as `clamp()`; any size can be overridden by hand.

### 📐 Spacing, radius & buttons
* Spacing primitives named by multiplier — `--sp-0`, `--sp-x` (4px), `--sp-x2` (8px) … `--sp-x40` (160px).
* Radius primitives — `--br-00`, `--br-r1` (4px) … `--br-r10` (40px), `--br-rc` (fully rounded).
* `--max-width` container setting.
* **Button style**: square / rounded / pill, padding, font family, size, weight, line height and letter spacing, with a live sample. Values that match a primitive are exported as that variable.
* Renaming a spacing or radius variable updates its references in your layout rules.

### 🌐 Live preview
* A modern sample website (hero, bento features, process, stats, testimonials, pricing, FAQ, CTA, footer) built only from your tokens.
* Desktop, tablet and mobile widths so the fluid type scale is visible.
* Token labels: hover any element to see the variables it uses.

### ⚡ Export
* **`branding.md`** — written for AI tools: usage rules, every variable with its value and "use for" note, contrast table, palettes, fonts with a Google Fonts link, sizes, spacing, container, layout rules, radius, buttons, icons and a copy-paste `:root` block. Toggle sections on and off; preview it formatted with the 👁 button.
* **CSS** — `:root` variables plus base typography and `.btn` rules.
* **Tailwind v4** — an `@theme` block (`bg-primary`, `text-h1`, `p-sp-x4`, `rounded-btn`, `max-w-page` …).
* **Project file** (`.json`) — reopen and keep editing on any device.

---

## Getting started

No install and no build step.

```bash
git clone https://github.com/jarifhasanakash/typolor.git
cd typolor
```

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

---

## File structure

```
├── index.html          # App shell
├── app.js              # State, the six steps, preview site and exporters
├── styles.css          # App styles (light and dark)
├── typolor-engine.js   # Standalone color engine (shade generation, APCA, naming)
├── favicon.svg
├── README.md
└── LICENSE
```

---

## Keyboard

| Key | Where | Action |
|---|---|---|
| `↑` `↓` | Drag handle in Color roles | Move the variable up or down |
| `↑` `↓` `Enter` | Font picker search | Move through fonts and choose |
| `Esc` | Any picker | Close it |

---

## Changelog

### 2.0.0
A rebuild around one goal: producing a `branding.md` an AI can design from.

* New six-step flow: Colors → Roles → Typography → Spacing → Preview → Export.
* Multiple brand colors with a neutral, semantic color roles, contrast checks.
* Fluid `clamp()` type scale with mobile and desktop ratios; 370-font Google Fonts picker.
* Spacing, radius, container and button tokens.
* Live sample website with device sizes and token labels.
* Exports: `branding.md` (with formatted preview), CSS, Tailwind v4, project file.
* New light interface with optional dark mode.

**Changed from v1:** the HEX/RGB/HSB/HSL/OKLCH format switcher, color history, Tailwind v3 export and JSON token export are not in v2. The project file replaces JSON tokens. v1 is preserved at the [`v1.1`](https://github.com/jarifhasanakash/typolor/tree/v1.1) tag.

---

## Credits

* **[Chroma.js](https://github.com/gka/chroma.js)** by Gregor Aisch — color math and contrast (MIT).
* **[Phosphor Icons](https://phosphoricons.com/)** — icons (MIT).
* **[Tailwind CSS](https://tailwindcss.com/)** — default color anchors used by the engine (MIT).
* **[Google Fonts](https://fonts.google.com/)** — open-source typography.

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE).
