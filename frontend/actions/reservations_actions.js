import { hashHistory } from 'react-router';
import * as ReservationsAPIUtil from '../util/reservations_api_util';

export const RECEIVE_ALL_RESERVATIONS = 'RECEIVE_ALL_RESERVATIONS';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';

export const fetchAllReservations = (date, time, restaurantId) => dispatch => {
  return ReservationsAPIUtil.fetchAllReservations(date, time, restaurant_id)
    .then((reservations) => dispatch(receiveAllReservations));
}

export const destroyReservation = id => dispatch => {
  return ReservationsAPIUtil.destroyReservation(id)
    .then((restaurants) => dispatch(receiveAllReservations));
}

const receiveAllReservations = reservations => {
  debugger
  return ({
  type: RECEIVE_ALL_RESERVATIONS,
  reservations,
});}
