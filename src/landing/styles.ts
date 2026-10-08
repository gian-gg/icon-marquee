const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

export const styles = `
:root {
  color-scheme: dark;
  --surface: #080808;
  --surface-raised: #0e0e0e;
  --ink-bright: #f6f1e8;
  --ink-strong: #ddd5c7;
  --ink-muted: #a6a095;
  --ink-faint: #716c62;
  --accent: #c49bbd;
  --accent-light: #e6cbe0;
  --line: #f6f1e824;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Libre Baskerville", ui-serif, Georgia, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --text-micro: 10px;
  --text-small: 12px;
  --text-body: 13px;
  --text-title: 15px;
  --text-brand: clamp(1.6rem, 1.2rem + 1.2vw, 2.2rem);
  --radius-sm: 0.25rem;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --duration: 200ms;
}

*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  min-height: 100vh;
  background: var(--surface);
  color: var(--ink-muted);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: ${GRAIN};
  opacity: 0.07;
}

a { color: inherit; text-decoration: none; transition: color var(--duration) var(--ease-out); }
a:hover { color: var(--accent); }

:focus-visible { outline: 1px solid var(--accent); outline-offset: 3px; border-radius: 2px; }

.page {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: clamp(3rem, 2rem + 4vw, 5.5rem) clamp(1.25rem, 0.5rem + 3vw, 2.5rem) 2.5rem;
}

.intro { padding-bottom: clamp(2.5rem, 2rem + 2vw, 3.5rem); }

.body { padding-top: 0; }

.name { display: flex; align-items: center; gap: 0.9rem; }

.logo {
  flex: none;
  width: var(--text-brand);
  aspect-ratio: 1;
  background: var(--ink-bright);
  -webkit-mask: url("/logo.svg") center / contain no-repeat;
  mask: url("/logo.svg") center / contain no-repeat;
}

h1 {
  margin: 0;
  color: var(--ink-bright);
  font-family: var(--font-serif);
  font-size: var(--text-brand);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.015em;
}

.dot { color: var(--accent); }

.phonetic {
  margin: 0.5rem 0 0;
  color: var(--ink-faint);
  font-size: var(--text-micro);
  letter-spacing: 0.02em;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-small);
}

.links li + li::before { content: "/"; margin-right: 0.5rem; color: var(--ink-faint); }

.ticker {
  position: relative;
  z-index: 1;
  border-block: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  padding-block: 1.1rem;
}

.ticker img {
  display: block;
  width: 100%;
  height: clamp(40px, 30px + 2vw, 56px);
  object-fit: cover;
  object-position: left center;
}

section { margin-top: clamp(3rem, 2rem + 3vw, 4rem); }

.label {
  margin: 0 0 1.25rem;
  color: var(--ink-faint);
  font-size: var(--text-micro);
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.field-input {
  display: block;
  width: 100%;
  padding: 0.55rem 0;
  border: 0;
  border-bottom: 1px solid var(--line);
  border-radius: 0;
  background: transparent;
  color: var(--ink-bright);
  font-family: var(--font-mono);
  font-size: var(--text-body);
  transition: border-color var(--duration) var(--ease-out);
}

.field-input:focus-visible { outline: none; border-bottom-color: var(--accent); }

.hint { margin: 0.6rem 0 0; color: var(--ink-faint); font-size: var(--text-small); }

.hint code, .spec code { color: var(--ink-strong); font-family: var(--font-mono); font-size: 0.95em; }

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  margin-top: 1.25rem;
}

.modes {
  display: flex;
  gap: 0.5rem;
  font-size: var(--text-small);
}

.modes[hidden] { display: none; }

.modes button {
  padding: 0;
  border: 0;
  background: none;
  color: var(--ink-faint);
  font: inherit;
  cursor: pointer;
  transition: color var(--duration) var(--ease-out);
}

.modes button + button::before { content: "/"; margin-right: 0.5rem; color: var(--ink-faint); }
.modes button:hover { color: var(--accent); }
.modes button[aria-pressed="true"] { color: var(--ink-bright); text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 4px; }

.preview {
  margin-top: 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--surface-raised) 88%, transparent);
}

.preview-stage {
  display: grid;
  place-items: center;
  min-height: 7.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid var(--line);
}

.preview-stage img { max-width: 100%; height: 56px; width: auto; }

.status { margin: 0; padding: 0.6rem 1rem 0; min-height: 1.6rem; color: var(--accent-light); font-size: var(--text-small); }
.status:empty { display: none; }

.snippets { margin: 0; }

.snippet {
  display: grid;
  grid-template-columns: 4.75rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
}

.snippet + .snippet { border-top: 1px solid var(--line); }

.snippet dt { color: var(--ink-faint); font-size: var(--text-micro); letter-spacing: 0.1em; text-transform: uppercase; }

.snippet dd {
  margin: 0;
  overflow-x: auto;
  color: var(--ink-strong);
  font-family: var(--font-mono);
  font-size: var(--text-small);
  white-space: nowrap;
  scrollbar-width: none;
}

.copy {
  padding: 0;
  border: 0;
  background: none;
  color: var(--ink-muted);
  font: inherit;
  font-size: var(--text-small);
  text-decoration: underline;
  text-decoration-color: var(--line);
  text-underline-offset: 4px;
  cursor: pointer;
  transition: color var(--duration) var(--ease-out), transform var(--duration) var(--ease-out);
}

.copy:hover { color: var(--accent); }
.copy:active { transform: scale(0.96); }
.copy[data-copied] { color: var(--accent); }

.spec {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.spec::before {
  content: "";
  position: absolute;
  top: 0.6rem;
  bottom: 0.6rem;
  left: 4px;
  width: 1px;
  background: var(--line);
}

.spec li { position: relative; padding: 0.15rem 0 1.4rem 1.5rem; }

.spec li::before {
  content: "";
  position: absolute;
  top: 0.4rem;
  left: 0;
  width: 9px;
  height: 9px;
  background: var(--ink-faint);
  transition: background var(--duration) var(--ease-out);
}

.spec li:hover::before { background: var(--accent); }

.spec h3 {
  margin: 0;
  color: var(--ink-strong);
  font-family: var(--font-serif);
  font-size: var(--text-title);
  font-weight: 400;
}

.spec h3 code { color: inherit; font-size: 0.85em; }

.spec p { margin: 0.25rem 0 0; color: var(--ink-muted); font-size: var(--text-small); }

.spec .meta { margin-top: 0.3rem; color: var(--ink-faint); font-size: var(--text-micro); letter-spacing: 0.1em; text-transform: uppercase; }

footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  margin-top: 4rem;
  color: var(--ink-faint);
  font-size: var(--text-micro);
  letter-spacing: 0.02em;
}

footer a { text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px; }

footer .credit { text-decoration: none; }

.credit-name { color: var(--ink-strong); font-family: var(--font-serif); font-style: italic; transition: color var(--duration) var(--ease-out); }

.credit:hover .credit-name { color: var(--accent); }

@media (prefers-reduced-motion: no-preference) {
  .reveal { animation: reveal 600ms var(--ease-out) both; }
  .reveal:nth-child(2) { animation-delay: 60ms; }
  .reveal:nth-child(3) { animation-delay: 120ms; }
  .reveal:nth-child(4) { animation-delay: 180ms; }
  .reveal:nth-child(5) { animation-delay: 240ms; }
  .reveal:nth-child(6) { animation-delay: 300ms; }
  @keyframes reveal { from { opacity: 0; transform: translateY(6px); } }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
`;
