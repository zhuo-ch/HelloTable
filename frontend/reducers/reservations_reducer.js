import { merge } from 'lodash';
import { RECEIVE_RESERVATIONS,
  RECEIVE_RESERVATION,
  DESTROY_RESERVATION,
  CLEAR_RESERVATION } from '../actions/reservations_actions';

const _nullReservations = Object.freeze({});

const ReservationsReducer = (state = _nullReservations, action) => {
  switch(action.type) {
    case RECEIVE_RESERVATIONS:
      return merge({}, state, action.reservations);
    case RECEIVE_RESERVATION:
      const reservation = action.reservation
      return merge({}, state, {reservation});
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
