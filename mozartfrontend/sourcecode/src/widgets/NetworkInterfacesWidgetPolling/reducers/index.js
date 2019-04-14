import {
  LOAD_NETWORK_STATZ_POLLING_REQUEST,
  LOAD_NETWORK_STATZ_POLLING_SUCCESS,
  LOAD_NETWORK_STATZ_POLLING_ERROR,
} from '../constants';

const initialState = {
  networkStatz: [],
  changingChartingPeriod: false,
};

const networkStatzReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_NETWORK_STATZ_POLLING_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false,
        changingChartingPeriod: action.changingChartingPeriod,
      };
    case LOAD_NETWORK_STATZ_POLLING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        changingChartingPeriod: false,
        data: action.networkStatz,
      };
    case LOAD_NETWORK_STATZ_POLLING_ERROR:
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

export default networkStatzReducer;
