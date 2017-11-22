import { merge } from 'lodash';
import * as ManagerAPIUtil from '../util/manager_api_util';
import { resetCurrentModal } from '../actions/modal_actions';

export const RECEIVE_MANAGER_RESTAURANT = 'RECEIVE_MANAGER_RESTAURANT';
export const RECEIVE_UPDATED_HOURS = 'RECEIVE_UPDATED_HOURS';
export const RECEIVE_UPDATED_SEATING = 'RECEIVE_UPDATED_SEATING';
export const RECEIVE_SEATING = 'RECEIVE_SEATING';

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
  if (seating.id) {
    return ManagerAPIUtil.updateSeating(seating)
    .then(updatedSeating => dispatch(receiveUpdatedSeating(updatedSeating)));
  } else {
    dispatch(receiveUpdatedSeating(seating));
  }
}

export const createSeating = seating => dispatch => {
  return ManagerAPIUtil.createSeating(seating)
    .then(newSeating => dispatch(receiveSeating(newSeating)))
    .then(() => dispatch(resetCurrentModal()));
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
