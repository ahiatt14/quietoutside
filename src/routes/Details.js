import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import useLocalStorage from "../hooks/useLocalStorage.js";

export default ({ photoId }) => {

  const [photo, setPhoto] = useState({});
  const [randomId, setRandomId] = useState(1);

  useEffect(() => {
      const fetchPhotoManifest = async () => {
        const response = await fetch('/photoManifest.json');
        const photos = await response.json();
        setPhoto(photos.find(photo => photo.id === photoId));
        setRandomId(Math.ceil(Math.random() * photos.length));
      };
      fetchPhotoManifest();
    },
    [photoId]
  );

  const [monochrome, setMonochrome] = useLocalStorage("monochrome");

  if (Object.keys(photo).length === 0) return null;
  if (photo === undefined) window.location = "/";

  return html`
    <div class="app">
      <section class="photo-container">
        <img
          class="photo letterbox ${monochrome ? "photo--monochrome" : ""}"
          alt="${photo.title}"
          src="../img/full/${photoId}.jpg"
        />
      </section>
      <section class="info">
        <p class="info__text">
          <b>${photo.title}</b>
          <br/>
          ${photo.camera} w/ ${photo.lens}
        </p>
        <ul class="info__actions">
          <li class="info__action">
            <a class="info__action--link" target="_blank" href="/img/full/${photo.id}.jpg">
              <span class="material-icons info__action-icon">fullscreen</span> download full size
            </a>
          </li>
          <li class="info__action">
            <a
              class="info__action--link"
              target="_blank"
              href="https://www.google.com/maps/place/${photo.latitude},${photo.longitude}"
            >
              <span class="material-icons info__action-icon">place</span> location
            </a>
          </li>
        </ul>
      </section>
      <p class="copyright-notice">${`© 2020-2022 Alex Hiatt`}</p>
    </div>
  `;
};