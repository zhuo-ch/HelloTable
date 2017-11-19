import { merge } from 'lodash';
import * as ManagerAPIUtil from '../util/manager_api_util';

export const RECEIVE_MANAGER_RESTAURANT = 'RECEIVE_MANAGER_RESTAURANT';
export const RECEIVE_UPDATED_HOURS = 'RECEIVE_UPDATED_HOURS';
export const RECEIVE_UPDATED_SEATING = 'RECEIVE_UPDATED_SEATING';

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
    .then(updatedSeating => dispatch(receiveUpdatedSeating(updatedSeating)));
}

const receiveManagerRestaurant = restaurant => ({
  type: RECEIVE_MANAGER_RESTAURANT,
  restaurant,
});

const receiveUpdatedHours = hours => ({
  type: RECEIVE_UPDATED_HOURS,
  hours
});

const receiveUpdatedSeating = seating => ({
  type: RECEIVE_UPDATED_SEATING,
  seating,
});
