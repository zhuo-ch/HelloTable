import { merge } from 'lodash';
import * as ManagerAPIUtil from '../util/manager_api_util';
import { resetCurrentModal } from '../actions/modal_actions';
import { formatDate } from '../util/search_api_util';

export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_RESTAURANT_RESERVATIONS = 'RECEIVE_RESTAURANT_RESERVATIONS';
export const RECEIVE_UPDATED_HOURS = 'RECEIVE_UPDATED_HOURS';
export const RECEIVE_UPDATED_SEATING = 'RECEIVE_UPDATED_SEATING';
export const RECEIVE_SEATING = 'RECEIVE_SEATING';
export const RECEIVE_REMOVE_SEATING = 'RECEIVE_REMOVE_SEATING';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const fetchManagerRestaurant = id => dispatch => {
  return ManagerAPIUtil.getManagerRestaurant(id)
    .then(restaurant => {
      dispatch(fetchManagerRestaurantReservations({ id: restaurant.id, date: formatDate() }));
      dispatch(receiveRestaurant(restaurant));
    });
}

export const fetchManagerRestaurantReservations = query => dispatch => {
  return ManagerAPIUtil.getManagerRestaurantReservations(query)
    .then(reservations => dispatch(receiveRestaurantReservations(reservations)));
}

export const updateRestaurant = restaurant => dispatch => {
  return ManagerAPIUtil.updateRestaurant(restaurant)
    .then(updatedRestaurant => dispatch(receiveRestaurant(updatedRestaurant)),
    errors => {
      dispatch(resetCurrentModal());
      dispatch(receiveErrors(errors))
    });
}

export const updateHours = hours => dispatch => {
  return ManagerAPIUtil.updateHours(hours)
    .then(updatedHours => dispatch(receiveUpdatedHours(updatedHours)),
    error => {
      dispatch(resetCurrentModal());
      dispatch(receiveErrors(error))
    });
}

export const setError = error => dispatch => {
  dispatch(resetCurrentModal());

  return dispatch(receiveErrors(error));
}

export const updateSeating = seating => dispatch => {
  return ManagerAPIUtil.updateSeating(seating)
    .then(updatedSeating => dispatch(receiveUpdatedSeating(updatedSeating)),
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

export const clearErrors = () => dispatch => {
  return dispatch(receiveClearErrrors());
}

const receiveRestaurant = restaurant => ({
  type: RECEIVE_RESTAURANT,
  restaurant,
});

const receiveRestaurantReservations = reservations => ({
  type: RECEIVE_RESTAURANT_RESERVATIONS,
  reservations,
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
