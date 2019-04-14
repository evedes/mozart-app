import {
  LOAD_NETWORK_STATZ_WSSTREAMING_REQUEST,
  LOAD_NETWORK_STATZ_WSSTREAMING_SUCCESS,
  LOAD_NETWORK_STATZ_WSSTREAMING_ERROR,
} from '../constants';

const initialState = {
  networkStatz: [],
  changingChartingPeriod: false,
};

const networkStatzReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_NETWORK_STATZ_WSSTREAMING_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false,
        changingChartingPeriod: action.changingChartingPeriod,
      };
    case LOAD_NETWORK_STATZ_WSSTREAMING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        changingChartingPeriod: false,
        data: action.networkStatz,
      };
    case LOAD_NETWORK_STATZ_WSSTREAMING_ERROR:
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
