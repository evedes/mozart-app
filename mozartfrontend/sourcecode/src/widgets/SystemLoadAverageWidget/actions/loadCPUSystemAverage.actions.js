import moment from 'moment';
import _ from 'lodash';

import {
  LOAD_SYSTEM_AVERAGE_REQUEST,
  LOAD_SYSTEM_AVERAGE_SUCCESS,
  LOAD_SYSTEM_AVERAGE_ERROR,
} from '../constants';

export const loadCPUSystemAverage = (
  chartingPeriod,
  changingChartingPeriod
) => async dispatch => {
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
    const cpuLoadAvg = await fetch(`api/cpuLoadAvg/${chartingPeriod}`, init)
      .then(res => res.json())
      .then(data =>
        _(data)
          .map(item => ({
            ...item,
            date: moment(item.date).format('HH:mm:ss'),
          }))
          .value()
      );

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
