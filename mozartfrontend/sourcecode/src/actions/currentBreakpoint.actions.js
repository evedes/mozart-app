import { CHANGE_CURRENT_BREAKPOINT } from '../constants';

export const changeCurrentBreakpoint = currentBreakpoint => dispatch => {
  dispatch({
    type: CHANGE_CURRENT_BREAKPOINT,
    currentBreakpoint,
  });
};
