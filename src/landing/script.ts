import { config } from "../config";
import { UNKNOWN_ICONS_HEADER } from "../utils/respond";

const ALT = JSON.stringify(config.landing.snippetAlt);

export const script = `
(() => {
  const alt = ${ALT};
  const input = document.getElementById("icons");
  const preview = document.getElementById("preview");
  const status = document.getElementById("status");
  const modeButtons = document.querySelectorAll("[data-mode]");
  const directionGroup = document.getElementById("directions");
  const directionButtons = document.querySelectorAll("[data-direction]");
  const fields = {
    markdown: document.getElementById("snippet-markdown"),
    html: document.getElementById("snippet-html"),
    url: document.getElementById("snippet-url"),
  };
  let mode = "marquee";
  let direction = "left";
  let timer;
  let requestId = 0;

  const names = () =>
    input.value.split(",").map((n) => n.trim().toLowerCase()).filter(Boolean);

  const pathFor = (list) =>
    "/v1/" + mode + "?i=" + list.map(encodeURIComponent).join(",") +
    (mode === "marquee" && direction === "right" ? "&direction=right" : "");

  async function update() {
    const list = names();
    if (list.length === 0) {
      status.textContent = "Add at least one icon name.";
      return;
    }
    const path = pathFor(list);
    const id = ++requestId;
    try {
      const res = await fetch(path);
      if (id !== requestId) return;
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const missing = /^No known icons: (.*)$/.exec(body.error || "");
        status.textContent = missing
          ? "We don't have any of these icons: " + missing[1]
          : body.error || "Something went wrong.";
        return;
      }
      const skipped = res.headers.get("${UNKNOWN_ICONS_HEADER}");
      status.textContent = skipped
        ? "We don't have these icons yet, so they're left out: " + skipped.split(",").map(decodeURIComponent).join(", ")
        : "";
    } catch {
      if (id === requestId) status.textContent = "Network error.";
      return;
    }
    const url = location.origin + path;
    preview.src = path;
    fields.markdown.textContent = "![" + alt + "](" + url + ")";
    fields.html.textContent = '<img src="' + url + '" alt="' + alt + '" />';
    fields.url.textContent = url;
  }

  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(update, 300);
  });

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode;
      modeButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      directionGroup.hidden = mode !== "marquee";
      update();
    });
  });

  directionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      direction = button.dataset.direction;
      directionButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      update();
    });
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = fields[button.dataset.copy].textContent;
      const label = button.getAttribute("aria-label");
      try {
        await navigator.clipboard.writeText(text);
        button.dataset.state = "copied";
        button.setAttribute("aria-label", "Copied");
      } catch {
        button.dataset.state = "failed";
        button.setAttribute("aria-label", "Copy failed");
      }
      setTimeout(() => {
        delete button.dataset.state;
        button.setAttribute("aria-label", label);
      }, 1500);
    });
  });

  update();
})();
`;
