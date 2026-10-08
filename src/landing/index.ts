import { createHash } from "node:crypto";
import { config } from "../config";
import { iconCount } from "../utils/registry";
import { script } from "./script";
import { styles } from "./styles";

const { repoUrl, authorUrl, heroIcons, heroWidthPx, playgroundIcons } =
  config.landing;

export const scriptHash = `sha256-${createHash("sha256").update(script).digest("base64")}`;

export const landingPage = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>icon-marquee</title>
<meta name="description" content="Scrolling marquees and static rows of tech icons, served as SVG. Drop one into any README with a plain img tag." />
<meta name="color-scheme" content="dark" />
<link rel="icon" href="/logo.svg" type="image/svg+xml" />
<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM usage guide" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Libre+Baskerville:ital@0;1&display=swap" />
<style>${styles}</style>
</head>
<body>
<main>
  <header class="page intro">
    <div class="name">
      <span class="logo" role="img" aria-label="Pixel heart logo"></span>
      <h1>icon-marquee<span class="dot">.</span></h1>
    </div>
    <p class="phonetic">/ˈaɪkɒn mɑːˈkiː/ (EYE-kon mar-KEE) · SVG icon tickers for READMEs</p>
    <ul class="links">
      <li><a href="${repoUrl}">GitHub</a></li>
      <li><a href="${repoUrl}#available-icons">All icons</a></li>
      <li><a href="#try">Try it</a></li>
    </ul>
  </header>

  <div class="ticker" role="img" aria-label="Animated row of tech icons">
    <img src="/v1/marquee?i=${heroIcons}&amp;width=${heroWidthPx}" alt="" width="${heroWidthPx}" height="${config.icons.heightPx}" fetchpriority="high" />
  </div>

  <div class="page body">
    <section id="try" aria-labelledby="try-heading">
      <h2 id="try-heading" class="label">Try it</h2>
      <label class="sr-only" for="icons">Icons, comma-separated</label>
      <input id="icons" class="field-input" value="${playgroundIcons}" autocomplete="off" spellcheck="false" />
      <p class="hint">Comma-separated. Short names work: <code>js</code>, <code>ts</code>, <code>py</code>, <code>k8s</code>, <code>wasm</code>.</p>
      <div class="controls">
        <div class="modes" role="group" aria-label="Output">
          <button type="button" data-mode="marquee" aria-pressed="true">Marquee</button>
          <button type="button" data-mode="icons" aria-pressed="false">Static row</button>
        </div>
        <div id="directions" class="modes" role="group" aria-label="Direction">
          <button type="button" data-direction="left" aria-pressed="true">Left</button>
          <button type="button" data-direction="right" aria-pressed="false">Right</button>
        </div>
      </div>
      <div class="preview">
        <div class="preview-stage"><img id="preview" src="/v1/marquee?i=${playgroundIcons}" alt="Preview" height="56" /></div>
        <p id="status" class="status" aria-live="polite"></p>
        <dl class="snippets">
          <div class="snippet"><dt>Markdown</dt><dd id="snippet-markdown"></dd><button type="button" class="copy" data-copy="markdown">Copy</button></div>
          <div class="snippet"><dt>HTML</dt><dd id="snippet-html"></dd><button type="button" class="copy" data-copy="html">Copy</button></div>
          <div class="snippet"><dt>URL</dt><dd id="snippet-url"></dd><button type="button" class="copy" data-copy="url">Copy</button></div>
        </dl>
      </div>
    </section>

    <section aria-labelledby="ref-heading">
      <h2 id="ref-heading" class="label">Reference</h2>
      <ul class="spec">
        <li class="reveal">
          <h3><code>/v1/marquee?i=…</code></h3>
          <p>Animated SVG that scrolls your icons in a seamless loop. It stops for viewers who turn on reduced motion.</p>
          <p class="meta">${config.marquee.speedPxPerS}px/s · ${config.marquee.defaultWidthPx}px window by default</p>
        </li>
        <li class="reveal">
          <h3><code>width</code></h3>
          <p>Marquee only. Window width in px; the row repeats to fill it. Without it, the window shrinks to one row if shorter.</p>
          <p class="meta">Optional · 1 to ${config.marquee.maxWidthPx}</p>
        </li>
        <li class="reveal">
          <h3><code>direction</code></h3>
          <p>Marquee only. Which way the icons scroll: <code>left</code> or <code>right</code>.</p>
          <p class="meta">Optional · left by default</p>
        </li>
        <li class="reveal">
          <h3><code>/v1/icons?i=…</code></h3>
          <p>The same icons as a static row, left to right in the order you list them.</p>
          <p class="meta">${config.icons.heightPx}px tall</p>
        </li>
        <li class="reveal">
          <h3><code>i</code></h3>
          <p>Comma-separated icon names or short names. Case and spaces are ignored, duplicates are allowed, and unknown names are skipped.</p>
          <p class="meta">Required · up to ${config.icons.maxPerRequest}</p>
        </li>
        <li class="reveal">
          <h3>Theme</h3>
          <p>Icons with light and dark versions follow the viewer's light/dark setting automatically.</p>
          <p class="meta">${iconCount} icons</p>
        </li>
      </ul>
    </section>

    <footer>
      <span>Icons by <a href="https://github.com/syvixor/skills-icons">skills-icons</a> (MIT) · <a href="${repoUrl}">Source</a> · <a href="/llms.txt">llms.txt</a> · MIT license</span>
      <a class="credit" href="${authorUrl}" target="_blank" rel="noopener">another thing by <span class="credit-name">giann.dev</span></a>
    </footer>
  </div>
</main>

<script>${script}</script>
</body>
</html>`;
