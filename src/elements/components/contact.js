import { LitElement, html, css } from 'lit';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../shared/icon.js';

library.add(faPhone, faEnvelope);

export class ResumeContactElement extends LitElement {
  static properties = {
    data: {},
  };

  icons = {
    phone: faPhone,
    email: faEnvelope
  };

  static styles = [
    css`
      ul {
        list-style: none;
        padding: 0%;
      }
      li {
        display: flex;
        align-items: center;
        font-size: 0.85rem;
      }
      li a {
        margin-left: 1rem;
        text-decoration: none;
      }

      h3 {
        margin-top: 0;
      }
      fa-icon {
        width: 1rem;
        height: 1rem;
      }
    `,
  ];

  render() {
    return html`
      
      <ul>
        ${this.data.map(
          ({
            name, link, linkText
          }) => html`
            <li>
              <fa-icon icon="${this.icons[name].iconName}" prefix="${this.icons[name].prefix}"></fa-icon>
              <a href="${link}" title="${name}">${linkText || link}</a>
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define('resume-contact', ResumeContactElement);
