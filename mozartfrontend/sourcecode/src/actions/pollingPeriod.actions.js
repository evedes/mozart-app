import { CHANGE_POLLING_PERIOD } from '../constants';

export const changePollingPeriod = pollingPeriod => dispatch => {
  dispatch({
    type: CHANGE_POLLING_PERIOD,
    pollingPeriod,
  });
};
