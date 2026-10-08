import { describe, expect, test } from "bun:test";
import { scriptHash } from "../../landing";
import { landingRoutes } from ".";

describe("GET /", () => {
  test("serves the landing page with the live marquee", async () => {
    const res = await landingRoutes.request("/");
    const body = await res.text();

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/html");
    expect(body).toContain('src="/v1/marquee?i=');
  });

  test("shows a second marquee scrolling right near the bottom", async () => {
    const body = await (await landingRoutes.request("/")).text();

    expect(body).toMatch(/class="ticker ticker-end"[\s\S]*?direction=right/);
  });

  test("allows only the inline script whose hash is in the CSP", async () => {
    const res = await landingRoutes.request("/");

    expect(res.headers.get("Content-Security-Policy")).toContain(
      `script-src '${scriptHash}'`,
    );
  });

  test("serves the pixel heart logo", async () => {
    const res = await landingRoutes.request("/logo.svg");

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
    expect((await res.text()).match(/<rect /g)).toHaveLength(8);
  });
});
