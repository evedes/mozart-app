import {
  LOAD_SYSTEM_AVERAGE_WSSTREAMING_REQUEST,
  LOAD_SYSTEM_AVERAGE_WSSTREAMING_SUCCESS,
  LOAD_SYSTEM_AVERAGE_WSSTREAMING_ERROR,
} from '../constants';

const initialState = {
  cpuSystemLoadAvg: [],
  changingChartingPeriod: false,
};

const cpuSystemLoadAvg = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_SYSTEM_AVERAGE_WSSTREAMING_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false,
        changingChartingPeriod: action.changingChartingPeriod,
      };
    case LOAD_SYSTEM_AVERAGE_WSSTREAMING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        changingChartingPeriod: false,
        data: action.cpuStatz,
      };
    case LOAD_SYSTEM_AVERAGE_WSSTREAMING_ERROR:
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
