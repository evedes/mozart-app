import _ from 'lodash';
import moment from 'moment';

import {
  LOAD_MEMORY_STATZ_REQUEST,
  LOAD_MEMORY_STATZ_SUCCESS,
  LOAD_MEMORY_STATZ_ERROR,
} from '../constants';

export const loadMemoryStatz = (
  chartingPeriod,
  changingChartingPeriod
) => async dispatch => {
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
    ).then(res =>
      res.json().then(data =>
        _(data)
          .map(item => {
            const { date, ...rest } = item;
            return {
              ...rest,
              date: moment(date).format('HH:mm:ss'),
            };
          })
          .value()
      )
    );

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
