import { merge } from 'lodash';
import { resetCurrentModal } from '../actions/modal_actions';
import * as SeatingsAPIUtil from '../util/seatings_api_util';

export const RECEIVE_SEATING = 'RECEIVE_SEATING';
export const RECEIVE_REMOVE_SEATING = 'RECEIVE_REMOVE_SEATING';
export const RECEIVE_SEATING_ERRORS = 'RECEIVE_SEATING_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const updateSeating = seating => dispatch => {
  return SeatingsAPIUtil.updateSeating(seating)
    .then(updatedSeating => dispatch(receiveSeating(updatedSeating)),
      err => {
        dispatch(resetCurrentModal());
        dispatch(receiveErrors(err));
      })
    .then(() => dispatch(resetCurrentModal()));
}

export const createSeating = seating => dispatch => {
  return SeatingsAPIUtil.createSeating(seating)
    .then(newSeating => dispatch(receiveSeating(newSeating)),
      err => {
        dispatch(resetCurrentModal());
        dispatch(receiveErrors(err));
      })
    .then(() => dispatch(resetCurrentModal()));
}

export const removeSeating = id => dispatch => {
  return SeatingsAPIUtil.removeSeating(id)
    .then(seating => dispatch(receiveRemoveSeating(seating)));
}

export const clearErrors = () => dispatch => {
  return dispatch(receiveClearErrrors());
}

const receiveSeating = seating => ({
  type: RECEIVE_SEATING,
  seating,
});

const receiveRemoveSeating = seating => ({
  type: RECEIVE_REMOVE_SEATING,
  seating,
});

const receiveErrors = errors => ({
  type: RECEIVE_SEATING_ERRORS,
  errors,
});

const receiveClearErrrors = () => ({
  type: CLEAR_ERRORS,
});
