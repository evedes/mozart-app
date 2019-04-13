import _ from 'lodash';
import moment from 'moment';

import {
  LOAD_NETWORK_STATZ_REQUEST,
  LOAD_NETWORK_STATZ_SUCCESS,
  LOAD_NETWORK_STATZ_ERROR,
} from '../constants';

import { subscribeToNetworkStatz } from '../../../libs/socketLib';

export const streamNetworkStatz = () => async dispatch => {
  console.log('streaming network statz');
  dispatch({
    type: LOAD_NETWORK_STATZ_REQUEST,
  });
  try {
    subscribeToNetworkStatz(networkStatz => {
      dispatch({
        type: LOAD_NETWORK_STATZ_SUCCESS,
        networkStatz,
      });
    }, 1 * 1000);
  } catch (error) {
    dispatch({
      type: LOAD_NETWORK_STATZ_ERROR,
      error,
    });
  }
};

export const pollNetworkStatz = (
  chartingPeriod,
  changingChartingPeriod
) => async dispatch => {
  console.log('fetching Network Statz');
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
    ).then(res =>
      res.json().then(data =>
        _(data)
          .map(item => {
            const { rx_sec: rxSec, tx_sec: txSec, date } = item;
            return {
              rxSec,
              txSec,
              date: moment(date).format('HH:mm:ss'),
            };
          })
          .value()
      )
    );

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
