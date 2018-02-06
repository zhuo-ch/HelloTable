import { merge } from 'lodash';

export const filterReservations = (state, id) => {
  const newState = merge({}, state);
  const arr = state.userReservations.filter(el => el.id !== id);
  newState.userReservations = arr;

  return newState;
}

export const formatUserReservation = reservation => {
  return ({
    id: reservation.restaurant.id,
    name: reservation.restaurant.name,
    date: reservation.date,
    time: reservation.time,
    seats: reservation.seats,
  });
}
