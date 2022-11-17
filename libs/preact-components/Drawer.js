import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { toChildArray } from 'https://unpkg.com/preact?module';

export default ({
  isOpen,
  className,
  children
}) => {

  if (!isOpen) return null;

  return html`
    <section class="tail__drawer ${className}">
      ${toChildArray(children)}
    </section>
  `;
}