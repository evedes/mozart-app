const initialState = {
  chartingPeriod: '10',
  currentBreakpoint: null,
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case 'CHANGE_CHARTING_PERIOD':
      return {
        ...state,
        chartingPeriod: action.chartingPeriod,
      };
    case 'CHANGE_CURRENT_BREAKPOINT':
      return {
        ...state,
        currentBreakpoint: action.currentBreakpoint,
      };
    default:
      return state;
  }
};

export default reducer;
