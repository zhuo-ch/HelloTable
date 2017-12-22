import { merge } from 'lodash';
import { resetCurrentModal } from '../actions/modal_actions';
import * as SeatingsAPIUtil from '../util/seatings_api_util';

export const RECEIVE_UPDATED_SEATING = 'RECEIVE_UPDATED_SEATING';
export const RECEIVE_SEATING = 'RECEIVE_SEATING';
export const RECEIVE_REMOVE_SEATING = 'RECEIVE_REMOVE_SEATING';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const updateSeating = seating => dispatch => {
  return ManagerAPIUtil.updateSeating(seating)
    .then(updatedSeating => dispatch(receiveSeating(updatedSeating)),
    err => {
      dispatch(resetCurrentModal());
      dispatch(receiveErrors(err))
    });
}

export const createSeating = seating => dispatch => {
  return ManagerAPIUtil.createSeating(seating)
    .then(newSeating => dispatch(receiveSeating(newSeating)),
    err => dispatch(receiveErrors(err)))
    .then(() => dispatch(resetCurrentModal()));
}

export const removeSeating = id => dispatch => {
  return ManagerAPIUtil.removeSeating(id)
    .then(seating => dispatch(receiveRemoveSeating(seating)));
}
//
//
// const receiveUpdatedSeating = seating => ({
//   type: RECEIVE_UPDATED_SEATING,
//   seating,
// });

const receiveSeating = seating => ({
  type: RECEIVE_SEATING,
  seating,
});

const receiveRemoveSeating = seating => ({
  type: RECEIVE_REMOVE_SEATING,
  seating,
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});

const receiveClearErrrors = () => ({
  type: CLEAR_ERRORS,
});
