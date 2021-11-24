import { LitElement, html, css } from 'lit';

export class OffCanvasElement extends LitElement {
  static properties = {
    state: {},
    disabled: {},
  };

  static styles = css`
    :host {
      position: fixed;
      transition: left 0.5s ease-in-out;

      width: var(--app-offcanvas-width);
      flex: 1 0 var(--app-offcanvas-width);
      height: 100vh;
    }
    :host(.show) {
      left: 0 !important;
    }
    :host(:not(.disabled)) {
      left: calc(var(--app-offcanvas-width, 100%) * -1);
    }

    :host(.disabled) .toggle {
      display: none;
    }
    :host(.no-button) .toggle {
      display: none;
    }
    .toggle {
      position: absolute;
      right: -50px;
      border: none;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      padding: 15px;
      width: 50px;
      height: 50px;
      box-sizing: border-box;
    }
    svg {
      width: 100%;
      height: 100%;
    }
    
  `;

  get disabled() {
    return this.classList.contains('disabled');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.state === 'open' && !this.disabled) {
      this.toggle();
    }
  }

  render() {
    return html`
      <button class="toggle" @click=${() => this.toggle()} aria-label="Open side menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path
            d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"
          />
        </svg>
      </button>
      <slot></slot>
    `;
  }

  toggle() {
    this.classList.toggle('show');
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        detail: this.classList.contains('show'),
      })
    );
  }
}
customElements.define('off-canvas', OffCanvasElement);
