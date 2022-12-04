import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import useLocalStorage from "../hooks/useLocalStorage.js";
import Gallery from '../components/Gallery.js';

export default ({}) => {

  const [photos, setPhotos] = useState([]);
  const [monochrome, setMonochrome] = useLocalStorage("monochrome");

  useEffect(() => {
    if (photos.length > 0) return; 
    const fetchPhotoManifest = async () => {
      const response = await fetch('/photoManifest.json');
      const photos = await response.json();
      setPhotos(photos);
    };
    fetchPhotoManifest();
  });

  // TODO: make the monochrome icon its own comp
  return html`
    <div class="app">
      <aside class="left-sidebar">
        <ul class="sidebar-menu">
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
        </ul>
      </aside>
      <${Gallery}
        photos=${photos}
        monochrome=${monochrome}
        className="main-content"
      />
      <footer class="home-footer">
        <p class="copyright-notice">${`© 2020-2022 Alex Hiatt`}</p>
      </footer>
    </div>
  `;
}