import { merge } from 'lodash';
import {
  RECEIVE_RESTAURANT_RESERVATIONS,
  RECEIVE_USER_RESERVATIONS,
  RECEIVE_RESERVATION,
  DESTROY_RESERVATION,
  CLEAR_RESERVATION
} from '../actions/reservations_actions';

const _nullReservations = Object.freeze({
  userReservations: {},
  restaurantReservations: {},
});

const ReservationsReducer = (state = _nullReservations, action) => {
  switch(action.type) {
    case RECEIVE_RESTAURANT_RESERVATIONS:
      return merge({}, state, { restaurantReservations: action.reservations });
    case RECEIVE_USER_RESERVATIONS:
      return merge({}, state, { userReservations: action.reservations })
    case RECEIVE_RESERVATION:
      const reservation = action.reservation
      const addState = { [action.reservation.id]: action.reservation};
      return merge({}, state, addState, {reservation});
    case CLEAR_RESERVATION:
      return _nullReservations;
    case DESTROY_RESERVATION:
      let newReservations = merge({}, state);
      delete state[action.id];
      return newReservations;
    default:
      return state;
  }
}

export default ReservationsReducer;
