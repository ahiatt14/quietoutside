import { html } from 'https://npm.reversehttp.com/htm/preact';
import {
  useState,
  useEffect
} from 'https://npm.reversehttp.com/preact/hooks';

export default ({}) => {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
      console.log("what is up");
      const fetchPhotoManifest = async () => {
        const response = await fetch('https://ahphotography.surge.sh/photoManifest.json');
        const photos = await response.json();
        setPhotos(photos);
      }
      fetchPhotoManifest();
  });

  return html`
    <${Gallery}
      photos=${photos}
    />
  `;  
}