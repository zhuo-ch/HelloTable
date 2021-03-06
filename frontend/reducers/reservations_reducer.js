import { merge } from 'lodash';
import {
  RECEIVE_RESTAURANT_RESERVATIONS,
  RECEIVE_USER_RESERVATIONS,
  RECEIVE_ADD_USER_RESERVATION,
  RECEIVE_RESERVATION,
  DESTROY_RESERVATION,
  CLEAR_RESERVATION
} from '../actions/reservations_actions';
import { LOGOUT } from '../actions/session_actions';
import * as ReservationsSelectors from '../selectors/reservations_selectors';

const _nullReservations = Object.freeze({
  userReservations: [],
  restaurantReservations: [],
  currentReservation: {},
});

const ReservationsReducer = (state = _nullReservations, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESTAURANT_RESERVATIONS:
      return Object.assign({}, state, { restaurantReservations: action.reservations });
    case RECEIVE_USER_RESERVATIONS:
      return Object.assign({}, state, { userReservations: action.reservations });
    case RECEIVE_RESERVATION:
      return merge({}, state, { currentReservation: action.reservation });
    case RECEIVE_ADD_USER_RESERVATION:
      const newUserState = merge({}, state);
      newUserState.userReservations.push(action.reservation);
      return newUserState;
    case CLEAR_RESERVATION:
      const newState = merge({}, state);
      newState.currentReservation = {};
      newState.restaurantReservations = [];
      return newState;
    case DESTROY_RESERVATION:
      const deleteReservation = ReservationsSelectors.filterReservations(state, action.id);
      return deleteReservation;
    case LOGOUT:
      return Object.assign({}, state, { userReservations: [] });
    default:
      return state;
  }
}

export default ReservationsReducer;
