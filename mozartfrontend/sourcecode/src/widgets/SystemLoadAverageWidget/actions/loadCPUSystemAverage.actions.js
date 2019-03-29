import {
  LOAD_SYSTEM_AVERAGE_REQUEST,
  LOAD_SYSTEM_AVERAGE_SUCCESS,
  LOAD_SYSTEM_AVERAGE_ERROR,
} from '../constants';

export const loadCPUSystemAverage = async (
  chartingPeriod,
  changingChartingPeriod,
  dispatch
) => {
  dispatch({
    type: LOAD_SYSTEM_AVERAGE_REQUEST,
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
    ).then(res => res.json().then(data => data));

    dispatch({
      type: LOAD_SYSTEM_AVERAGE_SUCCESS,
      cpuLoadAvg,
    });
  } catch (error) {
    dispatch({
      type: LOAD_SYSTEM_AVERAGE_ERROR,
      error,
    });
  }
};
