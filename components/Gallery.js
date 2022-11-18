import { html } from 'https://npm.reversehttp.com/htm/preact';

export default ({
  photos = []
}) => html`
  <div class="gallery">
    ${photos.map(photo => html`
      <a key="${photo.id}" href="photos?id=${photo.id}">
        <img
          src="./img/previews/${photo.id}"
          alt="preview ${photo.id}"
          class="gallery__preview_img"
        >
      </a>
    `)}
  </div>
`;