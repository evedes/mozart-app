import {
  LOAD_SYSTEM_AVERAGE_WSSTREAMING_REQUEST,
  LOAD_SYSTEM_AVERAGE_WSSTREAMING_SUCCESS,
  LOAD_SYSTEM_AVERAGE_WSSTREAMING_ERROR,
} from '../constants';

import { subscribeToCpuStatz } from '../../../libs/socketLib';

export const streamCPUSystemAverage = (
  chartingPeriod,
  pollingPeriod,
  changingChartingPeriod
) => async dispatch => {
  dispatch({
    type: LOAD_SYSTEM_AVERAGE_WSSTREAMING_REQUEST,
    changingChartingPeriod,
  });
  try {
    subscribeToCpuStatz(
      cpuStatz => {
        dispatch({
          type: LOAD_SYSTEM_AVERAGE_WSSTREAMING_SUCCESS,
          cpuStatz,
        });
      },
      chartingPeriod,
      pollingPeriod * 1000
    );
  } catch (error) {
    dispatch({
      type: LOAD_SYSTEM_AVERAGE_WSSTREAMING_ERROR,
      error,
    });
  }
};
