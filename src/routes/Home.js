import { html } from "https://unpkg.com/htm/preact/index.mjs?module";
import useLocalStorage from "../hooks/useLocalStorage.js";
import useFetchedState from "../hooks/useFetchedState.js";
import { shuffle } from "../helpers.js";
import Gallery from "../components/Gallery.js";

export default ({}) => {

  const { data: photos } = useFetchedState("/photoManifest.json", []);
  const [monochrome, setMonochrome] = useLocalStorage("monochrome");

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