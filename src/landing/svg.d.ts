// SVG files imported as text with `with { type: "text" }`.
declare module "*.svg" {
  const content: string;
  export default content;
}
