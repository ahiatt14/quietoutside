// import { h } from 'https://unpkg.com/preact@latest?module';
// import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
import { html } from 'https://npm.reversehttp.com/htm/preact';
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import Gallery from '../components/Gallery.js';

export default ({}) => {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (photos.length > 0) return; 
    const fetchPhotoManifest = async () => {
      const response = await fetch('https://ahphotography.surge.sh/photoManifest.json');
      const photos = await response.json();
      setPhotos(photos);
    }
    fetchPhotoManifest();
  });

  // const html = htm.bind(h);

  return html`
    <${Gallery}
      photos=${photos}
    />
  `;
}