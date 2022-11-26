import { html } from "https://unpkg.com/htm/preact/index.mjs?module";

export default ({
  photos = []
}) => html`
  <div class="gallery">
    ${photos.map(photo => html`
      <a
        key="${photo.id}"
        href="details?photo=${photo.id}"
        class="preview"
      >
      ${html`
        <img
          src="./img/previews/${photo.id}.jpg"
          alt="preview ${photo.id}"
          class="preview__img"
        />
      `}
      </a>
    `)}
  </div>
`;

//href="photo?id=${photo.id}"