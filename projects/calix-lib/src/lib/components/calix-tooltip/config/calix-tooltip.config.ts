import { CalixTooltipEnum } from '../enum/calix-tooltip';

export type CalixTooltipType = 'light' | 'success' | 'danger' | 'warning' | 'info';

export const TOOLTIP_CLASS = 'tooltip';
export const CALIX_TOOLTIP_CLASS = 'calix-tooltip';
export const TOOLTIP_ARROW_CLASS = 'tooltip-arrow';
export const LIGHT_CLASS = 'light';

export const POSITION_STYLES = {
  [CalixTooltipEnum.Top]: {
    class: 'top',
    getStyle: (hostElementRect: DOMRect) => ({
      top: `${hostElementRect.bottom + 5}px`,
      left: `${hostElementRect.left}px`,
      transform: 'translateX(-50%)',
    }),
  },
  [CalixTooltipEnum.Right]: {
    class: 'right',
    getStyle: (hostElementRect: DOMRect) => ({
      top: `${hostElementRect.top}px`,
      left: `${hostElementRect.right + 5}px`,
      transform: 'translateY(-50%)',
    }),
  },
  [CalixTooltipEnum.Bottom]: {
    class: 'bottom',
    getStyle: (hostElementRect: DOMRect) => ({
      top: `${hostElementRect.bottom + 5}px`,
      left: `${hostElementRect.left}px`,
      transform: 'translateX(-50%)',
    }),
  },
  [CalixTooltipEnum.Left]: {
    class: 'left',
    getStyle: (hostElementRect: DOMRect) => ({
      top: `${hostElementRect.top}px`,
      right: `${window.innerWidth - hostElementRect.left + 5}px`,
      transform: 'translateY(-50%)',
    }),
  },
};
