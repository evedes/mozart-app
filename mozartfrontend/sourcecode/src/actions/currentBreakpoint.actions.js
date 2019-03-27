import { CHANGE_CURRENT_BREAKPOINT } from '../constants';

export const changeCurrentBreakpoint = currentBreakpoint => ({
  type: CHANGE_CURRENT_BREAKPOINT,
  currentBreakpoint,
});
