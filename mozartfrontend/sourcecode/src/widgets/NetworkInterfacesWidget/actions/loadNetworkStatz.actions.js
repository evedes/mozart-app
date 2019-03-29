import {
  LOAD_NETWORK_STATZ_REQUEST,
  LOAD_NETWORK_STATZ_SUCCESS,
  LOAD_NETWORK_STATZ_ERROR,
} from '../constants';

export const loadNetworkStatz = async (
  chartingPeriod,
  changingChartingPeriod,
  dispatch
) => {
  dispatch({
    type: LOAD_NETWORK_STATZ_REQUEST,
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
    ).then(res => res.json().then(data => data));

    dispatch({
      type: LOAD_NETWORK_STATZ_SUCCESS,
      networkStatz,
    });
  } catch (error) {
    dispatch({
      type: LOAD_NETWORK_STATZ_ERROR,
      error,
    });
  }
};
