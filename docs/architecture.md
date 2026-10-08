# Architecture

## Stack

- Runtime and package manager: Bun
- HTTP framework: Hono
- Language: TypeScript, strict mode
- Lint and format: Biome
- Git hooks: Husky

## Layout

```
src/
├── index.ts          # app entry: mounts the landing page at / and the API at /v1
├── landing/          # landing page HTML, styles, client script and logo
├── llms/             # builds /llms.txt from config and the icon index
├── config.ts         # env-backed config
├── utils/
│   ├── load.ts       # parses the `i` query, validates and reads icon SVGs
│   ├── registry.ts   # indexes public/icons at startup, resolves names to files
│   ├── render.ts     # static row and animated marquee
│   └── scope-ids.ts  # prefixes each icon's ids so icons share one document
└── routes/
    ├── index.ts      # combines route modules
    └── <name>/
        └── index.ts  # one route module per folder

public/
├── logo.svg          # pixel heart logo and favicon
└── icons/
    ├── LICENSE       # upstream MIT license
    └── <name>.svg    # one file per icon; themed icons embed a prefers-color-scheme style
```

## Icons

Icons come from [syvixor/skills-icons](https://github.com/syvixor/skills-icons) (MIT, commit `1d5b572`), copied unmodified from upstream `icons/<name>.svg` to `public/icons/<name>.svg`. Every icon is 256×256. Themed icons switch light/dark through an embedded `<style>` scoped to the icon's own `#id` with a `prefers-color-scheme` media query.

icon-marquee used [LelouchFR/skill-icons](https://github.com/LelouchFR/skill-icons) before. When it switched, the 56 skill-icons names that exist in skills-icons under another name (e.g. `react` → `reactjs`) became aliases in `config.icons.aliases`, so URLs using them keep working. The 336 skill-icons icons with no skills-icons equivalent were dropped.

`public/icons` is excluded from Biome.

## Endpoints

| Method | Path | Does |
| --- | --- | --- |
| GET | `/` | Landing page with a live marquee and a playground |
| GET | `/logo.svg` | Pixel heart logo, also the favicon |
| GET | `/llms.txt` | Markdown usage guide for LLMs |
| GET | `/v1` | Health check |
| GET | `/v1/icons?i=js,html,css` | One SVG with the requested icons in a row, in request order |
| GET | `/v1/marquee?i=js,html,css&width=800&direction=right` | Animated SVG scrolling the same row in a loop. `width` and `direction` are optional. |

Both icon endpoints share `src/utils/load.ts`, so they take the same `i` param and return the same errors.

`/v1/icons` accepts icon names or short names from `config.icons.aliases`, up to `config.icons.maxPerRequest` (100) per request. Rows are 48px tall, with icons 256 units wide and a 44-unit gap. Unknown names are skipped: the response is 200 with the known icons, and `src/utils/respond.ts` lists the skipped names, URL-encoded, in the `X-Unknown-Icons` header. In an `<img>`, a 400 would show as a broken image, so one typo would otherwise hide every icon. A request with no known name, too many names, or a bad `width` or `direction` still returns 400 with a JSON error. Encoding keeps arbitrary user input safe to put in a header. Names resolve only through the startup index, so no request path reaches the filesystem directly.

`/v1/marquee` draws the row at least twice and slides it left by one row width (icon count × 300 units) with a looping CSS animation, so the loop is seamless. `direction=right` (values in `config.marquee.directions`, default `left`) adds `reverse` to the same animation, so the row slides from one row width left back to 0 and the same copies stay seamless. Without a `width` param, the window is at most `config.marquee.defaultWidthPx` (400px) wide, or one row if the row is narrower. With `width` (1 to `config.marquee.maxWidthPx`, 3840), the window is exactly that wide and the row is drawn `ceil(window / row width) + 1` times so the loop stays seamless. Repeated rows compress well: a 3840px hero is about 280 KB raw but about 18 KB with Brotli. Speed is a constant `config.marquee.speedPxPerS` (30px/s), so the duration grows with the icon count. A `prefers-reduced-motion: reduce` rule stops the animation. CSS animations run inside `<img>`, so it works in READMEs.

Each icon's ids, and every reference to them, are prefixed with `i<index>-` when combined. Upstream icons reuse ids such as `clip0_…` and gradient ids, which would otherwise clash. Each themed icon's `<style>` selects its own `#id`, so its selectors are rewritten with the same prefix. The exception is `8th`, whose selector is CSS-escaped (`#\38 th`) and isn't rewritten, so that one icon keeps its default colours when combined. Some upstream icons reference ids they never define; those references stay unresolved, as they are when the icon is viewed alone.

## Landing page

`src/routes/landing/index.ts` serves the page built in `src/landing/`. The page is plain HTML, CSS and one inline script held in TypeScript strings, with no framework or build step. Hono serves it rather than `public/`, so it behaves the same under `bun dev` and on Vercel.

- The playground calls `/v1/marquee` or `/v1/icons` with `fetch` to surface errors, then shows the image and the Markdown, HTML and URL snippets. A Left/Right toggle, shown only for the marquee, adds `direction=right` to the URL when Right is picked; Left leaves the param out.
- The response sends a Content-Security-Policy that allows the inline script by its SHA-256 hash, computed at startup. `img-src` also allows `data:` for the inline grain texture. A hash works with CDN caching, whereas a per-request nonce would be cached along with the page.
- The visual style follows giann.dev: dark only (`color-scheme: dark`), near-black surface with film grain, warm ivory text in four levels and one mauve accent. Fonts are Libre Baskerville and Inter from Google Fonts.
- `color-scheme: dark` also makes the embedded icon SVGs render their dark versions, whatever the visitor's system setting.
- The logo is a 5×4 checkerboard pixel heart in `public/logo.svg`, with its own light/dark colours. The page uses it as the favicon, and in the header as a CSS mask filled with the page's ivory, so the file's own colours don't matter there. `GET /logo.svg` serves it so `bun dev` matches Vercel, which also serves `public/` from its CDN. The README links the file by relative path, so it shows on GitHub without a deploy.
- Settings are in `config.landing`: repo URL, hero and playground icons, hero width and cache lifetime.
- The hero requests the marquee at `config.landing.heroWidthPx` (3840) and crops it to the viewport with `object-fit: cover`, so it spans the full width on any screen.

## llms.txt

`GET /llms.txt` follows the [llms.txt](https://llmstxt.org) convention: Markdown that tells an LLM how to call the API. `src/llms/index.ts` builds it from `config` and the icon index, so limits, short names and the full icon list always match the running API. Example URLs use the request's origin, so they are correct locally and in production. It is served as `text/plain; charset=utf-8` because some agent fetchers reject `text/markdown`. The landing page links it from its footer and with `<link rel="alternate" type="text/plain">`.

## Request flow

1. `src/index.ts` creates the root `Hono` app, mounts the landing page and `/llms.txt` at `/`, and `routes` at `/v1`. Bun serves its default export.
2. `src/routes/index.ts` mounts each route module at its path.
3. Each route module under `src/routes/<name>/` handles its own endpoints.

## Versioning

All endpoints live under `/v1`. A new API version is a separate route tree mounted at its own prefix in `src/index.ts`.

## Config

`src/config.ts` reads env vars once at startup through `requireEnv` and exports a single `config` object. The same object holds the tuning values: `icons` (max per request, short-name aliases, icon size, row height, gap, cache lifetime) and `marquee` (default and max window width, speed, directions). `icons.sizeUnits` must match the icon files' 256×256 viewBox. Bun loads `.env` automatically. A missing required var stops the server from starting.

## Tooling

- Biome handles linting, formatting and import sorting, configured in `biome.json`.
- The Husky pre-commit hook runs `tsc --noEmit`, then `biome check --write` on staged files, and re-stages fixes.

## Deployment

Deployed on Vercel with the zero-config Hono preset, which picks up `src/index.ts`.

- `vercel.json` sets `bunVersion` so the function runs on Bun. The code uses `Bun.file`, so it does not run on Vercel's default Node runtime.
- `public/icons` reaches the function through Vercel's file tracing. The tracer follows `new URL("../../public/icons", import.meta.url)` in `src/utils/registry.ts`, but not `import.meta.dir`, so keep the `import.meta.url` form. `includeFiles` in `vercel.json` has no effect with the Hono preset.
- `tsconfig.json` sets `typeRoots`. Vercel transpiles through a temporary tsconfig in `/tmp` that extends ours, and without `typeRoots` it cannot find `types: ["bun"]`.
- `APP_NAME` must be set in the Vercel project's environment variables, or the function fails at startup.
- Check a build locally with `bunx vercel build`. It needs `.vercel/project.json`, which `vercel link` or `vercel pull` creates.
