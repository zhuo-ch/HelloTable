import { merge } from 'lodash';
import * as ManagerAPIUtil from '../util/manager_api_util';
import { fetchManagerRestaurantReservations } from './reservations_actions';
import { resetCurrentModal } from './modal_actions';
import { formatDate } from '../util/search_util';

export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';
export const RECEIVE_UPDATED_HOURS = 'RECEIVE_UPDATED_HOURS';
export const RECEIVE_SEATINGS = 'RECEIVE_SEATINGS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const fetchManagerRestaurant = id => dispatch => {
  return ManagerAPIUtil.getManagerRestaurant(id)
    .then(restaurant => {
      // dispatch(fetchManagerRestaurantReservations({ id: restaurant.user_id, date: formatDate() }));
      dispatch(receiveRestaurant(restaurant));
      dispatch(receiveSeatings(restaurant.seatings));
    });
}

export const updateRestaurant = restaurant => dispatch => {
  return ManagerAPIUtil.updateRestaurant(restaurant)
    .then(updatedRestaurant => dispatch(receiveRestaurant(updatedRestaurant)),
    errors => {
      dispatch(resetCurrentModal());
      dispatch(receiveErrors(errors));
    })
    .then(() => dispatch(resetCurrentModal()));
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

export const clearErrors = () => dispatch => {
  return dispatch(receiveClearErrrors());
}

const receiveRestaurant = restaurant => ({
  type: RECEIVE_RESTAURANT,
  restaurant,
});

const receiveSeatings = seating => ({
  type: RECEIVE_SEATINGS,
  seating,
});

const receiveUpdatedHours = hour => ({
  type: RECEIVE_UPDATED_HOURS,
  hour
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});

const receiveClearErrrors = () => ({
  type: CLEAR_ERRORS,
});
