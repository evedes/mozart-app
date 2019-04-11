import { CHANGE_CHARTING_PERIOD } from '../constants';

export const changeChartingTime = chartingPeriod => dispatch =>
  dispatch({ type: CHANGE_CHARTING_PERIOD, chartingPeriod });
