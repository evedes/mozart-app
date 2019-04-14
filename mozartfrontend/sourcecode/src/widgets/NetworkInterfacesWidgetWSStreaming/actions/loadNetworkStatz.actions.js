import {
  LOAD_NETWORK_STATZ_WSSTREAMING_REQUEST,
  LOAD_NETWORK_STATZ_WSSTREAMING_SUCCESS,
  LOAD_NETWORK_STATZ_WSSTREAMING_ERROR,
} from '../constants';

import { subscribeToNetworkStatz } from '../../../libs/socketLib';

export const streamNetworkStatz = (
  chartingPeriod,
  pollingPeriod,
  changingChartingPeriod
) => async dispatch => {
  dispatch({
    type: LOAD_NETWORK_STATZ_WSSTREAMING_REQUEST,
    changingChartingPeriod,
  });
  try {
    subscribeToNetworkStatz(
      networkStatz => {
        dispatch({
          type: LOAD_NETWORK_STATZ_WSSTREAMING_SUCCESS,
          networkStatz,
        });
      },
      chartingPeriod,
      pollingPeriod * 1000
    );
  } catch (error) {
    dispatch({
      type: LOAD_NETWORK_STATZ_WSSTREAMING_ERROR,
      error,
    });
  }
};
