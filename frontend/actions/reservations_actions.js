import { hashHistory } from 'react-router';
import * as ReservationsAPIUtil from '../util/reservations_api_util';

export const RECEIVE_ALL_RESERVATIONS = 'RECEIVE_ALL_RESERVATIONS';
export const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
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
    .then((id) => dispatch(destroyReservation(id)));
}
// 
// export const clearReservations = () => dispatch => {
//   return dispatch(receiveAllReservations({}));
// }

const receiveAllReservations = (reservations) => ({
  type: RECEIVE_ALL_RESERVATIONS,
  reservations,
})

const receiveReservation = reservation => ({
  type: RECEIVE_RESERVATION,
  reservation,
})

const receiveDestroyReservation = id => ({
  type: DESTROY_RESERVATION,
  reservation,
})
