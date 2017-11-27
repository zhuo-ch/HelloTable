import { merge } from 'lodash';
import * as ManagerAPIUtil from '../util/manager_api_util';
import { resetCurrentModal } from '../actions/modal_actions';

export const RECEIVE_MANAGER_RESTAURANT = 'RECEIVE_MANAGER_RESTAURANT';
export const RECEIVE_UPDATED_HOURS = 'RECEIVE_UPDATED_HOURS';
export const RECEIVE_UPDATED_SEATING = 'RECEIVE_UPDATED_SEATING';
export const RECEIVE_SEATING = 'RECEIVE_SEATING';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const fetchManagerRestaurant = id => dispatch => {
  return ManagerAPIUtil.getManagerRestaurant(id)
    .then(restaurant => dispatch(receiveManagerRestaurant(restaurant)));
}

export const updateRestaurant = restaurant => dispatch => {
  return ManagerAPIUtil.updateRestaurant(restaurant)
    .then(updatedRestaurant => dispatch(receiveManagerRestaurant(updatedRestaurant)));
}

export const updateHours = hours => dispatch => {
  return ManagerAPIUtil.updateHours(hours)
    .then(updatedHours => dispatch(receiveUpdatedHours(updatedHours)));
}

export const updateSeating = seating => dispatch => {
  return ManagerAPIUtil.updateSeating(seating)
    .then(updatedSeating => dispatch(receiveUpdatedSeating(updatedSeating)),
    err => dispatch(receiveErrors(err)));

}

export const createSeating = seating => dispatch => {
  return ManagerAPIUtil.createSeating(seating)
    .then(newSeating => dispatch(receiveSeating(newSeating)),
    err => dispatch(receiveErrors(err)))
    .then(() => dispatch(resetCurrentModal()));
}

export const clearErrors = () => dispatch => {
  return dispatch(receiveClearErrrors());
}

const receiveManagerRestaurant = restaurant => ({
  type: RECEIVE_MANAGER_RESTAURANT,
  restaurant,
});

const receiveUpdatedHours = hour => ({
  type: RECEIVE_UPDATED_HOURS,
  hour
});

const receiveUpdatedSeating = seating => ({
  type: RECEIVE_UPDATED_SEATING,
  seating,
});

const receiveSeating = seating => ({
  type: RECEIVE_SEATING,
  seating,
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});

const receiveClearErrrors = () => ({
  type: CLEAR_ERRORS,
});
