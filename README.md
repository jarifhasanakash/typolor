# Typolor Studio 🎨🔤

> **Typolor** — The unified tactile design studio for generating harmonic color palettes and proportional typographic scales with instant export for Tailwind CSS, CSS Custom Properties, and modern design systems.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Runtime%20Build-emerald.svg)](index.html)
[![Mobile Native](https://img.shields.io/badge/Mobile-100%25%20Responsive-purple.svg)](index.html)

---

## Overview

Designing a cohesive digital product requires balancing **color harmony** and **typographic proportion**. Most generators treat color and type in isolation. **Typolor** unifies them into a single, tactile studio designed with a physical industrial hardware aesthetic.

---

## Features

### 🎨 Perceptual Color Palette Generation
* **11-Shade Scale (`50` &ndash; `950`)**: Balanced curve transfer preventing muddy darks or washed-out light tints.
* **Algorithm Modes**:
  * **Original**: Nearest perceptual skeleton matching with relative $\Delta E$ projection and curve transfer.
  * **Lock Shade**: Pin your exact input color to any shade (50, 100, ..., 500, ..., 950) with tent-tapered distribution.
  * **APCA Mode**: Calibrated lightness curve targets for accessible text contrast.
* **Multi-Format Color Switcher**: Seamless live conversions across **HEX**, **RGB**, **HSB** (Hue, Saturation, Brightness), **HSL**, and **OKLCH**.
* **Tactile Studio Picker**: Custom 2D Saturation-Value box, Hue spectrum track, and 18 hand-crafted curated designer seeds.
* **Live History Track**: Persistent horizontal history of recently explored colors with instant one-tap restoration.

### 🔤 Musical Interval Typographic Scale Studio
* **Musical Ratios**: Minor Second (1.067), Major Second (1.125), Minor Third (1.200), Major Third (1.250), Perfect Fourth (1.333), Augmented Fourth (1.414), Perfect Fifth (1.500), Golden Ratio (1.618), or custom ratio.
* **Google Fonts Integration**: Live dropdown containing popular Sans, Serif, and Monospace fonts, plus real-time typing to load *any* Google Font on the fly.
* **Interactive Sample Text**: Live editable preview across Display, H1&ndash;H6 headings, and Large, Regular (Base 16px), Small, Extra Small paragraphs.
* **Category Banners & Dimensions**: Real-time REM and PX readouts with instant single-click CSS snippet copying.

### ⚡ Instant Multi-Format Token Export
* **Tailwind CSS v4**: Modern `@theme` block ready to drop into CSS.
* **Tailwind CSS v3**: `tailwind.config.js` theme extension object.
* **CSS Custom Properties**: Structured `:root` tokens for both typography and colors.
* **JSON Tokens**: Machine-readable token schema for design tokens / Figma pipelines.

### 📱 Mobile-Native Architecture
* **Safe-Area Insets**: Full edge-to-edge layout with `viewport-fit=cover` and dynamic viewport units (`100dvh`).
* **Ergonomic Bottom Sheet**: Tactile color studio shifts to a floating bottom card on mobile with safe touch margins.
* **Zero Input Auto-Zoom**: Enforced minimum 16px inputs on coarse pointers to eliminate iOS Safari zoom drift.
* **Zero Tap Lag**: `touch-action: manipulation` across all interactive buttons, chips, and swatches.
* **Sticky-Hover Immune**: All `:hover` states gated behind capability queries (`@media (hover: hover) and (pointer: fine)`).

### 🎛️ Tactile Industrial Hardware Aesthetic
* Concentric recessed wells and milled slots.
* Off-white tactile porcelain pucks with studio key lighting.
* Obsidian hardware `#1A1A1A` action controls.
* High-contrast dark and light modes with dynamic status bar synchronization.

---

## Getting Started

Typolor runs natively in any modern web browser with **zero installation or build step required**.

### Quick Start

1. Clone or download the repository:
   ```bash
   git clone https://github.com/jarifhasanakash/typolor.git
   cd typolor
   ```

2. Open `index.html` directly in your browser:
   * Double-click `index.html`, or
   * Use any local static server:
     ```bash
     npx serve .
     # or
     python -m http.server 8000
     ```

---

## File Structure

```
├── index.html           # Main tactile studio application (HTML + CSS + Application Logic)
├── typolor-engine.js    # Core standalone color math and scale calculation engine
├── README.md            # Project documentation and guide
└── LICENSE              # MIT Open Source License
```

---

## Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Randomly shuffle curated designer color seeds |
| `Enter` / `Space` on Orb | Toggle Tactile Color Studio popover |
| `Esc` | Close color studio popover, custom dropdowns, or export modal |

---

## Open Source Credits & Acknowledgements

Typolor is built on open standards and incorporates the following open-source libraries:
* **[Chroma.js](https://github.com/gka/chroma.js)** by Gregor Aisch &mdash; Color manipulation and contrast mathematics (MIT License).
* **[Phosphor Icons](https://phosphoricons.com/)** &mdash; Flexible icon library (MIT License).
* **[Tailwind CSS](https://tailwindcss.com/)** &mdash; Default color anchors and spacing proportions (MIT License).
* **[Google Fonts](https://fonts.google.com/)** &mdash; Open-source typography.

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
