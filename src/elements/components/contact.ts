import '../shared/fa-icon';

import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { Link } from '../../models/Link';

library.add(faPhone, faEnvelope);

@customElement('resume-contact')
export class ResumeContactElement extends LitElement {
  private readonly icons: { [key: string]: IconDefinition } = {
    phone: faPhone,
    email: faEnvelope,
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
        color: var(--app-color-secondary);
      }

      h3 {
        margin-top: 0;
      }
      fa-icon {
        width: 1rem;
        height: 1rem;
        color: var(--app-color-primary);
      }
    `,
  ];
  @property() data?: Link[];

  render() {
    return html`
      <ul>
        ${this.data?.map(
          ({ name, link, linkText }) => html`
            <li>
              <fa-icon
                icon="${this.icons[name]?.iconName}"
                prefix="${this.icons[name]?.prefix}"
              ></fa-icon>
              <a href="${link}" title="${name}">${linkText || link}</a>
            </li>
          `
        )}
      </ul>
    `;
  }
}
