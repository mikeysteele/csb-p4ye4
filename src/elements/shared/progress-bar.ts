import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('progress-bar')
export class ProgressBarElement extends LitElement {
  
  static styles = css`
    :host {
      height: 4px;
      overflow: hidden;
      background-color: #e0e0e0;
      border-radius: 0;
      box-shadow: none;
      display: block;
      width: 100%;
    }
    :host([animated]) .progress-bar{
      transition: transform  ease 1s;
    }

    .progress-bar {
      width: 100%;
      height: 100%;
      font-size: 12px;
      line-height: 1px;
      color: #fff;
      text-align: center;
      background-color: #f74470;
      box-shadow: none;
      transform: translateX(0)
     
    }
    :host(.primary) .progress-bar {
      background-color: var(--app-color-primary);
    }
  `;

  @property() public value: number | string = 0;
  

  connectedCallback() {
    super.connectedCallback();
    // for the transition to work, the value needs to change so we set it to 0 first then change it.
    // This does cause the component to render twice
    const v = this.value;
    this.value = 0;
    setTimeout(() => {
      this.value = v;
    });
  }

  render() {
    return html`
      <div
        class="progress-bar"
        role="progressbar"
        aria-label="${this.ariaLabel}"
        aria-valuenow="${this.value}"
        aria-valuemin="0"
        aria-valuemax="100"
        style="transform :translateX(-${100 - +this.value}%)"
      ></div>
    `;
  }
}

