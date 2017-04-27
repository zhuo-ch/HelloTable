import { hashHistory } from 'react-router';
import * as ReservationsAPIUtil from '../util/reservations_api_util';

export const RECEIVE_ALL_RESERVATIONS = 'RECEIVE_ALL_RESERVATIONS';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';

export const fetchAllReservations = (query) => dispatch => {
  return ReservationsAPIUtil.fetchAllReservations(query)
    .then((reservations) => {
      debugger
      dispatch(receiveAllReservations(reservations))});
}

export const destroyReservation = id => dispatch => {
  return ReservationsAPIUtil.destroyReservation(id)
    .then((restaurants) => dispatch(receiveAllReservations));
}

const receiveAllReservations = (reservations) => ({
  type: RECEIVE_ALL_RESERVATIONS,
  reservations,
})
