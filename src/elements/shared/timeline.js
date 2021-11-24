import { LitElement, html, css } from 'lit';
import headings from '../../styles/headings.js';
import tagStyles from '../../styles/tags.js';
import './flip-card.js';

const bgColors = [
  {
    color1: '#f403d1',
    color2: '#64b5f6',
  },
  {
    color1: '#f321d7',
    color2: '#ffec61',
  },
  {
    color1: '#24ff72',
    color2: '#9a4eff',
  },
];
export class ResumeTimelineElement extends LitElement {
  static properties = {
    data: {},
  };

  static styles = [
    headings,
    tagStyles,
    css`
      ul {
        padding: 0;
        list-style: none;
      }
      li {
        
        padding-bottom: 1rem;
      }
      li + li {
        border-top: 1px solid #e3e3e3;
      }
      .title {
        font-size: 0.85rem;
        font-weight: 600;
      }
      .content,
      .subtitle {
        font-size: 0.75rem;
      }
      h3 {
        margin-bottom: 0.5rem;
      }
      h4 {
        margin-top: 0.5rem;
      }
      .skill-tags {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        gap: 10px;
        
      }
    `,
  ];

  static getTimeFrame(timeFrame) {
    return `${new Date(timeFrame.from).getFullYear()} - ${
      new Date(timeFrame.to).getFullYear() || 'Now'
    }`;
  }

  render() {
    return html`
      <ul>
        ${this.data.map(
          ({
            title, subtitle, content, timeFrame, tags
          }) => html` <li>
            <h3>${title}</h3>
            <h4>${subtitle} | ${ResumeTimelineElement.getTimeFrame(
            timeFrame
          )} </h3>
            <p>${content}</p>
            ${
              tags?.length
                ? html`<div class="skill-tags">
                    ${tags.map(
                      s => html` <div class="tag">${s}</div> `
                    )}
                  </div>`
                : ''
            }
          </li> `
        )}
      </ul>
    `;
  }
}

customElements.define('resume-timeline', ResumeTimelineElement);
