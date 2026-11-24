/* Typolor Studio v2
 * Colors → Roles → Typography → Spacing → Preview → Export (branding.md)
 * Shade math comes from typolor-engine.js (unchanged from v1).
 */
(() => {
  'use strict';

  const E = window.TypolorEngine;
  const chroma = E.chroma;
  const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const VERSION = '2.0.1';
  const STORE_KEY = 'typolor-studio-v2';
  const THEME_KEY = 'typolor-theme';

  /* ------------------------------------------------------------------ helpers */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const uid = () => Math.random().toString(36).slice(2, 9);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = s => String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'color';
  const fmt = (n, d = 4) => String(+Number(n).toFixed(d));
  const clean = n => String(n || '').trim().replace(/^-+/, '').replace(/\s+/g, '-') || 'unnamed';
  const isHex = v => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v);
  const normHex = v => { v = String(v || '').trim(); if (!v.startsWith('#')) v = '#' + v; return isHex(v) ? chroma(v).hex().toUpperCase() : null; };
  // 24-Nov-2026 (local date, fixed English month names so it reads the same everywhere)
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fmtDate = d => `${String(d.getDate()).padStart(2, '0')}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`;

  // Popular Google Fonts, roughly by popularity within each category. Loaded on demand by link — nothing is bundled.
  const FONT_CATS = {
    sans: 'Inter|Roboto|Open Sans|Montserrat|Poppins|Lato|Outfit|Plus Jakarta Sans|DM Sans|Manrope|Noto Sans|Raleway|Nunito|Nunito Sans|Rubik|Work Sans|Figtree|Geist|Onest|Mulish|Kanit|Barlow|Barlow Condensed|Barlow Semi Condensed|Fira Sans|Fira Sans Condensed|IBM Plex Sans|IBM Plex Sans Condensed|Source Sans 3|PT Sans|Ubuntu|Oswald|Archivo|Archivo Narrow|Heebo|Hind|Karla|Josefin Sans|Quicksand|Cabin|Arimo|Assistant|Prompt|Sora|Space Grotesk|Lexend|Lexend Deca|Urbanist|Red Hat Display|Red Hat Text|Public Sans|Be Vietnam Pro|Albert Sans|Schibsted Grotesk|Hanken Grotesk|Instrument Sans|Bricolage Grotesque|Epilogue|Syne|Chivo|Overpass|Exo 2|Titillium Web|Mukta|Dosis|Maven Pro|Asap|Encode Sans|Jost|Questrial|Varela Round|Signika|Catamaran|M PLUS Rounded 1c|Commissioner|Golos Text|Wix Madefor Display|Wix Madefor Text|Inter Tight|Atkinson Hyperlegible|Kumbh Sans|Readex Pro|Radio Canada|Gantari|Familjen Grotesk|Afacad|Alexandria|Cairo|Tajawal|Saira|Rajdhani|League Spartan|Spline Sans|Darker Grotesque|Didact Gothic|Libre Franklin|Montserrat Alternates|Alata|Sen|Tenor Sans|Belleza|Jura|Tomorrow|Geologica|Anek Latin|Mona Sans|Host Grotesk|Reddit Sans|Funnel Sans|Instrument Sans|Pathway Extreme|Hind Madurai|Livvic|Mada|Murecho|Nokora|Oxygen|Palanquin|Rethink Sans|Sarabun|Smooch Sans|Truculenta|Yantramanav',
    serif: 'Playfair Display|Merriweather|Lora|Libre Baskerville|Noto Serif|PT Serif|Source Serif 4|EB Garamond|Cormorant Garamond|Cormorant|Crimson Text|Crimson Pro|Fraunces|Newsreader|Libre Caslon Text|DM Serif Display|DM Serif Text|Bitter|Roboto Slab|Zilla Slab|Arvo|Domine|Spectral|Cardo|Old Standard TT|Gelasio|Literata|Alegreya|Vollkorn|Instrument Serif|Young Serif|Bodoni Moda|Prata|Marcellus|Cinzel|Gloock|Rozha One|Frank Ruhl Libre|IBM Plex Serif|Noticia Text|Josefin Slab|Libre Bodoni|Petrona|Brygada 1918|Besley|Castoro|Ibarra Real Nova|Rokkitt|Slabo 27px|Aleo|Faustina|Lustria|Sorts Mill Goudy|Unna|Rufina|Ovo|Halant|Mate|Amiri|Playfair|Abhaya Libre|Alike|Bellefair|Cormorant Infant|Della Respira|Hahmlet|Kaisei Decol|Linden Hill|Merriweather Sans|Noto Serif Display|Radley|Shippori Mincho|Trirong|Tinos|Lusitana|Coustard',
    display: 'Bebas Neue|Anton|Abril Fatface|Alfa Slab One|Archivo Black|Righteous|Lobster|Bungee|Black Ops One|Passion One|Fredoka|Comfortaa|Russo One|Staatliches|Teko|Bowlby One|Monoton|Audiowide|Orbitron|Rubik Mono One|Titan One|Luckiest Guy|Bangers|Chewy|Fugaz One|Ultra|Paytone One|Shrikhand|Concert One|Lilita One|Baloo 2|Dela Gothic One|Climate Crisis|Rampart One|Unica One|Syncopate|Michroma|Krona One|Big Shoulders Display|Six Caps|Poiret One|Philosopher|Cinzel Decorative|Yeseva One|Gravitas One|Limelight|Tilt Warp|Bagel Fat One|DynaPuff|Sniglet|Unbounded|Oxanium|Bungee Shade|Coda|Crete Round|Days One|Federo|Fjalla One|Gruppo|Holtwood One SC|Julius Sans One|Kavoon|Londrina Solid|Nixie One|Oleo Script|Patua One|Pirata One|Questrial|Rammetto One|Secular One|Sigmar One|Squada One|Stint Ultra Expanded|Tilt Prism|Vast Shadow|Wallpoet|Zen Dots',
    handwriting: 'Dancing Script|Pacifico|Caveat|Satisfy|Great Vibes|Sacramento|Kaushan Script|Shadows Into Light|Indie Flower|Amatic SC|Permanent Marker|Courgette|Cookie|Allura|Parisienne|Yellowtail|Homemade Apple|Patrick Hand|Architects Daughter|Gloria Hallelujah|Kalam|Rock Salt|Covered By Your Grace|Nothing You Could Do|Reenie Beanie|Marck Script|Mr Dafoe|Alex Brush|Pinyon Script|Tangerine|Italianno|Herr Von Muellerhoff|Mrs Saint Delafield|Monsieur La Doulaise|Birthstone|Whisper|Ephesis|Nanum Pen Script|Gochi Hand|Just Another Hand|Handlee|Sriracha|Comic Neue|La Belle Aurore|Zeyada|Meddon|Over the Rainbow|Bad Script|Damion|Niconne|Petit Formal Script|Qwigley|Caveat Brush|Delius|Itim|Mali|Neucha|Playball|Rancho|Schoolbell|Waiting for the Sunrise',
    mono: 'JetBrains Mono|Fira Code|Fira Mono|IBM Plex Mono|Space Mono|Source Code Pro|Roboto Mono|DM Mono|Ubuntu Mono|Inconsolata|Courier Prime|Red Hat Mono|Geist Mono|Martian Mono|Azeret Mono|Sometype Mono|Anonymous Pro|Overpass Mono|Cousine|PT Mono|Share Tech Mono|Major Mono Display|Victor Mono|Spline Sans Mono|Chivo Mono|Noto Sans Mono|Xanh Mono|Syne Mono|Nova Mono|Oxygen Mono|Cutive Mono|B612 Mono|Kode Mono|Reddit Mono|Fragment Mono'
  };
  const CAT_LABEL = { sans: 'Sans serif', serif: 'Serif', display: 'Display', handwriting: 'Handwriting', mono: 'Monospace' };
  const FONT_DB = [];
  const FONT_CAT = {};
  Object.keys(FONT_CATS).forEach(cat => FONT_CATS[cat].split('|').forEach(name => {
    if (FONT_CAT[name]) return; // keep the first category if a name is listed twice
    FONT_CAT[name] = cat; FONT_DB.push({ name, cat });
  }));
  FONT_DB.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base', numeric: true }));
  const fallbackFor = f => ({ serif: 'serif', mono: 'monospace', handwriting: 'cursive' }[FONT_CAT[f]] || 'sans-serif');
  const fontStack = f => `'${f}', ${fallbackFor(f)}`;

  const SEEDS = ['#3B82F6', '#E283A7', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#0EA5E9', '#14B8A6', '#F97316', '#6366F1', '#84CC16', '#1F2937'];
  const RATIOS = [[1.067, 'Minor second'], [1.125, 'Major second'], [1.2, 'Minor third'], [1.25, 'Major third'], [1.333, 'Perfect fourth'],
    [1.414, 'Augmented fourth'], [1.5, 'Perfect fifth'], [1.618, 'Golden ratio']];
  const MODES = { original: 'Original', lockInputColor: 'Lock', apca: 'APCA' };
  const GROUPS = ['Brand', 'Text on light', 'Text on dark', 'Backgrounds', 'Borders', 'Custom'];
  const DEVICES = { desktop: 1440, tablet: 820, mobile: 390 };

  const STEPS = [
    { id: 'colors', label: 'Colors', icon: 'ph-palette' },
    { id: 'roles', label: 'Roles', icon: 'ph-swatches' },
    { id: 'type', label: 'Typography', icon: 'ph-text-aa' },
    { id: 'space', label: 'Spacing', icon: 'ph-ruler' },
    { id: 'preview', label: 'Preview', icon: 'ph-browser' },
    { id: 'export', label: 'Export', icon: 'ph-file-md' }
  ];

  const TYPE_STEPS = [
    { key: 'dis', label: 'Display', role: 'heading', power: 7, note: 'Homepage / landing page hero heading; also for any heading you want to highlight' },
    { key: 'h1', label: 'Heading 1', role: 'heading', power: 6, note: 'Hero section heading on every page except homepage / landing page' },
    { key: 'h2', label: 'Heading 2', role: 'heading', power: 5, note: 'Section headings' },
    { key: 'h3', label: 'Heading 3', role: 'heading', power: 4, note: 'Sub-section headings, large quotes' },
    { key: 'h4', label: 'Heading 4', role: 'heading', power: 3, note: 'Card and block titles' },
    { key: 'h5', label: 'Heading 5', role: 'heading', power: 2, note: 'Small titles' },
    { key: 'h6', label: 'Heading 6', role: 'heading', power: 1, note: 'Minor headings, names, labels' },
    { key: 'p-lr', label: 'Paragraph large', role: 'paragraph', fixed: 1.125, note: 'Large paragraph, subheading, lead text' },
    { key: 'p-rg', label: 'Paragraph regular', role: 'paragraph', fixed: 1, note: 'Regular paragraph and other body text' },
    { key: 'p-sm', label: 'Paragraph small', role: 'paragraph', fixed: 0.875, note: 'Small detail paragraph, captions, meta' },
    { key: 'p-xs', label: 'Paragraph extra small', role: 'paragraph', fixed: 0.75, note: 'Fine print, legal text' },
    { key: 'ol', label: 'Overline', role: 'overline', fixed: 0.75, note: 'Overline (eyebrow) text only' }
  ];

  const CHECKS = [
    ['heading-dark', 'bg-light', 'Headings on light'],
    ['paragraph-dark', 'bg-light', 'Body on light'],
    ['paragraph-dark', 'bg-1', 'Body on bg-1'],
    ['paragraph-dark', 'bg-2', 'Body on bg-2'],
    ['placeholder-dark', 'bg-light', 'Placeholder on light'],
    ['overline', 'bg-light', 'Overline on light'],
    ['heading-light', 'bg-dark', 'Headings on dark'],
    ['paragraph-light', 'bg-dark', 'Body on dark'],
    ['on-primary', 'primary', 'Button label']
  ];

  const DEFAULT_RULES = `Container
- Page content sits in a centered container: max-width: var(--max-width); margin-inline: auto.

Section spacing
- Standard: every section uses padding-top: var(--sp-x28) and padding-bottom: var(--sp-x28).
- Exception: when two or more consecutive sections share the same background, the first keeps the standard padding; every following one uses padding-top: var(--sp-x6) and padding-bottom: var(--sp-x28).

Content rhythm
- overline — var(--sp-x8) — heading — var(--sp-x4) — subheading — var(--sp-x6) — paragraph — var(--sp-x8) — button — var(--sp-x12) — other content
- heading — var(--sp-x4) — subheading — var(--sp-x6) — main content`;

  const DEFAULT_ICONS = `Phosphor Icons (https://phosphoricons.com). Load the weight you need:
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css"/>
Other weights: replace "regular" with light, bold or fill.
Usage: <i class="ph ph-arrow-right"></i>`;

  // the file name is typed without an extension; the export tab decides it on download
  const mdBase = f => String(f || '').trim().replace(/(\.(md|css|json))+$/i, '').trim() || 'Branding';
  const FILE_EXT = { md: '.md', css: '.css', tw: '-tailwind.css', json: '.json' };
  const fileFor = tab => mdBase(state.export.file) + FILE_EXT[tab];

  // Button style: shape + padding. Rounded uses its own corner radius; pill is fully rounded.
  const defaultButton = () => ({ shape: 'pill', radius: 8, py: 12, px: 24, // 12/24 = --sp-x3 / --sp-x6
    font: 'paragraph', size: 'p-rg', weight: 600, lh: 120, ls: 0 });
  const FONT_ROLES = { heading: 'Heading', paragraph: 'Paragraph', overline: 'Overline' };
  const BTN_SHAPES = { square: 'Square', rounded: 'Rounded', pill: 'Pill' };

  /* ------------------------------------------------------------------ state */
  const shadeCache = new Map();
  function makePalette(role, hex, kind = 'brand') {
    return { id: uid(), role, hex: normHex(hex) || '#3B82F6', mode: 'original', lockShade: 500, kind };
  }
  function tintNeutral(hex) {
    return chroma(hex).set('hsl.s', 0.1).set('hsl.l', 0.42).hex().toUpperCase();
  }
  // Spacing primitives on a 4px unit, named by multiplier: sp-0, sp-x (4), sp-x2 (8) … sp-x40 (160)
  const SP_UNIT = 4;
  const SP_STEPS = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40];
  const spName = n => (n === 0 ? 'sp-0' : n === 1 ? 'sp-x' : 'sp-x' + n);
  const defaultSpacing = () => SP_STEPS.map(n => ({ id: uid(), name: spName(n), px: n * SP_UNIT }));
  // v2 first shipped with sp-00 … sp-1000; projects still on those exact defaults are moved to the new names
  const OLD_SPACING = { 'sp-00': 0, 'sp-50': 4, 'sp-100': 8, 'sp-150': 12, 'sp-200': 16, 'sp-300': 24, 'sp-400': 32,
    'sp-500': 40, 'sp-600': 48, 'sp-700': 64, 'sp-800': 80, 'sp-900': 96, 'sp-1000': 112 };
  const DEFAULT_MAX_WIDTH = 1272;
  // swap var(--old) for var(--new) in the layout rules text
  const renameRef = (text, from, to) => String(text).split(`var(--${from})`).join(`var(--${to})`);
  // Radius primitives on the same 4px unit: br-00, br-r1 (4) … br-r10 (40), br-rc (500, fully rounded / capsule)
  const RD_STEPS = [0, 1, 2, 3, 4, 5, 6, 8, 10];
  const rdName = n => (n === 0 ? 'br-00' : 'br-r' + n);
  const defaultRadius = () => [...RD_STEPS.map(n => ({ id: uid(), name: rdName(n), px: n * SP_UNIT })), { id: uid(), name: 'br-rc', px: 500 }];
  const OLD_RADIUS = { 'rd-00': 0, 'rd-50': 4, 'rd-100': 8, 'rd-150': 12, 'rd-200': 16, 'rd-300': 20, 'rd-500': 40, 'rd-1000': 500 };
  const defaultType = () => ({
    fonts: {
      heading: { family: 'Outfit', weight: 500, lh: 110, ls: -0.025, transform: 'none' },
      paragraph: { family: 'Outfit', weight: 400, lh: 150, ls: 0, transform: 'none' },
      overline: { family: 'Outfit', weight: 500, lh: 100, ls: 0.1, transform: 'uppercase' }
    },
    base: 16, ratioMin: 1.125, ratioMax: 1.25, vwMin: 360, vwMax: 1920, fluid: true, roundPx: true,
    overrides: {}, sample: 'Thoughtful brands, built to last'
  });

  function coreTokens(s) {
    const P = s.palettes[0];
    const N = s.palettes.find(p => p.kind === 'neutral') || P;
    const others = s.palettes.filter(p => p !== P && p !== N && p.kind !== 'neutral');
    const r = (p, sh) => ({ p: p.id, s: sh });
    const W = { c: '#FFFFFF' };
    // first shade from 600 down that reads on white (4.5:1), so overline text passes by default
    const readable = p => r(p, [600, 700, 800, 900].find(s => chroma.contrast(shadesFor(p).map[s], '#FFFFFF') >= 4.5) || 900);
    const onPrimary = { auto: 'primary' }; // heading-light or heading-dark, whichever contrasts more with --primary (live)
    return [
      ['primary', 'Brand', r(P, 500), 100, 'Main brand color: primary buttons, links, key highlights'],
      ['secondary', 'Brand', others[0] ? r(others[0], 500) : r(P, 300), 100, 'Secondary accents, tags, illustrations'],
      ['accent', 'Brand', others[1] ? r(others[1], 500) : r(P, 400), 100, 'Small highlights, badges, decorative details'],
      ['overline', 'Brand', readable(others[0] || P), 100, 'Overline / eyebrow text above headings'],
      ['on-primary', 'Brand', onPrimary, 100, 'Text and icons placed on the primary color'],
      ['heading-dark', 'Text on light', r(N, 950), 100, 'Headings on light backgrounds'],
      ['paragraph-dark', 'Text on light', r(N, 950), 75, 'Paragraphs on light backgrounds'],
      ['placeholder-dark', 'Text on light', r(N, 950), 50, 'Placeholders, captions, muted text on light backgrounds'],
      ['heading-light', 'Text on dark', W, 100, 'Headings on dark backgrounds'],
      ['paragraph-light', 'Text on dark', W, 75, 'Paragraphs on dark backgrounds'],
      ['placeholder-light', 'Text on dark', W, 50, 'Placeholders and muted text on dark backgrounds'],
      ['bg-light', 'Backgrounds', W, 100, 'Default page background'],
      ['bg-1', 'Backgrounds', r(N, 50), 100, 'Alternate section background'],
      ['bg-2', 'Backgrounds', r(P, 50), 100, 'Brand-tinted section background'],
      ['bg-dark', 'Backgrounds', r(N, 950), 100, 'Dark sections and footer'],
      ['br-light', 'Borders', r(N, 950), 20, 'Borders and dividers on light backgrounds'],
      ['br-dark', 'Borders', r(N, 50), 20, 'Borders and dividers on dark backgrounds']
    ].map(([key, group, src, alpha, note]) => ({ id: uid(), key, name: key, group, src, alpha, note }));
  }

  function defaultState() {
    const s = {
      v: 2, name: 'Untitled brand', step: 'colors',
      palettes: [makePalette('Primary', '#E283A7'), makePalette('Secondary', '#F1BA08'), makePalette('Neutral', tintNeutral('#E283A7'), 'neutral')],
      tokens: [], type: defaultType(), spacing: defaultSpacing(), radius: defaultRadius(),
      rules: DEFAULT_RULES, icons: DEFAULT_ICONS,
      export: { palettes: true, contrast: true, rules: true, icons: true, css: true, file: 'Branding' },
      preview: { device: 'desktop', labels: false },
      button: defaultButton(),
      layout: { maxWidth: DEFAULT_MAX_WIDTH }
    };
    s.tokens = coreTokens(s);
    return s;
  }

  function hydrate(saved) {
    const d = defaultState();
    if (!saved || saved.v !== 2 || !Array.isArray(saved.palettes) || !saved.palettes.length) return d;
    const s = Object.assign(d, saved);
    s.type = Object.assign(defaultType(), saved.type || {});
    s.type.fonts = Object.assign(defaultType().fonts, (saved.type || {}).fonts || {});
    s.export = Object.assign(defaultState().export, saved.export || {});
    s.export.file = mdBase(s.export.file); // older projects stored "branding.md"
    // older projects pinned --on-primary to plain white/black; it now follows contrast automatically
    const onP = s.tokens.find(t => t.key === 'on-primary');
    if (onP && (onP.src.c === '#FFFFFF' || onP.src.c === '#000000')) onP.src = { auto: 'primary' };
    s.preview = Object.assign({ device: 'desktop', labels: false }, saved.preview || {});
    s.button = Object.assign(defaultButton(), saved.button || {});
    s.layout = Object.assign({ maxWidth: DEFAULT_MAX_WIDTH }, saved.layout || {});
    // move projects still on the old default spacing names (sp-00 … sp-1000) to sp-0 … sp-x40
    const oldSet = Array.isArray(s.spacing) && s.spacing.length === 13 &&
      s.spacing.every(r => OLD_SPACING[r.name] === Number(r.px));
    if (oldSet) {
      const fresh = defaultSpacing();
      s.spacing.forEach(r => {
        const to = fresh.find(f => f.px === Number(r.px));
        if (to) s.rules = renameRef(s.rules, r.name, to.name);
      });
      s.spacing = fresh;
      if (!/var\(--max-width\)/.test(s.rules)) s.rules = DEFAULT_RULES.split('\n\nSection spacing')[0] + '\n\n' + s.rules;
    }
    // same for the old default radius names (rd-00 … rd-1000) → br-00 … br-rc
    const oldRd = Array.isArray(s.radius) && s.radius.length === 8 && s.radius.every(r => OLD_RADIUS[r.name] === Number(r.px));
    if (oldRd) {
      const fresh = defaultRadius();
      s.radius.forEach(r => { const to = fresh.find(f => f.px === Number(r.px)); if (to) s.rules = renameRef(s.rules, r.name, to.name); });
      s.radius = fresh;
    }
    if (!STEPS.some(x => x.id === s.step)) s.step = 'colors';
    return s;
  }

  function load() {
    try { return hydrate(JSON.parse(localStorage.getItem(STORE_KEY))); } catch (e) { return defaultState(); }
  }
  let saveTimer;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ } }, 250);
  }

  let state = load();
  const ui = { typeDevice: 'desktop', exportTab: 'md', pop: null };
  const frames = [];

  /* ------------------------------------------------------------------ derived */
  function shadesFor(p) {
    const k = p.hex + '|' + p.mode + '|' + p.lockShade;
    if (!shadeCache.has(k)) {
      const g = E.generate(p.hex, { mode: p.mode, lockShade: Number(p.lockShade) });
      const map = {};
      g.shades.forEach(s => { map[s.number] = s.hexcode.toUpperCase(); });
      const locked = (g.shades.find(s => s.isLocked) || {}).number;
      shadeCache.set(k, { map, name: g.name, family: g.closestColorFamily, locked });
    }
    return shadeCache.get(k);
  }
  const pal = id => state.palettes.find(p => p.id === id);
  const tok = id => state.tokens.find(t => t.id === id);
  const tokKey = key => state.tokens.find(t => t.key === key);
  const nameOf = key => clean((tokKey(key) || { name: key }).name);

  function paletteSlugs() {
    const seen = {}; const out = {};
    state.palettes.forEach(p => {
      let s = slug(p.role); if (seen[s]) s += '-' + (++seen[s]); else seen[s] = 1;
      out[p.id] = s;
    });
    return out;
  }

  function resolve(t) {
    if (!t) return { hex: '#FF00FF', alpha: 100 };
    if (t.src.auto) return { hex: autoTextOn(t.src.auto), alpha: t.alpha };
    if (t.src.c) return { hex: t.src.c.toUpperCase(), alpha: t.alpha };
    const p = pal(t.src.p) || state.palettes[0];
    return { hex: shadesFor(p).map[t.src.s] || shadesFor(p).map[500], alpha: t.alpha };
  }
  function cssColor(hex, alpha) {
    if (alpha >= 100) return hex;
    return hex + Math.round(alpha / 100 * 255).toString(16).padStart(2, '0').toUpperCase();
  }
  const tokValue = t => { const r = resolve(t); return cssColor(r.hex, r.alpha); };
  // --heading-light or --heading-dark, whichever has the higher WCAG contrast against the given variable.
  // Returns the winning variable's key; falls back to plain white/black if those variables are missing.
  function autoPick(key) {
    const base = tokKey(key);
    const bg = base && !base.src.auto ? flat(base, '#FFFFFF') : '#FFFFFF'; // a base that is itself automatic would loop
    const score = k => { const t = tokKey(k); return t && !t.src.auto ? chroma.contrast(flat(t, bg), bg) : -1; };
    const light = score('heading-light'), dark = score('heading-dark');
    if (light < 0 && dark < 0) return chroma.contrast(bg, '#FFFFFF') >= chroma.contrast(bg, '#000000') ? '#white' : '#black';
    return light >= dark ? 'heading-light' : 'heading-dark';
  }
  function autoTextOn(key) {
    const k = autoPick(key);
    if (k === '#white') return '#FFFFFF';
    if (k === '#black') return '#000000';
    return resolve(tokKey(k)).hex;
  }
  function srcLabel(t) {
    if (t.src.auto) { const k = autoPick(t.src.auto); return `auto · ${k.startsWith('#') ? k.slice(1) : nameOf(k)}`; }
    if (t.src.c) return t.src.c === '#FFFFFF' ? 'white' : t.src.c === '#000000' ? 'black' : 'custom';
    const p = pal(t.src.p);
    return p ? `${paletteSlugs()[p.id]}-${t.src.s}` : 'missing';
  }
  function flat(t, over) {
    const r = resolve(t);
    return r.alpha >= 100 ? r.hex : chroma.mix(over, r.hex, r.alpha / 100, 'rgb').hex();
  }
  function contrastOf(fgKey, bgKey) {
    const bg = flat(tokKey(bgKey), '#FFFFFF');
    const fg = flat(tokKey(fgKey), bg);
    return { fg, bg, ratio: chroma.contrast(fg, bg) };
  }

  function typeSizes() {
    const t = state.type;
    return TYPE_STEPS.map(st => {
      let min, max;
      if (st.power != null) {
        max = t.base * Math.pow(t.ratioMax, st.power);
        min = t.fluid ? t.base * Math.pow(t.ratioMin, st.power) : max;
      } else { min = max = t.base * st.fixed; }
      if (t.roundPx) { min = Math.round(min); max = Math.round(max); }
      const auto = { min, max };
      const o = t.overrides[st.key];
      if (o && o.min != null) min = o.min;
      if (o && o.max != null) max = o.max;
      return Object.assign({}, st, { min, max, auto, css: clampCss(min, max) });
    });
  }
  function clampCss(min, max) {
    const t = state.type;
    const rem = px => fmt(px / 16, 4) + 'rem';
    if (Math.abs(max - min) < 0.01 || t.vwMax <= t.vwMin) return rem(max);
    const lo = Math.min(min, max), hi = Math.max(min, max);
    const slope = (max - min) / (t.vwMax - t.vwMin);
    const inter = min - slope * t.vwMin;
    return `clamp(${rem(lo)}, ${fmt(inter / 16, 4)}rem + ${fmt(slope * 100, 4)}vw, ${rem(hi)})`;
  }
  const sizeAt = (s, device) => device === 'mobile' ? s.min : s.max;

  function nearestPx(list, target) {
    if (!list.length) return target;
    return list.reduce((b, x) => Math.abs(x.px - target) < Math.abs(b - target) ? x.px : b, list[0].px);
  }

  function fontFamilies() {
    const f = state.type.fonts; const map = {};
    ['heading', 'paragraph', 'overline'].forEach(r => {
      const fam = (f[r].family || '').trim(); if (!fam) return;
      (map[fam] = map[fam] || new Set()).add(Number(f[r].weight));
    });
    if (map[f.paragraph.family]) map[f.paragraph.family].add(600);
    const b = state.button; // the button's weight must be loaded for its chosen family too
    if (b && f[b.font] && map[f[b.font].family]) map[f[b.font].family].add(Number(b.weight) || 600);
    return map;
  }
  function googleFontsUrl() {
    const fams = fontFamilies();
    const q = Object.keys(fams).map(f => `family=${f.replace(/\s+/g, '+')}:wght@${[...fams[f]].sort((a, b) => a - b).join(';')}`).join('&');
    return q ? `https://fonts.googleapis.com/css2?${q}&display=swap` : '';
  }
  function fontHref(family, full) {
    return `https://fonts.googleapis.com/css2?family=${family.trim().replace(/\s+/g, '+')}${full ? ':wght@300;400;500;600;700;800;900' : ''}&display=swap`;
  }
  function ensureFontIn(doc, family) {
    family = (family || '').trim(); if (!family) return;
    const id = 'gf-' + slug(family);
    if (doc.getElementById(id)) return;
    const l = doc.createElement('link');
    l.id = id; l.rel = 'stylesheet'; l.href = fontHref(family, true);
    l.onerror = () => { if (!l.dataset.fb) { l.dataset.fb = '1'; l.href = fontHref(family, false); } };
    doc.head.appendChild(l);
  }
  let fontTimer;
  function loadFontsSoon() {
    clearTimeout(fontTimer);
    fontTimer = setTimeout(() => {
      Object.keys(fontFamilies()).forEach(f => ensureFontIn(document, f));
      schedulePreview();
    }, 500);
  }

  /* ------------------------------------------------------------------ exporters */
  function cssVarsBlock(indent = '  ') {
    const slugs = paletteSlugs(); const L = [];
    L.push(`${indent}/* Palettes */`);
    state.palettes.forEach(p => SHADES.forEach(s => L.push(`${indent}--${slugs[p.id]}-${s}: ${shadesFor(p).map[s]};`)));
    GROUPS.forEach(g => {
      const ts = state.tokens.filter(t => t.group === g); if (!ts.length) return;
      L.push('', `${indent}/* ${g} */`);
      ts.forEach(t => L.push(`${indent}--${clean(t.name)}: ${tokValue(t)};`));
    });
    const f = state.type.fonts;
    L.push('', `${indent}/* Font families */`);
    ['heading', 'paragraph', 'overline'].forEach(r => L.push(`${indent}--font-${r}: ${fontStack(f[r].family)};`));
    L.push('', `${indent}/* Font sizes */`);
    typeSizes().forEach(s => L.push(`${indent}--fs-${s.key}: ${s.css};`));
    L.push('', `${indent}/* Spacing */`);
    state.spacing.forEach(s => L.push(`${indent}--${clean(s.name)}: ${s.px}px;`));
    L.push('', `${indent}/* Layout */`, `${indent}--max-width: ${state.layout.maxWidth}px;`);
    L.push('', `${indent}/* Border radius */`);
    state.radius.forEach(s => L.push(`${indent}--${clean(s.name)}: ${s.px}px;`));
    const bt = btnSpec();
    L.push('', `${indent}/* Button */`);
    L.push(`${indent}--btn-radius: ${bt.radius.css};`, `${indent}--btn-padding-y: ${bt.py.css};`, `${indent}--btn-padding-x: ${bt.px.css};`,
      `${indent}--btn-font: var(${bt.font});`, `${indent}--btn-font-size: var(--fs-${bt.size.key});`,
      `${indent}--btn-line-height: ${bt.lh}%;`, `${indent}--btn-letter-spacing: ${bt.ls}em;`, `${indent}--btn-font-weight: ${bt.weight};`);
    return L.join('\n');
  }

  // A px value as a variable reference when it matches one of the user's tokens, else plain px.
  function asToken(list, px) {
    const m = state[list].find(r => Number(r.px) === Number(px));
    return m ? { css: `var(--${clean(m.name)})`, label: `\`--${clean(m.name)}\` (${px}px)` } : { css: `${px}px`, label: `${px}px` };
  }
  // A pill uses the largest radius variable when it is big enough to fully round a button (e.g. --br-rc 500px).
  function pillRadius() {
    const big = state.radius.filter(r => Number(r.px) >= 100).sort((a, b) => b.px - a.px)[0];
    return big ? { css: `var(--${clean(big.name)})`, label: `\`--${clean(big.name)}\` (${big.px}px, fully rounded pill)` }
      : { css: '999px', label: '999px (fully rounded pill)' };
  }
  function btnSpec() {
    const b = state.button;
    const radius = b.shape === 'square' ? { css: '0px', label: '0px (square corners)' }
      : b.shape === 'pill' ? pillRadius()
      : asToken('radius', b.radius);
    const size = typeSizes().find(s => s.key === b.size) || typeSizes().find(s => s.key === 'p-rg');
    return { shape: BTN_SHAPES[b.shape], radius, py: asToken('spacing', b.py), px: asToken('spacing', b.px), raw: b,
      font: `--font-${b.font}`, family: state.type.fonts[b.font].family, size, weight: Number(b.weight) || 600, lh: b.lh, ls: b.ls };
  }

  function buildCss() {
    const f = state.type.fonts; const url = googleFontsUrl();
    const role = r => `  font-family: var(--font-${r});\n  font-weight: ${f[r].weight};\n  line-height: ${f[r].lh}%;\n  letter-spacing: ${f[r].ls}em;\n  text-transform: ${f[r].transform};`;
    return `/* ${state.name} — generated by Typolor Studio v${VERSION} */
${url ? `@import url('${url}');\n` : ''}
:root {
${cssVarsBlock()}
}

body {
${role('paragraph')}
  font-size: var(--fs-p-rg);
  color: var(--${nameOf('paragraph-dark')});
  background: var(--${nameOf('bg-light')});
}

h1, h2, h3, h4, h5, h6, .display {
${role('heading')}
  color: var(--${nameOf('heading-dark')});
}
.display { font-size: var(--fs-dis); }
${['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(h => `${h} { font-size: var(--fs-${h}); }`).join('\n')}

.overline {
${role('overline')}
  font-size: var(--fs-ol);
  color: var(--${nameOf('overline')});
}
.text-lg { font-size: var(--fs-p-lr); }
.text-sm { font-size: var(--fs-p-sm); }
.text-xs { font-size: var(--fs-p-xs); }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: var(--btn-padding-y) var(--btn-padding-x);
  border-radius: var(--btn-radius);
  font-family: var(--btn-font); font-size: var(--btn-font-size); font-weight: var(--btn-font-weight);
  line-height: var(--btn-line-height); letter-spacing: var(--btn-letter-spacing);
  background: var(--${nameOf('primary')}); color: var(--${nameOf('on-primary')}); border: 1px solid transparent;
}
.btn-secondary { background: transparent; color: var(--${nameOf('heading-dark')}); border-color: var(--${nameOf('br-light')}); }
`;
  }

  function buildTailwind() {
    const slugs = paletteSlugs(); const L = [];
    const url = googleFontsUrl();
    if (url) L.push(`@import url('${url}');`);
    L.push(`@import "tailwindcss";`, '', '@theme {');
    state.palettes.forEach(p => SHADES.forEach(s => L.push(`  --color-${slugs[p.id]}-${s}: ${shadesFor(p).map[s]};`)));
    L.push('');
    state.tokens.forEach(t => L.push(`  --color-${clean(t.name)}: ${tokValue(t)};`));
    L.push('');
    ['heading', 'paragraph', 'overline'].forEach(r => L.push(`  --font-${r}: ${fontStack(state.type.fonts[r].family)};`));
    L.push('');
    typeSizes().forEach(s => L.push(`  --text-${s.key}: ${s.css};`));
    L.push('');
    state.spacing.forEach(s => L.push(`  --spacing-${clean(s.name)}: ${s.px}px;`));
    L.push('', `  /* Container: max-w-page */`, `  --container-page: ${state.layout.maxWidth}px;`);
    L.push('');
    state.radius.forEach(s => L.push(`  --radius-${clean(s.name)}: ${s.px}px;`));
    const bt = btnSpec();
    L.push('', `  /* Button: rounded-btn px-btn-x py-btn-y font-btn text-btn */`, `  --radius-btn: ${bt.radius.css};`, `  --spacing-btn-x: ${bt.px.css};`, `  --spacing-btn-y: ${bt.py.css};`,
      `  --font-btn: var(${bt.font});`, `  --text-btn: var(--text-${bt.size.key});`, `  --text-btn--line-height: ${bt.lh}%;`, `  --text-btn--letter-spacing: ${bt.ls}em;`, `  --text-btn--font-weight: ${bt.weight};`);
    L.push('}');
    return L.join('\n');
  }

  const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

  function buildMarkdown() {
    const x = state.export; const t = state.type; const f = t.fonts; const slugs = paletteSlugs();
    const L = [];
    const today = fmtDate(new Date());
    L.push(`# ${state.name} — Branding`, '',
      `> Design tokens for ${state.name}. Generated with Typolor Studio v${VERSION} on ${today}.`, '',
      '## How to use this file', '',
      '- Use **only** the CSS variables in this file for color, font, font size, spacing and radius. Do not invent new values.',
      '- Prefer the semantic color variables (for example `--' + nameOf('heading-dark') + '`) over raw palette shades. Use palette shades only when no semantic variable fits.',
      '- Every variable has a "Use for" note. Follow it.',
      x.css ? '- The complete `:root` block at the end of this file can be pasted into the global stylesheet as is.' : '',
      '');

    L.push('## Colors', '');
    GROUPS.forEach(g => {
      const ts = state.tokens.filter(tk => tk.group === g); if (!ts.length) return;
      L.push(`### ${g}`, '', '| Variable | Value | Source | Use for |', '|---|---|---|---|');
      ts.forEach(tk => L.push(`| \`--${clean(tk.name)}\` | \`${tokValue(tk)}\` | ${srcLabel(tk)}${tk.alpha < 100 ? ` @ ${tk.alpha}%` : ''} | ${cell(tk.note)} |`));
      L.push('');
    });

    if (x.contrast) {
      L.push('### Contrast (WCAG 2.1)', '', '| Pair | Ratio | Result |', '|---|---|---|');
      CHECKS.forEach(([fg, bg, label]) => {
        if (!tokKey(fg) || !tokKey(bg)) return;
        const c = contrastOf(fg, bg);
        L.push(`| ${label}: \`--${nameOf(fg)}\` on \`--${nameOf(bg)}\` | ${c.ratio.toFixed(2)}:1 | ${grade(c.ratio).label} |`);
      });
      L.push('');
    }

    if (x.palettes) {
      L.push('### Palettes', '', 'Full shade scales. Variable pattern: `--{palette}-{shade}`.', '');
      L.push('| Palette | ' + SHADES.join(' | ') + ' |', '|---|' + SHADES.map(() => '---').join('|') + '|');
      state.palettes.forEach(p => L.push(`| \`${slugs[p.id]}\` (${cell(p.role)}) | ` + SHADES.map(s => `\`${shadesFor(p).map[s]}\``).join(' | ') + ' |'));
      L.push('');
    }

    L.push('## Typography', '', '### Font families', '');
    if (googleFontsUrl()) L.push('Load from Google Fonts:', '', '```html', `<link rel="stylesheet" href="${googleFontsUrl()}">`, '```', '');
    L.push('| Variable | Family | Weight | Line height | Letter spacing | Transform |', '|---|---|---|---|---|---|');
    ['heading', 'paragraph', 'overline'].forEach(r => L.push(`| \`--font-${r}\` | ${fontStack(f[r].family)} | ${f[r].weight} | ${f[r].lh}% | ${f[r].ls}em | ${f[r].transform} |`));
    L.push('', '### Font sizes', '',
      t.fluid ? `Fluid sizes grow smoothly from a ${t.vwMin}px viewport to a ${t.vwMax}px viewport.` : 'Sizes are fixed (not fluid).', '',
      '| Variable | Value | Mobile → Desktop | Use for |', '|---|---|---|---|');
    typeSizes().forEach(s => L.push(`| \`--fs-${s.key}\` | \`${s.css}\` | ${fmt(s.min, 2)}px → ${fmt(s.max, 2)}px | ${cell(s.note)} |`));
    L.push('', 'Headings (display, h1–h6) use `--font-heading`. Paragraph sizes use `--font-paragraph`. `--fs-ol` is for overlines only and uses `--font-overline`.', '');

    L.push('## Spacing', '', `Spacing primitives on a ${SP_UNIT}px unit. \`x\` is the multiplier: \`--sp-x3\` = 3 × ${SP_UNIT}px = ${3 * SP_UNIT}px.`, '',
      '| Variable | Value |', '|---|---|');
    state.spacing.forEach(s => L.push(`| \`--${clean(s.name)}\` | ${s.px}px |`));
    L.push('', '### Container', '', '| Variable | Value | Use for |', '|---|---|---|',
      `| \`--max-width\` | ${state.layout.maxWidth}px | Maximum width of the page content container. Center it with \`margin-inline: auto\`. |`, '');
    if (x.rules && state.rules.trim()) L.push('### Layout rules', '', state.rules.trim(), '');

    L.push('## Border radius', '', `Radius primitives on a ${SP_UNIT}px unit. \`r\` is the multiplier: \`--br-r3\` = 3 × ${SP_UNIT}px = ${3 * SP_UNIT}px. \`--br-rc\` is fully rounded (pills, circles).`, '',
      '| Variable | Value |', '|---|---|');
    state.radius.forEach(s => L.push(`| \`--${clean(s.name)}\` | ${s.px}px |`));
    L.push('');

    const bt = btnSpec();
    L.push('## Buttons', '',
      `All buttons use the same shape and padding. Shape: **${bt.shape}**.`, '',
      '| Property | Value |', '|---|---|',
      `| Border radius | ${bt.radius.label} |`,
      `| Padding top / bottom | ${bt.py.label} |`,
      `| Padding left / right | ${bt.px.label} |`,
      `| Font family | \`${bt.font}\` (${bt.family}) |`,
      `| Font size | \`--fs-${bt.size.key}\` (${fmt(bt.size.max, 2)}px) |`,
      `| Font weight | ${bt.weight} |`,
      `| Line height | ${bt.lh}% |`,
      `| Letter spacing | ${bt.ls}em |`,
      `| Primary button | background \`--${nameOf('primary')}\`, text \`--${nameOf('on-primary')}\` |`,
      `| Secondary button | transparent background, 1px border \`--${nameOf('br-light')}\`, text \`--${nameOf('heading-dark')}\` |`,
      '', '```css',
      `.btn {`,
      `  padding: ${bt.py.css} ${bt.px.css};`,
      `  border-radius: ${bt.radius.css};`,
      `  font-family: var(${bt.font});`,
      `  font-size: var(--fs-${bt.size.key});`,
      `  font-weight: ${bt.weight};`,
      `  line-height: ${bt.lh}%;`,
      `  letter-spacing: ${bt.ls}em;`,
      `}`,
      '```', '');

    if (x.icons && state.icons.trim()) L.push('## Icons', '', state.icons.trim(), '');

    if (x.css) L.push('## CSS variables', '', '```css', ':root {', cssVarsBlock(), '}', '```', '');
    return L.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
  }

  function grade(r) {
    if (r >= 7) return { label: 'AAA', cls: 'good' };
    if (r >= 4.5) return { label: 'AA', cls: 'good' };
    if (r >= 3) return { label: 'AA large', cls: 'warn' };
    return { label: 'Fail', cls: 'bad' };
  }

  /* ------------------------------------------------------------------ demo website */
  const DEMO_STYLE = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{font-family:var(--ff-p);font-weight:var(--fw-p);line-height:var(--lh-p);letter-spacing:var(--ls-p);text-transform:var(--tt-p);font-size:var(--fs-p-rg);color:var(--t-paragraph-dark);background:var(--t-bg-light);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none;cursor:pointer}
ul{list-style:none}
button,input{font:inherit;color:inherit}
.dis,h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6{font-family:var(--ff-h);font-weight:var(--fw-h);line-height:var(--lh-h);letter-spacing:var(--ls-h);text-transform:var(--tt-h);color:var(--t-heading-dark);text-wrap:balance}
.dis{font-size:var(--fs-dis)}h1,.h1{font-size:var(--fs-h1)}h2,.h2{font-size:var(--fs-h2)}h3,.h3{font-size:var(--fs-h3)}h4,.h4{font-size:var(--fs-h4)}h5,.h5{font-size:var(--fs-h5)}h6,.h6{font-size:var(--fs-h6)}
.lead{font-size:var(--fs-p-lr)}.small{font-size:var(--fs-p-sm)}.xs{font-size:var(--fs-p-xs)}
p{text-wrap:pretty}
.muted{color:var(--t-placeholder-dark)}
.ol{display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-o);font-weight:var(--fw-o);line-height:var(--lh-o);letter-spacing:var(--ls-o);text-transform:var(--tt-o);font-size:var(--fs-ol);color:var(--t-overline);margin-bottom:var(--s4)}
.ol::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.wrap{width:100%;max-width:calc(var(--maxw) + var(--s4) * 2);margin:0 auto;padding:0 var(--s4)}
section{padding:var(--sec) 0;position:relative}
.center{text-align:center}
.sec-head{max-width:680px;margin-bottom:var(--s6)}
.sec-head.center{margin-left:auto;margin-right:auto}
.sec-head p{margin-top:var(--s3)}
.split-head{display:flex;justify-content:space-between;align-items:flex-end;gap:var(--s5);margin-bottom:var(--s6)}
.split-head .sec-head{margin:0}
.dark{background:var(--t-bg-dark);color:var(--t-paragraph-light)}
.dark .dis,.dark h1,.dark h2,.dark h3,.dark h4,.dark h5,.dark h6,.dark .h1,.dark .h2,.dark .h3,.dark .h4,.dark .h5,.dark .h6{color:var(--t-heading-light)}
.dark .muted{color:var(--t-placeholder-light)}
/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:var(--btn-py) var(--btn-px);border-radius:var(--btn-r);background:var(--t-primary);color:var(--t-on-primary);font-family:var(--btn-ff);font-weight:var(--btn-fw);font-size:var(--btn-fs);line-height:var(--btn-lh);letter-spacing:var(--btn-ls);text-transform:none;border:1px solid transparent;white-space:nowrap;transition:transform .2s,box-shadow .2s;box-shadow:0 12px 28px -14px color-mix(in srgb,var(--t-primary) 80%,transparent)}
.btn:hover{transform:translateY(-2px)}
.btn.sm{padding:calc(var(--btn-py) * .72) calc(var(--btn-px) * .75);font-size:calc(var(--btn-fs) * .875)}
.btn.ghost{background:var(--t-bg-light);color:var(--t-heading-dark);border-color:var(--t-br-light);box-shadow:none}
.btn.inv{background:var(--t-on-primary);color:var(--t-primary);box-shadow:none}
.btn .arr{width:30px;height:30px;margin-right:-14px;border-radius:50%;display:grid;place-items:center;background:var(--t-on-primary);color:var(--t-primary);font-size:15px}
.row{display:flex;flex-wrap:wrap;gap:var(--s3);margin-top:var(--s5)}
.textlink{display:inline-flex;gap:8px;align-items:center;color:var(--t-heading-dark);font-weight:600;font-size:var(--fs-p-sm)}
.textlink i{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--t-br-light);transition:transform .2s}
.textlink:hover i{transform:rotate(-45deg)}
/* nav */
.nav{position:sticky;top:0;z-index:20;padding:16px 0}
.nav-in{display:flex;align-items:center;gap:var(--s4);height:62px;padding:0 10px 0 22px;border-radius:var(--rp);background:color-mix(in srgb,var(--t-bg-light) 78%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--t-br-light);box-shadow:0 10px 30px -20px rgba(0,0,0,.35)}
.logo{display:flex;align-items:center;gap:10px;font-family:var(--ff-h);font-weight:600;font-size:var(--fs-p-lr);letter-spacing:-.01em;color:var(--t-heading-dark);white-space:nowrap}
.logo-mark{width:30px;height:30px;border-radius:9px;background:var(--t-primary);position:relative;overflow:hidden;flex:none}
.logo-mark::after{content:"";position:absolute;right:-7px;bottom:-7px;width:20px;height:20px;border-radius:50%;background:var(--t-secondary)}
.links{display:flex;gap:2px;margin:0 auto;font-size:var(--fs-p-sm)}
.links a{padding:9px 16px;border-radius:var(--rp);transition:background .2s}
.links a:hover,.links a.on{background:var(--t-bg-1);color:var(--t-heading-dark)}
/* hero */
.hero{margin-top:-94px;padding:calc(94px + var(--s6)) 0 var(--sec);overflow:hidden}
.hero-glow{position:absolute;inset:0 0 auto;height:900px;pointer-events:none;background:radial-gradient(520px 380px at 78% 18%,color-mix(in srgb,var(--t-primary) 22%,transparent),transparent 70%),radial-gradient(520px 360px at 18% 30%,color-mix(in srgb,var(--t-secondary) 20%,transparent),transparent 70%),radial-gradient(420px 300px at 50% 70%,color-mix(in srgb,var(--t-accent) 14%,transparent),transparent 70%)}
.hero-lines{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(var(--t-br-light) 1px,transparent 1px),linear-gradient(90deg,var(--t-br-light) 1px,transparent 1px);background-size:72px 72px;-webkit-mask-image:radial-gradient(ellipse 70% 55% at 50% 0%,#000 20%,transparent 75%);mask-image:radial-gradient(ellipse 70% 55% at 50% 0%,#000 20%,transparent 75%);opacity:.55}
.hero .wrap{position:relative}
.hero-top{text-align:center;max-width:900px;margin:0 auto}
.badge{display:inline-flex;align-items:center;gap:10px;padding:5px 16px 5px 5px;border-radius:var(--rp);background:var(--t-bg-light);border:1px solid var(--t-br-light);font-size:var(--fs-p-sm);margin-bottom:var(--s5);box-shadow:0 6px 18px -12px rgba(0,0,0,.3)}
.badge b{background:var(--t-primary);color:var(--t-on-primary);padding:4px 11px;border-radius:var(--rp);font-size:var(--fs-p-xs);font-weight:600;letter-spacing:0}
.hero .lead{margin:var(--s4) auto 0;max-width:640px}
.hero .row{justify-content:center}
.proof{display:flex;justify-content:center;align-items:center;gap:var(--s3);margin-top:var(--s5);font-size:var(--fs-p-sm)}
.faces{display:flex}.faces i{width:34px;height:34px;border-radius:50%;border:2px solid var(--t-bg-light);margin-left:-10px;background:var(--t-bg-2)}
.faces i:first-child{margin-left:0;background:var(--t-secondary)}.faces i:nth-child(2){background:var(--t-accent)}.faces i:nth-child(3){background:var(--t-primary)}
.stars{color:var(--t-secondary);letter-spacing:2px;font-size:14px}
/* product mockup */
.mock{position:relative;margin:var(--s7) auto 0;max-width:1080px;border-radius:calc(var(--r3) + 6px);padding:8px;background:color-mix(in srgb,var(--t-bg-light) 70%,transparent);border:1px solid var(--t-br-light);box-shadow:0 50px 100px -50px rgba(0,0,0,.45)}
.mock-in{border-radius:var(--r3);background:var(--t-bg-light);border:1px solid var(--t-br-light);overflow:hidden}
.mock-bar{display:flex;align-items:center;gap:var(--s3);padding:12px 16px;border-bottom:1px solid var(--t-br-light)}
.dots{display:flex;gap:6px}.dots i{width:11px;height:11px;border-radius:50%;background:var(--t-br-light)}
.mock-search{flex:1;max-width:340px;margin:0 auto;height:34px;border-radius:var(--rp);border:1px solid var(--t-br-light);background:var(--t-bg-1);padding:0 14px;font-size:var(--fs-p-xs);outline:none}
.mock-search::placeholder{color:var(--t-placeholder-dark)}
.mock-body{display:grid;grid-template-columns:190px 1fr 250px;gap:16px;padding:16px;text-align:left}
.mock-side{display:grid;gap:4px;align-content:start;font-size:var(--fs-p-sm)}
.mock-side span{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r1)}
.mock-side span.on{background:var(--t-bg-2);color:var(--t-heading-dark);font-weight:600}
.mock-side span i{font-size:17px}
.mock-main{border:1px solid var(--t-br-light);border-radius:var(--r2);padding:20px;display:grid;gap:18px}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.kpi{padding:12px 14px;border-radius:var(--r1);background:var(--t-bg-1)}
.kpi b{display:block;font-family:var(--ff-h);font-size:var(--fs-h5);color:var(--t-heading-dark);font-weight:var(--fw-h);margin-top:2px}
.up{color:var(--t-primary);font-weight:600}
.chart{display:flex;align-items:flex-end;gap:8px;height:150px;padding-top:8px;border-bottom:1px dashed var(--t-br-light)}
.chart i{flex:1;border-radius:8px 8px 3px 3px;background:var(--t-bg-2)}
.chart i.hi{background:linear-gradient(180deg,var(--t-primary),color-mix(in srgb,var(--t-primary) 55%,var(--t-bg-light)))}
.mock-aside{display:grid;gap:16px;align-content:start}
.ring-card{border-radius:var(--r2);padding:18px;background:var(--t-bg-dark);color:var(--t-paragraph-light)}
.ring{width:92px;height:92px;border-radius:50%;margin:10px auto 12px;display:grid;place-items:center;background:conic-gradient(var(--t-primary) 0 72%,var(--t-br-dark) 0)}
.ring::before{content:"";grid-area:1/1;width:72px;height:72px;border-radius:50%;background:var(--t-bg-dark)}
.ring b{grid-area:1/1;position:relative;font-family:var(--ff-h);color:var(--t-heading-light);font-size:var(--fs-h5)}
.task{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:var(--r2);border:1px solid var(--t-br-light);font-size:var(--fs-p-sm)}
.task i{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:var(--t-accent);color:var(--t-heading-dark);font-size:15px;flex:none}
.float{position:absolute;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--r2);background:var(--t-bg-light);border:1px solid var(--t-br-light);box-shadow:0 20px 40px -18px rgba(0,0,0,.35);font-size:var(--fs-p-sm);color:var(--t-heading-dark);font-weight:600}
.float i{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--t-primary);color:var(--t-on-primary)}
.f1{left:-34px;top:38%}.f2{right:-26px;top:-22px}
.f2 i{background:var(--t-secondary);color:var(--t-heading-dark)}
/* logos */
.logos{padding:var(--s6) 0;border-top:1px solid var(--t-br-light);border-bottom:1px solid var(--t-br-light)}
.logos-in{display:flex;align-items:center;justify-content:space-between;gap:var(--s5);flex-wrap:wrap}
.logos p{font-size:var(--fs-p-sm);max-width:180px}
.logo-row{display:flex;flex:1;justify-content:space-around;gap:var(--s5);flex-wrap:wrap}
.logo-row span{font-family:var(--ff-h);font-weight:700;font-size:var(--fs-h5);color:var(--t-placeholder-dark);letter-spacing:-.02em;display:flex;align-items:center;gap:8px}
/* bento */
.bento{display:grid;grid-template-columns:repeat(6,1fr);gap:var(--s3)}
.b{position:relative;overflow:hidden;border-radius:var(--r3);padding:var(--s5);background:var(--t-bg-light);border:1px solid var(--t-br-light);display:flex;flex-direction:column;gap:var(--s2);min-height:260px}
.b p{max-width:420px}
.b1{grid-column:span 4}.b2{grid-column:span 2}.b3,.b4,.b5{grid-column:span 2}
.b2{background:var(--t-bg-dark);border-color:var(--t-bg-dark)}
.b5{background:var(--t-primary);border-color:var(--t-primary)}
.b5 h4,.b5 p{color:var(--t-on-primary)}
.ico{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:var(--t-bg-2);color:var(--t-primary);font-size:24px;margin-bottom:var(--s3)}
.b5 .ico{background:color-mix(in srgb,var(--t-on-primary) 18%,transparent);color:var(--t-on-primary)}
.spec{margin-top:auto;display:flex;align-items:flex-end;gap:var(--s4);padding-top:var(--s5)}
.spec .aa{font-family:var(--ff-h);font-size:clamp(64px,9vw,120px);line-height:.8;color:var(--t-heading-dark);font-weight:var(--fw-h)}
.sw{display:flex;gap:8px;margin-bottom:6px}.sw i{width:44px;height:64px;border-radius:12px}
.big{font-family:var(--ff-h);font-size:var(--fs-dis);color:var(--t-heading-light);line-height:1;font-weight:var(--fw-h);margin-top:auto}
.spark{height:56px;margin-top:var(--s3);background:linear-gradient(180deg,color-mix(in srgb,var(--t-primary) 45%,transparent),transparent);clip-path:polygon(0 80%,12% 70%,24% 76%,36% 50%,48% 58%,60% 34%,72% 42%,84% 16%,100% 6%,100% 100%,0 100%)}
.tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:var(--s4)}
.tags span{padding:7px 13px;border-radius:var(--rp);background:var(--t-bg-1);border:1px solid var(--t-br-light);font-size:var(--fs-p-xs);color:var(--t-heading-dark);font-weight:600}
/* process */
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s5);position:relative}
.steps::before{content:"";position:absolute;top:27px;left:28px;right:12%;border-top:1px dashed var(--t-br-light)}
.st{position:relative}
.st .num{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:var(--t-bg-light);border:1px solid var(--t-br-light);font-family:var(--ff-h);font-size:var(--fs-h6);color:var(--t-heading-dark);margin-bottom:var(--s4);position:relative}
.st:first-child .num{background:var(--t-primary);border-color:var(--t-primary);color:var(--t-on-primary)}
.st h5{margin-bottom:var(--s2)}
.st .wk{display:inline-block;margin-top:var(--s3);font-size:var(--fs-p-xs);font-weight:600;padding:4px 10px;border-radius:var(--rp);background:var(--t-bg-2);color:var(--t-heading-dark)}
/* stats */
.stats-grid{display:grid;grid-template-columns:1fr 1.25fr;gap:var(--s7);align-items:center}
.stats-grid p{margin-top:var(--s3)}
.nums{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--t-br-dark);border-radius:var(--r3);overflow:hidden}
.nums div{padding:var(--s5);border-right:1px solid var(--t-br-dark);border-bottom:1px solid var(--t-br-dark)}
.nums div:nth-child(2n){border-right:0}.nums div:nth-child(n+3){border-bottom:0}
.nums .dis{display:block;margin-bottom:var(--s2)}
.nums .dis em{font-style:normal;color:var(--t-primary)}
/* testimonials */
.tgrid{display:grid;grid-template-columns:1.25fr 1fr 1fr;grid-template-rows:auto auto;gap:var(--s3)}
.tc{border-radius:var(--r3);padding:var(--s5);background:var(--t-bg-light);border:1px solid var(--t-br-light);display:flex;flex-direction:column;gap:var(--s4)}
.tc.main{grid-row:span 2;background:var(--t-bg-dark);border-color:var(--t-bg-dark);justify-content:space-between}
.tc.main blockquote{color:var(--t-heading-light)}
.tc .ph-quotes{font-size:40px;color:var(--t-accent)}
.who{display:flex;align-items:center;gap:var(--s3);margin-top:auto}
.av{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--t-secondary),var(--t-primary));flex:none}
.tc:nth-child(3) .av{background:linear-gradient(135deg,var(--t-accent),var(--t-secondary))}
.tc:nth-child(4) .av{background:linear-gradient(135deg,var(--t-primary),var(--t-accent))}
.who b{display:block}
/* pricing */
.toggle{display:inline-flex;padding:5px;border-radius:var(--rp);background:var(--t-bg-1);border:1px solid var(--t-br-light);font-size:var(--fs-p-sm);font-weight:600;margin-top:var(--s4)}
.toggle span{padding:8px 18px;border-radius:var(--rp)}
.toggle span.on{background:var(--t-bg-light);color:var(--t-heading-dark);box-shadow:0 4px 12px -6px rgba(0,0,0,.3)}
.toggle em{font-style:normal;color:var(--t-primary)}
.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s3);align-items:center}
.plan{border-radius:var(--r3);padding:var(--s5);background:var(--t-bg-light);border:1px solid var(--t-br-light);display:flex;flex-direction:column}
.plan.hot{background:var(--t-bg-dark);border-color:var(--t-bg-dark);padding:calc(var(--s5) + 12px) var(--s5);box-shadow:0 40px 80px -40px rgba(0,0,0,.5)}
.plan-top{display:flex;justify-content:space-between;align-items:center;gap:var(--s2)}
.tag{display:inline-block;background:var(--t-accent);color:var(--t-heading-dark);font-size:var(--fs-p-xs);font-weight:700;padding:5px 11px;border-radius:var(--rp)}
.price{display:flex;align-items:baseline;gap:6px;margin:var(--s4) 0 var(--s2)}
.plan ul{display:grid;gap:12px;margin:var(--s5) 0;padding-top:var(--s5);border-top:1px solid var(--t-br-light);font-size:var(--fs-p-sm)}
.plan.hot ul{border-color:var(--t-br-dark)}
.plan li{display:flex;gap:10px;align-items:center}
.plan li i{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;background:var(--t-bg-2);color:var(--t-primary);font-size:12px}
.plan.hot li i{background:var(--t-primary);color:var(--t-on-primary)}
.plan .btn{margin-top:auto;width:100%}
.plan.hot .btn.ghost{background:transparent;color:var(--t-heading-light);border-color:var(--t-br-dark)}
/* faq */
.faq-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:var(--s7);align-items:start}
.faq-grid .sec-head p{margin-bottom:var(--s5)}
.qa{border-bottom:1px solid var(--t-br-light)}
.qa summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:var(--s4);padding:var(--s4) 0;cursor:pointer;font-family:var(--ff-h);font-size:var(--fs-h6);color:var(--t-heading-dark);font-weight:var(--fw-h)}
.qa summary::-webkit-details-marker{display:none}
.qa summary i{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--t-br-light);flex:none;font-size:15px;transition:transform .2s,background .2s}
.qa[open] summary i{transform:rotate(45deg);background:var(--t-primary);color:var(--t-on-primary);border-color:var(--t-primary)}
.qa p{padding:0 var(--s6) var(--s4) 0}
/* cta */
.cta-sec{padding-top:0}
.cta{position:relative;overflow:hidden;border-radius:calc(var(--r3) + 8px);background:var(--t-primary);padding:var(--s7) var(--s6);display:grid;grid-template-columns:1.3fr .7fr;gap:var(--s5);align-items:center}
.cta::before,.cta::after{content:"";position:absolute;border-radius:50%;border:1px solid color-mix(in srgb,var(--t-on-primary) 25%,transparent)}
.cta::before{width:520px;height:520px;right:-160px;top:-200px}
.cta::after{width:340px;height:340px;right:-70px;top:-110px;background:color-mix(in srgb,var(--t-on-primary) 8%,transparent)}
.cta .h2,.cta p{color:var(--t-on-primary);position:relative}
.cta p{opacity:.85;margin-top:var(--s3)}
.cta-actions{display:flex;flex-direction:column;align-items:flex-end;gap:var(--s3);position:relative}
.cta-actions small{color:var(--t-on-primary);opacity:.8;font-size:var(--fs-p-xs)}
/* footer */
.foot{padding:var(--s7) 0 0;overflow:hidden}
.foot-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.4fr;gap:var(--s5)}
.foot .logo{color:var(--t-heading-light)}
.foot-grid p{max-width:280px;margin-top:var(--s3)}
.foot h6{margin-bottom:var(--s3)}
.foot ul{display:grid;gap:10px;font-size:var(--fs-p-sm)}
.news{display:flex;gap:6px;margin-top:var(--s3);padding:5px;border-radius:var(--rp);border:1px solid var(--t-br-dark)}
.news input{flex:1;min-width:0;background:none;border:0;outline:none;padding:0 12px;color:var(--t-heading-light);font-size:var(--fs-p-sm)}
.news input::placeholder{color:var(--t-placeholder-light)}
.news .btn{padding:calc(var(--btn-py) * .72) calc(var(--btn-px) * .7);font-size:calc(var(--btn-fs) * .875)}
.foot-bottom{display:flex;justify-content:space-between;gap:var(--s3);margin-top:var(--s6);padding:var(--s4) 0;border-top:1px solid var(--t-br-dark);font-size:var(--fs-p-xs);color:var(--t-placeholder-light)}
.wordmark{font-family:var(--ff-h);font-weight:700;font-size:clamp(72px,17vw,260px);line-height:.78;letter-spacing:-.05em;text-align:center;white-space:nowrap;color:transparent;background:linear-gradient(180deg,var(--t-br-dark),transparent 85%);-webkit-background-clip:text;background-clip:text;margin-top:var(--s4);user-select:none}
/* responsive */
@media (max-width:1100px){.mock-body{grid-template-columns:1fr 230px}.mock-side{display:none}.f1,.f2{display:none}}
@media (max-width:900px){
  section{padding:var(--sec-m) 0}
  .links{display:none}.nav-in .btn{margin-left:auto}
  .mock-body{grid-template-columns:1fr}.mock-aside{grid-template-columns:1fr 1fr}
  .bento{grid-template-columns:1fr 1fr}.b1,.b2,.b3,.b4,.b5{grid-column:span 2}
  .steps{grid-template-columns:1fr 1fr}.steps::before{display:none}
  .stats-grid,.faq-grid{grid-template-columns:1fr;gap:var(--s6)}
  .tgrid{grid-template-columns:1fr 1fr}.tc.main{grid-column:span 2;grid-row:auto}
  .plans{grid-template-columns:1fr}
  .cta{grid-template-columns:1fr;padding:var(--s6) var(--s5)}.cta-actions{align-items:flex-start}
  .foot-grid{grid-template-columns:1fr 1fr}
  .split-head{flex-direction:column;align-items:flex-start}
  .logos-in{flex-direction:column;align-items:flex-start}.logo-row{justify-content:flex-start}
}
@media (max-width:560px){
  .kpis{grid-template-columns:1fr 1fr}.kpi:last-child{display:none}
  .mock-aside{grid-template-columns:1fr}
  .steps,.tgrid{grid-template-columns:1fr}.tc.main{grid-column:auto}
  .nums{grid-template-columns:1fr}.nums div{border-right:0!important;border-bottom:1px solid var(--t-br-dark)!important}.nums div:last-child{border-bottom:0!important}
  .foot-grid{grid-template-columns:1fr}
  .foot-bottom{flex-direction:column}
  .mock-search{display:none}
}
/* token labels */
html.labels [data-t]{outline:1px dashed rgba(236,72,153,.55);outline-offset:-1px}
html.labels [data-t]:hover{outline:2px solid #EC4899}
#tlabel{position:fixed;z-index:99;pointer-events:none;background:#111;color:#fff;font:500 12px/1.4 ui-monospace,Menlo,monospace;letter-spacing:0;text-transform:none;padding:6px 9px;border-radius:6px;max-width:360px;box-shadow:0 6px 20px rgba(0,0,0,.3);display:none}
html.labels #tlabel.on{display:block}
`;

  function demoVars() {
    const f = state.type.fonts; const L = [':root{'];
    state.tokens.filter(t => !t.key.startsWith('custom')).forEach(t => L.push(`--t-${t.key}:${tokValue(t)};`));
    const r = { h: 'heading', p: 'paragraph', o: 'overline' };
    Object.keys(r).forEach(k => {
      const x = f[r[k]];
      L.push(`--ff-${k}:${fontStack(x.family)};--fw-${k}:${x.weight};--lh-${k}:${x.lh / 100};--ls-${k}:${x.ls}em;--tt-${k}:${x.transform};`);
    });
    typeSizes().forEach(s => L.push(`--fs-${s.key}:${s.css};`));
    const sp = state.spacing, rd = state.radius;
    [[1, 4], [2, 8], [3, 16], [4, 24], [5, 32], [6, 48], [7, 64]].forEach(([i, px]) => L.push(`--s${i}:${nearestPx(sp, px)}px;`));
    L.push(`--sec:${nearestPx(sp, 112)}px;--sec-m:${nearestPx(sp, 64)}px;--maxw:${state.layout.maxWidth}px;`);
    const b = state.button;
    L.push(`--btn-py:${b.py}px;--btn-px:${b.px}px;--btn-r:${b.shape === 'square' ? 0 : b.shape === 'pill' ? 999 : b.radius}px;`);
    L.push(`--btn-ff:${fontStack(f[b.font].family)};--btn-fs:var(--fs-${b.size});--btn-lh:${b.lh / 100};--btn-ls:${b.ls}em;--btn-fw:${b.weight};`);
    L.push(`--r1:${nearestPx(rd, 8)}px;--r2:${nearestPx(rd, 16)}px;--r3:${nearestPx(rd, 24)}px;--rp:${rd.length ? Math.max(...rd.map(x => x.px)) : 999}px;`);
    L.push('}');
    return L.join('');
  }

  function demoBody() {
    const lab = k => k.startsWith('fs-') || k.startsWith('font-') ? '--' + k : '--' + nameOf(k);
    const L = (...ks) => ` data-t="${esc(ks.map(lab).join(' · '))}"`;
    const brand = esc(state.name && state.name !== 'Untitled brand' ? state.name : 'Halden');
    const bars = [38, 52, 44, 66, 58, 74, 62, 88, 70, 96, 82, 100];
    const plans = [
      ['Starter', '$29', 'For freelancers getting their first projects out the door.', ['3 active projects', 'Brand kit & tokens', 'Email support'], false],
      ['Studio', '$79', 'For small teams that ship every week.', ['Unlimited projects', 'Shared design system', 'Client review links', 'Priority support'], true],
      ['Scale', '$199', 'For agencies managing many brands at once.', ['Everything in Studio', 'Custom domains', 'SSO & audit log'], false]];
    const faqs = [
      ['How long does a typical project take?', 'Most brand and website projects launch in four to eight weeks, depending on scope and how quickly feedback comes back.', true],
      ['Can we keep editing after launch?', 'Yes. Every project ships with a token file and a component library your team can extend without us.', false],
      ['Do you work with existing brands?', 'Often. We can refresh an identity carefully without losing the recognition you have already built.', false],
      ['What do you need from us to start?', 'A short call, access to anything you already have, and one person who can make final decisions.', false]];
    return `
<div id="tlabel"></div>
<header class="nav"><div class="wrap"><div class="nav-in"${L('bg-light', 'br-light')}>
  <a class="logo"${L('heading-dark', 'font-heading')}><span class="logo-mark"${L('primary', 'secondary')}></span>${brand}</a>
  <nav class="links"${L('paragraph-dark', 'fs-p-sm')}><a class="on"${L('bg-1', 'heading-dark')}>Product</a><a>Solutions</a><a>Pricing</a><a>Resources</a></nav>
  <a class="btn sm"${L('primary', 'on-primary')}>Get started</a>
</div></div></header>

<section class="hero"${L('bg-light')}>
  <div class="hero-glow"${L('primary', 'secondary', 'accent')}></div><div class="hero-lines"${L('br-light')}></div>
  <div class="wrap">
    <div class="hero-top">
      <span class="badge"${L('bg-light', 'br-light', 'paragraph-dark')}><b${L('primary', 'on-primary', 'fs-p-xs')}>New</b>Brand kits now sync with your codebase <i class="ph ph-arrow-right"></i></span>
      <h1 class="dis"${L('heading-dark', 'fs-dis', 'font-heading')}>Design that grows with your brand</h1>
      <p class="lead"${L('paragraph-dark', 'fs-p-lr', 'font-paragraph')}>One home for your identity, website and product UI, so every page your team ships looks unmistakably like you.</p>
      <div class="row">
        <a class="btn"${L('primary', 'on-primary')}>Start free trial<span class="arr"><i class="ph ph-arrow-right"></i></span></a>
        <a class="btn ghost"${L('bg-light', 'heading-dark', 'br-light')}><i class="ph ph-play-circle"></i>Watch demo</a>
      </div>
      <div class="proof"><div class="faces"><i></i><i></i><i></i><i></i></div><div><div class="stars"${L('secondary')}>★★★★★</div><span class="muted"${L('placeholder-dark', 'fs-p-sm')}>Loved by 4,000+ teams</span></div></div>
    </div>

    <div class="mock"${L('bg-light', 'br-light')}>
      <div class="mock-in">
        <div class="mock-bar"><div class="dots"><i></i><i></i><i></i></div><input class="mock-search" placeholder="Search projects, pages, tokens…"${L('bg-1', 'placeholder-dark', 'br-light')}></div>
        <div class="mock-body">
          <div class="mock-side"${L('paragraph-dark', 'fs-p-sm')}>
            <span class="on"${L('bg-2', 'heading-dark')}><i class="ph ph-squares-four"></i>Overview</span><span><i class="ph ph-palette"></i>Brand kit</span><span><i class="ph ph-browser"></i>Pages</span><span><i class="ph ph-users-three"></i>Team</span><span><i class="ph ph-gear-six"></i>Settings</span>
          </div>
          <div class="mock-main"${L('br-light')}>
            <div class="kpis">
              <div class="kpi"${L('bg-1')}><span class="xs muted">Visitors</span><b${L('heading-dark', 'fs-h5')}>48.2k</b><span class="xs up"${L('primary')}>+12.4%</span></div>
              <div class="kpi"><span class="xs muted">Sign-ups</span><b>3,190</b><span class="xs up">+8.1%</span></div>
              <div class="kpi"><span class="xs muted">Conversion</span><b>6.6%</b><span class="xs up">+1.2%</span></div>
            </div>
            <div class="chart"${L('primary', 'bg-2')}>${bars.map((h, i) => `<i class="${i > 6 ? 'hi' : ''}" style="height:${h}%"></i>`).join('')}</div>
          </div>
          <div class="mock-aside">
            <div class="ring-card"${L('bg-dark', 'paragraph-light')}><span class="xs">Launch readiness</span><div class="ring"${L('primary', 'br-dark')}><b${L('heading-light')}>72%</b></div><span class="xs muted"${L('placeholder-light')}>3 of 4 pages approved</span></div>
            <div class="task"${L('br-light')}><i class="ph ph-check"${L('accent')}></i><div><b class="small"${L('heading-dark')}>Homepage approved</b><div class="xs muted">2 minutes ago</div></div></div>
          </div>
        </div>
      </div>
      <div class="float f1"${L('bg-light', 'br-light')}><i class="ph ph-sparkle"${L('primary', 'on-primary')}></i>Tokens synced</div>
      <div class="float f2"><i class="ph ph-trend-up"${L('secondary')}></i>+38% conversion</div>
    </div>
  </div>
</section>

<div class="logos"${L('br-light')}><div class="wrap logos-in">
  <p class="muted"${L('placeholder-dark', 'fs-p-sm')}>Trusted by product teams at</p>
  <div class="logo-row"${L('placeholder-dark', 'font-heading')}><span><i class="ph-fill ph-hexagon"></i>Northwind</span><span><i class="ph-fill ph-circle-half"></i>Lumen</span><span><i class="ph-fill ph-triangle"></i>Apex&amp;Co</span><span><i class="ph-fill ph-asterisk"></i>Fieldwork</span><span><i class="ph-fill ph-diamond"></i>Orbital</span></div>
</div></div>

<section class="features"${L('bg-1')}><div class="wrap">
  <div class="sec-head center"><span class="ol"${L('overline', 'fs-ol', 'font-overline')}>Features</span><h2${L('heading-dark', 'fs-h2')}>Everything your brand needs, in one place</h2><p class="lead"${L('paragraph-dark', 'fs-p-lr')}>From the first logo sketch to the hundredth landing page, the system stays the same.</p></div>
  <div class="bento">
    <article class="b b1"${L('bg-light', 'br-light')}>
      <div class="ico"${L('bg-2', 'primary')}><i class="ph ph-pen-nib"></i></div>
      <h4${L('heading-dark', 'fs-h4')}>A living identity system</h4>
      <p${L('paragraph-dark', 'fs-p-rg')}>Colors, type and spacing defined once as tokens, then reused everywhere your brand appears.</p>
      <div class="spec"><span class="aa"${L('heading-dark', 'font-heading')}>Aa</span><div class="sw"><i style="background:var(--t-primary)"${L('primary')}></i><i style="background:var(--t-secondary)"${L('secondary')}></i><i style="background:var(--t-accent)"${L('accent')}></i><i style="background:var(--t-bg-dark)"${L('bg-dark')}></i></div></div>
    </article>
    <article class="b b2 dark"${L('bg-dark')}>
      <span class="small"${L('paragraph-light', 'fs-p-sm')}>Average time to launch</span>
      <span class="big"${L('heading-light', 'fs-dis')}>3.2×</span>
      <span class="small muted"${L('placeholder-light')}>faster than starting from scratch</span>
      <div class="spark"${L('primary')}></div>
    </article>
    <article class="b b3"${L('bg-light', 'br-light')}>
      <div class="ico"><i class="ph ph-browser"></i></div>
      <h4>Websites</h4><p>Fast, accessible marketing sites on a design system your team can extend.</p>
    </article>
    <article class="b b4"${L('bg-light', 'br-light')}>
      <div class="ico"><i class="ph ph-stack"></i></div>
      <h4>Component library</h4><p>Production-ready building blocks that match the brand pixel for pixel.</p>
      <div class="tags"${L('bg-1', 'br-light', 'fs-p-xs')}><span>Buttons</span><span>Forms</span><span>Cards</span><span>Navigation</span></div>
    </article>
    <article class="b b5"${L('primary', 'on-primary')}>
      <div class="ico"><i class="ph ph-chart-line-up"></i></div>
      <h4>Growth design</h4><p>Landing pages and experiments measured against real business goals.</p>
    </article>
  </div>
</div></section>

<section class="process"${L('bg-light')}><div class="wrap">
  <div class="split-head"><div class="sec-head"><span class="ol">How it works</span><h2${L('heading-dark', 'fs-h2')}>From kickoff to launch in four calm steps</h2></div><a class="textlink"${L('heading-dark', 'br-light')}>See a full case study<i class="ph ph-arrow-right"></i></a></div>
  <div class="steps">
    ${[['Discover', 'A workshop to align on goals, audience and what makes you different.', 'Week 1'], ['Define', 'Identity, tokens and key screens designed side by side.', 'Week 2–3'], ['Build', 'Pages and components built straight from the design system.', 'Week 4–6'], ['Launch', 'Go live, measure, and hand over everything your team needs.', 'Week 7']]
      .map(([h, p, w], i) => `<div class="st"><span class="num"${i === 0 ? L('primary', 'on-primary') : L('bg-light', 'br-light', 'heading-dark')}>0${i + 1}</span><h5${L('heading-dark', 'fs-h5')}>${h}</h5><p class="small"${L('paragraph-dark', 'fs-p-sm')}>${p}</p><span class="wk"${L('bg-2', 'heading-dark')}>${w}</span></div>`).join('')}
  </div>
</div></section>

<section class="stats dark"${L('bg-dark')}><div class="wrap stats-grid">
  <div><span class="ol"${L('overline')}>Results</span><h2${L('heading-light', 'fs-h2')}>Numbers our clients actually care about</h2><p${L('paragraph-light', 'fs-p-rg')}>Ten years of brands, websites and products for teams who sweat the details.</p></div>
  <div class="nums"${L('br-dark')}>${[['240', '+', 'Projects shipped'], ['98', '%', 'Clients who return'], ['14', '', 'Countries served'], ['4.9', '/5', 'Average rating']].map(([n, s, l]) => `<div><span class="dis"${L('heading-light', 'fs-dis')}>${n}<em${L('primary')}>${s}</em></span><span class="small"${L('paragraph-light', 'fs-p-sm')}>${l}</span></div>`).join('')}</div>
</div></section>

<section class="testimonials"${L('bg-2')}><div class="wrap">
  <div class="sec-head center"><span class="ol">Testimonials</span><h2${L('heading-dark', 'fs-h2')}>Teams that switched never looked back</h2></div>
  <div class="tgrid">
    <figure class="tc main"${L('bg-dark')}><i class="ph-fill ph-quotes"${L('accent')}></i><blockquote class="h3"${L('heading-light', 'fs-h3')}>“They gave us a brand that finally matches the product. Sign-ups doubled in the two months after launch.”</blockquote><div class="who"><span class="av"></span><div><b class="h6"${L('heading-light', 'fs-h6')}>Maya Lindqvist</b><span class="small muted"${L('placeholder-light')}>Head of Brand, Fieldwork</span></div></div></figure>
    <figure class="tc"${L('bg-light', 'br-light')}><p${L('paragraph-dark')}>“The token file alone saved our engineers weeks. Design and code finally speak the same language.”</p><div class="who"><span class="av"></span><div><b class="h6"${L('heading-dark', 'fs-h6')}>Daniel Osei</b><span class="small muted"${L('placeholder-dark')}>CTO, Orbital</span></div></div></figure>
    <figure class="tc"><p>“Calm process, clear weekly reviews, zero surprises at launch.”</p><div class="who"><span class="av"></span><div><b class="h6">Priya Raman</b><span class="small muted">Founder, Lumen</span></div></div></figure>
    <figure class="tc"><p>“Our site went from something we apologised for to something we send to investors first.”</p><div class="who"><span class="av"></span><div><b class="h6">Tom Becker</b><span class="small muted">CEO, Northwind</span></div></div></figure>
    <figure class="tc"><p>“Fast, thoughtful and genuinely fun to work with. We’ve hired them three times.”</p><div class="who"><span class="av"></span><div><b class="h6">Ana Ruiz</b><span class="small muted">Marketing Lead, Apex&amp;Co</span></div></div></figure>
  </div>
</div></section>

<section class="pricing"${L('bg-light')}><div class="wrap">
  <div class="sec-head center"><span class="ol">Pricing</span><h2${L('heading-dark', 'fs-h2')}>Simple plans that scale with you</h2>
    <div class="toggle"${L('bg-1', 'br-light')}><span>Monthly</span><span class="on"${L('bg-light', 'heading-dark')}>Yearly <em${L('primary')}>−20%</em></span></div></div>
  <div class="plans">${plans.map(([n, price, d, items, hot]) => `<article class="plan${hot ? ' hot dark' : ''}"${L(hot ? 'bg-dark' : 'bg-light', hot ? 'br-dark' : 'br-light')}>
    <div class="plan-top"><h3 class="h5"${L(hot ? 'heading-light' : 'heading-dark', 'fs-h5')}>${n}</h3>${hot ? `<span class="tag"${L('accent', 'heading-dark')}>Most popular</span>` : ''}</div>
    <div class="price"><span class="dis"${L(hot ? 'heading-light' : 'heading-dark', 'fs-dis')}>${price}</span><span class="small muted"${L(hot ? 'placeholder-light' : 'placeholder-dark')}>/ month</span></div>
    <p class="small"${L(hot ? 'paragraph-light' : 'paragraph-dark', 'fs-p-sm')}>${d}</p>
    <ul>${items.map(i => `<li><i class="ph ph-check"></i>${i}</li>`).join('')}</ul>
    <a class="btn${hot ? '' : ' ghost'}"${hot ? L('primary', 'on-primary') : L('heading-dark', 'br-light')}>Choose ${n}</a>
  </article>`).join('')}</div>
</div></section>

<section class="faq"${L('bg-1')}><div class="wrap faq-grid">
  <div class="sec-head"><span class="ol">FAQ</span><h2${L('heading-dark', 'fs-h2')}>Questions, answered</h2><p${L('paragraph-dark')}>Can’t find what you’re looking for? Our team replies within one working day.</p><a class="btn ghost"${L('bg-light', 'br-light', 'heading-dark')}><i class="ph ph-chat-circle-dots"></i>Talk to us</a></div>
  <div>${faqs.map(([q, a, open]) => `<details class="qa"${open ? ' open' : ''}${L('br-light')}><summary${L('heading-dark', 'fs-h6')}>${q}<i class="ph ph-plus"></i></summary><p${L('paragraph-dark')}>${a}</p></details>`).join('')}</div>
</div></section>

<section class="cta-sec"${L('bg-1')}><div class="wrap">
  <div class="cta"${L('primary')}>
    <div><h2 class="h2"${L('on-primary', 'fs-h2')}>Ready to build something lasting?</h2><p${L('on-primary')}>Start free for 14 days. No credit card, cancel any time.</p></div>
    <div class="cta-actions"><a class="btn inv"${L('on-primary', 'primary')}>Start your free trial<i class="ph ph-arrow-right"></i></a><small${L('on-primary', 'fs-p-xs')}>Join 4,000+ teams already building</small></div>
  </div>
</div></section>

<footer class="foot dark"${L('bg-dark')}><div class="wrap">
  <div class="foot-grid">
    <div><a class="logo"${L('heading-light')}><span class="logo-mark"></span>${brand}</a><p class="small"${L('paragraph-light', 'fs-p-sm')}>Brand identities, websites and design systems for teams who care about the details.</p></div>
    ${[['Product', ['Overview', 'Brand kit', 'Pricing', 'Changelog']], ['Company', ['About', 'Careers', 'Journal', 'Contact']]].map(([h, ls]) => `<div><h6${L('heading-light', 'fs-h6')}>${h}</h6><ul${L('paragraph-light')}>${ls.map(x => `<li><a>${x}</a></li>`).join('')}</ul></div>`).join('')}
    <div><h6>Stay in the loop</h6><p class="small">One short email a month. No spam.</p><form class="news"${L('br-dark')} onsubmit="return false"><input placeholder="you@company.com"${L('placeholder-light', 'heading-light')}><button class="btn"${L('primary', 'on-primary')}>Subscribe</button></form></div>
  </div>
  <div class="foot-bottom"${L('br-dark', 'placeholder-light')}><span>© 2026 ${brand}. All rights reserved.</span><span>Privacy · Terms · Cookies</span></div>
  <div class="wordmark" aria-hidden="true"${L('br-dark', 'font-heading')}>${brand}</div>
</div></footer>`;
  }

  const LABEL_SCRIPT = `document.addEventListener('mousemove',function(e){var l=document.getElementById('tlabel');if(!l)return;var t=e.target.closest&&e.target.closest('[data-t]');if(!t||!document.documentElement.classList.contains('labels')){l.classList.remove('on');return;}l.textContent=t.getAttribute('data-t');l.classList.add('on');var x=e.clientX+14,y=e.clientY+16;if(x+l.offsetWidth>innerWidth-8)x=innerWidth-l.offsetWidth-8;if(y+l.offsetHeight>innerHeight-8)y=e.clientY-l.offsetHeight-10;l.style.left=x+'px';l.style.top=y+'px';});`;

  function demoShell(full) {
    const fonts = full ? Object.keys(fontFamilies()).map(f => `<link rel="stylesheet" href="${fontHref(f, true)}">`).join('') : '';
    return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(state.name)} — preview</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/fill/style.css">${fonts}
<style>${DEMO_STYLE}</style><style id="tok">${full ? demoVars() : ''}</style></head><body>${full ? demoBody() : ''}<script>${LABEL_SCRIPT}<\/script></body></html>`;
  }

  function mountStage(stage, fixedDevice) {
    const ifr = document.createElement('iframe');
    ifr.className = 'demo-frame';
    ifr.title = 'Website preview';
    stage.appendChild(ifr);
    const f = { stage, ifr, fixedDevice, ready: false, html: null };
    ifr.addEventListener('load', () => { f.ready = true; f.html = null; updateFrame(f); });
    ifr.srcdoc = demoShell(false);
    f.ro = new ResizeObserver(() => fit(f));
    f.ro.observe(stage);
    frames.push(f);
    fit(f);
  }
  function fit(f) {
    const device = f.fixedDevice || state.preview.device;
    const w = DEVICES[device];
    const sw = f.stage.clientWidth, sh = f.stage.clientHeight;
    if (!sw || !sh) return;
    const s = Math.min(1, sw / w);
    Object.assign(f.ifr.style, { width: w + 'px', height: (sh / s) + 'px', transform: `scale(${s})`, left: Math.max(0, (sw - w * s) / 2) + 'px' });
    f.stage.dataset.device = device;
  }
  function updateFrame(f) {
    if (!f.ready) return;
    const d = f.ifr.contentDocument; if (!d || !d.body) return;
    d.getElementById('tok').textContent = demoVars();
    Object.keys(fontFamilies()).forEach(fam => ensureFontIn(d, fam));
    const html = demoBody();
    if (f.html !== html) { d.body.innerHTML = html; f.html = html; }
    d.documentElement.classList.toggle('labels', !!state.preview.labels && !f.fixedDevice);
  }
  let previewRaf = 0;
  function schedulePreview() {
    if (previewRaf) return;
    previewRaf = requestAnimationFrame(() => { previewRaf = 0; frames.forEach(updateFrame); });
  }
  function unmountFrames() {
    frames.forEach(f => f.ro.disconnect());
    frames.length = 0;
  }

  /* ------------------------------------------------------------------ regions (re-rendered on every change) */
  const REGIONS = {
    palmeta(id) {
      const p = pal(id); if (!p) return '';
      const sh = shadesFor(p);
      return `<span class="dim">${esc(sh.name)}</span><span class="dot-sep"></span><code>--${paletteSlugs()[p.id]}-*</code>`;
    },
    strip(id) {
      const p = pal(id); if (!p) return '';
      const sh = shadesFor(p);
      return SHADES.map(s => {
        const hex = sh.map[s];
        const w = chroma.contrast(hex, '#FFFFFF'), b = chroma.contrast(hex, '#000000');
        const txt = w >= b ? '#FFFFFF' : '#000000';
        return `<button class="sw" style="--c:${hex};color:${txt}" data-copy="${hex}" title="Copy ${hex}">
          <span class="sw-n">${s}${sh.locked === s ? '<i class="ph-fill ph-push-pin" title="Your input color"></i>' : ''}</span>
          <span class="sw-hex">${hex.slice(1)}</span>
          <span class="sw-c">${(w >= b ? w : b).toFixed(1)}</span></button>`;
      }).join('');
    },
    pickbg(id) { const p = pal(id); return p ? `<span class="pick-fill" style="background:${p.hex}"></span>` : ''; },
    tsw(id) { const t = tok(id); return t ? `<span class="tsw-fill" style="--c:${tokValue(t)}"></span>` : ''; },
    tsrc(id) { const t = tok(id); return t ? `${esc(srcLabel(t))}${t.alpha < 100 ? ` <span class="dim">@${t.alpha}%</span>` : ''}<span class="tval">${tokValue(t)}</span>` : ''; },
    talpha(id) { const t = tok(id); return t ? `${t.alpha}%` : ''; },
    checks() {
      return CHECKS.filter(([a, b]) => tokKey(a) && tokKey(b)).map(([fg, bg, label]) => {
        const c = contrastOf(fg, bg); const g = grade(c.ratio);
        return `<div class="chk">
          <span class="chk-aa" style="background:${c.bg};color:${c.fg}">Aa</span>
          <div class="chk-txt"><b>${label}</b><span>--${esc(nameOf(fg))} / --${esc(nameOf(bg))}</span></div>
          <span class="chk-r">${c.ratio.toFixed(2)}</span><span class="pill ${g.cls}">${g.label}</span></div>`;
      }).join('');
    },
    tsample(key) {
      const s = typeSizes().find(x => x.key === key); if (!s) return '';
      const f = state.type.fonts[s.role];
      const txt = s.role === 'heading' ? state.type.sample : s.role === 'overline' ? 'Overline label' :
        'Good typography is invisible: it sets a calm rhythm so readers can focus on what you are saying.';
      return `<div style="font-family:${esc(fontStack(f.family))};font-weight:${f.weight};line-height:${f.lh / 100};letter-spacing:${f.ls}em;text-transform:${f.transform};font-size:${sizeAt(s, ui.typeDevice)}px">${esc(txt)}</div>`;
    },
    tclamp(key) {
      const s = typeSizes().find(x => x.key === key); if (!s) return '';
      const o = state.type.overrides[key];
      return `<span class="sz">${fmt(s.min, 2)} → ${fmt(s.max, 2)}px${o ? ' <span class="pill warn">edited</span>' : ''}</span><code>${s.css}</code>`;
    },
    sbar(arg) {
      const [list, id] = arg.split(':');
      const row = state[list].find(x => x.id === id); if (!row) return '';
      return list === 'spacing'
        ? `<span class="sbar" style="width:${Math.min(row.px, 160)}px"></span>`
        : `<span class="rbox" style="border-radius:${Math.min(row.px, 28)}px"></span>`;
    },
    btnpreview() {
      const bt = btnSpec();
      const base = `font-family:${esc(fontStack(bt.family))};font-weight:${bt.weight};font-size:${bt.size.max}px;line-height:${bt.lh / 100};letter-spacing:${bt.ls}em;` +
        `padding:${bt.raw.py}px ${bt.raw.px}px;border-radius:${bt.radius.css.startsWith('var') ? bt.raw.radius + 'px' : bt.radius.css}`;
      return `<div class="btn-bg" style="background:${tokValue(tokKey('bg-light'))}">
        <span class="demo-btn" style="${base};background:${tokValue(tokKey('primary'))};color:${tokValue(tokKey('on-primary'))}">Get started</span>
        <span class="demo-btn" style="${base};background:transparent;color:${tokValue(tokKey('heading-dark'))};box-shadow:inset 0 0 0 1px ${tokValue(tokKey('br-light'))}">Learn more</span>
      </div>`;
    },
    exportcode() {
      const txt = exportText();
      if (ui.exportTab === 'md' && ui.mdPreview) return renderMarkdown(txt);
      if (ui.exportTab !== 'md' || ui.anchor == null) return esc(txt);
      // mark the spot an option toggle changed: an anchor to scroll to, and a flash over an added section
      const lines = txt.split('\n');
      const a = Math.min(ui.anchor, lines.length - 1);
      let end = a;
      if (ui.flash) { end = lines.findIndex((l, i) => i > a && /^#{2,3} /.test(l)); if (end < 0) end = lines.length; }
      return esc(lines.slice(0, a).join('\n')) + (a ? '\n' : '') + '<span id="code-anchor"></span>' +
        (ui.flash ? `<mark class="code-flash">${esc(lines.slice(a, end).join('\n'))}</mark>${end < lines.length ? '\n' : ''}` : '') +
        esc(lines.slice(ui.flash ? end : a).join('\n'));
    },
    exportmeta() {
      const txt = exportText();
      return `${txt.split('\n').length} lines · ${(new Blob([txt]).size / 1024).toFixed(1)} KB`;
    }
  };

  // Small markdown renderer for the preview. It covers exactly what buildMarkdown writes:
  // headings, blockquotes, lists, tables, fenced code, paragraphs, inline code, bold and links.
  function renderMarkdown(md) {
    const inline = s => esc(s)
      .replace(/`([^`]+)`/g, (m, c) => {
        const hex = /^#([0-9A-F]{6}|[0-9A-F]{8})$/i.test(c);
        return hex ? `<code class="hex"><span class="dot" style="background:${c}"></span>${c}</code>` : `<code>${c}</code>`;
      })
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)&"]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
    const cells = row => row.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => inline(c.trim().replace(/\\\|/g, '|')));
    const lines = md.split('\n');
    const out = [];
    for (let i = 0; i < lines.length;) {
      const l = lines[i];
      if (!l.trim()) { i++; continue; }
      if (l.startsWith('```')) {
        const lang = l.slice(3).trim(); const buf = [];
        for (i++; i < lines.length && !lines[i].startsWith('```'); i++) buf.push(lines[i]);
        i++;
        out.push(`<pre class="md-code"${lang ? ` data-lang="${esc(lang)}"` : ''}><code>${esc(buf.join('\n'))}</code></pre>`);
        continue;
      }
      const h = l.match(/^(#{1,6})\s+(.*)$/);
      if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }
      if (l.startsWith('>')) {
        const buf = []; for (; i < lines.length && lines[i].startsWith('>'); i++) buf.push(lines[i].replace(/^>\s?/, ''));
        out.push(`<blockquote>${inline(buf.join(' '))}</blockquote>`); continue;
      }
      if (l.startsWith('|') && /^\|?\s*:?-{3}/.test(lines[i + 1] || '')) {
        const head = cells(l); const rows = [];
        for (i += 2; i < lines.length && lines[i].startsWith('|'); i++) rows.push(cells(lines[i]));
        out.push(`<div class="md-table"><table><thead><tr>${head.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
        continue;
      }
      if (/^[-*]\s/.test(l)) {
        const buf = []; for (; i < lines.length && /^[-*]\s/.test(lines[i]); i++) buf.push(`<li>${inline(lines[i].replace(/^[-*]\s/, ''))}</li>`);
        out.push(`<ul>${buf.join('')}</ul>`); continue;
      }
      const buf = [];
      for (; i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|>|\||[-*]\s)/.test(lines[i]); i++) buf.push(lines[i]);
      out.push(`<p>${buf.map(inline).join('<br>')}</p>`);
    }
    return out.join('\n');
  }

  // the heading each branding.md option adds, used to scroll the code panel to it
  const EXPORT_MARKS = { palettes: '### Palettes', contrast: '### Contrast', rules: '### Layout rules', icons: '## Icons', css: '## CSS variables' };

  function exportText() {
    return ui.exportTab === 'css' ? buildCss() : ui.exportTab === 'tw' ? buildTailwind() : ui.exportTab === 'json' ? JSON.stringify(state, null, 2) : buildMarkdown();
  }

  function getPath(obj, path) { return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj); }
  function setPath(obj, path, val) {
    const ks = path.split('.'); const last = ks.pop();
    const target = ks.reduce((o, k) => o[k], obj);
    target[last] = val;
  }

  function syncBound() {
    const active = document.activeElement;
    $$('[data-bind]').forEach(el => {
      if (el === active) return;
      const v = getPath(state, el.dataset.bind);
      if (el.type === 'checkbox') { el.checked = !!v; return; }
      if (el.tagName === 'SELECT' && v != null && ![...el.options].some(o => o.value === String(v))) {
        [...el.options].filter(o => o.dataset.custom).forEach(o => o.remove());
        const o = new Option(`${v} · Custom`, String(v)); o.dataset.custom = '1'; el.add(o);
      }
      if (v != null && String(el.value) !== String(v)) el.value = v;
    });
    $$('[data-ov]').forEach(el => {
      const s = typeSizes().find(x => x.key === el.dataset.ov);
      if (s) el.placeholder = fmt(s.auto[el.dataset.end], 2);
    });
  }

  function softRefresh() {
    $$('[data-region]').forEach(el => {
      const fn = REGIONS[el.dataset.region];
      if (fn) el.innerHTML = fn(el.dataset.arg);
    });
    syncBound();
    schedulePreview();
    document.title = `Typolor Studio · ${state.name}`;
    save();
  }

  /* ------------------------------------------------------------------ views */
  const stepIndex = id => STEPS.findIndex(s => s.id === id);

  function head(title, desc, actions = '') {
    return `<div class="vhead"><div class="vhead-text"><span class="eyebrow">Step ${stepIndex(state.step) + 1} of ${STEPS.length}</span><h1>${title}</h1><p>${desc}</p></div>${actions ? `<div class="vhead-actions">${actions}</div>` : ''}</div>`;
  }
  function foot() {
    const i = stepIndex(state.step);
    const prev = STEPS[i - 1], next = STEPS[i + 1];
    return `<div class="vfoot">${prev ? `<button class="btn ghost" data-go="${prev.id}"><i class="ph ph-arrow-left"></i>${prev.label}</button>` : '<span></span>'}
      ${next ? `<button class="btn primary" data-go="${next.id}">Next: ${next.label}<i class="ph ph-arrow-right"></i></button>` : ''}</div>`;
  }

  function viewColors() {
    const n = state.palettes.length;
    const hues = (() => {
      const base = state.palettes[0].hex; const h = chroma(base).get('hsl.h') || 0;
      const rot = d => chroma(base).set('hsl.h', ((h + d) % 360 + 360) % 360).hex().toUpperCase();
      return [['Complementary', rot(180)], ['Analogous', rot(30)], ['Analogous', rot(-30)], ['Triadic', rot(120)], ['Split', rot(150)]];
    })();
    const status = [['Success', '#22C55E'], ['Warning', '#F59E0B'], ['Danger', '#EF4444'], ['Info', '#0EA5E9']];
    const hasNeutral = state.palettes.some(p => p.kind === 'neutral');
    return `${head('Brand colors', 'Add your brand colors and each gets an 11-step shade scale. The first is your primary; mark one as neutral for text, backgrounds and borders.',
      `<div class="seeds" aria-label="Quick primary colors"><span class="seeds-label">Try a primary</span>${SEEDS.map(c => `<button class="seed" style="--c:${c}" data-act="seed" data-hex="${c}" title="${c}"></button>`).join('')}</div>`)}
    <div class="pal-list">
      ${(() => {
        const card = palCard;
        const brand = state.palettes.map((p, i) => [p, i]).filter(([p]) => p.kind !== 'neutral');
        const neutral = state.palettes.map((p, i) => [p, i]).filter(([p]) => p.kind === 'neutral');
        const adder = n < 8 ? `
      <div class="add-divider">
        <button class="add-plus" data-act="add-next" title="Add a ${esc(nextRole())} color"><i class="ph ph-plus"></i></button>
        <div class="add-text"><button class="add-main" data-act="add-next">Add ${esc(nextRole())} color</button>
          <button class="add-more ${ui.addOpen ? 'on' : ''}" data-act="add-toggle" aria-expanded="${!!ui.addOpen}">Suggestions<i class="ph ph-caret-down"></i></button></div>
      </div>
      ${ui.addOpen ? `<div class="card addcard">
        <div class="add-row"><span class="add-label">Harmony</span>${hues.map(([l, h]) => `<button class="chip" data-act="add-pal" data-hex="${h}"><span class="chip-dot" style="background:${h}"></span>${l}</button>`).join('')}</div>
        <div class="add-row"><span class="add-label">Status</span>${status.map(([l, h]) => `<button class="chip" data-act="add-pal" data-hex="${h}" data-role="${l}"><span class="chip-dot" style="background:${h}"></span>${l}</button>`).join('')}
          ${hasNeutral ? '' : `<button class="chip" data-act="add-neutral"><span class="chip-dot" style="background:${tintNeutral(state.palettes[0].hex)}"></span>Neutral</button>`}</div>
      </div>` : ''}` : '';
        return brand.map(([p, i]) => card(p, i)).join('') + adder + neutral.map(([p, i]) => card(p, i)).join('');
      })()}
    </div>
    <p class="hint"><i class="ph ph-info"></i>Click any shade to copy it. The pin marks where your input color sits. Numbers under each hex are the contrast ratio against the text color shown.</p>
    ${foot()}`;
  }

  function palCard(p, i) {
    const n = state.palettes.length;
    return `
      <article class="card pcard" data-pid="${p.id}">
        <div class="pcard-head">
          <label class="pick" title="Pick a color"><span data-region="pickbg" data-arg="${p.id}"></span><input type="color" value="${p.hex.toLowerCase()}" data-pal-color="${p.id}" aria-label="Color picker for ${esc(p.role)}"></label>
          <div class="pcard-id">
            <div class="pcard-title">
              <input class="role-input" value="${esc(p.role)}" data-bind="palettes.${i}.role" spellcheck="false" aria-label="Color name">
              ${i === 0 ? '<span class="pill">Primary</span>' : ''}${p.kind === 'neutral' ? '<span class="pill">Neutral</span>' : ''}
            </div>
            <div class="pcard-meta"><input class="hex-input" value="${p.hex}" data-pal-hex="${p.id}" maxlength="7" spellcheck="false" aria-label="Hex value"><span class="meta" data-region="palmeta" data-arg="${p.id}"></span></div>
          </div>
          <div class="pcard-tools">
            <div class="seg" role="group" aria-label="Shade algorithm">${Object.keys(MODES).map(m => `<button class="${p.mode === m ? 'on' : ''}" data-act="mode" data-pid="${p.id}" data-val="${m}" title="${{ original: 'Match the nearest hand-tuned scale', lockInputColor: 'Pin your exact color to a chosen shade', apca: 'Lightness tuned for APCA text contrast' }[m]}">${MODES[m]}</button>`).join('')}</div>
            ${p.mode === 'lockInputColor' ? `<label class="lock-at">at <select class="sel sm" data-bind="palettes.${i}.lockShade" data-num>${SHADES.map(s => `<option value="${s}" ${s == p.lockShade ? 'selected' : ''}>${s}</option>`).join('')}</select></label>` : ''}
            ${i === 0 ? '' : `<button class="icon-btn ${p.kind === 'neutral' ? 'on' : ''}" data-act="neutral" data-pid="${p.id}" title="${p.kind === 'neutral' ? 'Neutral color' : 'Use as neutral (text, backgrounds, borders)'}" aria-pressed="${p.kind === 'neutral'}"><i class="ph ph-drop-half"></i></button>`}
            ${p.kind === 'neutral' && i > 0 ? `<button class="icon-btn" data-act="retint" data-pid="${p.id}" title="Re-tint from primary"><i class="ph ph-arrows-clockwise"></i></button>` : ''}
            ${n > 1 ? `<button class="icon-btn" data-act="del-pal" data-pid="${p.id}" title="Remove ${esc(p.role)}"><i class="ph ph-trash"></i></button>` : ''}
          </div>
        </div>
        <div class="strip" data-region="strip" data-arg="${p.id}"></div>
      </article>`;
  }

  function viewRoles() {
    const rows = g => state.tokens.map((t, i) => [t, i]).filter(([t]) => t.group === g).map(([t, i]) => `
      <div class="trow" data-row="${t.id}">
        <div class="tlead">
          <button class="drag-handle" data-handle="${t.id}" title="Drag to reorder (or focus and use ↑ ↓)" aria-label="Reorder --${esc(t.name)}"><i class="ph ph-equals"></i></button>
          <button class="tsw" data-act="pick" data-tid="${t.id}" aria-label="Change color for --${esc(t.name)}"><span data-region="tsw" data-arg="${t.id}"></span></button>
        </div>
        <label class="tname"><span>--</span><input value="${esc(t.name)}" data-bind="tokens.${i}.name" spellcheck="false" aria-label="Variable name"></label>
        <span class="tsrc" data-region="tsrc" data-arg="${t.id}"></span>
        <label class="talpha" title="Opacity"><input type="range" min="0" max="100" step="5" value="${t.alpha}" data-bind="tokens.${i}.alpha" data-num aria-label="Opacity"><span data-region="talpha" data-arg="${t.id}"></span></label>
        <input class="tnote" value="${esc(t.note)}" data-bind="tokens.${i}.note" placeholder="Use for…" aria-label="Use for">
        ${t.key.startsWith('custom') ? `<button class="icon-btn sm" data-act="del-token" data-tid="${t.id}" title="Remove variable"><i class="ph ph-x"></i></button>` : '<span class="icon-spacer"></span>'}
      </div>`).join('');
    return `${head('Color roles', 'Map shades to the variables your AI will use. Click a swatch to pick a shade, set its opacity and note what it is for in branding.md.',
      `<button class="btn ghost" data-act="auto-roles"><i class="ph ph-magic-wand"></i>Auto-assign</button><button class="btn ghost" data-act="add-token"><i class="ph ph-plus"></i>Add variable</button>`)}
    <div class="split">
      <div class="col-main">
        ${GROUPS.filter(g => state.tokens.some(t => t.group === g)).map(g => `<section class="card tgroup" data-group="${g}">
          <div class="tgroup-head"><h2 class="card-title">${g}</h2><button class="btn ghost sm" data-act="add-token" data-group="${g}" title="Add a ${g.toLowerCase()} variable"><i class="ph ph-plus"></i>Add</button></div>
          <div class="tlist">${rows(g)}</div></section>`).join('')}
      </div>
      <aside class="col-side">
        <section class="card"><h2 class="card-title">Contrast checks <span class="dim">WCAG 2.1</span></h2><div class="checks" data-region="checks"></div></section>
        <section class="card mini">
          <div class="mini-head"><h2 class="card-title">Live preview</h2><button class="btn ghost sm" data-go="preview">Full preview<i class="ph ph-arrows-out-simple"></i></button></div>
          <div class="stage mini-stage" id="miniStage"></div>
        </section>
      </aside>
    </div>${foot()}`;
  }

  function fontCard(role, title) {
    const b = `type.fonts.${role}`; const f = state.type.fonts[role];
    return `<section class="card fcard">
      <h2 class="card-title">${title} <code class="dim">--font-${role}</code></h2>
      <div class="field"><span>Family</span>
        <button class="font-field" data-act="font-pick" data-role="${role}" aria-haspopup="listbox">
          <span class="ff-name" style="font-family:${esc(fontStack(f.family))}">${esc(f.family)}</span>
          <span class="ff-cat">${FONT_CAT[f.family] ? CAT_LABEL[FONT_CAT[f.family]] : 'Custom'}</span>
          <i class="ph ph-caret-up-down"></i>
        </button></div>
      <div class="field-row">
        <label class="field"><span>Weight</span><select class="sel" data-bind="${b}.weight" data-num>${[100, 200, 300, 400, 500, 600, 700, 800, 900].map(w => `<option value="${w}" ${w == f.weight ? 'selected' : ''}>${w}</option>`).join('')}</select></label>
        <label class="field"><span>Case</span><select class="sel" data-bind="${b}.transform">${['none', 'uppercase', 'lowercase', 'capitalize'].map(x => `<option ${x === f.transform ? 'selected' : ''}>${x}</option>`).join('')}</select></label>
      </div>
      <label class="field"><span>Line height <output data-out="${b}.lh">${f.lh}%</output></span><input type="range" min="80" max="200" step="1" value="${f.lh}" data-bind="${b}.lh" data-num></label>
      <label class="field"><span>Letter spacing <output data-out="${b}.ls">${f.ls}em</output></span><input type="range" min="-0.1" max="0.3" step="0.005" value="${f.ls}" data-bind="${b}.ls" data-num></label>
    </section>`;
  }

  function viewType() {
    const t = state.type;
    const ratioSel = which => `<div class="ratio">
      <select class="sel" data-bind="type.${which}" data-num>${RATIOS.map(([r, n]) => `<option value="${r}" ${Math.abs(r - t[which]) < 0.0005 ? 'selected' : ''}>${r} · ${n}</option>`).join('')}${RATIOS.some(([r]) => Math.abs(r - t[which]) < 0.0005) ? '' : `<option value="${t[which]}" data-custom="1" selected>${t[which]} · Custom</option>`}</select>
      <input class="inp num" type="number" step="0.001" min="1" max="2" value="${t[which]}" data-bind="type.${which}" data-num aria-label="Custom ratio"></div>`;
    return `${head('Typography', 'Pick fonts for headings, paragraphs and overlines, then set the scale. Headings grow from a mobile to a desktop ratio with fluid clamp().')}
    <div class="split type-split">
      <div class="col-side left">
        <section class="card">
          <h2 class="card-title">Scale</h2>
          <div class="field-row">
            <label class="field"><span>Base size</span><div class="unit-inp"><input class="inp num" type="number" min="10" max="24" step="1" value="${t.base}" data-bind="type.base" data-num><em>px</em></div></label>
            <label class="field check-field"><input type="checkbox" ${t.roundPx ? 'checked' : ''} data-bind="type.roundPx"><span>Round to whole px</span></label>
          </div>
          <label class="field"><span>Desktop ratio</span>${ratioSel('ratioMax')}</label>
          <label class="field check-field"><input type="checkbox" ${t.fluid ? 'checked' : ''} data-bind="type.fluid"><span>Fluid headings (smaller on mobile)</span></label>
          <label class="field"><span>Mobile ratio</span>${ratioSel('ratioMin')}</label>
          <div class="field-row">
            <label class="field"><span>Mobile viewport</span><div class="unit-inp"><input class="inp num" type="number" step="10" value="${t.vwMin}" data-bind="type.vwMin" data-num><em>px</em></div></label>
            <label class="field"><span>Desktop viewport</span><div class="unit-inp"><input class="inp num" type="number" step="10" value="${t.vwMax}" data-bind="type.vwMax" data-num><em>px</em></div></label>
          </div>
        </section>
        ${fontCard('heading', 'Headings')}
        ${fontCard('paragraph', 'Paragraphs')}
        ${fontCard('overline', 'Overline')}
      </div>
      <div class="col-main">
        <section class="card specimen">
          <div class="spec-bar">
            <input class="inp" value="${esc(t.sample)}" data-bind="type.sample" aria-label="Sample heading text" placeholder="Sample heading">
            <div class="seg">${['mobile', 'desktop'].map(d => `<button class="${ui.typeDevice === d ? 'on' : ''}" data-act="tdev" data-val="${d}"><i class="ph ph-${d === 'mobile' ? 'device-mobile' : 'desktop'}"></i>${d === 'mobile' ? 'Mobile' : 'Desktop'}</button>`).join('')}</div>
          </div>
          ${TYPE_STEPS.map(s => {
            const o = t.overrides[s.key] || {};
            return `<div class="spec-row ${s.role}">
              <div class="spec-meta">
                <b>--fs-${s.key}</b><span>${s.label}</span>
                <div class="ov" title="Override sizes (px). Leave empty to use the scale.">
                  <input type="number" step="0.5" data-ov="${s.key}" data-end="min" value="${o.min ?? ''}" aria-label="Mobile size override">
                  <i class="ph ph-arrow-right"></i>
                  <input type="number" step="0.5" data-ov="${s.key}" data-end="max" value="${o.max ?? ''}" aria-label="Desktop size override">
                  ${t.overrides[s.key] ? `<button class="icon-btn sm" data-act="ov-reset" data-key="${s.key}" title="Back to scale"><i class="ph ph-arrow-counter-clockwise"></i></button>` : ''}
                </div>
              </div>
              <div class="spec-sample" data-region="tsample" data-arg="${s.key}"></div>
              <div class="spec-clamp" data-region="tclamp" data-arg="${s.key}"></div>
            </div>`;
          }).join('')}
        </section>
      </div>
    </div>${foot()}`;
  }

  function buttonCard() {
    const b = state.button;
    return `<section class="card btn-card">
      <div class="mini-head"><h2 class="card-title">Button</h2><button class="btn ghost sm" data-act="reset-button">Reset</button></div>
      <div class="field"><span>Shape</span>
        <div class="seg shape-seg" role="group" aria-label="Button shape">${Object.keys(BTN_SHAPES).map(k => `<button class="${b.shape === k ? 'on' : ''}" data-act="btn-shape" data-val="${k}"><span class="shape-ico ${k}"></span>${BTN_SHAPES[k]}</button>`).join('')}</div>
      </div>
      <div class="field-row three">
        ${b.shape === 'rounded' ? `<label class="field"><span>Corner radius</span><div class="unit-inp"><input class="inp num" type="number" min="0" max="60" value="${b.radius}" data-bind="button.radius" data-num><em>px</em></div></label>` : ''}
        <label class="field"><span>Padding top / bottom</span><div class="unit-inp"><input class="inp num" type="number" min="0" max="48" value="${b.py}" data-bind="button.py" data-num><em>px</em></div></label>
        <label class="field"><span>Padding left / right</span><div class="unit-inp"><input class="inp num" type="number" min="0" max="80" value="${b.px}" data-bind="button.px" data-num><em>px</em></div></label>
      </div>
      <div class="field-row three">
        <label class="field"><span>Font family</span><select class="sel" data-bind="button.font">${Object.keys(FONT_ROLES).map(r =>
          `<option value="${r}" ${b.font === r ? 'selected' : ''}>${FONT_ROLES[r]} · ${esc(state.type.fonts[r].family)}</option>`).join('')}</select></label>
        <label class="field"><span>Font size</span><select class="sel" data-bind="button.size">${typeSizes().filter(s => s.role === 'paragraph').map(s =>
          `<option value="${s.key}" ${b.size === s.key ? 'selected' : ''}>${s.label.replace('Paragraph ', '')[0].toUpperCase() + s.label.replace('Paragraph ', '').slice(1)} · ${fmt(s.max, 2)}px</option>`).join('')}</select></label>
        <label class="field"><span>Font weight</span><select class="sel" data-bind="button.weight" data-num>${[[100, 'Thin'], [200, 'Extra light'], [300, 'Light'], [400, 'Regular'], [500, 'Medium'], [600, 'Semibold'], [700, 'Bold'], [800, 'Extra bold'], [900, 'Black']].map(([w, n]) =>
          `<option value="${w}" ${Number(b.weight) === w ? 'selected' : ''}>${w} · ${n}</option>`).join('')}</select></label>
      </div>
      <div class="field-row">
        <label class="field"><span>Line height <output data-out="button.lh">${b.lh}%</output></span><input type="range" min="80" max="200" step="1" value="${b.lh}" data-bind="button.lh" data-num></label>
        <label class="field"><span>Letter spacing <output data-out="button.ls">${b.ls}em</output></span><input type="range" min="-0.1" max="0.3" step="0.005" value="${b.ls}" data-bind="button.ls" data-num></label>
      </div>
      <div class="btn-stage" data-region="btnpreview"></div>
    </section>`;
  }

  function viewSpace() {
    const list = (key, title, prefixHint) => `<section class="card">
      <div class="mini-head"><h2 class="card-title">${title}</h2><div class="btn-row"><button class="btn ghost sm" data-act="reset-list" data-list="${key}">Reset</button><button class="btn ghost sm" data-act="add-row" data-list="${key}"><i class="ph ph-plus"></i>Add</button></div></div>
      <div class="slist">${state[key].map((r, i) => `<div class="srow">
        <label class="tname"><span>--</span><input value="${esc(r.name)}" data-bind="${key}.${i}.name" spellcheck="false" aria-label="${prefixHint} name"></label>
        <div class="unit-inp"><input class="inp num" type="number" min="0" value="${r.px}" data-bind="${key}.${i}.px" data-num aria-label="Value in px"><em>px</em></div>
        <span class="svis" data-region="sbar" data-arg="${key}:${r.id}"></span>
        <button class="icon-btn sm" data-act="del-row" data-list="${key}" data-id="${r.id}" title="Remove"><i class="ph ph-x"></i></button>
      </div>`).join('')}</div></section>`;
    return `${head('Spacing & shape', 'Set your spacing and radius scales, then write layout rules in plain words so your AI keeps rhythm and corners consistent on every page.')}
    <div class="grid2 space-grid">
      <div class="stack">
        ${list('spacing', 'Spacing', 'Spacing')}
        <section class="card">
          <div class="mini-head"><h2 class="card-title">Container</h2><button class="btn ghost sm" data-act="reset-container">Reset</button></div>
          <div class="srow container-row">
            <span class="tname"><span>--</span><b class="mono">max-width</b></span>
            <div class="unit-inp"><input class="inp num" type="number" min="320" max="2560" step="8" value="${state.layout.maxWidth}" data-bind="layout.maxWidth" data-num aria-label="Container max width in px"><em>px</em></div>
            <span class="muted-p">Max width of the page content, centered</span>
          </div>
        </section>
        ${buttonCard()}
      </div>
      <div class="stack fill-col">
        ${list('radius', 'Border radius', 'Radius')}
        <section class="card grow-card">
          <div class="mini-head"><h2 class="card-title">Layout rules</h2><button class="btn ghost sm" data-act="reset-rules">Reset</button></div>
          <textarea class="inp area" rows="11" data-bind="rules" spellcheck="false" aria-label="Layout rules">${esc(state.rules)}</textarea>
        </section>
        <section class="card grow-card">
          <div class="mini-head"><h2 class="card-title">Icons</h2><button class="btn ghost sm" data-act="reset-icons">Reset</button></div>
          <textarea class="inp area" rows="6" data-bind="icons" spellcheck="false" aria-label="Icon instructions">${esc(state.icons)}</textarea>
        </section>
      </div>
    </div>${foot()}`;
  }

  function viewPreview() {
    const d = state.preview.device;
    return `${head('Website preview', 'A sample website painted only with your variables. Switch devices to see the fluid type, or turn on labels and hover to see each variable.',
      `<div class="seg" id="deviceSeg">${Object.keys(DEVICES).map(k => `<button class="${d === k ? 'on' : ''}" data-act="device" data-val="${k}"><i class="ph ph-${k === 'desktop' ? 'desktop' : k === 'tablet' ? 'device-tablet' : 'device-mobile'}"></i>${k[0].toUpperCase() + k.slice(1)}</button>`).join('')}</div>
       <button class="btn ghost ${state.preview.labels ? 'on' : ''}" data-act="labels" aria-pressed="${!!state.preview.labels}"><i class="ph ph-tag"></i>Token labels</button>
       <button class="btn ghost" data-act="open-demo"><i class="ph ph-arrow-square-out"></i>New tab</button>`)}
    <div class="stage full-stage" id="fullStage"></div>
    ${foot()}`;
  }

  function viewExport() {
    const x = state.export;
    const tabs = [['md', 'MD'], ['css', 'CSS'], ['tw', 'Tailwind v4'], ['json', 'Project file']];
    const ext = { md: '.md', css: '.css', tw: '.css', json: '.json' }[ui.exportTab];
    const opt = (k, label) => `<label class="check-field"><input type="checkbox" ${x[k] ? 'checked' : ''} data-bind="export.${k}"><span>${label}</span></label>`;
    return `${head('Export', 'Download branding.md and give it to your AI before it designs anything. Save a project file so you can reopen and keep editing this brand.')}
    <div class="split export-split">
      <div class="col-side left">
        <section class="card">
          <h2 class="card-title">Export settings</h2>
          <label class="field"><span>File name</span><input class="inp" value="${esc(x.file)}" data-bind="export.file" spellcheck="false" placeholder="Branding" aria-label="File name"></label>
          <span class="opts-label">File includes</span>
          <div class="opts">
            ${opt('palettes', 'Full shade palettes')}
            ${opt('contrast', 'Contrast table')}
            ${opt('rules', 'Layout rules')}
            ${opt('icons', 'Icons')}
            ${opt('css', 'Copy-paste :root block')}
          </div>
        </section>
        <section class="card">
          <h2 class="card-title">Project</h2>
          <p class="muted-p">Your work saves in this browser automatically. To move it to another device or keep versions, download it from the Project file tab.</p>
          <div class="btn-col">
            <label class="btn ghost file-btn"><i class="ph ph-folder-open"></i>Open project file<input type="file" accept=".json,application/json" data-import hidden></label>
            <button class="btn ghost danger" data-act="reset-all"><i class="ph ph-arrow-counter-clockwise"></i>Start over</button>
          </div>
        </section>
      </div>
      <div class="col-main">
        <section class="card code-card">
          <div class="code-bar">
            <div class="seg">${tabs.map(([k, l]) => `<button class="${ui.exportTab === k ? 'on' : ''}" data-act="etab" data-val="${k}">${l}</button>`).join('')}</div>
            <span class="code-meta" data-region="exportmeta"></span>
            ${ui.exportTab === 'md' ? `<button class="icon-btn view-toggle ${ui.mdPreview ? 'on' : ''}" data-act="md-preview" aria-pressed="${!!ui.mdPreview}"
              title="${ui.mdPreview ? 'Show raw markdown' : 'Preview formatted'}" aria-label="${ui.mdPreview ? 'Show raw markdown' : 'Preview formatted markdown'}"><i class="ph ph-eye"></i></button>` : ''}
            <div class="code-actions">
              <button class="btn ghost sm" data-act="copy-export"><i class="ph ph-copy"></i>Copy</button>
              <button class="btn primary sm" data-act="download" data-kind="${ui.exportTab}"><i class="ph ph-download-simple"></i>Download ${ext}</button>
            </div>
          </div>
          ${ui.exportTab === 'md' && ui.mdPreview
            ? '<div class="code md-view" data-region="exportcode"></div>'
            : '<pre class="code" data-region="exportcode"></pre>'}
        </section>
      </div>
    </div>${foot()}`;
  }

  const VIEWS = { colors: viewColors, roles: viewRoles, type: viewType, space: viewSpace, preview: viewPreview, export: viewExport };

  function renderStepper() {
    const cur = stepIndex(state.step);
    $('#stepper').innerHTML = STEPS.map((s, i) => `<button class="step ${i === cur ? 'on' : ''} ${i < cur ? 'done' : ''}" data-go="${s.id}" ${i === cur ? 'aria-current="step"' : ''}>
      <span class="step-n">${i < cur ? '<i class="ph ph-check"></i>' : i + 1}</span><span class="step-l">${s.label}</span></button>`).join('');
    const on = $('#stepper .on'); if (on) on.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function renderView() {
    orderPalettes();
    closePopover();
    unmountFrames();
    const v = $('#view');
    v.innerHTML = VIEWS[state.step]();
    v.dataset.step = state.step;
    renderStepper();
    if (state.step === 'roles') mountStage($('#miniStage'), 'desktop');
    if (state.step === 'preview') mountStage($('#fullStage'));
    softRefresh();
  }
  function setStep(id) {
    if (!VIEWS[id]) return;
    state.step = id;
    renderView();
    window.scrollTo({ top: 0 });
  }

  /* ------------------------------------------------------------------ popover (shade picker) */
  const pop = $('#popover');
  // The shade that is the color the user typed: the pinned shade, or (APCA mode) the closest one.
  function mainShade(p) {
    const sh = shadesFor(p);
    if (sh.locked) return Number(sh.locked);
    return SHADES.reduce((best, s) => chroma.deltaE(p.hex, sh.map[s]) < chroma.deltaE(p.hex, sh.map[best]) ? s : best, 500);
  }
  // One picker swatch: square, a circle when selected, and a tiny centre dot when it is the main color.
  function swatchBtn(hex, on, main, attrs, tid) {
    const ink = chroma.contrast(hex, '#FFFFFF') >= chroma.contrast(hex, '#000000') ? '#FFFFFF' : '#000000';
    return `<button style="background:${hex};color:${ink}" class="${on ? 'on' : ''}${main ? ' main' : ''}" data-act="set-src" data-tid="${tid}" ${attrs}>` +
      `${main ? '<span class="main-dot" aria-hidden="true"></span>' : ''}</button>`;
  }
  function openPicker(tid, anchor) {
    const t = tok(tid); if (!t) return;
    const slugs = paletteSlugs();
    pop.innerHTML = `<div class="pop-head"><span>Color for <code>--${esc(clean(t.name))}</code></span>
        <button class="icon-btn sm" data-act="pop-close" aria-label="Close" title="Close"><i class="ph ph-x"></i></button></div>
      ${state.palettes.map(p => {
        const sh = shadesFor(p), main = mainShade(p);
        return `<div class="pop-row"><span class="pop-label">${esc(p.role)}</span><div class="pop-sw">${SHADES.map(s => swatchBtn(sh.map[s],
          t.src.p === p.id && t.src.s == s, s === main,
          `data-p="${p.id}" data-s="${s}" title="${slugs[p.id]}-${s} · ${sh.map[s]}${s === main ? ' · your color' : ''}"`, tid)).join('')}</div></div>`;
      }).join('')}
      <div class="pop-row base"><span class="pop-label">Base</span><div class="pop-sw">
        ${swatchBtn('#FFFFFF', t.src.c === '#FFFFFF', false, 'data-c="#FFFFFF" title="White"', tid)}
        ${swatchBtn('#000000', t.src.c === '#000000', false, 'data-c="#000000" title="Black"', tid)}</div>
        <input class="hex-input" placeholder="#HEX" value="${t.src.c && t.src.c !== '#FFFFFF' && t.src.c !== '#000000' ? t.src.c : ''}" data-custom-src="${tid}" maxlength="7" aria-label="Custom hex"></div>
      <div class="pop-scale"><span>50</span><span>500</span><span>950</span></div>`;
    pop.classList.remove('font-pop');
    pop.hidden = false;
    placePopover(anchor);
    ui.pop = tid;
  }
  function closePopover() {
    pop.hidden = true; ui.pop = null; ui.fontRole = null;
    $$('.font-field[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    pop.classList.remove('font-pop');
    if (fontObserver) fontObserver.disconnect();
  }
  function placePopover(anchor) {
    ui.popAnchor = anchor;
    const r = anchor.getBoundingClientRect();
    const pw = pop.offsetWidth, ph = pop.offsetHeight;
    const left = Math.min(Math.max(8, r.left), innerWidth - pw - 8);
    let top = r.bottom + 8;
    if (top + ph > innerHeight - 8) top = Math.max(8, r.top - ph - 8);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
  }

  /* ------------------------------------------------------------------ font picker */
  // Each preview loads only the glyphs of the font's own name (Google's `text=` subset) under a private
  // family alias, so it never clashes with the full font used by the specimen and preview site.
  const previewLoaded = new Set();
  let fontObserver = null;
  function loadPreview(name) {
    if (previewLoaded.has(name)) return;
    previewLoaded.add(name);
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name).replace(/%20/g, '+')}&text=${encodeURIComponent(name)}&display=swap`;
    fetch(url).then(r => r.ok ? r.text() : '').then(css => {
      if (!css) return;
      const st = document.createElement('style');
      st.textContent = css.replace(/font-family:\s*'[^']*'/g, `font-family: 'tpv-${slug(name)}'`);
      document.head.appendChild(st);
    }).catch(() => { /* offline: name falls back to the UI font */ });
  }

  function openFontPicker(role, anchor) {
    ui.fontRole = role; ui.fontQ = ''; ui.fontIdx = 0;
    if (!ui.fontCat) ui.fontCat = 'all';
    const cats = [['all', 'All'], ...Object.keys(CAT_LABEL).map(k => [k, CAT_LABEL[k]])];
    pop.classList.add('font-pop');
    pop.innerHTML = `
      <div class="font-search"><i class="ph ph-magnifying-glass"></i><input data-font-search placeholder="Search ${FONT_DB.length} Google Fonts or type any name" spellcheck="false" aria-label="Search fonts"></div>
      <div class="font-cats">${cats.map(([k, l]) => `<button class="${ui.fontCat === k ? 'on' : ''}" data-act="font-cat" data-val="${k}">${l}</button>`).join('')}</div>
      <div class="font-list" role="listbox" aria-label="Fonts"></div>`;
    pop.hidden = false;
    ui.pop = 'font';
    anchor.setAttribute('aria-expanded', 'true');
    renderFontList();
    placePopover(anchor);
    $('[data-font-search]', pop).focus();
  }

  function fontMatches() {
    const q = (ui.fontQ || '').trim().toLowerCase();
    return FONT_DB.filter(f => (ui.fontCat === 'all' || f.cat === ui.fontCat) && (!q || f.name.toLowerCase().includes(q)))
      .sort((a, b) => q ? (b.name.toLowerCase().startsWith(q) - a.name.toLowerCase().startsWith(q)) : 0);
  }

  function renderFontList() {
    const list = $('.font-list', pop); if (!list) return;
    const current = state.type.fonts[ui.fontRole].family;
    const q = (ui.fontQ || '').trim();
    const items = fontMatches();
    const custom = q && !FONT_DB.some(f => f.name.toLowerCase() === q.toLowerCase())
      ? [{ name: q.replace(/\b\w/g, c => c.toUpperCase()), cat: null }] : [];
    const all = [...items, ...custom]; // real matches first, so Enter on a partial search picks a real font
    ui.fontIdx = Math.min(ui.fontIdx, Math.max(0, all.length - 1));
    list.innerHTML = all.length ? all.map((f, i) => `
      <button class="font-item ${f.name === current ? 'cur' : ''} ${i === ui.fontIdx ? 'hi' : ''}" role="option" aria-selected="${f.name === current}"
        data-act="font-set" data-family="${esc(f.name)}" data-i="${i}">
        <span class="fi-name" ${f.cat ? `style="font-family:'tpv-${slug(f.name)}', var(--font)"` : ''}>${f.cat ? esc(f.name) : `Use “${esc(f.name)}”`}</span>
        <span class="fi-cat">${f.cat ? CAT_LABEL[f.cat] : 'Any Google Font'}</span>
        ${f.name === current ? '<i class="ph ph-check"></i>' : ''}
      </button>`).join('') : '<div class="font-empty">No fonts match</div>';
    if (fontObserver) fontObserver.disconnect();
    fontObserver = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting && en.target.dataset.family) { loadPreview(en.target.dataset.family); fontObserver.unobserve(en.target); }
    }), { root: list, rootMargin: '120px 0px' });
    $$('.font-item', list).forEach((el, i) => { if (all[i].cat) fontObserver.observe(el); });
    // scroll only the list (scrollIntoView would also scroll the page, which closes the popover)
    const cur = $('.font-item.cur', list);
    if (cur && !q) list.scrollTop = cur.offsetTop - list.clientHeight / 2 + cur.offsetHeight / 2;
    else list.scrollTop = 0;
  }
  function moveFontHighlight(delta) {
    const items = $$('.font-item', pop); if (!items.length) return;
    ui.fontIdx = Math.max(0, Math.min(items.length - 1, ui.fontIdx + delta));
    items.forEach((el, i) => el.classList.toggle('hi', i === ui.fontIdx));
    const el = items[ui.fontIdx], list = el.parentElement;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
  }

  function setFont(family) {
    family = String(family || '').trim(); if (!family) return;
    state.type.fonts[ui.fontRole].family = family;
    closePopover();
    loadFontsSoon();
    renderView();
  }

  /* ------------------------------------------------------------------ utilities */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('on'), 1800);
  }
  async function copy(text, msg) {
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e2) { /* ignore */ } ta.remove();
    }
    toast(msg || 'Copied');
  }
  function download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function nextRole() {
    const used = new Set(state.palettes.map(p => p.role.toLowerCase()));
    return ['Secondary', 'Tertiary', 'Accent', 'Highlight', 'Quaternary'].find(r => !used.has(r.toLowerCase())) || `Color ${state.palettes.length + 1}`;
  }
  // A hue rotated from the primary that sits as far as possible from every existing brand color.
  function distinctHex() {
    const base = state.palettes[0].hex;
    const h0 = chroma(base).get('hsl.h') || 0;
    const taken = state.palettes.filter(p => p.kind !== 'neutral').map(p => chroma(p.hex).get('hsl.h') || 0);
    const dist = (a, b) => { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d); };
    let best = h0 + 180, bestD = -1;
    [120, 240, 180, 60, 300, 30, 330, 150, 210, 90, 270].forEach(d => {
      const h = (h0 + d) % 360;
      const md = Math.min(...taken.map(t => dist(t, h)));
      if (md > bestD + 1) { bestD = md; best = h; }
    });
    return chroma(base).set('hsl.h', best).hex().toUpperCase();
  }
  // Brand colors first (primary stays first), neutral always last.
  function orderPalettes() {
    state.palettes = [...state.palettes.filter(p => p.kind !== 'neutral'), ...state.palettes.filter(p => p.kind === 'neutral')];
  }
  // "tertiary" → "tertiary", or "accent-2" if a variable called "accent" already exists
  function uniqueTokenName(base, exceptId) {
    const used = new Set(state.tokens.filter(t => t.id !== exceptId).map(t => clean(t.name)));
    if (!used.has(base)) return base;
    let n = 2; while (used.has(`${base}-${n}`)) n++;
    return `${base}-${n}`;
  }
  function repointTokens(fromId) {
    const fallback = state.palettes.find(p => p.kind === 'neutral') || state.palettes[0];
    state.tokens.forEach(t => { if (t.src.p === fromId) t.src = { p: fallback.id, s: t.src.s }; });
  }
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    const b = $('[data-act="theme"] i'); if (b) b.className = 'ph ' + (t === 'dark' ? 'ph-sun' : 'ph-moon');
  }

  /* ------------------------------------------------------------------ actions */
  const ACTIONS = {
    theme() {
      const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(t); try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* ignore */ }
    },
    seed(el) { state.palettes[0].hex = el.dataset.hex; renderView(); },
    mode(el) { const p = pal(el.dataset.pid); p.mode = el.dataset.val; renderView(); },
    neutral(el) {
      const p = pal(el.dataset.pid);
      const was = p.kind === 'neutral';
      state.palettes.forEach(x => { if (x.kind === 'neutral') x.kind = 'brand'; });
      if (!was) p.kind = 'neutral';
      renderView();
      toast(was ? 'Neutral removed' : `${p.role} is now the neutral`);
    },
    retint(el) { const p = pal(el.dataset.pid); p.hex = tintNeutral(state.palettes[0].hex); renderView(); },
    'del-pal'(el) {
      const id = el.dataset.pid; const p = pal(id);
      state.palettes = state.palettes.filter(x => x.id !== id);
      state.tokens = state.tokens.filter(t => t.pal !== id); // drop its auto-added Brand variable
      repointTokens(id);
      renderView(); toast(`Removed ${p.role}`);
    },
    'font-pick'(el) { if (ui.pop === 'font' && ui.fontRole === el.dataset.role) closePopover(); else openFontPicker(el.dataset.role, el); },
    'font-cat'(el) {
      ui.fontCat = el.dataset.val; ui.fontIdx = 0;
      $$('.font-cats button', pop).forEach(b => b.classList.toggle('on', b === el));
      renderFontList(); $('[data-font-search]', pop).focus();
    },
    'font-set'(el) { setFont(el.dataset.family); },
    'add-toggle'() { ui.addOpen = !ui.addOpen; renderView(); },
    'add-next'() { ACTIONS['add-pal']({ dataset: { hex: distinctHex() } }); },
    'add-pal'(el) {
      const p = makePalette(el.dataset.role || nextRole(), el.dataset.hex);
      const ni = state.palettes.findIndex(x => x.kind === 'neutral');
      if (ni > 0) state.palettes.splice(ni, 0, p); else state.palettes.push(p);
      // matching Brand variable in Color roles, linked to this palette
      const brandIdx = state.tokens.map(t => t.group).lastIndexOf('Brand');
      state.tokens.splice(brandIdx + 1, 0, {
        id: uid(), key: 'custom-' + uid(), name: uniqueTokenName(slug(p.role)), group: 'Brand',
        src: { p: p.id, s: 500 }, alpha: 100, note: `${p.role} brand color`, pal: p.id, autoName: true
      });
      renderView();
      const card = $(`[data-pid="${p.id}"] .role-input`); if (card) { card.focus(); card.select(); }
    },
    'add-neutral'() { state.palettes.push(makePalette('Neutral', tintNeutral(state.palettes[0].hex), 'neutral')); renderView(); },
    pick(el) { if (ui.pop === el.dataset.tid) closePopover(); else openPicker(el.dataset.tid, el); },
    'set-src'(el) {
      const t = tok(el.dataset.tid);
      t.src = el.dataset.auto ? { auto: el.dataset.auto } : el.dataset.c ? { c: el.dataset.c } : { p: el.dataset.p, s: Number(el.dataset.s) };
      // stay open so shades can be compared; just move the highlight
      $$('.pop-sw button', pop).forEach(b => b.classList.toggle('on', b === el));
      const hex = $('[data-custom-src]', pop); if (hex) hex.value = '';
      softRefresh();
    },
    'pop-close'() { closePopover(); },
    'auto-roles'() {
      if (!confirm('Re-assign every core variable to a suggested shade? Names, notes and custom variables are kept.')) return;
      const fresh = coreTokens(state);
      state.tokens.forEach(t => { const f = fresh.find(x => x.key === t.key); if (f) { t.src = f.src; t.alpha = f.alpha; } });
      renderView(); toast('Roles re-assigned');
    },
    'add-token'(el) {
      const group = el.dataset.group || 'Custom';
      const P = state.palettes[0];
      const N = state.palettes.find(p => p.kind === 'neutral') || P;
      // naming pattern + starting shade per group; names continue the existing sequence (bg-1, bg-2 → bg-3)
      const spec = {
        Brand: ['brand-', { p: P.id, s: 700 }, 100, 1],
        'Text on light': ['text-dark-', { p: N.id, s: 700 }, 100, 1],
        'Text on dark': ['text-light-', { p: N.id, s: 200 }, 100, 1],
        Backgrounds: ['bg-', { p: N.id, s: 100 }, 100, 1],
        Borders: ['br-', { p: N.id, s: 200 }, 100, 1],
        Custom: ['custom-', { p: P.id, s: 500 }, 100, 1]
      }[group];
      const [prefix, src, alpha] = spec;
      const used = new Set(state.tokens.map(t => clean(t.name)));
      let n = 1; while (used.has(prefix + n)) n++;
      const tok = { id: uid(), key: 'custom-' + uid(), name: prefix + n, group, src, alpha, note: '' };
      // keep the dark variant last: light first, new ones in between, dark at the end
      const lastKey = { Backgrounds: 'bg-dark' }[group];
      const at = lastKey ? state.tokens.findIndex(t => t.key === lastKey && t.group === group) : -1;
      if (at >= 0) state.tokens.splice(at, 0, tok); else state.tokens.push(tok);
      renderView();
      // focus the variable just added (it may sit before bg-dark / br-dark, not at the end)
      const row = $(`.trow[data-row="${tok.id}"]`);
      const input = row && $('.tname input', row);
      if (input) { input.focus(); input.select(); row.scrollIntoView({ block: 'nearest' }); }
    },
    'del-token'(el) { state.tokens = state.tokens.filter(t => t.id !== el.dataset.tid); renderView(); },
    tdev(el) { ui.typeDevice = el.dataset.val; $$('[data-act="tdev"]').forEach(b => b.classList.toggle('on', b === el)); softRefresh(); },
    'ov-reset'(el) { delete state.type.overrides[el.dataset.key]; renderView(); },
    'add-row'(el) {
      const list = state[el.dataset.list];
      const last = list[list.length - 1];
      const px = last ? last.px + 8 : 8;
      const used = new Set(list.map(r => clean(r.name)));
      const isSp = el.dataset.list === 'spacing';
      let name = px % SP_UNIT === 0 ? (isSp ? spName(px / SP_UNIT) : rdName(px / SP_UNIT)) : (isSp ? 'sp-' : 'br-') + px;
      if (used.has(name)) name += '-2';
      list.push({ id: uid(), name, px });
      renderView();
    },
    'reset-container'() { state.layout.maxWidth = DEFAULT_MAX_WIDTH; renderView(); },
    'del-row'(el) { state[el.dataset.list] = state[el.dataset.list].filter(r => r.id !== el.dataset.id); renderView(); },
    'reset-list'(el) {
      const list = el.dataset.list;
      const fresh = list === 'spacing' ? defaultSpacing() : defaultRadius();
      // keep layout-rule references working: point var(--old) at the default with the same px value
      state[list].forEach(r => { const to = fresh.find(f => f.px === Number(r.px)); if (to) state.rules = renameRef(state.rules, clean(r.name), to.name); });
      state[list] = fresh;
      renderView();
    },
    'reset-rules'() { state.rules = DEFAULT_RULES; renderView(); },
    'reset-icons'() { state.icons = DEFAULT_ICONS; renderView(); },
    'btn-shape'(el) { state.button.shape = el.dataset.val; renderView(); },
    'reset-button'() { state.button = defaultButton(); renderView(); },
    device(el) {
      state.preview.device = el.dataset.val;
      $$('#deviceSeg button').forEach(b => b.classList.toggle('on', b === el));
      frames.forEach(fit); save();
    },
    labels(el) {
      state.preview.labels = !state.preview.labels;
      el.classList.toggle('on', state.preview.labels); el.setAttribute('aria-pressed', state.preview.labels);
      schedulePreview(); save();
    },
    'open-demo'() {
      const w = window.open(URL.createObjectURL(new Blob([demoShell(true)], { type: 'text/html' })), '_blank');
      if (!w) toast('Allow pop-ups to open the preview');
    },
    etab(el) { ui.exportTab = el.dataset.val; renderView(); },
    'md-preview'() {
      const pre = $('.code'), ratio = pre ? pre.scrollTop / Math.max(1, pre.scrollHeight - pre.clientHeight) : 0;
      ui.mdPreview = !ui.mdPreview;
      renderView();
      const next = $('.code'); if (next) next.scrollTop = ratio * (next.scrollHeight - next.clientHeight); // keep roughly the same place
    },
    'copy-export'() { copy(exportText(), 'Copied to clipboard'); },
    download(el) {
      const k = el.dataset.kind;
      const type = { md: 'text/markdown', css: 'text/css', tw: 'text/css', json: 'application/json' }[k];
      const text = { md: buildMarkdown, css: buildCss, tw: buildTailwind, json: () => JSON.stringify(state, null, 2) }[k]();
      download(fileFor(k), text, type);
      toast('Downloaded');
    },
    'reset-all'() {
      if (!confirm('Start over? This clears the current project from this browser. Save a project file first if you want to keep it.')) return;
      state = defaultState(); shadeCache.clear(); renderView(); toast('New project');
    }
  };

  /* ------------------------------------------------------------------ events */
  function readVal(el) {
    if (el.type === 'checkbox') return el.checked;
    if ('num' in el.dataset) { const n = parseFloat(el.value); return isNaN(n) ? 0 : n; }
    return el.value;
  }

  document.addEventListener('input', e => {
    const el = e.target;
    if (el.matches('[data-pal-hex]')) {
      const h = normHex(el.value); if (!h) return;
      const p = pal(el.dataset.palHex); p.hex = h;
      const ci = el.closest('.pcard').querySelector('[data-pal-color]'); if (ci) ci.value = h.toLowerCase();
      softRefresh(); return;
    }
    if (el.matches('[data-pal-color]')) {
      const p = pal(el.dataset.palColor); p.hex = el.value.toUpperCase();
      const hi = el.closest('.pcard').querySelector('[data-pal-hex]'); if (hi) hi.value = p.hex;
      softRefresh(); return;
    }
    if (el.matches('input[type="checkbox"][data-bind^="export."]')) {
      const k = el.dataset.bind.split('.')[1];
      const at = md => md.split('\n').findIndex(l => l.startsWith(EXPORT_MARKS[k]));
      const before = at(buildMarkdown());
      state.export[k] = el.checked;
      if (ui.exportTab !== 'md') { ui.exportTab = 'md'; renderView(); }
      ui.flash = el.checked;
      ui.anchor = el.checked ? at(buildMarkdown()) : before;
      if (ui.anchor < 0) ui.anchor = null;
      softRefresh();
      const pre = $('.code');
      if (ui.mdPreview && pre) {
        // formatted view: scroll to the added section's heading and flash it
        const title = EXPORT_MARKS[k].replace(/^#+\s*/, '');
        const h = $$('h2, h3', pre).find(x => x.textContent.startsWith(title));
        if (h && el.checked) { pre.scrollTo({ top: Math.max(0, h.offsetTop - 24), behavior: 'smooth' }); h.classList.add('md-flash'); }
      } else {
        const mark = $('#code-anchor');
        if (pre && mark) pre.scrollTo({ top: Math.max(0, mark.offsetTop - 40), behavior: 'smooth' });
      }
      ui.anchor = null; ui.flash = false;
      return;
    }
    if (el.matches('[data-font-search]')) { ui.fontQ = el.value; ui.fontIdx = 0; renderFontList(); return; }
    if (el.matches('[data-custom-src]')) {
      const h = normHex(el.value); if (!h) return;
      tok(el.dataset.customSrc).src = { c: h };
      $$('.pop-sw .on', pop).forEach(b => b.classList.remove('on'));
      softRefresh(); return;
    }
    if (el.matches('[data-ov]')) {
      const k = el.dataset.ov, end = el.dataset.end;
      const o = state.type.overrides[k] || {};
      if (el.value === '' || isNaN(parseFloat(el.value))) delete o[end]; else o[end] = parseFloat(el.value);
      if (o.min == null && o.max == null) delete state.type.overrides[k]; else state.type.overrides[k] = o;
      softRefresh(); return;
    }
    if (el.matches('[data-bind]')) {
      const b = el.dataset.bind;
      // renaming a spacing/radius variable also updates its var(--name) references in the layout rules
      const rn = b.match(/^(spacing|radius)\.(\d+)\.name$/);
      if (rn) {
        const from = clean(state[rn[1]][+rn[2]].name), to = clean(el.value);
        const taken = ['spacing', 'radius'].some(l => state[l].some((r, i) => clean(r.name) === to && !(l === rn[1] && i === +rn[2])));
        if (from !== to && el.value.trim() && !taken) state.rules = renameRef(state.rules, from, to);
      }
      setPath(state, b, readVal(el));
      // a hand-edited variable name stops following its color's name
      if (/^tokens\.\d+\.name$/.test(b)) delete state.tokens[+b.split('.')[1]].autoName;
      // renaming a color renames its linked Brand variable (until that variable is renamed by hand)
      if (/^palettes\.\d+\.role$/.test(b)) {
        const p = state.palettes[+b.split('.')[1]];
        state.tokens.forEach(t => {
          if (t.pal === p.id && t.autoName) {
            t.name = uniqueTokenName(slug(p.role), t.id);
            t.note = `${p.role} brand color`;
          }
        });
      }
      const out = $(`output[data-out="${el.dataset.bind}"]`);
      if (out) out.textContent = el.dataset.bind.endsWith('.lh') ? el.value + '%' : el.value + 'em';
      if ('font' in el.dataset) loadFontsSoon();
      softRefresh();
    }
  });

  document.addEventListener('change', e => {
    const el = e.target;
    if (el.matches('[data-import]') && el.files[0]) {
      const r = new FileReader();
      r.onload = () => {
        try {
          const s = hydrate(JSON.parse(r.result));
          state = s; shadeCache.clear(); loadFontsSoon(); renderView(); toast('Project opened');
        } catch (err) { toast('That file is not a Typolor project'); }
      };
      r.readAsText(el.files[0]);
      el.value = '';
    }
  });

  document.addEventListener('click', e => {
    if (!pop.hidden && !e.target.closest('#popover') && !e.target.closest('[data-act="pick"],[data-act="font-pick"]')) closePopover();
    const go = e.target.closest('[data-go]');
    if (go) { setStep(go.dataset.go); return; }
    const cp = e.target.closest('[data-copy]');
    if (cp) { copy(cp.dataset.copy, `Copied ${cp.dataset.copy}`); return; }
    const a = e.target.closest('[data-act]');
    if (a && ACTIONS[a.dataset.act]) ACTIONS[a.dataset.act](a, e);
  });

  /* ------------------------------------------------------------------ reorder Color roles rows */
  // Put a group's tokens into the given id order, keeping every other group where it is in the array.
  function reorderGroup(group, ids) {
    const slots = state.tokens.map((t, i) => (t.group === group ? i : -1)).filter(i => i >= 0);
    const byId = Object.fromEntries(state.tokens.map(t => [t.id, t]));
    ids.forEach((id, k) => { state.tokens[slots[k]] = byId[id]; });
  }
  const EASE = 'cubic-bezier(.22,.8,.24,1)';
  // Rows bind to state by array index; after a reorder, point each row's inputs at its new index.
  // Doing this instead of a full re-render keeps the page (and the live preview) from flickering.
  function reindexRows() {
    $$('.trow[data-row]').forEach(r => {
      const i = state.tokens.findIndex(t => t.id === r.dataset.row);
      $$('[data-bind^="tokens."]', r).forEach(el => { el.dataset.bind = el.dataset.bind.replace(/^tokens\.\d+\./, `tokens.${i}.`); });
    });
    softRefresh();
  }
  // FLIP: slide rows from where they were to where they are now
  function slideFrom(rows, firstTops, ms = 240) {
    rows.forEach(r => {
      const dy = firstTops.get(r) - r.getBoundingClientRect().top;
      if (Math.abs(dy) > 0.5) r.animate([{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }], { duration: ms, easing: EASE });
    });
  }

  let drag = null;
  document.addEventListener('pointerdown', e => {
    const h = e.target.closest('.drag-handle');
    if (!h || e.button > 0) return;
    e.preventDefault();
    const row = h.closest('.trow');
    drag = { row, list: row.parentElement, group: row.closest('.tgroup').dataset.group, pointer: e.pointerId,
      moved: false, startY: e.pageY, startOffset: row.offsetTop };
    row.classList.add('dragging');
    document.body.classList.add('is-dragging');
    h.setPointerCapture(e.pointerId);
  });
  document.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.pointer) return;
    const others = $$('.trow', drag.list).filter(r => r !== drag.row);
    // where the dragged row's centre would be, measured against each row's resting slot
    // (offsetTop ignores the in-flight slide animations, so rows don't flicker back and forth)
    const centre = drag.startOffset + (e.pageY - drag.startY) + drag.row.offsetHeight / 2;
    const before = others.find(r => centre < r.offsetTop + r.offsetHeight / 2) || null;
    if (drag.row.nextElementSibling !== before) {
      const first = new Map(others.map(r => [r, r.getBoundingClientRect().top]));
      drag.list.insertBefore(drag.row, before);
      drag.moved = true;
      slideFrom(others, first);
    }
    // the row follows the pointer continuously, relative to the slot it now occupies
    drag.row.style.transform = `translateY(${(e.pageY - drag.startY) - (drag.row.offsetTop - drag.startOffset)}px)`;
    // scroll the page when dragging near the top or bottom edge
    if (e.clientY < 90) window.scrollBy(0, -10);
    else if (e.clientY > innerHeight - 50) window.scrollBy(0, 10);
  });
  function endDrag() {
    if (!drag) return;
    const d = drag; drag = null;
    document.body.classList.remove('is-dragging');
    // ease the row from where it was dropped into its slot
    const from = d.row.style.transform || 'translateY(0)';
    d.row.style.transform = '';
    d.row.animate([{ transform: from }, { transform: 'translateY(0)' }], { duration: 220, easing: EASE })
      .onfinish = () => d.row.classList.remove('dragging');
    if (!d.moved) return;
    reorderGroup(d.group, $$('.trow', d.list).map(r => r.dataset.row));
    reindexRows();
  }
  document.addEventListener('pointerup', endDrag);
  document.addEventListener('pointercancel', endDrag);

  function moveRowByKey(h, dir) {
    const row = h.closest('.trow');
    const sib = dir < 0 ? row.previousElementSibling : row.nextElementSibling;
    if (!sib) return;
    const first = new Map([row, sib].map(r => [r, r.getBoundingClientRect().top]));
    row.parentElement.insertBefore(row, dir < 0 ? sib : sib.nextElementSibling);
    slideFrom([row, sib], first, 200);
    reorderGroup(tok(row.dataset.row).group, $$('.trow', row.parentElement).map(r => r.dataset.row));
    reindexRows();
    h.focus(); // moving the node drops focus; put it back on the same handle
  }

  document.addEventListener('keydown', e => {
    const h = e.target.closest && e.target.closest('.drag-handle');
    if (h && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
      moveRowByKey(h, e.key === 'ArrowUp' ? -1 : 1);
      return;
    }
    if (e.key === 'Escape' && !pop.hidden) {
      const back = ui.fontRole && $(`[data-act="font-pick"][data-role="${ui.fontRole}"]`);
      closePopover(); if (back) back.focus();
      return;
    }
    if (ui.pop === 'font' && e.target.matches('[data-font-search]')) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); moveFontHighlight(e.key === 'ArrowDown' ? 1 : -1); }
      if (e.key === 'Enter') { e.preventDefault(); const hi = $('.font-item.hi', pop); if (hi) setFont(hi.dataset.family); }
    }
  });
  // An open picker follows its button while the page scrolls or resizes; it closes only once the button is gone or off-screen.
  function followAnchor() {
    if (pop.hidden) return;
    const a = ui.popAnchor;
    if (!a || !a.isConnected) { closePopover(); return; }
    const r = a.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) { if (!pop.contains(document.activeElement)) closePopover(); return; }
    placePopover(a);
  }
  window.addEventListener('resize', followAnchor);
  window.addEventListener('scroll', followAnchor, { passive: true });

  /* ------------------------------------------------------------------ boot */
  $('#projectName').value = state.name;
  applyTheme(document.documentElement.dataset.theme || 'light');
  Object.keys(fontFamilies()).forEach(f => ensureFontIn(document, f));
  renderView();

  $('#appVersion').textContent = 'v' + VERSION;
  window.Typolor = { version: VERSION, get state() { return state; }, buildMarkdown, buildCss, buildTailwind };
})();
