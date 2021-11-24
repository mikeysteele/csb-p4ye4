import { unsafeCSS, css } from 'lit';
import { includeBreakpointUp } from './functions/breakpoints.js';

/**
 * Columns Mixin
 *
 * @param {string} size
 * @returns CssResult
 */
export function includeColumns(size = 'xs') {
  let sizePrefix = '';
  if (size !== 'xs') {
    sizePrefix = `-${size}`;
  }
  const columns = new Array(12).fill().map(
    (_, i) => `
     .flex-grid .col${sizePrefix}-${i + 1} {
        flex: 0 0 calc(${((i + 1) / 12) * 100}% - calc(var(--app-grid-gap, 15px) / 2 ));    
    }
     `
  );
  return includeBreakpointUp(size, unsafeCSS(columns.join(' ')));
}

export default css`
  .flex-grid {
  }
  .flex-grid .row {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between
  }
  
  .flex-grid .row > * {
    flex: 1;
    flex: 0 0 calc(100% - calc(var(--app-grid-gap, 15px) / 2 ))
  }
  ${includeColumns('xs')}
  ${includeColumns('sm')}
  ${includeColumns('md')}
  ${includeColumns('lg')}
  ${includeColumns('xl')}
  ${includeColumns('xxl')}
`;
