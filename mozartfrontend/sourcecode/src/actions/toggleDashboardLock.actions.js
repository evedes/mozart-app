import { TOGGLE_DASHBOARD_LOCK } from '../constants';

export const toggleDashboardLock = () => dispatch => {
  dispatch({ type: TOGGLE_DASHBOARD_LOCK });
};
