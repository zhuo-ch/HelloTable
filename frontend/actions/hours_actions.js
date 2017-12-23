import { resetCurrentModal } from './modal_actions';
import * as HoursAPIUtil from '../util/hours_api_util';

export const RECEIVE_HOUR = 'RECEIVE_HOUR';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const updateHour = hours => dispatch => {
  return HoursAPIUtil.updateHour(hours)
    .then(updatedHour => dispatch(receiveHour(updatedHour)),
      error => dispatch(receiveErrors(error)))
    .then(() => dispatch(resetCurrentModal()));
}

export const setError = error => dispatch => {
  dispatch(resetCurrentModal());

  return dispatch(receiveErrors(error));
}

export const clearErrors = () => dispatch => {
  return dispatch(receiveClearErrrors());
}

const receiveHour = hour => ({
  type: RECEIVE_HOUR,
  hour,
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});

const receiveClearErrrors = () => ({
  type: CLEAR_ERRORS,
});
