import {
  LOAD_NETWORK_STATZ_POLLING_REQUEST,
  LOAD_NETWORK_STATZ_POLLING_SUCCESS,
  LOAD_NETWORK_STATZ_POLLING_ERROR,
} from '../constants';

export const pollNetworkStatz = (
  chartingPeriod,
  changingChartingPeriod
) => async dispatch => {
  dispatch({
    type: LOAD_NETWORK_STATZ_POLLING_REQUEST,
    changingChartingPeriod,
  });
  try {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };
    const networkStatz = await fetch(
      `api/networkStatz/${chartingPeriod}`,
      init
    ).then(res => res.json());

    dispatch({
      type: LOAD_NETWORK_STATZ_POLLING_SUCCESS,
      networkStatz,
    });
  } catch (error) {
    dispatch({
      type: LOAD_NETWORK_STATZ_POLLING_ERROR,
      error,
    });
  }
};
