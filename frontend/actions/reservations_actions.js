import { hashHistory } from 'react-router';
import * as ReservationsAPIUtil from '../util/reservations_api_util';

export const RECEIVE_RESERVATIONS = 'RECEIVE_RESERVATIONS';
export const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
export const CLEAR_RESERVATION = 'CLEAR_RESERVATION';
export const DESTROY_RESERVATION = 'DESTROY_RESERVATION';

export const fetchAllReservations = (query) => dispatch => {
  return ReservationsAPIUtil.fetchAllReservations(query)
    .then((reservations) => {
      dispatch(receiveAllReservations(reservations))});
}

export const createReservation = reservation => dispatch => {
  return ReservationsAPIUtil.createReservation(reservation)
    .then((newReservation) => dispatch(receiveReservation(newReservation)));
}

export const destroyReservation = id => dispatch => {
  return ReservationsAPIUtil.destroyReservation(id)
    .then((id) => dispatch(receiveDestroyReservation(id)));
}

export const resetReservation = () => dispatch => {
  return dispatch(clearReservation({}));
}

const receiveAllReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
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
