import { CHANGE_CHARTING_PERIOD } from '../constants';

export const changeChartingTime = chartingPeriod => ({
  type: CHANGE_CHARTING_PERIOD,
  chartingPeriod,
});
