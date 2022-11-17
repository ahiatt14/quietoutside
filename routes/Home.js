import { html } from 'https://npm.reversehttp.com/htm/preact';
import {
  useState,
  useEffect
} from 'https://npm.reversehttp.com/preact/hooks';

export default ({}) => {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotoManifest = async () => {
      const response = await fetch('https://ahphotography.surge.sh/photoManifest.json');
      
    }
  });

}