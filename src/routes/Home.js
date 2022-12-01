import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import useLocalStorage from "../hooks/useLocalStorage.js";
import Gallery from '../components/Gallery.js';

export default ({}) => {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (photos.length > 0) return; 
    const fetchPhotoManifest = async () => {
      const response = await fetch('/photoManifest.json');
      const photos = await response.json();
      setPhotos(photos);
    };
    fetchPhotoManifest();
  });

  const [monochrome, setMonochrome] = useLocalStorage("monochrome");

  return html`
    <div class="app">
      <aside class="left-sidebar">
        <span
          class="material-icons monochrome-icon"
          onclick=${() => setMonochrome(!monochrome)}
        >
          monochrome_photos
        </span>
      </aside>
      <${Gallery}
        photos=${photos}
        monochrome=${monochrome}
        className="grid-center-gallery"
      />
      <footer class="home-footer">
        <p class="copyright-notice">${`© 2020-2022 Alex Hiatt`}</p>
      </footer>
    </div>
  `;
}