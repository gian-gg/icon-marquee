import { describe, expect, test } from "bun:test";
import { marqueeRoutes } from ".";

describe("GET /marquee", () => {
  test("returns an animated svg with the row rendered twice", async () => {
    const res = await marqueeRoutes.request("/?i=js,html,css,wasm");
    const body = await res.text();

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
    expect(body).toContain("@keyframes scroll");
    expect(body).toContain("translateX(-1200px)");
    expect(body).toContain("prefers-reduced-motion");
    expect(body.match(/<g transform=/g)).toHaveLength(8);
  });

  test("caps the visible window at 400px", async () => {
    const res = await marqueeRoutes.request(
      `/?i=${Array(20).fill("js").join(",")}`,
    );

    expect((await res.text()).startsWith('<svg width="400" height="48"')).toBe(
      true,
    );
  });

  test("shrinks the window to one row when icons are fewer than the window", async () => {
    const res = await marqueeRoutes.request("/?i=js,html");

    expect((await res.text()).startsWith('<svg width="104" height="48"')).toBe(
      true,
    );
  });

  test("rejects a missing i param", async () => {
    const res = await marqueeRoutes.request("/");

    expect(res.status).toBe(400);
  });

  test("skips unknown icons and lists them in a header", async () => {
    const res = await marqueeRoutes.request("/?i=js,nope,ts");

    expect(res.status).toBe(200);
    expect(res.headers.get("X-Unknown-Icons")).toBe("nope");
    expect((await res.text()).match(/<g transform=/g)).toHaveLength(4);
  });

  test("rejects a request where no icon is known", async () => {
    const res = await marqueeRoutes.request("/?i=nope,nah");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "No known icons: nope, nah" });
  });

  test("rejects more than 100 icons", async () => {
    const res = await marqueeRoutes.request(
      `/?i=${Array(101).fill("js").join(",")}`,
    );

    expect(res.status).toBe(400);
  });

  test("fills an explicit width by repeating the row", async () => {
    const res = await marqueeRoutes.request("/?i=js,html&width=600");
    const body = await res.text();

    expect(body.startsWith('<svg width="600" height="48"')).toBe(true);
    expect(body.match(/<g transform=/g)).toHaveLength(14);
  });

  test("scrolls right when direction is right", async () => {
    const res = await marqueeRoutes.request("/?i=js,html&direction=right");

    expect(res.status).toBe(200);
    expect(await res.text()).toContain("linear infinite reverse");
  });

  test("scrolls left by default and when direction is left", async () => {
    for (const query of ["", "&direction=left"]) {
      const res = await marqueeRoutes.request(`/?i=js,html${query}`);

      expect(await res.text()).not.toContain("reverse");
    }
  });

  test("rejects an unknown direction", async () => {
    for (const direction of ["up", "", "RIGHT"]) {
      const res = await marqueeRoutes.request(`/?i=js&direction=${direction}`);

      expect(res.status).toBe(400);
    }
  });

  test("rejects a width that is not a whole number in range", async () => {
    for (const width of ["0", "abc", "1.5", "3841"]) {
      const res = await marqueeRoutes.request(`/?i=js&width=${width}`);

      expect(res.status).toBe(400);
    }
  });
});
