import { Hono } from "hono";
import { config } from "../../config";
import { loadIcons } from "../../utils/load";
import { type MarqueeDirection, renderIconMarquee } from "../../utils/render";
import { svgResponse } from "../../utils/respond";

const { maxWidthPx, directions } = config.marquee;

const isDirection = (value: string): value is MarqueeDirection =>
  (directions as readonly string[]).includes(value);

export const marqueeRoutes = new Hono();

marqueeRoutes.get("/", async (c) => {
  const widthParam = c.req.query("width");
  const widthPx = widthParam === undefined ? undefined : Number(widthParam);
  if (
    widthPx !== undefined &&
    !(Number.isInteger(widthPx) && widthPx >= 1 && widthPx <= maxWidthPx)
  ) {
    return c.json(
      {
        error: `Query param 'width' must be a whole number from 1 to ${maxWidthPx}`,
      },
      400,
    );
  }

  const direction = c.req.query("direction");
  if (direction !== undefined && !isDirection(direction)) {
    return c.json(
      {
        error: `Query param 'direction' must be one of: ${directions.join(", ")}`,
      },
      400,
    );
  }

  const result = await loadIcons(c.req.query("i"));
  if ("error" in result) {
    return c.json({ error: result.error }, 400);
  }

  return svgResponse(
    c,
    renderIconMarquee(result.svgs, widthPx, direction),
    result.unknown,
  );
});
