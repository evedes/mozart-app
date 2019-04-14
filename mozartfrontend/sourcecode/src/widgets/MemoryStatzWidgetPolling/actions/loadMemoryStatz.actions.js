import {
  LOAD_MEMORY_STATZ_POLLING_REQUEST,
  LOAD_MEMORY_STATZ_POLLING_SUCCESS,
  LOAD_MEMORY_STATZ_POLLING_ERROR,
} from '../constants';

export const pollMemoryStatz = (
  chartingPeriod,
  changingChartingPeriod
) => async dispatch => {
  dispatch({
    type: LOAD_MEMORY_STATZ_POLLING_REQUEST,
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
    ).then(res => res.json());

    dispatch({
      type: LOAD_MEMORY_STATZ_POLLING_SUCCESS,
      memoryStatz,
    });
  } catch (error) {
    dispatch({
      type: LOAD_MEMORY_STATZ_POLLING_ERROR,
      error,
    });
  }
};
