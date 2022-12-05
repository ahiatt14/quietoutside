import { html } from "https://unpkg.com/htm/preact/index.mjs?module";

// TODO: could (should) easily generalize this to a ToggleableIcon component
export default ({
  monochrome,
  onClick
}) => html`
  <span
    class="
      material-icons
      sidebar-menu__icon
      ${monochrome ? "sidebar-menu__icon--lit-green" : ""}
    "
    onclick=${onClick}
  >
    ${monochrome ? "invert_colors" : "invert_colors_off"}
  </span>
`;