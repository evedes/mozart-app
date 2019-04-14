import {
  LOAD_SYSTEM_AVERAGE_POLLING_REQUEST,
  LOAD_SYSTEM_AVERAGE_POLLING_SUCCESS,
  LOAD_SYSTEM_AVERAGE_POLLING_ERROR,
} from '../constants';

export const pollCPUSystemAverage = (
  chartingPeriod,
  changingChartingPeriod
) => async dispatch => {
  dispatch({
    type: LOAD_SYSTEM_AVERAGE_POLLING_REQUEST,
    changingChartingPeriod,
  });
  try {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };
    const cpuLoadAvg = await fetch(
      `api/cpuLoadAvg/${chartingPeriod}`,
      init
    ).then(res => res.json());

    dispatch({
      type: LOAD_SYSTEM_AVERAGE_POLLING_SUCCESS,
      cpuLoadAvg,
    });
  } catch (error) {
    dispatch({
      type: LOAD_SYSTEM_AVERAGE_POLLING_ERROR,
      error,
    });
  }
};
