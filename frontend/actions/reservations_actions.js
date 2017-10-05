import { hashHistory } from 'react-router';
import * as ReservationsAPIUtil from '../util/reservations_api_util';

export const RECEIVE_RESTAURANT_RESERVATIONS = 'RECEIVE_RESTAURANT_RESERVATIONS';
export const RECEIVE_USER_RESERVATIONS = 'RECEIVE_USER_RESERVATIONS';
export const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
export const CLEAR_RESERVATION = 'CLEAR_RESERVATION';
export const DESTROY_RESERVATION = 'DESTROY_RESERVATION';

export const fetchRestaurantReservations = (query) => dispatch => {
  return ReservationsAPIUtil.fetchRestaurantReservations(query)
    .then(reservations => {
      dispatch(receiveRestaurantReservations(reservations))});
}

export const createReservation = reservation => dispatch => {
  return ReservationsAPIUtil.createReservation(reservation)
    .then(newReservation => dispatch(receiveReservation(newReservation)));
}

export const destroyReservation = id => dispatch => {
  return ReservationsAPIUtil.destroyReservation(id)
    .then(id => dispatch(receiveDestroyReservation(id)));
}

export const resetReservation = () => dispatch => {
  return dispatch(clearReservation({}));
}

const receiveRestaurantReservations = reservations => ({
  type: RECEIVE_RESTAURANT_RESERVATIONS,
  reservations,
});

const receiveReservation = reservation => ({
  type: RECEIVE_RESERVATION,
  reservation,
});

const clearReservation = (reservation) => ({
  type: CLEAR_RESERVATION,
  reservation,
});
