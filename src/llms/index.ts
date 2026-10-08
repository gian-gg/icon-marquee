import { config } from "../config";
import { iconNames } from "../utils/registry";

const { icons, marquee } = config;

const aliasLines = Object.entries(icons.aliases)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([short, name]) => `- \`${short}\` → \`${name}\``)
  .join("\n");

export function llmsText(origin: string): string {
  return `# icon-marquee

> HTTP API that returns tech-stack icons as SVG: an animated scrolling marquee or a static row. Embed the URL in Markdown or an HTML \`<img>\` tag; no API key, no JavaScript.

Base URL: ${origin}

## Endpoints

### GET /v1/marquee
Animated SVG that scrolls the icons in a seamless loop, left by default at ${marquee.speedPxPerS}px/s. ${icons.heightPx}px tall. Stops for viewers with reduced motion enabled.

Query parameters:
- \`i\` (required): comma-separated icon names or short names, in display order. Max ${icons.maxPerRequest}. Case and surrounding spaces are ignored; duplicates are allowed.
- \`width\` (optional): window width in px, a whole number from 1 to ${marquee.maxWidthPx}. The row repeats to fill it. Without it, the window is at most ${marquee.defaultWidthPx}px, or exactly one row if the row is shorter.
- \`direction\` (optional): \`left\` (default) or \`right\`.

### GET /v1/icons
Static SVG with the icons in one row, left to right in request order. ${icons.heightPx}px tall.

Query parameters:
- \`i\` (required): same rules as above.

## Responses

- 200 \`image/svg+xml\`, cached for ${icons.cacheMaxAgeS} seconds.
- Unknown names are skipped: the response is still 200 with the known icons, and the skipped names are listed, URL-encoded and comma-separated, in the \`X-Unknown-Icons\` response header.
- 400 \`application/json\` \`{"error": "..."}\` when \`i\` is missing or empty, has more than ${icons.maxPerRequest} names, contains no known name, or \`width\` or \`direction\` is invalid.

## Theme

Icons with light and dark versions follow the viewer's \`prefers-color-scheme\`. There is no theme parameter.

## Examples

Markdown:
\`\`\`md
![icon-marquee](${origin}/v1/marquee?i=js,ts,react,docker)
\`\`\`

HTML, full-width banner:
\`\`\`html
<img src="${origin}/v1/marquee?i=go,rust,zig&width=1200" alt="icon-marquee" />
\`\`\`

Static row:
\`\`\`md
![icon-marquee](${origin}/v1/icons?i=html,css,js)
\`\`\`

## Usage notes for LLMs

- Only use names from the lists below. Unknown names are silently dropped from the image, so check the \`X-Unknown-Icons\` header when you verify a URL.
- Prefer short names where they exist (e.g. \`js\`, \`ts\`, \`py\`, \`k8s\`).
- Commas in \`i\` work literal or encoded. A literal \`+\` becomes a space, so encode it: \`notepad%2B%2B\`.

## Short names

${aliasLines}

## All icon names (${iconNames.length})

${iconNames.join(", ")}
`;
}
