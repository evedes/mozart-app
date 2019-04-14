import {
  LOAD_SYSTEM_AVERAGE_POLLING_REQUEST,
  LOAD_SYSTEM_AVERAGE_POLLING_SUCCESS,
  LOAD_SYSTEM_AVERAGE_POLLING_ERROR,
} from '../constants';

const initialState = {
  cpuSystemLoadAvg: [],
  changingChartingPeriod: false,
};

const cpuSystemLoadAvg = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_SYSTEM_AVERAGE_POLLING_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false,
        changingChartingPeriod: action.changingChartingPeriod,
      };
    case LOAD_SYSTEM_AVERAGE_POLLING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        changingChartingPeriod: false,
        data: action.cpuLoadAvg,
      };
    case LOAD_SYSTEM_AVERAGE_POLLING_ERROR:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        chaingChartingPeriod: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default cpuSystemLoadAvg;
