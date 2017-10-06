import { merge } from 'lodash';
import {
  RECEIVE_RESTAURANT_RESERVATIONS,
  RECEIVE_USER_RESERVATIONS,
  RECEIVE_ADD_USER_RESERVATION,
  RECEIVE_RESERVATION,
  DESTROY_RESERVATION,
  CLEAR_RESERVATION
} from '../actions/reservations_actions';
import { filterReservation } from '../selectors/reservation_selectors';

const _nullReservations = Object.freeze({
  userReservations: {},
  restaurantReservations: {},
  currentReservation: {},
});

const ReservationsReducer = (state = _nullReservations, action) => {
  switch(action.type) {
    case RECEIVE_RESTAURANT_RESERVATIONS:
      return merge({}, state, { restaurantReservations: action.reservations });
    case RECEIVE_USER_RESERVATIONS:
      return merge({}, state, { userReservations: action.reservations })
    case RECEIVE_RESERVATION:
      return merge({}, state, { currentReservation: action.reservation });
    case RECEIVE_ADD_USER_RESERVATION:
      const newUserState = merge({}, state);
      newUserState.userReservations.push(action.reservation);
      return newUserState;
    case CLEAR_RESERVATION:
      const newState = merge({}, state);
      newState.currentReservation = {};
      return newState;
    case DESTROY_RESERVATION:
      let newReservations = merge({}, state);
      newReservations.userReservations = filterReservation(newReservations.userReservations, action.id);
      return newReservations;
    default:
      return state;
  }
}

export default ReservationsReducer;
