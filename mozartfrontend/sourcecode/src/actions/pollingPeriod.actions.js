import { CHANGE_POLLING_PERIOD } from '../constants';

export const changePollingPeriod = pollingPeriod => ({
  type: CHANGE_POLLING_PERIOD,
  pollingPeriod,
});
