import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import Gallery from '../components/Gallery.js';

export default ({}) => {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (photos.length > 0) return; 
    const fetchPhotoManifest = async () => {
      const response = await fetch('quiteoutside.place/photoManifest.json');
      const photos = await response.json();
      setPhotos(photos);
    };
    fetchPhotoManifest();
  });

  return html`
    <${Gallery}
      photos=${photos}
    />
  `;
}