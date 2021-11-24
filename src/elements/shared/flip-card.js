import { LitElement, html, css } from 'lit';

export class FlipCardElement extends LitElement {
  static properties = {
    title: {},
    color1: {},
    color2: {}
  };

  static styles = css`
    :host {
      perspective: 150rem;
      position: relative;
      display: block;
    }
    .side {
      transition: all 0.8s ease;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      padding: 1rem;
      width: 100%;
      backface-visibility: hidden;
      border-radius: 3px;
      overflow: hidden;
      box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
    }
    .side.front {
      background: linear-gradient(-45deg, var(--bg-color-1), var(--bg-color-2));
    }
    .side.back {
      transform: rotateY(180deg);
      background: linear-gradient(-45deg, var(--bg-color-2),var(--bg-color-1));
    }
    :host(.flipped) .side.front {
      transform: rotateY(-180deg);
    }
    :host(.flipped) .side.back {
      transform: rotateY(0);
    }
  `;

  willUpdate(changedProperties) {
    // only need to check changed properties for an expensive computation.
    if (changedProperties.has('color1')) {
      this.style.setProperty('--bg-color-1', this.color1);
    }
    if (changedProperties.has('color2')) {
      this.style.setProperty('--bg-color-2', this.color2);
    }
  }

  flip() {
    this.classList.toggle('flipped');
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="side front">
            <div class="title">
              <i class="fas fa-paper-plane"></i>
              <h4 class="heading">${this.title}</h4>
            </div>
            <div class="details">
              <slot name="details"></slot>
            </div>
            <button @click="${() => this.flip()}">Read More</button>
          </div>
          <div class="side back">
            <div class="details">
              <slot name="back"></slot>
            </div>
            <button @click="${() => this.flip()}">Read More</button>
          </div>
        </div>
      `;
  }
}

customElements.define('flip-card', FlipCardElement);
