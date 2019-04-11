import { CHANGE_CONNECTION_MODE } from '../constants';

export const changeConnectionMode = connectionMode => dispatch => {
  dispatch({
    type: CHANGE_CONNECTION_MODE,
    connectionMode,
  });
};
