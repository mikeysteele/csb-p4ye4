import '../components/contact.js';
import '../components/sidebar.js';
import '../components/top-bar.js';
import '../shared/carousel.js';
import '../shared/icon.js';
import '../shared/off-canvas.js';
import '../shared/progress-bar.js';
import '../shared/timeline.js';
import '../shared/loading.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { css, html, LitElement } from 'lit';
import debounce from 'lodash-es/debounce';

import { includeBreakpointUp } from '../../styles/functions/breakpoints.js';
import grid from '../../styles/grid.js';
import headings from '../../styles/headings.js';
import tags from '../../styles/tags.js';

library.add(faBars);
export class MyResumeElement extends LitElement {
  static API_URL = './data.json';

  static properties = {
    data: {},
    loading: {},
    error: {},
    offCanvasDisabled: { state: true },
  };

  static styles = [
    headings,
    grid,
    tags,
    css`
      :host {
        display: flex;
        flex-direction: row;
        font-family: var(--app-font-family);
        line-height: 1.5;
        width: 100%;
       
      }
      :host(.menu-open) main {
        transform: translateX(var(--app-offcanvas-width));
      }
      main {
        background: var(--app-content-background);
        transition: transform 0.5s ease-in-out;
        box-sizing: border-box;
        max-width: var(--app-max-width);
      }
      section {
        border-bottom: 1px solid var(--app-color-light);
        width: 100%;
      }
      section > div {
        margin: 2rem;
      }
      
      h2 {
        color: var(--app-color-primary);
        text-transform: uppercase;
        display: flex;
        align-items: center;
      }

      .self-assessment .panel {
        display: flex;
        justify-content: between;
        width: 100%;
        justify-content: space-between;
        font-size: 0.9rem;
      }
      .self-assessment progress-bar {
        margin: 1rem 0 1.5rem;
      }
      .rating {
        color: var(--app-color-secondary);
      }
      .skill-tags {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        gap: 10px;
      }

      .avatar {
        float: left;
        height: 70px;
        width: 70px;
        border-radius: 10px;
        margin-right: 1rem;
      }
      nav {
        display: flex;
        color: #fff;
        align-items: center;
        height: 100%;
        gap: 1rem;
        padding: 0 1rem;
        box-sizing: border-box;
      }
      h1 {
        margin: 0;
      }
      nav button {
        border: none;
        background: none;
        outline: none;
        color: #fff;
        font-size: 1.25rem;
        padding: 0;
      }
      app-loading {
        position: fixed;
        left: calc(50% - 40px);
        top: calc(50% - 40px);
      }
      .app-error {
        position: fixed;
        top: 50%;
        left: 0;
        width: 100%;
        text-align: center;
        color: #FFF;
      }
      ${includeBreakpointUp(
        'xs',
        css`
          :host {
            --current-breakpoint: xs;
            padding-top: 60px;
          }
        `
      )}
      ${includeBreakpointUp(
        'sm',
        css`
          :host {
            --current-breakpoint: sm;
          }
        `
      )}
      ${includeBreakpointUp(
        'md',
        css`
          :host {
            --current-breakpoint: md;
            padding-top: 0;
          }
          top-bar {
            display: none;
          }
        `
      )}
      ${includeBreakpointUp(
        'lg',
        css`
          :host {
            --current-breakpoint: lg;
          }
          section.name {
            display: none;
          }
          section > div {
            margin: 4rem;
          }
        `
      )}
      ${includeBreakpointUp(
        'xl',
        css`
          :host {
            --current-breakpoint: xl;
          }
        `
      )}
      ${includeBreakpointUp(
        'xxl',
        css`
          :host {
            --current-breakpoint: xxl;
          }
        `
      )}
      @media print {
        top-bar {
          display: none;
        }
        a[href]::after {
          content: " (" attr(href) ")"; } 
        }
      }
    `,
  ];

  get currentBreakpoint() {
    return getComputedStyle(this)
      .getPropertyValue('--current-breakpoint')
      ?.trim();
  }

  #sections = new Map([
    ['#about', 'About'],
    ['#skills', 'Skills'],
    ['#work', 'Work'],
    ['#education', 'Education'],
  ]);

  #onResize() {
    this.offCanvasDisabled = ['lg', 'xl', 'xxl'].includes(
      this.currentBreakpoint
    );
    if (this.offCanvasDisabled) {
      this.menuIsToggled(true);
    } else {
      this.menuIsToggled(false);
    }
  }

  #debouncedResize = debounce(() => this.#onResize());

  constructor() {
    super();
    
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetch = window.fetch.bind(window);
    this.#loadData();
    this.#onResize();
    window.addEventListener('resize', this.#debouncedResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.#debouncedResize);
  }

  async #loadData() {
    try {
      this.loading = true;
      this.data = await this.fetch(MyResumeElement.API_URL).then(data => data.json());
    } catch (e) {
      this.error = new Error(
        'There was an error loading data. Please check your internet connection and try again.'
      );
    } finally {
      this.loading = false;
    }
  }

  /**
   * Add or rebove the menu-open class
   *
   * @param {boolean} isOpen
   */
  menuIsToggled(isOpen) {
    if (isOpen) {
      this.classList.add('menu-open');
    } else {
      this.classList.remove('menu-open');
    }
  }

  /**
   * Scroll to the required element without scrolling horizontally;
   *
   * @param {HTMLElement} el
   */
  scrollTo(el) {
    const { top } = this.renderRoot
      .querySelector(el)
      ?.getBoundingClientRect() ?? { top: 0 };
    const { height } = this.renderRoot
      .querySelector('top-bar')
      ?.getBoundingClientRect() ?? { top: 0 };
    window.scrollBy({
      top: top - height,
      left: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return html`
      ${this.loading
        ? html`<app-loading></app-loading>`
        : this.error
          ? html`<div class="app-error">${this.error.message}</div>`
          : html`
            <off-canvas
              class="${this.offCanvasDisabled ? 'disabled' : ''} no-button"
              state="closed"
              @menuToggled=${({ detail }) => this.menuIsToggled(detail)}
            >
              <resume-sidebar
                name="${this.data.name}"
                headline="${this.data.headline}"
                imageUrl="${this.data.photo}"
                .socials="${this.data.socials}"
                .links="${this.#sections}"
                @linkClicked="${({ detail }) => this.scrollTo(detail)}"
              >
              </resume-sidebar>
            </off-canvas>
            <top-bar>
              <nav>
                <button
                  aria-label="toggle menu"
                  @click="${() => this.renderRoot.querySelector('off-canvas').toggle()}"
                >
                  <fa-icon icon="bars"></fa-icon>
                </button>
                <h1>${this.data.name}</h1>
              </nav>
            </top-bar>
            <main>
              <section class="blurb" id="about">
                <div>
                  <h2>About Me</h2>
                  <div>${this.data.blurb}</div>
                  <resume-contact .data=${this.data.contact}></resume-contact>
                </div>
              </section>

              <section id="skills">
                <div>
                  <h2>Skills</h2>
                  <div class="self-assessment flex-grid">
                    <div class="row">
                      ${this.data.selfAssessment.map(
                        ({ name, rating }) => html`
                          <div class="col-md-6">
                            <div class="panel">
                              <span class="name">${name}</span>
                              <span class="rating">${rating}%</span>
                            </div>
                            <progress-bar
                              animated
                              aria-label="${name} rating"
                              class="success"
                              value="${rating}"
                            ></progress-bar>
                          </div>
                        `
                      )}
                    </div>
                  </div>
                  <div class="skill-tags">
                    ${this.data.skills.map(
                      s => html` <div class="tag">${s}</div> `
                    )}
                  </div>
                </div>
              </section>

              <section id="work">
                <div>
                  <h2>Work Experience</h2>
                  <resume-timeline .data=${this.data.roles}></resume-timeline>
                </div>
              </section>
              <section id="education">
                <div>
                  <h2>Education</h2>
                  <resume-timeline
                    .data=${this.data.education}
                  ></resume-timeline>
                </div>
              </section>
              ${this.data.testimonials.length
                ? html`<section id="testimonials">
                    <div>
                      <h2>Testimonials</h2>
                      <content-carousel duration="10000" class="no-buttons">
                        ${this.data.testimonials.map(
                          ({
                            name,
                            position,
                            content,
                            organisation,
                            avatar,
                            linkedIn,
                          }) => html`
                            <article>
                              <p>
                                ${avatar
                                  ? html`
                                      <img
                                        class="avatar"
                                        src="${avatar}"
                                        alt="${name} photo"
                                      />
                                    `
                                  : ''}
                                ${content}
                              </p>
                              <a href="${linkedIn}"
                                ><small
                                  >${name} | ${position} -
                                  ${organisation}</small
                                ></a
                              >
                            </article>
                          `
                        )}
                      </content-carousel>
                    </div>
                  </section>`
                : ''}
            </main>
          `}
    `;
  }
}

customElements.define('my-resume', MyResumeElement);
