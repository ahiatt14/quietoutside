import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

export default ({
  photos = [],
  monochrome,
  className
}) => {

  const [hoveredPreviewId, setHoveredPreviewId] = useState(null);
  
  return html`
    <div class="gallery ${className ? className : ""}">
      ${photos.map(photo => html`
        <a
          key="${photo.id}"
          href="details?photo=${photo.id}"
          class="preview"
          onMouseOver=${() => setHoveredPreviewId(photo.id)}
          onMouseOut=${() => setHoveredPreviewId(null)}
        >
          <img
            loading="lazy"
            src="./img/previews/${photo.id}.jpg"
            alt="${photo.title}"
            class="
              preview__img
              ${monochrome ? "preview__img--monochrome" : ""}
              ${
                (hoveredPreviewId !== null && photo.id !== hoveredPreviewId) ?
                "preview__img--obscured" :
                ""
              }
            "
          />
        </a>
      `)}
    </div>
  `;
}