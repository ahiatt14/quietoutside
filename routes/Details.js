import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import { Fragment } from 'https://unpkg.com/preact@latest/dist/preact.module.js?module';
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

export default ({ photoId }) => {

  const [photo, setPhoto] = useState({});

  useEffect(() => {
      const fetchPhotoManifest = async () => {
        const response = await fetch('https://ahphotography.surge.sh/photoManifest.json');
        const photos = await response.json();
        setPhoto(photos.find(photo => photo.id === photoId));
      };
      fetchPhotoManifest();
    },
    [photoId]
  );

  if (Object.keys(photo).length === 0) return null;
  if (photo === undefined) window.location = "/";

  return html`
    <${Fragment}>
      <a
        href="/"
        class="home-icon"
      >
        <span class="material-icons-outlined">
          arrow_back
        </span>
      </a>
      <aside class="details">
        <section>
          <h4>${photo.title}</h4>
          <p>
            <b>Camera: </b>${photo.camera}
            <br/>
            <b>Lens: </b>${photo.lens}
          </p>
        </section>
      </aside>
      <section class="photo-container">
        <img
          class="letterbox"
          alt="${photo.title}"
          src="../img/full/${photoId}.jpg"
        />
      </section>
    </${Fragment}>
  `;
};