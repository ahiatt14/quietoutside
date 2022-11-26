import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
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

  if (photo === undefined) window.location = "/";

  return html`

    <p>${photo.title}</p>
  `;
};