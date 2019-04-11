import {
  CHANGE_CHARTING_PERIOD,
  CHANGE_POLLING_PERIOD,
  CHANGE_CURRENT_BREAKPOINT,
  CHANGE_CONNECTION_MODE,
  TOGGLE_DASHBOARD_LOCK,
} from '../constants';

const initialState = {
  chartingPeriod: '10',
  pollingPeriod: '5',
  changingChartingPeriod: false,
  connectionMode: 'polling',
  currentBreakpoint: null,
  isDashboardLocked: true,
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case CHANGE_CHARTING_PERIOD:
      return {
        ...state,
        chartingPeriod: action.chartingPeriod,
      };
    case CHANGE_POLLING_PERIOD:
      return {
        ...state,
        pollingPeriod: action.pollingPeriod,
      };
    case CHANGE_CURRENT_BREAKPOINT:
      return {
        ...state,
        currentBreakpoint: action.currentBreakpoint,
      };
    case CHANGE_CONNECTION_MODE:
      return {
        ...state,
        connectionMode: action.connectionMode,
      };
    case TOGGLE_DASHBOARD_LOCK:
      return {
        ...state,
        isDashboardLocked: !state.isDashboardLocked,
      };
    default:
      return state;
  }
};

export default reducer;
