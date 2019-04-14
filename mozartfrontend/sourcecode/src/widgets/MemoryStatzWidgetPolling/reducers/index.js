import {
  LOAD_MEMORY_STATZ_POLLING_REQUEST,
  LOAD_MEMORY_STATZ_POLLING_SUCCESS,
  LOAD_MEMORY_STATZ_POLLING_ERROR,
} from '../constants';

const initialState = {
  memoryStatz: [],
  changingChartingPeriod: false,
};

const memoryStatzReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_MEMORY_STATZ_POLLING_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoaded: false,
        changingChartingPeriod: action.changingChartingPeriod,
      };
    case LOAD_MEMORY_STATZ_POLLING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        changingChartingPeriod: false,
        data: action.memoryStatz,
      };
    case LOAD_MEMORY_STATZ_POLLING_ERROR:
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

export default memoryStatzReducer;
