import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';

@customElement('content-carousel')
export class CarouselElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        position: relative;
        overflow: hidden;
      }
      ::slotted(*) {
        flex: 1 0 100%;
      }
      ::slotted(*.active) {
        flex: 1 0 100%;
        opacity: 1;
      }

      .images {
        display: flex;
        flex-flow: row nowrap;
        transition: transform 1s;
      }
      button {
        position: absolute;
        top: 50%;
        z-index: 2;
      }
      :host(.no-buttons) button {
        display: none;
      }
      .next {
        right: 0;
      }
      .prev {
        left: 0;
      }
      .indicators {
        display: flex;
        justify-content: center;
        list-style: none;
        gap: 1rem;
      }
      li {
        height: 10px;
        width: 10px;
        background: #dedede;
        border-radius: 50%;
        cursor: pointer;
      }
      li.active {
        background: #000;
      }
      @media print {
        .images {
          display: block;
          transform: none !important;
        }
        .indicators {
          display: none;
        }
      }
    `,
  ];
  @state() translateX = 0;
  
  @state() active = 0;
  
  @state()  slottedContent: Element[] = [];
  
  @property({
    type: Number,
  }) duration?: number;

  private inverval?: number;
  private timer?: number;

  constructor() {
    super();
    
  }

  connectedCallback() {
    super.connectedCallback();
    this.#setTouchEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.inverval) {
      clearInterval(this.inverval);
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(_changedProperties);
    const slot = this.renderRoot.querySelector('slot');
    this.slottedContent = slot
      ? [...slot.assignedElements({ flatten: true })]
      : [];
    this.setActive(0);
  }

  render() {
    return html`
      <button @click="${() => this.previous()}" class="prev">Prev</button>
      <div
        class="images"
        style="transform: translateX(${this.translateX * -1}px)"
      >
        <slot></slot>
      </div>

      <button @click="${() => this.next()}" class="next">Next</button>
      <ol class="indicators">
        ${this.slottedContent?.map(
      (_, i) => html`
            <li
              class="${this.active === i ? 'active' : ''}"
              @click="${() => this.setActive(i)}"
              @keypress="${() => this.setActive(i)}"
            ></li>
          `
    )}
      </ol>
    `;
  }

  next() {
    let nextActive = this.active + 1;
    if (nextActive >= this.slottedContent.length) {
      nextActive = 0;
    }
    this.setActive(nextActive);
  }

  
  previous() {
    let nextActive = this.active - 1;
    if (nextActive < 0) {
      nextActive = this.slottedContent.length - 1;
    }
    this.setActive(nextActive);
  }

  
  setActive(i: number) {
    this.active = i;
    let activeEl: Element | HTMLElement;
    this.slottedContent?.forEach((el: Element | HTMLElement, j) => {
      if (j === this.active) {
        el.classList.add('active');
        if ('offsetLeft' in el){
          this.translateX = el.offsetLeft;
        }
        
        activeEl = el;
      } else {
        el.classList.remove('active');
      }
    });
    if (this.inverval) {
      clearInterval(this.inverval);
    }
    this.inverval = setInterval(() => {
      if ('offsetLeft' in activeEl){
        this.translateX = activeEl.offsetLeft;
      }
    }, 50);

    if (this.duration) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => this.next(), this.duration);
    }
  }

  #setTouchEvents() {
    let touchStartX: number;
    let touchEndX: number;
    const passive = true;
    this.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchEndX = e.touches[0].clientX;
      },
      { passive }
    );
    this.addEventListener(
      'touchmove',
      (e) => {
        touchEndX = e.touches[0].clientX;
      },
      { passive }
    );
    this.addEventListener('touchend', () => {
      if (touchStartX < touchEndX) {
        this.previous();
      } else if (touchStartX > touchEndX) {
        this.next();
      }
    });
  }
}

