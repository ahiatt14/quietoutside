import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import useLocalStorage from "../hooks/useLocalStorage.js";

// TODO: this is getting large enough to de-documentize and componentize

export default ({ photoId }) => {

  const [photo, setPhoto] = useState({});
  const [monochrome, setMonochrome] = useLocalStorage("monochrome");
  const [randomId, setRandomId] = useState(1);

  // TODO: make a useFetch hook or at least a usePhotoManifest hook
  // (fn that takes a photoId and returns a fn that takes photos)
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

  if (Object.keys(photo).length === 0) return null;
  if (photo === undefined) window.location = "/";

  // TODO: make the monochrome icon its own comp
  return html`
    <div class="app">
      <aside class="left-sidebar">
        <ul class="sidebar-menu">
          <li>
            <a href="/">
              <span class="material-icons sidebar-menu__icon">
                home
              </span>
            </a>
          </li>
          <li>
            <span
              class="
                material-icons
                sidebar-menu__icon
                ${monochrome ? "sidebar-menu__icon--lit" : ""}
              "
              onclick=${() => setMonochrome(!monochrome)}
            >
              contrast
            </span>
          </li>
          <li>
            <a href="/details?photo=${randomId}">
              <span class="material-icons sidebar-menu__icon">
                casino
              </span>
            </a>
          </li>
        </ul>
      </aside>
      <section class="main-content">
        <div class="photo-container">
          <img
            class="photo ${monochrome ? "photo--monochrome" : ""}"
            alt="${photo.title}"
            src="../img/full/${photoId}.jpg"
          />
        </div>
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
      </section>
    </div>
  `;
};