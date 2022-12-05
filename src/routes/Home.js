import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import useLocalStorage from "../hooks/useLocalStorage.js";
import useFetchedState from "../hooks/useFetchedState.js";
import { mutatingShuffle } from "../helpers.js";
import Gallery from "../components/Gallery.js";
import CopyrightNotice from "../components/CopyrightNotice.js";
import MonochromeIcon from "../components/MonochromeIcon.js";

export default ({}) => {

  const { data: photos } = useFetchedState("/photoManifest.json", []);
  const [monochrome, setMonochrome] = useLocalStorage("monochrome");

  return html`
    <div class="app">
      <aside class="left-sidebar">
        <ul class="sidebar-menu">
          <li>
            <${MonochromeIcon}
              monochrome=${monochrome}
              onClick=${() => setMonochrome(!monochrome)}
            />
          </li>
        </ul>
      </aside>
      <${Gallery}
        photos=${photos}
        monochrome=${monochrome}
        className="main-content"
      />
      <footer class="home-footer">
        <${CopyrightNotice} />
      </footer>
    </div>
  `;
}