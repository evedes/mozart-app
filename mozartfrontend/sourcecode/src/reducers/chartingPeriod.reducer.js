const initialState = {
  chartingPeriod: '10',
};

export const chartingPeriod = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case 'CHANGE_CHARTING_PERIOD':
      return {
        ...state,
        chartingPeriod: action.chartingPeriod,
      };
    default:
      return state;
  }
};
