import {
  LOAD_MEMORY_STATZ_REQUEST,
  LOAD_MEMORY_STATZ_SUCCESS,
  LOAD_MEMORY_STATZ_ERROR,
} from '../constants';

export const loadMemoryStatz = async (
  chartingPeriod,
  changingChartingPeriod,
  dispatch
) => {
  dispatch({
    type: LOAD_MEMORY_STATZ_REQUEST,
    changingChartingPeriod,
  });
  try {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };
    const memoryStatz = await fetch(
      `api/memoryStatz/${chartingPeriod}`,
      init
    ).then(res => res.json().then(data => data));

    dispatch({
      type: LOAD_MEMORY_STATZ_SUCCESS,
      memoryStatz,
    });
  } catch (error) {
    dispatch({
      type: LOAD_MEMORY_STATZ_ERROR,
      error,
    });
  }
};
