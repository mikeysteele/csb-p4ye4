import { css } from 'lit';

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

function getBreakPoint(breakpoint) {
  const bp = breakpoints[breakpoint];
  if (bp === undefined) {
    throw new Error(
      `breakpoint must be one of:${Object.keys(breakpoints).join(' ')}`
    );
  }
  return bp;
}
export function includeBreakpointUp(breakpoint, content) {
  const bp = getBreakPoint(breakpoint);
  return css`
    @media screen and (min-width: ${bp}px) {
      ${content}
    }
  `;
}

export function includeBreakpointDown(breakpoint, content) {
  const bp = getBreakPoint(breakpoint);

  return css`
    @media screen and (max-width: ${bp - 0.2}px) {
      ${content}
    }
  `;
}
