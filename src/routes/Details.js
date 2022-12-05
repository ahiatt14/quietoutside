import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import useLocalStorage from "../hooks/useLocalStorage.js";
import useFetchedState from "../hooks/useFetchedState.js";
import CopyrightNotice from "../components/CopyrightNotice.js";
import MonochromeIcon from "../components/MonochromeIcon.js";

export default ({ photoId }) => {

  const { data: photos } = useFetchedState("/photoManifest.json", []);
  const [monochrome, setMonochrome] = useLocalStorage("monochrome");

  if (photos.length === 0) return null;
  
  const photo = photos.find(photo => photo.id === photoId);
  if (photo === undefined) window.location = "/";

  const allIds = photos.map(photo => photo.id);
  const randomId = allIds[Math.floor(Math.random() * allIds.length)];

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
            <${MonochromeIcon}
              monochrome=${monochrome}
              onClick=${() => setMonochrome(!monochrome)}
            />
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
        <${CopyrightNotice} />
      </section>
    </div>
  `;
};