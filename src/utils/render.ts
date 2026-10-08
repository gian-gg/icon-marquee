import { config } from "../config";
import { scopeIds } from "./scope-ids";

const { sizeUnits, gapUnits, heightPx } = config.icons;

export type MarqueeDirection = (typeof config.marquee.directions)[number];
const stride = sizeUnits + gapUnits;

const toPx = (units: number): number => (units * heightPx) / sizeUnits;
const toUnits = (px: number): number => (px * sizeUnits) / heightPx;

function rowMarkup(svgs: readonly string[], offset = 0): string {
  return svgs
    .map(
      (svg, index) =>
        `<g transform="translate(${offset + index * stride}, 0)">${scopeIds(svg, `i${index}`)}</g>`,
    )
    .join("");
}

function svgDocument(widthUnits: number, content: string): string {
  return `<svg width="${Math.round(toPx(widthUnits))}" height="${heightPx}" viewBox="0 0 ${widthUnits} ${sizeUnits}" fill="none" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

export function renderIconRow(svgs: readonly string[]): string {
  return svgDocument(svgs.length * stride - gapUnits, rowMarkup(svgs));
}

export function renderIconMarquee(
  svgs: readonly string[],
  widthPx?: number,
  direction: MarqueeDirection = "left",
): string {
  const period = svgs.length * stride;
  const width =
    widthPx === undefined
      ? Math.min(toUnits(config.marquee.defaultWidthPx), period - gapUnits)
      : toUnits(widthPx);
  const copies = Math.ceil(width / period) + 1;
  const duration = (toPx(period) / config.marquee.speedPxPerS).toFixed(2);
  const reverse = direction === "right" ? " reverse" : "";
  const style = `<style>@keyframes scroll{to{transform:translateX(-${period}px)}}.track{animation:scroll ${duration}s linear infinite${reverse}}@media (prefers-reduced-motion:reduce){.track{animation:none}}</style>`;
  const rows = Array.from({ length: copies }, (_, copy) =>
    rowMarkup(svgs, copy * period),
  ).join("");

  return svgDocument(width, `${style}<g class="track">${rows}</g>`);
}
