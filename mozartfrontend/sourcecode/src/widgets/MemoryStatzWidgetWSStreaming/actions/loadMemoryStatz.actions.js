import {
  LOAD_MEMORY_STATZ_WSSTREAMING_REQUEST,
  LOAD_MEMORY_STATZ_WSSTREAMING_SUCCESS,
  LOAD_MEMORY_STATZ_WSSTREAMING_ERROR,
} from '../constants';

import { subscribeToMemoryStatz } from '../../../libs/socketLib';

export const streamMemoryStatz = (
  chartingPeriod,
  pollingPeriod,
  changingChartingPeriod
) => async dispatch => {
  dispatch({
    type: LOAD_MEMORY_STATZ_WSSTREAMING_REQUEST,
    changingChartingPeriod,
  });
  try {
    subscribeToMemoryStatz(
      memoryStatz => {
        dispatch({
          type: LOAD_MEMORY_STATZ_WSSTREAMING_SUCCESS,
          memoryStatz,
        });
      },
      chartingPeriod,
      pollingPeriod * 1000
    );
  } catch (error) {
    dispatch({
      type: LOAD_MEMORY_STATZ_WSSTREAMING_ERROR,
      error,
    });
  }
};
