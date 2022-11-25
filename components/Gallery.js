import { html } from 'https://npm.reversehttp.com/htm/preact';

export default ({
  photos = []
}) => html`
  <div class="gallery">
    ${photos.map(photo => html`
      <a
        key="${photo.id}"
        href="/img/full/${photo.id}.jpg"
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