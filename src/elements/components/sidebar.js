import { LitElement, html, css } from 'lit';
import { faLinkedin, faStackOverflow, faGithub } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import '../shared/icon.js';

library.add(faLinkedin, faStackOverflow, faGithub);

/**
 * Class definition
 *
 * @property {string}  name
 * @property {string}  headline
 * @property {string}  imageUrl
 * @property {string[]}  socials
 * @property {string[]} links
 */
export class ResumeSidebarElement extends LitElement {
  static properties = {
    name: {},
    headline: {},
    imageUrl: {},
    socials: {},
    links: {},
  };

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 20px;
        background: var(--app-sidebar-background);       
        padding: 2.5rem;
        color: var(--app-sidebar-text-color);
        align-items: center;
        height: 100%;
      }

      h1,
      h2 {
        margin: 0;
      }
      h3 {
        font-size: 1rem;
      }
      .socials {
        display: flex;
        justify-content: left;
        width: 100%;
        gap: 10px;
      }
      fa-icon {
        font-size: 1rem;
        color: #fff;
      }
      img {
        width: 165px;
        height: 165px;
        border-radius: 50%;
        display: block;
      }
      .links {
        width: 100%;
      }
      .links ul {
        padding: 0;
        list-style: none;
      }
      .links a {
        color: var(--app-sidebar-text-color) !important;
        text-transform: uppercase;
        font-size: 0.85rem;
        text-decoration: none;
        letter-spacing: 2px;
        line-height: 2.5;
      }
      @media print {
        .links {
          display: none;
        }
        .socials {
          display: none
        }
        a[href]::after {
          content: " (" attr(href) ")"; } 
          color: #fff;
        }
      }
      
    `,
  ];

  icons = {
    linkedin: faLinkedin,
    github: faGithub,
    stackoverflow: faStackOverflow
  };

  /**
   *
   * @param {Event} event
   * @param {string} link
   */
  linkClicked(event, link) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('linkClicked', { detail: link }));
  }

  render() {
    return html`
      <img src="/assets/images/${this.imageUrl}" alt="${this.name} photo" />
      <section class="name">
        <h1>${this.name}</h1>
        <div>${this.headline}</div>
      </section>
      <section class="socials">
        ${this.socials?.map(
      ({
        name, link, linkText
      }) => html`<a href="${link}" target="_blank"  rel="noopener" title="${name} ${linkText}"
              >              <fa-icon icon="${this.icons[name].iconName}" prefix="${this.icons[name].prefix}"></fa-icon>

            </a>`
    )}
      </section>
      <section class="links">
        <ul>
          ${[...this.links].map(
            ([link, name]) => html`<li>
                <a
                  href="${link}"
                 
                  @click=${(/** @type {Event} */ event) => this.linkClicked(event, link)}
                  >${name}</a
                >
              </li>`
          )}
        </ul>
      </section>
    `;
  }
}

customElements.define('resume-sidebar', ResumeSidebarElement);
