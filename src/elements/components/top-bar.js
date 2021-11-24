import { LitElement, html, css } from 'lit';
import '../shared/icon.js';

export class TopBarElement extends LitElement {
  static styles = css`
    :host {
        position: fixed;
        height: 60px;
        box-shadow: 0 3px 5px -1px #0003,0 6px 10px #00000024,0 1px 18px #0000001f;
        display: block;
        width:100%;
        top: 0;
        right:0;
        background: var(--app-body-background);       
    }
  `;

  static properties = {
    links: {}
  };

  render() {
    return html`
        <slot></slot>
      `;
  }
}

customElements.define('top-bar', TopBarElement);
