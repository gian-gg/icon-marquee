/// <reference path="./svg.d.ts" />
import brandGithub from "@tabler/icons/outline/brand-github.svg" with {
  type: "text",
};
import check from "@tabler/icons/outline/check.svg" with { type: "text" };
import copy from "@tabler/icons/outline/copy.svg" with { type: "text" };
import layoutGrid from "@tabler/icons/outline/layout-grid.svg" with {
  type: "text",
};
import playerPlay from "@tabler/icons/outline/player-play.svg" with {
  type: "text",
};
import x from "@tabler/icons/outline/x.svg" with { type: "text" };

// Tabler SVG as a decorative inline icon with the given class.
function inline(svg: string, className: string): string {
  return svg
    .replace(/\s+/g, " ")
    .replace(
      / class="[^"]*"/,
      ` class="ui-icon ${className}" aria-hidden="true" focusable="false"`,
    )
    .replace(/> </g, "><")
    .trim();
}

export const icons = {
  github: inline(brandGithub, ""),
  allIcons: inline(layoutGrid, ""),
  tryIt: inline(playerPlay, ""),
  copy: inline(copy, "copy-idle"),
  copied: inline(check, "copy-done"),
  failed: inline(x, "copy-failed"),
} as const;
